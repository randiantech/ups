function before(app) {
    app.use(function (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        next();
    });

    app.all('/*', function(req, res, next) {
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
