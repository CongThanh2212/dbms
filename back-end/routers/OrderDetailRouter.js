const express = require('express');
const orderDetailController = require('../controllers/OrderDetailController');

let router = express.Router();

router.get('/', orderDetailController.getAllOrderDetail);
router.get('/by-id/:orderDetailId', orderDetailController.getOrderDetailById);
router.get('/by-order/:orderId', orderDetailController.getOrderDetailByOrderId);
router.get('/by-code', orderDetailController.getOrderDetailByOrderCode);
router.post('/add', orderDetailController.addOrderDetail);
router.delete('/delete/:orderDetailId', orderDetailController.deleteOrderDetail);

module.exports = router;
