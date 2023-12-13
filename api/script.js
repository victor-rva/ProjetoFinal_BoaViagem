// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar as opções iniciais no dropdown
    carregarOpcoes();

    // Adiciona um ouvinte de evento para alterações no dropdown
    document.getElementById('opcoes').addEventListener('change', function () {
        var opcaoSelecionada = document.getElementById('opcoes').value;

        // Limpa os campos e a tabela
        limparCampos();
        limparTabela();

        // Adiciona campos de preenchimento conforme a opção selecionada
        carregarCampos(opcaoSelecionada);
    });
});

function carregarOpcoes() {
    // Fazer uma requisição GET para obter as opções disponíveis do servidor
    fetch('http://localhost:3000/opcoes')
        .then(response => response.json())
        .then(data => {
            var dropdown = document.getElementById('opcoes');

            // Adiciona as opções no dropdown
            data.forEach(opcao => {
                var option = document.createElement('option');
                option.value = opcao;
                option.textContent = opcao;
                dropdown.appendChild(option);
            });

            // Atualiza os campos e a tabela com a primeira opção
            if (data.length > 0) {
                carregarCampos(data[0]);
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
}

function carregarCampos(opcao) {
    // Fazer uma requisição GET para obter os campos correspondentes à opção selecionada
    fetch(`http://localhost:3000/campos?opcao=${opcao}`)
        .then(response => response.json())
        .then(data => {
            var opcaoSelecionadaDiv = document.getElementById('opcaoSelecionada');
            opcaoSelecionadaDiv.innerHTML = "";

            // Adiciona campos de preenchimento conforme a opção selecionada
            data.forEach(campo => {
                var label = document.createElement('label');
                label.for = campo.nome;
                label.textContent = `${campo.nome}:`;

                var input = document.createElement('input');
                input.type = 'text';
                input.id = campo.nome;

                opcaoSelecionadaDiv.appendChild(label);
                opcaoSelecionadaDiv.appendChild(input);
            });
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
}

function limparCampos() {
    var opcaoSelecionadaDiv = document.getElementById('opcaoSelecionada');
    opcaoSelecionadaDiv.innerHTML = "";
}

function limparTabela() {
    var tabelaInfo = document.getElementById('tabelaInfo');
    tabelaInfo.querySelector('tbody').innerHTML = "";
}
