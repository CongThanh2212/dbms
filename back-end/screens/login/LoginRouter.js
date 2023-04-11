const express = require('express');
const loginController = require('./LoginController');
let router = express.Router();

router.get('/');
router.post('/', loginController.checkUserLogin, loginController.checkUserRole);

module.exports = router;