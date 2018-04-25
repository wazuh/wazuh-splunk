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


    const service = mvc.createService({ owner: "nobody" });
    $(document).ready(() => {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done((data) => {
        const jsonData = JSON.parse(data)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        const endPoint = baseUrl + '/custom/wazuh/agents/info?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=001'
        $.get(endPoint, data => {
          const parsedJson = JSON.parse(data)
          console.log('parsedData', parsedJson)
          const group = parsedJson.group
          const groupInformationEndpoint = baseUrl + '/custom/wazuh/agents/group_configuration?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=default'
          $.get(groupInformationEndpoint, groupConf => {
            const groupConfJSON = JSON.parse(groupConf)
            console.log('groupconf', groupConfJSON)
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
            let globalUrl = "/static/app/wazuh/views/agentConfigurationViews/fileIntegrity.html"
            $('#dynamicContent').load(globalUrl, (data) => {
              $('#fileIntegrityDisabledView').text(groupConfJSON.items[0].config.syscheck.disabled)
              $('#fileIntegrityFrequencyView').text(groupConfJSON.items[0].config.syscheck.frequency)
              $('#fileIntegrityAlertNewFiles').text(groupConfJSON.items[0].config.syscheck.alert_new_files)
              $('#fileIntegritySkipNFS').text(groupConfJSON.items[0].config.syscheck.skip_nfs)
              $('#fileIntegrityScanOnStart').text(groupConfJSON.items[0].config.syscheck.scan_on_start)
              $('#fileIntegrityScanTime').text(groupConfJSON.items[0].config.syscheck.scan_time)
              $('#fileIntegrityAutoIgnore').text(groupConfJSON.items[0].config.syscheck.auto_ignore)
              // $('#fileIntegrityNoDiff').text(groupConfJSON.items[0].config.syscheck.nodiff)
              for (let i = 0; i < groupConfJSON.items[0].config.syscheck.nodiff.length; i++) {
                let item = typeof groupConfJSON.items[0].config.syscheck.nodiff[i] !== 'object' ? groupConfJSON.items[0].config.syscheck.nodiff[i] : groupConfJSON.items[0].config.syscheck.nodiff[i].item
                $('#fileIntegrityNoDiff').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">File</p>' +
                  '<p class="wz-list-child">' +
                  item +
                  '</p>' +
                  '</div>'
                )
              }
              for (let i = 0; i < groupConfJSON.items[0].config.syscheck.directories.length; i++) {
                $('#fileIntegrityMonitoredFiles').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Path</p>' +
                  '<p class="wz-list-child">' +
                  groupConfJSON.items[0].config.syscheck.directories[i].path +
                  '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Check all</p>' +
                  '<p class="wz-list-child">' +
                  groupConfJSON.items[0].config.syscheck.directories[i].check_all +
                  '</p>' +
                  '</div>'
                )
              } 
              for (let i = 0; i < groupConfJSON.items[0].config.syscheck.ignore.length; i++) {
                const item = groupConfJSON.items[0].config.syscheck.ignore[i] !== 'object' ? groupConfJSON.items[0].config.syscheck.ignore[i] : groupConfJSON.items[0].config.syscheck.ignore[i].item
                $('#fileIntegrityIgnoredFiles').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">File</p>' +
                  '<p class="wz-list-child">' +
                  item +
                  '</p>' +
                  '</div>'
                )
              } 
            })
            // If click on Global section
            $('#global').click(() => {
              globalUrl = "/static/app/wazuh/views/global.html"
              $('#dynamicContent').empty()
              $('#dynamicContent').load(globalUrl, (data) => {
                $('#jsonViewOutput').text(jsonObj.global.jsonout_output)
                $('#logAll').text(jsonObj.global.logall)
                $('#logAllJson').text(jsonObj.global.logall_json)
                $('#whiteList').text(jsonObj.global.white_list)
                $('#logViewAlertLevel').text(jsonObj.alerts.log_alert_level)
                $('#emailNotifications').text(jsonObj.global.email_notification)
                $('#emailAlertLevel').text(jsonObj.alerts.email_alert_level)
                $('#emailTo').text(jsonObj.global.email_to)
                $('#emailFrom').text(jsonObj.global.email_from)
                $('#smtpServer').text(jsonObj.global.smtp_server)
                $('#maxEmailPerHour').text(jsonObj.global.email_maxperhour)
              })
            })


          }).fail(() => { console.error('error at fetching group info') })
        }).fail(() => { console.error('error at fetching agent info') })
      })
    })

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
);