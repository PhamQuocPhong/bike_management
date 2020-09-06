const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.get('/notification/:id', userController.getNotificationUser)

router.get('/:id', userController.getUser)

router.post('/upload-avatar/:id', userController.uploadAvatar)

module.exports = router