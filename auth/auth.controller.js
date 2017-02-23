(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .controller('AuthController', AuthController)
    
    AuthController.$inject = [
        'AuthService',
        '$state',
    ]

    function AuthController(AuthService, $state){
        var vm = this

        vm.signIn = signIn
        vm.isRunning = false

        function signIn(){
            vm.isRunning = true

            AuthService
                .signIn(vm.form)
                .then(
                    function(){
                        $state.go('dashboard')
                    },
                    function(error){
                        alert(error.data.non_field_errors[0])
                    }
                )
        }
        
    }

})();