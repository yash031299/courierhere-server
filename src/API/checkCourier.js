const request = require('request')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

const checkPinCodeServicable = ({ pickup, delivery, weight }, callback) => {
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ0NDM5NiwiaXNzIjoiaHR0cHM6Ly9hcGl2Mi5zaGlwcm9ja2V0LmluL3YxL2V4dGVybmFsL2F1dGgvbG9naW4iLCJpYXQiOjE2Mzg4MDU2MDcsImV4cCI6MTYzOTY2OTYwNywibmJmIjoxNjM4ODA1NjA3LCJqdGkiOiJjTFhmMkczMmswYVdqdnh4In0.aYdJ0DShS4ixgifPrf9nNEg3hJGl-lMlqEuitPEBygk'
    var options = {
        'method': 'GET',
        'url': 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "pickup_postcode": pickup,
            "delivery_postcode": delivery,
            "cod": false,
            "weight": weight
        })
    };
    request(options, (error, response) => {
        if (error) {
            return callback({ error }, undefined)
        }
        const d = JSON.parse(response.body)
        const { status, message, data } = d;
        if (status == 404)
            callback(undefined, d)
        else if (status == 200) {
            let d = []
            const avaliableCourier = data.available_courier_companies;
            avaliableCourier.forEach(element => {
                d.push({
                    courier_id: element.courier_company_id,
                    courier_name: element.courier_name,
                    rate: element.freight_charge
                })
            });
            callback(undefined, d)
        }
        else
            callback({ error: "Invalid Entry" }, undefined)
    });
}

router.post('/checkCouriers', (req, res) => {
    const d = checkPinCodeServicable(req.body, (error, data) => {
        if (!error) {
            return res.send(data)
        }
        return res.send({ error, status: 0 })
    });
})

module.exports = router