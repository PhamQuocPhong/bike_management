const express = require('express');
const salesController = require('../controllers/sales.js')
var router = express.Router()

router.get('/', salesController.getAllSales)
router.get('/page/:page', salesController.getAllSalesPaging)
router.post('/suggest-vehicles', salesController.suggestVehiclesForCustomer)
router.post('/contact-customer/:id', salesController.contactCustomer)

module.exports = router