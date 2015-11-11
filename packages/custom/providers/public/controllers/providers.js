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
  
        var cabins = $scope.cabins;
        $scope.provider.cabin = [];

        for (var i =0; i<cabins.length ; i++){
          $scope.provider.cabin.push(cabins[i])         
        }

        var services = $scope.services;
        $scope.provider.service = [];

        for (var i =0; i<services.length ; i++){
          $scope.provider.service.push(services[i])         
        }

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
        var cabins = $scope.cabins;
        $scope.provider.cabin = [];

        for (var i =0; i<cabins.length ; i++){
          $scope.provider.cabin.push(cabins[i])         
        }

        var services = $scope.services;
        $scope.provider.service = [];

        for (var i =0; i<services.length ; i++){
          $scope.provider.service.push(services[i])         
        }
        
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
        //$scope.cabins = formatPrices(provider.cabin);
        $scope.cabins = provider.cabin;
        $scope.services = provider.service;
        $scope.provider = provider;
       
      });
    };

    $scope.cabins = [];
    $scope.addCabin = function () {
          $scope.cabins.push({ 
            name: "",
            capacity: "",
            price: "",
            text: ""
          });
    };

    $scope.services = [];
    $scope.addService = function () {
          $scope.services.push({
            name:"",
            description:""
          });
    };

    $scope.removeService = function (index){
        $scope.services.splice(index,1)
    };
    $scope.removeCabin = function (index){
      
        $scope.cabins.splice(index,1)

    };

    function formatPrice(input){

      var num = input;
      if(!isNaN(input)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = "$" + num.split('').reverse().join('').replace(/^[\.]/,'');
       return num
      }
    }

    function formatPrices(array){

      for(var i = 0 ; i < array.length ; i++){
        array[i].price = formatPrice(array[i].price)
      }
      return array;
    }

    //$scope.region = [{"region_id": 1,"region_nombre": "Arica y Parinacota","region_ordinal": "XV"}, {"region_id": 2,"region_nombre": "Tarapacá","region_ordinal": "I"}, {"region_id": 3,"region_nombre": "Antofagasta","region_ordinal": "II"}, {"region_id": 4,"region_nombre": "Atacama","region_ordinal": "III"}, {"region_id": 5,"region_nombre": "Coquimbo","region_ordinal": "IV"}, {"region_id": 6,"region_nombre": "Valparaiso","region_ordinal": "V"}, {"region_id": 7,"region_nombre": "Metropolitana de Santiago","region_ordinal": "RM"}, {"region_id": 8,"region_nombre": "Libertador General Bernardo O\'Higgins","region_ordinal": "VI"}, {"region_id": 9,"region_nombre": "Maule","region_ordinal": "VII"}, {"region_id": 10,"region_nombre": "Biobío","region_ordinal": "VIII"}, {"region_id": 11,"region_nombre": "La Araucanía","region_ordinal": "IX"}, {"region_id": 12,"region_nombre": "Los Ríos","region_ordinal": "XIV"}, {"region_id": 13,"region_nombre": "Los Lagos","region_ordinal": "X"}, {"region_id": 14,"region_nombre": "Aisén del General Carlos Ibáñez del Campo","region_ordinal": "XI"}, {"region_id": 15,"region_nombre": "Magallanes y de la Antártica Chilena","region_ordinal": "XII"}];

    $scope.findDummy = function() {

      $scope.providers = [
      
      { "_id":"563e9944eac9d90a07a8b656",
        "user":{"_id":"563d506703884a6f0560bd13",
              "username":"ebm",
              "name":"eriss"
              },
        "title":"Cabañas Cajon del Maipo",
        "subtitle":"Un paraiso a 20 kms de Santiago",
        "content":"lorem ipsum",
        "__v":2,
        "contact":[
              { "person":"Sra Maria",
                "phone":23442323,
                "email":"ebm@ebm.cl",
                "website":"www.cabañashorcon.cl",
                "_id":"563e9944eac9d90a07a8b652"
              }
            ],
        "location":[
              { "address":"Calle Falsa 123",
                "lat":30,
                "lon":70,
                "_id":"563e9944eac9d90a07a8b653"
              }
            ],
        "service":[
              { 
                "name":"TV Cable",
                "description":null,
                "_id":"563ea763eac9d90a07a8b659"
              },
              { 
                "name":"Piscina",
                "description":null,
                "_id":"563ea763eac9d90a07a8b658"
              },
              {
                "name":"Desayuno",
                "description":null,
                "_id":"563ea763eac9d90a07a8b657"
              },
              {
                "name":"Cena",
                "description":null, 
                "_id":"563ea763eac9d90a07a8b656"
              }
            ],
        "cabin":[
            {
              "name":"Basica",
              "capacity":4,
              "price":30000,
              "_id":"563e9944eac9d90a07a8b651"
            },
            {
              "name":"dummy2",
              "capacity":6,
              "price":40000,
              "_id":"563ea6d3eac9d90a07a8b655"
            },
            {
              "name":"dummy3",
              "capacity":12,
              "price":50000,
              "_id":"563ea6d3eac9d90a07a8b654"
            }
          ],
        "updated":[1446946515685,1446946659595],
        "permissions":["authenticated"],
        "created":"2015-11-08T00:37:24.405Z"
    },



    { "_id":"563e9944eac9d90a07a8b656",
        "user":{"_id":"563d506703884a6f0560bd13",
              "username":"ebm",
              "name":"eriss"
              },
        "title":"Cabaña Erick",
        "subtitle":"cerca de la casa",
        "content":"lorem ipsum",
        "__v":2,
        "contact":[
              { "person":"Sra Maria",
                "phone":23442323,
                "email":"ebm@ebm.cl",
                "website":"www.cabañashorcon.cl",
                "_id":"563e9944eac9d90a07a8b652"
              }
            ],
        "location":[
              { "address":"Calle Falsa 123",
                "lat":30,
                "lon":70,
                "_id":"563e9944eac9d90a07a8b653"
              }
            ],
        "service":[
              { 
                "name":"TV Cable",
                "description":null,
                "_id":"563ea763eac9d90a07a8b659"
              },
              { 
                "name":"Piscina",
                "description":null,
                "_id":"563ea763eac9d90a07a8b658"
              },
              {
                "name":"Desayuno",
                "description":null,
                "_id":"563ea763eac9d90a07a8b657"
              },
              {
                "name":"Cena",
                "description":null, 
                "_id":"563ea763eac9d90a07a8b656"
              }
            ],
        "cabin":[
            {
              "name":"Basica",
              "capacity":4,
              "price":30000,
              "_id":"563e9944eac9d90a07a8b651"
            },
            {
              "name":"dummy2",
              "capacity":6,
              "price":40000,
              "_id":"563ea6d3eac9d90a07a8b655"
            },
            {
              "name":"dummy3",
              "capacity":12,
              "price":50000,
              "_id":"563ea6d3eac9d90a07a8b654"
            }
          ],
        "updated":[1446946515685,1446946659595],
        "permissions":["authenticated"],
        "created":"2015-11-08T00:37:24.405Z"
    }
  ];
 }

 $scope.city = {selected:null,
               availableOpcions: [{"comuna_id": 1,"comuna_nombre": "Arica","provincia_id": 1},
           {"comuna_id": 2,"comuna_nombre": "Camarones","provincia_id": 1}, 
           {"comuna_id": 3,"comuna_nombre": "General Lagos","provincia_id": 2}, 
           {"comuna_id": 4,"comuna_nombre": "Putre","provincia_id": 2}, 
           {"comuna_id": 5,"comuna_nombre": "Alto Hospicio","provincia_id": 3}, 
           {"comuna_id": 6,"comuna_nombre": "Iquique","provincia_id": 3}, 
           {"comuna_id": 7,"comuna_nombre": "Camiña","provincia_id": 4}, 
           {"comuna_id": 8,"comuna_nombre": "Colchane","provincia_id": 4},
           {"comuna_id": 9,"comuna_nombre": "Huara","provincia_id": 4},
           {"comuna_id": 10,"comuna_nombre": "Pica","provincia_id": 4}, 
           {"comuna_id": 11,"comuna_nombre": "Pozo Almonte","provincia_id": 4},
           {"comuna_id": 12,"comuna_nombre": "Antofagasta","provincia_id": 5}, 
           {"comuna_id": 13,"comuna_nombre": "Mejillones","provincia_id": 5}, 
           {"comuna_id": 14,"comuna_nombre": "Sierra Gorda","provincia_id": 5}, 
           {"comuna_id": 15,"comuna_nombre": "Taltal","provincia_id": 5}, 
           {"comuna_id": 16,"comuna_nombre": "Calama","provincia_id": 6}, 
           {"comuna_id": 17,"comuna_nombre": "Ollague","provincia_id": 6}, 
           {"comuna_id": 18,"comuna_nombre": "San Pedro de Atacama","provincia_id": 6}, 
           {"comuna_id": 19,"comuna_nombre": "María Elena","provincia_id": 7},
           {"comuna_id": 20,"comuna_nombre": "Tocopilla","provincia_id": 7}, 
           {"comuna_id": 21,"comuna_nombre": "Chañaral","provincia_id": 8}, 
           {"comuna_id": 22,"comuna_nombre": "Diego de Almagro","provincia_id": 8}, 
           {"comuna_id": 23,"comuna_nombre": "Caldera","provincia_id": 9}, 
           {"comuna_id": 24,"comuna_nombre": "Copiapó","provincia_id": 9}, 
           {"comuna_id": 25,"comuna_nombre": "Tierra Amarilla","provincia_id": 9}, 
           {"comuna_id": 26,"comuna_nombre": "Alto del Carmen","provincia_id": 10}, 
           {"comuna_id": 27,"comuna_nombre": "Freirina","provincia_id": 10}, 
           {"comuna_id": 28,"comuna_nombre": "Huasco","provincia_id": 10}, 
           {"comuna_id": 29,"comuna_nombre": "Vallenar","provincia_id": 10}, 
           {"comuna_id": 30,"comuna_nombre": "Canela","provincia_id": 11}, 
           {"comuna_id": 31,"comuna_nombre": "Illapel","provincia_id": 11},
           {"comuna_id": 32,"comuna_nombre": "Los Vilos","provincia_id": 11}, 
           {"comuna_id": 33,"comuna_nombre": "Salamanca","provincia_id": 11},
           {"comuna_id": 34,"comuna_nombre": "Andacollo","provincia_id": 12},
           {"comuna_id": 35,"comuna_nombre": "Coquimbo","provincia_id": 12}, 
           {"comuna_id": 36,"comuna_nombre": "La Higuera","provincia_id": 12}, 
           {"comuna_id": 37,"comuna_nombre": "La Serena","provincia_id": 12}, 
           {"comuna_id": 38,"comuna_nombre": "Paihuaco","provincia_id": 12}, 
           {"comuna_id": 39,"comuna_nombre": "Vicuña","provincia_id": 12}, 
           {"comuna_id": 40,"comuna_nombre": "Combarbalá","provincia_id": 13}, 
           {"comuna_id": 41,"comuna_nombre": "Monte Patria","provincia_id": 13},
           {"comuna_id": 42,"comuna_nombre": "Ovalle","provincia_id": 13}, 
           {"comuna_id": 43,"comuna_nombre": "Punitaqui","provincia_id": 13},
           {"comuna_id": 44,"comuna_nombre": "Río Hurtado","provincia_id": 13}, 
           {"comuna_id": 45,"comuna_nombre": "Isla de Pascua","provincia_id": 14}, 
           {"comuna_id": 46,"comuna_nombre": "Calle Larga","provincia_id": 15},
           {"comuna_id": 47,"comuna_nombre": "Los Andes","provincia_id": 15},
           {"comuna_id": 48,"comuna_nombre": "Rinconada","provincia_id": 15}, 
           {"comuna_id": 49,"comuna_nombre": "San Esteban","provincia_id": 15},
           {"comuna_id": 50,"comuna_nombre": "La Ligua","provincia_id": 16},
           {"comuna_id": 51,"comuna_nombre": "Papudo","provincia_id": 16},
           {"comuna_id": 52,"comuna_nombre": "Petorca","provincia_id": 16},
           {"comuna_id": 53,"comuna_nombre": "Zapallar","provincia_id": 16},
           {"comuna_id": 54,"comuna_nombre": "Hijuelas","provincia_id": 17},
           {"comuna_id": 55,"comuna_nombre": "La Calera","provincia_id": 17}, 
           {"comuna_id": 56,"comuna_nombre": "La Cruz","provincia_id": 17},
           {"comuna_id": 57,"comuna_nombre": "Limache","provincia_id": 17}, 
           {"comuna_id": 58,"comuna_nombre": "Nogales","provincia_id": 17}, 
           {"comuna_id": 59,"comuna_nombre": "Olmué","provincia_id": 17},
           {"comuna_id": 60,"comuna_nombre": "Quillota","provincia_id": 17}, 
           {"comuna_id": 61,"comuna_nombre": "Algarrobo","provincia_id": 18}, 
           {"comuna_id": 62,"comuna_nombre": "Cartagena","provincia_id": 18}, 
           {"comuna_id": 63,"comuna_nombre": "El Quisco","provincia_id": 18}, 
           {"comuna_id": 64,"comuna_nombre": "El Tabo","provincia_id": 18}, 
           {"comuna_id": 65,"comuna_nombre": "San Antonio","provincia_id": 18}, 
           {"comuna_id": 66,"comuna_nombre": "Santo Domingo","provincia_id": 18}, 
           {"comuna_id": 67,"comuna_nombre": "Catemu","provincia_id": 19}, 
           {"comuna_id": 68,"comuna_nombre": "Llaillay","provincia_id": 19}, 
           {"comuna_id": 69,"comuna_nombre": "Panquehue","provincia_id": 19}, 
           {"comuna_id": 70,"comuna_nombre": "Putaendo","provincia_id": 19}, 
           {"comuna_id": 71,"comuna_nombre": "San Felipe","provincia_id": 19}, 
           {"comuna_id": 72,"comuna_nombre": "Santa María","provincia_id": 19}, 
           {"comuna_id": 73,"comuna_nombre": "Casablanca","provincia_id": 20}, 
           {"comuna_id": 74,"comuna_nombre": "Concón","provincia_id": 20}, 
           {"comuna_id": 75,"comuna_nombre": "Juan Fernández","provincia_id": 20}, 
           {"comuna_id": 76,"comuna_nombre": "Puchuncaví","provincia_id": 20}, 
           {"comuna_id": 77,"comuna_nombre": "Quilpué","provincia_id": 20},
           {"comuna_id": 78,"comuna_nombre": "Quintero","provincia_id": 20}, 
           {"comuna_id": 79,"comuna_nombre": "Valparaíso","provincia_id": 20}, 
           {"comuna_id": 80,"comuna_nombre": "Villa Alemana","provincia_id": 20},
           {"comuna_id": 81,"comuna_nombre": "Viña del Mar","provincia_id": 20}, 
           {"comuna_id": 82,"comuna_nombre": "Colina","provincia_id": 21}, 
           {"comuna_id": 83,"comuna_nombre": "Lampa","provincia_id": 21}, 
           {"comuna_id": 84,"comuna_nombre": "Tiltil","provincia_id": 21},
           {"comuna_id": 85,"comuna_nombre": "Pirque","provincia_id": 22}, 
           {"comuna_id": 86,"comuna_nombre": "Puente Alto","provincia_id": 22}, 
           {"comuna_id": 87,"comuna_nombre": "San José de Maipo","provincia_id": 22}, 
           {"comuna_id": 88,"comuna_nombre": "Buin","provincia_id": 23}, 
           {"comuna_id": 89,"comuna_nombre": "Calera de Tango","provincia_id": 23}, 
           {"comuna_id": 90,"comuna_nombre": "Paine","provincia_id": 23}, 
           {"comuna_id": 91,"comuna_nombre": "San Bernardo","provincia_id": 23}, 
           {"comuna_id": 92,"comuna_nombre": "Alhué","provincia_id": 24}, 
           {"comuna_id": 93,"comuna_nombre": "Curacaví","provincia_id": 24},
           {"comuna_id": 94,"comuna_nombre": "María Pinto","provincia_id": 24}, 
           {"comuna_id": 95,"comuna_nombre": "Melipilla","provincia_id": 24}, 
           {"comuna_id": 96,"comuna_nombre": "San Pedro","provincia_id": 24},
           {"comuna_id": 97,"comuna_nombre": "Cerrillos","provincia_id": 25}, 
           {"comuna_id": 98,"comuna_nombre": "Cerro Navia","provincia_id": 25}, 
           {"comuna_id": 99,"comuna_nombre": "Conchalí","provincia_id": 25}, 
           {"comuna_id": 100,"comuna_nombre": "El Bosque","provincia_id": 25},
           {"comuna_id": 101,"comuna_nombre": "Estación Central","provincia_id": 25}, 
           {"comuna_id": 102,"comuna_nombre": "Huechuraba","provincia_id": 25}, 
           {"comuna_id": 103,"comuna_nombre": "Independencia","provincia_id": 25}, 
           {"comuna_id": 104,"comuna_nombre": "La Cisterna","provincia_id": 25}, 
           {"comuna_id": 105,"comuna_nombre": "La Granja","provincia_id": 25}, 
           {"comuna_id": 106,"comuna_nombre": "La Florida","provincia_id": 25}, 
           {"comuna_id": 107,"comuna_nombre": "La Pintana","provincia_id": 25}, 
           {"comuna_id": 108,"comuna_nombre": "La Reina","provincia_id": 25}, 
           {"comuna_id": 109,"comuna_nombre": "Las Condes","provincia_id": 25},
           {"comuna_id": 110,"comuna_nombre": "Lo Barnechea","provincia_id": 25}, 
           {"comuna_id": 111,"comuna_nombre": "Lo Espejo","provincia_id": 25}, 
           {"comuna_id": 112,"comuna_nombre": "Lo Prado","provincia_id": 25}, 
           {"comuna_id": 113,"comuna_nombre": "Macul","provincia_id": 25}, 
           {"comuna_id": 114,"comuna_nombre": "Maipú","provincia_id": 25}, 
           {"comuna_id": 115,"comuna_nombre": "Ñuñoa","provincia_id": 25}, 
           {"comuna_id": 116,"comuna_nombre": "Pedro Aguirre Cerda","provincia_id": 25}, 
           {"comuna_id": 117,"comuna_nombre": "Peñalolén","provincia_id": 25}, 
           {"comuna_id": 118,"comuna_nombre": "Providencia","provincia_id": 25}, 
           {"comuna_id": 119,"comuna_nombre": "Pudahuel","provincia_id": 25}, 
           {"comuna_id": 120,"comuna_nombre": "Quilicura","provincia_id": 25}, 
           {"comuna_id": 121,"comuna_nombre": "Quinta Normal","provincia_id": 25},
           {"comuna_id": 122,"comuna_nombre": "Recoleta","provincia_id": 25}, 
           {"comuna_id": 123,"comuna_nombre": "Renca","provincia_id": 25}, 
           {"comuna_id": 124,"comuna_nombre": "San Miguel","provincia_id": 25}, 
           {"comuna_id": 125,"comuna_nombre": "San Joaquín","provincia_id": 25}, 
           {"comuna_id": 126,"comuna_nombre": "San Ramón","provincia_id": 25}, 
           {"comuna_id": 127,"comuna_nombre": "Santiago","provincia_id": 25}, 
           {"comuna_id": 128,"comuna_nombre": "Vitacura","provincia_id": 25}, 
           {"comuna_id": 129,"comuna_nombre": "El Monte","provincia_id": 26}, 
           {"comuna_id": 130,"comuna_nombre": "Isla de Maipo","provincia_id": 26},
           {"comuna_id": 131,"comuna_nombre": "Padre Hurtado","provincia_id": 26}, 
           {"comuna_id": 132,"comuna_nombre": "Peñaflor","provincia_id": 26}, 
           {"comuna_id": 133,"comuna_nombre": "Talagante","provincia_id": 26}, 
           {"comuna_id": 134,"comuna_nombre": "Codegua","provincia_id": 27}, 
           {"comuna_id": 135,"comuna_nombre": "Coínco","provincia_id": 27},
           {"comuna_id": 136,"comuna_nombre": "Coltauco","provincia_id": 27}, 
           {"comuna_id": 137,"comuna_nombre": "Doñihue","provincia_id": 27}, 
           {"comuna_id": 138,"comuna_nombre": "Graneros","provincia_id": 27}, 
           {"comuna_id": 139,"comuna_nombre": "Las Cabras","provincia_id": 27},
           {"comuna_id": 140,"comuna_nombre": "Machalí","provincia_id": 27},
           {"comuna_id": 141,"comuna_nombre": "Malloa","provincia_id": 27},
           {"comuna_id": 142,"comuna_nombre": "Mostazal","provincia_id": 27}, 
           {"comuna_id": 143,"comuna_nombre": "Olivar","provincia_id": 27}, 
           {"comuna_id": 144,"comuna_nombre": "Peumo","provincia_id": 27}, 
           {"comuna_id": 145,"comuna_nombre": "Pichidegua","provincia_id": 27},
           {"comuna_id": 146,"comuna_nombre": "Quinta de Tilcoco","provincia_id": 27}, 
           {"comuna_id": 147,"comuna_nombre": "Rancagua","provincia_id": 27},
           {"comuna_id": 148,"comuna_nombre": "Rengo","provincia_id": 27}, 
           {"comuna_id": 149,"comuna_nombre": "Requínoa","provincia_id": 27}, 
           {"comuna_id": 150,"comuna_nombre": "San Vicente de Tagua Tagua","provincia_id": 27}, 
           {"comuna_id": 151,"comuna_nombre": "La Estrella","provincia_id": 28}, 
           {"comuna_id": 152,"comuna_nombre": "Litueche","provincia_id": 28}, 
           {"comuna_id": 153,"comuna_nombre": "Marchihue","provincia_id": 28},
           {"comuna_id": 154,"comuna_nombre": "Navidad","provincia_id": 28}, 
           {"comuna_id": 155,"comuna_nombre": "Peredones","provincia_id": 28}, 
           {"comuna_id": 156,"comuna_nombre": "Pichilemu","provincia_id": 28}, 
           {"comuna_id": 157,"comuna_nombre": "Chépica","provincia_id": 29}, 
           {"comuna_id": 158,"comuna_nombre": "Chimbarongo","provincia_id": 29}, 
           {"comuna_id": 159,"comuna_nombre": "Lolol","provincia_id": 29}, 
           {"comuna_id": 160,"comuna_nombre": "Nancagua","provincia_id": 29},
           {"comuna_id": 161,"comuna_nombre": "Palmilla","provincia_id": 29}, 
           {"comuna_id": 162,"comuna_nombre": "Peralillo","provincia_id": 29}, 
           {"comuna_id": 163,"comuna_nombre": "Placilla","provincia_id": 29}, 
           {"comuna_id": 164,"comuna_nombre": "Pumanque","provincia_id": 29}, 
           {"comuna_id": 165,"comuna_nombre": "San Fernando","provincia_id": 29}, 
           {"comuna_id": 166,"comuna_nombre": "Santa Cruz","provincia_id": 29}, 
           {"comuna_id": 167,"comuna_nombre": "Cauquenes","provincia_id": 30}, 
           {"comuna_id": 168,"comuna_nombre": "Chanco","provincia_id": 30}, 
           {"comuna_id": 169,"comuna_nombre": "Pelluhue","provincia_id": 30},
           {"comuna_id": 170,"comuna_nombre": "Curicó","provincia_id": 31}, 
           {"comuna_id": 171,"comuna_nombre": "Hualañé","provincia_id": 31}, 
           {"comuna_id": 172,"comuna_nombre": "Licantén","provincia_id": 31}, 
           {"comuna_id": 173,"comuna_nombre": "Molina","provincia_id": 31}, 
           {"comuna_id": 174,"comuna_nombre": "Rauco","provincia_id": 31}, 
           {"comuna_id": 175,"comuna_nombre": "Romeral","provincia_id": 31}, 
           {"comuna_id": 176,"comuna_nombre": "Sagrada Familia","provincia_id": 31}, 
           {"comuna_id": 177,"comuna_nombre": "Teno","provincia_id": 31}, 
           {"comuna_id": 178,"comuna_nombre": "Vichuquén","provincia_id": 31}, 
           {"comuna_id": 179,"comuna_nombre": "Colbún","provincia_id": 32}, 
           {"comuna_id": 180,"comuna_nombre": "Linares","provincia_id": 32}, 
           {"comuna_id": 181,"comuna_nombre": "Longaví","provincia_id": 32}, 
           {"comuna_id": 182,"comuna_nombre": "Parral","provincia_id": 32}, 
           {"comuna_id": 183,"comuna_nombre": "Retiro","provincia_id": 32}, 
           {"comuna_id": 184,"comuna_nombre": "San Javier","provincia_id": 32}, 
           {"comuna_id": 185,"comuna_nombre": "Villa Alegre","provincia_id": 32}, 
           {"comuna_id": 186,"comuna_nombre": "Yerbas Buenas","provincia_id": 32}, 
           {"comuna_id": 187,"comuna_nombre": "Constitución","provincia_id": 33}, 
           {"comuna_id": 188,"comuna_nombre": "Curepto","provincia_id": 33}, 
           {"comuna_id": 189,"comuna_nombre": "Empedrado","provincia_id": 33}, 
           {"comuna_id": 190,"comuna_nombre": "Maule","provincia_id": 33}, 
           {"comuna_id": 191,"comuna_nombre": "Pelarco","provincia_id": 33}, 
           {"comuna_id": 192,"comuna_nombre": "Pencahue","provincia_id": 33}, 
           {"comuna_id": 193,"comuna_nombre": "Río Claro","provincia_id": 33}, 
           {"comuna_id": 194,"comuna_nombre": "San Clemente","provincia_id": 33}, 
           {"comuna_id": 195,"comuna_nombre": "San Rafael","provincia_id": 33}, 
           {"comuna_id": 196,"comuna_nombre": "Talca","provincia_id": 33}, 
           {"comuna_id": 197,"comuna_nombre": "Arauco","provincia_id": 34}, 
           {"comuna_id": 198,"comuna_nombre": "Cañete","provincia_id": 34}, 
           {"comuna_id": 199,"comuna_nombre": "Contulmo","provincia_id": 34}, 
           {"comuna_id": 200,"comuna_nombre": "Curanilahue","provincia_id": 34}, 
           {"comuna_id": 201,"comuna_nombre": "Lebu","provincia_id": 34}, 
           {"comuna_id": 202,"comuna_nombre": "Los Álamos","provincia_id": 34},
           {"comuna_id": 203,"comuna_nombre": "Tirúa","provincia_id": 34},
           {"comuna_id": 204,"comuna_nombre": "Alto Biobío","provincia_id": 35}, 
           {"comuna_id": 205,"comuna_nombre": "Antuco","provincia_id": 35}, 
           {"comuna_id": 206,"comuna_nombre": "Cabrero","provincia_id": 35}, 
           {"comuna_id": 207,"comuna_nombre": "Laja","provincia_id": 35}, 
           {"comuna_id": 208,"comuna_nombre": "Los Ángeles","provincia_id": 35}, 
           {"comuna_id": 209,"comuna_nombre": "Mulchén","provincia_id": 35}, 
           {"comuna_id": 210,"comuna_nombre": "Nacimiento","provincia_id": 35}, 
           {"comuna_id": 211,"comuna_nombre": "Negrete","provincia_id": 35}, 
           {"comuna_id": 212,"comuna_nombre": "Quilaco","provincia_id": 35}, 
           {"comuna_id": 213,"comuna_nombre": "Quilleco","provincia_id": 35},
           {"comuna_id": 214,"comuna_nombre": "San Rosendo","provincia_id": 35}, 
           {"comuna_id": 215,"comuna_nombre": "Santa Bárbara","provincia_id": 35}, 
           {"comuna_id": 216,"comuna_nombre": "Tucapel","provincia_id": 35},
           {"comuna_id": 217,"comuna_nombre": "Yumbel","provincia_id": 35}, 
           {"comuna_id": 218,"comuna_nombre": "Chiguayante","provincia_id": 36},
           {"comuna_id": 219,"comuna_nombre": "Concepción","provincia_id": 36}, 
           {"comuna_id": 220,"comuna_nombre": "Coronel","provincia_id": 36}, 
           {"comuna_id": 221,"comuna_nombre": "Florida","provincia_id": 36}, 
           {"comuna_id": 222,"comuna_nombre": "Hualpén","provincia_id": 36}, 
           {"comuna_id": 223,"comuna_nombre": "Hualqui","provincia_id": 36}, 
           {"comuna_id": 224,"comuna_nombre": "Lota","provincia_id": 36}, 
           {"comuna_id": 225,"comuna_nombre": "Penco","provincia_id": 36}, 
           {"comuna_id": 226,"comuna_nombre": "San Pedro de La Paz","provincia_id": 36}, 
           {"comuna_id": 227,"comuna_nombre": "Santa Juana","provincia_id": 36}, 
           {"comuna_id": 228,"comuna_nombre": "Talcahuano","provincia_id": 36}, 
           {"comuna_id": 229,"comuna_nombre": "Tomé","provincia_id": 36}, 
           {"comuna_id": 230,"comuna_nombre": "Bulnes","provincia_id": 37}, 
           {"comuna_id": 231,"comuna_nombre": "Chillán","provincia_id": 37}, 
           {"comuna_id": 232,"comuna_nombre": "Chillán Viejo","provincia_id": 37}, 
           {"comuna_id": 233,"comuna_nombre": "Cobquecura","provincia_id": 37}, 
           {"comuna_id": 234,"comuna_nombre": "Coelemu","provincia_id": 37}, 
           {"comuna_id": 235,"comuna_nombre": "Coihueco","provincia_id": 37}, 
           {"comuna_id": 236,"comuna_nombre": "El Carmen","provincia_id": 37}, 
           {"comuna_id": 237,"comuna_nombre": "Ninhue","provincia_id": 37}, 
           {"comuna_id": 238,"comuna_nombre": "Ñiquen","provincia_id": 37}, 
           {"comuna_id": 239,"comuna_nombre": "Pemuco","provincia_id": 37}, 
           {"comuna_id": 240,"comuna_nombre": "Pinto","provincia_id": 37}, 
           {"comuna_id": 241,"comuna_nombre": "Portezuelo","provincia_id": 37}, 
           {"comuna_id": 242,"comuna_nombre": "Quillón","provincia_id": 37}, 
           {"comuna_id": 243,"comuna_nombre": "Quirihue","provincia_id": 37}, 
           {"comuna_id": 244,"comuna_nombre": "Ránquil","provincia_id": 37}, 
           {"comuna_id": 245,"comuna_nombre": "San Carlos","provincia_id": 37}, 
           {"comuna_id": 246,"comuna_nombre": "San Fabián","provincia_id": 37}, 
           {"comuna_id": 247,"comuna_nombre": "San Ignacio","provincia_id": 37}, 
           {"comuna_id": 248,"comuna_nombre": "San Nicolás","provincia_id": 37}, 
           {"comuna_id": 249,"comuna_nombre": "Treguaco","provincia_id": 37}, 
           {"comuna_id": 250,"comuna_nombre": "Yungay","provincia_id": 37}, 
           {"comuna_id": 251,"comuna_nombre": "Carahue","provincia_id": 38}, 
           {"comuna_id": 252,"comuna_nombre": "Cholchol","provincia_id": 38}, 
           {"comuna_id": 253,"comuna_nombre": "Cunco","provincia_id": 38}, 
           {"comuna_id": 254,"comuna_nombre": "Curarrehue","provincia_id": 38}, 
           {"comuna_id": 255,"comuna_nombre": "Freire","provincia_id": 38}, 
           {"comuna_id": 256,"comuna_nombre": "Galvarino","provincia_id": 38}, 
           {"comuna_id": 257,"comuna_nombre": "Gorbea","provincia_id": 38}, 
           {"comuna_id": 258,"comuna_nombre": "Lautaro","provincia_id": 38}, 
           {"comuna_id": 259,"comuna_nombre": "Loncoche","provincia_id": 38}, 
           {"comuna_id": 260,"comuna_nombre": "Melipeuco","provincia_id": 38}, 
           {"comuna_id": 261,"comuna_nombre": "Nueva Imperial","provincia_id": 38}, 
           {"comuna_id": 262,"comuna_nombre": "Padre Las Casas","provincia_id": 38}, 
           {"comuna_id": 263,"comuna_nombre": "Perquenco","provincia_id": 38}, 
           {"comuna_id": 264,"comuna_nombre": "Pitrufquén","provincia_id": 38}, 
           {"comuna_id": 265,"comuna_nombre": "Pucón","provincia_id": 38}, 
           {"comuna_id": 266,"comuna_nombre": "Saavedra","provincia_id": 38}, 
           {"comuna_id": 267,"comuna_nombre": "Temuco","provincia_id": 38},
           {"comuna_id": 268,"comuna_nombre": "Teodoro Schmidt","provincia_id": 38}, 
           {"comuna_id": 269,"comuna_nombre": "Toltén","provincia_id": 38}, 
           {"comuna_id": 270,"comuna_nombre": "Vilcún","provincia_id": 38},
           {"comuna_id": 271,"comuna_nombre": "Villarrica","provincia_id": 38}, 
           {"comuna_id": 272,"comuna_nombre": "Angol","provincia_id": 39}, 
           {"comuna_id": 273,"comuna_nombre": "Collipulli","provincia_id": 39}, 
           {"comuna_id": 274,"comuna_nombre": "Curacautín","provincia_id": 39}, 
           {"comuna_id": 275,"comuna_nombre": "Ercilla","provincia_id": 39},
           {"comuna_id": 276,"comuna_nombre": "Lonquimay","provincia_id": 39},
           {"comuna_id": 277,"comuna_nombre": "Los Sauces","provincia_id": 39}, 
           {"comuna_id": 278,"comuna_nombre": "Lumaco","provincia_id": 39}, 
           {"comuna_id": 279,"comuna_nombre": "Purén","provincia_id": 39}, 
           {"comuna_id": 280,"comuna_nombre": "Renaico","provincia_id": 39}, 
           {"comuna_id": 281,"comuna_nombre": "Traiguén","provincia_id": 39},
           {"comuna_id": 282,"comuna_nombre": "Victoria","provincia_id": 39}, 
           {"comuna_id": 283,"comuna_nombre": "Corral","provincia_id": 40}, 
           {"comuna_id": 284,"comuna_nombre": "Lanco","provincia_id": 40}, 
           {"comuna_id": 285,"comuna_nombre": "Los Lagos","provincia_id": 40}, 
           {"comuna_id": 286,"comuna_nombre": "Máfil","provincia_id": 40}, 
           {"comuna_id": 287,"comuna_nombre": "Mariquina","provincia_id": 40}, 
           {"comuna_id": 288,"comuna_nombre": "Paillaco","provincia_id": 40},
           {"comuna_id": 289,"comuna_nombre": "Panguipulli","provincia_id": 40}, 
           {"comuna_id": 290,"comuna_nombre": "Valdivia","provincia_id": 40}, 
           {"comuna_id": 291,"comuna_nombre": "Futrono","provincia_id": 41}, 
           {"comuna_id": 292,"comuna_nombre": "La Unión","provincia_id": 41}, 
           {"comuna_id": 293,"comuna_nombre": "Lago Ranco","provincia_id": 41},
           {"comuna_id": 294,"comuna_nombre": "Río Bueno","provincia_id": 41}, 
           {"comuna_id": 295,"comuna_nombre": "Ancud","provincia_id": 42}, 
           {"comuna_id": 296,"comuna_nombre": "Castro","provincia_id": 42}, 
           {"comuna_id": 297,"comuna_nombre": "Chonchi","provincia_id": 42}, 
           {"comuna_id": 298,"comuna_nombre": "Curaco de Vélez","provincia_id": 42}, 
           {"comuna_id": 299,"comuna_nombre": "Dalcahue","provincia_id": 42}, 
           {"comuna_id": 300,"comuna_nombre": "Puqueldón","provincia_id": 42}, 
           {"comuna_id": 301,"comuna_nombre": "Queilén","provincia_id": 42}, 
           {"comuna_id": 302,"comuna_nombre": "Quemchi","provincia_id": 42}, 
           {"comuna_id": 303,"comuna_nombre": "Quellón","provincia_id": 42}, 
           {"comuna_id": 304,"comuna_nombre": "Quinchao","provincia_id": 42}, 
           {"comuna_id": 305,"comuna_nombre": "Calbuco","provincia_id": 43}, 
           {"comuna_id": 306,"comuna_nombre": "Cochamó","provincia_id": 43}, 
           {"comuna_id": 307,"comuna_nombre": "Fresia","provincia_id": 43}, 
           {"comuna_id": 308,"comuna_nombre": "Frutillar","provincia_id": 43}, 
           {"comuna_id": 309,"comuna_nombre": "Llanquihue","provincia_id": 43}, 
           {"comuna_id": 310,"comuna_nombre": "Los Muermos","provincia_id": 43}, 
           {"comuna_id": 311,"comuna_nombre": "Maullín","provincia_id": 43}, 
           {"comuna_id": 312,"comuna_nombre": "Puerto Montt","provincia_id": 43}, 
           {"comuna_id": 313,"comuna_nombre": "Puerto Varas","provincia_id": 43}, 
           {"comuna_id": 314,"comuna_nombre": "Osorno","provincia_id": 44}, 
           {"comuna_id": 315,"comuna_nombre": "Puero Octay","provincia_id": 44}, 
           {"comuna_id": 316,"comuna_nombre": "Purranque","provincia_id": 44}, 
           {"comuna_id": 317,"comuna_nombre": "Puyehue","provincia_id": 44}, 
           {"comuna_id": 318,"comuna_nombre": "Río Negro","provincia_id": 44}, 
           {"comuna_id": 319,"comuna_nombre": "San Juan de la Costa","provincia_id": 44}, 
           {"comuna_id": 320,"comuna_nombre": "San Pablo","provincia_id": 44}, 
           {"comuna_id": 321,"comuna_nombre": "Chaitén","provincia_id": 45}, 
           {"comuna_id": 322,"comuna_nombre": "Futaleufú","provincia_id": 45}, 
           {"comuna_id": 323,"comuna_nombre": "Hualaihué","provincia_id": 45}, 
           {"comuna_id": 324,"comuna_nombre": "Palena","provincia_id": 45}, 
           {"comuna_id": 325,"comuna_nombre": "Aisén","provincia_id": 46}, 
           {"comuna_id": 326,"comuna_nombre": "Cisnes","provincia_id": 46}, 
           {"comuna_id": 327,"comuna_nombre": "Guaitecas","provincia_id": 46}, 
           {"comuna_id": 328,"comuna_nombre": "Cochrane","provincia_id": 47}, 
           {"comuna_id": 329,"comuna_nombre": "O\'higgins","provincia_id": 47}, 
           {"comuna_id": 330,"comuna_nombre": "Tortel","provincia_id": 47}, 
           {"comuna_id": 331,"comuna_nombre": "Coihaique","provincia_id": 48}, 
           {"comuna_id": 332,"comuna_nombre": "Lago Verde","provincia_id": 48},
           {"comuna_id": 333,"comuna_nombre": "Chile Chico","provincia_id": 49}, 
           {"comuna_id": 334,"comuna_nombre": "Río Ibáñez","provincia_id": 49}, 
           {"comuna_id": 335,"comuna_nombre": "Antártica","provincia_id": 50}, 
           {"comuna_id": 336,"comuna_nombre": "Cabo de Hornos","provincia_id": 50}, 
           {"comuna_id": 337,"comuna_nombre": "Laguna Blanca","provincia_id": 51}, 
           {"comuna_id": 338,"comuna_nombre": "Punta Arenas","provincia_id": 51},
           {"comuna_id": 339,"comuna_nombre": "Río Verde","provincia_id": 51}, 
           {"comuna_id": 340,"comuna_nombre": "San Gregorio","provincia_id": 51}, 
           {"comuna_id": 341,"comuna_nombre": "Porvenir","provincia_id": 52}, 
           {"comuna_id": 342,"comuna_nombre": "Primavera","provincia_id": 52},
           {"comuna_id": 343,"comuna_nombre": "Timaukel","provincia_id": 52},
           {"comuna_id": 344,"comuna_nombre": "Natales","provincia_id": 53}, 
           {"comuna_id": 345,"comuna_nombre": "Torres del Paine","provincia_id": 53}
    ]
  }



  }
]);