'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Provider, app, auth, database) {

  app.get('/api/provider/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/provider/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/provider/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/provider/example/render', function(req, res, next) {
    Provider.render('index', {
      package: 'provider'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
