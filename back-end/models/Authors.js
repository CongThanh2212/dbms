const Sequelize = require("sequelize");
const sequelize = require('../database/connect');

const Authors = sequelize.define("authors", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Authors;
