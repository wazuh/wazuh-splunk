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
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/services/apiService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/services/promisedReq.js",
  "/static/app/SplunkAppForWazuh/js/directives/selectedCredentialsDirective.js"

],
  function (
    mvc,
    $,
    LayoutView,
    CredentialService,
    ApiService,
    Toast,
    promisedReq,
    SelectedCredentials

  ) {

    CredentialService.checkSelectedApiConnection().then(({ api }) => {

      // Toast definition
      const errorConnectionToast = new Toast('error', 'toast-bottom-right', 'Error at loading data', 1000, 250, 250)
      const successToast = new Toast('success', 'toast-bottom-right', 'Connection successful', 1000, 250, 250)
      const handleError = err => errorConnectionToast.show()
      SelectedCredentials.render($('#selectedCredentials'), api.filter[1])


      /**
       * Render Global dynamic view
       */
      const globalView = async (globalObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/global.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          $('#jsonViewOutput').text(globalObj.global.jsonout_output)
          $('#logAll').text(globalObj.global.logall)
          $('#logAllJson').text(globalObj.global.logall_json)
          $('#whiteList').text(globalObj.global.white_list)
          $('#logViewAlertLevel').text(globalObj.alerts.log_alert_level)
          $('#emailNotifications').text(globalObj.global.email_notification)
          $('#emailAlertLevel').text(globalObj.alerts.email_alert_level)
          $('#emailTo').text(globalObj.global.email_to)
          $('#emailFrom').text(globalObj.global.email_from)
          $('#smtpServer').text(globalObj.global.smtp_server)
          $('#maxEmailPerHour').text(globalObj.global.email_maxperhour)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Cluster dynamic view
       */
      const clusterView = async (clusterObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/cluster.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          $('#disabled').text(clusterObj.disabled)
          $('#hidden').text(clusterObj.hidden)
          $('#name').text(clusterObj.name)
          $('#nodeName').text(clusterObj.node_name)
          $('#nodeType').text(clusterObj.node_type)
          $('#port').text(clusterObj.port)
          $('#bindAddress').text(clusterObj.bind_addr)
          $('#nodes').text(clusterObj.nodes)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Syscheck dynamic view
       */
      const syscheckView = async (syscheckObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/syscheck.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          $('#sysDisabled').text(syscheckObj.disabled)
          $('#sysFrequency').text(syscheckObj.frequency)
          $('#sysAutoIgnore').text(syscheckObj.auto_ignore)
          $('#sysViewAlertNewFiles').text(syscheckObj.alert_new_files)
          $('#sysScanOnStart').text(syscheckObj.scan_on_start)
          $('#sysNoDiff').text(syscheckObj.nodiff)
          $('#sysSkipNfs').text(syscheckObj.skip_nfs)
          //$('#sysMonitoringDirectories').text(syscheckObj.directories)
          for (let i = 0; i < syscheckObj.directories.length; i++) {
            $('#monitoringDirectories').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>Path</p>` +
              `<p>${syscheckObj.directories[i].path}</p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>Check all</p>` +
              `<p> ${syscheckObj.directories[i].check_all}</p>` +
              `</div>` 
            )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Rootcheck dynamic view
       */
      const rootcheckView = async (rootcheckView) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/rootcheck.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
          console.log(rootcheckView)
          $('#rootDisabled').text(rootcheckView.disabled)
          $('#rootFiles').text(rootcheckView.rootkit_files)
          $('#rootTrojans').text(rootcheckView.rootkit_trojans)
          $('#rootViewFreq').text(rootcheckView.frequency)
          $('#rootSkipNfs').text(rootcheckView.skip_nfs)
          // $('#rootSysAuditFiles').text(rootcheckView.system_audit)
          for (let file of rootcheckView.system_audit) {
            $('#rootSysAuditFiles').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>File</p>` +
              `<p>${file}</p>` +
              `</div>` 
            )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Auth dynamic view
       */
      const authView = async (authObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/auth.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          $('#authDisabled').text(authObj.disabled)
          $('#authViewPurge').text(authObj.purge)
          $('#authViewForceInsert').text(authObj.force_insert)
          $('#authSslVerifyHost').text(authObj.ssl_verify_host)
          $('#authLimitMaxAgents').text(authObj.limit_maxagents)
          $('#authForceTime').text(authObj.force_time)
          $('#authSslManagerKey').text(authObj.ssl_manager_key)
          $('#authSslManagerCert').text(authObj.ssl_manager_cert)
          $('#authUseSourceIP').text(authObj.use_source_ip)
          $('#authUsePassword').text(authObj.use_password)
          $('#authPort').text(authObj.port)
          $('#authSslAutoNegotiate').text(authObj.ssl_auto_negotiate)
          $('#authCiphers').text(authObj.ciphers)
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Ruleset dynamic view
       */
      const rulesetView = async (rulesetObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/ruleset.html"
          $('#dynamicContent').empty()
          console.log(rulesetObj)
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          // $('#ruleDecoderDirs').text(rulesetObj.decoder_dir)
          // $('#ruleRulesDirs').text(rulesetObj.rule_dir)
          // $('#ruleRuleExcludes').text(rulesetObj.rule_exclude)
          // $('#ruleCdbLists').text(rulesetObj.list)

          for (let rule of rulesetObj.decoder_dir) {
            $('#ruleDecoderDirs').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>Path</p>` +
              `<p>${rule}</p>` +
              `</div>` 
            )
          }

          for (let rule of rulesetObj.rule_dir) {
            $('#ruleRulesDirs').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>Path</p>` +
              `<p>${rule}</p>` +
              `</div>` 
            )
          }

          for (let rule of rulesetObj.rule_exclude) {
            $('#ruleRuleExcludes').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>Path</p>` +
              `<p>${rule}</p>` +
              `</div>` 
            )
          }

          for (let rule of rulesetObj.list) {
            $('#ruleCdbLists').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row">` +
              `<p class='wz-flex-item-30'>Path</p>` +
              `<p>${rule}</p>` +
              `</div>` 
            )
          }


        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Command dynamic view
       */
      const commandView = async (commandObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/command.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          for (let i = 0; i < commandObj.length; i++) {
            $('#commandChilds').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Name</p>` +
              `<p>${commandObj[i].name}</p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Expect</p>` +
              `<p> ${commandObj[i].expect} </p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Executable</p>` +
              `<p> ${commandObj[i].executable} </p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Timeout allowed</p>` +
              `<p>${commandObj[i].timeout_allowed}</p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `</div>`
            )
          }
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Render Remote dynamic view
       */
      const remoteView = async (remoteObj) => {
        try {
          globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/remote.html"
          $('#dynamicContent').empty()
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)

          for (let i = 0; i < remoteObj.remote.length; i++) {
            $('#remoteChilds').append(
              `<hr>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Connection</p>` +
              `<p>${remoteObj.remote[i].connection}</p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Port</p>` +
              `<p>${remoteObj.remote[i].port}</p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `<p class="wz-list-child">Protocol</p>` +
              `<p>${remoteObj.remote[i].protocol}</p>` +
              `</div>` +
              `<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">` +
              `</div>`
            )
          }

        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Loads and distributes manager configuration content
       */
      const loadConfigurationContent = async () => {
        try {
          const endPoint = '/manager/configuration?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
          const jsonObj = await ApiService.get(endPoint)
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
          let globalUrl = "/static/app/SplunkAppForWazuh/views/managerConfigurationViews/global.html"
          await promisedReq.promisedLoad($('#dynamicContent'), globalUrl)
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
          // If click on Global section
          $('#global').click(() => globalView(jsonObj).catch(handleError))

          // If click on Cluster section
          $('#cluster').click(() => clusterView(jsonObj.cluster).catch(handleError))

          // If click on Syscheck section
          $('#syscheck').click(() => syscheckView(jsonObj.syscheck).catch(handleError))

          // If click on Rootcheck section
          $('#rootcheck').click(() => rootcheckView(jsonObj.rootcheck).catch(handleError))

          // If click on Auth section
          $('#auth').click(() => authView(jsonObj.auth).catch(handleError))

          // If click on Ruleset section
          $('#ruleset').click(() => rulesetView(jsonObj.ruleset).catch(handleError))

          // If click on Command section
          $('#command').click(() => commandView(jsonObj.command).catch(handleError))

          // If click on Remote section
          $('#remote').click(() => remoteView(jsonObj).catch(handleError))

        } catch (err) {
          errorConnectionToast.show()
        }
      }

      /**
       * On document ready load configuration content
       */
      $(document).ready(() => loadConfigurationContent())

      $('header').remove()
      new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])
    }).catch((err) => { window.location.href = '/en-US/app/SplunkAppForWazuh/settings' })
  }
)