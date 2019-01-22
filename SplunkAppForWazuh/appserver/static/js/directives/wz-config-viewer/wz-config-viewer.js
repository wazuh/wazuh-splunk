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
define(['../module'], function(app) {
  'use strict'
  class WzConfigViewer {
    /**
     * Class constructor
     */
    constructor() {
      this.restrict = 'E'
      this.scope = {
        getjson: '&',
        getxml: '&',
        jsoncontent: '=jsoncontent',
        xmlcontent: '=xmlcontent'
      }
      this.replace = true
      this.templateUrl =
        BASE_URL +
        '/static/app/SplunkAppForWazuh/js/directives/wz-config-viewer/wz-config-viewer.html'
    }

    link(scope) {
      scope.callgetjson = () => {
        scope.getjson()
      }
      scope.callgetxml = () => scope.getxml()
    }
  }

  app.directive('wzConfigViewer', BASE_URL => new WzConfigViewer(BASE_URL))
})
