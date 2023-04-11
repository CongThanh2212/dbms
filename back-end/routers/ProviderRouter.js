const express = require('express');
const providerController = require('../controllers/ProviderController');

let router = express.Router();

router.get('/', providerController.getAllProvider);
router.get('/by-id/:providerId', providerController.getProviderById);
router.post('/add', providerController.addProvider);
router.put('/update', providerController.updateProvider);
router.delete('/delete/:providerId', providerController.deleteProvider);

module.exports = router;
