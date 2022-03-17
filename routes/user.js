const express = require('express')
const router = express()
const UserController = require('../controllers/userController')

router.post('/', UserController.registerUser)
router.post('/login', UserController.login)

module.exports = router
