// database.js
const { Sequelize } = require('sequelize');

// Exporting models
const productModel = require('../models/product');
const reviewModel = require('../models/review');
const userModel = require('../models/user');
const orderModel = require('../models/order');

// Database connection
const sequelize = new Sequelize('sesion6', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
});
// Adding models
const models = [productModel, reviewModel, userModel, orderModel];

// Registering models to Sequelize
for (let model of models) {
    model(sequelize);
}

//Configuring relations
const { products, reviews, users, orders } = sequelize.models;
reviews.belongsTo(products); // Relation
orders.belongsTo(users);
orders.belongsTo(products);



module.exports = sequelize;