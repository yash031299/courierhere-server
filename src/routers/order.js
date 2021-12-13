const express = require('express')
const Task = require('../models/order')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/order', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch (e) {
        res.send(e)
    }
})

router.post('/getOrder', auth, async (req, res) => {
    try {
        await req.user.populate('Order').execPopulate()
        res.send(req.user.Order)
    } catch (e) {
        res.send(e)
    }
})
module.exports = router