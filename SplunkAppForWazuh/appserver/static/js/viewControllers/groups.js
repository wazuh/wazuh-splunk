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
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/directives/selectedCredentialsDirective.js"

],
  function (
    mvc,
    $,
    LayoutView,
    tableView,
    CredentialService,
    ApiService,
    Toast,
    SelectedCredentials
  ) {

    const errorToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)
    const errorClickToast = new Toast('error', 'toast-bottom-right', 'Error at clicking on row', 1000, 250, 250)
    CredentialService.checkSelectedApiConnection().then(({ api }) => {
      SelectedCredentials.render($('#selectedCredentials'), api.filter[1])

      const tableFiles = new tableView()
      const tableAgents = new tableView()

      /**
       * Click on a file for showing the content
       * @param {object} data 
       * @param {String} groupName 
       */
      const clickOnFile = async (data, groupName) => {
        try {
          $('#row2').hide(200)
          $('#closeContent').click((e) => {
            $('#row3').hide(200)
            $('#row2').show(200)
          })

          if (data && groupName && groupName !== "") {
            const endPointFileContent = '/agents/filescontent?id=' + groupName + '&filename=' + data.filename + '&ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
            const dataFile = await ApiService.get(endPointFileContent)
            $('#precode').empty()
            $('#precode').prepend('<pre style="height: 100%" class="wz-pre json-beautifier jsonbeauty scroll "><code>' + JSON.stringify(dataFile, null, 2) + '</code></pre>')
            $('#row3').show(200)
          }
        } catch (err) {
          errorClickToast.show()
        }
      }


      /**
       * Click on a row containing a group
       * @param {object} data Clicked row data
       */
      const clickOnGroup = async (data) => {
        try {
          if (data) {
            $('#row1').removeClass('wz-dashboard-panel-table')
            $('#row1').removeClass('wz-dashboard-cell')
            $('#row1').removeClass('wz-margin-5')
            // Empty groups table
            $('#row1').empty()
            // Hide files table
            $('#panel2').hide()
            // Fill row 1 with information panels
            $('#row1').html(
              `<div id='thirdRow' class="wz-margin-top-10  wz-flex-container wz-flex-row wz-align-stretch">
                <div class="wz-dashboard-cell wz-width-49 wz-margin-left-5 wz-margin-right-24 {
                  margin-right: 10px;
                }">
                  <div class="wz-dashboard-panel-table">
                    <div id='managerInfo' class="panel-body">
                      <div class="wz-flex-container wz-flex-row">
                        <h4 class="wz-headline-title">Default</h4>
                      </div>
                      <hr style='margin-top:-5px'>
                      <div class="wz-flex-container wz-flex-row">
                        <p class='wz-flex-item-50' >Configuration sum</p>
                        <p id='confSum'>${data.configSum}</p>
                      </div>
                      <div class="wz-flex-container wz-flex-row">
                        <p class='wz-flex-item-50'>Merged sum</p>
                        <p id='mergedSum'>${data.mergedSum}</p>
                      </div>
                    </div>
                  </div>
                </div>
                    
                <div class="wz-dashboard-cell wz-width-49">
                  <div class="wz-dashboard-panel-table">
                    <div id='managerInfo' class="panel-body">
                      <!-- Place panel contents here -->
                      <div class="wz-flex-container wz-flex-row">
                        <h4 class="wz-headline-title">Details</h4>
                      </div>
                      <hr style='margin-top:-5px'>
                      <div class="wz-flex-container wz-flex-row">
                        <p id="viewAgents" style="font-weight: bold;" class='wz-headline-title wz-text-link wz-flex-item-50'>Agents</p>
                      </div>
                      <div class="wz-flex-container wz-flex-row">
                        <p id="viewContent" class='wz-headline-title wz-text-link wz-flex-item-50'>Content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
            )

            // If click on agents then show agents table
            $('#viewAgents').click((e) => {
              $('#viewAgents').css('font-weight', 'bold')
              $('#viewContent').css('font-weight', 'normal')
              $('#panel2').hide()
              $('#panel3').show(200)
            })

            // If click on content then show files table
            $('#viewContent').click((e) => {
              $('#viewContent').css('font-weight', 'bold')
              $('#viewAgents').css('font-weight', 'normal')
              $('#panel3').hide()
              $('#panel2').show(200)
            })

            $('#panel2').empty()
            $('#panel2').prepend('<h3>Files</h3><table id="myFilesTable" class="wz-width-100 display"><thead><tr><th>filename</th><th>hash</th></tr></thead></table>')

            tableFiles.element($('#myFilesTable'))

            // Renders both tables
            // Options for Files Group table
            const optsFiles = {
              pages: 10,
              processing: true,
              serverSide: true,
              dom: '<"top"f>rt<"bottom"ip>',
              filterVisible: false,
              columns: [
                { "data": "filename", 'orderable': true, defaultContent: "-" },
                { "data": "hash", 'orderable': true, defaultContent: "-" }
              ]
            }
            const groupName = data.name
            tableFiles.build('/agents/files?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi + '&id=' + data.name, optsFiles)
            
            tableFiles.setFilterInputMaxWidth('Filter files',100)

            const agentsUrl = '/agents/groups?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi + '&id=' + data.name
            $('#panel3').empty()
            $('#panel3').prepend('<h3>Agents</h3><table id="myAgentsGroupTable" class="wz-width-100 display"><thead><tr><th>id</th><th>name</th><th>ip</th><th>lastKeepAlive</th></tr></thead></table>')
            tableAgents.element($('#myAgentsGroupTable'))
            // Options for Agents Group table
            const optsAgentsGroup = {
              pages: 10,
              processing: true,
              dom: '<"top"f>rt<"bottom"ip>',
              serverSide: true,
              filterVisible: false,
              columns: [
                { "data": "id", 'orderable': true, defaultContent: "-" },
                { "data": "name", 'orderable': true, defaultContent: "-" },
                { "data": "ip", 'orderable': true, defaultContent: "-" },
                { "data": "lastKeepAlive", 'orderable': true, defaultContent: "-" }
              ]
            }
            tableAgents.build(agentsUrl, optsAgentsGroup)


            tableAgents.setFilterInputMaxWidth('Filter agents',100)


            tableFiles.click(data => clickOnFile(data, groupName))
            $('#row2').show(200)
          }
        } catch (err) {
          errorClickToast.show()
        }
      }
      /**
       * Initializes and loads group data
       */
      const initializeGroupsData = async () => {
        try {
          // Options for Groups table
          const optsGroups = {
            pages: 10,
            processing: true,
            serverSide: true,
            dom: '<"top"f>rt<"bottom"ip>',
            filterVisible: false,
            columns: [
              { "data": "name", 'orderable': true, defaultContent: "-" },
              { "data": "mergedSum", 'orderable': true, defaultContent: "-" }
            ]
          }

          const tableGroups = new tableView()
          tableGroups.element($('#myGroupTable'))
          tableGroups.build('/manager/groups?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi, optsGroups)
          tableGroups.setFilterInputMaxWidth('Filter groups',100)

          $('#row2').hide()
          $('#row3').hide()
          tableGroups.click(data => clickOnGroup(data))
        } catch (err) {
          errorToast.show()
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
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/settings' })
  }
)