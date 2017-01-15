'use strict';

angular.module('talent-bridge')
 .controller('profileCtrl', ['$http', '$state', '$scope', 'authentication', function($http, $state, $scope, authentication) {
    
    var vm = this;
    vm.searchEnabled = true;
    vm.enableSearch = function() {
      vm.searchEnabled = true;
    };

    $http.get('./json/countries.json').then(function(response, status, headers, config) {
      $scope.country = response.data;
      console.log($scope.country);
    }).catch(function(error) {
      console.log(error);
    });

    $http.get('./json/states.json').then(function(response, status, headers, config) {
      $scope.states = response.data;
      console.log($scope.states);
    }).catch(function(error) {
      console.log(error);
    });

    $http.get('./json/techskills.json').then(function(response, status, headers, config) {
      $scope.techskills = response.data;
      console.log($scope.techskills);
    }).catch(function(error) {
      console.log(error);
    });

    $http.get('./json/coreskills.json').then(function(response, status, headers, config) {
      $scope.coreskills = response.data;
      console.log($scope.coreskills);
    }).catch(function(error) {
      console.log(error);
    });


 }]);





