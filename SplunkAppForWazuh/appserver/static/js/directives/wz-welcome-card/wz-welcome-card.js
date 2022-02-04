/*
 * Wazuh app - Wazuh welcome card directive
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
  directives.directive('wzWelcomeCard', function (BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        subTitle: '=subTitle',
        description: '=description',
        logo: '=logo',
        switchTab: '&',
        currentTab: '=currentTab',
      },
      replace: true,
      controller($scope) {
        $scope.finalUrl = `${BASE_URL}${$scope.logo}`
        $scope.callSwitchTab = () => $scope.switchTab()
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-welcome-card/wz-welcome-card.html',
    }
  })
})
