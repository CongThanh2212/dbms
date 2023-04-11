const orderService = require("../services/OrderService");
const orderDetailService = require("../services/OrderDetailService");
const UserService = require("../services/UserService");

const getAllOrder = async (req, res) => {
    const result = await orderService.getAllOrder();
    res.send(result);
};

const getOrderById = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.getOrderById(orderId);
    res.send(result);
};

const getOrderByOrderCode = async(req, res) => {
    let orderCode = req.query.orderCode;
    const result = await orderService.getOrderByOrderCode(orderCode);
    res.send(result);
}

const getOrderByUser = async (req, res) => {
    let userId = req.params.userId;
    const result = await orderService.getOrderByUser(userId);
    res.send(result);
};

const addOrder = async (req, res) => {
    let data = req.body;
    let orderData = data[0];
    let productData = data;

    //Create Order
    const order = await orderService.addOrder(orderData);

    //update data[0] or addOrderDetail
    data[0] = order;

    const product = await orderDetailService.addOrderDetail(productData);

    if (data[0].paymentId == 2) {
        res.send({ message: "Đơn hàng của bạn đã được tiếp nhận" });
    } else {
        //QR check
        let amount = data[0].paidAmount;
        let description = "Paid_" + order.orderCode;
        let url =
            process.env.PAYMENT_QR_URL +
            amount +
            "&accountName=" +
            process.env.PAYMENT_QR_ACCOUNTNAME +
            "&addInfo=" +
            description;
        result = {
            orderId: order.id,
            paymentUrl: url,
        };
        res.send(result);
    }
};

const QRPaymentConfirm = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.QRPaymentConfirm(orderId);
    res.send(result);
};

const updateOrderStatus = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.updateOrderStatus(orderId);
    res.send(result);
};

const updateOrderAdmin = async(req, res) => {
    let orderCode = req.params.orderCode;
    let data = req.body;
    const result = await orderService.updateOrderAdmin(orderCode, data);
    res.send(result);
}

const deleteOrder = async (req, res) => {
    let orderId = req.params.orderId;
    const result = await orderService.deleteOrder(orderId);
    res.send(result);
};

module.exports = {
    getAllOrder: getAllOrder,
    getOrderByUser: getOrderByUser,
    getOrderById: getOrderById,
    getOrderByOrderCode: getOrderByOrderCode,
    QRPaymentConfirm: QRPaymentConfirm,
    addOrder: addOrder,
    updateOrderStatus: updateOrderStatus,
    updateOrderAdmin: updateOrderAdmin,
    deleteOrder: deleteOrder,
};
