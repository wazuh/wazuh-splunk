/*
 * Wazuh app - Wazuh table directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// import template from './wz-table.html';
// import { uiModules } from 'ui/modules';
// import DataFactory from '../../services/data-factory';

// const app = uiModules.get('app/wazuh', []);

define(["../module"], function (directives) {
  "use strict"
  directives.directive("wzDynamic", function ($compile) {
    return {
      restrict: "A",
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.wzDynamic, function (html) {
          ele.html(html)
          $compile(ele.contents())(scope)
        })
      },
    }
  })
})
