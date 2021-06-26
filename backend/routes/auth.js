const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/localid', async ( req, res, next) => {
    if(req.user===undefined) return res.send(null);
    else return res.send(req.user.localId);
});

router.post('/join', isNotLoggedIn, async ( req, res, next) => {
    const { id ,password } = req.body;
    try{
        const exUser = await User.findOne({ where: { localId: id }});
        if (exUser) {
            return  res.status(412).send('Exists');
        } 
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            localId: id,
            password: hash
        });
        return  res.status(200).send(id);
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    const { id } = req.body;
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return  res.status(412).send('NOT EXISTS');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return  res.status(200).send(id);
        });
    }) (req, res, next); // middleware in middleware
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    return  res.status(200).send('logout');
});

module.exports = router;

