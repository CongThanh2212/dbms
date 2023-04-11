const userService = require('../../services/UserService');
const jwt = require('jsonwebtoken');

const checkRegister = async (req, res, next) => {
    let data = req.body;
    let result = await userService.addUser(data);
    if (!result.error && result != null) {
        req.checkRegister = {
            userId: result.id,
            roleId: result.roleId
        };
        next();
    }
    else {
        res.status(400).send(data = {
            error: "Tài khoản đã tồn tại"
        });
    }
}

const checkUserRole = async (req, res, next) => {
    let data = req.checkRegister;
    res.send(data);
}

module.exports = {
    checkRegister: checkRegister,
    checkUserRole: checkUserRole
}