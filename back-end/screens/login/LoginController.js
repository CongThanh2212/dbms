const userService = require('../../services/UserService');

const checkUserLogin = async (req, res, next) => {
    let user = req.body;
    let result = await userService.getUserByUsernameAndPassword(user);
    if (!result.error) {
            req.checkUserLogin = {
                userId: result.id,
                roleId: result.roleId
            };
            next();
    }
    else {
        res.status(401).send(data = {
            error: "Tài khoản hoặc mật khẩu không chính xác "
        });
    }
}

const checkUserRole = async (req, res, next) => {
    let data = req.checkUserLogin;
    res.send(data);
}

module.exports = {
    checkUserLogin: checkUserLogin,
    checkUserRole: checkUserRole,
}