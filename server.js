"use strict";

const
    bodyParser      = require('body-parser'),
    compression     = require('compression'),
    conf            = require('./src/config/env'),
    cors            = require('cors'),
    errors          = require('./src/middleware/errors'),
    express         = require('express'),
    expressMetrics = require('express-metrics'),
    helmet          = require('helmet'),
    log             = require('./src/logging/logger')(module.filename),
    reqCtx      = require('./src/middleware/reqCtx'),
    routeUtils      = require('./src/routes/routeUtils'),
    app             = express()
    ;

//============= Log Uncaught Exceptions ============= //
process.on('uncaughtException', function (err) {
    log.error(err);
    process.exit(1)
});

// middleware (order matters)
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.get('/', (req, res) => res.send(routeUtils.getPaths(app)));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('/ping', (req, res) => res.send('pong'));
app.use(require('./src/routes/ops'));

// routes (api)
app.use(expressMetrics({port: conf.metricsPort}));
app.use(reqCtx(), require('./src/routes/api'));

// errors
app.use(errors.apiErrorHandler);


app.listen(conf.port, function() {
    log.info('Server is listening to http://localhost:' + conf.port);
});

module.exports = app;