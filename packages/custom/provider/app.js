'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Provider = new Module('provider');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Provider.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Provider.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Provider.menus.add({
    title: 'provider example page',
    link: 'provider example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Provider.aggregateAsset('css', 'provider.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Provider.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Provider.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Provider.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Provider;
});
