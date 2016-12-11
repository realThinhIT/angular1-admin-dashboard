(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('_pageTitle', _pageTitle);

    _pageTitle.$inject = [];
    function _pageTitle() {
        var pageTitle = '';
        var defaultTitle = 'ndtAngular1AdminDashboard';

        this.get = get;
        this.set = set;
        
        ////////////////

        function get() {
            if (!pageTitle) {
                return defaultTitle;
            } else {
                return pageTitle + ' - ' + defaultTitle;
            }
        }

        function set(title) {
            pageTitle = title;
        }
        }
})();