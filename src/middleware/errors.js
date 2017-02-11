"use strict";

const ApiError = require('../errors/apiError'),
    log = require('../logging/logger')(module.filename)
    ;

module.exports = {

    apiErrorHandler: function(err, req, res, next) {

        if(err instanceof ApiError) {
            if(!err.reqId) {
                err.reqId = req.id;
            }

            log.error(err);

            return res.status(err.code).json(err);
        }
        else {

            log.error({reqId: req.id}, err);

            return res.status(500).send(ApiError.internalServer(req.id));
        }
    }

};