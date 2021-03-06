(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('UserService', UserService);

    UserService.$inject = ['_http', '_api'];
    function UserService(_http, _api) {
        var API_RESOURCE = 'backend/users';
        
        ////////////////

        this.getAll = function (params, callback) { 
            var httpReq = {
                method: 'GET',
                url: _api.url(API_RESOURCE, null, params)
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Retrieve users data successfully!', 'Retrieve users failed!']);
        }

        this.getOne = function (id, callback) {
            var httpReq = {
                method: 'GET',
                url: _api.url(API_RESOURCE, id)
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Retrieve user data successfully!', 'Retrieve user failed!']);
        }

        this.update = function (id, data, callback) {
            var httpReq = {
                method: 'PUT',
                url: _api.url(API_RESOURCE, id),
                data: data
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Update user data successfully!', 'Update user failed!']);
        }

        this.create = function (data, callback) {
            var httpReq = {
                method: 'POST',
                url: _api.url(API_RESOURCE, null),
                data: data
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['User created successfully!', 'There was an error while creating new user!']);
        }

        this.delete = function (id, callback) {
            var httpReq = {
                method: 'DELETE',
                url: _api.url(API_RESOURCE, id),
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['User deleted successfully!', 'Delete user failed!']);
        }
        }
})();