/*
 * Wazuh app - Wazuh iframe onLoad directive
 * Copyright (C) 2015-2022 Wazuh, Inc.
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
  directives.directive('iframeOnload', function () {
    return {
      restrict: 'A',
      scope: {
        callBack: '&iframeOnload',
      },
      link: function (scope, element, _attrs) {
        element.on('load', function () {
          return scope.callBack()
        })
      },
    }
  })
})
