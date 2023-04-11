const express = require('express');
const productSetController = require('../controllers/ProductSetController');

let router = express.Router();

router.get('/', productSetController.getAllProductSet);
router.get('/by-id/:productSetId', productSetController.getProductSetById);
router.get('/by-provider/:providerId', productSetController.getProductSetByProvider);
router.get('/admin/info', productSetController.getProducSetInfo);
router.post('/add', productSetController.addProductSet);
router.post('/admin/add', productSetController.addProductSetByAdmin);
router.put('/admin/update', productSetController.updateProductSetAdmin);
router.put('/update', productSetController.updateProductSet);
router.delete('/delete/:productSetId', productSetController.deleteProductSet);

module.exports = router;
