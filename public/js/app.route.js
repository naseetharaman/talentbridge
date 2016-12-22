(function () {
  'use strict';
  /**
 * @ngdoc overview
 * @name talent-bridge
 * @description
 * # talent-bridge
 *
 * Main module of the application.
 */
  angular
  .module('talent-bridge')
  .config(['$urlRouterProvider','$locationProvider',
    function ($urlRouterProvider,$locationProvider) {

      $locationProvider.hashPrefix('');
      // if url not defined redirect to login
      $urlRouterProvider.when( '', "/" );
      // if nonexistant url defined redirect to sign-in
      $urlRouterProvider.otherwise( "/" );

    }
  ]);
})();