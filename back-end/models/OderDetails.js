const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Orders = require('./Orders');
const Products = require('./Products');

const OrderDetails = sequelize.define("orderdetails", {

    id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    price: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

});

Orders.belongsToMany(Products, {through: OrderDetails});
Products.belongsToMany(Orders, {through: OrderDetails});


module.exports = OrderDetails;
