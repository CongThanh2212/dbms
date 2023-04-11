const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Orders = require("./Orders");

const Payments = sequelize.define("payments", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    type:{
        type: Sequelize.STRING,
        allowNull: true,
    },
});

Payments.hasOne(Orders);
Orders.belongsTo(Payments);

module.exports = Payments;
