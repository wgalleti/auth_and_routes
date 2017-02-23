(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .run(run)


    function run($rootScope, AuthService){
		$rootScope.isLogged = AuthService.isLogged

        $rootScope.$on( '$stateChangeStart',
			function(e, toState  , toParams, fromState, fromParams) {
				var isAuth = toState.name === "signin"
				
                if (fromState.name === "signin" || toState.name !== "signin") {
				    AuthService.previousUrl.state = toState
				    AuthService.previousUrl.stateParams = toParams
                }

				if (AuthService.isLogged && isAuth) {
					e.preventDefault()
					$state.go('dashboard')
				}
			}
		)
    }
})();