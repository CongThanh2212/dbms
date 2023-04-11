const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const OrderDetail = require('../models/OderDetails');
const Orders = require('../models/Orders');
const Products = require('../models/Products');
const OrderService = require('./OrderService');

let getOrderDetailById = async (orderDetailId) => {
    try {
        let result = await OrderDetail.findOne({
            where: {
                id: orderDetailId,
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

let getAllOrderDetail = async () => {
    try {
        let result = await OrderDetail.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getOrderDetailByOrderCode = async (orderCode) => {
    try {
        let order = await OrderService.getOrderByOrderCode(orderCode);
        let orderDetail = await sequelize.query(
            'select od.id as orderId, p.id as productId, p.productName, od.orderNumber, od.price'
            + ' from orderdetails od'
            + ' join orders o on o.id = od.orderId'
            + ' join products p on p.id = od.productId'
            + ' where o.id = ?'
            + ' order by od.id desc ;', {
            raw: true,
            replacements: [order.id],
            type: QueryTypes.SELECT
        });
        return orderDetail;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addOrderDetail = async (data) => {

    try {
        var list = [];
        for (i = 1; i < data.length; i++) {
            let result = await OrderDetail.create({
                id: data[i].id,
                orderNumber: data[i].orderNumber,
                price: data[i].price,
                orderId: data[0].id,
                productId: data[i].productId,
            });
            let product = await Products.findOne({
                where: {
                    id: data[i].productId
                }
            });
            let amount = product.quantityInStock - data[i].orderNumber;
            let soldNumber = product.soldNumber + data[i].orderNumber;
            if (amount < 0) {
                amount = 0;
            }

            product.set({
                quantityInStock: amount,
                soldStatus: !(amount == 0),
                soldNumber: soldNumber
            })

            product.save();
            list.push(result)
        }

        return list;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getOrderDetailByOrderId = async (orderId) => {
    try {
        let orderDetail = await sequelize.query(
            'select od.id as orderId, p.id as productId, p.productName, od.orderNumber, od.price'
            + ' from orderdetails od'
            + ' join orders o on o.id = od.orderId'
            + ' join products p on p.id = od.productId'
            + ' where o.id = ?'
            + ' order by od.id desc ;', {
            raw: true,
            replacements: [orderId],
            type: QueryTypes.SELECT
        });
        return orderDetail;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteOrderDetail = async (orderDetailId) => {
    try {
        let orderDetail = await OrderDetail.findOne({
            where: {
                id: orderDetailId,
            }
        });
        await orderDetail.destroy();
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
    getOrderDetailById: getOrderDetailById,
    getAllOrderDetail: getAllOrderDetail,
    getOrderDetailByOrderCode: getOrderDetailByOrderCode,
    addOrderDetail: addOrderDetail,
    getOrderDetailByOrderId: getOrderDetailByOrderId,
    deleteOrderDetail: deleteOrderDetail,
}