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
Providers.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Providers.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Providers.menus.add({
    title: 'providers example page',
    link: 'providers example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Providers.aggregateAsset('css', 'providers.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Providers.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Providers.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Providers.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Providers;
});
