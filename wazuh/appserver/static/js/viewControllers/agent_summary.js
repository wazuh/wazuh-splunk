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
  "splunkjs/mvc",
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/wazuh/js/customViews/agentsTable.js"
],
  function (
    mvc,
    $,
    LayoutView,
    agentsTable
  ) {

    const service = mvc.createService({ owner: "nobody" })

    $(document).ready(() => {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done((data) => {

        // Inject DataTable
        const jsonData = JSON.parse(data)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        const urlData = {
          baseUrl: baseUrl,
          ipApi: jsonData[0].ipapi,
          portApi: jsonData[0].portapi,
          userApi: jsonData[0].userapi,
          passApi: jsonData[0].passapi
        }
        const table = new agentsTable($('#row1'))
        table.build(urlData)
      })
    })
    
    $('header').remove()
    new LayoutView({ "hideFooter": false, "hideChrome": false, "hideSplunkBar": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])
  }
)

