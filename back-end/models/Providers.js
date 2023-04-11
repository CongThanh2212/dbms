const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Providers = sequelize.define("providers", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },

});

module.exports = Providers;
