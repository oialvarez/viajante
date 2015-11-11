'use strict';

//Setting up route
angular.module('mean.providers').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all providers', {
        url: '/providers',
        templateUrl: '/providers/views/list.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('create provider', {
        url: '/providers/create',
        templateUrl: '/providers/views/create.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('edit provider', {
        url: '/providers/:providerId/edit',
        templateUrl: '/providers/views/edit.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      })
      .state('provider by id', {
        url: '/providers/:providerId',
        templateUrl: '/providers/views/view.html',
        resolve: {
          loggedin: function(MeanUser) {
            return MeanUser.checkLoggedin();
          }
        }
      });
  }
]);
