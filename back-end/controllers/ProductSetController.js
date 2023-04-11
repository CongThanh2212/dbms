const productSetService = require('../services/ProductSetService');

const getAllProductSet = async (req, res) => {
    const result = await productSetService.getAllProductSet();
    res.send(result);
}

const getProductSetById = async (req, res) => {
    let productSetId = req.params.productSetId;
    const result = await productSetService.getProductSetById(productSetId);
    res.send(result);
}

const getProductSetByProvider = async(req, res) => {
    let providerId = req.params.providerId;
    const result = await productSetService.getProductSetByProvider(providerId);
    res.send(result);
}

const getProducSetInfo = async(req, res) => {
    const result = await productSetService.getProducSetInfo();
    res.send(result);
}

const addProductSet = async (req, res) => {
    let data = req.body;
    const result = await productSetService.addProductSet(data);
    res.send(result);
}

const addProductSetByAdmin = async (req, res) => {
    let data = req.body;
    const result = await productSetService.addProductSetByAdmin(data);
    res.send(result);
}

const updateProductSet = async (req, res) => {
    let data = req.body;
    const result = await productSetService.updateProductSet(data);
    res.send(result);
}

const updateProductSetAdmin = async(req, res) => {
    let data = req.body;
    const result = await productSetService.updateProductSetAdmin(data);
    res.send(result);
}

const deleteProductSet = async (req, res) => {
    let productSetId = req.params.productSetId;
    const result = await productSetService.deleteProductSet(productSetId);
    res.send(result);
}

module.exports = {
    getAllProductSet: getAllProductSet,
    getProductSetById: getProductSetById,
    getProductSetByProvider: getProductSetByProvider,
    getProducSetInfo: getProducSetInfo,
    addProductSet: addProductSet,
    addProductSetByAdmin: addProductSetByAdmin,
    updateProductSet: updateProductSet,
    updateProductSetAdmin: updateProductSetAdmin,
    deleteProductSet: deleteProductSet,
}