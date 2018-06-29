/*
 * Wazuh app - Manager status view controller
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
  "jquery",
  "splunkjs/mvc/layoutview",
  "splunkjs/mvc/simplexml/dashboardview",
  "/static/app/SplunkAppForWazuh/js/services/credentialService.js",
  "/static/app/SplunkAppForWazuh/js/directives/toaster.js",
  "/static/app/SplunkAppForWazuh/js/services/apiService.js",
  "/static/app/SplunkAppForWazuh/js/directives/selectedCredentialsDirective.js"


],
  function (
    $,
    LayoutView,
    Dashboard,
    CredentialService,
    Toast,
    ApiService,
    SelectedCredentials
  ) {


    CredentialService.checkSelectedApiConnection().then(({ api, selectedIndex }) => {
      SelectedCredentials.render($('#selectedCredentials'), api.filter[1])

      /**
       * Returns an error toast with a custom message
       * @param {String} msg 
       */
      const customErrorToast = (msg) => {
        return new Toast('error', 'toast-bottom-right', msg, 1000, 250, 250)
      }

      /**
       * Sets the status graphics to visualizations
       * @param {Object} status 
       */
      const applyStatusesToView = (statuses) => {

        const active = Number(statuses[1][0].agent_summary_active)
        const disconnected = Number(statuses[1][0].agent_summary_disconnected)
        const neverConnected = Number(statuses[1][0].agent_summary_neverconnected)
        const total = Number(statuses[1][0].agent_summary_total)
        const coverage = ((active / total) * 100).toFixed(2)
        const managerInfo = statuses[2].data
        const agentInfo = statuses[5].data.items[0]

        for (let status in statuses[0].data) {
          if (statuses[0].data.hasOwnProperty(status)) {
            const color = (statuses[0].data[status] === 'running') ? 'wz-teal' : 'wz-red'
            $('#firstRow').append(
              `<div class="wz-flex-item-10"> ` +
              `  <div class="wz-dashboard-cell wz-dashboard-panel-table wz-flex-container wz-flex-column wz-align-center wz-margin-5"> ` +
              `    <div class="panel-head"> ` +
              `      <p class=" wz-margin-top-10 wz-status-round ${color}"></p> ` +
              `    </div> ` +
              `    <div class="panel-body"> ` +
              `      <p'>${status}</p> ` +
              `    </div> ` +
              `  </div> ` +
              `</div> `
            )
          }
        }

        $('#secondRow').append(
          `<div class='wz-flex-item wz-flex-container wz-align-center'>` +
          `<span>` +
          `Total agents: <span class="wz-text-bold">${total}</span>` +
          `</span>` +
          `</div>` +
          `<div class='wz-flex-item wz-flex-container wz-align-center'>` +
          `<span>` +
          `Active: <span class="wz-text-bold">${active}</span>` +
          `</span>` +
          `</div>` +
          `<div class='wz-flex-item wz-flex-container wz-align-center'>` +
          `<span>` +
          `Disconnected: <span class="wz-text-bold">${disconnected}</span>` +
          `</span>` +
          `</div>` +
          `<div class='wz-flex-item wz-flex-container wz-align-center'>` +
          `<span>` +
          `Never connected:  <span class="wz-text-bold">${neverConnected}</span>` +
          `</span>` +
          `</div>` +
          `<div class='wz-flex-item wz-flex-container wz-align-center'>` +
          `<span>` +
          `Agents coverage: <span class="wz-text-bold">${coverage}%</span>` +
          `</span>` +
          `</div>`
        )

        // Manager info
        $('#version').text(managerInfo.version)
        $('#compilationDate').text(managerInfo['compilation_date'])
        $('#installationPath').text(managerInfo.path)
        $('#installationType').text(managerInfo.type)
        $('#agentsLimit').text(managerInfo.max_agents)
        $('#opensslSupport').text(managerInfo['openssl_support'])
        $('#totalRules').text(statuses[3].data.totalItems)
        $('#totalDecoders').text(statuses[4].data.totalItems)

        // Last agent info
        $('#agentName').text(agentInfo.name)
        $('#agentId').text(agentInfo.id)
        $('#agentStatus').text(agentInfo.status)
        $('#agentIpAddress').text(agentInfo.ip)
        $('#agentDate').text(agentInfo.dateAdd)
        $('#agentVersion').text(agentInfo.version)
        $('#agentOs').text(`${agentInfo['os-name']} ${agentInfo['os-codename']} - ${agentInfo['os-version']} - ${agentInfo['os-arch']}`)
        $('#agentLastKeepAlive').text(agentInfo.lastKeepAlive)

        // ( statuses.data['wazuh-modulesd'] === 'running ' ) ? $('#modulesd').addClass('wz-teal') : $('#modulesd').addClass('wz-red')
      }

      /**
       * Obtains manager status data from API
       */
      const getManagerStatus = async () => {
        try {
          const data = await Promise.all([
            ApiService.get(`/manager/status?ip=${api.url}&port=${api.portapi}&pass=${api.passapi}&user=${api.userapi}`),
            ApiService.get(`/agents/summary?ip=${api.url}&port=${api.portapi}&pass=${api.passapi}&user=${api.userapi}`),
            ApiService.get(`/manager/info?ip=${api.url}&port=${api.portapi}&pass=${api.passapi}&user=${api.userapi}`),
            ApiService.get(`/manager/rules?length=1&ip=${api.url}&port=${api.portapi}&pass=${api.passapi}&user=${api.userapi}`),
            ApiService.get(`/manager/decoders?length=1&ip=${api.url}&port=${api.portapi}&pass=${api.passapi}&user=${api.userapi}`),
            ApiService.get(`/agents/agents?length=1&ip=${api.url}&port=${api.portapi}&pass=${api.passapi}&user=${api.userapi}`)
          ])
          applyStatusesToView(data)
        } catch (err) {
          console.error(err)
          customErrorToast('Error when requesting data to API').show()
        }
      }

      $(document).ready(() => getManagerStatus())

      new LayoutView({ "hideChrome": false, "hideAppBar": false, "hideSplunkBar": false, "hideFooter": false })
        .render()
        .getContainerElement()
        .appendChild($('.dashboard-body')[0])


      new Dashboard({
        id: 'dashboard',
        el: $('.dashboard-body'),
        showTitle: true,
        editable: false
      }, { tokens: true }).render()


    }).catch((err) => {
      window.location.href = '/en-US/app/SplunkAppForWazuh/settings'
    })
  }
)
// ]]>
