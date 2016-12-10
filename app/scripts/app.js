'use strict';

/**
 * @ngdoc overview
 * @name thongTinTuyenSinhBackend
 * @description
 * # thongTinTuyenSinhBackend
 *
 * Main module of the application.
 */
angular
    .module('thongTinTuyenSinhBackend', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'angular-toasty'
    ])

    // configurations
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'views/views/common/login.html',
                controller: 'LoginController',
                controllerAs: 'LoginCtrl'
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
    .run(['$rootScope', '_pageTitle', '_cookie', '_c', '$http', 
    function($rootScope, _pageTitle, _cookie, _c, $http) {
        $rootScope.PageTitle = _pageTitle;

        // http authorization
        $rootScope.updateDefaultHttpHeader = function() {
            var loginSession = _cookie.getLoginSession();

            $http.defaults.headers.common['X-Api-Key'] = _c.api.API_KEY;

            if (loginSession !== undefined) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + loginSession.accessToken.token;
            } else {
                $http.defaults.headers.common.Authorization = 'Basic unauthorized:forbidden';
            }
        }
        $rootScope.updateDefaultHttpHeader();
    }]);