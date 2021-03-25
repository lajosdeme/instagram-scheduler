const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../db/schema/User').User

module.exports = async () => {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, (err, user) => {
                if (err) { 
                    console.log(err)
                    return done(err); }
                if (!user) { 
                    console.log('user donesnt exist')
                    return done(null, false); }
                if (!user.validatePassword(password)) { return done(null, false) }
                return done(null, user)
            })
        }
    ))

    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
