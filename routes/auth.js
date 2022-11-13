const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
    const { body } = req
    const user = await sequelize.models.users.findOne({
        where: { email: body.email }
    })

    if (!user) return res.status(401).json({ message: 'Unauthorized' })
    if (!user.validPassword(body.password)) return res.status(401).json({ message: 'Invalid credentials!' })

    const token = jwt.sign({ userId: user.id }, 'secretKey', {
        expiresIn: 3600
    })

    return res.json({ message: 'Athenticated successfully!', token })
})

router.post('/signup', async (req, res) => {
    const { body } = req
    let user = await sequelize.models.users.findOne({
        where: { email: body.email }
    })
    if (user) return res.status(400).json({ message: 'Email is currently in use!' })

    user = await sequelize.models.users.create({
        name: body.name,
        apellidoMaterno: body.apellidoMaterno,
        apellidoPaterno: body.apellidoPaterno,
        type: 'client',
        email: body.email,
        password: body.password
    });
    await user.save();
    return res.status(201).json({ data: user });

})

module.exports = router