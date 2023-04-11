const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Payment = require('../models/Payments');

let getPaymentById = async (paymentId) => {
    try {
        let result = await Payment.findOne({
            where: {
                id: paymentId,
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

let getAllPayment = async () => {
    try {
        let result = await Payment.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addPayment = async (data) => {
    try {
        let result = await Payment.create({
            id: data.id,
            type: data.type,
        })
        return result;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updatePayment = async (data) => {
    try {
        let payment = await Payment.findOne({
            where:
                { id: data.id }
        });

        payment.set({
            id: data.id,
            type: data.type
        })
        await payment.save();
        return payment;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deletePayment = async (paymentId) => {
    try {
        let payment = await Payment.findOne({
            where: {
                id: paymentId,
            }
        });
        await payment.destroy();
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
    getPaymentById: getPaymentById,
    getAllPayment: getAllPayment,
    addPayment: addPayment,
    updatePayment: updatePayment,
    deletePayment: deletePayment,
}