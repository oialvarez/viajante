'use strict';

angular.module('mean.image').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('image example page', {
      url: '/image/example',
      templateUrl: 'image/views/index.html'
    });
  }
]);
