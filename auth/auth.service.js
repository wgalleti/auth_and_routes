(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .factory('AuthService', AuthService)

    AuthService.$inject = [
        '$q',
        '$http',
        '$state',
        'urlServerApi',
        'urlServerAuth',
        'ProfileSession',
        'localStorageService',
    ]

    function AuthService($q, $http, $state, urlServerApi, urlServerAuth, ProfileSession, localStorageService){
        var model = {
            isLogged: false,
            signIn: singIn,
            signOut: signOut,
            checkIsLogged: checkIsLogged,
            previousUrl: {
                state: {},
                stateParams: {}
            }
        }

        return model

        function checkIsLogged(){
            var deferred = $q.defer()

            $http
                .get(urlServerAuth + 'user/')
                .then(
                    function(response){
                        model.isLogged = true
                        
                        // load profile info

                        deferred.resolve(model)
                    },
                    function(error){
                        $state.go('signin')
                        deferred.reject(error)
                    }
                )

            return deferred.promise
        }

        function singIn(userInfo){
            var deferred = $q.defer()
            
            $http
                .post(urlServerAuth + 'login/', userInfo)
                .then(
                    function(response){
                        model.isLogged = true
                        localStorageService.set('token', response.data.key)
                        ProfileSession.profile = response.data
                        deferred.resolve(model)
                    },
                    function(error){
                        model.isLogged = false
                        deferred.reject(error)
                    }
                )
            return deferred.promise
        }

        function signOut(){
            var deferred = $q.defer()
            
            $http
                .post(urlServerAuth + 'logout/')
                .then(
                    function(response){
                        model.isLogged = false
                        localStorageService.clearAll()
                        ProfileSession.profile = {}
                        $state.go('signin')                        
                        deferred.resolve(model)
                    },
                    function(error){
                        deferred.reject(error)
                    }
                )
            return deferred.promise
        }
    }

})();