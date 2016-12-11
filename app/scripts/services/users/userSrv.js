(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('UserService', UserService);

    UserService.$inject = ['_http', '_api'];
    function UserService(_http, _api) {
        var API_RESOURCE = 'backend/users';

        this.getAllUsers = getAllUsers;
        
        ////////////////

        function getAllUsers(params, callback) { 
            var httpReq = {
                method: 'GET',
                url: _api.url(API_RESOURCE, null, params)
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Retrieve users data successfully!', 'Retrieve users failed!']);
        }
        }
})();