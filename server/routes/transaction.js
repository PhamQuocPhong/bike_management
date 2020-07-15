const express = require('express');
const TransactionController = require('../controllers/transaction.js')
var router = express.Router()


router.post('/create', TransactionController.createTransaction)

router.get('/sell/page/:page', TransactionController.getTransactionSellPaging)

router.get('/buy/page/:page', TransactionController.getTransactionBuyPaging)

router.get('/search/:mode', TransactionController.searchTransaction)


module.exports = router