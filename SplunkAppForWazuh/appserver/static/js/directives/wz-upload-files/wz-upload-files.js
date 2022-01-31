/*
 * Wazuh app - Wazuh upload files directive
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(["../module", "Dropzone"], function (app, Dropzone) {
  "use strict"
  app.directive("wzUploadFiles", function (BASE_URL) {
    return {
      restrict: "E",
      scope: {
        uploadTitle: "@uploadTitle",
        allowedExtensions: "=allowedExtensions",
        refreshList: "&",
        resource: "@resource",
      },
      controller($scope, $currentDataService) {
        $scope.noFilesAdded = true
        var previewNode = document.querySelector("#template")
        previewNode.id = ""
        var previewTemplate = previewNode.parentNode.innerHTML
        setTimeout(() => {
          previewNode.parentNode.innerHTML = ""
        }, 250)

        const apiId = $currentDataService.getApi()
        const currentApi = apiId["_key"]

        $scope.myDropzone = new Dropzone("#myDropzone", {
          url: `en-us/custom/SplunkAppForWazuh/manager/upload_file?apiId=${currentApi}&resource=${$scope.resource}`,
          autoProcessQueue: false,
          parallelUploads: 5,
          maxFiles: 5,
          previewTemplate: previewTemplate,
          previewsContainer: "#previews",
          acceptedFiles: $scope.allowedExtensions,
          method: "POST",
        })

        $scope.removeAllFiles = () => {
          $scope.myDropzone.removeAllFiles(true)
          $scope.noFilesAdded = true
        }

        $scope.uploadAllFiles = () => {
          if ($scope.myDropzone.files.length > 0) {
            $scope.myDropzone.processQueue()
            $scope.noFilesAdded = false
          }
        }

        $scope.myDropzone.on("success", function (file, message) {
          message = JSON.parse(message)
          if (file.previewElement) {
            file.previewElement.classList.add("dz-error")

            for (
              var _iterator7 = file.previewElement.querySelectorAll(
                  "[data-dz-errormessage]"
                ),
                _isArray7 = Array.isArray(_iterator7),
                _i7 = 0,
                _iterator7 = _isArray7
                  ? _iterator7
                  : _iterator7[Symbol.iterator]();
              ;

            ) {
              var _ref6

              if (_isArray7) {
                if (_i7 >= _iterator7.length) break
                _ref6 = _iterator7[_i7++]
              } else {
                _i7 = _iterator7.next()
                if (_i7.done) break
                _ref6 = _i7.value
              }

              var node = _ref6

              if (message.status === "200") {
                node.classList.add("wz-success-message")
              } else {
                node.classList.add("wz-error-message")
              }
              node.textContent = message.text || "Unknown error"
            }
          }
        })

        $scope.myDropzone.on("error", function (file, jsonResponse) {
          var errorMessage = "Could not upload document: "
          if (jsonResponse["ValidationMessage"] != null) {
            $scope.errorMessage += jsonResponse["ValidationMessage"]
          } else {
            $scope.errorMessage += "unknown error"
          }
        })

        $scope.myDropzone.on("removedfile", function (file) {
          if ($scope.myDropzone.files.length === 0) {
            $scope.noFilesAdded = true
            $scope.$applyAsync()
          }
        })
      },
      templateUrl:
        BASE_URL +
        "/static/app/SplunkAppForWazuh/js/directives/wz-upload-files/wz-upload-files.html",
    }
  })
})
