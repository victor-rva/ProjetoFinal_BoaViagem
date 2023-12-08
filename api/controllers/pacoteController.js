// categoriaController.js
const knex = require('../knex'); // Importe o arquivo knexfile.js que acabamos de criar
const errors = require('restify-errors');

// Aqui você pode definir todas as operações relacionadas à categoria

const getPacotes = (req, res, next) => {
  knex('pacotes').then((dados) => {
    res.send(dados);
  }, next);
};

const getPacotePorId = (req, res, next) => {
  const idPacote = req.params.idProd;
  knex('pacotes')
    .where('id', idPacote)
    .first()
    .then((dados) => {
      if (!dados || dados == '') {
        return res.send(new errors.BadRequestError('Pacote não encontrado'));
      } else {
        res.send(dados);
      }
    });
};

const getDisponiveis = (req, res, next) => {
  knex('pacotes')
  .where('disponivel',true)
  .then((dados) => {
    res.send(dados);
  }, next);
};


const adicionarPacote = (req, res, next) => {
    knex('pacotes')
      .insert(req.body)
      .returning('*')
      .then((dados) => {
        res.send(dados[0]);
      })
      .catch(next);
  };

const atualizarPacote = (req, res, next) => {
    const id = req.params.id;
    knex('pacotes')
      .where('id', id)
      .update(req.body)
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Esse Pacote não foi encontrado'));
        }
        res.send("Cliente de id "+id+" atualizado");
      })
      .catch(next);
  };
  
  const deletarPacote = (req, res, next) => {
    const id = req.params.id;
    knex('pacotes')
      .where('id', id)
      .delete()
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Este Pacote não foi encontrado'));
        }
        res.send("Pacote de id "+id+" deletada");
      })
      .catch(next);
  };
  

module.exports = {
  getPacotes,
  getPacotePorId,
  adicionarPacote,
  atualizarPacote,
  deletarPacote,
  getDisponiveis
};