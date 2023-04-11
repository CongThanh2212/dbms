const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Categories = require("./Categories");
const Products = require("./Products");

const ProductCategories = sequelize.define("productcategories", {

    productId:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    categoryId:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },

},
{
    tableName: "product_category"
});

Categories.belongsToMany(Products, {through: ProductCategories});
Products.belongsToMany(Categories, {through: ProductCategories});

module.exports = ProductCategories;
