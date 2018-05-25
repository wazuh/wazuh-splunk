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
  "/static/app/SplunkAppForWazuh/js/directives/tableView.js",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/services/apiService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js"
],
  function (
    mvc,
    $,
    LayoutView,
    tableView,
    CredentialService,
    ApiService,
    Toast
  ) {

    const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)
    const errorClickToast = new Toast('error', 'toast-bottom-right', 'Error at clicking on row', 1000, 250, 250)
    CredentialService.checkSelectedApiConnection().then((api) => {

      const tableFiles = new tableView()
      const tableAgents = new tableView()

      /**
       * Click on a file for showing the content
       * @param {object} data 
       * @param {String} groupName 
       */
      const clickOnFile = async (data, groupName) => {
        try {
          const endPointFileContent = '/agents/filescontent?id=' + groupName + '&filename=' + data.filename + '&ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
          const dataFile = await ApiService.get(endPointFileContent)
          $('#precode').empty()
          $('#precode').prepend('<pre style="height: 100%" class="wz-pre json-beautifier jsonbeauty scroll "><code>' + JSON.stringify(dataFile, null, 2) + '</code></pre>')
          $('#row3').show(200)
        } catch (err) {
          console.error(err.message || err )
          errorClickToast.show()
        }
      }

      /**
       * Click on a row containing a group
       * @param {object} data Clicked row data
       */
      const clickOnGroup = async (data) => {
        try {

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
          const groupName = data.name
          tableFiles.build('/agents/files?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi + '&id=' + data.name, optsFiles)
          const agentsUrl = '/agents/groups?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi + '&id=' + data.name
          const parsedData = await ApiService.get('/agents/check_agents_groups?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi + '&id=' + data.name)
          if (parsedData && !parsedData.error && parsedData.data && parsedData.data.items && parsedData.data.items.length > 0 && parsedData.data.totalItems) {
            $('#panel3').empty()
            $('#panel3').prepend('<h3>Agents</h3><table id="myAgentsGroupTable" class="display compact"><thead><tr><th>id</th><th>name</th><th>ip</th><th>last_keepalive</th></tr></thead></table>')
            tableAgents.element($('#myAgentsGroupTable'))
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
            tableAgents.build(agentsUrl, optsAgentsGroup)
          }
          else {
            $('#panel3').empty()
            $('#panel3').html('<p>No agents were found in this group.</p>')
          }

          tableFiles.click(data => clickOnFile(data, groupName))
          $('#row2').show(200)
        } catch (err) {
          console.error(err.message || err)
          errorClickToast.show()
        }
      }
      /**
       * Initializes and loads group data
       */
      const initializeGroupsData = async () => {
        try {
          console.log("api",api)
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
          tableGroups.build('/manager/groups?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi, optsGroups)
          $('#row2').hide()
          $('#row3').hide()
          tableFiles.element($('#myFilesTable'))
          tableAgents.element($('#myAgentsGroupTable'))
          tableGroups.click(data => clickOnGroup(data))
        } catch (err) {
          errorToast.show()
          console.error(err)
        }
      }

      /**
       * On document ready load the whole stuff
       */
      $(document).ready(() => initializeGroupsData())

      $('header').remove()
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/API' })
  }
)