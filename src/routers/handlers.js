const express = require('express')
const router = new express.Router()
const cookie = require('../middleware/cookies')
const authName = require('../middleware/authName')

router.get('', (req, res) => {
    res.render('index')
})


router.get('/checkCookie', (req, res) => {
    const { cookies } = req
    if ('APP_ID' in cookies) {
        if (cookies.APP_ID === req.cookies.APP_ID) {
            return res.send({ status: 1 })
        }
        else {
            return res.send({ status: 0 })
        }
    } else {
        return res.send({ status: 0 })
    }
})

router.get('/loginPage', cookie, (req, res) => {
    res.render('login')
})

router.get('/signupPage', cookie, (req, res) => {
    res.render('signup')
})

router.get('/dashboard', authName, (req, res) => {
    var name = req.user.name
    res.render('dashboard', {
        id: "dashboard",
        name: name
    })
})

router.get('/dashboard/profile', authName, (req, res) => {

    res.render('usersP', {
        id: "userProfile",
        name: req.user.name
    })
})

router.get('/dashboard/wallet', authName, (req, res) => {
    res.render('wallet', {
        id: "wallet",
        name: req.user.name,
        wallet: req.user.wallet
    })
})

router.get('/dashboard/address', authName, (req, res) => {
    res.render('address', {
        id: "address",
        name: req.user.name
    })
})

router.get('/dashboard/settings', authName, (req, res) => {
    res.render('settings', {
        id: "setting",
        name: req.user.name
    })
})

router.get('/dashboard/orders', authName, (req, res) => {
    res.render('orders', {
        id: "order",
        name: req.user.name
    })
})

router.get('/dashboard/create_order', authName, (req, res) => {
    res.render('create_order', {
        id: "createOrder",
        name: req.user.name
    })
})

router.get('/dashboard/rate', authName, (req, res) => {
    res.render('rate', {
        id: "rateCalculate",
        name: req.user.name
    })
})


module.exports = router