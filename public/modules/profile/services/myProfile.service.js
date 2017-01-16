angular.module('travelApp').factory('userProfileService',['$http','authentication', 'ApiConfig',
  function($http,authentication, ApiConfig){
   
    var config = {};

   //get list of rides associated with user
  
   //create ride for user and get the ticket id
   var myprofile = function(data){
     return $http.post(ApiConfig.user.myProfile,data,config);
   };


   //Get the ride details for the given ticket id
   var getmyprofile = function(){
    return $http.get(ApiConfig.user.myProfile,config); 
   }


   return {
    getmyprofile : getmyprofile,
    myprofile    : myprofile
   };

}])

