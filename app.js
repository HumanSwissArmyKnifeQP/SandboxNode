const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bluebird = require('bluebird');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const api = require('./routes/api.route');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
    .then(()=> { console.log('Successfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp');})
    .catch(()=> { console.log('Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp');});

const app = express();

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api)

// catch 404 and forward to error handler
app.use((req, res, next)=>{
    next(createError(404));
});

// error handler
app.use((err, req, res, next)=>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
