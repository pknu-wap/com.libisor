const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT||8005);
