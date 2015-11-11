'use strict';

angular.module('mean.roomsearch')
    .config([
        '$stateProvider', function ($stateProvider) {
            $stateProvider.state('roomsearch home', {
                url: '/roomsearch/',
                templateUrl: 'roomsearch/views/index.html'
            });
        }
    ]);
