var winston = require('winston');
var router = require('express').Router();

router.get('/', function (req, res) {
    res.render('pages/index');
});

router.get('/index', function (req, res) {
    res.render('pages/index');
});

router.get('/about', function (req, res) {
    res.render('pages/about');
});

module.exports = router;