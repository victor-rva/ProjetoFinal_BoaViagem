///////////////////////////////////// OAUTH2 ////////////////////////////////////////////////

function redirectToGoogleLogin() {
    window.location.href = '/auth/google';
  }

//////////////////////////////////// CATEGORIA /////////////////////////////////////

function adicionarCategoria(){

    nome = document.getElementById("txtNomeCat").value
    if(nome.length == 0){
        alert("O campo nome é obrigatório!");
    }else{
        ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert(nome + " cadastrado com sucesso!");
                buscarCategoria();
            }else if(this.readyState == 4){
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:3000/categoria/categorias", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        ajax.send("nome=" + nome);
    }
}

function buscarCategoria(){
    tabela = document.getElementById("tblCategoria")
    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            obj = JSON.parse(this.responseText);
            obj.forEach(categoria => {
                if(document.getElementById("c" + categoria.id) == null){
                    linha = tabela.insertRow(-1);
                    linha.id = "c" +categoria.id;
                    cellId = linha.insertCell(0);
                    cellNome = linha.insertCell(1);
                    cellExcluir = linha.insertCell(2);

                    cellId.innerHTML = categoria.id;
                    cellNome.innerHTML = categoria.nome;
                    cellExcluir.innerHTML = "<button onclick='excluir("+categoria.id+")'>" + "Excluir</button>";
                }
            });
        }
    };
    ajax.open("GET", "http://localhost:3000/categoria/categorias", true);
    ajax.send();
}

function alterarCategoria() {
    var tabela = document.getElementById("tblCategoria");
    var ajax = new XMLHttpRequest();

    // Obtém os valores a serem atualizados
    var idCategoria =  document.getElementById("txtIdCategoria").value; ;/* insira aqui o código para obter o ID da categoria a ser atualizada */
    var novoNome = document.getElementById("txtNovoNome").value;/* insira aqui o código para obter o novo nome da categoria */

    ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Atualização bem-sucedida
                console.log("Categoria atualizada com sucesso!");
                // Atualizar a tabela, se necessário
                buscarCategoria();
            } else {
                // Erro na requisição PUT
                console.error("Erro na requisição PUT:", this.status, this.responseText);
            }
        }
    };

    ajax.open("PUT", "http://localhost:3000/categoria/categorias/" + idCategoria, true);
    ajax.setRequestHeader("Content-type", "application/json");

    // Converte os dados em formato JSON e envia no corpo da requisição
    var dadosAtualizados = {
        nome: novoNome
        // Adicione outros campos, se necessário
    };

    ajax.send(JSON.stringify(dadosAtualizados));
}


function excluir(id){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            buscarCategoria();
        }
        ajax.open("DELETE", "http://localhost:3000/categoria/categorias", id,true);
        ajax.send();       
    };
}

//////////////////////////////////// CIDADE ////////////////////////////////////////////

function adicionarCidade(){

    nome = document.getElementById("txtNomeCid").value
    if(nome.length == 0){
        alert("O campo nome é obrigatório!");
    }else{
        ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert(nome + " cadastrado com sucesso!");
                buscarCidade();
            }else if(this.readyState == 4){
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:3000/cidade/cidades", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        ajax.send("nome=" + nome);
    }
}

function buscarCidade(){
    tabela = document.getElementById("tblCidade")
    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            obj = JSON.parse(this.responseText);
            obj.forEach(cidade => {
                if(document.getElementById("c" + cidade.id) == null){
                    linha = tabela.insertRow(-1);
                    linha.id = "c" +cidade.id;
                    cellId = linha.insertCell(0);
                    cellNome = linha.insertCell(1);
                    cellExcluir = linha.insertCell(2);

                    cellId.innerHTML = cidade.id;
                    cellNome.innerHTML = cidade.nome;
                    cellExcluir.innerHTML = "<button onclick='excluir("+cidade.id+")'>" + "Excluir</button>";
                }
            });
        }
    };
    ajax.open("GET", "http://localhost:3000/cidade/cidades", true);
    ajax.send();
}

