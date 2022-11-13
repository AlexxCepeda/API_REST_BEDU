const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

// Get all users
router.get('/', async (req, res) => {
    return await sequelize.models.users.findAndCountAll()
        .then(data => res.json(data))
        .catch(err => res.json({ message: 'Error', data: err }))
});

// Creating a new user
router.post('/', async (req, res) => {
    const { body } = req;
    const user = await sequelize.models.users.create({
        name: body.name,
        apellidoMaterno: body.apellidoMaterno,
        apellidoPaterno: body.apellidoPaterno,
        type: 'admin',
        email: body.email,
        password: body.password
    });
    await user.save();
    return res.status(201).json({ data: user });
});

// Update a user by id
router.put('/:id', async (req, res) => {
    const { body, params: { id } } = req;
    const user = await sequelize.models.users.findByPk(id);
    if (!user) {
        return res.status(404).json({ code: 404, message: 'User not found' });
    }
    const updatedUser = await product.update({
        name: body.name,
        apellidoMaterno: body.apellidoMaterno,
        apellidoPaterno: body.apellidoPaterno,
        type: body.type,
        email: body.email,
        password: body.password,
    });
    return res.json({ data: updatedUser });
});

// Delete a user by id
router.delete('/:id', async (req, res) => {
    const { params: { id } } = req;
    const user = await sequelize.models.users.findByPk(id);
    if (!user) {
        return res.status(404).json({ code: 404, message: 'user not found' });
    }
    await user.destroy();
    return res.json();
});

module.exports = router;