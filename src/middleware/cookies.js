const authCookie = (req, res, next) => {
    const { cookies } = req
    if ('APP_ID' in cookies) {
        if (cookies.APP_ID === req.cookies.APP_ID) {
            res.redirect("/dashboard?APP_ID=" + req.cookies.APP_ID)
        }
        else {
            next()
        }
    } else {
        next()
    }
}
module.exports = authCookie