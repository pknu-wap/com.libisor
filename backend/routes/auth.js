const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/User');

const router = express.Router();

router.post('/join', isNotLoggedIn, async ( req, res, next) => {
    const { id ,password } = req.body;
    try{
        const exUser = await User.findOne({ where: { localId: id }});
        if (exUser) {
            return res.redirect(`/?error=exist`);
        } 
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            localId: id,
            password: hash
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }) (req, res, next); // middleware in middleware
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

