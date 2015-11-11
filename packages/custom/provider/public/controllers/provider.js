'use strict';

/* jshint -W098 */
angular.module('mean.provider').controller('ProviderController', ['$scope', 'Global', 'Provider',
  function($scope, Global, Provider) {
    $scope.global = Global;
    $scope.package = {
      name: 'provider'
    };
  }
]);
