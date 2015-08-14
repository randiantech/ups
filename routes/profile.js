var express = require('express');
var winston = require('winston');
var mongojs = require('mongojs');
var router = express.Router();
var db = mongojs('rtdb', ['profile'])

router.get('/', function (req, res) {
    winston.log('info', 'Application TEST2');
    db.profile.find(function (err, docs) {
        if(!docs) winston.log('info','no data');
        res.send(docs);
    });
});

router.post('/add', function (req, res) {
    db.profile.save({name: 'Juan Carlos'}, function(err, response){
        res.send(201);
    });
});

router.post('/remove/:id', function (req, res) {
    res.send(204);
});

module.exports = router;