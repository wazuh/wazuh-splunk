/*
 * Wazuh app - Logs view controller
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
  "splunkjs/mvc",
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/SplunkAppForWazuh/js/directives/tableView.js",
  "/static/app/SplunkAppForWazuh/js/services/apiService.js",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/directives/selectedCredentialsDirective.js"

],
  function (
    mvc,
    $,
    LayoutView,
    tableView,
    ApiService,
    CredentialService,
    Toast,
    SelectedCredentials
  ) {

    /**
     * Check connection before load the content
     */
    CredentialService.checkSelectedApiConnection().then(({api}) => {
      SelectedCredentials.render($('#selectedCredentials'))

      const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading manager logs list', 1000, 250, 250)

      /**
       * Initializes Manager Logs table
       */
      const initializeManagerLogs = async () => {
        try {
          const opts = {
            pages: 10,
            processing: true,
            serverSide: true,
            filterVisible: false,
            columns: [
              { "data": "timestamp", 'orderable': true, defaultContent: "-" },
              { "data": "tag", 'orderable': true, defaultContent: "-" },
              { "data": "description", 'orderable': true, defaultContent: "-" },
              { "data": "level", 'orderable': true, defaultContent: "-" }
            ]
          }
          const table = new tableView()
          table.element($('#myLogTable'))
          table.build('/manager/logs?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi, opts)
        } catch (err) {
          errorToast.show()
        }
      }

      /**
       * When document ready load initialize manager method
       */
      $(document).ready(() => initializeManagerLogs())

      $('header').remove()
      new LayoutView({ "hideFooter": false, "hideChrome": false, "hideSplunkBar": false, "hideAppBar": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/settings' })
  }
)