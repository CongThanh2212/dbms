const orderDetailService = require('../services/OrderDetailService');

const getAllOrderDetail = async (req, res) => {
    const result = await orderDetailService.getAllOrderDetail();
    res.send(result);
}

const getOrderDetailById = async (req, res) => {
    let orderDetailId = req.params.orderDetailId;
    const result = await orderDetailService.getOrderDetailById(orderDetailId);
    res.send(result);
}

const getOrderDetailByOrderCode = async(req, res) => {
    let orderCode = req.query.code;
    const result = await orderDetailService.getOrderDetailByOrderCode(orderCode);
    res.send(result);
}

const addOrderDetail = async (req, res) => {
    let data = req.body;
    const result = await orderDetailService.addOrderDetail(data);
    res.send(result);
}

const getOrderDetailByOrderId = async(req, res) => {
    let orderId = req.params.orderId;
    const result = await orderDetailService.getOrderDetailByOrderId(orderId);
    res.send(result);
}

const deleteOrderDetail = async (req, res) => {
    let orderDetailId = req.params.orderDetailId;
    const result = await orderDetailService.deleteOrderDetail(orderDetailId);
    res.send(result);
}

module.exports = {
    getAllOrderDetail: getAllOrderDetail,
    getOrderDetailById: getOrderDetailById,
    getOrderDetailByOrderCode: getOrderDetailByOrderCode,
    addOrderDetail: addOrderDetail,
    getOrderDetailByOrderId: getOrderDetailByOrderId,
    deleteOrderDetail: deleteOrderDetail,
}