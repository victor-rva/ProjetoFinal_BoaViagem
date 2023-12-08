const categoriaController = require('../controllers/categoriaController');

function categoriaRoutes(servidor) {
  servidor.get('/categorias', categoriaController.getCategorias);
  servidor.get('/categorias/:idCat', categoriaController.getCategoriaPorId);
  servidor.post('/categorias', categoriaController.adicionarCategoria);
  servidor.put('/categorias/:id', categoriaController.atualizarCategoria);
  servidor.del('/categorias/:id', categoriaController.deletarCategoria);
}

module.exports = categoriaRoutes;