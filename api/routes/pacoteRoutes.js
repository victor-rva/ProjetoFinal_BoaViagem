const express = require('express');
const router = express.Router();
const pacoteController = require('../controllers/pacoteController');

router.get('/pacotes', pacoteController.getPacotes);
router.get('/pacotesdis', pacoteController.getPacotes);
router.get('/pacotes/:idProd', pacoteController.getPacotePorId);
router.post('/pacotes', pacoteController.adicionarPacote);
router.put('/pacotes/:id', pacoteController.atualizarPacote);
router.delete('/pacotes/:id', pacoteController.deletarPacote);

module.exports = router;
