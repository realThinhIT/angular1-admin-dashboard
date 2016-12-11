(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '_api', '_http', '_cookie', '$rootScope'];
    function AuthenticationService($http, _api, _http, _cookie, $rootScope) {
        var API_RESOURCE = 'authentication';

        this.authenticateUser = authenticateUser;
        this.getCurrentUserInfo = getCurrentUserInfo;
        this.getCurrentLoginToken = getCurrentLoginToken;
        
        ////////////////

        function authenticateUser(user, callback) { 
            if (!user.username || !user.password) {
                return {
                    success: 0,
                    message: 'Username or password is not defined!'
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

                _http.exec(httpReq, function (err, res) {
                    callback(err, res);
                }, ['Login successfully! Welcome back, ' + user.username + '!', 'Please check your login info.']);
            }
        }

        function getCurrentUserInfo() {
            var current = _cookie.getLoginSession();

            if (current === undefined) {
                return undefined;
            } else {
                if (current.userInfo != undefined) {
                    return current.userInfo;
                } else {
                    return undefined;
                }
            }
        }

        function getCurrentLoginToken() {
            var current = _cookie.getLoginSession();

            if (current === undefined) {
                return undefined;
            } else {
                if (current.token != undefined) {
                    return current.token;
                } else {
                    return undefined;
                }
            }
        }
        }
})();