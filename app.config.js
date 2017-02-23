(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .config(config)

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'localStorageServiceProvider',
        '$httpProvider'
    ]
    function config($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider){

        $httpProvider.interceptors.push('AuthInterceptor')

        localStorageServiceProvider
            .setPrefix('demo')
            .setStorageType('localStorage')
            .setDefaultToCookie(false)
            .setNotify(true, true)

        $urlRouterProvider.otherwise('dashboard')

        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'auth/auth.login.html',
                controller: 'AuthController',
                controllerAs: 'auth'
            })
            .state('dashboard', {
                url: '/',
                templateUrl: 'dashboard/dashboard.home.html',
                controller: 'DashboardController',
                controllerAs: 'dash',
                resolve: {
                    isLogged: checkIsLogged
                }
            })
            .state('product', {
                url: '/product',
                templateUrl: 'product/product.home.html'
            })
            .state('product.list', {
                url: '/list',
                templateUrl: 'product/product.list.html',
                controller: 'ProductController',
                controllerAs: 'product',
                resolve: {
                    isLogged: checkIsLogged,                    
                    products: loadProducts
                }
            })
            .state('product.form', {
                url: '/form/:id',
                templateUrl: 'product/product.form.html',
                controller: 'ProductController',
                controllerAs: 'product',
                resolve: {
                    isLogged: checkIsLogged,                    
                    product: loadProduct
                }
            })

            .state('logout', {
                url: '/logout',
                resolve: {
                    logout: logout
                }
            })

        function logout(AuthService) {
            return AuthService.signOut()
        }

        function checkIsLogged(AuthService) {
            return AuthService.checkIsLogged()
        }

        function loadProducts(ProductService) {
            return ProductService.load()
        }

        function loadProduct(ProductService, $stateParams) {
            return $stateParams['id'] == '' ? {} : ProductService.load($stateParams['id'])
        }
    }
})();