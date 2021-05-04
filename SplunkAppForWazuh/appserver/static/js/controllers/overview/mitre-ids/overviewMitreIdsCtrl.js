// /*
//  * Wazuh app - Agents controller
//  * Copyright (C) 2015-2019 Wazuh, Inc.
//  *
//  * This program is free software you can redistribute it and/or modify
//  * it under the terms of the GNU General Public License as published by
//  * the Free Software Foundation either version 2 of the License, or
//  * (at your option) any later version.
//  *
//  * Find more information about this on the LICENSE file.
//  */

// define([
//   '../../module',
//   '../../../dashboardMain',
//   '../../../services/visualizations/chart/column-chart',
//   '../../../services/visualizations/chart/pie-chart',
//   '../../../services/visualizations/table/table',
//   '../../../services/visualizations/chart/area-chart',
//   '../../../services/rawTableData/rawTableDataService',
//   'FileSaver'
// ], function(
//   app,
//   DashboardMain,
//   ColumnChart,
//   PieChart,
//   Table,
//   AreaChart,
//   RawTableDataService
// ) {
//   'use strict'

//   class OverviewMitreIds extends DashboardMain {
//     /**
//      * Class constructor
//      * @param {Object} $urlTokenModel
//      * @param {Object} $state
//      * @param {Object} $scope
//      * @param {Object} $currentDataService
//      * @param {Object} agent
//      * @param {Object} mitre
//      * @param {Object} $notificationService
//      * @param {*} $reportingService
//      */

//     constructor(
//       $urlTokenModel,
//       $state,
//       $scope,
//       $currentDataService,
//       agent,
//       mitre,
//       $tableFilterService,
//       $csvRequestService,
//       $notificationService,
//       $reportingService,
//       reportingEnabled,
//       extensions
//     ) {
//       super(
//         $scope,
//         $reportingService,
//         $state,
//         $currentDataService,
//         $urlTokenModel
//       )
//       this.wzTableFilter = $tableFilterService
//       this.scope.extensions = extensions
//       this.agent = agent
//       this.mitre = mitre
//       this.api = this.currentDataService.getApi()
//       this.csvReq = $csvRequestService
//       this.notification = $notificationService
//       this.scope.reportingEnabled = reportingEnabled
//       this.showFiles = false
//       this.scope.showFiles = this.showFiles
//       this.currentDataService.addFilter(
//         `{"rule.groups{}":"syscheck", "implicit":true, "onlyShow":true}`
//       )
//       // this.scope.expandArray = [
//       //   false,
//       //   false,
//       //   false,
//       //   false,
//       //   false,
//       //   false,
//       //   false,
//       //   false,
//       //   false
//       // ]

//       // if (
//       //   this.agent &&
//       //   this.agent.data &&
//       //   this.agent.data.data &&
//       //   this.agent.data.data.affected_items[0].id
//       // )
//         // this.currentDataService.addFilter(
//         //   `{"agent.id":"${this.agent.data.data.affected_items[0].id}", "implicit":true}`
//         // )

//       this.filters = this.getFilters()

