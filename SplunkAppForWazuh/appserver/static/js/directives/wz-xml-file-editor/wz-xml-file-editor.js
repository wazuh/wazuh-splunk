/*
  * Wazuh app - Wazuh XML file editor
  * Copyright (C) 2018 Wazuh, Inc.
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
  '../../libs/codemirror-conv/lib/codemirror',
  '../../libs/codemirror-conv/json-lint',
  '../../libs/codemirror-conv/javascript',
  '../../libs/codemirror-conv/brace-fold',
  '../../libs/codemirror-conv/foldcode',
  '../../libs/codemirror-conv/foldgutter',
  '../../libs/codemirror-conv/search-cursor',
  '../../libs/codemirror-conv/mark-selection',
  '../../libs/codemirror-conv/formatting',
  '../../libs/codemirror-conv/xml',
], function (
  app,
  CodeMirror
) {
    'use strict'
    app.directive('wzXmlFileEditor', function (BASE_URL) {
      return {
        restrict: 'E',
        scope: {
          loadPath: '=loadPath',
          updatePath: '=updatePath',
          fileName: '@fileName'
        },
        controller(
          $rootScope,
          $scope,
          $timeout,
          $requestService,
          $document,
          $notificationService
        ) {
          $($document[0]).ready( () => {
            $scope.xmlCodeBox = CodeMirror.fromTextArea(
              $document[0].getElementById('xml_box'),
              {
                lineNumbers: true,
                matchClosing: true,
                matchBrackets: true,
                mode: 'text/xml',
                theme: 'ttcn',
                foldGutter: true,
                styleSelectedText: true,
                gutters: ['CodeMirror-foldgutter']
              }
            )
            $scope.xmlHasErrors = false
            $scope.xmlCodeBox.on('change', () => {
              checkXmlParseError()
            })
            const checkXmlParseError = () => {
              try {
                var parser = new DOMParser()
                var xml = $scope.xmlCodeBox.getValue()
                var xmlDoc = parser.parseFromString(xml, "text/xml")
                $timeout( () => {
                  $scope.xmlHasErrors = xmlDoc.getElementsByTagName("parsererror").length > 0 ? true : false
                }, 50)
              } catch (error) {
                $notificationService.showSimpleToast(error)
              }
            }
          })

          const autoFormat = () => {
            var totalLines = $scope.xmlCodeBox.lineCount()
            $scope.xmlCodeBox.autoFormatRange({ 'line': 0, 'ch': 0 }, { line: totalLines - 1 })
            $scope.xmlCodeBox.setCursor(0)
          }

          const updateFile = async () => {
            try {
              /*const response = await $requestService(
                $scope.updatePath,
                {},
                'PUT'
              )*/
              const response = ""
              return response
            } catch (error) {
              this.apiInputBox.model = []
            }
          }

          $scope.saveFile = async () => {
            await updateFile()
          }

          const fetchFile = async () => {
            try {
              /*const xml = await this.apiReq.request(
                $scope.loadPath,
                {}
              )*/
              const xml = "<agent_config>" +
                "\n" +
                "<!-- Shared agent configuration here -->\n" +
                "\n" +
                "</agent_config>"
              return xml
            } catch (error) {
              $notificationService.showSimpleToast(error)
            }
          }

          $scope.editXmlFile = async (item, params) => {
            $scope.editingFile = true
            $scope.loadingFile = true
            $scope.targetName = params.target.name
            try {
              const xml = await fetchFile()
              $scope.xmlCodeBox.setValue(xml)
              autoFormat()
              $scope.loadingFile = false
              $timeout( () => { $scope.xmlCodeBox.refresh() }, 100)
            } catch (error) {
              $notificationService.showSimpleToast(error)
            }
          }
          $rootScope.$on('editXmlFile', (item, params) => $scope.editXmlFile(item, params))
          $rootScope.$on('closeEditXmlFile', () => $scope.editingFile = false)
        },
        templateUrl: BASE_URL +
          '/static/app/SplunkAppForWazuh/js/directives/wz-xml-file-editor/wz-xml-file-editor.html'
      }
    })
  })
