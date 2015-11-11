'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Roomsearch, app, auth, database) {

  app.get('/api/roomsearch/', function(req, res, next) {
    res.send('Anyone can access this');
  });

};
