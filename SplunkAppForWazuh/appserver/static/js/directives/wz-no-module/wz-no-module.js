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
  directives.directive('wzNoModule', function(BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        moduleName: '=moduleName',
        agentId: '=agentId',
        groupList: '=groupList',
      },
      controller($scope, $state) {

        $scope.sendToGroup = (group, moduleName) => {
          const groupObject = {name:group, moduleName}
          $state.go(`mg-groups`, { openConfig:groupObject })
        }
        
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-no-module/wz-no-module.html'
    }
  })
})
