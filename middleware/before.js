var RtError = require('../utils/utils').RtError;
var jwt = require('jwt-simple');

function before(app) {
    app.use(function (req, res, next) {
        req.secret = require('../.env').env().secret;
        next();
    });

    app.use(function(req, res){
       var encodedToken = req.headers['x-access-token'];
       if(!encodedToken){
        res.send(new RtError("Missed x-access-token header (authentication)").message);
       } else {
           try{
               var decodedToken = jwt.decode(encodedToken, req.secret);
               console.log(decodedToken);
               if (decodedToken.exp <= Date.now()) {
                   res.end(new RtError("Authentication token has expired").message, 400);
               }
           }catch(error){
               res.send(new RtError("Invalid authentication token").message);
           }
       }
    });

    app.use(function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    });

    app.use(function(req, res, next) {
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

module.exports = {
    before: before
};
