'use strict';

const express = require('express');
const ApiError = require("../errors/api-error");
const router = express.Router();

router.get('/api/greeting', (req, res) => res.json({ greeting: 'hi' }));

router.get('/api/errors', (req, res) => {
    throw ApiError.badRequest({
        id: req.id,
        messages: ["Should be caught and formatted", "Should have an id"]
    });
});

module.exports = router;