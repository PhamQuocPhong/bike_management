require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./database/db')
const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const auth = require('./middleware/auth_middleware')
const socketModules = require('./socket')
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
const authRouter = require('./routes/auth')
const dasboardRouter = require('./routes/dashboard')
const customerRouter = require('./routes/customer')
const emplyoeeRouter = require('./routes/employee')
const receptionRouter = require('./routes/reception')
const technicalRouter = require('./routes/technical')
const transactionRouter = require('./routes/transaction')
const salesRouter = require('./routes/sales')
const vehicleRouter = require('./routes/vehicle')
const vehicleTypeRouter = require('./routes/vehicle_type')
const reportRouter = require('./routes/report')
const notifyRouter = require('./routes/notification')
const userRouter = require('./routes/user')
const roomRouter = require('./routes/room')

app.use('/api/auth/', authRouter)
app.use('/api/dashboard/', auth.isAuth,  dasboardRouter)
app.use('/api/customer/',  auth.isAuth, customerRouter)
app.use('/api/employee/',  auth.isAuth, emplyoeeRouter)
app.use('/api/reception/', auth.isAuth, receptionRouter)
app.use('/api/technical/', auth.isAuth, technicalRouter)
app.use('/api/transaction/', auth.isAuth, transactionRouter)
app.use('/api/sales/', auth.isAuth, salesRouter)
app.use('/api/vehicle/', auth.isAuth, vehicleRouter)
app.use('/api/vehicle-type/', auth.isAuth, vehicleTypeRouter)
app.use('/api/report/', reportRouter)
app.use('/api/notify/', notifyRouter)
app.use('/api/user/', auth.isAuth, userRouter)
app.use('/api/room/', auth.isAuth, roomRouter)

// conect socket
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(port)

//Connect database
db.sync().then(function() {
     // { force: true }
  	console.log(`Server is listening on port ${port}`)
}).catch(function(err) {
  console.log(err)
  process.exit(1)
})




io.on('connection', (socket) => {
  socketModules.addUser(socket)
	socketModules.sendMail(socket)
  socketModules.sendNotify(socket)
	socketModules.removeUser(socket)
  socketModules.roomSendMessenger(socket)
  socketModules.roomUserJoin(socket)
  socketModules.roomUserLeave(socket)
  socketModules.userSendMessenger(socket)
	socket.on('disconnect', () => {

	})
})


