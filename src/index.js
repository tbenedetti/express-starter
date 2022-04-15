"use strict";

const
    compression     = require('compression'),
    config          = require('./config'),
    cors            = require('cors'),
    errorHandler    = require('./middleware/error-handler'),
    express         = require('express'),
    helmet          = require('helmet'),
    log             = require('./logger')(module.filename),
    reqCtx          = require('./middleware/req-ctx'),
    routesAdmin     = require('./routes/admin'),
    routesApi       = require('./routes/api'),
    app             = express()
;

//============= Log Uncaught Exceptions ============= //
process.on('uncaughtException', function (err) {
    log.error({err});
    process.exit(1)
});

// middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// routes
app.get('/', (req, res) => res.json({
    name: config.applicationName,
    version: config.version
}));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.use(routesAdmin);
app.use(reqCtx(), routesApi);

// errors
app.use(errorHandler);

app.listen(config.port, function() {
    log.info('Server is listening on *:' + config.port);
});

module.exports = app;