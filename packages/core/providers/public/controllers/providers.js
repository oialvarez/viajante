'use strict';

angular.module('mean.providers').controller('ProvidersController', ['$scope', '$stateParams', '$location', 'Global', 'Providers', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Providers, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(provider) {
      if (!provider || !provider.user) return false;
      return MeanUser.isAdmin || provider.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.provider.permissions.push('test test');
        var provider = new Providers($scope.provider);

        provider.$save(function(response) {
          $location.path('providers/' + response._id);
        });

        $scope.provider = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(provider) {
      if (provider) {
        provider.$remove(function(response) {
          for (var i in $scope.providers) {
            if ($scope.providers[i] === provider) {
              $scope.providers.splice(i, 1);
            }
          }
          $location.path('providers');
        });
      } else {
        $scope.provider.$remove(function(response) {
          $location.path('providers');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var provider = $scope.provider;
        if (!provider.updated) {
          provider.updated = [];
        }
        provider.updated.push(new Date().getTime());

        provider.$update(function() {
          $location.path('providers/' + provider._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Providers.query(function(providers) {
        $scope.providers = providers;
      });
    };

    $scope.findOne = function() {
      Providers.get({
        providerId: $stateParams.providerId
      }, function(provider) {
        $scope.provider = provider;
      });
    };
  }
]);