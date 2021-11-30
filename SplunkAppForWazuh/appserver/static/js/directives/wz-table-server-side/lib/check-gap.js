/*
 * Wazuh app - Wazuh table directive helper
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define([], function() {
  'use strict'
  /**
   * Checks the gap of results in order to render valid page numbers
   * @param {*} $scope
   * @param {Array} items
   */
  return function checkGap($scope) {
    $scope.gap = $scope.totalPages
    if ($scope.gap > 4) $scope.gap = 4
  }
})
