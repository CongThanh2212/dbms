const roleService = require('../services/RoleService');

const getAllRole = async (req, res) => {
    const result = await roleService.getAllRole();
    res.send(result);
}

const getRoleById = async (req, res) => {
    let roleId = req.params.roleId;
    const result = await roleService.getRoleById(roleId);
    res.send(result);
}

const addRole = async (req, res) => {
    let data = req.body;
    const result = await roleService.addRole(data);
    res.send(result);
}

const updateRole = async (req, res) => {
    let data = req.body;
    const result = await roleService.updateRole(data);
    res.send(result);
}

const deleteRole = async (req, res) => {
    let roleId = req.params.roleId;
    const result = await roleService.deleteRole(roleId);
    res.send(result);
}

module.exports = {
    getAllRole: getAllRole,
    getRoleById: getRoleById,
    addRole: addRole,
    updateRole: updateRole,
    deleteRole: deleteRole,
}