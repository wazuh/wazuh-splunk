/*
 * Wazuh app - Configuration view controller
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
  "underscore",
  "jquery",
  "splunkjs/mvc/layoutview"
],
  function (
    mvc,
    _,
    $,
    LayoutView

  ) {

    const service = mvc.createService({ owner: "nobody" });
    $(document).ready( () => {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done( (data) => {
        const jsonData = JSON.parse(data)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        const endPoint = baseUrl + '/custom/wazuh/agents/info?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=001'
        $.get(endPoint, data => {
          const parsedJson = JSON.parse(data)
          console.log('parsedData',parsedJson)
        }).fail( () => {
          console.error('error at fetching agent info')
        })
      })
    })


    $('header').remove();
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0]);

  }
);