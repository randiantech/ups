var winston = require('winston');
var mongojs = require('mongojs');
var router = require('express').Router();
var db = mongojs('rtdb', ['auth']);
var jwt = require('jwt-simple');
var moment = require("moment");

router.get('/', function (req, res, next) {
    winston.log('info', 'AUTH:::AUTH:::' + new Date());
    db.auth.find(function (error, user) {
        if (error || !user) {
            winston.log('info', 'invalid authentication');
            res.send(403);
            next();
        } else {
            var expires = moment().add('days', 1).valueOf();
            var token = jwt.encode({
                iss: user.id,
                exp: expires
            }, app.get('jwtTokenSecret'));

            res.json({
                token : token,
                expires: new Date(),
                user: user.toJSON()
            });
            
            next();
        }
    });
});