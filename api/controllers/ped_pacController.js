const express = require('express');
const router = express.Router();
const knex = require('../knex');
const { BadRequestError } = require('restify-errors');

const getPed_Pac = async (req, res, next) => {
  try {
    const dados = await knex('pedidos_pacotes');
    res.send(dados);
  } catch (error) {
    next(error);
  }
};

const adicionarPed_Pac = async (req, res, next) => {
  try {
    const dados = await knex('pedidos_pacotes')
      .insert(req.body)
      .returning('*');
    res.send(dados[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPed_Pac,
  adicionarPed_Pac
};