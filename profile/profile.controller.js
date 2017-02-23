(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .controller('ProfileController', ProfileController)
    
    ProfileController.$inject = [
        'ProfileSession',
    ]

    function ProfileController(ProfileSession){
        var vm = this
        vm.profileSession = ProfileSession
    }

})();