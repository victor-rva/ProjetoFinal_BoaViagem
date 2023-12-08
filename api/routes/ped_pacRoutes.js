const ped_pacController = require('../controllers/ped_pacController');

function ped_pacRoutes(servidor) {
  servidor.get('/pedidos_pacotes', ped_pacController.getPed_Pac);
  servidor.post('/pedidos_pacotes', ped_pacController.adicionarPed_Pac);
}

module.exports = ped_pacRoutes;