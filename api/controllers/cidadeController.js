const express = require('express');
const router = express.Router();
const knex = require('../knex'); // Importe o arquivo knexfile.js que acabamos de criar
const { BadRequestError } = require('restify-errors');

// Operações relacionadas as cidades

const getCidades = async (req, res, next) => {
  try {
    const dados = await knex('cidades');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const getCidadePorId = async (req, res, next) => {
  const idCategoria = req.params.idCat;
  try {
    const dados = await knex('cidades')
      .where('id', idCategoria)
      .first();

    if (!dados || dados == '') {
      return res.status(400).send(new BadRequestError('Produto não encontrado'));
    } else {
      res.send(dados);
    }
  } catch (error) {
    next(error);
  }
};

const adicionarCidade = async (req, res, next) => {
  try {
    const dados = await knex('cidades')
      .insert(req.body);
      // .returning('*');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const atualizarCidade = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('cidades')
      .where('id', id)
      .update(req.body);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Essa categoria não foi encontrada'));
    }
    res.send(`Cidade de id ${id} atualizada`);
  } catch (error) {
    next(error);
  }
};

const deletarCidade = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('cidades')
      .where('id', id)
      .delete();

    if (!dados) {
      return res.status(400).send(new BadRequestError('Esta categoria não foi encontrada'));
    }
    res.send(`Cidade de id ${id} deletada`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCidades,
  getCidadePorId,
  adicionarCidade,
  atualizarCidade,
  deletarCidade,
};
