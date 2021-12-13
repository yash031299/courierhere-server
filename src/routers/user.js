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

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

module.exports = router