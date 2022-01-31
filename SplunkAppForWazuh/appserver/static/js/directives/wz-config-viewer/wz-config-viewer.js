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
define(["../module", "../../libs/codemirror-conv/lib/codemirror"], function (
  app,
  CodeMirror
) {
  "use strict"
  class WzConfigViewer {
    /**
     * Class constructor
     */
    constructor(BASE_URL) {
      this.restrict = "E"
      this.scope = {
        getjson: "&",
        getxml: "&",
        jsoncontent: "=",
        xmlcontent: "=",
        hideHeader: "=",
        noLocal: "=",
      }
      this.templateUrl =
        BASE_URL +
        "/static/app/SplunkAppForWazuh/js/directives/wz-config-viewer/wz-config-viewer.html"
    }

    controller($scope, $document) {
      let isLogs = false

      const setJsonBox = () => {
        $scope.jsonCodeBox = CodeMirror.fromTextArea(
          $document[0].getElementById("viewer_json_box"),
          {
            lineNumbers: true,
            autoRefresh: true,
            matchClosing: true,
            matchBrackets: true,
            mode: { name: "javascript", json: true },
            readOnly: true,
            theme: "ttcn",
            foldGutter: true,
            styleSelectedText: true,
            gutters: ["CodeMirror-foldgutter"],
          }
        )
      }

      const setXmlBox = () => {
        $scope.xmlCodeBox = CodeMirror.fromTextArea(
          $document[0].getElementById("viewer_xml_box"),
          {
            lineNumbers: true,
            autoRefresh: true,
            lineWrapping: true,
            matchClosing: true,
            matchBrackets: true,
            mode: "text/xml",
            readOnly: true,
            theme: "ttcn",
            foldGutter: true,
            styleSelectedText: true,
            gutters: ["CodeMirror-foldgutter"],
          }
        )
        bindXmlListener()
      }

      const bindXmlListener = () => {
        const scrollElement = $scope.xmlCodeBox.getScrollerElement()
        $(scrollElement).bind("scroll", function (e) {
          var element = $(e.currentTarget)[0]
          if (
            element.scrollHeight - element.scrollTop ===
            element.clientHeight
          ) {
            $scope.$emit("scrolledToBottom", {
              lines: $scope.xmlCodeBox.lineCount(),
            })
          }
        })
      }

      const getPosition = (element) => {
        var xPosition = 0
        var yPosition = 0

        while (element) {
          xPosition +=
            element.offsetLeft - element.scrollLeft + element.clientLeft
          yPosition += element.offsetTop - element.scrollTop + element.clientTop
          element = element.offsetParent
        }

        return { x: xPosition, y: yPosition }
      }

      const dynamicHeight = () => {
        setTimeout(function () {
          const editorContainer = $(".wzConfigViewer")
          const windows = $(window).height()
          const offsetTop = getPosition(editorContainer[0]).y
          const bottom = isLogs ? 50 : 20
          const headerContainer = $(".wzXmlEditorHeader")
          const headerContainerHeight = headerContainer.height()
            ? headerContainer.height() + 20
            : isLogs
            ? 0
            : 70
          editorContainer.height(windows - (offsetTop + bottom))
          $(".wzJsonXmlEditorBody .CodeMirror").height(
            windows - (offsetTop + bottom + headerContainerHeight)
          )
        }, 1)
      }

      const init = () => {
        $(".wzConfigViewer").height(0)
        dynamicHeight()
      }

      const refreshJsonBox = (json) => {
        $scope.jsoncontent = json
        if (!$scope.jsonCodeBox) {
          setJsonBox()
        }
        if ($scope.jsoncontent != false) {
          $scope.jsonCodeBox.setValue($scope.jsoncontent.replace(/\\\\/g, "\\"))
          setTimeout(function () {
            $scope.jsonCodeBox.refresh()
            $scope.$applyAsync()
            window.dispatchEvent(new Event("resize"))
          }, 300)
        }
      }

      const refreshXmlBox = (xml, logs) => {
        isLogs = logs
        $scope.xmlcontent = xml
        if (!$scope.xmlCodeBox) {
          setXmlBox()
        }
        if ($scope.xmlcontent != false) {
          $scope.xmlCodeBox.setValue($scope.xmlcontent)
          setTimeout(function () {
            $scope.xmlCodeBox.refresh()
            $scope.$applyAsync()
            isLogs ? dynamicHeight() : window.dispatchEvent(new Event("resize")) // eslint-disable-line
          }, 300)
        }
      }

      $scope.callgetjson = () => $scope.getjson()

      $scope.callgetxml = () => $scope.getxml()

      $scope.$on("JSONContentReady", (ev, params) => {
        refreshJsonBox(params.data)
      })

      $scope.$on("XMLContentReady", (ev, params) => {
        refreshXmlBox(params.data, params.logs)
      })

      $(window).on("resize", function () {
        dynamicHeight()
      })

      init()
    }
  }

  app.directive("wzConfigViewer", (BASE_URL) => new WzConfigViewer(BASE_URL))
})
