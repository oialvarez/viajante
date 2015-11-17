'use strict';

/* jshint -W098 */
var module = angular.module('mean.roomsearch', ['mean.gmap']);
module.controller('RoomsearchController', ['$scope', '$location', 'Global', 'Roomsearch',
    function ($scope, $location, Global, Roomsearch) {
        $scope.global = Global;
        $scope.package = {
            name: 'roomsearch'
        };

        var defaultQuery = "",
            placeholder = "ej: Puerto Montt";

        $scope.roomsearch = {
            query: defaultQuery,
            placeholder: placeholder
        };

        $scope.roomsearch.history = [];
        $scope.search = function (isValid) {
            if (isValid) {
                var query = $scope.roomsearch.query;
                $scope.roomsearch.history.push(query);
                $scope.roomsearch.query = defaultQuery;

                $location.path('roomsearch/partial');
            }
        };

        $scope.mymap = {
            center: {
                latitude: -33.46453657378947,
                longitude: -70.64543022753905
            },
            dragging: false,
            refresh: true,
            zoom: 10,
            markers: [{
                id: 0,
                coords: {
                    latitude: -33.46453657378947,
                    longitude: -70.64543022753905
                }
            }, {
                id: 1,
                coords: {
                    latitude: -33.06453657378947,
                    longitude: -70.04543022753905
                }
            }]
        };
    }
])
;
