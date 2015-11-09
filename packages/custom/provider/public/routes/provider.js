'use strict';

angular.module('mean.provider').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('provider example page', {
      url: '/provider/example',
      templateUrl: 'provider/views/index.html'
    });
  }
]);
