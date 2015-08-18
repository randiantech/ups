var RtError = require('../utils/utils').RtError;
var jwt = require('jwt-simple');
var uuid = require('node-uuid');

function before(app) {
    /* Generate UUIDv4 for request */
    app.use(function (req, res, next) {
        req.uuid = uuid.v4();
        next();
    });

    /* append application secrect (TODO: Remove this and add as a property) */
    app.use(function (req, res, next) {
        req.secret = require('../.env').env().secret;
        next();
    });

    /* Checks access token */
    app.use(function (req, res, next) {
        if (req.originalUrl == '/auth') {
            next();
        } else {
            var encodedToken = req.headers['x-access-token'];
            if (!encodedToken) {
                res.send(new RtError('E0001').message);
            } else {
                try {
                    var decodedToken = jwt.decode(encodedToken, req.secret);
                    LOG('I0001', req, decodedToken);
                    if (decodedToken.exp <= Date.now()) {
                        res.end(new RtError('E0002').message, 400);
                    } else {
                        next();
                    }
                } catch (error) {
                    res.send(new RtError('E0003').message);
                }
            }
        }
    });

    /* adds application/json header to every outgoing response */
    app.use(function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    });

    /* add CORS specific headers to every outgoing response */
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });
}

/**
 * Public Interface
 * @type {{before: before}}
 */
module.exports = {
    before: before
};
