// /models/product.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    hooks: {
        beforeCreate: function (product, options) {
            product.createdAt = new Date();
            product.updatedAt = new Date();
        },
        beforeUpdate: function (product, options) {
            product.updatedAt = new Date();
        },
    },
});