const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const { sequelize } = require('./models/seatRecord');

require('dotenv').config();

const pageRouter = require('./routes/page');

const app = express();

app.set('port', process.env.PORT||8005);
const { sequelize } = require('./models');
sequelize.sync( { force: true }) 
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



app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error'+err.status);
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), ' Waiting...');
}).on('connection', (socket) => {

});