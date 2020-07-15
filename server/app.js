require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database/db')
const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const auth = require('./middleware/auth_middleware')
require('./database/migration')


// app.use(express.static(__dirname  + '/public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))
app.use(bodyParser.json({limit: '50mb'}));


// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.locals = require('./helpers/helper')


app.use(express.json())
app.use(cors())

// Load routes
var authRouter = require('./routes/auth')
var customerRouter = require('./routes/customer')
var emplyoeeRouter = require('./routes/employee')
var receptionRouter = require('./routes/reception')
var technicalRouter = require('./routes/technical')
var transactionRouter = require('./routes/transaction')
var salesRouter = require('./routes/sales')
var vehicleRouter = require('./routes/vehicle')
var vehicleTypeRouter = require('./routes/vehicle_type')
var reportRouter = require('./routes/report')

app.use('/api/auth/', authRouter)
app.use('/api/customer/',  auth.isAuth, customerRouter)
app.use('/api/employee/',  auth.isAuth, emplyoeeRouter)
app.use('/api/reception/', auth.isAuth, receptionRouter)
app.use('/api/technical/', auth.isAuth, technicalRouter)
app.use('/api/transaction/', auth.isAuth, transactionRouter)
app.use('/api/sales/', auth.isAuth, salesRouter)
app.use('/api/vehicle/', auth.isAuth, vehicleRouter)
app.use('/api/vehicle-type/', auth.isAuth, vehicleTypeRouter)
app.use('/api/report/', reportRouter)


//Connect database
db.sync().then(function() {
   //   { force: true }
		 // require('./database/seeder')

	app.listen(port)
  	console.log(`Server is listening on port ${port}`)
}).catch(function(err) {
  console.log(err)
  process.exit(1)
})
