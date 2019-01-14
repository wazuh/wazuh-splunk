/*
 * Wazuh app - Configuration handler class
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
/* import js2xmlparser from 'js2xmlparser'
import XMLBeautifier from './xml-beautifier'
*/

define([
  './query-config',
  './remove-hash-key',
  '../services/xml-beautifier/xml-beautifier',
  'js2xmlparser'
], function(queryConfig, objectWithoutProperties, XMLBeautifier, js2xmlparser) {
  'use strict'

  return class ConfigurationHandler {
    constructor($requestService, beautifier, errorHandler) {
      this.apiReq = $requestService
      this.errorHandler = errorHandler
      this.beautifier = beautifier
    }

    buildIntegrations(list, $scope) {
      if (!list || !list.length) return
      for (const integration of list)
        $scope.integrations[integration.name] = integration
    }

    /**
     * Switchs between configuration tabs
     * @param {string} configurationTab The configuration tab to open
     * @param {Array<object>} sections Array that includes sections to be fetched
     */
    async switchConfigTab(configurationTab, sections, $scope, agentId = false) {
      try {
        $scope.load = true
        $scope.currentConfig = null
        $scope.XMLContent = false
        $scope.JSONContent = false
        $scope.configurationSubTab = false
        $scope.configurationTab = configurationTab
        const currentConfigReq = await queryConfig(
          agentId || '000',
          sections,
          this.apiReq
        )
        $scope.currentConfig = currentConfigReq
        if (sections[0].component === 'integrator') {
          this.buildIntegrations(
            $scope.currentConfig['integrator-integration'].integration,
            $scope
          )
        } else if (sections[0].component === 'logcollector') {
          const logcollector =
            currentConfigReq['logcollector-localfile'].localfile
          logcollector.map(log => {
            const keys = Object.keys(log)
            if (
              !keys.includes('file') &&
              !keys.includes('alias') &&
              !keys.includes('command')
            ) {
              log.file = `${log.logformat} - ${log.target[0]}`
            }
          })
          $scope.integrations = {}
        } else {
          $scope.integrations = {}
        }
        $scope.load = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        this.errorHandler.showSimpleToast(error, 'Manager')
        $scope.load = false
      }
      return
    }

    /**
     * Switchs to a wodle section
     * @param {string} wodleName The wodle to open
     */
    async switchWodle(wodleName, $scope, agentId = false) {
      try {
        $scope.load = true
        $scope.currentConfig = null
        $scope.XMLContent = false
        $scope.JSONContent = false
        $scope.configurationSubTab = false
        $scope.configurationTab = wodleName

        $scope.currentConfig = await queryConfig(
          agentId || '000',
          [{ component: 'wmodules', configuration: 'wmodules' }],
          this.apiReq
        )

        // Filter by provided wodleName
        let result = []
        if (
          wodleName &&
          $scope.currentConfig &&
          $scope.currentConfig['wmodules-wmodules'] &&
          $scope.currentConfig['wmodules-wmodules'].wmodules
        ) {
          result = $scope.currentConfig['wmodules-wmodules'].wmodules.filter(
            item => typeof item[wodleName] !== 'undefined'
          )
        }

        if (result.length) {
          $scope.currentConfig =
            wodleName === 'command'
              ? { commands: result.map(item => item.command) }
              : result[0]
        }

        $scope.load = false
        if (!$scope.$$phase) $scope.$digest()
      } catch (error) {
        this.errorHandler.showSimpleToast(error, 'Manager')
        $scope.load = false
      }
      return
    }

    /**
     * Switchs between configuration tabs
     * @param {*} configurationTab
     */
    switchConfigurationTab(configurationTab, $scope) {
      $scope.selectedItem = 0
      $scope.currentConfig = null
      $scope.XMLContent = false
      $scope.JSONContent = false
      $scope.configurationSubTab = false
      $scope.configurationTab = configurationTab
      if (!$scope.$$phase) $scope.$digest()
    }

    /**
     * Switchs between configuration sub-tabs
     * @param {*} configurationSubTab
     */
    switchConfigurationSubTab(configurationSubTab, $scope) {
      $scope.selectedItem = 0
      $scope.XMLContent = false
      $scope.JSONContent = false
      $scope.configurationSubTab = configurationSubTab
      if (!$scope.$$phase) $scope.$digest()
    }

    /**
     * Assigns XML raw content for specific configuration
     * @param {object} config Raw content to show in XML
     */
    getXML($scope) {
      const config = {}
      Object.assign(config, $scope.currentConfig)
      $scope.JSONContent = false
      if ($scope.XMLContent) {
        $scope.XMLContent = false
      } else {
        try {
          const cleaned = objectWithoutProperties(config)
          $scope.XMLContent = XMLBeautifier(js2xmlparser(cleaned))
        } catch (error) {
          $scope.XMLContent = false
        }
      }
      if (!$scope.$$phase) $scope.$digest()
    }

    /**
     * Assigns JSON raw content for specific configuration
     * @param {object} config Raw content to show in JSON
     */
    getJSON($scope) {
      const config = {}
      Object.assign(config, $scope.currentConfig)
      $scope.XMLContent = false
      if ($scope.JSONContent) {
        $scope.JSONContent = false
      } else {
        try {
          const cleaned = objectWithoutProperties(config)
          $scope.JSONContent = this.beautifier.prettyPrint(cleaned)
        } catch (error) {
          $scope.JSONContent = false
        }
      }
      if (!$scope.$$phase) $scope.$digest()
    }

    reset($scope) {
      $scope.currentConfig = null
      $scope.configurationTab = ''
      $scope.configurationSubTab = ''
      $scope.integrations = {}
      $scope.selectedItem = 0
    }
  }
})
