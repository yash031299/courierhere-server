const express = require('express')
const checkPinCodeServicable = require('./services/PinCode')
const app = express()

app.get('', (req, res) => {
    console.log(req.query)
    const d = checkPinCodeServicable(req.query, (error, data) => {
        if (!error) {
            return res.send(data)
        }
        return res.send(error)
    });
})

app.listen(3000, () => {
    console.log("Server is started")
})