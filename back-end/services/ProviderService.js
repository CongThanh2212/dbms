const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Provider = require('../models/Providers');

let getProviderById = async (providerId) => {
    try {
        let result = await Provider.findOne({
            where: {
                id: providerId,
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

let getAllProvider = async () => {
    try {
        let result = await Provider.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addProvider = async (data) => {
    try {
        let provider = await Provider.create({
            id: data.id,
            name: data.name
        })
        return provider;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateProvider = async (data) => {
    try {
        let provider = await Provider.findOne({
            where:
                { id: data.id }
        });

        provider.set({
            id: data.id,
            name: data.name
        })
        await provider.save();
        return provider;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteProvider = async (providerId) => {
    try {
        let provider = await Provider.findOne({
            where: {
                id: providerId,
            }
        });
        await provider.destroy();
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
    getProviderById: getProviderById,
    getAllProvider: getAllProvider,
    addProvider: addProvider,
    updateProvider: updateProvider,
    deleteProvider: deleteProvider,
}