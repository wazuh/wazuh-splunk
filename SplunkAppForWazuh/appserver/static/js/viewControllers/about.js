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
  "/static/app/SplunkAppForWazuh/js/utilLib/credentialServices.js",
  "/static/app/SplunkAppForWazuh/js/customViews/toaster.js",
  "/static/app/SplunkAppForWazuh/js/utilLib/promisedReq.js"
],
  function (
    mvc,
    $,
    LayoutView,
    credentialServices,
    Toast,
    promisedReq

  ) {

    // Toast definition
    const errorConnectionToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)

    /**
     * Loads and distributes manager configuration content
     */
    const loadAboutContent = async () => {
      try {
        const baseUrl = await credentialServices.apiGet('/manager/check_version')
        // const versionData = await promisedReq.get()
        // $('#jsonOutput').text(jsonObj.global.jsonout_output)
        // $('#logAlertLevel').text(jsonObj.alerts.log_alert_level)
        // $('#nameCluster').text(jsonObj.cluster.name)
        // $('#typeCluster').text(jsonObj.cluster.node_type)
        // $('#sysFreq').text(jsonObj.syscheck.frequency)
        // $('#sysAlertNewFiles').text(jsonObj.syscheck.alert_new_files)
        // $('#rootFreq').text(jsonObj.rootcheck.frequency)
        // $('#rootSkipNFS').text(jsonObj.rootcheck.skip_nfs)
        // $('#authPurge').text(jsonObj.auth.purge)
        // $('#authForceInsert').text(jsonObj.auth.force_insert)

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