function alterarCidade() {
    var tabela = document.getElementById("tblCidade");
    var ajax = new XMLHttpRequest();

    // Obtém os valores a serem atualizados
    var idCidade =  document.getElementById("txtIdCidade").value;/* insira aqui o código para obter o ID da Cidade a ser atualizada */
    var novoNome = document.getElementById("txtNovoNome").value;/* insira aqui o código para obter o novo nome da Cidade */

    ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Atualização bem-sucedida
                console.log("Cidade atualizada com sucesso!");
                // Atualizar a tabela, se necessário
                buscarCidade();
            } else {
                // Erro na requisição PUT
                console.error("Erro na requisição PUT:", this.status, this.responseText);
            }
        }
    };

    ajax.open("PUT", "http://localhost:3000/cidade/cidades/" + idCidade, true);
    ajax.setRequestHeader("Content-type", "application/json");

    // Converte os dados em formato JSON e envia no corpo da requisição
    var dadosAtualizados = {
        nome: novoNome
        // Adicione outros campos, se necessário
    };

    ajax.send(JSON.stringify(dadosAtualizados));
}


function excluir(id){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            buscarCidade();
        }
        ajax.open("DELETE", "http://localhost:3000/cidade/cidades", id,true);
        ajax.send();       
    };
}

///////////////////////////// CLIENTE ////////////////////////////////
function adicionarCliente(){

    nome = document.getElementById("txtNomeClie").value
    if(nome.length == 0){
        alert("O campo nome é obrigatório!");
    }else{
        ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert(nome + " cadastrado com sucesso!");
                buscarCliente();
            }else if(this.readyState == 4){
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:3000/cliente/clientes", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        altura = document.getElementById("txtAltura").value;
        nascimento = document.getElementById("txtNascimento").value;
        cliente_id = document.getElementById("txtCliente_ID").value;

        ajax.send("nome=" + nome + "&altura=" + altura + "&nascimento=" + nascimento + "&cliente_id=" + cliente_id);
    }
}

function buscarCliente(){
    tabela = document.getElementById("tblCliente")
    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            obj = JSON.parse(this.responseText);
            obj.forEach(cliente => {
                if(document.getElementById("c" + cliente.id) == null){
                    linha = tabela.insertRow(-1);
                    linha.id = "c" +cliente.id;
                    cellId = linha.insertCell(0);
                    cellNome = linha.insertCell(1);
                    cellAltura = linha.insertCell(2);
                    cellNascimento = linha.insertCell(3);
                    cellCliente_ID = linha.insertCell(4);
                    cellExcluir = linha.insertCell(5);

                    cellId.innerHTML = cliente.id;
                    cellNome.innerHTML = cliente.nome;
                    cellPreco.innerHTML = cliente.preco;
                    cellQtd.innerHTML = cliente.quantidade;
                    cellExcluir.innerHTML = "<button onclick='excluir("+cliente.id+")'>" + "Excluir</button>";
                }
            });
        }
    };
    ajax.open("GET", "http://localhost:3000/cliente/clientes", true);
    ajax.send();
}

function alterarCliente() {
    var tabela = document.getElementById("tblCliente");
    var ajax = new XMLHttpRequest();

    // Obtém os valores a serem atualizados
    var idCliente = document.getElementById("txtCliente_ID").value;
    var novoNome = document.getElementById("txtNomeClie").value;
    var novaAltura = document.getElementById("txtAltura").value;
    var novoNascimento = document.getElementById("txtNascimento").value;

    ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Atualização bem-sucedida
                console.log("Cliente atualizado com sucesso!");
                // Atualizar a tabela, se necessário
                buscarCliente();
            } else {
                // Erro na requisição PUT
                console.error("Erro na requisição PUT:", this.status, this.responseText);
            }
        }
    };

    ajax.open("PUT", "http://localhost:3000/cliente/clientes/" + idCliente, true);
    ajax.setRequestHeader("Content-type", "application/json");

    // Converte os dados em formato JSON e envia no corpo da requisição
    var dadosAtualizados = {
        nome: novoNome,
        altura: novaAltura,
        nascimento: novoNascimento
        // Adicione outros campos, se necessário
    };

    ajax.send(JSON.stringify(dadosAtualizados));
}


function excluir(id){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            buscarCliente();
        }
        ajax.open("DELETE", "http://localhost:3000/cliente/clientes", id,true);
        ajax.send();       
    };
}


///////////////////////////// PACOTE ////////////////////////////////

