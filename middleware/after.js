function after(app) {
    app.use(function (req, res, next) {
        console.log("RESPONSE FINISHED");
    });
}

module.exports = {
    after: after
};
