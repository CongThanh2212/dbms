const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Users = require('./Users');

const Orders = sequelize.define("orders", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    orderCode: {
        type: Sequelize.STRING,
        allowNull: true
    },

    detail: {
        type: Sequelize.STRING,
        allowNull: true
    },

    userPhone: {
        type: Sequelize.STRING,
        allowNull: true
    },

    address: {
        type: Sequelize.STRING,
        allowNull: true
    },

    orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    shippedDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },

    paidAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    paidStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
    },

    paidAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },

});

Users.hasMany(Orders);
Orders.belongsTo(Users);

module.exports = Orders;
