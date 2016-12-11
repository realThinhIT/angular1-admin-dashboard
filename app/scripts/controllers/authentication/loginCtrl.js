(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '_toast', 'AuthenticationService', '_cookie', '$location'];
    function LoginController($rootScope, _toast, AuthenticationService, _cookie, $location) {
        var vm = this;
        
        var login = function () {
            vm.isLoggingIn = true;

            var username = vm.loginInfo.username;
            var password = vm.loginInfo.password;

            AuthenticationService.authenticateUser({
                username: username,
                password: password
            }, function (err, res) {
                _toast.create(res.message, 'Login Operation', (err === false) ? 'success' : 'fail');

                if (err) {
                    vm.resetForm();
                } else {
                    vm.isLoggedIn = true;

                    _cookie.saveLoginSession({
                        userInfo: res.data.data.userInfo,
                        token: res.data.data.accessToken
                    });

                    // redirect to main page 
                    $location.path('/');
                }
            });
        }

        activate();

        ////////////////

        function activate() { 
            $rootScope.PageTitle.set('Login');

            vm.loginInfo = {};

            vm.resetForm = function() {
                vm.isLoggedIn = false;
                vm.isLoggingIn = false;
            }
            vm.resetForm();
            
            vm.login = login;
        }
    }
})();