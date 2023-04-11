const paymentService = require('../services/PaymentService');

const getAllPayment = async (req, res) => {
    const result = await paymentService.getAllPayment();
    res.send(result);
}

const getPaymentById = async (req, res) => {
    let paymentId = req.params.paymentId;
    const result = await paymentService.getPaymentById(paymentId);
    res.send(result);
}

const addPayment = async (req, res) => {
    let data = req.body;
    const result = await paymentService.addPayment(data);
    res.send(result);
}

const updatePayment = async (req, res) => {
    let data = req.body;
    const result = await paymentService.updatePayment(data);
    res.send(result);
}

const deletePayment = async (req, res) => {
    let paymentId = req.params.paymentId;
    const result = await paymentService.deletePayment(paymentId);
    res.send(result);
}

module.exports = {
    getAllPayment: getAllPayment,
    getPaymentById: getPaymentById,
    addPayment: addPayment,
    updatePayment: updatePayment,
    deletePayment: deletePayment,
}