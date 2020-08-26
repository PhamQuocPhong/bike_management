const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.get('/notification/:id', userController.getNotificationUser)

router.get('/:id', userController.getUser)

module.exports = router