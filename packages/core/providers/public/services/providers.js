'use strict';

//Providers service used for providers REST endpoint
angular.module('mean.providers').factory('Providers', ['$resource',
  function($resource) {
    return $resource('api/providers/:providerId', {
      providerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
