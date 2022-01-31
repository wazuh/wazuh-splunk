/*
 * Wazuh app - Wazuh forbidden card directive
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
  directives.directive("wzForbidden", function (BASE_URL) {
    return {
      restrict: "E",
      scope: {
        data: "=data",
      },
      templateUrl:
        BASE_URL +
        "/static/app/SplunkAppForWazuh/js/directives/wz-forbidden/wz-forbidden.html",
    }
  })
})
