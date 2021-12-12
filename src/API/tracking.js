const request = require('request')
const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()

const trackCourier = (trackID, callback) => {
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ0NDM5NiwiaXNzIjoiaHR0cHM6Ly9hcGl2Mi5zaGlwcm9ja2V0LmluL3YxL2V4dGVybmFsL2F1dGgvbG9naW4iLCJpYXQiOjE2Mzg4MDU2MDcsImV4cCI6MTYzOTY2OTYwNywibmJmIjoxNjM4ODA1NjA3LCJqdGkiOiJjTFhmMkczMmswYVdqdnh4In0.aYdJ0DShS4ixgifPrf9nNEg3hJGl-lMlqEuitPEBygk'
    var options = {
        'method': 'GET',
        'url': 'https://apiv2.shiprocket.in/v1/external/courier/track/awb/' + trackID,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    request(options, (error, response) => {
        if (error) {
            return callback(error, undefined)
        }
        const d = JSON.parse(response.body)
        if (d.status_code == 404)
            callback(undefined, { message })
        else
            callback(undefined, d.tracking_data)
    });
}

router.post('/tracking', auth, (req, res) => {
    const d = trackCourier(req.body.trackind_id, (error, data) => {
        if (!error) {
            return res.send(data)
        }
        return res.send(error)
    });
})

module.exports = router