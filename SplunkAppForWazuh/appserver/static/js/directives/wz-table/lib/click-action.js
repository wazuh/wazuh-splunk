/*
* Wazuh app - Wazuh table directive click wrapper
* Copyright (C) 2018 Wazuh, Inc.
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* Find more information about this on the LICENSE file.
*/
define([], function () {
  'use strict'
  return function clickAction(
    instance,
    item,
    $state,
    $navigationService,
    $currentDataService,
    $scope
  ) {
    if (instance.path === '/agents' || new RegExp(/^\/agents\/groups\/[a-zA-Z0-9_\-\.]*$/).test(instance.path)) {
      // Go to and store an agent details
      $currentDataService.setCurrentAgent(item.id)
      $currentDataService.addFilter(`{"agent.id":"${item.id}", "implicit":true}`)
      $navigationService.storeRoute('agents')
      $state.go('agent-overview', { id: item.id })
    } else if (instance.path === '/agents/groups') {
      $scope.$emit('wazuhShowGroup', { group: item })
    } else if (new RegExp(/^\/agents\/groups\/[a-zA-Z0-9_\-\.]*\/files$/).test(instance.path)) {
      $scope.$emit('wazuhShowGroupFile', { groupName: instance.path.split('groups/')[1].split('/files')[0], fileName: item.filename })
    } else if (instance.path === '/rules') {
      $state.go('mg-rules-id', { id: item.id })
    } else if (instance.path.includes('/decoders')) {
      $state.go('mg-decoders-id', { file: item.file, name: item.name })
    } else if (instance.path === '/cluster/nodes') {
      $scope.$emit('wazuhShowClusterNode', { node: item })
    }
  }
})