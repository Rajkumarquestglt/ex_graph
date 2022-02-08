const express = require("express")
const router = express.Router()
const walletController = require('../controllers/walletController');

router.post('/getGraph',walletController.coinStatesInGraph);


module.exports = router;