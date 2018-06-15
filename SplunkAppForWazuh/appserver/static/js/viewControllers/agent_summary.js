/*
 * Wazuh app - Overview agent summary controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

require([
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/SplunkAppForWazuh/js/directives/agentsTable.js",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/services/apiService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/directives/selectedCredentialsDirective.js"

],
  function (
    $,
    LayoutView,
    agentsTable,
    CredentialService,
    ApiService,
    Toast,
    SelectedCredentials

  ) {

    const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading agent list', 1000, 250, 250)

    CredentialService.checkSelectedApiConnection().then(({api}) => {

      /**
       * Initializes agent table and data from API
       */
      const initializeData = async () => {
        try {

          const data = await Promise.all([
            ApiService.get('/agents/summary?ip='+api.url+'&port='+api.portapi+'&pass='+api.passapi+'&user='+api.userapi)
          ])
          $('#activeUsers').text(data[0][0].agent_summary_active)
          $('#neverConnected').text(data[0][0].agent_summary_neverconnected)
          $('#disconnectedUsers').text(data[0][0].agent_summary_disconnected)
          $('#agentsCoverage').text(round((data[0][0].agent_summary_active / data[0][0].agent_summary_total * 100)))

          SelectedCredentials.render($('#selectedCredentials'),api.filter[1])
          const baseUrl = ApiService.getBaseUrl()
          const urlData = {
            baseUrl: baseUrl,
            ipApi: api.url,
            portApi: api.portapi,
            userApi: api.userapi,
            passApi: api.passapi
          }
          const table = new agentsTable($('#row1'))
          table.build(urlData)
        } catch (err) {
          errorToast.show()
        }
      }

      /**
       * On document ready load agent table
       */
      $(document).ready(() => initializeData())

      // $('header').remove()
      new LayoutView({ "hideFooter": false, "hideChrome": false, "hideSplunkBar": false, "hideAppBar": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])

    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/settings' })
  }
)

