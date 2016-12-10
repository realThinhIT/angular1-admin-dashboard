(function() {
'use strict';

    angular
        .module('thongTinTuyenSinhBackend')
        .service('_api', _api);

    _api.$inject = ['_c'];
    function _api(_c) {
        this.url = url;
        
        ////////////////

        function url(resource, object, queryStrings) {
            queryStrings = queryStrings || {};

            var q = '';
            if (queryStrings instanceof Object) {
                Object.keys(queryStrings).forEach(function (key) {
                    q += key + '=' + queryStrings[key];
                });
            }

            return _c.api.BASE_URL + resource + '/' + ((object === undefined) ? '' : object) + '/' + ((q !== '') ? '?' + q : '');
        }
        }
})();