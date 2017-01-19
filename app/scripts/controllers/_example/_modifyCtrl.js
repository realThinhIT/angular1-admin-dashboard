(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('_modifyExampleController', _modifyExampleController);

    _modifyExampleController.$inject = ['$rootScope', '_exampleService', '$routeParams', '_toast', '$location'];
    function _modifyExampleController($rootScope, _exampleService, $routeParams, _toast, $location) {
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
            $rootScope.PageTitle.set('Modify _examples');
            vm.controllerTitle = 'Create new _example';
            vm.mainActions = [
                {
                    text: 'Manage _examples',
                    link: '#!/_examples',
                }
            ];
            vm.templateUrl = 'views/views/_examples/modify.html';

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
                vm.isUpdating = true;
                vm.controllerTitle = 'Update _example';

                _exampleService.getOne($routeParams.id, 
                    function (err, res) {
                        vm.tableData = res.data.data[0];
                });
            }
        }

        // EDIT THIS!: to create new data
        function createData() {
            // save data to the database
            _exampleService.create(vm.tableData, function (err, res) {
                _toast.create(res.message, null, (err) ? 'fail' : 'success');

                if (!err) vm.backToManage();
            });
        }

        // EDIT THIS!: to update an existing data
        function updateData() {
            // update an existing record
            _exampleService.update(vm.tableData.id, vm.tableData, function (err, res) {
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