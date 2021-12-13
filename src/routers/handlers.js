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
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('dashboard', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode

    })
})

router.get('/dashboard/profile', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('usersP', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})

router.get('/dashboard/wallet', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('wallet', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})

router.get('/dashboard/address', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('address', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})

router.get('/dashboard/settings', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('settings', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})

router.get('/dashboard/orders', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('orders', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})

router.get('/dashboard/create_order', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('create_order', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})

router.get('/dashboard/rate', authName, (req, res) => {
    var name = req.user.name
    var email = req.user.email
    var mobile = req.user.mobile
    var wallet = req.user.wallet
    var address = req.user.address
    var city = req.user.city
    var pincode = req.user.pincode
    res.render('rate', {
        id: "dashboard",
        name: name,
        email: email,
        mobile: mobile,
        wallet: wallet,
        address: address,
        city: city,
        pincode: pincode
    })
})


module.exports = router