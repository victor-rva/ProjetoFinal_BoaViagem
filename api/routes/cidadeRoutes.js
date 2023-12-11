const express = require('express');
const cidadeController = require('../controllers/cidadeController');

const router = express.Router();

router.get('/cidades', cidadeController.getCidades);
router.get('/cidades/:idCat', cidadeController.getCidadePorId);
router.post('/cidades', cidadeController.adicionarCidade);
router.put('/cidades/:id', cidadeController.atualizarCidade);
router.delete('/cidades/:id', cidadeController.deletarCidade);

module.exports = router;
