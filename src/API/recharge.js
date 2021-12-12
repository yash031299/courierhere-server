const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()

router.post('/recharge', auth, (req, res) => {
    res.send({ message: "Payment gateway to be integrated" });
})

module.exports = router