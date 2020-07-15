const express = require('express');
const reportController = require('../controllers/report.js')
var router = express.Router()

router.get('/:mode', reportController.reportTransactions)

router.get('/view/:mode', reportController.reportTransactionView)

router.get('/detail/:mode', reportController.reportTransactionDetail)

router.get('/view/detail/:mode', reportController.reportTransactionDetailView)

module.exports = router