/*
 * Wazuh app - Wazuh no configuration card directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../module'], function (directives) {
  'use strict'
  directives.directive('wzRegisterAgent', function (BASE_URL) {
    return {
      restrict: 'E',
      scope: {},
      controller(
        $scope
      ) {
        
        $scope.config = { osSelected: '', managerIp: '' }
        $scope.newInstall = true

        // Functions
        $scope.selectOs = (os) => {
          $scope.config.osSelected = os
          $scope.$applyAsync()
        }

        $scope.osEquivalence = (os) => {
          const equivalences = { redhat: 'Redhat / CentOS', debian: 'Debian / Ubuntu', windows: 'Windows', macos: 'MacOS' }
          return equivalences[os] || 'Undefined'
        }

        $scope.selectManagerAddress = (managerAddress) => {
          $scope.config.managerIp = managerAddress
          $scope.$applyAsync()
        }

        $scope.reset = () => {
          for (let key in $scope.config) {
            $scope.config[key] = ''
          }
          $scope.$applyAsync()
        }

        $scope.changeInstall = (install) => {
          $scope.newInstall = install === 'newInstall'
          $scope.$applyAsync()
        }

      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-register-agent/wz-register-agent.html'
    }
  })
})
