 /**
 * @ngdoc overview
 * @name slack-api
 * @description
 * # slack-api
 *
 * Main module of the application.
 */
angular
  .module('slack-api')
  .service('ApiConfig', [
      function () {
          /*var ENV = 'http://lvs-mytravel-dev-001-8825.ccg21.dev.paypalcorp.com:5000'*/
          var ENV = 'http://localhost:5000';
          var serviceCallUrl = ''; 
          return {
            user:{
                  channels : ENV + '/channels',
                  channelInfo : ENV + '/channelInfo',
                  archiveChannel : ENV + '/archiveChannel',
                  unarchiveChannel : ENV + '/unarchiveChannel',
                  notifyChannel : ENV + '/postSlackBotMessage'
            },
            admin:{
            }
          }
          
      }
  ]);