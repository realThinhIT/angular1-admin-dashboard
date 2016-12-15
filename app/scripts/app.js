'use strict';

/**
 * @ngdoc overview
 * @name ndtAngular1AdminDashboard
 * @description
 * # ndtAngular1AdminDashboard
 *
 * Main module of the application.
 */
angular
    .module('ndtAngular1AdminDashboard', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'angular-toasty',
        'eehNavigation',
        'ui.bootstrap',
        'ui.router',
        'angular-loading-bar',
        'bw.paging'
    ])

    // configurations
    .config(function($routeProvider) {
        var mainView = 'views/views/controllers/mainView.html';
        
        $routeProvider
            .when('/', {
                templateUrl: 'views/views/home/index.html',
                controller: 'HomeController',
                controllerAs: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'views/views/common/login.html',
                controller: 'LoginController',
                controllerAs: 'LoginCtrl'
            })
            .when('/users', {
                templateUrl: mainView,
                controller: 'ReadUsersController',
                controllerAs: 'controller'
            })
            .when('/users/create', {
                templateUrl: mainView,
                controller: 'ModifyUserController',
                controllerAs: 'controller'
            })
            .when('/users/:id', {
                templateUrl: mainView,
                controller: 'ModifyUserController',
                controllerAs: 'controller'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .config(['toastyConfigProvider', function(toastyConfigProvider) {
        // notification service
        toastyConfigProvider.setConfig({
            sound: false,
            clickToClose: true,
            theme: 'bootstrap',
            html: true,
            showClose: false
        });
    }])

    // at first run
    .run(['$rootScope', '_pageTitle', '_cookie', '_c', '$http', 'AuthenticationService', '$location', '_toast', '$interval', 'eehNavigation',
    function($rootScope, _pageTitle, _cookie, _c, $http, AuthenticationService, $location, _toast, $interval, eehNavigation) {
        $rootScope.PageTitle = _pageTitle;
        $rootScope.loggedUser = AuthenticationService.getCurrentUserInfo();
        $rootScope.loginToken = AuthenticationService.getCurrentLoginToken();

        // http authorization
        $rootScope.updateDefaultHttpHeader = function() {
            $rootScope.loginToken = AuthenticationService.getCurrentLoginToken();

            $http.defaults.headers.common['X-Api-Key'] = _c.api.API_KEY;

            if ($rootScope.loginToken !== undefined) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.loginToken.loginToken;
            } else {
                $http.defaults.headers.common.Authorization = 'Basic unauthorized:forbidden';
            }
        }
        $rootScope.updateDefaultHttpHeader();

        $rootScope.updateLoggedUserMenu = function() {
            $(function() {
                $('.menu-item-text:contains("_loggedInStatus")').removeClass("_loggedInStatus").addClass("_loggedInStatus");
            });

            // update the login status on menubar
            if ($rootScope.loggedUser != undefined) {
                $(function() {
                    $('._loggedInStatus').text($rootScope.loggedUser.username);
                });
            } else {
                $(function() {
                    $('._loggedInStatus').text('Welcome back, please log in!');
                });
            }
        }
        $rootScope.updateLoggedUserMenu();

        // check if the user is logged
        $rootScope.checkLoginPage = function(event, next, current) {
            // reload the credentials
            $rootScope.loggedUser = AuthenticationService.getCurrentUserInfo();
            $rootScope.updateDefaultHttpHeader();

            // update menu bar
            $rootScope.updateLoggedUserMenu();

            // redirect if neccessary
            if ($rootScope.loggedUser == undefined && ($location.path() !== '/login')) {
                $location.path('/login');
                _toast.fail('You have to log in first!');

                _cookie.removeLoginSession();
            }

            if ($rootScope.loggedUser != undefined && ($location.path() === '/login')) {
                $location.path('/');
                _toast.success('You have authenticated, redirecting to the main page!');
            }
        }

        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            $rootScope.checkLoginPage(event, next, current);
        });

        // the task will be performed every x seconds
        $interval(function() {

        }, 1000)
    }]);