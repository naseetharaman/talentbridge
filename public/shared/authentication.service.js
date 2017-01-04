angular.module('talent-bridge').factory('authentication',['$http','$window','ApiConfig','$cookies',
  function($http,$window, ApiConfig,$cookies){
    var config = {};

    var saveToken = function(token){
      $window.sessionStorage['talenttoken'] = $cookies.get('talenttoken');
      console.log(token);
      console.log($window.sessionStorage['talenttoken']);
      return $window.sessionStorage['talenttoken'];
    };

    var currentUser = function(){
      var token = saveToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      console.log(payload);
      return {
        email : payload.email,
        name : payload.username,
        role : payload.role
      };
    };

    var signin = function(data){
      return $http.post(ApiConfig.authenticationURL.login,data,config)
      .then(function(data){
         return currentUser();
      }).catch(function(err){
         console.log(err)
      })
      //return $http.post(ApiConfig.authenticationURL.login,data,config);

    };

   var registration = function(data){
      return $http.post(ApiConfig.authenticationURL.register,data,config);
    };



    /*var logout = function(){
      var promise = $http.get(ApiConfig.user.logout);
      promise.then(function(){
        $window.sessionStorage.removeItem('token');
      }).catch(function(err){
        console.error(err);
      })
    };*/


    return {
      registration : registration,
      signin : signin
    };
}]);