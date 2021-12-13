const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const { cookies } = req
    if ('APP_ID' in cookies) {
        if (cookies.APP_ID === req.cookies.APP_ID) {
            const token = cookies.APP_ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
            req.user = user
            next()
        }
        else {
            res.redirect("/loginPage")
        }
    } else {
        res.redirect("/loginPage")
    }
}

module.exports = auth