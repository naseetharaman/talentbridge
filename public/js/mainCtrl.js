'use strict';

angular.module('talent-bridge')
 .controller('mainCtrlabc', function($http, $state, $scope, authentication, ModalService, $window) {
    $scope.header = {};
        var user = authentication.currentUser();
        if (user) {
            
            $scope.header.name = user.name;
            $scope.header.role = user.role;
            console.log($scope.header);

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
            console.log(logoutfunc);
            $state.go('home');
        };

 });
