const Sequelize = require("sequelize");
const sequelize = require('../database/connect');
const Users = require('./Users');

const ShipAddress = sequelize.define("shipaddress", {

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,   
        autoIncrement: true,
        primaryKey: true,
    },

    province:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    district: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    street:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    homeAddress:{
        type: Sequelize.STRING,
        allowNull: false,
    },

},
{
    tableName: "ship_address"
});

Users.hasMany(ShipAddress);
ShipAddress.belongsTo(Users)

module.exports = ShipAddress;

