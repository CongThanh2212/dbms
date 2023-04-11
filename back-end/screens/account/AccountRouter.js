const express = require('express');
const accountController = require('./AccountController');
let router = express.Router();

router.post('/updatePassword', accountController.updatePassword);

module.exports = router;