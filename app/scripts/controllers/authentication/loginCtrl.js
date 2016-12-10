(function() {
'use strict';

    angular
        .module('thongTinTuyenSinhBackend')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '_toast', 'AuthenticationService', '_cookie'];
    function LoginController($rootScope, _toast, AuthenticationService, _cookie) {
        var vm = this;
        
        var login = function () {
            vm.isLoggingIn = true;

            var username = vm.loginInfo.username;
            var password = vm.loginInfo.password;

            AuthenticationService.authenticateUser({
                username: username,
                password: password
            }, function (res) {
                _toast.create(res.message, 'Login Operation', (res.success === 1) ? 'success' : 'fail');

                if (res.success === 0) {
                    vm.resetForm();
                } else {
                    vm.isLoggedIn = true;

                    _cookie.removeLoginSession();
                    _cookie.saveLoginSession({
                        userInfo: res.data.userInfo,
                        token: res.data.accessToken
                    });
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

            _toast.info('Please log in with your provided username & password!');
        }
    }
})();