(function() {
    
    function agentCtrl($scope,$location) {
        console.log('loaded controller')
        var vm = this;
        vm.exampleVar = "This is an example";

    }

    angular.module('wazuhApp')
        .controller('agentCtrl', ['$scope', '$location', agentCtrl]);
})();