const request = require('request')
const auth = require('../middleware/auth')
const express = require('express')
const Task = require('../models/order')
const order = require('../routers/order')
const router = new express.Router()

const genOrderID = () => { return (Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8))).toString() }
const getNamePickUp = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ' '
    const charactersLength = characters.length
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toString()
}
const getDateAndTime = () => {
    let today = new Date()
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let time = today.getHours() + ":" + today.getMinutes()
    return (date + ' ' + time).toString()
}
const createOrder = (data, callback) => {
    const total = data.order_items[0].units + data.order_items[0].selling_price
    const pickupname = getNamePickUp()
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQ0NDM5NiwiaXNzIjoiaHR0cHM6Ly9hcGl2Mi5zaGlwcm9ja2V0LmluL3YxL2V4dGVybmFsL2F1dGgvbG9naW4iLCJpYXQiOjE2Mzg4MDU2MDcsImV4cCI6MTYzOTY2OTYwNywibmJmIjoxNjM4ODA1NjA3LCJqdGkiOiJjTFhmMkczMmswYVdqdnh4In0.aYdJ0DShS4ixgifPrf9nNEg3hJGl-lMlqEuitPEBygk'
    var options = {
        'method': 'POST',
        'url': 'https://apiv2.shiprocket.in/v1/external/shipments/create/forward-shipment',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({

            "courier_id": data.courier_id,
            "order_id": genOrderID(),
            "order_date": getDateAndTime(),
            "channel_id": "477772",
            "billing_customer_name": data.billing_customer_name,
            "billing_last_name": data.billing_last_name,
            "billing_address": data.billing_address,
            "billing_address_2": data.billing_address_2,
            "billing_city": data.billing_city,
            "billing_state": data.billing_state,
            "billing_country": data.billing_country,
            "billing_pincode": data.billing_pincode,
            "billing_email": data.billing_email,
            "billing_phone": data.billing_phone,
            "shipping_is_billing": data.shipping_is_billing,
            "order_items": [
                {
                    "name": data.order_items[0].name,
                    "sku": data.order_items[0].sku,
                    "units": data.order_items[0].units,
                    "selling_price": data.order_items[0].selling_price
                }
            ],
            "payment_method": "Prepaid",
            "sub_total": total,
            "weight": data.weight,
            "length": data.length,
            "breadth": data.breadth,
            "height": data.height,
            "pickup_location": pickupname,
            "vendor_details": {
                "email": data.vendor_details.email,
                "phone": data.vendor_details.phone,
                "name": data.vendor_details.name,
                "address": data.vendor_details.address,
                "address_2": data.vendor_details.address_2,
                "city": data.vendor_details.city,
                "state": data.vendor_details.state,
                "country": data.vendor_details.country,
                "pin_code": data.vendor_details.pin_code,
                "pickup_location": pickupname
            }

        })
    };
    request(options, (error, response) => {
        if (!error)
            callback(undefined, JSON.parse(response.body))
        else
            callback(error, undefined)
    });
}

router.post('/createOrder', auth, async (req, res) => {

    if (req.user.wallet < 100) {
        return res.send({ status: 200, message: "Please Recharge Wallet to Create Order" })
    }
    const d = createOrder(req.body, async (error, data) => {
        if (!error) {
            const { awb_code } = data
            if (awb_code !== undefined) {
                const task = new Task({
                    orderId: data.order_id,
                    details: {
                        awb_code: data.awb_code,
                        courier_name: data.courier_name,
                        date_time: data.pickup_scheduled_date.date
                    },
                    owner: req.user._id
                })
                await task.save()
                return res.sned(data)
            }
            return res.send({ status: 200, message: "Their is something wrong. Try again Later" })
        }
        return res.send(error);
    });

})

module.exports = router