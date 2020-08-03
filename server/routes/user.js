const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.get('/notification/:id', userController.getNotificationUser)

module.exports = router