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

define(['../module','Dropzone'], function(app,Dropzone) {
  'use strict'
  app.directive('wzUploadFiles', function(BASE_URL) {
    return {
      restrict: 'E',
      scope: {
        uploadTitle: '@uploadTitle'
      },
      controller($scope) {
        $scope.noFilesAdded = true
        var previewNode = document.querySelector("#template");
        previewNode.id = "";
        var previewTemplate = previewNode.parentNode.innerHTML;
        setTimeout(() => {
          previewNode.parentNode.innerHTML = ""
        }, 250)

        $scope.myDropzone = new Dropzone("#myDropzone",{
          url: "en-us/custom/SplunkAppForWazuh//manager/upload_file",
          autoProcessQueue: false,
          parallelUploads: 5,
          maxFiles: 5,
          previewTemplate: previewTemplate,
          previewsContainer: "#previews",
        })


        $scope.removeAllFiles = () => {
          var elem = document.getElementById("uploadProgressBar")
          elem.style.width = '0%'
          $scope.myDropzone.removeAllFiles(true)
          $scope.noFilesAdded = true;
        }

          $scope.uploadAllFiles = () => {
            if($scope.myDropzone.files.length > 0){
              $scope.myDropzone.processQueue()
              $scope.noFilesAdded = false
              var elem = document.getElementById("uploadProgressBar");  
              if(elem.style.width !== '100%'){
                var width = 0;
                var id = setInterval(frame, 10);
                  function frame() {
                    if (width >= 100) {
                      clearInterval(id);
                    } else {
                      width+=1; 
                      elem.style.width = width + '%'; 
                      elem.innerHTML = width * 1  + '%';
                    }
                  }
              }
            }            
          }

          $scope.myDropzone.on("error", function (file, jsonResponse) {
            var errorMessage = "Could not upload document: ";
            if (jsonResponse["ValidationMessage"] != null) {
                errorMessage += jsonResponse["ValidationMessage"];
            } else {
                errorMessage += "unknown error";
            }
        });
        $scope.myDropzone.on("removedfile", function (file) {
          if($scope.myDropzone.files.length === 0){
            $scope.noFilesAdded = true
            var elem = document.getElementById("uploadProgressBar")
            elem.style.width = '0%'
            $scope.$applyAsync()
          }
        });

        
      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-upload-files/wz-upload-files.html'
    }
  })
})
