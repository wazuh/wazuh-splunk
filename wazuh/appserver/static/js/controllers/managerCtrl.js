(function() {
    
    function managerCtrl($scope,$location) {
        console.log('loaded controller')
        var vm = this;
        vm.exampleVar = "This is an example";

    }

    angular.module('wazuhApp')
        .controller('managerCtrl', ['$scope', '$location', managerCtrl]);
})();