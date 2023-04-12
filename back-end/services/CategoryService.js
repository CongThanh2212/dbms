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
        let result;
        await sequelize.transaction(async (t) => {
            await Category.findOne({
              order: [['id', 'DESC']],
              limit: 1,
              lock: true,
              transaction: t,
            });
            result = await Category.create(
              {
                id: data.id,
                name: data.name,
                description: data.description
              },
              { transaction: t }
            );
        });

        // let category = await Category.create({
        //     id: data.id,
        //     name: data.name,
        //     description: data.description,
        // })
        return result;
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
        let category;
        await sequelize.transaction(async (t) => {
            category = await Category.findOne({
              where: { id: data.id },
              lock: true,
              transaction: t,
            });
            category.id = data.id;
            category.name = data.name;
            category.description = data.description;
            await category.save({ transaction: t });
        });

        // let category = await Category.findOne({
        //     where:
        //         { id: data.id }
        // });

        // category.set({
        //     id: data.id,
        //     name: data.name,
        //     description: data.description,
        // })
        // await category.save();
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
        await sequelize.transaction(async (t) => {
            const category = await Category.findOne({
              where: { id: categoryId },
              lock: true,
              transaction: t,
            });
            await category.destroy({ transaction: t });
        });
        
        // let category = await Category.findOne({
        //     where: {
        //         id: categoryId,
        //     }
        // });
        // await category.destroy();
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