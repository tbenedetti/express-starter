"use strict";

const log = require('../logging/logger')(module.filename),
    uuidV4 = require('uuid/v4');

const TRACKING_HEADER = 'X-Request-Id',
    TRACKING_PREFIX = process.env.npm_package_name + '-',
    VERSION = process.env.npm_package_version,
    VERSION_HEADER = 'X-Api-Version';

/**
 * Provides context to each request
 */
function requestCtx() {
    return function(req, res, next) {

        req.id = req.header(TRACKING_HEADER) || TRACKING_PREFIX+uuidV4();

        req.ctx = {
            id: req.id
        };

        log.debug({reqId: req.id, method: req.method, path: req.url}, 'Request start');

        res.setHeader(TRACKING_HEADER, req.id);
        res.setHeader(VERSION_HEADER, VERSION);

        res.on('finish', function(){
            log.debug({ reqId: req.id }, 'Request finish');
        });

        next();
    }
}


module.exports = requestCtx;