const express = require('express');
let router = express.Router();
const searchController = require('../controllers/SearchController');

router.get('/', searchController.getResult);


module.exports = router;