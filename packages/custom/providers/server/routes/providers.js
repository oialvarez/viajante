'use strict';

// Provider authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.provider.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        };
    };

    next();
};

module.exports = function(Providers, app, auth,database) {
  
  var providers = require('../controllers/providers')(Providers);

  app.route('/api/providers')
    .get(providers.all)
    .post(auth.requiresLogin, hasPermissions, providers.create);
  app.route('/api/providers/:providerId')
    .get(auth.isMongoId, providers.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, providers.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, providers.destroy);

  // Finish with setting up the providerId param
  app.param('providerId', providers.provider);
};
