var winston = require('winston');
var mongojs = require('mongojs');
var router = require('express').Router();
var Profile = require('../domain/profile').Profile;
var db = mongojs('rtdb', ['profile']);

router.get('/', function (req, res) {
    winston.log('info', 'PROFILE:::FIND:::' + new Date());
    db.profile.find(function (error, profiles) {
        if (error) {
            winston.log('info', 'no profiles found');
            res.send(404);
        }
        if (!profiles) winston.log('info', 'no profiles found');
        res.send(profiles);
    });
});

router.post('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    try {
        db.profile.save(new Profile(req.body), function (error, response) {
            if (error) {
                winston.log('error', 'profile could not be saved');
                res.send(error);
            }
            res.send(201);
        });
    } catch (error) {
        res.send(422, error.message);
    }
});

router.post('/remove/:id', function (req, res) {
    res.send(204);
});

module.exports = router;