'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Providers = new Module('providers');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Providers.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Providers.routes(app, auth, database);

  Providers.aggregateAsset('css', 'providers.css');

  
  //We are adding a link to the main menu for all authenticated users
  Providers.menus.add({
    'roles': ['authenticated'],
    'title': 'Providers',
    'link': 'all providers'
  });
  Providers.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Provider',
    'link': 'create provider'
  });

  Providers.events.defaultData({
    type: 'post',
    subtype: 'provider'
  });


  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Providers.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Providers.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Providers.settings(function (err, settings) {
      //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);
	
  return Providers;
});
