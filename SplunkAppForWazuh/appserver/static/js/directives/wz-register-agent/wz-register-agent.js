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

define(['../module'], function(directives) {
  'use strict'
  directives.directive('wzRegisterAgent', function(BASE_URL) {
    return {
      restrict: 'E',
      scope: {},
      controller($scope, $notificationService, $requestService) {
        const apiReq = $requestService.apiReq

        /**
         * Obtain the current selected API from the session storage and removes the "http://" or "https://" from the URL
         */
        this.getSelectedApi = () => {
          var api_url = window.sessionStorage.selectedAPI ? JSON.parse(window.sessionStorage.selectedAPI).url : ''
          const numToClean = api_url.startsWith('https://') ? 8 : 7;
          api_url =  api_url.substr(numToClean);
          $scope.managerAddress = api_url
          return api_url
        }

        this.isPasswordNeeded = async () => {
          try{
            $scope.isLoading = true
            const result = await $requestService.apiReq('/agents/000/config/auth/auth')
            const auth = ((result.data || {}).data || {}).auth || {};
            const usePassword = auth.use_password === 'yes';
            $scope.passwordNeeded = usePassword;
          } catch (error) {
            $scope.passwordNeeded = false;
          }
          $scope.isLoading = false
          $scope.$applyAsync()
        }

        $scope.config = {
          osSelected: 'redhat',
          managerIp: this.getSelectedApi(),
          wazuhPassword: '',
          agentName: '',
          agentKey: ''
        }
        $scope.newInstall = true
        $scope.registeredAgent = false
        $scope.showNavTab = false
        this.isPasswordNeeded()

        // Functions
        $scope.selectOs = os => {
          $scope.config.osSelected = os
          $scope.$applyAsync()
        }

        $scope.osEquivalence = os => {
          const equivalences = {
            redhat: 'Red Hat / CentOS',
            debian: 'Debian / Ubuntu',
            windows: 'Windows',
            macos: 'MacOS'
          }
          return equivalences[os] || 'Undefined'
        }

        $scope.selectManagerAddress = managerAddress => {
          $scope.config.managerIp = managerAddress
          $scope.$applyAsync()
        }

        $scope.selectWazuhPassword = wazuhPassword => {
          $scope.config.wazuhPassword = wazuhPassword
          $scope.$applyAsync()
        }

        $scope.selectAgentName = agentName => {
          $scope.config.agentName = agentName
          $scope.registeredAgent = false
          $scope.$applyAsync()
        }

        $scope.reset = () => {
          for (let key in $scope.config) {
            $scope.config[key] = ''
          }
          $scope.managerAddress = ''
          $scope.registeredAgent = false
          $scope.newInstall = 'newInstall'
          $scope.$applyAsync()
        }

        $scope.changeInstall = install => {
          $scope.newInstall = install === 'newInstall'
          $scope.$applyAsync()
        }

        $scope.toClipboard = element => {
          try {
            const el = document.getElementById(element)
            const range = document.createRange()
            range.selectNodeContents(el)
            const sel = window.getSelection()
            sel.removeAllRanges()
            sel.addRange(range)
            document.execCommand('copy')
            $notificationService.showSimpleToast('Content has been copied')
          } catch (error) {
            $notificationService.showErrorToast(
              'Cannot copy the selected content'
            )
          }
        }
     
        $scope.getVersion = async () => {
          $scope.wazuhVersion = await $requestService.apiReq('/version')
          $scope.wazuhVersion = ((($scope.wazuhVersion || {}).data || {}).data || {})
          $scope.wazuhVersion = $scope.wazuhVersion.replace("v","")
          $scope.$applyAsync()
        }

        $scope.addAgent = async () => {
          try {
            const response = await apiReq(
              `/agents/${$scope.config.agentName}`,
              {},
              'PUT'
            )
            if (
              response &&
              response.data &&
              response.data.data &&
              !response.data.error
            ) {
              $scope.config.agentKey = response.data.data.key
              $scope.registeredAgent = true
              $scope.$applyAsync()
            } else {
              const error =
                response.data.message ||
                response.data.error ||
                'Cannot add agent'
              throw error
            }
          } catch (error) {
            $notificationService.showErrorToast(error || 'Cannot add agent')
          }
        }

        $scope.getVersion()
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-register-agent/wz-register-agent.html'
    }
  })
})
