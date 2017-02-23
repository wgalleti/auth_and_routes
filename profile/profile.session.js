(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .factory('ProfileSession', ProfileSession)

    ProfileSession.$inject = []

    function ProfileSession(){
        var model = {
            profile: {},
            permissions: [],
        }
        return model
    }

})();