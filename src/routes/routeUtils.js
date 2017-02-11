
'use strict';


module.exports = {
    getPaths: function(app) {

        const endpoints = {paths : {}};

        app._router.stack.forEach(mw => {
            if (mw.handle.stack) {
                mw.handle.stack.forEach(route => {
                    if (route.route && route.route.path) {
                        const path = route.route.path;
                        endpoints.paths[path] = endpoints.paths[path] || {};
                        endpoints.paths[path][route.route.stack[0].method] = {};
                    }
                });
            }
        });

        return endpoints;
    }
};