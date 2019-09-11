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
        $scope.modulesList = [
          {"id":"rootcheck",
          "name": "Rootcheck",
          "description" : "Configuration options for policy monitoring and anomaly detection.",
          "default_configuration": [
            {"title" : "Default Unix configuration",
             "content" : `<!-- Policy monitoring -->
<rootcheck>
  <disabled>no</disabled>
  <check_unixaudit>yes</check_unixaudit>
  <check_files>yes</check_files>
  <check_trojans>yes</check_trojans>
  <check_dev>yes</check_dev>
  <check_sys>yes</check_sys>
  <check_pids>yes</check_pids>
  <check_ports>yes</check_ports>
  <check_if>yes</check_if>
           
  <!-- Frequency that rootcheck is executed - every 12 hours -->
  <frequency>43200</frequency>
           
  <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
  <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
           
  <system_audit>/var/ossec/etc/shared/system_audit_rcl.txt</system_audit>
  <system_audit>/var/ossec/etc/shared/system_audit_ssh.txt</system_audit>
  <system_audit>/var/ossec/etc/shared/cis_debian_linux_rcl.txt</system_audit>
           
  <skip_nfs>yes</skip_nfs>
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

        $scope.currentModule = $scope.modulesList[0]

      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-module-guide/wz-module-guide.html'
    }
  })
})
