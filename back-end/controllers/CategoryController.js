const categoryService = require('../services/CategoryService');

const getAllCategory = async (req, res) => {
    const result = await categoryService.getAllCategory();
    res.send(result);
}

const getCategoryById = async (req, res) => {
    let categoryId = req.params.categoryId;
    const result = await categoryService.getCategoryById(categoryId);
    res.send(result);
}

const addCategory = async (req, res) => {
    let data = req.body;
    const result = await categoryService.addCategory(data);
    res.send(result);
}

const updateCategory = async (req, res) => {
    let data = req.body;
    const result = await categoryService.updateCategory(data);
    res.send(result);
}

const deleteCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    const result = await categoryService.deleteCategory(categoryId);
    res.send(result);
}

module.exports = {
    getAllCategory: getAllCategory,
    getCategoryById: getCategoryById,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
}