const express = require('express');
const paymentController = require('../controllers/PaymentController');

let router = express.Router();

router.get('/', paymentController.getAllPayment);
router.get('/by-id/:paymentId', paymentController.getPaymentById);
router.post('/add', paymentController.addPayment);
router.put('/update', paymentController.updatePayment);
router.delete('/delete/:paymentId', paymentController.deletePayment);

module.exports = router;
