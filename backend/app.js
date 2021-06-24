const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();

//const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const cmntRouter = require('./routes/comment'); 
const seatRouter = require('./routes/seat');

const { sequelize } = require('./models');

const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT||8005);
sequelize.sync( { force: false }) 
.then( () => {
    console.log('DB connection succeeded!');
})
.catch((err) => {
    console.error(err);
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname,'public/src')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, '/build')));

app.use('/api/auth', authRouter);
app.use('/api/comment', cmntRouter);
app.use('/api/seat', seatRouter);

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    return res.send('error'+err.status);
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), ' Waiting...');
}).on('connection', (socket) => {

});