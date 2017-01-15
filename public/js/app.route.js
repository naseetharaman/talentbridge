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
  .config(['$urlRouterProvider','$locationProvider', '$stateProvider',
    function ($urlRouterProvider,$locationProvider, $stateProvider) {

      $locationProvider.hashPrefix('');
      // if url not defined redirect to login
      $urlRouterProvider.when( '', "/" );
      // if nonexistant url defined redirect to sign-in
      $urlRouterProvider.otherwise( "/" );

      $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: 'modules/login/views/home.html',
          controller: 'homeCtrl'
        })
      .state('login', {
          url: '/login',
          templateUrl: 'modules/login/views/login.html',
          controller: 'loginCtrl1'
        })
      .state('register', {
          url: '/register',
          templateUrl: 'modules/login/views/register.html',
          controller: 'loginCtrl1'
        })
      .state('profile', {
          url: '/profile',
          templateUrl: 'modules/profile/views/profile.html',
          controller: 'profileCtrl'
        })
      .state('partnerinfo', {
          url: '/partnerinfo',
          templateUrl: 'modules/profile/views/partnerForm.html',
          controller: 'profileCtrl'
        })
      .state('contributorinfo', {
          url: '/contributorinfo',
          templateUrl: 'modules/profile/views/contributorForm.html',
          controller: 'profileCtrl'
        })
      .state('editprofile', {
          url: '/edit/profile',
          templateUrl: 'modules/profile/views/editProfile.html'
        })
    }
  ]);
})();