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

define(["../module"], function (directives) {
  "use strict"
  directives.directive("wzKbnSwitch", function (BASE_URL) {
    return {
      restrict: "E",
      scope: {
        switchModel: "=switchModel",
        switchChange: "&",
        switchText: "@switchText",
      },
      controller() {},
      templateUrl:
        BASE_URL +
        "/static/app/SplunkAppForWazuh/js/directives/wz-kbn-switch/wz-kbn-switch.html",
    }
  })
})
