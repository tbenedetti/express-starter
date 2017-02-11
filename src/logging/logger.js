"use strict";

// Dependencies
// ============================
const bunyan = require('bunyan'),
    path = require('path'),
    conf = require('../config/env').logger
    ;

/**
 * Creates a logger using the given name
 *
 * @param name
 * @returns {*}
 */
function logger(name) {

    return bunyan.createLogger({
        app: process.env.npm_package_name,
        version: process.env.npm_package_version,
        name: path.basename(name),
        streams: [
            {
                level: conf.level || 'info',
                stream: process.stdout
            }
        ]
    });
}

module.exports = logger;