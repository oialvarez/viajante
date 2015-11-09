'use strict';

/* jshint -W098 */
angular.module('mean.image').controller('ImageController', ['$scope', 'Global', 'Image',
  function($scope, Global, Image) {
    $scope.global = Global;
    $scope.package = {
      name: 'image'
    };
  }
]);
