(function() {
'use strict';

    angular
        .module('ndtAngular1AdminDashboard')
        .service('_cookie', _cookie);

    _cookie.$inject = ['$cookies'];
    function _cookie($cookies) {
        this.put = $cookies.put;
        this.get = $cookies.get;
        this.putObject = $cookies.putObject;
        this.getObject = $cookies.getObject;
        this.getAll = $cookies.getAll;
        this.remove = $cookies.remove;

        this.saveLoginSession = saveLoginSession;
        this.getLoginSession  = getLoginSession;
        this.removeLoginSession = removeLoginSession;
        
        ////////////////

        function saveLoginSession(sessionData) { 
            $cookies.put('login_session', btoa(btoa(JSON.stringify(sessionData))));
        }

        function getLoginSession() {
            try {
                return ($cookies.get('login_session') == undefined || Object.keys(JSON.parse(atob(atob($cookies.get('login_session'))))).length === 0) ? undefined : JSON.parse(atob(atob($cookies.get('login_session'))));
            } catch (e) {
                if (e) {
                    return undefined;
                }
            }
        }

        function removeLoginSession() {
            $cookies.remove('login_session');
        }
        }
})();