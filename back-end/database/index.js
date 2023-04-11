const Users = require('../models/Users');
const Roles = require('../models/Roles');
const ShipAddress = require('../models/ShipAddress');
const Products = require('../models/Products');
const Orders = require('../models/Orders');
const OrderDetails = require('../models/OderDetails');
const Payments = require('../models/Payments');
const Providers = require('../models/Providers');
const Categories = require('../models/Categories');
const ProductSet = require('../models/ProductSets');
const Authors = require('../models/Authors');
const ProductCategories = require('../models/ProductCategories');

const loadModels = () => {
    console.log("Loading models");
}

module.exports = {
    loadModels: loadModels
}