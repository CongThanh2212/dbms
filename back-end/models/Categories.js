const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const ProductSets = require("./ProductSets");

const Categories = sequelize.define("categories", {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Categories;
