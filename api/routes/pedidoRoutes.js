const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.get('/pedidos', pedidoController.getPedidos);
router.get('/pedidos/:id', pedidoController.getPedidoPorId);
router.get('/pedidos/clientes/:id', pedidoController.getPedidosPorCliente);
router.post('/pedidos', pedidoController.adicionarPedido);
router.put('/pedidos/:id', pedidoController.atualizarPedido);
router.delete('/pedidos/:id', pedidoController.deletarPedido);

module.exports = router;
