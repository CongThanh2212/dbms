const userRouter = require('./UserRouters');
const roleRouter = require('./RoleRouter');
const providerRouter = require('./ProviderRouter');
const productSetRouter = require('./ProductSetRouter');
const productRouter = require('./ProductRouter');
const paymentRouter = require('./PaymentRouter');
const orderRouter = require('./OrderRouter');
const orderDetailRouter = require('./OrderDetailRouter');
const categoryRouter = require('./CategoryRouter');
const authorRouter = require('./AuthorRouter');
const addressRouter = require('./AddressRouters');
const express = require('express');
let router = express.Router();

router.use('/user', userRouter),
router.use('/role', roleRouter),
router.use('/provider', providerRouter),
router.use('/product-set',productSetRouter),
router.use('/product', productRouter),
router.use('/payment', paymentRouter),
router.use('/order', orderRouter),
router.use('/order-detail', orderDetailRouter),
router.use('/category', categoryRouter),
router.use('/author', authorRouter),
router.use('/address', addressRouter),

module.exports = router;