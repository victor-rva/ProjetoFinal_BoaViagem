// categoriaController.js
const knex = require('../knex'); // Importe o arquivo knexfile.js que acabamos de criar
const errors = require('restify-errors');

// Aqui você pode definir todas as operações relacionadas à categoria

const getClientes = (req, res, next) => {
  knex('clientes').then((dados) => {
    res.send(dados);
  }, next);
};

const getClientePorId = (req, res, next) => {
  const idCategoria = req.params.idCat;
  knex('clientes')
    .where('id', idCategoria)
    .first()
    .then((dados) => {
      if (!dados || dados == '') {
        return res.send(new errors.BadRequestError('Cliente não encontrado'));
      } else {
        res.send(dados);
      }
    });
};

const adicionarCliente = (req, res, next) => {
    knex('clientes')
      .insert(req.body)
      .returning('*')
      .then((dados) => {
        res.send(dados[0]);
      })
      .catch(next);
  };

const atualizarCliente = (req, res, next) => {
    const id = req.params.id;
    knex('clientes')
      .where('id', id)
      .update(req.body)
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Esse cliente não foi encontrado'));
        }
        res.send("Cliente de id "+id+" atualizado");
      })
      .catch(next);
  };
  
  const deletarCliente = (req, res, next) => {
    const id = req.params.id;
    knex('clientes')
      .where('id', id)
      .delete()
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Este cliente não foi encontrado'));
        }
        res.send("Cliente de id "+id+" deletada");
      })
      .catch(next);
  };

  const realizarPedido = (req, res, next) => {
    const id = req.params.id;
    knex('clientes')
      .where('id', id)
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Este cliente não foi encontrado'));
        }
        res.send("Cliente de id "+id+" deletada");
      })
      .catch(next);
  };
  

module.exports = {
  getClientes,
  getClientePorId,
  adicionarCliente,
  atualizarCliente,
  deletarCliente,
  realizarPedido
};