var request = require('request');
const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()

const cancelOrder = (orderId, callback) => {
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ0NDM5NiwiaXNzIjoiaHR0cHM6Ly9hcGl2Mi5zaGlwcm9ja2V0LmluL3YxL2V4dGVybmFsL2F1dGgvbG9naW4iLCJpYXQiOjE2Mzg4MDU2MDcsImV4cCI6MTYzOTY2OTYwNywibmJmIjoxNjM4ODA1NjA3LCJqdGkiOiJjTFhmMkczMmswYVdqdnh4In0.aYdJ0DShS4ixgifPrf9nNEg3hJGl-lMlqEuitPEBygk'
    var options = {
        'method': 'POST',
        'url': 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "ids": [orderId]
        })

    }
    request(options, (error, response) => {
        if (error) {
            return callback(error, undefined)
        }
        const d = JSON.parse(response.body)
        const { status_code, messsage } = d
        if (status_code == 422 || status_code == 500)
            callback(undefined, { message })
        else
            callback(undefined, { message: "Successfully Cancelled" })
    })
}

router.post('/cancel', auth, (req, res) => {
    const d = cancelOrder(req.body.order_id, (error, data) => {
        if (!error) {
            return res.send(data)
        }
        return res.send(error)
    });
})

module.exports = router