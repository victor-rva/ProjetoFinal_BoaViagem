const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { BadRequestError } = require('restify-errors');

// Operações relacionadas aos pedidos

const getPedidos = async (req, res, next) => {
  try {
    const dados = await knex('pedidos');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const getPedidoPorId = async (req, res, next) => {
  const idPedido = req.params.id;
  try {
    const dados = await knex('pedidos')
      .where('id', idPedido)
      .first();

    if (!dados || dados == '') {
      return res.status(400).send(new BadRequestError('Pedido não encontrado'));
    } else {
      res.send(dados);
    }
  } catch (error) {
    next(error);
  }
};

const getPedidosPorCliente = async (req, res, next) => {
  // Retorna todos os pedidos desse cliente
  const idCliente = req.params.id;
  try {
    const dados = await knex('pedidos')
      .where('id_cliente', idCliente)
      .first();

    if (!dados || dados == '') {
      return res.status(400).send(new BadRequestError('Pedido não encontrado'));
    } else {
      res.send(dados);
    }
  } catch (error) {
    next(error);
  }
};

const adicionarPedido = async (req, res, next) => {
  try {
    const dados = await knex('pedidos')
      .insert(req.body)
      .returning('*');
    res.send(dados[0]);
  } catch (error) {
    next(error);
  }
};

const atualizarPedido = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('pedidos')
      .where('id', id)
      .update(req.body);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Esse pedido não foi encontrado'));
    }
    res.send(`Pedido de id ${id} atualizado`);
  } catch (error) {
    next(error);
  }
};

const deletarPedido = async (req, res, next) => {
  // Não deleta o pedido, só o torna "inativo"
  const id = req.params.id;
  try {
    const dados = await knex('pedidos')
      .where('id', id)
      .update("ativo", false);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Este pedido não foi encontrado'));
    }
    res.send(`Pedido de id ${id} deletado`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPedidos,
  adicionarPedido,
  atualizarPedido,
  deletarPedido,
  getPedidoPorId,
  getPedidosPorCliente
};