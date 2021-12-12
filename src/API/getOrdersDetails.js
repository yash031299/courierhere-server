const request = require('request')
const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()

const getOrderDetails = (orderId, callback) => {
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ0NDM5NiwiaXNzIjoiaHR0cHM6Ly9hcGl2Mi5zaGlwcm9ja2V0LmluL3YxL2V4dGVybmFsL2F1dGgvbG9naW4iLCJpYXQiOjE2Mzg4MDU2MDcsImV4cCI6MTYzOTY2OTYwNywibmJmIjoxNjM4ODA1NjA3LCJqdGkiOiJjTFhmMkczMmswYVdqdnh4In0.aYdJ0DShS4ixgifPrf9nNEg3hJGl-lMlqEuitPEBygk'
    var options = {
        'method': 'GET',
        'url': 'https://apiv2.shiprocket.in/v1/external/orders/show/' + orderId,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    request(options, (error, response) => {
        const d = JSON.parse(response.body)
        const { status_code, message, data } = d;

        if (status_code == 404)
            callback(undefined, { message })
        else if (status_code == 400)
            callback(undefined, { message })
        else
            callback(undefined, { message })
    })
}

router.post('/getOrderDetails', auth, (req, res) => {
    const d = getOrderDetails(req.body.orderId, (error, data) => {
        if (!error) {
            return res.send(data)
        }
        return res.send(error)
    });
})

module.exports = router