(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('_exampleService', _exampleService);

    _exampleService.$inject = ['_http', '_api'];
    function _exampleService(_http, _api) {
        var API_RESOURCE = 'backend/_examples';
        
        ////////////////

        this.getAll = function (params, callback) { 
            var httpReq = {
                method: 'GET',
                url: _api.url(API_RESOURCE, null, params)
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Retrieve _examples data successfully!', 'Retrieve _examples failed!']);
        }

        this.getOne = function (id, callback) {
            var httpReq = {
                method: 'GET',
                url: _api.url(API_RESOURCE, id)
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Retrieve _example data successfully!', 'Retrieve _example failed!']);
        }

        this.update = function (id, data, callback) {
            var httpReq = {
                method: 'PUT',
                url: _api.url(API_RESOURCE, id),
                data: data
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['Update _example data successfully!', 'Update _example failed!']);
        }

        this.create = function (data, callback) {
            var httpReq = {
                method: 'POST',
                url: _api.url(API_RESOURCE, null),
                data: data
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['_example created successfully!', 'There was an error while creating new _example!']);
        }

        this.delete = function (id, callback) {
            var httpReq = {
                method: 'DELETE',
                url: _api.url(API_RESOURCE, id),
            };
            _http.exec(httpReq, function (err, res) {
                callback(err, res);
            }, ['_example deleted successfully!', 'Delete _example failed!']);
        }
        }
})();