'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
    function ($scope, Global) {
        $scope.global = Global;
        $scope.zones = {
            'norteGrande': {
                'name': 'Norte Grande',
                'img' : '/system/assets/img/NorteGrande.png'
            },
            'norteChico': {
                'name': 'Norte Chico',
                'img' : '/system/assets/img/NorteChico.png'
            },
            'zonaCentral': {
                'name': 'Zona Central',
                'img' : '/system/assets/img/ZonaCentral.png'
            },
            'zonaSur': {
                'name': 'Zona Sur',
                'img' : '/system/assets/img/ZonaSur.png'
            },
            'zonaAustral': {
                'name': 'Zona Austral',
                'img' : '/system/assets/img/ZonaAustral.png'
            }
        };
    }
]);
