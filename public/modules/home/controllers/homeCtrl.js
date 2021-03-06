'use strict';

angular.module('talent-bridge')
    .controller('mainCtrl', function($state, $http, authentication, $scope) {
    	$scope.header = {};

        var username = authentication.currentUser();
        if (username) {
            $scope.header.name = value.name;
            $scope.header.role = value.role;

            if ($scope.header.name) {
                $scope.showname = true;
                $scope.showsigin = false;
            } else {
                $scope.showname = false;
                $scope.showsigin = true;
            }
        } else {
          $scope.showname = false;
            $scope.showsigin = true;
            $state.go('login');    
        }

        $scope.logoutApp = function() {
            var logoutfunc = authentication.logout();
            if (!logoutfunc) {
                $state.go('home');
            }
        };


    });