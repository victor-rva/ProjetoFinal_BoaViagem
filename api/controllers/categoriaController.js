const knex = require('../knex');
const errors = require('restify-errors');

// Aqui você pode definir todas as operações relacionadas à categoria

const getCategorias = (req, res, next) => {
  knex('categorias').then((dados) => {
    res.send(dados);
  }, next);
};

const getCategoriaPorId = (req, res, next) => {
  const idCategoria = req.params.idCat;
  knex('categorias')
    .where('id', idCategoria)
    .first()
    .then((dados) => {
      if (!dados || dados == '') {
        return res.send(new errors.BadRequestError('Categoria não encontrado'));
      } else {
        res.send(dados);
      }
    });
};

const adicionarCategoria = (req, res, next) => {
  knex('categorias')
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next);
};

const atualizarCategoria = (req, res, next) => {
    const id = req.params.id;
    knex('categorias')
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
  
  const deletarCategoria = (req, res, next) => {
    const id = req.params.id;
    knex('categorias')
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
  getCategorias,
  getCategoriaPorId,
  adicionarCategoria,
  atualizarCategoria,
  deletarCategoria,
};
