var winston = require('winston');
var stringify = require('json-stringify-safe');

var LOG_CODES = {
    I0000 : 'Unknown error',
    I0001 : function(params) { params.password = null; return 'Token successfuly decoded: ' + stringify(params[0]) },
    I0002 : 'No profiles found',
    I0003 : function(params) { return params[0] +' '+ params[1] },
    E0001 : 'Missed x-access-token header',
    E0002 : function(params) { return 'Authentication token has expired: ' + params[0] },
    E0003 : 'Invalid authentication token',
    E0004 : function(params) { return 'Profile could not be saved: ' + params[0] },
    E0005 : 'Tnvalid user and/or password'
};

function RtError(code, req, params){
    code = code || 'I0000';
    log(code, req, params);
    var rtError = {};
    rtError.description = typeof LOG_CODES[code] == 'function' ? LOG_CODES[code](params) : LOG_CODES[code];
    rtError.date = new Date().toISOString();
    rtError.trace = req.uuid;
    return new Error(JSON.stringify(rtError));
}

/**
 * @param code
 * @param req
 * @params params
 * @constructor
 */
function log(code, req, params){
    if(params && !(params instanceof Array)) params = [params];
    var trace = req.uuid;
    code = code || 'I0000';
    var severity;
    switch (code[0]){
        case "I": severity = 'info'; break;
        case "E": severity = 'error'; break;
        default : severity = 'info'; break;
    }
    var isoDate = new Date();
    isoDate = isoDate.toISOString();
    req ? req = stringify(_serializeRequest(req)) : req = 'no request';
    var description = typeof LOG_CODES[code] == 'function' ? LOG_CODES[code](params) : LOG_CODES[code];
    winston.log(severity, isoDate + '|' + code  + '|' + trace + '|' + description + '|' + req);
}

/**
 * Lets just add the fields we are interested to log from the request and rip the rest
 * @param req
 * @returns {{body: *, headers: (req.headers|{Content-Type}), method: string, params: *, query: *}}
 * @private
 */
function _serializeRequest(req){
    return {
        body : req.body,
        headers : req.headers,
        method : req.method,
        params : req.params,
        query : req.query
    }
}

/**
 * Public Interface
 * @type {{RtError: RtError, RtLog: RtLog}}
 */
module.exports = {
    RtError     : RtError,
    log         : log
};