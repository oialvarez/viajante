'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Roomsearch = new Module('roomsearch');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Roomsearch.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Roomsearch.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Roomsearch.menus.add({
    title: 'roomsearch example page',
    link: 'roomsearch example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Roomsearch.aggregateAsset('css', 'roomsearch.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Roomsearch.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Roomsearch.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Roomsearch.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Roomsearch;
});
