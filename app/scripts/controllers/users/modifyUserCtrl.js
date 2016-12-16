(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('ModifyUserController', ModifyUserController);

    ModifyUserController.$inject = ['$rootScope', 'UserService', '$routeParams', '_toast', '$location', '_cookie'];
    function ModifyUserController($rootScope, UserService, $routeParams, _toast, $location, _cookie) {
        var vm = this;
        vm.retrieveData = retrieveData;
        vm.createData = createData;
        vm.updateData = updateData;
        vm.backToManage = backToManage;
        vm.isUpdating = false;

        activate();

        ////////////////

        function activate() { 
            // EDIT THIS!: global configuration for this controller
            $rootScope.PageTitle.set('Modify Users');
            vm.controllerTitle = 'Create new User';
            vm.mainActions = [
                {
                    text: 'Manage Users',
                    link: '#/users',
                }
            ];
            vm.templateUrl = 'views/views/users/modify.html';

            // data handler
            vm.tableData = {};

            // retrieve data on start
            vm.retrieveData();
        }

        // EDIT THIS!: to retrieve existing data
        function retrieveData() {     
            // retrieve data to parse the table   
            // for example: textboxes or default values

            // update an object
            if ($routeParams.id) {
                if ($routeParams.id === 'my-account') {
                    $location.path('/users/' + $rootScope.loggedUser.userId);
                    return;
                }

                if ($routeParams.id === 'logout') {
                    _cookie.removeLoginSession();
                    $location.path('/login');
                    return;
                }

                if (parseInt($routeParams.id) === $rootScope.loggedUser.userId) {
                    vm.mainActions.push({
                        text: 'Logout',
                        link: '#/users/logout',
                        class: 'danger'
                    });
                }

                vm.isUpdating = true;
                vm.controllerTitle = 'Update User';

                UserService.getOne($routeParams.id, function (err, res) {
                    if (err) {
                        _toast.fail(res.message);

                        vm.backToManage();
                    }

                    vm.tableData = res.data.data[0];
                    vm.tableData.password = '';
                });
            }
        }

        // EDIT THIS!: to create new data
        function createData() {
            // save data to the database
            UserService.create(vm.tableData, function (err, res) {
                _toast.create(res.message, null, (err) ? 'fail' : 'success');

                if (!err) vm.backToManage();
            });
        }

        // EDIT THIS!: to update an existing data
        function updateData() {
            // update an existing record
            UserService.update(vm.tableData.userId, vm.tableData, function (err, res) {
                _toast.create(res.message, null, (err) ? 'fail' : 'success');

                if (!err) vm.backToManage();
            });
        }

        // EDIT THIS!: to cancel an action
        function backToManage() {
            $location.path('/users');
        }
    }
})();