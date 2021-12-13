const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.cookie('APP_ID', token)
        res.send({ status: 1 })
    } catch (e) {
        res.send("0")
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('APP_ID', token)
        res.send({ status: 1 })
    } catch (e) {
        res.send(e)
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        res.clearCookie("APP_ID")
        await req.user.save()
        res.send({ status: 1 })
    } catch (e) {
        res.send("0")
    }
})


router.patch('/updateProfile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'mobile', 'address', 'city', 'pincode']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router