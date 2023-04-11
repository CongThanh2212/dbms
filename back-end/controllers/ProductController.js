const productService = require('../services/ProductService');

const getAllProduct = async (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    const result = await productService.getAllProduct(page, size);
    res.send(result);
}

const getProductById = async (req, res) => {
    let productId = req.params.productId;
    const result = await productService.getProductById(productId);
    res.send(result);
}

const getProductByCategory = async (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    let categoryId = req.params.categoryId;
    const result = await productService.getProductByCategory(categoryId, page, size);
    res.send(result);
}
const getAllProductByCreatedTime = async(req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    const result = await productService.getAllProductByCreatedTime(page,size);
    res.send(result)
}

const getProductByProductSet = async(req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    let productSetId = req.params.productSetId;
    const result = await productService.getProductByProductSet(productSetId, page, size);
    res.send(result);
}

const getProductByAuthor = async(req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    let authorId = req.params.authorId;
    const result = await productService.getProductByAuthor(authorId, page, size);
    res.send(result);
}

const getProductInfo = async(req, res) => {
    const result = await productService.getProductInfo();
    res.send(result);
}

const getProductBySoldNumber = async(req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    const result = await productService.getProductBySoldNumber(page, size);
    res.send(result);
}

const addProduct = async (req, res) => {
    let data = req.body;
    const result = await productService.addProduct(data);
    res.send(result);
}

const addProductAdmin = async (req, res) => {
    let data = req.body;
    const result = await productService.addProductAdmin(data);
    res.send(result);
}

const updateProductAdmin = async(req, res) => {
    let data  = req.body;
    const result = await productService.updateProductAdmin(data);
    res.send(result);
}

const updateProduct = async (req, res) => {
    let data = req.body;
    const result = await productService.updateProduct(data);
    res.send(result);
}

const deleteProduct = async (req, res) => {
    let productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    res.send(result);
}

module.exports = {
    getAllProduct: getAllProduct,
    getProductById: getProductById,
    getProductByCategory: getProductByCategory,
    getAllProductByCreatedTime: getAllProductByCreatedTime,
    getProductByProductSet: getProductByProductSet,
    getProductBySoldNumber: getProductBySoldNumber,
    getProductByAuthor: getProductByAuthor,
    getProductInfo: getProductInfo,
    addProduct: addProduct,
    addProductAdmin: addProductAdmin,
    updateProductAdmin: updateProductAdmin,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
}