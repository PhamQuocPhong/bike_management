const express = require('express');
const authController = require('../controllers/auth.js')
var router = express.Router()

router.post('/login', authController.login)

router.post('/google', authController.loginSocial)

router.post('/facebook', authController.loginSocial)

router.post('/register', authController.register)

router.post('/refresh-token', authController.refreshToken)

module.exports = router