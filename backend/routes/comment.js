onst express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/User');

const router = express.Router();

router.get((req, res, next) => { // 최근 코멘트 10개 날리기

});

router.post((req, res, next) => { // 코멘트 작성 

});

module.exports = router;