const knex = require('../knex');
const errors = require('restify-errors');

const getPed_Pac = (req, res, next) => {
  knex('pedidos_pacotes').then((dados) => {
    res.send(dados);
  }, next);
};

const adicionarPed_Pac = (req, res, next) => {
    knex('pedidos_pacotes')
      .insert(req.body)
      .returning('*')
      .then((dados) => {
        res.send(dados[0]);
      })
      .catch(next);
  };
  

module.exports = {
  getPed_Pac,
  adicionarPed_Pac
};