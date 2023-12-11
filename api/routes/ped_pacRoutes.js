const express = require('express');
const ped_pacController = require('../controllers/ped_pacController');

const router = express.Router();

router.get('/pedidos_pacotes', ped_pacController.getPed_Pac);
router.post('/pedidos_pacotes', ped_pacController.adicionarPed_Pac);

module.exports = router;
