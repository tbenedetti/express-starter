'use strict';

const log = require('../logger')(module.filename);
const crypto = require("crypto");
const REQUEST_ID_HEADER = 'X-Request-Id';

/**
 * Provides context to each request
 */
function requestCtx() {
    return function(req, res, next) {

        req.id = req.header(REQUEST_ID_HEADER) || crypto.randomBytes(16).toString("hex");
        req.ctx = {
            id: req.id
        };

        log.debug({reqId: req.id, method: req.method, path: req.url}, 'Request start');

        res.setHeader(REQUEST_ID_HEADER, req.id);

        res.on('finish', function(){
            log.debug({ reqId: req.id }, 'Request finished');
        });

        next();
    }
}


module.exports = requestCtx;