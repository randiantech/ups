var express = require('express');
var winston = require('winston');
var bodyParser = require('body-parser');
var profile = require('./routes/profile');
var docs = require('./routes/docs');
var auth = require('./routes/auth');
var before = require('./middleware/before').before;
var after = require('./middleware/after').after;
var app = express();

/* app configuration */
app.set('view engine', 'ejs');
app.use( bodyParser.json() );
app.set('port', (process.env.PORT || 5000));
app.set('jwtTokenSecret', require('./.env').env().secret);

/* middleware */
before(app);
app.use('/', docs);
app.use('/profile', profile);
after(app);

/* server start */
app.listen(app.get('port'), function () {
    winston.add(winston.transports.File, { filename: 'application.log' });
    winston.log('info', 'UPS Started at ' + new Date());
});
