"use strict";

const express = require('express'),
    router  = express.Router(),
    ApiError = require('../errors/apiError'),
    ApiUtils = require('../utils/apiUtils')
    ;


router.get(ApiUtils.API_PATH + '/hello', (req, res) => res.send({ greeting: 'hi' }));

router.get(ApiUtils.API_PATH + '/errors', (req, res) => {
    throw ApiError.badRequest('This should be caught and formatted');
});

module.exports = router;