function adicionarPacote(){

    nome = document.getElementById("txtNomePac").value
    if(nome.length == 0){
        alert("O campo nome é obrigatório!");
    }else{
        ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert(nome + " cadastrado com sucesso!");
                buscarPacote();
            }else if(this.readyState == 4){
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:3000/pacote/pacotes", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        preco = document.getElementById("txtPreco").value;
        qtd = document.getElementById("txtQuantidade").value;
        categoria_id = document.getElementById("txtCategoria_ID").value;
        data_inicio = document.getElementById("txtDataInicio").value;
        data_retorno = document.getElementById("txtDataRetorno").value;
        validade = document.getElementById("txtValidade").value;
        

        ajax.send("nome=" + nome + "&preco=" + preco + "&quantidade=" + qtd + "&categoria_id=" + categoria_id + "&data_inicio=" + data_inicio + "&data_retorno=" + data_retorno + "&validade=" + validade);
    }
}

function buscarPacote(){
    tabela = document.getElementById("tblPacote")
    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            obj = JSON.parse(this.responseText);
            obj.forEach(pacote => {
                if(document.getElementById("p" + pacote.id) == null){
                    linha = tabela.insertRow(-1);
                    linha.id = "p" +pacote.id;
                    cellId = linha.insertCell(0);
                    cellNome = linha.insertCell(1);
                    cellPreco = linha.insertCell(2);
                    cellQtd = linha.insertCell(3);
                    cellCategoria_ID = linha.insertCell(4);
                    cellDataInicio = linha.insertCell(5);
                    cellDataRetorno = linha.insertCell(6);
                    cellValidade = linha.insertCell(7);
                    cellExcluir = linha.insertCell(8);

                    cellId.innerHTML = pacote.id;
                    cellNome.innerHTML = pacote.nome;
                    cellPreco.innerHTML = pacote.preco;
                    cellQtd.innerHTML = pacote.quantidade;
                    cellCategoria_ID.innerHTML = pacote.categoria_id;
                    cellDataInicio.innerHTML = pacote.data_inicio;
                    cellDataRetorno.innerHTML = pacote.data_retorno;
                    cellValidade.innerHTML = pacote.validade;
                    cellExcluir.innerHTML = "<button onclick='excluir("+pacote.id+")'>" + "Excluir</button>";
                }
            });
        }
    };
    ajax.open("GET", "http://localhost:3000/pacote/pacotes", true);
    ajax.send();
}

function alterarPacote() {
    var tabela = document.getElementById("tblPacote");
    var ajax = new XMLHttpRequest();

    // Obtém os valores a serem atualizados
    var idPacote = document.getElementById("txtIdPacote").value; // Adicione o campo ID no HTML
    var novoNome = document.getElementById("txtNovoNomePac").value; // Adicione o campo de novo nome no HTML
    var novoPreco = document.getElementById("txtNovoPreco").value; // Adicione o campo de novo preço no HTML

    ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Atualização bem-sucedida
                console.log("Pacote atualizado com sucesso!");
                // Atualizar a tabela, se necessário
                buscarPacote();
            } else {
                // Erro na requisição PUT
                console.error("Erro na requisição PUT:", this.status, this.responseText);
            }
        }
    };

    ajax.open("PUT", "http://localhost:3000/pacote/pacotes/" + idPacote, true);
    ajax.setRequestHeader("Content-type", "application/json");

    // Converte os dados em formato JSON e envia no corpo da requisição
    var dadosAtualizados = {
        nome: novoNome,
        preco: novoPreco
    };

    ajax.send(JSON.stringify(dadosAtualizados));
}


function excluir(id){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            buscarPacote();
        }
        ajax.open("DELETE", "http://localhost:3000/pacote/pacotes", id,true);
        ajax.send();       
    };
}

///////////////////////////// PEDIDO_PACOTE ///////////////////////////////////////

function adicionarPed_Pac() {
    pedido_id = document.getElementById("txtPedido_ID").value;
    pacote_id = document.getElementById("txtPacote_ID").value;
    preco = document.getElementById("txtPrecoPed_Pac").value;
    qtd = document.getElementById("txtQuantidadePed_Pac").value;

    if (pedido_id.length == 0 || pacote_id.length == 0) {
        alert("Os campos ID do Pedido e ID do Pacote são obrigatórios!");
    } else {
        ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert("Pedido Pacote cadastrado com sucesso!");
                buscarPed_Pac();
            } else if (this.readyState == 4) {
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:3000/ped_pac/pedidos_pacotes", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        ajax.send("pedido_id=" + pedido_id + "&pacote_id=" + pacote_id + "&preco=" + preco + "&quantidade=" + qtd);
    }
}

