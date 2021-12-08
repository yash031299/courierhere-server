const request = require('request')
const checkPinCodeServicable = ({ pickup, delivery, weight }, callback) => {
    var options = {
        'method': 'GET',
        'url': 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ0NDM5NiwiaXNzIjoiaHR0cHM6Ly9hcGl2Mi5zaGlwcm9ja2V0LmluL3YxL2V4dGVybmFsL2F1dGgvbG9naW4iLCJpYXQiOjE2Mzg4MDU2MDcsImV4cCI6MTYzOTY2OTYwNywibmJmIjoxNjM4ODA1NjA3LCJqdGkiOiJjTFhmMkczMmswYVdqdnh4In0.aYdJ0DShS4ixgifPrf9nNEg3hJGl-lMlqEuitPEBygk'
        },
        body: JSON.stringify({
            "pickup_postcode": pickup,
            "delivery_postcode": delivery,
            "cod": false,
            "weight": weight
        })
    };
    request(options, function (error, response) {
        if (error) {
            return callback(error, undefined)
        }
        const d = JSON.parse(response.body)
        const { status, message, data } = d;
        if (status == 404)
            callback(undefined, message)
        else if (status == 200)
            callback(undefined, "Serviceable Zone")
        else
            callback(undefined, "Error")
    });
}
module.exports = checkPinCodeServicable;