//       this.vizz = [
//         /**
//          * Visualizations
//          */
//         // new AreaChart(
//         //   'eventsOverTimeElement',
//         //   `${this.filters} sourcetype="wazuh"  "rule.groups{}"="syscheck" | timechart span=12h count by rule.description`,
//         //   'eventsOverTimeElement',
//         //   this.scope,
//         //   { customAxisTitleX: 'Time span' }
//         // ),
//         // new ColumnChart(
//         //   'topGroupOwnersElement',
//         //   `${this.filters} sourcetype="wazuh" uname_after syscheck.gname_after!=""| top limit=20 "syscheck.gname_after"`,
//         //   'topGroupOwnersElement',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'topUserOwnersElement',
//         //   `${this.filters} sourcetype="wazuh" uname_after| top limit=20 "syscheck.uname_after"`,
//         //   'topUserOwnersElement',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'topActions',
//         //   `${this.filters} sourcetype="wazuh" | stats count by "syscheck.event"`,
//         //   'topActions',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'topFileChangesElement',
//         //   `${this.filters} sourcetype="wazuh" "Integrity checksum changed" location!="syscheck-registry" syscheck.path="*" | top syscheck.path`,
//         //   'topFileChangesElement',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'rootUserFileChangesElement',
//         //   `${this.filters} sourcetype="wazuh" "Integrity checksum changed" location!="syscheck-registry" syscheck.path="*" | search root | top limit=10 syscheck.path`,
//         //   'rootUserFileChangesElement',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'wordWritableFilesElement',
//         //   `${this.filters} sourcetype="wazuh" rule.groups{}="syscheck" "syscheck.perm_after"=* | top "syscheck.perm_after" showcount=false showperc=false | head 1`,
//         //   'wordWritableFilesElement',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'topNewFiles',
//         //   `${this.filters} sourcetype=wazuh syscheck.event=added  | stats count by syscheck.path | top syscheck.path limit=5`,
//         //   'topNewFiles',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'topModifiedFiles',
//         //   `${this.filters} sourcetype=wazuh syscheck.event=modified  | stats count by syscheck.path | top syscheck.path limit=5`,
//         //   'topModifiedFiles',
//         //   this.scope
//         // ),
//         // new PieChart(
//         //   'topDeletedFiles',
//         //   `${this.filters} sourcetype=wazuh syscheck.event=deleted  | stats count by syscheck.path | top syscheck.path limit=5`,
//         //   'topDeletedFiles',
//         //   this.scope
//         // ),
//         // new Table(
//         //   'eventsSummaryElement',
//         //   `${this.filters} sourcetype="wazuh" rule.mitre.id{}="T1107"  |id , created | sort id DESC | rename agent.name as Agent, syscheck.path as File, syscheck.event as Event, rule.description as Description, count as Count`,
//         //   'eventsSummaryElement',
//         //   this.scope
//         // ),
//         // new RawTableDataService(
//         //   'eventsSummaryTable',
//         //   `${this.filters} sourcetype="wazuh" rule.mitre.id{}=* agent.name=*  | stats count sparkline by agent.name, rule.mitre.id{}  | sort count DESC  | rename agent.name as Agent, rule.mitre.id{} as "Mitre", count as Count`,
//         //   'eventsSummaryTableToken',
//         //   '$result$',
//         //   this.scope,
//         //   'Events Summary'
//         // ),
//       ]

//       // // Set agent info
//       // try {
//       //   this.agentReportData = {
//       //     ID: this.agent.data.data.affected_items[0].id,
//       //     // Created: this.mitre.data.data.affected_items[0].json.created,
//       //     Name: this.agent.data.data.affected_items[0].name,
//       //     IP: this.agent.data.data.affected_items[0].ip,
//       //     Version: this.agent.data.data.affected_items[0].version,
//       //     Manager: this.agent.data.data.affected_items[0].manager,
//       //     OS: this.agent.data.data.os.affected_items[0].name,
//       //     dateAdd: this.agent.data.data.affected_items[0].dateAdd,
//       //     lastKeepAlive: this.agent.data.data.affected_items[0].lastKeepAlive,
//       //     group: this.agent.data.data.affected_items[0].group.toString()
//       //   }
//       // } catch (error) {
//       //   this.agentReportData = false
//       // }

//       /**
//        * Generates report
//        */
//       // this.scope.startVis2Png = () =>
//       //   this.reportingService.startVis2Png(
//       //     'mitre-ids',
//       //     'Mitre IDs',
//       //     this.filters,
//       //     [
//       //       'topNewFiles',
//       //       'topModifiedFiles',
//       //       'topDeletedFiles',
//       //       'eventsOverTimeElement',
//       //       'topGroupOwnersElement',
//       //       'topActions',
//       //       'topUserOwnersElement',
//       //       'topFileChangesElement',
//       //       'rootUserFileChangesElement',
//       //       'eventsSummaryElement'
//       //     ],
//       //     {}, //Metrics,
//       //     this.tableResults,
//       //     this.agentReportData
//       //   )
//     }

