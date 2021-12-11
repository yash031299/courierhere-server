const mongoose = require('mongoose')

const Task = mongoose.model('Order', {
    orderId: {
        type: Number,
        required: true,
    },
    details: {
        awb_code: {
            type: Number,
            required: true
        },
        courier_name: {
            type: String,
            required: true
        },
        date_time: {
            type: String,
            required: true
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Task