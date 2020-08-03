const express = require('express');
const notificationController = require('../controllers/notification.js')
var router = express.Router()

router.post('/subscribe', notificationController.pushNotify)

module.exports = router