const userService = require('../../services/UserService');

const updatePassword = async (req, res) => {
    let data = req.body;
    let result = await userService.updateUser(data);
    if (!result.error) {
        res.send(data = {
            message: "Updated"
        });
    }
    else {
        res.send(data = {
            error: "Error"
        });
    }
}

module.exports = {
    updatePassword: updatePassword
}