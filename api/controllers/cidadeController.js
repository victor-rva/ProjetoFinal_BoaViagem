// categoriaController.js
const knex = require('../knex'); // Importe o arquivo knexfile.js que acabamos de criar
const errors = require('restify-errors');

// Aqui você pode definir todas as operações relacionadas à categoria

const getCidades = (req, res, next) => {
  knex('cidades').then((dados) => {
    res.send(dados);
  }, next);
};

const getCidadePorId = (req, res, next) => {
  const idCategoria = req.params.idCat;
  knex('cidades')
    .where('id', idCategoria)
    .first()
    .then((dados) => {
      if (!dados || dados == '') {
        return res.send(new errors.BadRequestError('Produto não encontrado'));
      } else {
        res.send(dados);
      }
    });
};

const adicionarCidade = (req, res, next) => {
    knex('cidades')
      .insert(req.body)
      .returning('*')
      .then((dados) => {
        res.send(dados[0]);
      })
      .catch(next);
  };

const atualizarCidade = (req, res, next) => {
    const id = req.params.id;
    knex('cidades')
      .where('id', id)
      .update(req.body)
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Essa categoria não foi encontrada'));
        }
        res.send("Categoria de id "+id+" atualizado");
      })
      .catch(next);
  };
  
  const deletarCidade = (req, res, next) => {
    const id = req.params.id;
    knex('cidades')
      .where('id', id)
      .delete()
      .then((dados) => {
        if (!dados) {
          return res.send(new errors.BadRequestError('Esta categoria não foi encontrada'));
        }
        res.send("Categoria de id "+id+" deletada");
      })
      .catch(next);
  };
  

module.exports = {
  getCidades,
  getCidadePorId,
  adicionarCidade,
  atualizarCidade,
  deletarCidade,
};