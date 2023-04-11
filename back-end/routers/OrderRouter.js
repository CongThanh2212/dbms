const express = require('express');
const orderController = require('../controllers/OrderController');

let router = express.Router();

router.get('/', orderController.getAllOrder);
router.get('/by-id/:orderId', orderController.getOrderById);
router.get('/by-code', orderController.getOrderByOrderCode);
router.get('/by-user/:userId', orderController.getOrderByUser);
router.post('/add', orderController.addOrder);
router.put('/confirm/:orderId', orderController.QRPaymentConfirm);
router.put('/admin/update/:orderCode', orderController.updateOrderAdmin);
router.put('/update/:orderId', orderController.updateOrderStatus);
router.delete('/delete/:orderId', orderController.deleteOrder);


module.exports = router;
