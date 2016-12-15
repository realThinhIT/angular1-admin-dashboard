(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('_readExampleController', _readExampleController);

    _readExampleController.$inject = ['$rootScope', '_exampleService', '_toast'];
    function _readExampleController($rootScope, _exampleService, _toast) {
        var vm = this;
        vm.reloadPage = reloadPage;
        vm.deleteData = deleteData;

        activate();

        ////////////////

        function activate() { 
            // EDIT THIS!: global configuration for this controller
            $rootScope.PageTitle.set('Manage _example');
            vm.controllerTitle = 'Manage _example';
            vm.mainActions = [
                {
                    text: 'Create new User',
                    link: '#/_example/create',
                }
            ];
            vm.templateUrl = 'views/views/_example/read.html';

            // search function
            vm.isSearchFuncEnabled = true;
            vm.search = {};
            vm.paging = {};
            vm.search.q = '';
            
            // EDIT THIS!: search options
            vm.search.sortByOptions = [
                {
                    label: 'ID',
                    value: 'id'
                }
            ];
            vm.search.sort = 'DESC';
            vm.search.sortBy = 'id';
            vm.search.itemsPerPage = '25';

            // paging function
            vm.updatePaging = function (page, total) {
                vm.paging.currentPage = (page) ? page : 1;
                vm.paging.pageSize = parseInt(vm.search.itemsPerPage);
                vm.paging.total = (total) ? total : vm.paging.total;
            }
            vm.updatePaging();

            // data handler
            vm.tableData = {};

            // retrieve data on start
            vm.reloadPage(1);
        }

        // EDIT THIS!: to retrieve new data
        function reloadPage(page) {     
            vm.updatePaging(page);

            // retrieve data to parse the table   
            _exampleService.getAll({
                page: vm.paging.currentPage,
                q: vm.search.q,
                sortBy: vm.search.sortBy,
                sort: vm.search.sort,
                itemsPerPage: vm.paging.pageSize
            }, function (err, res) {
                vm.tableData = res.data.data;

                var total = (res.data.additionalData.totalItems) ? res.data.additionalData.totalItems : res.data.data.length;
                vm.updatePaging(page, total);
            });
        }

        // EDIT THIS!: to delete existing data
        function deleteData(objectId) {
            _updateService.delete(objectId, function (err, res) {
                _toast.create(res.message, null, (err) ? 'fail' : 'success');

                if (!err) vm.reloadPage();
            });
        }
    }
})();