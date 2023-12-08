const pedidoController = require('../controllers/pedidoController');

function pedidoRoutes(servidor) {
  servidor.get('/pedidos', pedidoController.getPedidos);
  servidor.get('/pedidos/:id', pedidoController.getPedidoPorId);
  servidor.get('/pedidos/clientes/:id',pedidoController.getPorCliente);
  servidor.post('/pedidos', pedidoController.adicionarPedido);
  servidor.put('/pedidos/:id', pedidoController.atualizarPedido);
  servidor.del('/pedidos/:id', pedidoController.deletarPedido);
}

module.exports = pedidoRoutes;