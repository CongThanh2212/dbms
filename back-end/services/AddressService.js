const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Address = require('../models/ShipAddress');

let getAddressById = async (addressId) => {
    try {
        let result = await Address.findOne({
            where: {
                id: addressId,
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

let getAddressByUserId = async (userId) => {
    try {
        let searchResult = await sequelize.query(
            'SELECT * FROM ship_address sa WHERE sa.userId = ?', {
            raw: true,
            replacements: [userId],
            type: QueryTypes.SELECT
        });
        return searchResult;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}
let getAllAddress = async () => {
    try {
        let result = await Address.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addAddress = async (data) => {
    try {
        let result = await Address.create({
            id: data.id,
            province: data.province,
            district: data.district,
            street: data.street,
            homeAddress: data.homeAddress,
            userId: data.userId
        })
        return result;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateAddress = async (data) => {
    try {
        let address = await Address.findOne({
            where:
                { id: data.id }
        });
        user.set({
            id: data.id,
            province: data.province,
            district: data.district,
            street: data.street,
            homeAddress: data.homeAddress
        })
        await address.save();
        return address;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteAddress = async (addressId) => {
    try {
        let address = await Address.findOne({
            where: {
                id: addressId,
            }
        });
        await address.destroy();
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
    getAddressByUserId: getAddressByUserId,
    getAddressById: getAddressById,
    getAllAddress: getAllAddress,
    addAddress: addAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress,
}