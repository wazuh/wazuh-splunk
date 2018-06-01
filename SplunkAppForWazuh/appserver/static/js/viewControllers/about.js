/*
 * Wazuh app - Configuration view controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

require([
  "splunkjs/mvc",
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/services/promisedReq.js",
  "/static/app/SplunkAppForWazuh/js/services/apiService.js"
],
  function (
    mvc,
    $,
    LayoutView,
    credentialServices,
    Toast,
    promisedReq,
    ApiService

  ) {

    // Toast definition
    const errorConnectionToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)

    /**
     * Loads and distributes manager configuration content
     */
    const loadAboutContent = async () => {
      try {
        const versions = await ApiService.get('/manager/current_version')
        $('#wazuhVersion').text(versions[0].wazuhversion)
        $('#appVersion').text(versions[0].appversion)
        $('#appRevision').text(versions[0].apprevision)

      } catch (err) {
        errorConnectionToast.show()
        console.error(err.message || err)
      }
    }

    /**
     * On document ready load configuration content
     */
    $(document).ready(() => loadAboutContent())

    $('header').remove()
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])
  }
)