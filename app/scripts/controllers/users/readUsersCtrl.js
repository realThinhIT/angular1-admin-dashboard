(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('ReadUsersController', ReadUsersController);

    ReadUsersController.$inject = ['$rootScope'];
    function ReadUsersController($rootScope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { 
            $rootScope.PageTitle.set('Users');
            vm.controllerTitle = 'Manage Users';
            vm.mainActions = [
                {
                    text: 'Create new User',
                    link: '#/users/create',
                }
            ];
            vm.templateUrl = 'view/views/users/read.html';
        }
    }
})();