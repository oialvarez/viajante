'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Image = new Module('image');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Image.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Image.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Image.menus.add({
    title: 'image example page',
    link: 'image example page',
    roles: ['anonymous', 'authenticated'],
    menu: 'main'
  });
  
  Image.aggregateAsset('css', 'image.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Image.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Image.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Image.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Image;
});
