const { QueryTypes, Model } = require('sequelize');
const sequelize = require('../database/connect');
const ShipAddress = require('../models/ShipAddress');
const User = require('../models/Users');

let getUserInfo = async (userId) => {
    try {
        let user = await User.findOne({
            where: {
                id: userId,
            }
        });
        let address = await sequelize.query(
            "select sa.id, sa.province, sa.district, sa.street, sa.homeAddress from ship_address sa where userId = ?", {
            raw: true,
            replacements: [userId],
            type: QueryTypes.SELECT
        }
        )
        let result = {
            user: user,
            address: address
        }
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getUserById = async (userId) => {
    try {
        let result = await User.findOne({
            where: {
                id: userId,
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

let getUserByUsernameAndPassword = async (data) => {
    try {
        let result = await User.findOne({
            where: {
                username: data.username,
                password: data.password
            }
        });
        if(result) return result;
        else {
            return temp = {
                error: "Lỗi đăng nhập",
                message: "Tài khoản hoặc mật khẩu không chính xác"
            };
        }
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getUserByUsername = async () => {
    try {
        let result = await sequelize.query(
            "select * from users where id = 1"
        );
        return result;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let getUserByRole = function (roleId) {
    return null;
}

let getAllUser = async () => {
    try {
        let result = await User.findAll();
        return result;
    } catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let addUser = async (data) => {
    try {
        let user = await User.create({
            id: data.id,
            username: data.username,
            password: data.password,
            firstname: data.firstname,
            email: data.email,
            lastname: data.lastname,
            address: data.address,
            phone: data.phone,
        })
        return user;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let updateUser = async (data) => {
    try {
        let user = await User.findOne({
            where:
                { id: data.id }
        });

        user.set({
            id: data.id,
            username: (data.username ? data.username : user.username),
            password: (data.password ? data.password : user.password),
            firstname: data.firstname,
            lastname: data.lastname,
            address: data.address,
            phone: data.phone,
            email: data.email,
        })
        await user.save();
        return user;
    }
    catch (e) {
        return temp = {
            error: e.name,
            message: "Error"
        };
    }
}

let deleteUser = async (userId) => {
    try {
        let user = await User.findOne({
            where: {
                id: userId,
            }
        });
        await user.destroy();
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
    getUserInfo: getUserInfo,
    getUserById: getUserById,
    getUserByUsernameAndPassword: getUserByUsernameAndPassword,
    getAllUser: getAllUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserByUsername: getUserByUsername,
}