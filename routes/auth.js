var mongojs = require('mongojs');
var router = require('express').Router();
var db = mongojs('rtdb', ['auth']);
var jwt = require('jwt-simple');
var moment = require("moment");

router.post('/', function (req, res, next) {
    LOG('I0003', req, ['POST','/auth']);
    db.auth.find({mail: req.body.mail, password: req.body.password}, function (error, user) {
        user = user[0];
        if (error || !user) {
            log('E0005', req, null);
            res.send(403);
            next();
        } else {
            var expires = moment().add(1,'days').valueOf();
            var token = jwt.encode({iss: user.mail, exp: expires }, req.secret);
            res.send(token);
            next();
        }
    });
});

module.exports = router;