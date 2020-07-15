const express = require('express');
const employeeController = require('../controllers/employee.js')
var router = express.Router()


router.get('/list', employeeController.employeeList)
router.get('/position/:positionId', employeeController.getEmployeeByPosition)


module.exports = router