/*
 * Wazuh app - Dev tools controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define([
  '../module',
  'jquery',
  '../../libs/codemirror-conv/lib/codemirror',
  '../../libs/codemirror-conv/json-lint',
  '../../libs/codemirror-conv/javascript',
  '../../libs/codemirror-conv/brace-fold',
  '../../libs/codemirror-conv/foldcode',
  '../../libs/codemirror-conv/foldgutter',
  '../../libs/codemirror-conv/search-cursor',
  '../../libs/codemirror-conv/mark-selection',
  '../../libs/codemirror-conv/show-hint',
  '../../libs/codemirror-conv/querystring-browser/bundle',
  '../../utils/excluded-devtools-autocomplete-keys',
  'FileSaver'
], function(
  app,
  $,
  CodeMirror,
  jsonLint,
  javascript,
  braceFold,
  foldcode,
  foldgutter,
  searchCursor,
  markSeletion,
  showHint,
  queryString,
  ExcludedIntelliSenseTriggerKeys
) {
  'use strict'
  class ConfigToolsController {
    /**
     * Constructor
     * @param {*} $scope
     * @param {*} $requestService,
     * @param {*} $window
     * @param {*} appState
     * @param {*} $notificationService
     * @param {*} $document
     * @param {*} isAdmin
     */
    constructor(
      $scope,
      $requestService,
      $window,
      $navigationService,
      $notificationService,
      $document,
      isAdmin
    ) {
      this.$scope = $scope
      this.request = $requestService
      this.$window = $window
      this.appState = $navigationService
      this.notification = $notificationService
      this.$document = $document
      this.configurationInput = ""
      this.admin = isAdmin

      $scope.testConfig = () => this.testConfig()
    }

    /**
     * When controller loads
     */
    $onInit() {
      try {

        this.configurationInput = CodeMirror.fromTextArea(
          this.$document[0].getElementById('config_input'),
          {
            lineNumbers: true,
            lineWrapping: true,
            matchClosing: true,
            matchBrackets: true,
            mode: 'text/xml',
            theme: 'ttcn',
            foldGutter: true,
            styleSelectedText: true,
            gutters: ['CodeMirror-foldgutter'],
          }
        )

        setInterval(this.saveConfig, 5000); // Save configuration on session every 5 seconds
        

        this.initConfigBox()
      } catch (error) {
        this.notification.showErrorToast(error)
      }
    }

    testConfig(){
      console.log("test configuration")
    }


    saveConfig(){
      console.log("save config")
    }

    initConfigBox() {
      this.configurationInput.setValue(`<!--
    Test here your configuration.
    More info at: https://documentation.wazuh.com
-->\n`)
      setTimeout(() => {
        this.configurationInput.refresh()
      }, 1)
    }

   
    
  }
  app.controller('configToolsCtrl', ConfigToolsController)
})
