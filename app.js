var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var MongoStore = require('connect-mongo');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//SESSION CONFIRGURATION
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DBNAME,
  collection: 'session'
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: sessionStore
}))

require('./config/passport')
app.use(passport.session())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/* Connecting to Mongo DB*/
async function main(){
  mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.MONGODB_DBNAME
  })
  console.log(`Connected to Mongo DB @ ${process.env.MONGODB_DBNAME}`)
}

main().catch((err)=>console.log(err));

module.exports = app;
