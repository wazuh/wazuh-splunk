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
  directives.directive('wzModuleGuide', function(BASE_URL) {
    return {
      restrict: 'E',
      scope: {
      },
      controller($scope) {
        $scope.showOptionsTab = true
        $scope.disabled = ""
        $scope.generateConfig = () => {
          $scope.configurationGenerated = true
        }
        $scope.directories = ""
        $scope.frequency = ""
        $scope.test =  `<!-- Policy monitoring -->
        <rootcheck>
          <disabled>no</disabled>
          <directories>/var</disabled>
          <frequency>1h</frequency>
        </rootcheck>`
        $scope.modulesList = [
          {"id":"rootcheck",
          "name": "Rootcheck",
          "description" : "Configuration options for policy monitoring and anomaly detection.",
          "default_configuration": [
            {"title" : "Default Unix configuration",
             "content" : `<!-- Policy monitoring -->
<rootcheck>
  <disabled>no</disabled>
  <directories>/var</disabled>
  <frequency>1h</frequency>
</rootcheck>`}
            ],
          "options": [
            { "name" : "base_directory",
              "description" : "The base directory that will be prepended to the following options: rootkit_files , rootkit_trojans and system_audit" }
            ]
          },


          {"id":"syscheck",
          "name": "Syscheck",
          "description" : "Configuration options for file integrity monitoring.",
          "default_configuration": [
            {"title" : "Default Unix configuration",
             "content" : "<test> syscheck </test>"}
            ],
          "options": [
            { "name" : "directories",
              "description" : `Use this option to add or remove directories to be monitored. The directories must be comma separated.
              All files and subdirectories within the noted directories will also be monitored.              
              Drive letters without directories are not valid. At a minimum the ‘.’ should be included (D:\.).
              This is to be set on the system to be monitored (or in the agent.conf, if appropriate).` }
            ]
          }
        ]

        $scope.showOptions = () => {
          $scope.showOptionsTab = true
          $scope.showConfigTab = false
          $scope.$applyAsync()
        }

        $scope.showConfig = () => {
          $scope.showOptionsTab = false
          $scope.showConfigTab = true
          $scope.$applyAsync()
        }

        $scope.currentModule = $scope.modulesList[0]

      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-module-guide/wz-module-guide.html'
    }
  })
})
