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
  "splunkjs/mvc/utils",
  "underscore",
  "jquery",
  "splunkjs/mvc/layoutview"
],
  function (
    mvc,
    utils,
    _,
    $,
    LayoutView

  ) {

    const service = mvc.createService({ owner: "nobody" })

    /**
     * Perform an async GET HTTP request
     * @param {String} url 
     * Returns Promise
     */
    const myAsyncGet = url => {
      return new Promise((resolve, reject) => {
        $.get(url, data => {
          resolve(data)
        }).fail((err) => { reject(err) })
      })
    }

    /**
     * Load HTTP content asynchronously
     * @param {String} url 
     * Returns Promise
     */
    const myAsyncLoad = ($element, url) => {
      return new Promise((resolve, reject) => {
        $element.load(url, (data, status, xhr) => {
          if (status === 'error')
            reject(status)
          resolve(data)
        })
      })
    }

    /**
     * Render File Integrity data with object received
     * @param {Object} data 
     */
    const fileIntegrityContent = async (data) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/fileIntegrity.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)
      $('#fileIntegrityDisabledView').text(data.disabled)
      $('#fileIntegrityFrequencyView').text(data.frequency)
      $('#fileIntegrityAlertNewFiles').text(data.alert_new_files)
      $('#fileIntegritySkipNFS').text(data.skip_nfs)
      $('#fileIntegrityScanOnStart').text(data.scan_on_start)
      $('#fileIntegrityScanTime').text(data.scan_time)
      $('#fileIntegrityAutoIgnore').text(data.auto_ignore)
      // $('#fileIntegrityNoDiff').text(data.nodiff)
      for (const element of data.nodiff) {
        console.log('un element', element)
        const item = typeof element !== 'object' ? element : element.item
        console.log(typeof item, item)
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
    }

    /**
     * Render Policy Monitoring data with object received
     * @param {Object} data 
     */
    const policyMonitoring = async (data) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/policyMonitoring.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)

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



      // $('#policyMonitoringSysAuditFiles').text(data.disabled)
      // $('#policyMonitoringWinMalwareFiles').text(data.disabled)
    }

    /**
     * Render Syscollector data with object received
     * @param {Object} data 
     */
    const sysCollector = async (data) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/syscollector.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)
      $('#syscollectorDisabledView').text(data.disabled)
      $('#syscollectorHardwareView').text(data.hardware)
      $('#syscollectorIntervalView').text(data.interval)
      $('#syscollectorOSView').text(data.os)
      $('#syscollectorPackagesView').text(data.packages)
      $('#syscollectorScanOnStartView').text(data.scan_on_start)
    }

    /**
     * Render OpenSCAP data with object received
     * @param {Object} data 
     */
    const openSCAP = async (data) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/openSCAP.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)
      $('#openscapDisabledView').text(data.disabled)
      $('#openscapIntervalView').text(data.interval)
      $('#openscapTimeoutView').text(data.timeout)
      $('#openscapScanOnStartView').text(data['scan-on-start'])
    }

    /**
     * Render CIS-CAT data with object received
     * @param {Object} data 
     */
    const cisCat = async (data) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/ciscat.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)
      $('#ciscatPathView').text(data.ciscat_path)
      $('#ciscatDisabledView').text(data.disabled)
      $('#ciscatIntervalView').text(data.interval)
      $('#ciscatTimeoutView').text(data.timeout)
      $('#ciscatScanOnStartView').text(data['scan-on-start'])
      $('#ciscatJavaPathView').text(data['java_path'])
    }

    /**
     * Render Log collection data with object received
     * @param {Array} files 
     */
    const logCollection = async (files) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/logCollection.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)

      console.log('files', typeof files, files)
      for (const item of files) {
        console.log(item)
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
    }

    /**
     * Render Remote commands data with object received
     * @param {Array} files 
     */
    const remoteCommands = async (files) => {
      const globalUrl = "/static/app/wazuh/views/agentConfigurationViews/remoteCommand.html"
      await myAsyncLoad($('#dynamicContent'), globalUrl)

      console.log('files', typeof files, files)
      for (const item of files) {
        console.log(item)
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
    }

    const initializeData = async data => {

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

        $('#fileIntegrity').click(() => fileIntegrityContent(data.syscheck))
      }

      // If there is rootcheck data then render it
      if (data.rootcheck) {
        console.log('HAY ROOTCHECK')
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
        $('#policyMonitoring').click(() => policyMonitoring(data.rootcheck))

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
        $('#syscollector').click(() => sysCollector(data.syscollector))
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
        $('#openscap').click(() => openSCAP(data['open-scap']))
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
        $('#ciscat').click(() => cisCat(data['cis-cat']))

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
        $('#logcollection').click(() => logCollection(data.localfile))
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
        $('#remote').click(() => remoteCommands(data.command))
      }

    }

    /**
     * Fill first visualization with data from API
     * @param {String} groupInformationEndpoint 
     */
    const loadAgentConfig = async groupInformationEndpoint => {
      try {
        const groupConf = await myAsyncGet(groupInformationEndpoint)
        const groupConfJSON = JSON.parse(groupConf)
        console.log(groupConfJSON)
        await initializeData(groupConfJSON.items[0].config)

      } catch (err) {
        Promise.reject(err)
      }
    }

    /**
     * Load API credential data and generates a Base URL
     */
    const loadCredentialData = async () => {
      try {
        const apiData = await service.request(
          "storage/collections/data/credentials/",
          "GET",
          null,
          null,
          null,
          { "Content-Type": "application/json" }, null)
        const jsonData = JSON.parse(apiData)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        return { baseUrl, jsonData }
      } catch (err) {
        return Promise.reject(err)
      }
    }
    const agentList = async agentListEndpoint => {
      try {
        const agentList = await myAsyncGet(agentListEndpoint)
        const agentListJson = JSON.parse(agentList)
        for (const agent of agentListJson.data.items)
          $('#agentList').append(
            '<option value="'+agent.id+'">' + agent.name + ' - ' + agent.id + '</option>'
          )
      } catch (err) {
        Promise.reject(err)
      }
    }
    /**
     * Load backend address,port and request agent configuration data
     */
    const loadData = async (id) => {
      try {
        const { baseUrl, jsonData } = await loadCredentialData()
        let endPoint = baseUrl + '/custom/wazuh/agents/info?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + id
        let dataResult = await myAsyncGet(endPoint)
        let parsedJson = JSON.parse(dataResult)
        console.log('parsedJson', parsedJson)
        const agentListEndpoint = baseUrl + '/custom/wazuh/agents/agents_name?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi
        await agentList(agentListEndpoint)

        let group = parsedJson.group
        let groupInformationEndpoint = ''
        if (typeof group !== 'undefined') {
          groupInformationEndpoint = baseUrl + '/custom/wazuh/agents/group_configuration?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + group
          await loadAgentConfig(groupInformationEndpoint)
        } else {
          $('#dynamicContent').html(
            '<p>This agent belongs to a group where actually there`s no configuration.</p></br>' +
            '<p>Use the following link to learn about the centralized configuration process and how to set it up:</p></br>' +
            '<a href=https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html>https://documentation.wazuh.com/current/user-manual/reference/centralized-configuration.html</a>'
          )
        }

        $('#agentList').on('change', async function () {
          endPoint = baseUrl + '/custom/wazuh/agents/info?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + this.value
          dataResult = await myAsyncGet(endPoint)
          parsedJson = JSON.parse(dataResult)
          group = parsedJson.group

          if (typeof group !== 'undefined') {
            $('#dynamicList').hide()
            $('#dynamicContent').empty()
            groupInformationEndpoint = baseUrl + '/custom/wazuh/agents/group_configuration?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + group
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
        console.error('error at loading data ', err.message || err)
      }
    }

    /**
     * Initialize visualizations and data when DOM is ready
     */
    try {
      $(document).ready(() => loadData('000'))
    } catch (error) {
      console.error('error at loading document ', err.message || err)
    }

    $('header').remove();
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0]);

  }
)