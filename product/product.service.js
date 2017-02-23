(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .factory('ProductService', ProductService)

    ProductService.$inject = [
        '$q',
        '$http',
        'urlServerApi',
    ]

    function ProductService($q, $http, urlServerApi){
        var model = {
            ready: false,
            data: [],
            product: {},
            load: load,
            add: add,
            edit: edit,
            remove: remove,
        }

        return model

        function load(productId){
            model.ready = false

            var deferred = $q.defer()
            var isList = true
            var filters = ''

            if(typeof(productId) !== 'undefined'){
                isList = false
                filters = productId + '/'
            }

            $http
                .get(urlServerApi + 'product/' + filters)
                .then(
                    function(response){
                        model.ready = true

                        var products = response.data
                        if (isList){
                            model.data = products
                        } else {
                            model.product = products
                        }

                       deferred.resolve(model)
                    },
                    function(error){
                        model.ready = true
                       deferred.reject()
                    }
                )

            return deferred.promise
        }

        function add() {
            return $http
                .post(urlServerApi + 'product/', model.product)
        }

        function edit() {
            return $http
                .put(urlServerApi + 'product/' + model.product.id + '/', model.product)
        }

        function remove(productId) {
            return $http
                .delete(urlServerApi + 'product/' + model.product.id + '/')
        }
    }

})();