(function() {
'use strict';

    angular
        .module('thongTinTuyenSinhBackend')
        .service('_c', _c);

    _c.$inject = [];
    function _c() {
        this.exposedFn = exposedFn;
        this.api = {};

        ////////////////
        this.api = {
            BASE_URL:   'http://localhost:91/v1/',
            API_KEY:    'TvGpPbCwebLVA0YeswemQgYPCRKno8XaTUCaTuFz'
        }
        ////////////////

        function exposedFn() { }
        }
})();