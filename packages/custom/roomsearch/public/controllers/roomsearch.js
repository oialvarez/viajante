'use strict';

/* jshint -W098 */
angular.module('mean.roomsearch').controller('RoomsearchController', ['$scope', 'Global', 'Roomsearch',
    function ($scope, Global, Roomsearch) {
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
            }
        };
    }
]);
