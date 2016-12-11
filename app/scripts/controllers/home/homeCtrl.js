(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope'];
    function HomeController($rootScope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { 
            $rootScope.PageTitle.set('Dashboard');
        }
    }
})();