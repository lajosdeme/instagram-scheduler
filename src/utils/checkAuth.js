function checkAuth(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
        return false
    }
    return true
}
module.exports = checkAuth