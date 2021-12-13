const express = require('express')
const path = require('path')
require('./db/mongoose')
const hbs = require('hbs')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')
const createOrderRouter = require('./API/createOrder')
const cancelOrder = require('./API/cancelorder')
const pinRouter = require('./API/PinCode')
const checkRouter = require('./API/checkCourier')
const getOrderDetails = require('./API/getOrdersDetails')
const getTracking = require('./API/tracking')
const recharge = require('./API/recharge')
const cookieParser = require('cookie-parser')
const pageHandlers = require('./routers/handlers')
const cors = require('cors')
const app = express()
const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(path.join(__dirname, '../'))
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(cookieParser())

app.use(cors())
app.use(express.json())
app.use(pageHandlers)
app.use(orderRouter)
app.use(userRouter)
app.use(createOrderRouter)
app.use(cancelOrder)
app.use(pinRouter)
app.use(checkRouter)
app.use(getOrderDetails)
app.use(getTracking)
app.use(recharge)

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})