"use strict";

const ApiError = require("../errors/api-error");
const bunyan = require('bunyan');
const config = require('../config');

const log = bunyan.createLogger(
    {
        name: config.applicationName || 'express-starter',
        version: config.version,
        serializers: {
            err: (err) => {
                if(err instanceof ApiError) {
                    return err;
                }
                return bunyan.stdSerializers.err(err);
            },
        },
        streams: [
            {
                level: config.logLevel || 'INFO',
                stream: process.stdout,
            },
        ],
    },
);

module.exports = function(filename) {
    const shortName = filename?.split("/").slice(-2).join('/') || ''
    return log.child({module: shortName}, true);
}