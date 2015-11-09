'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Hospedaje = new Module('hospedaje');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Hospedaje.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Hospedaje.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Hospedaje.menus.add({
    title: 'Hospedaje',
    link: 'hospedaje index',
    roles: ['anonymous', 'authenticated'],
    menu: 'main'
  });
  
  Hospedaje.aggregateAsset('css', 'hospedaje.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Hospedaje.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Hospedaje.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Hospedaje.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Hospedaje;
});
