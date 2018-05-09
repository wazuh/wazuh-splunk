/*
 * Wazuh app - Groups view controller
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
    const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)
    service.checkConnection().then(() => {

      /**
       * Initializes and loads group data
       */
      const initializeGroupsData = async () => {
        try {
          const { baseUrl, jsonData } = await service.loadCredentialData()

          // Options for Groups table
          const optsGroups = {
            pages: 10,
            processing: true,
            serverSide: true,
            filterVisible: false,
            columns: [
              { "data": "name", 'orderable': true, defaultContent: "-" },
              { "data": "merged_sum", 'orderable': true, defaultContent: "-" }
            ]
          }
          // Options for Agents Group table
          const optsAgentsGroup = {
            pages: 10,
            processing: true,
            serverSide: true,
            filterVisible: false,
            columns: [
              { "data": "id", 'orderable': false, defaultContent: "-" },
              { "data": "name", 'orderable': false, defaultContent: "-" },
              { "data": "ip", 'orderable': false, defaultContent: "-" },
              { "data": "last_keepalive", 'orderable': false, defaultContent: "-" }
            ]
          }

          // Options for Files Group table
          const optsFiles = {
            pages: 10,
            processing: true,
            serverSide: true,
            filterVisible: false,
            columns: [
              { "data": "filename", 'orderable': true, defaultContent: "-" },
              { "data": "hash", 'orderable': true, defaultContent: "-" }
            ]
          }
          const tableGroups = new tableView()
          tableGroups.element($('#myGroupTable'))
          tableGroups.build(baseUrl + '/custom/wazuh/manager/groups?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi, optsGroups)
          $('#row2').hide()
          $('#row3').hide()
          const tableFiles = new tableView()
          tableFiles.element($('#myFilesTable'))
          const tableAgents = new tableView()
          tableAgents.element($('#myAgentsGroupTable'))
          tableGroups.click(data => {
            console.log('data', data, ' ', typeof data)
            const groupName = data.name
            tableFiles.build(baseUrl + '/custom/wazuh/agents/files?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + data.name, optsFiles)
            const agentsUrl = baseUrl + '/custom/wazuh/agents/groups?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + data.name
            const parsedData = await promisedReq.promisedGet(baseUrl + '/custom/wazuh/agents/check_agents_groups?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + data.name)
            if (parsedData && !parsedData.error && parsedData.data && parsedData.data.items && parsedData.data.items.length > 0 && parsedData.data.totalItems) {
              $('#panel3').empty()
              $('#panel3').prepend('<h3>Agents</h3><table id="myAgentsGroupTable" class="display compact"><thead><tr><th>id</th><th>name</th><th>ip</th><th>last_keepalive</th></tr></thead></table>')
              tableAgents.element($('#myAgentsGroupTable'))
              tableAgents.build(agentsUrl, optsAgentsGroup)
            }
            else {
              $('#panel3').empty()
              $('#panel3').html('<p>No agents were found in this group.</p>')

            }

            tableFiles.click(data => {
              const data = await promisedReq.promisedGet(baseUrl + '/custom/wazuh/agents/filescontent?id=' + groupName + '&filename=' + data.filename + '&ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi)
              $('#precode').empty()
              $('#precode').prepend('<pre style="height: 100%" class="wz-pre json-beautifier jsonbeauty scroll "><code>' + data + '</code></pre>')
              $('#row3').show(200)
            })
            $('#row2').show(200)
          })
        } catch (err) {
          errorToast.show()
          console.error(err)
        }
      }

      $(document).ready(() => initializeGroupsData())

      $('header').remove()
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])
    }).catch((err) => { window.location.href = '/en-US/app/wazuh/API' })

  }
)