(function() {
    
    function overviewCtrl($scope,$location) {
        console.log('loaded controller')
        var vm = this;
        vm.exampleVar = "This is an example";

    }

    angular.module('wazuhApp')
        .controller('overviewCtrl', ['$scope', '$location', overviewCtrl]);
})();