'use strict';

angular.module('talent-bridge')
 .controller('loginCtrl1', function($http, $state, $scope, authentication, ModalService) {
  

	$scope.availableColors = ['PARTNER','CONTRIBUTOR'];
	$scope.singleDemo = {};
	$scope.singleDemo.color = '';
	
	$scope.registerUser = {};
    $scope.loginData = {};

 	$scope.register = function() {
 		console.log($scope.registerUser);
        var userName = $scope.registerUser.username;
        var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?,`]*$/;
        if( userName.match(format)){
            alert("please provide the proper username");
        }else{
          authentication.registration($scope.registerUser)
            .then(function(data) {
                $scope.response = data;
                console.log($scope.response)
            }, function(error) {
                $scope.errormessage = error.data.error;
            });
        }
    };


    $scope.login = function() {
        console.log($scope.loginData);
          var loginURL = authentication.signin($scope.loginData);
            loginURL.then(function(data) {
                $scope.response = data;
                ModalService.open("success", "", $scope.response.data.message);
                $state.go("home");
                console.log($scope.response)
            }, function(error) {
                console.log("ERROR");
            });
        };

 });

