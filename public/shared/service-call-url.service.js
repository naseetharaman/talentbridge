 /**
 * @ngdoc overview
 * @name slack-api
 * @description
 * # slack-api
 *
 * Main module of the application.
 */
angular
  .module('talent-bridge')
  .service('ApiConfig', [
      function () {
          var ENV = 'http://localhost:8000/talentbridge';
          var serviceCallUrl = ''; 
          return {
            authenticationURL:{
              register : ENV + '/register',
              login : ENV + '/login'
            },
            partner:{

            },
            contributor:{

            },
            admin:{

            }
          }
      }
  ]);