//     /**
//      * On controller loads
//      */
//     $onInit() {
//       console.log(this.mitre.data.data.affected_items);
//       console.log(this.mitre.data.data.affected_items);
//       console.log(this.mitre.data.data.affected_items);
//       console.log(this.mitre.data.data.affected_items);

//       this.show()
//       this.scope.show = () => this.show()
//       this.scope.mitre =
//         this.mitre && this.mitre.data && this.mitre.data.data && this.mitre.data.data.affected_items[0]
//           ? this.mitre.data.data.affected_items[0]
//           : { error: true }

//       // Capitalize Status
//       if(this.scope.agent && this.scope.agent.status){
//         this.scope.agent.status = this.scope.agent.status.charAt(0).toUpperCase() + this.scope.agent.status.slice(1)
//       }
//       this.scope.search = term => {
//         this.scope.$broadcast('wazuhSearch', { term })
//       }
//       this.scope.formatAgentStatus = agentStatus =>
//         this.formatAgentStatus(agentStatus)
//       this.scope.getAgentStatusClass = agentStatus =>
//         this.getAgentStatusClass(agentStatus)
//       this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
//     }

//     /**
//      * Shows/Hides alerts section of the view
//      */
//     show() {
//       this.showFiles = !this.showFiles
//       this.scope.showFiles = this.showFiles
//       if (!this.scope.$$phase) this.scope.$digest()
//     }

//     /**
//      * Runs syscheck scan
//      */
//     async runScan() {
//       try {
//         const id = this.agent.data.data.affected_items[0].id
//         const result = await this.apiReq(`/syscheck?q=agents_list=${id}`, {}, 'PUT')
//         if (result && result.data && !result.data.error) {
//           this.notification.showSuccessToast('Syscheck scan launched.')
//         } else {
//           throw result.data.message
//         }
//       } catch (error) {
//         this.notification.showErrorToast(
//           error || 'Cannot launch syscheck scan.'
//         )
//       }
//     }

//     /**
//      * Checks and returns agent status
//      * @param {Array} agentStatus
//      */
//     formatAgentStatus(agentStatus) {
//       return ['Active', 'Disconnected'].includes(agentStatus)
//         ? agentStatus
//         : 'Never connected'
//     }

//     /**
//      * Returns a class depending of the agent state
//      * @param {String} agentStatus
//      */
//     getAgentStatusClass(agentStatus) {
//       return agentStatus === 'Active' ? 'teal' : 'red'
//     }

//     /**
//      * Exports the table in CSV format
//      */
//     async downloadCsv(path, name) {
//       try {
//         this.notification.showSimpleToast(
//           'Your download should begin automatically...'
//         )
//         const currentApi = this.api['_key']
//         const output = await this.csvReq.fetch(
//           path,
//           currentApi,
//           this.wzTableFilter.get()
//         )
//         const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
//         saveAs(blob, name) // eslint-disable-line
//         return
//       } catch (error) {
//         this.notification.showErrorToast('Error downloading CSV')
//       }
//       return
//     }
//   }
//   app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
// })



































