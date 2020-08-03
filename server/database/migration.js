const Sequelize = require('sequelize')
const db = require('./db')
const Employee =  require('../models/employee')
const Position =  require('../models/position')
const ReceptionCustomerSell =  require('../models/reception_customer_sell')
const ReceptionCustomerBuy =  require('../models/reception_customer_buy')
const Customer = require('../models/customer')
const Vehicle =  require('../models/vehicle')
const TechnicalTest =  require('../models/technical_test')
const Transaction =  require('../models/transaction')
const TransactionDetailBuy =  require('../models/transaction_detail_buy')
const TransactionDetailSell =  require('../models/transaction_detail_sell')
const TechnicalRepair =  require('../models/technical_repair')
const VehicleTest = require('../models/vehicle_test')
const VehiclePurchase = require('../models/vehicle_purchase')
const Role =  require('../models/role')
const User = require('../models/user')
const VehicleType = require('../models/vehicle_type')
const VehicleRepair = require('../models/vehicle_repair')
const VehicleSuggest = require('../models/vehicle_suggest')
const Sales = require('../models/sales')
const SalesCustomerBuy = require('../models/sales_customer_buy')
const UserNotification = require('../models/user_notification')


VehicleType.hasMany(Vehicle, {onDelete: 'cascade', hooks:true})
Vehicle.belongsTo(VehicleType, {onDelete: 'cascade', hooks:true})


// employee model
Employee.belongsTo(User, {onDelete: 'cascade', hooks:true})
User.hasOne(Employee, {onDelete: 'cascade', hooks:true})

// employee position model
Employee.belongsTo(Position, {onDelete: 'cascade', hooks:true})
Position.hasMany(Employee, {onDelete: 'cascade', hooks:true})


// reception_customer_buy 
ReceptionCustomerBuy.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(ReceptionCustomerBuy, {onDelete: 'cascade', hooks:true})
SalesCustomerBuy.hasMany(VehicleSuggest, {onDelete: 'cascade', hooks:true})

ReceptionCustomerBuy.hasOne(SalesCustomerBuy, {onDelete: 'cascade', hooks:true})
Sales.hasOne(SalesCustomerBuy, {onDelete: 'cascade', hooks:true})
Sales.belongsTo(Employee, {onDelete: 'cascade', hooks:true})

SalesCustomerBuy.belongsTo(Sales, {onDelete: 'cascade', hooks:true})
SalesCustomerBuy.belongsTo(ReceptionCustomerBuy, {onDelete: 'cascade', hooks:true})
SalesCustomerBuy.belongsTo(Customer, {onDelete: 'cascade', hooks:true})


VehicleSuggest.belongsTo(SalesCustomerBuy, {onDelete: 'cascade', hooks:true})
VehicleSuggest.belongsTo(Vehicle, {onDelete: 'cascade', hooks:true})
Vehicle.hasOne(VehicleSuggest, {onDelete: 'cascade', hooks:true})

// reception_customer_sell
ReceptionCustomerSell.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})
ReceptionCustomerSell.belongsTo(Customer, {onDelete: 'cascade', hooks:true})
Customer.hasMany(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})

// transaction
Transaction.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Transaction.belongsTo(Customer, {onDelete: 'cascade', hooks:true})
Employee.hasMany(Transaction, {onDelete: 'cascade', hooks:true})
Customer.hasMany(Transaction, {onDelete: 'cascade', hooks:true})

// transaction detail sell
TransactionDetailSell.belongsTo(Vehicle, {onDelete: 'cascade', hooks:true})
Vehicle.hasOne(TransactionDetailSell, {onDelete: 'cascade', hooks:true})
TransactionDetailSell.belongsTo(Transaction, {onDelete: 'cascade', hooks:true})
Transaction.hasMany(TransactionDetailSell, {onDelete: 'cascade', hooks:true})

// transaction detail buy
TransactionDetailBuy.belongsTo(VehiclePurchase, {onDelete: 'cascade', hooks:true})
VehiclePurchase.hasOne(TransactionDetailBuy, {onDelete: 'cascade', hooks:true})
TransactionDetailBuy.belongsTo(Transaction, {onDelete: 'cascade', hooks:true})
Transaction.hasMany(TransactionDetailBuy, {onDelete: 'cascade', hooks:true})

// technical_repair
TechnicalRepair.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(TechnicalRepair, {onDelete: 'cascade', hooks:true})
TechnicalRepair.belongsTo(VehicleRepair, {onDelete: 'cascade', hooks:true})
VehicleRepair.hasOne(TechnicalRepair, {onDelete: 'cascade', hooks:true})

// technical_test
TechnicalTest.belongsTo(Employee, {onDelete: 'cascade', hooks:true})
Employee.hasMany(TechnicalTest, {onDelete: 'cascade', hooks:true})

// test_bike
VehicleTest.belongsTo(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})
ReceptionCustomerSell.hasMany(VehicleTest, {onDelete: 'cascade', hooks:true})
VehicleTest.belongsTo(TechnicalTest, {onDelete: 'cascade', hooks:true})
TechnicalTest.hasMany(VehicleTest, {onDelete: 'cascade', hooks:true})
VehicleTest.belongsTo(VehicleType, {onDelete: 'cascade', hooks:true})
VehicleType.hasOne(VehicleTest, {onDelete: 'cascade', hooks:true})

// user
User.belongsTo(Role, {onDelete: 'cascade', hooks:true})
Role.hasMany(User, {onDelete: 'cascade', hooks:true})

// vechicle_purchase
VehiclePurchase.belongsTo(ReceptionCustomerSell, {onDelete: 'cascade', hooks:true})
ReceptionCustomerSell.hasMany(VehiclePurchase, {onDelete: 'cascade', hooks:true})

VehiclePurchase.belongsTo(VehicleType, {onDelete: 'cascade', hooks:true})
VehicleType.hasMany(VehiclePurchase, {onDelete: 'cascade', hooks:true})

// vehicle  repair
VehicleRepair.belongsTo(VehiclePurchase, {onDelete: 'cascade', hooks:true})
VehiclePurchase.hasOne(VehicleRepair, {onDelete: 'cascade', hooks:true})
 
 
 // user notify
UserNotification.belongsTo(User, {onDelete: 'cascade', hooks:true, foreignKey: 'receiverId', as: 'receiver'})
UserNotification.belongsTo(User, {onDelete: 'cascade', hooks:true, foreignKey: 'senderId',  as: 'sender'})
User.hasMany(UserNotification, {onDelete: 'cascade', hooks:true , foreignKey: 'receiverId'})
User.hasMany(UserNotification, {onDelete: 'cascade', hooks:true , foreignKey: 'senderId'})

