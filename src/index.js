const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const orderRouter = require('./routers/order')
const createOrderRouter = require('./API/createOrder')
const cancelOrder = require('./API/cancelorder')
const pinRouter = require('./API/PinCode')
const checkRouter = require('./API/checkCourier')
const getOrderDetails = require('./API/getOrdersDetails')
const getTracking = require('./API/tracking')
const recharge = require('./API/recharge')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(orderRouter)
app.use(userRouter)
app.use(createOrderRouter)
app.use(cancelOrder)
app.use(pinRouter)
app.use(checkRouter)
app.use(getOrderDetails)
app.use(getTracking)
app.use(recharge)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})