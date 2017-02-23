(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .factory('AuthInterceptor', AuthInterceptor)
    
    AuthInterceptor.$inject = [
        '$q',
        'localStorageService',
        '$injector',
        '$timeout'
    ]
    
    function AuthInterceptor($q, localStorageService, $injector, $timeout){

        return {
            request: request,
            responseError: responseError
        }
        
        function request(config) {
            var token = localStorageService.get('token')
            if (token) {
                config.headers['Authorization'] = 'Token ' + token;
            }
            return config;
        }

        function responseError(response) {
            if (response.status === 401) {
                console.log('você não esta logado!')
                $injector.get('$state').go('signin')
                return $injector.get('AuthService').signOut()
            }

            return $q.reject(response)
        }
        
    }

})();