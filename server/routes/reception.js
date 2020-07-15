const express = require('express');
const receptionController = require('../controllers/reception_customer.js')
var router = express.Router()

router.get('/customer-sell', receptionController.getAllReceptionCustomerSell)
router.post('/customer-sell/create', receptionController.createReceptionCustomerSell)


router.get('/customer-buy', receptionController.getAllReceptionCustomerBuy)
router.get('/customer-buy/page/:page', receptionController.getReceptionCustomerBuyPaging)
router.post('/customer-buy/create', receptionController.createReceptionCustomerBuy)
router.post('/customer-buy/update/:id', receptionController.updateReceptionCustomerBuy)



module.exports = router