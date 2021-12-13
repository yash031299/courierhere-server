const authCookie = (req, res, next) => {
    const { cookies } = req
    if ('APP_ID' in cookies) {
        if (cookies.APP_ID === req.cookies.APP_ID) {
            res.redirect("http://localhost:3000/dashboard?APP_ID=" + req.cookies.APP_ID)
        }
        else {
            next()
        }
    } else {
        next()
    }
}
module.exports = authCookie