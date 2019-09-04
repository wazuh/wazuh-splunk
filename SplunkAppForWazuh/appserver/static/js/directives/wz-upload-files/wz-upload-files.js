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
      },
      controller($scope) {
        $scope.myDropzone = new Dropzone("#myDropzone", { url: "/file/post", autoProcessQueue: false, addRemoveLinks: true, parallelUploads: 10})

      },
      templateUrl:
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-upload-files/wz-upload-files.html'
    }
  })
})
