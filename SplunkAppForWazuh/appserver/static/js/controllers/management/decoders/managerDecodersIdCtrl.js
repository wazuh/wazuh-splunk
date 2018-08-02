define(['../../module'], function (controllers) {

  'use strict'

  controllers.controller('managerDecodersIdCtrl', function (decoderInfo, $sce, $state, $stateParams) {
    const vm = this
    const filters = []
    const colors = [
      '#004A65', '#00665F', '#BF4B45', '#BF9037', '#1D8C2E', 'BB3ABF',
      '#00B1F1', '#00F2E2', '#7F322E', '#7F6025', '#104C19', '7C267F',
      '#0079A5', '#00A69B', '#FF645C', '#FFC04A', '#2ACC43', 'F94DFF',
      '#0082B2', '#00B3A7', '#401917', '#403012', '#2DD947', '3E1340',
      '#00668B', '#008C83', '#E55A53', '#E5AD43', '#25B23B', 'E045E5'
    ]

    if ($stateParams && $stateParams.filters && $stateParams.filters.length > 0) {
      filters = $stateParams.filters
    }

    vm.currentDecoder = decoderInfo.data.data.items[0]
    console.log('decoderInfo ', decoderInfo)
    vm.colorRuleArg = ruleArg => {
      ruleArg = ruleArg.toString()
      let valuesArray = ruleArg.match(/\$\(((?!<\/span>).)*?\)(?!<\/span>)/gmi)
      let coloredString = ruleArg

      // If valuesArray is empty, means that the description doesn't have any arguments
      // In this case, then simply return the string
      // In other case, then colour the string and return
      if (valuesArray && valuesArray.length) {
        for (let i = 0, len = valuesArray.length; i < len; i++) {
          coloredString = coloredString.replace(/\$\(((?!<\/span>).)*?\)(?!<\/span>)/mi, '<span style="color: ' + colors[i] + ' ">' + valuesArray[i] + '</span>')
        }
      }
      return $sce.trustAsHtml(coloredString)
    }

    vm.colorRegex = regex => {
      regex = regex.toString();
      let valuesArray = regex.match(/\(((?!<\/span>).)*?\)(?!<\/span>)/gmi);
      let coloredString = regex;
      for (let i = 0, len = valuesArray.length; i < len; i++) {
        coloredString = coloredString.replace(/\(((?!<\/span>).)*?\)(?!<\/span>)/mi, '<span style="color: ' + colors[i] + ' ">' + valuesArray[i] + '</span>');
      }
      return $sce.trustAsHtml(coloredString);
    }

    vm.addDetailFilter = (name, value) => {
      console.log('adding filter')
      const filter = { name: name, value: value }
      filters.push(filter)
      $state.go('mg-rules', { filters: filters })
    }

    vm.colorOrder = order => {
      order = order.toString();
      let valuesArray = order.split(',');
      let coloredString = order;
      for (let i = 0, len = valuesArray.length; i < len; i++) {
        coloredString = coloredString.replace(valuesArray[i], '<span style="color: ' + colors[i] + ' ">' + valuesArray[i] + '</span>');
      }
      return $sce.trustAsHtml(coloredString);
    }

    vm.onlyParents = typeFilter => {
      $scope.appliedFilters = [];
      if (typeFilter === 'all') $scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders' })
      else $scope.$broadcast('wazuhUpdateInstancePath', { path: '/decoders/parents' })
    }

    vm.closeDetailView = clear => {
      if (clear) $scope.appliedFilters = $scope.appliedFilters.slice(0, $scope.appliedFilters.length - 1)
      $scope.viewingDetail = false
      $scope.currentDecoder = false
      if (!$scope.$$phase) $scope.$digest()
    }

  })
})