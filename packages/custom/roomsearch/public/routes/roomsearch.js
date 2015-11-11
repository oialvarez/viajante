'use strict';

angular.module('mean.roomsearch').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('roomsearch example page', {
      url: '/roomsearch/example',
      templateUrl: 'roomsearch/views/index.html'
    });
  }
]);
