(function() {
'use strict';

    angular
        .module('thongTinTuyenSinhBackend')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '_api'];
    function AuthenticationService($http, _api) {
        var API_RESOURCE = 'authentication';

        this.authenticateUser = authenticateUser;
        
        ////////////////

        function authenticateUser(user, callback) { 
            if (!user.username || !user.password) {
                return {
                    success: 0,
                    error: 'Username or password is not defined!'
                }
            } else {
                var httpReq = {
                    method: 'POST',
                    url: _api.url(API_RESOURCE, 'login'),
                    headers: {
                        Authorization: 'Basic ' + btoa(user.username + ':' + user.password)
                    },
                    data: {}
                }

                $http(httpReq).then(function (response) {
                    callback({
                        success: 1,
                        message: 'Login successfully! Welcome back!',
                        data: response.data.data
                    });
                }, function (response) {
                    callback({
                        success: 0,
                        message: 'Login unsuccessfully! Please check your username/ password.',
                    });
                });
            }
        }
        }
})();