const providerService = require('../services/ProviderService');

const getAllProvider = async (req, res) => {
    const result = await providerService.getAllProvider();
    res.send(result);
}

const getProviderById = async (req, res) => {
    let providerId = req.params.providerId;
    const result = await providerService.getProviderById(providerId);
    res.send(result);
}

const addProvider = async (req, res) => {
    let data = req.body;
    const result = await providerService.addProvider(data);
    res.send(result);
}

const updateProvider = async (req, res) => {
    let data = req.body;
    const result = await providerService.updateProvider(data);
    res.send(result);
}

const deleteProvider = async (req, res) => {
    let providerId = req.params.providerId;
    const result = await providerService.deleteProvider(providerId);
    res.send(result);
}

module.exports = {
    getAllProvider: getAllProvider,
    getProviderById: getProviderById,
    addProvider: addProvider,
    updateProvider: updateProvider,
    deleteProvider: deleteProvider,
}