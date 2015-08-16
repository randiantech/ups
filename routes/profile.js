var mongojs = require('mongojs');
var router = require('express').Router();
var Profile = require('../domain/profile').Profile;
var db = mongojs('rtdb', ['profile']);
var log = require('../utils/utils').log;
var RtError = require('../utils/utils').RtError;

router.get('/', function (req, res, next) {
    log('I0003', req, ['GET','/profile']);
    db.profile.find(function (error, profiles) {
        if (error) {
            log('I0002', req, null);
            res.send(404);
            next();
        }
        if (!profiles) log('I0002', req, null);
        res.send(_prepare(profiles));
        next();
    });
});

router.post('/', function (req, res) {
    try {
        db.profile.save(new Profile(req.body), function (error) {
            if (error) {
                res.send(new RtError('E0004', req, error).message);
            }
            res.send(201);
        });
    } catch (error) {
        res.send(422, new RtError('E0004', req, error).message);
    }
});

router.post('/remove/:id', function (req, res) {
    res.send(204);
});

function _prepare(profiles){
    profiles.forEach(function(profile){
        profile._id = undefined;
    });

    return profiles;
}

module.exports = router;