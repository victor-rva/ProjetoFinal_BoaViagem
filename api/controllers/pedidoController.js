// categoriaController.js
const knex = require('../knex'); // Importe o arquivo knexfile.js que acabamos de criar
const errors = require('restify-errors');

// Aqui você pode definir todas as operações relacionadas à categoria

const getPedidos = (req, res, next) => {
  knex('pedidos').then((dados) => {
    res.send(dados);
  }, next);
};


const getPedidoPorId = (req, res, next) => {
  const idPedido = req.params.id;
  knex('pedidos')
    .where('id', idPedido)
    .first()
    .then((dados) => {
      if (!dados || dados == '') {
        return res.send(new errors.BadRequestError('Pedido não encontrado'));
      } else {
        res.send(dados);
      }
    });
};

const getPorCliente = (req, res, next) => {
  //retorna todos os pedidos desse cliente
  const idCliente = req.params.id;
  knex('pedidos')
    .where('id_cliente', idCliente)
    .first()
    .then((dados) => {
      if (!dados || dados == '') {
        return res.send(new errors.BadRequestError('Pedido não encontrado'));
      } else {
        res.send(dados);
      }
    });
};

const adicionarPedido = (req, res, next) => {
    knex('pedidos')
      .insert(req.body)
      .returning('*')
      .then((dados) => {
        res.send(dados[0]);
      })
      .catch(next);
  };

const atualizarPedido = (req, res, next) => {
    const id = req.params.id;
    knex('pedidos')
      .where('id', id)
      .update(req.body)
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Esse pedido não foi encontrado'));
        }
        res.send("Pedido de id "+id+" atualizado");
      })
      .catch(next);
  };
  
  const deletarPedido = (req, res, next) => {
    //Não deleta o pedido, só o torna "inativo"
    const id = req.params.id;
    knex('pedidos')
      .where('id', id)
      .update("ativo",false)
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Este pedido não foi encontrado'));
        }
        res.send("Pedido de id "+id+" deletado");
      })
      .catch(next);
  };

module.exports = {
  getPedidos,
  adicionarPedido,
  atualizarPedido,
  deletarPedido,
  getPedidoPorId,
  getPorCliente
};