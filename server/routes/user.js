const express = require('express');
const userController = require('../controllers/user.js')
var router = express.Router()

router.get('/notification/:id', userController.getNotificationUser)

router.get('/:id', userController.getUser)

router.post('/upload-avatar/:id', userController.uploadAvatar)

router.get('/', userController.getAllUsers)

router.put('/update-info/:id', userController.updateUserInfo)

module.exports = router