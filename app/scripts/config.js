(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('_c', _c);

    _c.$inject = [];
    function _c() {
        this.api = {};
        this.errorMessagesByCodes = {};

        ////////////////
        this.api = {
            BASE_URL:   'http://localhost:91/v1/',
            API_KEY:    'TvGpPbCwebLVA0YeswemQgYPCRKno8XaTUCaTuFz'
        }

        this.errorMessagesByCodes = {
            INVALID_API_KEY: 'Invalid API Key! Please check your application.',
            INVALID_AUTH_TYPE: 'Invalid authentication type! Please check your application.',
            INVALID_ACCESS_TOKEN: 'You\'re unauthenticated! Please login again.',
            DUPLICATED_USERNAME: 'The username you chose is duplicated! Please try another username.'
        }
        ////////////////
        }
})();

angular
    .module('ndtAngular1AdminDashboard')
    .config(['eehNavigationProvider', function (eehNavigationProvider) {
        eehNavigationProvider
            .menuItem('acp.home', {
                text: 'Home',
                iconClass: 'glyphicon-home',
                weight: -10,
                href: '#!/'
            })
            .menuItem('acp.users', {
                text: 'Users',
                iconClass: 'glyphicon-user',
                weight: -10,
                href: '#!/users'
            })
            .menuItem('acp.logged', {
                text: '_loggedInStatus',
                iconClass: 'glyphicon-fire',
                weight: -10,
                href: '#!/users/my-account'
            });
    }])

    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.latencyThreshold = 0;
    }]);