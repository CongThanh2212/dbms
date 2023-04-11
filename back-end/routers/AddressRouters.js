const express = require('express');
const addressController = require('../controllers/AddressController');

let router = express.Router();

router.get('/', addressController.getAllAddress);
router.get('/by-user/:userId', addressController.getAddressByUserId);
router.get('/by-id/:addressId', addressController.getAddressById);
router.post('/add', addressController.addAddress);
router.put('/update', addressController.updateAddress);
router.delete('/delete/:addressId', addressController.deleteAddress);

module.exports = router;
