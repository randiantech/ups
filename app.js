var express = require('express');
var bodyParser = require('body-parser');
var profile = require('./routes/profile');
var docs = require('./routes/docs');
var auth = require('./routes/auth');
var before = require('./middleware/before').before;
var after = require('./middleware/after').after;
require('rt-log').setup();
global.LOG = require('rt-log').log;
global.ERROR = require('rt-log').error;
var app = express();

/* app configuration */
app.set('view engine', 'ejs');
app.use( bodyParser.json() );
app.set('port', (process.env.PORT || 5000));
app.set('secret', require('./.env').env().secret);

/* middleware */
before(app);
app.use('/', docs);
app.use('/profile', profile);
app.use('/auth', auth);
after(app);

/* server start */
app.listen(app.get('port'), function () {
    LOG('I0001', {uuid:1234}, ['1234']);
    //winston.add(winston.transports.File, { filename: 'application.log' });
    //winston.log('info', 'UPS Started at ' + new Date());
});
