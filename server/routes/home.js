const express = require('express');
const homeController = require('../controllers/home.js')
var router = express.Router()

router.get('/', homeController.home)

module.exports = router