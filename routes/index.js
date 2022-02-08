const express = require("express");
const router = express.Router();
const walletRoute = require("./wallet.js");
const flash = require('req-flash');
router.use(flash());

router.use(walletRoute);

module.exports = router;