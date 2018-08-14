define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('managerRulesetCtrl', function ($scope, $sce) {
    const vm = this
    const colors = [
      '#004A65', '#00665F', '#BF4B45', '#BF9037', '#1D8C2E', 'BB3ABF',
      '#00B1F1', '#00F2E2', '#7F322E', '#7F6025', '#104C19', '7C267F',
      '#0079A5', '#00A69B', '#FF645C', '#FFC04A', '#2ACC43', 'F94DFF',
      '#0082B2', '#00B3A7', '#401917', '#403012', '#2DD947', '3E1340',
      '#00668B', '#008C83', '#E55A53', '#E5AD43', '#25B23B', 'E045E5'
    ]

    vm.appliedFilters = []
    let filters = window.localStorage.ruleset || []
    vm.search = term => {
      if (term && term.startsWith('group:') && term.split('group:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'group', value: term.split('group:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'group')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('level:') && term.split('level:')[1].trim()) {
        $scope.custom_search = ''
        const filter = { name: 'level', value: term.split('level:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'level')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('pci:') && term.split('pci:')[1].trim()) {
        $scope.custom_search = ''
        const filter = { name: 'pci', value: term.split('pci:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'pci')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('gdpr:') && term.split('gdpr:')[1].trim()) {
        $scope.custom_search = ''
        const filter = { name: 'gdpr', value: term.split('gdpr:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'gdpr')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('file:') && term.split('file:')[1].trim()) {
        $scope.custom_search = ''
        const filter = { name: 'file', value: term.split('file:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'file')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('path:') && term.split('path:')[1].trim()) {
        $scope.custom_search = ''
        const filter = { name: 'path', value: term.split('path:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'path')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else {
        $scope.$broadcast('wazuhSearch', { term, removeFilters: 0 })
      }
    }

    $scope.$on('loadedTable', () => {
      if (window.localStorage.ruleset && JSON.parse(window.localStorage.ruleset).length > 0) {
        const jsonFilters = JSON.parse(window.localStorage.ruleset)
        vm.appliedFilters = jsonFilters
        jsonFilters.forEach((filter) => {$scope.$broadcast('wazuhFilter', { filter }) })
      }
    })

    vm.includesFilter = filterName => vm.appliedFilters.map(item => item.name).includes(filterName)

    vm.getFilter = filterName => {
      const filtered = vm.appliedFilters.filter(item => item.name === filterName)
      return filtered.length ? filtered[0].value : ''
    }

    vm.removeFilter = filterName => {
      filters = vm.appliedFilters.filter(item => item.name !== filterName)
      vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== filterName)
      if (window.localStorage.ruleset && JSON.parse(window.localStorage.ruleset))
        JSON.parse(window.localStorage.ruleset).map((item, index) => {
          if (item.name === filterName) {
            const tempFilter = JSON.parse(window.localStorage.ruleset)
            tempFilter.splice(index, 1)
            window.localStorage.ruleset = JSON.stringify(tempFilter)
          }
        })
      return $scope.$broadcast('wazuhRemoveFilter', { filterName })
    }

    //Initialization
    vm.searchTerm = ''
    vm.viewingDetail = false
    vm.isArray = angular.isArray

    vm.colorRuleArg = ruleArg => {
      ruleArg = ruleArg.toString()
      let valuesArray = ruleArg.match(/\$\(((?!<\/span>).)*?\)(?!<\/span>)/gmi)
      let coloredString = ruleArg

      // If valuesArray is empty, means that the description doesn't have any arguments
      // In this case, then simply return the string
      // In other case, then colour the string and return
      if (valuesArray && valuesArray.length) {
        for (let i = 0, len = valuesArray.length; i < len; i++) {
          coloredString = coloredString.replace(/\$\(((?!<\/span>).)*?\)(?!<\/span>)/mi, '<span style="color: ' + colors[i] + ' ">' + valuesArray[i] + '</span>');
        }
      }
      return $sce.trustAsHtml(coloredString)
    }

    // Reloading event listener
    $scope.$on('rulesetIsReloaded', () => {
      vm.viewingDetail = false
      if (!$scope.$$phase) $scope.$digest()
    })

    $scope.$on('wazuhShowRule', (event, parameters) => {
      vm.currentRule = parameters.rule
      vm.viewingDetail = true
      if (!$scope.$$phase) $scope.$digest()
    })

    /**
     * This function changes to the rules list view
     */
    vm.closeDetailView = clear => {
      if (clear) vm.appliedFilters = vm.appliedFilters.slice(0, vm.appliedFilters.length - 1)
      vm.viewingDetail = false
      vm.currentRule = false
      if (!$scope.$$phase) $scope.$digest()
    }
  })
})
