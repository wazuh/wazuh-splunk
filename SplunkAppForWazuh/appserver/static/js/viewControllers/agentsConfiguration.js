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
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/SplunkAppForWazuh/js/utilLib/services.js",
  "/static/app/SplunkAppForWazuh/js/customViews/toaster.js",
  "/static/app/SplunkAppForWazuh/js/utilLib/promisedReq.js",


],
  function (
    $,
    LayoutView,
    services,
    Toast,
    promisedReq

  ) {

    const service = new services()
    service.checkConnection().then(() => {

      const errorConnectionToast = new Toast('error', 'toast-bottom-right', 'Error when loading data', 1000, 250, 250)
      const handleError = err => errorConnectionToast.show()

      /**
       * Render File Integrity data with object received
       * @param {Object} data 
       */
      const fileIntegrityContent = async (data) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/fileIntegrity.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          $('#fileIntegrityDisabledView').text(data.disabled)
          $('#fileIntegrityFrequencyView').text(data.frequency)
          $('#fileIntegrityAlertNewFiles').text(data.alert_new_files)
          $('#fileIntegritySkipNFS').text(data.skip_nfs)
          $('#fileIntegrityScanOnStart').text(data.scan_on_start)
          $('#fileIntegrityScanTime').text(data.scan_time)
          $('#fileIntegrityAutoIgnore').text(data.auto_ignore)
          // $('#fileIntegrityNoDiff').text(data.nodiff)
          for (const element of data.nodiff) {
            const item = typeof element !== 'object' ? element : element.item
            $('#fileIntegrityNoDiff').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">File</p>' +
              '<p class="wz-list-child">' +
              item +
              '</p>' +
              '</div>'
            )
          }
          for (const path of data.directories) {
            $('#fileIntegrityMonitoredFiles').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">Path</p>' +
              '<p class="wz-list-child">' +
              path.path +
              '</p>' +
              '</div>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">Check all</p>' +
              '<p class="wz-list-child">' +
              path.check_all +
              '</p>' +
              '</div>'
            )
          }
          for (const ignore of data.ignore) {
            const element = typeof ignore !== 'object' ? ignore : ignore.item
            $('#fileIntegrityIgnoredFiles').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">File</p>' +
              '<p class="wz-list-child">' +
              element +
              '</p>' +
              '</div>'
            )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Policy Monitoring data with object received
       * @param {Object} data 
       */
      const policyMonitoring = async (data) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/policyMonitoring.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          $('#policyMonitoringDisabledView').text(data.disabled)
          $('#policyMonitoringBaseDirectoryView').text(data.base_directory)
          $('#policyMonitoringFrequencyView').text(data.frequency)
          $('#policyMonitoringSkipNFS').text(data.skip_nfs)
          $('#policyMonitoringScanAllFiles').text(data.scanall)
          $('#policyMonitoringChecksIf').text(data.check_if)
          $('#policyMonitoringChecksPid').text(data.check_pids)
          $('#policyMonitoringChecksFiles').text(data.check_files)
          $('#policyMonitoringChecksDev').text(data.check_dev)
          $('#policyMonitoringChecksPorts').text(data.check_ports)
          $('#policyMonitoringChecksSys').text(data.check_sys)
          $('#policyMonitoringChecksTrojans').text(data.check_trojans)
          $('#policyMonitoringChecksUnixAudit').text(data.check_unixaudit)
          $('#policyMonitoringChecksWinApps').text(data.check_winapps)

          for (let i = 0; i < data.windows_audit.length; i++) {
            const item = data.windows_audit[i] !== 'object' ? data.windows_audit[i] : data.windows_audit[i].item
            $('#policyMonitoringWinAuditFiles').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">File</p>' +
              '<p class="wz-list-child">' +
              item +
              '</p>' +
              '</div>'
            )
          }

          for (let i = 0; i < data.windows_apps.length; i++) {
            const item = data.windows_apps[i] !== 'object' ? data.windows_apps[i] : data.windows_apps[i].item
            $('#policyMonitoringWinAppsFiles').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">File</p>' +
              '<p class="wz-list-child">' +
              item +
              '</p>' +
              '</div>'
            )
          }

          for (let i = 0; i < data.windows_malware.length; i++) {
            const item = data.windows_malware[i] !== 'object' ? data.windows_malware[i] : data.windows_malware[i].item
            $('#policyMonitoringWinMalwareFiles').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">File</p>' +
              '<p class="wz-list-child">' +
              item +
              '</p>' +
              '</div>'
            )
          }

          for (let i = 0; i < data.rootkit_files.length; i++) {
            const item = data.rootkit_files[i] !== 'object' ? data.rootkit_files[i] : data.rootkit_files[i].item
            $('#policyMonitoringRootkitFiles').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">Files</p>' +
              '<p class="wz-list-child">' +
              item +
              '</p>' +
              '</div>'
            )
          }

          for (let i = 0; i < data.rootkit_trojans.length; i++) {
            const item = data.rootkit_trojans[i] !== 'object' ? data.rootkit_trojans[i] : data.rootkit_trojans[i].item
            $('#policyMonitoringRootkitTrojans').append(
              '<hr>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p class="wz-list-child">Trojans</p>' +
              '<p class="wz-list-child">' +
              item +
              '</p>' +
              '</div>'
            )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Syscollector data with object received
       * @param {Object} data 
       */
      const sysCollector = async (data) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/syscollector.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          $('#syscollectorDisabledView').text(data.disabled)
          $('#syscollectorHardwareView').text(data.hardware)
          $('#syscollectorIntervalView').text(data.interval)
          $('#syscollectorOSView').text(data.os)
          $('#syscollectorPackagesView').text(data.packages)
          $('#syscollectorScanOnStartView').text(data.scan_on_start)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render OpenSCAP data with object received
       * @param {Object} data 
       */
      const openSCAP = async (data) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/openSCAP.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          $('#openscapDisabledView').text(data.disabled)
          $('#openscapIntervalView').text(data.interval)
          $('#openscapTimeoutView').text(data.timeout)
          $('#openscapScanOnStartView').text(data['scan-on-start'])
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render CIS-CAT data with object received
       * @param {Object} data 
       */
      const cisCat = async (data) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/ciscat.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          $('#ciscatPathView').text(data.ciscat_path)
          $('#ciscatDisabledView').text(data.disabled)
          $('#ciscatIntervalView').text(data.interval)
          $('#ciscatTimeoutView').text(data.timeout)
          $('#ciscatScanOnStartView').text(data['scan-on-start'])
          $('#ciscatJavaPathView').text(data['java_path'])
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Log collection data with object received
       * @param {Array} files 
       */
      const logCollection = async (files) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/logCollection.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          for (const item of files) {
            $('#logCollectionFiles').append(
              '<hr>'
            )
            if (item["log_format"])
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Log format</p>' +
                '<p>' + item.log_format + '</p>' +
                '</div>'
              )
            if (item.location)
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Location</p>' +
                '<p>' + item.location + '</p>' +
                '</div>'
              )
            if (item.query)
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Query</p>' +
                '<p>' + item.query + '</p>' +
                '</div>'
              )
            if (item.frequency)
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Frecuency</p>' +
                '<p>' + item.frequency + '</p>' +
                '</div>'
              )
            if (item.command)
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Command</p>' +
                '<p>' + item.command + '</p>' +
                '</div>'
              )
            if (item.alias)
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Alias</p>' +
                '<p>' + item.alias + '</p>' +
                '</div>'
              )
            if (item['only-future-events'])
              $('#logCollectionFiles').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Only future events</p>' +
                '<p>' + item['only-future-events'] + '</p>' +
                '</div>'
              )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Remote commands data with object received
       * @param {Array} files 
       */
      const remoteCommands = async (files) => {
        try {
          const globalUrl = "/static/app/SplunkAppForWazuh/views/agentConfigurationViews/remoteCommand.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          for (const item of files) {
            $('#remoteCommands').append(
              '<hr>'
            )
            if (item["command"])
              $('#remoteCommands').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Command</p>' +
                '<p>' + item.command + '</p>' +
                '</div>'
              )
            if (item.disabled)
              $('#remoteCommands').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Disabled</p>' +
                '<p>' + item.disabled + '</p>' +
                '</div>'
              )
            if (item['ignore_output'])
              $('#remoteCommands').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Ignore output</p>' +
                '<p>' + item['ignore_output'] + '</p>' +
                '</div>'
              )
            if (item.interval)
              $('#remoteCommands').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Interval</p>' +
                '<p>' + item.interval + '</p>' +
                '</div>'
              )
            if (item['run_on_start'])
              $('#remoteCommands').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Run on start</p>' +
                '<p>' + item['run_on_start'] + '</p>' +
                '</div>'
              )
            if (item.tag)
              $('#remoteCommands').append(
                '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                '<p class="wz-list-child">Tag</p>' +
                '<p>' + item.tag + '</p>' +
                '</div>'
              )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      const initializeData = async data => {
        try {
          // If there is syscheck data then render
          if (data.syscheck) {
            $('#ifSyscheck').html(
              '<div>' +
              '<div>' +
              '<h3 id="fileIntegrity" class="wz-headline-title wz-text-link">File Integrity</h3>' +
              '</div>' +
              '<div class="panel-body" id="managerRow">' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p>Disabled</p>' +
              '<p>' + data.syscheck.disabled || '-' + '</p>' +
              '</div>' +
              '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
              '<p>Frequency</p>' +
              '<p>' + data.syscheck.frequency || '-' + '</p>' +
              '</div>' +
              '</div>' +
              '</div >'
            )

            // If click on Syscheck section
            // await fileIntegrityContent(data.syscheck)

            $('#fileIntegrity').click(() => fileIntegrityContent(data.syscheck).catch(handleError))
          }

          // If there is rootcheck data then render it
          if (data.rootcheck) {
            $('#ifRootcheck').html(
              '  <div> ' +
              '  <div> ' +
              '    <h3 id="policyMonitoring" class="wz-headline-title wz-text-link">Policy Monitoring</h3> ' +
              '  </div> ' +
              '  <div class="panel-body" id="clusterRow"> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Disabled</p> ' +
              '      <p>' + data.rootcheck.disabled || '-' + '</p> ' +
              '    </div> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Base directory</p> ' +
              '      <p>' + data.rootcheck.base_directory || '-' + '</p> ' +
              '    </div> ' +
              '  </div> ' +
              '</div> '
            )

            // Click on Policy Monitoring
            $('#policyMonitoring').click(() => policyMonitoring(data.rootcheck).catch(handleError))
          }

          if (data.syscollector) {
            $('#ifSyscollector').html(
              '  <div> ' +
              '  <div> ' +
              '    <h3 id="syscollector" class="wz-headline-title wz-text-link">Syscollector</h3> ' +
              '  </div> ' +
              '  <div class="panel-body" id="managerRow"> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Disabled</p> ' +
              '      <p id="syscollectorDisabled"></p> ' +
              '    </div> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Scan on start</p> ' +
              '      <p id="syscollectorScan"></p> ' +
              '    </div> ' +
              '  </div> ' +
              '</div> '
            )
            $('#syscollectorDisabled').text(data.syscollector.disabled)
            $('#syscollectorScan').text(data.syscollector.scan_on_start)

            // Click on Syscollector
            $('#syscollector').click(() => sysCollector(data.syscollector).catch(handleError))
          }

          if (data['open-scap']) {
            $('#ifOpenScap').html(
              '  <div> ' +
              '  <div> ' +
              '    <h3 id="openscap" class="wz-headline-title wz-text-link">OpenSCAP</h3> ' +
              '  </div> ' +
              '  <div class="panel-body" id="managerRow"> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Disabled</p> ' +
              '      <p id="openscapDisabled"></p> ' +
              '    </div> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Interval</p> ' +
              '      <p id="openscapInterval"></p> ' +
              '    </div> ' +
              '  </div> ' +
              '</div> '
            )
            $('#openscapDisabled').text(data['open-scap'].disabled)
            $('#openscapInterval').text(data['open-scap'].interval)
            // Click on Syscollector
            $('#openscap').click(() => openSCAP(data['open-scap']).catch(handleError))
          }

          if (data['cis-cat']) {
            $('#ifCisCat').html(
              '  <div> ' +
              '  <div> ' +
              '    <h3 id="ciscat" class="wz-headline-title wz-text-link">CIS-CAT</h3> ' +
              '  </div> ' +
              '  <div class="panel-body" id="managerRow"> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Disabled</p> ' +
              '      <p id="ciscatDisabled"></p> ' +
              '    </div> ' +
              '    <div class="wz-flex-container wz-flex-row wz-flex-align-space-between"> ' +
              '      <p>Interval</p> ' +
              '      <p id="ciscatInterval"></p> ' +
              '    </div> ' +
              '  </div> ' +
              '</div> '
            )

            $('#ciscatDisabled').text(data['cis-cat'].disabled)
            $('#ciscatInterval').text(data['cis-cat'].interval)

            // Click on cis-cat
            $('#ciscat').click(() => cisCat(data['cis-cat']).catch(handleError))

          }

          if (data.localfile) {
            $('#ifLog').html(
              '  <div> ' +
              '  <div> ' +
              '    <h3 id="logcollection" class="wz-headline-title wz-text-link">Log Collection</h3> ' +
              '  </div> ' +
              '  <div class="panel-body" id="managerRow"> ' +
              '    <p>Visualize all Log Collection settings</p> ' +
              '  </div> ' +
              '</div> '
            )
            // Click on Log Collection
            $('#logcollection').click(() => logCollection(data.localfile).catch(handleError))
          }

          if (data.command) {
            $('#ifCommand').html(
              '  <div>' +
              '  <div>' +
              '    <h3 id="remote" class="wz-headline-title wz-text-link">Remote Command</h3>' +
              '  </div>' +
              '  <div class="panel-body" id="managerRow">' +
              '    <p>Visualize all Remote Command settings</p>' +
              '  </div>' +
              '</div>'
            )
            // Click on Commands
            $('#remote').click(() => remoteCommands(data.command).catch(handleError))
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Fill first visualization with data from API
       * @param {String} groupInformationEndpoint 
       */
      const loadAgentConfig = async groupInformationEndpoint => {
        try {
          const groupConfJSON = await promisedReq.promisedGet(groupInformationEndpoint)
          await initializeData(groupConfJSON.items[0].config)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Agent list for dropdown
       * @param {String} agentListEndpoint 
       */
      const agentList = async agentListEndpoint => {
        try {
          const agentListJson = await promisedReq.promisedGet(agentListEndpoint)
          for (const agent of agentListJson.data.items)
            $('#agentList').append(
              '<option value="' + agent.id + '">' + agent.name + ' - ' + agent.id + '</option>'
            )
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Load backend address,port and request agent configuration data
       */
      const loadData = async (id) => {
        try {
          const { baseUrl, jsonData } = await service.loadCredentialData()
          let endPoint = baseUrl + '/custom/SplunkAppForWazuh/agents/info?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + id
          let parsedJson = await promisedReq.promisedGet(endPoint)
          const agentListEndpoint = baseUrl + '/custom/SplunkAppForWazuh/agents/agents_name?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi
          await agentList(agentListEndpoint)

          let group = parsedJson.group
          let groupInformationEndpoint = ''
          if (typeof group !== 'undefined') {
            groupInformationEndpoint = baseUrl + '/custom/SplunkAppForWazuh/agents/group_configuration?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + group
            await loadAgentConfig(groupInformationEndpoint)
          } else {
            $('#dynamicContent').html(
              '<p>This agent belongs to a group where actually there`s no configuration.</p></br>' +
              '<p>Use the following link to learn about the centralized configuration process and how to set it up:</p></br>' +
              '<a href=https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html>https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html</a>'
            )
          }

          $('#agentList').on('change', async function () {
            endPoint = baseUrl + '/custom/SplunkAppForWazuh/agents/info?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + this.value
            parsedJson = await promisedReq.promisedGet(endPoint)
            group = parsedJson.group

            if (typeof group !== 'undefined') {
              $('#dynamicList').hide()
              $('#dynamicContent').empty()
              groupInformationEndpoint = baseUrl + '/custom/SplunkAppForWazuh/agents/group_configuration?ip=' + jsonData.url + '&port=' + jsonData.portapi + '&user=' + jsonData.userapi + '&pass=' + jsonData.passapi + '&id=' + group
              await loadAgentConfig(groupInformationEndpoint)
              $('#dynamicList').show()

            } else {
              $('#dynamicList').hide()
              $('#dynamicContent').html(
                '<p>This agent belongs to a group where actually there`s no configuration.</p></br>' +
                '<p>Use the following link to learn about the centralized configuration process and how to set it up:</p></br>' +
                '<a href=https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html>https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html</a>'
              )
            }
          })
          return
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Initialize visualizations and data when DOM is ready
       */
      try {
        $(document).ready(() => loadData('000'))
      } catch (error) {
        errorConnectionToast.show()
      }

      $('header').remove();
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0]);
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/API' })
  }
)