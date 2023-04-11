const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Order = require('../models/Orders');
const Users = require('../models/Users');

let format = function (a) {
    let b = 'FAHASA_' + a;
    return b;
}

let localDate = function () {
    let data = Date.now() + 25200000;
    return new Date(data)
}

let shipDate = function () {
    let data = Date.now() + 259200000;
    return new Date(data);
}

let getOrderById = async (orderId) => {
    try {
        let result = await Order.findOne({
            where: {
                id: orderId
            }
        });
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getOrderByOrderCode = async(orderCode) => {
    try {
        let result = await Order.findOne({
            where: {
                orderCode: orderCode
            }
        });
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getAllOrder = async () => {
    try {
        let result = await sequelize.query(
            'select o.*, u.username from orders o join users u on u.id = o.userId order by o.id DESC;',
            {
                raw: true,
                type: QueryTypes.SELECT
            }
        );
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getOrderByUser = async (userId) => {
    try {
        let result = await sequelize.query(
            'select * from orders where userId = ? order by id DESC' , {
            raw: true,
            replacements: [userId],
            type: QueryTypes.SELECT
        }
        )
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addOrder = async (data) => {
    try {
        orderDate = localDate();
        shippedDate = shipDate();

        let user = await Users.findOne({
            where: {
                id: data.userId
            }
        });;
        const phoneNumber = user.phone;
        let result = await Order.create({
            id: data.id,
            orderDate: orderDate,
            shippedDate: shippedDate,
            userPhone: phoneNumber,
            address: data.address,
            paidAmount: data.paidAmount,
            userId: data.userId,
            paymentId: data.paymentId
        })
        const orderCode = format(result.id);
        result.set({
            orderCode: orderCode
        });
        result.save();
        return result;
    }
    catch (e) {
        throw e;
    }
}

let updateOrderStatus = async (orderId) => {
    try {
        let order = await Order.findOne({
            where: {
                id: orderId
            }
        });
        if (order.paidStatus == 1) {
            return temp = {
                message: "Đã xác nhận"
            }
        }
        order.set({
            detail: "Đơn hàng đã được thanh toán",
            paidAt: localDate(),
            paidStatus: 1
        })
        order.save();
        return order;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateOrderAdmin =  async(orderCode, data) => {
    try {
        let order = await Order.findOne({
            where: {
                orderCode: orderCode
            }
        });
        order.set({
            detail: data.detail,
            paidAt: data.paidAt
        })
        order.save();
        return order;
    } catch (e) {
        return e.name;
    }

}

let QRPaymentConfirm = async (orderId) => {
    try {
        let result = await Order.findOne({
            where: {
                id: orderId
            }
        })
        result.set({
            detail: "Thông tin thanh toán đang chờ được xác nhận"
        });
        result.save();
        return result;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteOrder = async (orderId) => {
    try {
        let order = await Order.findOne({
            where: {
                id: orderId,
            }
        });
        await order.destroy();
        return data = {
            message: "Deleted",
        }
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

module.exports = {
    getOrderById: getOrderById,
    getOrderByOrderCode: getOrderByOrderCode,
    getAllOrder: getAllOrder,
    getOrderByUser: getOrderByUser,
    QRPaymentConfirm: QRPaymentConfirm,
    addOrder: addOrder,
    updateOrderStatus: updateOrderStatus,
    updateOrderAdmin: updateOrderAdmin,
    deleteOrder: deleteOrder,
}