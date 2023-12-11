const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/categorias', categoriaController.getCategorias);
router.get('/categorias/:idCat', categoriaController.getCategoriaPorId);
router.post('/categorias', categoriaController.adicionarCategoria);
router.put('/categorias/:id', categoriaController.atualizarCategoria);
router.delete('/categorias/:id', categoriaController.deletarCategoria);

module.exports = router;
