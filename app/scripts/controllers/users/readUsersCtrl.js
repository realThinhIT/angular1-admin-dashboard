(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .controller('ReadUsersController', ReadUsersController);

    ReadUsersController.$inject = ['$rootScope', 'UserService', '_toast'];
    function ReadUsersController($rootScope, UserService, _toast) {
        var vm = this;
        vm.reloadPage = reloadPage;
        vm.deleteData = deleteData;

        activate();

        ////////////////

        function activate() { 
            // EDIT THIS!: global configuration for this controller
            $rootScope.PageTitle.set('Users');
            vm.controllerTitle = 'Manage Users';
            vm.mainActions = [
                {
                    text: 'Create new User',
                    link: '#!/users/create',
                }
            ];
            vm.templateUrl = 'views/views/users/read.html';

            // search function
            vm.isSearchFuncEnabled = true;
            vm.search = {};
            vm.paging = {};
            vm.search.q = '';
            
            // EDIT THIS!: search options
            vm.search.sortByOptions = [
                {
                    label: 'ID',
                    value: 'userId'
                }
            ];
            vm.search.sort = 'DESC';
            vm.search.sortBy = 'userId';
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
            UserService.getAll({
                page: vm.paging.currentPage,
                q: vm.search.q,
                sortBy: vm.search.sortBy,
                sort: vm.search.sort,
                itemsPerPage: vm.paging.pageSize
            }, function (err, res) {
                vm.tableData = res.data.data;

                var total = (res.data.additionalData.totalItems) ? res.data.additionalData.totalItems : res.data.data.length;
                vm.updatePaging(vm.paging.currentPage, total);
            });
        }

        // EDIT THIS!: to delete existing data
        function deleteData(objectId) {
            UserService.delete(objectId, function (err, res) {
                _toast.create(res.message, null, (err) ? 'fail' : 'success');

                if (!err) vm.reloadPage();
            });
        }
    }
})();