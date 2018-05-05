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
  "splunkjs/mvc/tokenutils",
  "underscore",
  "jquery",
  "splunkjs/mvc/simpleform/input/dropdown",
  "splunkjs/mvc/simplexml/urltokenmodel",
  "splunkjs/mvc/simpleform/formutils",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/layoutview"
],
  function (
    mvc,
    utils,
    TokenUtils,
    _,
    $,
    DropdownInput,
    UrlTokenModel,
    FormUtils,
    SearchManager,
    LayoutView

  ) {

    const urlTokenModel = new UrlTokenModel()
    mvc.Components.registerInstance('url', urlTokenModel)
    const defaultTokenModel = mvc.Components.getInstance('default', { create: true })
    const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
    defaultTokenModel.set(urlTokenModel.toJSON())

    const submitTokens = () => {
      // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
      FormUtils.submitForm({ replaceState: pageLoading })
    }

    const setToken = (name, value) => {
      defaultTokenModel.set(name, value)
      submittedTokenModel.set(name, value)
    }

    const unsetToken = (name) => {
      defaultTokenModel.unset(name)
      submittedTokenModel.unset(name)
    }

    urlTokenModel.on('url:navigate', () => {
      defaultTokenModel.set(urlTokenModel.toJSON())
      if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
        submitTokens()
      } else {
        submittedTokenModel.clear()
      }
    })


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

      console.log('files',typeof files,files)
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
     * Fill first visualization with data from API
     * @param {String} groupInformationEndpoint 
     */
    const loadAgentConfig = async groupInformationEndpoint => {
      try {
        const groupConf = await myAsyncGet(groupInformationEndpoint)
        const groupConfJSON = JSON.parse(groupConf)
        console.log(groupConfJSON)
        // Fill the initial data
        $('#fileIntegrityDisabled').text(groupConfJSON.items[0].config.syscheck.disabled)
        $('#fileIntegrityFreq').text(groupConfJSON.items[0].config.syscheck.frequency)
        $('#rootDisabled').text(groupConfJSON.items[0].config.rootcheck.disabled)
        $('#rootBaseDirectory').text(groupConfJSON.items[0].config.rootcheck.base_directory)
        $('#syscollectorDisabled').text(groupConfJSON.items[0].config.syscollector.disabled)
        $('#syscollectorScan').text(groupConfJSON.items[0].config.syscollector.scan_on_start)
        $('#openscapDisabled').text(groupConfJSON.items[0].config['open-scap'].disabled)
        $('#openscapInterval').text(groupConfJSON.items[0].config['open-scap'].interval)
        $('#ciscatDisabled').text(groupConfJSON.items[0].config['cis-cat'].disabled)
        $('#ciscatInterval').text(groupConfJSON.items[0].config['cis-cat'].interval)
        // First load File Integrity view by default

        await fileIntegrityContent(groupConfJSON.items[0].config.syscheck)

        // If click on Syscheck section
        $('#fileIntegrity').click(() => fileIntegrityContent(groupConfJSON.items[0].config.syscheck))

        // Click on Policy Monitoring
        $('#policyMonitoring').click(() => policyMonitoring(groupConfJSON.items[0].config.rootcheck))

        // Click on Syscollector
        $('#syscollector').click(() => sysCollector(groupConfJSON.items[0].config.syscollector))

        // Click on Syscollector
        $('#openscap').click(() => openSCAP(groupConfJSON.items[0].config['open-scap']))

        // Click on cis-cat
        $('#ciscat').click(() => cisCat(groupConfJSON.items[0].config['cis-cat']))

        // Click on Log Collection
        $('#logcollection').click(() => logCollection(groupConfJSON.items[0].config.localfile))


      } catch (err) {
        console.error('error at loading content ', err)
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

    /**
     * Load backend address,port and request agent configuration data
     */
    const loadData = async () => {
      try {
        const { baseUrl, jsonData } = await loadCredentialData()
        const endPoint = baseUrl + '/custom/wazuh/agents/info?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=001'
        const dataResult = await myAsyncGet(endPoint)
        const parsedJson = JSON.parse(dataResult)
        const group = parsedJson.group
        const groupInformationEndpoint = baseUrl + '/custom/wazuh/agents/group_configuration?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=default'
        await loadAgentConfig(groupInformationEndpoint)
        return
      } catch (err) {
        console.error('error at loading data ', err.message || err)
      }
    }

    /**
     * Initialize visualizations and data when DOM is ready
     */
    try {
      $(document).ready(() => loadData())
    } catch (error) {
      console.error('error at loading document ', err.message || err)
    }

    const input1 = new DropdownInput({
      "id": "input1",
      "choices": [
        { "label": "Manager", "value": "000" }
      ],
      "labelField": "agent.name",
      "searchWhenChanged": true,
      "default": "*",
      "valueField": "agent.name",
      "initialValue": "*",
      "selectFirstChoice": false,
      "showClearButton": true,
      "value": "$form.agent$",
      "managerid": "search18",
      "el": $('#input1')
    }, { tokens: true }).render()

    input1.on("change", (newValue) => {
      FormUtils.handleValueChange(input1)
    })
    const search18 = new SearchManager({
      "id": "search18",
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "-24h@h",
      "status_buckets": 0,
      "search": "index=wazuh sourcetype=wazuh agent.name=\"*\"| stats count by \"agent.name\" | sort \"agent.name\" ASC | fields - count",
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true })


    $('header').remove();
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0]);

  }
)