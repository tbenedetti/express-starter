"use strict";

const express = require('express'),
    router  = express.Router(),
    ApiUtils = require('../utils/apiUtils')
    ;

router.get('/ping', (req, res) => res.send('pong'));

router.get('/version', (req, res) => res.send({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version
}));

router.get(ApiUtils.OPS_PATH + '/health', (req, res) => res.send({
    someDb: 'ok',
    someApi: 'ok'
}));

module.exports = router;