const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { BadRequestError } = require('restify-errors');

// Aqui você pode definir todas as operações relacionadas à categoria

const getCategorias = async (req, res, next) => {
  try {
    const dados = await knex('categorias');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const getCategoriaPorId = async (req, res, next) => {
  const idCategoria = req.params.idCat;
  try {
    const dados = await knex('categorias')
      .where('id', idCategoria)
      .first();

    if (!dados || dados == '') {
      return res.status(400).send(new BadRequestError('Categoria não encontrada'));
    } else {
      res.send(dados);
    }
  } catch (error) {
    next(error);
  }
};

const adicionarCategoria = async (req, res, next) => {
  try {
    const dados = await knex('categorias').insert(req.body);
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const atualizarCategoria = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('categorias')
      .where('id', id)
      .update(req.body);

    if (!dados) {
      return res.status(400).send(new BadRequestError('Essa categoria não foi encontrada'));
    }
    res.send(`Categoria de id ${id} atualizada`);
  } catch (error) {
    next(error);
  }
};

const deletarCategoria = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dados = await knex('categorias')
      .where('id', id)
      .delete();

    if (!dados) {
      return res.status(400).send(new BadRequestError('Esta categoria não foi encontrada'));
    }
    res.send(`Categoria de id ${id} deletada`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategorias,
  getCategoriaPorId,
  adicionarCategoria,
  atualizarCategoria,
  deletarCategoria,
};
