const express = require('express');
const customerController = require('../controllers/customer.js')
var router = express.Router()


router.get('/list', customerController.customerList)


module.exports = router