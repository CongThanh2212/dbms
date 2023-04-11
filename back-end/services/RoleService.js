const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const Role = require('../models/Roles');

let getRoleById = async (roleId) => {
    try {
        let result = await Role.findOne({
            where: {
                id: roleId,
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

let getAllRole = async () => {
    try {
        let result = await Role.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addRole = async (data) => {
    try {
        let result = await Role.create({
            id: data.id,
            name: data.name,
            description: data.description,
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

let updateRole = async (data) => {
    try {
        let role = await Role.findOne({
            where:
                { id: data.id }
        });

        role.set({
            id: data.id,
            name: data.name,
            description: data.description,
        })
        await role.save();
        return role;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteRole = async (roleId) => {
    try {
        let role = await Role.findOne({
            where: {
                id: roleId,
            }
        });
        await role.destroy();
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
    getRoleById: getRoleById,
    getAllRole: getAllRole,
    addRole: addRole,
    updateRole: updateRole,
    deleteRole: deleteRole,
}