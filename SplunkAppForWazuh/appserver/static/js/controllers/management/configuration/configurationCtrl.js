define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('configurationCtrl', function ($scope, $requestService, $beautifierJson, managerConf, $notificationService) {
    const vm = this
    vm.load = true
    vm.isArray = Array.isArray

    vm.switchItem = item => {
      vm.XMLContent = false
      vm.JSONContent = false
      vm.selectedItem = item
      if (!$scope.$$phase) $scope.$digest()
    }

    // vm.getXML = name => {
    //   vm.JSONContent = false
    //   if (vm.XMLContent) {
    //     vm.XMLContent = false
    //   } else {
    //     try {
    //       vm.XMLContent = $XMLBeautifier(js2xmlparser.parse(name, configRaw[name]))
    //     } catch (error) { vm.XMLContent = false }
    //   }
    //   if (!$scope.$$phase) $scope.$digest()
    // }

    vm.getJSON = name => {
      vm.XMLContent = false
      if (vm.JSONContent) {
        vm.JSONContent = false
      } else {
        try {
          vm.JSONContent = $beautifierJson.prettyPrint(configRaw[name])
        } catch (error) { vm.JSONContent = false }
      }
      if (!$scope.$$phase) $scope.$digest()
    }
    const configRaw = {}
    //Functions
    const load = async () => {
      try {
        const data = managerConf.data.data
        Object.assign(configRaw, angular.copy(data))
        vm.managerConfiguration = data

        if (vm.managerConfiguration && vm.managerConfiguration['active-response']) {

          for (const ar of vm.managerConfiguration['active-response']) {
            const rulesArray = ar.rules_id ?
              ar.rules_id.split(',') :
              []
            if (ar.rules_id && rulesArray.length > 1) {
              const tmp = []

              for (const id of rulesArray) {
                const rule = await $requestService.apiReq(`/rules/${id}`)
                tmp.push(rule.data.data.items[0])
              }

              ar.rules = tmp
            } else if (ar.rules_id) {
              const rule = await $requestService.apiReq(`/rules/${ar.rules_id}`)
              ar.rule = rule.data.data.items[0]
            }
          }
        }

        // vm.raw = $beautifierJson.prettyPrint(data.data.data)
        vm.load = false
        if (!$scope.$$phase) $scope.$digest()
        return
      } catch (error) {
        $notificationService.showSimpleToast('error ', error)
      }
      return
    }
    load()
    $scope.$on("$destroy", () => {
    })
  })
})
