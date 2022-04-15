'use strict';

module.exports = Object.freeze({
    applicationName:    process.env.npm_package_name,
    version:            process.env.npm_package_version,
    logLevel:           process.env.LOG_LEVEL || "INFO",
    port:               process.env.PORT || 7005,
    metricsPort:        process.env.METRICS_PORT || 7010
});