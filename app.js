var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var usersRouter = require('./routes/usersRouter');
var categorieRouter = require('./routes/categorieRouter');
var suppliersRouter = require('./routes/suppliersRouter');
require('dotenv').config();
var app = express();
const {connectToDb} = require('./config/db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session middleware: ensures `req.session` exists
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/categorie', categorieRouter);
app.use('/api/supplier', suppliersRouter);
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
const http = require('http');
const server=http.createServer(app);
server.listen(process.env.port,()=>{
  connectToDb();
  console.log("Server is running on port 3000");
})
module.exports = app;
