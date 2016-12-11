(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('_http', _http);

    _http.$inject = ['$http', '_c'];
    function _http($http, _c) {
        this.exec = exec;
        
        ////////////////

        function exec(params, callback, msgs, msgsByCodes) { 
            var msgErrs = _c.errorMessagesByCodes;
            msgsByCodes = msgsByCodes || {};

            Object.keys(msgsByCodes).forEach(function (value) {
                msgErrs[value] = msgsByCodes[value];
            });

            if (!msgs) {
                msgs = [];
            }

            if (!msgs[0]) {
                msgs[0] = 'Task performed successfully!';
            }

            if (!msgs[1]) {
                msgs[1] = 'Task performed unsuccessfully!';
            }

            $http(params).then(function (res) {
                callback(false, {
                    message: msgs[0],
                    data: (res.data) ? res.data : {}
                });
            }, function (res) {
                callback(true, {
                    message: msgs[1],
                    data: (msgErrs[(res.data != undefined && res.data.detailCode != undefined) ? res.data.detailCode : undefined]) ? msgErrs[res.data.detailCode] : ( (res.data) ? res.data : {} )
                });
            })
        }
        }
})();