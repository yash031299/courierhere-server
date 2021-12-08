const express = require('express')
const checkPinCodeServicable = require('./services/PinCode')
const app = express()
const port = process.env.PORT || 3000
app.get('', (req, res) => {
    console.log(req.query)
    const d = checkPinCodeServicable(req.query, (error, data) => {
        if (!error) {
            return res.send(data)
        }
        return res.send(error)
    });
})

app.listen(port, () => {
    console.log("Server is started")
})