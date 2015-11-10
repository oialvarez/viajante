'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Articles, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return MeanUser.isAdmin || article.user._id === MeanUser.user._id;
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
        $scope.article.cabin = [];

        for (var i =0; i<cabins.length ; i++){
          $scope.article.cabin.push(cabins[i])         
        }

        var services = $scope.services;
        $scope.article.service = [];

        for (var i =0; i<services.length ; i++){
          $scope.article.service.push(services[i])         
        }

        var article = new Articles($scope.article);
        
        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        $scope.article = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove(function(response) {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
              $scope.articles.splice(i, 1);
            }
          }
          $location.path('articles');
        });
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var cabins = $scope.cabins;
        $scope.article.cabin = [];

        for (var i =0; i<cabins.length ; i++){
          $scope.article.cabin.push(cabins[i])         
        }

        var services = $scope.services;
        $scope.article.service = [];

        for (var i =0; i<services.length ; i++){
          $scope.article.service.push(services[i])         
        }
        
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

    $scope.findOne = function() { 
     
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        //$scope.cabins = formatPrices(article.cabin);
        $scope.cabins = article.cabin;
        $scope.services = article.service;
        $scope.article = article;
       
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

      $scope.articles = [
      
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




  }
]);