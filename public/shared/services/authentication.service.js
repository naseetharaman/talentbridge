angular.module('talent-bridge').factory('authentication',['$http','$window','ApiConfig','$cookies',
  function($http,$window, ApiConfig, $cookies){

    var config = {};
    
    var getToken = function(){
      $window.sessionStorage['talenttoken'] = $cookies.get('talenttoken');
      return $window.sessionStorage['talenttoken']
    };

     var currentUser = function(){
        var token = getToken();
        if( token != "undefined"){
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return {
            email : payload.email,
            name : payload.username,
            role : payload.role
          };

         }else{
           return false;
         }
     };

     /* login service*/
    var signin = function(data){
           return $http.post(ApiConfig.authenticationURL.login,data,config);
         };

    /* register service */
    var registration =function(data){
      return $http.post(ApiConfig.authenticationURL.register,data,config);
    };

    var logout = function(){
      $window.localStorage.removeItem('token');
    };


    return {
      currentUser : currentUser,
      getToken :getToken,
      signin : signin,
      registration : registration,
      logout  : logout
    };
}]);