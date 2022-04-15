"use strict";

const ApiError = require('../errors/api-error');
const log = require('../logger')(module.filename);

function errorHandler(err, req, res, next) {

    if (err.isApiError) {
        err.id = err.id || req.id;
        log.error({err}, {reqId: req.id});
        return res.status(err.statusCode).json(err);
    } else {
        log.error({err}, {reqId: req.id});
        return res.status(500).send(ApiError.internalError(req.id));
    }
}

module.exports = errorHandler;