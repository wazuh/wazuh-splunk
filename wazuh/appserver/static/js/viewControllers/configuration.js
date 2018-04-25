/*
 * Wazuh app - Configuration view controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
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
        const jsonData = JSON.parse(data)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        const endPoint = baseUrl + '/custom/wazuh/manager/configuration?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi
        $.get(endPoint, (data) => {
          const jsonObj = JSON.parse(data)
          // Fill the initial data
          $('#jsonOutput').text(jsonObj.global.jsonout_output)
          $('#logAlertLevel').text(jsonObj.alerts.log_alert_level)
          $('#nameCluster').text(jsonObj.cluster.name)
          $('#typeCluster').text(jsonObj.cluster.node_type)
          $('#sysFreq').text(jsonObj.syscheck.frequency)
          $('#sysAlertNewFiles').text(jsonObj.syscheck.alert_new_files)
          $('#rootFreq').text(jsonObj.rootcheck.frequency)
          $('#rootSkipNFS').text(jsonObj.rootcheck.skip_nfs)
          $('#authPurge').text(jsonObj.auth.purge)
          $('#authForceInsert').text(jsonObj.auth.force_insert)
          // First load Global view by default
          let globalUrl = "/static/app/wazuh/views/global.html"
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
          // If click on Cluster section
          $('#cluster').click(() => {
            globalUrl = "/static/app/wazuh/views/cluster.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              $('#disabled').text(jsonObj.cluster.disabled)
              $('#hidden').text(jsonObj.cluster.hidden)
              $('#name').text(jsonObj.cluster.name)
              $('#interval').text(jsonObj.cluster.interval)
              $('#nodeName').text(jsonObj.cluster.node_name)
              $('#nodeType').text(jsonObj.cluster.node_type)
              $('#port').text(jsonObj.cluster.port)
              $('#bindAddress').text(jsonObj.cluster.bind_addr)
              $('#nodes').text(jsonObj.cluster.nodes)
            })
          })
          // If click on Syscheck section
          $('#syscheck').click(() => {
            globalUrl = "/static/app/wazuh/views/syscheck.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              $('#sysDisabled').text(jsonObj.syscheck.disabled)
              $('#sysFrequency').text(jsonObj.syscheck.frequency)
              $('#sysAutoIgnore').text(jsonObj.syscheck.auto_ignore)
              $('#sysViewAlertNewFiles').text(jsonObj.syscheck.alert_new_files)
              $('#sysScanOnStart').text(jsonObj.syscheck.scan_on_start)
              $('#sysNoDiff').text(jsonObj.syscheck.nodiff)
              $('#sysSkipNfs').text(jsonObj.syscheck.skip_nfs)
              //$('#sysMonitoringDirectories').text(jsonObj.syscheck.directories)
              for (let i = 0; i < jsonObj.syscheck.directories.length; i++) {
                $('#monitoringDirectories').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Path</p>' +
                  '<p class="wz-list-child">' + jsonObj.syscheck.directories[i].path + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Check all</p>' +
                  '<p class="wz-list-child">' + jsonObj.syscheck.directories[i].check_all + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<hr>' +
                  '</div>'
                )
              }

            })
          })
          // If click on Rootcheck section
          $('#rootcheck').click(() => {
            globalUrl = "/static/app/wazuh/views/rootcheck.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              $('#rootDisabled').text(jsonObj.rootcheck.disabled)
              $('#rootFiles').text(jsonObj.rootcheck.rootkit_files)
              $('#rootTrojans').text(jsonObj.rootcheck.rootkit_trojans)
              $('#rootViewFreq').text(jsonObj.rootcheck.frequency)
              $('#rootSkipNfs').text(jsonObj.rootcheck.skip_nfs)
              $('#rootSysAuditFiles').text(jsonObj.rootcheck.system_audit)
            })
          })
          // If click on Auth section
          $('#auth').click(() => {
            globalUrl = "/static/app/wazuh/views/auth.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              $('#authDisabled').text(jsonObj.auth.disabled)
              $('#authViewPurge').text(jsonObj.auth.purge)
              $('#authViewForceInsert').text(jsonObj.auth.force_insert)
              $('#authSslVerifyHost').text(jsonObj.auth.ssl_verify_host)
              $('#authLimitMaxAgents').text(jsonObj.auth.limit_maxagents)
              $('#authForceTime').text(jsonObj.auth.force_time)
              $('#authSslManagerKey').text(jsonObj.auth.ssl_manager_key)
              $('#authSslManagerCert').text(jsonObj.auth.ssl_manager_cert)
              $('#authUseSourceIP').text(jsonObj.auth.use_source_ip)
              $('#authUsePassword').text(jsonObj.auth.use_password)
              $('#authPort').text(jsonObj.auth.port)
              $('#authSslAutoNegotiate').text(jsonObj.auth.ssl_auto_negotiate)
              $('#authCiphers').text(jsonObj.auth.ciphers)
            })
          })
          // If click on Ruleset section
          $('#ruleset').click(() => {
            globalUrl = "/static/app/wazuh/views/ruleset.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              $('#ruleDecoderDirs').text(jsonObj.ruleset.decoder_dir)
              $('#ruleRulesDirs').text(jsonObj.ruleset.rule_dir)
              $('#ruleRuleExcludes').text(jsonObj.ruleset.rule_exclude)
              $('#ruleCdbLists').text(jsonObj.ruleset.list)
            })
          })
          // If click on Command section
          $('#command').click(() => {
            globalUrl = "/static/app/wazuh/views/command.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              for (let i = 0; i < jsonObj.command.length; i++) {
                $('#commandChilds').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Name</p>' +
                  '<p>' + jsonObj.command[i].name + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Expect</p>' +
                  '<p>' + jsonObj.command[i].expect + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Executable</p>' +
                  '<p>' + jsonObj.command[i].executable + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Timeout allowed</p>' +
                  '<p>' + jsonObj.command[i].timeout_allowed + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<hr>' +
                  '</div>'
                )
              }
            })
          })
          // If click on Remote section
          $('#remote').click(() => {
            globalUrl = "/static/app/wazuh/views/remote.html"
            $('#dynamicContent').empty()
            $('#dynamicContent').load(globalUrl, (data) => {
              for (let i = 0; i < jsonObj.remote.length; i++) {
                $('#remoteChilds').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Connection</p>' +
                  '<p>' + jsonObj.remote[i].connection + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Port</p>' +
                  '<p>' + jsonObj.remote[i].port + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p class="wz-list-child">Protocol</p>' +
                  '<p>' + jsonObj.remote[i].protocol + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<hr>' +
                  '</div>'
                )
              }
              $('#remConnection').text(jsonObj.remote.decoder_dir)
              $('#remPort').text(jsonObj.ruleset.rule_dir)
              $('#remProtocol').text(jsonObj.ruleset.rule_exclude)
            })
          })
        }).fail(() => {
          console.error("error")
        })
      })
    })


    $('header').remove()
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])

  }
)