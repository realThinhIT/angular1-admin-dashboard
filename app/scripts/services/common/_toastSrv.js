(function() {
'use strict';

    angular
        .module('thongTinTuyenSinhBackend')
        .service('_toast', _toast);

    _toast.$inject = ['toasty'];
    function _toast(toasty) {
        this.toasty = toasty;
        
        ////////////////

        this.success = function (msg, title) {
            toasty.success({
                title: ((title) ? title : 'Operation Completed!').toUpperCase(),
                msg: msg
            });
        }

        this.fail = function (msg, title) {
            toasty.error({
                title: ((title) ? title : 'An Error Has Occured!').toUpperCase(),
                msg: msg
            });
        }

        this.warning = function (msg, title) {
            toasty.warning({
                title: ((title) ? title : 'Warning!').toUpperCase(),
                msg: msg
            });
        }

        this.info = function (msg, title) {
            toasty.info({
                title: ((title) ? title : 'Information').toUpperCase(),
                msg: msg
            });
        }

        this.wait = function (msg, title) {
            toasty.wait({
                title: ((title) ? title : 'Performing An Operation...').toUpperCase(),
                msg: msg
            });
        }

        this.create = function (msg, title, type) {
            this[type](msg, title.toUpperCase());
        }
    }
})();