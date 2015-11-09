'use strict';

/* jshint -W098 */
angular.module('mean.hospedaje').controller('HospedajeController', [
    '$scope', 'Global', 'Hospedaje', 'City',
    function ($scope, Global, Hospedaje) {
        $scope.global = Global;
        $scope.package = {
            name: 'hospedaje'
        };

        var defaultQuery = "",
            placeholder = "ej: Puerto Montt";
        $scope.hospedaje = {
            query: defaultQuery,
            placeholder: placeholder
        };

        $scope.hospedaje.history = [];
        ¢scope.search = function (isValid) {
            if (isValid) {
                var query = $scope.hospedaje.query;
                $scope.hospedaje.history.push(query);
            }
        };
    }
]);
