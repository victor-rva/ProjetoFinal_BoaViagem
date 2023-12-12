const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { BadRequestError } = require('restify-errors');

// Operações relacionadas aos clientes

const getClientes = async (req, res, next) => {
  try {
    const dados = await knex('clientes');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const getClientePorId = async (req, res, next) => {
  const idCliente = req.params.idCat;
  try {
    const dados = await knex('clientes')
      .where('id', idCliente)
      .first();

    if (!dados || dados == '') {
      return res.status(400).send(new BadRequestError('Cliente não encontrado'));
    } else {
      res.send(dados);
    }
  } catch (error) {
    next(error);
  }
};

const adicionarCliente = async (req, res, next) => {
  try {
    const dados = await knex('clientes')
      .insert(req.body)
      .returning('*');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const atualizarCliente = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('clientes')
      .where('id', id)
      .update(req.body);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Esse cliente não foi encontrado'));
    }
    res.send(`Cliente de id ${id} atualizado`);
  } catch (error) {
    next(error);
  }
};

const deletarCliente = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('clientes')
      .where('id', id)
      .delete();

    if (!dados) {
      return res.status(400).send(new BadRequestError('Este cliente não foi encontrado'));
    }
    res.send(`Cliente de id ${id} deletado`);
  } catch (error) {
    next(error);
  }
};

const realizarPedido = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('clientes')
      .where('id', id);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Este cliente não foi encontrado'));
    }
    // Lógica para realizar um pedido
    res.send(`Pedido realizado para o cliente de id ${id}`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClientes,
  getClientePorId,
  adicionarCliente,
  atualizarCliente,
  deletarCliente,
  realizarPedido
};