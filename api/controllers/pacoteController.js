const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { BadRequestError } = require('restify-errors');

// Operações relacionadas aos pacotes

const getPacotes = async (req, res, next) => {
  try {
    const dados = await knex('pacotes');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const getPacotePorId = async (req, res, next) => {
  const idPacote = req.params.idProd;
  try {
    const dados = await knex('pacotes')
      .where('id', idPacote)
      .first();

    if (!dados || dados == '') {
      return res.status(400).send(new BadRequestError('Pacote não encontrado'));
    } else {
      res.send(dados);
    }
  } catch (error) {
    next(error);
  }
};

const getDisponiveis = async (req, res, next) => {
  try {
    const dados = await knex('pacotes')
      .where('disponivel', true);
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const adicionarPacote = async (req, res, next) => {
  try {
    const dados = await knex('pacotes')
      .insert(req.body)
      .returning('*');
    res.send(dados[0]);
  } catch (error) {
    next(error);
  }
};

const atualizarPacote = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('pacotes')
      .where('id', id)
      .update(req.body);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Esse Pacote não foi encontrado'));
    }
    res.send(`Pacote de id ${id} atualizado`);
  } catch (error) {
    next(error);
  }
};

const deletarPacote = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('pacotes')
      .where('id', id)
      .delete();

    if (!dados) {
      return res.status(400).send(new BadRequestError('Este Pacote não foi encontrado'));
    }
    res.send(`Pacote de id ${id} deletado`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPacotes,
  getPacotePorId,
  adicionarPacote,
  atualizarPacote,
  deletarPacote,
  getDisponiveis
};