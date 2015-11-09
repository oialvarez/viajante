'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function (Hospedaje, app, auth, database) {
    app.get('/api/hospedaje/', function (req, res, next) {
        res.send('Anyone can access this');
    });
};