/*
 * Wazuh app - Agents controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define([
  '../../module',
  '../../../services/visualizations/search/search-handler',
  'FileSaver'
], function(app, SearchHandler) {
  'use strict'

  class OverviewMitreIds {
    /**
     * Class constructor
     * @param {Object} $urlTokenModel
     * @param {Object} $scope
     * @param {Object} $currentDataService
     * @param {Object} $state
     * @param {Object} $notificationService
     * @param {Object} $requestService
     * @param {Object} agentData
     */

    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $notificationService,
      $requestService,
      $csvRequestService,
      $tableFilterService,
      agentData,
      $mdDialog,
      $groupHandler,
      $dateDiffService
    ) {
      this.scope = $scope
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.submittedTokenModel.set('activeAgentToken', '-')
      this.currentDataService = $currentDataService
      this.api = this.currentDataService.getApi()
      this.apiReq = $requestService.apiReq
      this.state = $state
      this.notification = $notificationService
      this.currentClusterInfo = this.currentDataService.getClusterInfo()
      this.filters = this.currentDataService.getSerializedFilters()
      this.csvReq = $csvRequestService
      this.wzTableFilter = $tableFilterService
      this.$mdDialog = $mdDialog
      this.groupHandler = $groupHandler
      this.setBrowserOffset = $dateDiffService.setBrowserOffset
      try {
        const parsedResult = agentData.data.data
        let summary = this.formatAgentStatusData(parsedResult.agent_status)
        let lastAgent = parsedResult.last_registered_agent[0]
        let groups = parsedResult.groups

        this.scope.noAgents = summary.Total < 1
        this.scope.agentsCountActive = summary.Active
        this.scope.lastAgent = lastAgent || 'Unknown'
        const os = parsedResult.agent_os
          ? parsedResult.agent_os
              .map(item => item.os)
              .filter(item => !!item)
          : false
        const versions = parsedResult.agent_version
          ? parsedResult.agent_version
              .map(item => item.version)
              .filter(item => !!item)
          : false
        const nodes =
          parsedResult.nodes && parsedResult.nodes
            ? parsedResult.nodes
                .map(item => item['node_name'])
                .filter(item => !!item)
            : false
        groups = groups
          ? groups.map(item => item.name).filter(item => !!item)
          : false
        this.scope.agentsCountDisconnected = summary.Disconnected
        this.scope.agentsCountNeverConnected = summary.Never_connected;
        const agentsCountTotal = summary.Total
        this.scope.agentsCoverity = agentsCountTotal
          ? (this.scope.agentsCountActive / agentsCountTotal) * 100
          : 0

        this.scope.searchBarModel = {
          name: [],
          status: ['active', 'disconnect', 'never_connected'],
          group: groups
            ? groups.sort((a, b) => {
                return a.toString().localeCompare(b.toString())
              })
            : [],
          version: versions
            ? versions.sort((a, b) => {
                return a
                  .toString()
                  .localeCompare(b.toString(), undefined, {
                    numeric: true,
                    sensitivity: 'base'
                  })
              })
            : [],
          'os.platform': os
            ? os
                .map(x => x.platform)
                .sort((a, b) => {
                  return a.toString().localeCompare(b.toString())
                })
            : [],
          'os.version': os
            ? os
                .map(x => x.version)
                .sort((a, b) => {
                  return a
                    .toString()
                    .localeCompare(b.toString(), undefined, {
                      numeric: true,
                      sensitivity: 'base'
                    })
                })
            : [],
          'os.name': os
            ? os
                .map(x => x.name)
                .sort((a, b) => {
                  return a.toString().localeCompare(b.toString())
                })
            : []
        }

        if (this.clusterInfo && this.clusterInfo.status === 'enabled') {
          this.scope.searchBarModel.node_name = nodes || []
        }
      } catch (error) {} //eslint-disable-line

      this.topAgent = new SearchHandler(
        'searchTopAgent',
        `index=wazuh ${this.filters} earliest=-1w NOT agent.id=000 | top agent.name`,
        'activeAgentToken',
        '$result.agent.name$',
        'mostActiveAgent',
        this.submittedTokenModel,
        this.scope,
        true,
        'loadingSearch',
        this.notification
      )

      this.scope.$applyAsync()
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.addingAgents = false
      this.scope.query = (query, search) => this.query(query, search)
      this.scope.showAgent = agent => this.showAgent(agent)
      this.scope.isClusterEnabled =
        this.clusterInfo && this.clusterInfo.status === 'enabled'
      this.scope.status = 'all'
      this.scope.osPlatform = 'all'
      this.scope.version = 'all'
      this.scope.node_name = 'all'
      this.scope.versionModel = 'all'
      this.scope.downloadCsv = () => this.downloadCsv()
      this.scope.$on('$destroy', () => {
        this.topAgent.destroy()
      })
      this.scope.reloadList = () => this.reloadList()

      this.scope.addNewAgent = () => this.addNewAgent()
      this.scope.closeAddAgent = () => this.closeAddAgent()

      this.scope.offsetTimestamp = (text, time) => {
        try {
          return text + this.setBrowserOffset(time)
        } catch (error) {
          return ''
        }
      }

      this.scope.loadCharts = id => {
        setTimeout(() => {
          const chart = new Chart(document.getElementById(id), {
            type: 'doughnut',
            data: {
              labels: ['Active', 'Disconected', 'Never connected'],
              datasets: [
                {
                  backgroundColor: ['#46BFBD', '#F7464A', '#949FB1'],
                  data: [
                    this.scope.agentsCountActive,
                    this.scope.agentsCountDisconnected,
                    this.scope.agentsCountNeverConnected
                  ]
                }
              ]
            },
            options: {
              cutoutPercentage: 85,
              legend: {
                display: true,
                position: 'right'
              },
              tooltips: {
                displayColors: false
              }
            }
          })
          chart.update()
        }, 250)
      }
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv() {
      try {
        this.notification.showSimpleToast(
          'Your download should begin automatically...'
        )

        const filters = this.wzTableFilter.get()
        filters.push({
          name: "q",
          value: "id!=000"
        })
        const currentApi = this.api['_key']
        const output = await this.csvReq.fetch(
          '/agents',
          currentApi,
          filters
        )
        const blob = new Blob([output], { type: 'text/csv' }) // eslint-disable-line
        saveAs(blob, 'agents.csv') // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast('Error downloading CSV')
      }
      return
    }

    /**
     * Launches the query
     * @param {String} query
     * @param {String} search
     */
    query(query, search) {
      this.scope.$broadcast('wazuhQuery', { query, search })
    }

    /**
     * Selects an agent
     * @param {String} agent
     */
    async showAgent(agent) {
      try {
        if (agent) {
          const agentName = typeof agent === 'object' ? agent.name : agent
          const agentInfo = await this.apiReq(`/agents`, { name: agentName })
          if (
            !agentInfo ||
            !agentInfo.data ||
            !agentInfo.data.data ||
            agentInfo.data.error
          ) {
            throw Error('Error fetching agent data')
          }
          if (agentInfo.data.data.affected_items[0].id !== '000') {
            this.state.go(`agent-overview`, {
              id: agentInfo.data.data.affected_items[0].id
            })
          }
        } else {
          throw Error('Cannot fetch agent name')
        }
      } catch (err) {
        this.notification.showErrorToast(
          err.message || 'Error fetching agent data'
        )
      }
    }

    /**
     * Switchs view to add a new agent
     */
    addNewAgent() {
      this.scope.addingAgents = true
      this.scope.$applyAsync()
    }

    /**
     * Switchs view to cancel the process to add a new agent
     */
    closeAddAgent() {
      this.scope.addingAgents = false
      this.scope.$applyAsync()
    }

    /**
     * Reload list of agents
     */
    reloadList() {
      this.scope.$broadcast('reloadSearchFilterBar', {})
    }



    /** Parsed Agent Stats */
    formatAgentStatusData(status){

      let statusObj = {};

      for(let key of Object.keys(status)){

        statusObj[key.charAt(0).toUpperCase() + key.slice(1)] = status[key];

      }

      return statusObj;

    }

  }
  app.controller('overviewMitreIdsCtrl', OverviewMitreIds)
})
