const pacoteController = require('../controllers/pacoteController');

function pacoteRoutes(servidor) {
  servidor.get('/pacotes', pacoteController.getPacotes);
  servidor.get('/pacotesdis', pacoteController.getPacotes);
  servidor.get('/pacotes/:idProd', pacoteController.getPacotePorId);
  servidor.post('/pacotes', pacoteController.adicionarPacote);
  servidor.put('/pacotes/:id', pacoteController.atualizarPacote);
  servidor.del('/pacotes/:id', pacoteController.deletarPacote);
}

module.exports = pacoteRoutes;