const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Users = require("./Users");


const Roles = sequelize.define("roles", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    description:{
        type: Sequelize.STRING,
        allowNull: true,
    }

});


module.exports = Roles;
