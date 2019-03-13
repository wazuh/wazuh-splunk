/*
 * Wazuh app - Wazuh config viewer directive
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(['../module', '../../libs/codemirror-conv/lib/codemirror'], function(
  app,
  CodeMirror
) {
  'use strict'
  class WzConfigViewer {
    /**
     * Class constructor
     */
    constructor(BASE_URL) {
      this.restrict = 'E'
      this.scope = {
        getjson: '&',
        getxml: '&',
        jsoncontent: '=',
        xmlcontent: '=',
        hideHeader: '='
      }
      this.templateUrl =
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-config-viewer/wz-config-viewer.html'
    }

    controller($scope, $document) {
      const setJsonBox = () => {
        $scope.jsonCodeBox = CodeMirror.fromTextArea(
          $document[0].getElementById('viewer_json_box'),
          {
            lineNumbers: true,
            autoRefresh: true,
            matchClosing: true,
            matchBrackets: true,
            mode: { name: 'javascript', json: true },
            readOnly: true,
            theme: 'ttcn',
            foldGutter: true,
            styleSelectedText: true,
            gutters: ['CodeMirror-foldgutter']
          }
        )
      }

      const setXmlBox = () => {
        $scope.xmlCodeBox = CodeMirror.fromTextArea(
          $document[0].getElementById('viewer_xml_box'),
          {
            lineNumbers: true,
            autoRefresh: true,
            lineWrapping: true,
            matchClosing: true,
            matchBrackets: true,
            mode: 'text/xml',
            readOnly: true,
            theme: 'ttcn',
            foldGutter: true,
            styleSelectedText: true,
            gutters: ['CodeMirror-foldgutter']
          }
        )
        bindXmlListener()
      }

      const bindXmlListener = () => {
        const scrollElement = $scope.xmlCodeBox.getScrollerElement()
        $(scrollElement).bind('scroll', function(e) {
          var element = $(e.currentTarget)[0]
          if (
            element.scrollHeight - element.scrollTop ===
            element.clientHeight
          ) {
            $scope.$emit('scrolledToBottom', {
              lines: $scope.xmlCodeBox.lineCount()
            })
          }
        })
      }

      const init = () => {}

      const refreshJsonBox = json => {
        $scope.jsoncontent = json
        if (!$scope.jsonCodeBox) {
          setJsonBox()
        }
        if ($scope.jsoncontent != false) {
          $scope.jsonCodeBox.setValue($scope.jsoncontent.replace(/\\\\/g, '\\'))
          setTimeout(function() {
            $scope.jsonCodeBox.refresh()
            $scope.$applyAsync()
          }, 300)
        }
      }

      const refreshXmlBox = xml => {
        $scope.xmlcontent = xml
        if (!$scope.xmlCodeBox) {
          setXmlBox()
        }
        if ($scope.xmlcontent != false) {
          $scope.xmlCodeBox.setValue($scope.xmlcontent)
          setTimeout(function() {
            $scope.xmlCodeBox.refresh()
            $scope.$applyAsync()
          }, 300)
        }
      }

      $scope.callgetjson = () => $scope.getjson()

      $scope.callgetxml = () => $scope.getxml()

      $scope.$on('JSONContentReady', (ev, params) => {
        refreshJsonBox(params.data)
      })

      $scope.$on('XMLContentReady', (ev, params) => {
        refreshXmlBox(params.data)
      })

      init()
    }
  }

  app.directive('wzConfigViewer', BASE_URL => new WzConfigViewer(BASE_URL))
})
