'use strict';

angular.module('mean.hospedaje').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('hospedaje index', {
      url: '/hospedaje/',
      templateUrl: 'hospedaje/views/index.html'
    });
  }
]);
