
"use strict";

const local = {
    port: 5002,
    metricsPort: 8092,
    logger: {
        level: 'debug'
    }
};

const production = {
    port: 8080,
    metricsPort: 8081,
    logger: {
        level: 'warn'
    }
};

const env = process.env.NODE_ENV || 'production';

console.log('Using env', env);

let config = null;

switch(env) {
    case 'local':
        config = local;
        break;
    case 'production':
        config = production;
        break;
    default:
        config = production;
}

config.env = env;

module.exports = config;