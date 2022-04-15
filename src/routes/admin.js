'use strict';

const express = require('express');
const router  = express.Router();

router.get('/admin/ping', (req, res) => res.send('pong'));

router.get('/admin/health', (req, res) => res.json({
    someDb: 'ok',
    someApi: 'ok'
}));

module.exports = router;