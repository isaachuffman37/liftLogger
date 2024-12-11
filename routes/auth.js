const routes = require('express').Router();
const passport = require('passport');

// Auth with Google

routes.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))


// Google auth callback
routes.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res)=>{
    res.redirect('/welcome') 
})

// Logout

routes.get('/auth/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

module.exports = routes