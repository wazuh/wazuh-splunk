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

define(['../module'], function (directives) {
  'use strict'
  directives.directive('wzEnter', function () {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.wzEnter)
          })

          event.preventDefault()
        }
      })
    }
  })
})
