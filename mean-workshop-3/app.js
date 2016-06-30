var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config/config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/src')));
app.use('/vendor',express.static(path.join(__dirname, 'client/vendor')));
app.use('/app',express.static(path.join(__dirname, 'client/src/app')));
app.use('/common',express.static(path.join(__dirname, 'client/src/common')));
app.use('/assets',express.static(path.join(__dirname, 'client/src/assets')));



var connect = function(){
        var options = {
                server : {
                        socketOptions : {
                                keepAlive : 1
                        }
                }
        };
        console.log('-- connected to db : '+config.db);
        mongoose.connect(config.db,options);
};
connect();

mongoose.connection.on('error',console.log);
mongoose.connection.on('disconnected',connect);


require('./config/routes')(app);
require('./config/express')(app);

module.exports = app;
