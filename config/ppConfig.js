const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models'); // database

const STRATEGY = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, cb) => {
    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user || !user.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
        }
    } catch (error) {
        console.log('---- Error -----');
        console.log(error);
    }
});

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findByPk(id);

        if (user) {
            cb(null, user);
        }
    } catch (error) {
        console.log('----- Yo, there is an error below ------');
        console.log(error);
    }
});

passport.use(STRATEGY);

module.exports = passport;