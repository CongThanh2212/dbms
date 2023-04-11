const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Category = require('../models/Categories');

let getCategoryById = async (categoryId) => {
    try {
        let result = await Category.findOne({
            where: {
                id: categoryId,
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

let getAllCategory = async () => {
    try {
        let result = await Category.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addCategory = async (data) => {
    try {
        let category = await Category.create({
            id: data.id,
            name: data.name,
            description: data.description,
        })
        return category;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateCategory = async (data) => {
    try {
        let category = await Category.findOne({
            where:
                { id: data.id }
        });

        category.set({
            id: data.id,
            name: data.name,
            description: data.description,
        })
        await category.save();
        return category;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteCategory = async (categoryId) => {
    try {
        let category = await Category.findOne({
            where: {
                id: categoryId,
            }
        });
        await category.destroy();
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
    getCategoryById: getCategoryById,
    getAllCategory: getAllCategory,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
}