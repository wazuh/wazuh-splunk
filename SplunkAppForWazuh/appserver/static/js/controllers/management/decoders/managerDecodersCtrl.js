define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('managerDecodersCtrl', function ($scope, $sce, $stateParams) {
    const vm = this
    const colors = [
      '#004A65', '#00665F', '#BF4B45', '#BF9037', '#1D8C2E', 'BB3ABF',
      '#00B1F1', '#00F2E2', '#7F322E', '#7F6025', '#104C19', '7C267F',
      '#0079A5', '#00A69B', '#FF645C', '#FFC04A', '#2ACC43', 'F94DFF',
      '#0082B2', '#00B3A7', '#401917', '#403012', '#2DD947', '3E1340',
      '#00668B', '#008C83', '#E55A53', '#E5AD43', '#25B23B', 'E045E5'
    ]

    vm.appliedFilters = []
    //Initialization
    vm.searchTerm = ''
    vm.viewingDetail = false
    vm.typeFilter = "all"
    vm.isArray = angular.isArray

    vm.includesFilter = filterName => vm.appliedFilters.map(item => item.name).includes(filterName)

    vm.getFilter = filterName => {
      const filtered = vm.appliedFilters.filter(item => item.name === filterName)
      return filtered.length ? filtered[0].value : ''
    }

    vm.search = term => {
      if (term && term.startsWith('group:') && term.split('group:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'group', value: term.split('group:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'group')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('level:') && term.split('level:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'level', value: term.split('level:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'level')
        vm.appliedFilters.push(filter)
        console.log('3.- Sending event filter ', filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('pci:') && term.split('pci:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'pci', value: term.split('pci:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'pci')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('gdpr:') && term.split('gdpr:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'gdpr', value: term.split('gdpr:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'gdpr')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('file:') && term.split('file:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'file', value: term.split('file:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'file')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else {
        $scope.$broadcast('wazuhSearch', { term, removeFilters: 0 })
      }
    }


    vm.removeFilter = filterName => {
      vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== filterName)
      return $scope.$broadcast('wazuhRemoveFilter', { filterName })
    }

    vm.colorRegex = regex => {
      regex = regex.toString()
      let valuesArray = regex.match(/\(((?!<\/span>).)*?\)(?!<\/span>)/gmi)
      let coloredString = regex
      for (let i = 0, len = valuesArray.length; i < len; i++) {
        coloredString = coloredString.replace(/\(((?!<\/span>).)*?\)(?!<\/span>)/mi, '<span style="color: ' + colors[i] + ' ">' + valuesArray[i] + '</span>')
      }
      return $sce.trustAsHtml(coloredString)
    }

    vm.colorOrder = order => {
      order = order.toString()
      let valuesArray = order.split(',')
      let coloredString = order
      for (let i = 0, len = valuesArray.length; i < len; i++) {
        coloredString = coloredString.replace(valuesArray[i], '<span style="color: ' + colors[i] + ' ">' + valuesArray[i] + '</span>')
      }
      return $sce.trustAsHtml(coloredString)
    }

    // Reloading event listener
    $scope.$on('rulesetIsReloaded', () => {
      vm.viewingDetail = false
      if (!$scope.$$phase) $scope.$digest()
    })

    vm.search = term => {
      console.log('searching ',term)
      if (term && term.startsWith('path:') && term.split('path:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'path', value: term.split('path:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'path')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('file:') && term.split('file:')[1].trim()) {
        vm.custom_search = ''
        const filter = { name: 'file', value: term.split('file:')[1].trim() }
        vm.appliedFilters = vm.appliedFilters.filter(item => item.name !== 'file')
        vm.appliedFilters.push(filter)
        $scope.$broadcast('wazuhFilter', { filter })
      } else {
        $scope.$broadcast('wazuhSearch', { term, removeFilters: true })
      }
    }

    vm.onlyParents = typeFilter => {
      vm.appliedFilters = []
      if (typeFilter === 'all') $scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders' })
      else $scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders/parents' })
    }


    /**
     * This function takes back to the list but adding a filter from the detail view
     */
    vm.addDetailFilter = (name, value) => {
      vm.appliedFilters.push({ name, value })
      // Clear the autocomplete component
      vm.searchTerm = ''
      // Go back to the list
      vm.closeDetailView()
    }

    $scope.$on('wazuhShowDecoder', (event, parameters) => {
      vm.currentDecoder = parameters.decoder
      vm.viewingDetail = true
      if (!$scope.$$phase) $scope.$digest()
    })

    $scope.$on('loadedTable', () => {
      console.log('2.- Controller: Table loaded and received event. Launching filters.')
      if ($stateParams && $stateParams.filters && $stateParams.filters.length > 0) {
        vm.appliedFilters = $stateParams.filters
        $stateParams.filters.forEach(filter => vm.search(`${filter.name}:${filter.value}`))
      }
    })
    /**
     * This function changes to the decoders list view
     */
    vm.closeDetailView = clear => {
      if (clear) vm.appliedFilters = vm.appliedFilters.slice(0, vm.appliedFilters.length - 1)
      vm.viewingDetail = false
      vm.currentDecoder = false
      if (!$scope.$$phase) $scope.$digest()
    }
  })
})
