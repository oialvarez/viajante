'use strict';

/* jshint -W098 */
angular.module('mean.roomsearch').controller('RoomsearchController', ['$scope', 'Global', 'Roomsearch',
  function($scope, Global, Roomsearch) {
    $scope.global = Global;
    $scope.package = {
      name: 'roomsearch'
    };
  }
]);
