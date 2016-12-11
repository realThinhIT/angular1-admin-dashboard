(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('_api', _api);

    _api.$inject = ['_c'];
    function _api(_c) {
        this.url = url;
        
        ////////////////

        function url(resource, object, queryStrings) {
            queryStrings = queryStrings || {};

            var q = '';
            if (queryStrings instanceof Object) {
                Object.keys(queryStrings).forEach(function (key, index) {
                    q += key + '=' + queryStrings[key];

                    if (index !== Object.keys(queryStrings).length - 1) {
                        q += '&';
                    }
                });
            }

            return _c.api.BASE_URL + resource + '/' + ((object == undefined) ? '' : object + '/') + ((q != '') ? '?' + q : '');
        }
        }
})();