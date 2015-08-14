var express = require('express');
var winston = require('winston');
var bodyParser = require('body-parser');
var profile = require('./routes/profile');
var docs = require('./routes/docs');
var app = express();

app.set('view engine', 'ejs');
app.use( bodyParser.json() );
app.use('/', docs);
app.use('/profile', profile);
app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), function () {
    winston.add(winston.transports.File, { filename: 'application.log' });
    winston.log('info', 'UPS Started at ' + new Date());
});
