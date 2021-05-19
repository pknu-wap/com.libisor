const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (id, password, done) => {
        try {
            const exUser = await User.findOne({ where: { localId: id }});
            if ( exUser ) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: 'wrongpwd'});
                }
            } else {
                done(null, false, { message: 'unregistered'});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};