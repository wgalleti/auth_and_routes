(function(){
    'use strict';

    angular
        .module('auth_and_routes', [
            'ui.router',
            'LocalStorageModule'
        ])
        .constant('urlServerAuth', 'https://authroute.herokuapp.com/rest-auth/')
        .constant('urlServerApi', 'https://authroute.herokuapp.com/api/')
})();