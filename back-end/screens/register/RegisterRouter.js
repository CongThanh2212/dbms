const express = require('express');
const registerController = require('./RegisterController');
let router = express.Router();

router.get('/');
router.post('/', registerController.checkRegister, registerController.checkUserRole);

module.exports = router;