function buscarPed_Pac() {
    tabela = document.getElementById("tblPed_Pac")
    ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText);

            obj.forEach(pedido_pacote => {
                // Verifique se a linha já existe com base na combinação de pedido_id e pacote_id
                var linhaExistente = document.getElementById("p" + pedido_pacote.pedido_id + "_" + pedido_pacote.pacote_id);

                if (!linhaExistente) {
                    linha = tabela.insertRow(-1);
                    linha.id = "p" + pedido_pacote.pedido_id + "_" + pedido_pacote.pacote_id;

                    cellPreco = linha.insertCell(0);
                    cellQtd = linha.insertCell(1);
                    cellExcluir = linha.insertCell(2);

                    cellPreco.innerHTML = pedido_pacote.preco;
                    cellQtd.innerHTML = pedido_pacote.quantidade;
                    cellExcluir.innerHTML = "<button onclick='excluirPed_Pac(" + pedido_pacote.pedido_id + "," + pedido_pacote.pacote_id + ")'>" + "Excluir</button>";
                }
            });
        }
    };
    ajax.open("GET", "http://localhost:3000/ped_pac/pedidos_pacotes", true);
    ajax.send();
}

/// Não tem PUT

function excluir(id){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            buscarPed_Pac();
        }
        ajax.open("DELETE", "http://localhost:3000/ped_pac/pedidos_pacotes", id,true);
        ajax.send();       
    };
}

////////////////////////////// PEDIDO ////////////////////////////////
function adicionarPedido() {
    var nome = document.getElementById("txtNomePed").value;

    if (nome.length === 0) {
        alert("O campo nome é obrigatório!");
    } else {
        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(nome + " cadastrado com sucesso!");
                buscarPedido();
            } else if (this.readyState == 4) {
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:3000/pedido/pedidos", true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        var horario = document.getElementById("txtHorario").value;
        var quantidade = document.getElementById("txtQuantidade").value;
        var cliente_id = document.getElementById("txtCliente_ID").value;

        ajax.send(
            "nome=" + nome +
            "&horario=" + horario +
            "&quantidade=" + quantidade +
            "&cliente_id=" + cliente_id
        );
    }
}

function buscarPedido() {
    var tabela = document.getElementById("tblPedido");
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);

            obj.forEach(pedido => {
                if (document.getElementById("p" + pedido.id) == null) {
                    var linha = tabela.insertRow(-1);
                    linha.id = "p" + pedido.id;
                    var cellId = linha.insertCell(0);
                    var cellHorario = linha.insertCell(2);
                    var cellQuantidade = linha.insertCell(3);
                    var cellCliente_ID = linha.insertCell(4);
                    var cellExcluir = linha.insertCell(5);

                    cellId.innerHTML = pedido.id;
                    cellHorario.innerHTML = pedido.horario;
                    cellQuantidade.innerHTML = pedido.quantidade;
                    cellCliente_ID.innerHTML = pedido.cliente_id;
                    cellExcluir.innerHTML = "<button onclick='excluir(" + pedido.id + ")'>" + "Excluir</button>";
                }
            });
        }
    };

    ajax.open("GET", "http://localhost:3000/pedido/pedidos", true);
    ajax.send();
}

function alterarPedido() {
    var tabela = document.getElementById("tblPedido");
    var ajax = new XMLHttpRequest();

    // Obtém os valores a serem atualizados
    var idPedido = document.getElementById("txtIdPedido").value;
    var novoNome = document.getElementById("txtNovoNome").value;

    ajax.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Atualização bem-sucedida
                console.log("Pedido atualizado com sucesso!");
                // Atualizar a tabela, se necessário
                buscarPedido();
            } else {
                // Erro na requisição PUT
                console.error("Erro na requisição PUT:", this.status, this.responseText);
            }
        }
    };

    ajax.open("PUT", "http://localhost:3000/pedido/pedidos/" + idPedido, true);
    ajax.setRequestHeader("Content-type", "application/json");

    // Converte os dados em formato JSON e envia no corpo da requisição
    var dadosAtualizados = {
        nome: novoNome
        // Adicione outros campos, se necessário
    };

    ajax.send(JSON.stringify(dadosAtualizados));
}

function excluir(id){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            buscarPedido();
        }
        ajax.open("DELETE", "http://localhost:3000/pedido/pedidos", id,true);
        ajax.send();       
    };
}


/////////////////////////////

function limparCampos() {
    var opcaoSelecionadaDiv = document.getElementById('opcaoSelecionada');
    opcaoSelecionadaDiv.innerHTML = "";
}

function limparTabela() {
    var tabelaInfo = document.getElementById('tabelaInfo');
    tabelaInfo.querySelector('tbody').innerHTML = "";
}
