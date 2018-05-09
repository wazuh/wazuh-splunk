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
  "/static/app/wazuh/js/customViews/tableView.js",
  "/static/app/wazuh/js/utilLib/services.js",
  "/static/app/wazuh/js/customViews/toaster.js",
  "/static/app/wazuh/js/utilLib/promisedReq.js"
],
  function (
    mvc,
    $,
    LayoutView,
    tableView,
    services,
    Toast,
    promisedReq
  ) {

    const service = new services()
    service.checkConnection().then(() => {

      const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading manager logs list', 1000, 250, 250)

      /**
       * Initializes Manager Logs table
       */
      const initializeManagerLogs = async () => {
        try {
          const { baseUrl, jsonData } = await service.loadCredentialData()
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
          table.build(baseUrl + '/custom/wazuh/manager/logs?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi, opts)
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
    }).catch((err) => { window.location.href = '/en-US/app/wazuh/API' })

  }
)