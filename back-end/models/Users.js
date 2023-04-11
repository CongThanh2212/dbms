const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Roles = require('./Roles');

const Users = sequelize.define("users", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    username:{
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    },

    password:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    firstname:{
        type: Sequelize.STRING,
        allowNull: true,
    },

    lastname:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    phone:{
        type: Sequelize.STRING,
        allowNull: true,
    }

});

Roles.hasOne(Users);
Users.belongsTo(Roles);

module.exports = Users;