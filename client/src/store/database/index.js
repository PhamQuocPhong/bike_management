import { Database } from '@vuex-orm/core'
import Emyployee from '../models/employee'
import Customer from '../models/customer'
import User from '../models/user'
import TechnicalTest from '../models/technical_test'
import TechnicalRepair from '../models/technical_repair'
import ReceptionCustomerSell from '../models/reception_customer_sell'
import ReceptionCustomerBuy from '../models/reception_customer_buy'
import Transaction from '../models/transaction'
import TransactionDetailBuy from '../models/transaction_detail_buy'
import TransactionDetailSell from '../models/transaction_detail_sell'
import SalesCustomerBuy from '../models/sales_customer_buy'
import Sales from '../models/sales'
import VehicleType from '../models/vehicle_type'
import Vehicle from '../models/vehicle'
import VehicleTest from '../models/vehicle_test'
import VehicleSuggest from '../models/vehicle_suggest'
import VehiclePurchase from '../models/vehicle_purchase'
import VehicleRepair from '../models/vehicle_repair'
import Modal from '../models/modal'

// modules
import VehicleTestModules from '../modules/vehicle_test'
import ModalModules from '../modules/modal'

const database = new Database()

database.register(Emyployee)
database.register(Customer)
database.register(User)
database.register(ReceptionCustomerSell)
database.register(ReceptionCustomerBuy)
database.register(ReceptionCustomerBuy)
database.register(TechnicalTest)
database.register(TechnicalRepair)
database.register(VehicleType)
database.register(Vehicle)
database.register(VehicleTest, VehicleTestModules)
database.register(Transaction)
database.register(TransactionDetailBuy)
database.register(TransactionDetailSell)
database.register(SalesCustomerBuy)
database.register(Sales)
database.register(VehicleSuggest)
database.register(VehiclePurchase)
database.register(VehicleRepair)

database.register(Modal, ModalModules)
export default database