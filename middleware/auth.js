module.exports = {
    ensureAuth: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/')
        }
    }, 

    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()){
            res.redirect('/welcome')
        } else {
            return next()
        }
    }
}