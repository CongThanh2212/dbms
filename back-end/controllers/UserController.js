const userService = require('../services/UserService');

//comment
const getAllUser = async (req, res) => {
    const result = await userService.getAllUser();
    res.send(result);
}

const getUserInfo = async (req, res) => {
    let userId = req.params.userId;
    const result = await userService.getUserInfo(userId);
    res.send(result);
}

const getUserById = async (req, res) => {
    let userId = req.params.userId;
    const result = await userService.getUserById(userId);
    res.send(result);
}

const addUser = async (req, res) => {
    let data = req.body;
    const result = await userService.addUser(data);
    res.send(result);
}

const updateUser = async (req, res) => {
    let data = req.body;
    const result = await userService.updateUser(data);
    res.send(result);
}

const deleteUser = async (req, res) => {
    let userId = req.params.userId;
    const result = await userService.deleteUser(userId);
    res.send(result);
}

module.exports = {
    getAllUser: getAllUser,
    getUserInfo: getUserInfo,
    getUserById: getUserById,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}