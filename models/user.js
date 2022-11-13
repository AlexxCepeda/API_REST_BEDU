// /models/product.js
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
    const User = sequelize.define('users', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: Sequelize.STRING,
        apellidoMaterno: Sequelize.STRING,
        apellidoPaterno: Sequelize.STRING,
        type: Sequelize.STRING,
        email: {
            type: Sequelize.STRING, unique: true, validate: {
                isEmail: true
            }
        },
        password: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    }, {
        hooks: {
            beforeCreate: function (user, options) {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt)
            },
            beforeUpdate: function (user, options) {
                user.updatedAt = new Date();
            },
        },
    });

    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    };

    return User;
}