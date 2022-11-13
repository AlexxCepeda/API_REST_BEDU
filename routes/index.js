const express = require('express')
const router = express.Router()

const authenticate = require('../middlewares/authentication')
router.use('/auth', require('./auth'))
router.use('/products', require('./products'))
router.use('/reviews', authenticate, require('./reviews'))
router.use('/users', authenticate, require('./users'))
router.use('/orders', authenticate, require('./orders'))

module.exports = router