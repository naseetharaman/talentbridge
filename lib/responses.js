var DEBUG = require('util').debuglog('cisnw');

module.exports = {

    renderJSON: function(req, res) {
        'use strict';
        var _csrf = res.locals && res.locals._csrf;
        DEBUG('using CSRF token:', _csrf);
        DEBUG('session secret', req.session._csrfSecret);
        if (req.data && req.data.error) {
            const json = {
                data: {
                    error: req.data.error
                },
                _csrf: _csrf
            };
            if (req.data && req.data.corrId) {
                json.corrId = req.data.corrId;
            }

            // set the status to 500 if the status code is not set in the application and there is error
            if (!res.statusCode || (res.statusCode < 300 && res.statusCode > 199)) {
                res.status(500);
            }

            return res.json(json);
        } else if (req.data) {
            const json = {
                data: req.data,
                _csrf: _csrf
            };
            if (req.data && req.data.corrId) {
                json.corrId = req.data.corrId;
            }
            return res.json(json);
        } else {
            const json = {
                data: {},
                _csrf: _csrf
            };
            if (req.data && req.data.corrId) {
                json.corrId = req.data.corrId;
            }
            return res.json(json);
        }
    }
};
