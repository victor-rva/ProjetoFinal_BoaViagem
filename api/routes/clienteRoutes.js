const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/clientes', clienteController.getClientes);
router.get('/clientes/:idCat', clienteController.getClientePorId);
router.post('/clientes', clienteController.adicionarCliente);
router.put('/clientes/:id', clienteController.atualizarCliente);
router.delete('/clientes/:id', clienteController.deletarCliente);

module.exports = router;
