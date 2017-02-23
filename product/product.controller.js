(function(){
    'use strict';

    angular
        .module('auth_and_routes')
        .controller('ProductController', ProductController)
    
    ProductController.$inject = [
        'ProductService',
        '$state',
        '$stateParams',
    ]
    
    function ProductController(ProductService, $state, $stateParams){
        var vm = this
        vm.productService = ProductService

        vm.save = save

        function save(){
            if ($stateParams.id == '') {
                ProductService 
                    .add()
                    .then(
                        function(){
                            alert('Produto Salvo')
                            $state.go('product.list')
                        },
                        function(error){
                            console.log(error)
                            alert('Erro')
                        }
                    )
            } else {
                ProductService 
                    .edit()
                    .then(
                        function(){
                            alert('Produto Salvo')
                            $state.go('product.list')
                        },
                        function(error){
                            console.log(error)
                            alert('Erro')
                        }
                    )
            }
        }
    }

})();