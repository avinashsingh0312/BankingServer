var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
var dotenv = require('dotenv').config();



var port= process.env.PORT || 5000;
var app = express();


connectDb();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/accounts', require('./routes/accountRoutes'));
// error handler
//app.use(errorHandler);








app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})
module.exports = app;
