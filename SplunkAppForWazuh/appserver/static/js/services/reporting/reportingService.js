define(['../module', 'jQuery'], function (module, $) {
  'use strict'
  class ReportingService {
    constructor(
      $rootScope,
      vis2png,
      $currentDataService,
      $requestService,
      $notificationService,
      $navigationService,
      $keyEquivalenceService
    ) {
      this.$rootScope = $rootScope
      this.vis2png = vis2png
      this.currentDataService = $currentDataService
      this.genericReq = $requestService.httpReq
      this.apiReq = $requestService.apiReq
      this.notification = $notificationService
      this.navigationService = $navigationService
      this.keyEquivalence = $keyEquivalenceService.equivalences()
    }

    /**
     * Checks if is a float
     */
    isFloat(n) {
      return Number(n) === n && n % 1 !== 0
    }

    /**
     * Checks if the search time range is between two dates
     */
    betweenDates() {
      try {
        let { earliest_time, latest_time } = JSON.parse(
          localStorage.getItem('searchTimeRange')
        )
        earliest_time = parseFloat(earliest_time)
        latest_time = parseFloat(latest_time)
        if (
          isNaN(earliest_time) ||
          !earliest_time ||
          isNaN(latest_time) ||
          !latest_time
        ) {
          return false
        }
        if (
          Number.isInteger(earliest_time) ||
          (this.isFloat(earliest_time) && Number.isInteger(latest_time)) ||
          this.isFloat(latest_time)
        ) {
          return this.formatBetweenDates(earliest_time, latest_time)
        }
      } catch (error) {
        return false
      }
    }

    /**
     * Formats dates in milliseconds to a human readable format
     */
    formatBetweenDates(earliest, latest) {
      try {
        //Remove milliseconds and multiply per 1000 to get a milliseconds date format
        earliest = Math.trunc(earliest) * 1000
        latest = Math.trunc(latest) * 1000
        const eDate = this.formatDate(earliest)
        const lDate = this.formatDate(latest)
        return `${eDate}  -  ${lDate}`
      } catch (error) {
        throw new Error(error)
      }
    }

    /**
     * Formats dates in YYYY-MM-DD HH:MM:SS format
     */
    formatDate(date) {
      try {
        const d = new Date(date)
        const year = d.getFullYear()
        const month =
          d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
        const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
        const hour = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
        const minute =
          d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
        const second =
          d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
        const dateFormatted = `${year}-${month}-${day} ${hour}:${minute}:${second}`
        return dateFormatted
      } catch (error) {
        return date
      }
    }

    /**
     * Converts an array of Splunk visualizations to PNG format
     * @param {String} tab
     * @param {Boolean} isAgents
     * @param {Array} vizz
     */
    async startVis2Png(
      tab,
      sectionTitle,
      queryFilters,
      vizz = [],
      metrics = {},
      tableResults = {},
      isAgents = false
    ) {
      try {
        metrics = JSON.stringify(metrics)
        this.$rootScope.$broadcast('loadingReporting', { status: true })
        if (this.vis2png.isWorking()) {
          this.notification.showSimpleToast('Report in progress')
          return
        }
        this.$rootScope.$applyAsync()

        this.vis2png.clear()

        for (const item of vizz) {
          const tmpHTMLElement = $(`#${item}`)
          this.vis2png.assignHTMLItem(item, tmpHTMLElement)
        }

        const appliedFilters = this.currentDataService.getSerializedFilters()

        const images = await this.vis2png.checkArray(vizz)
        const name = `wazuh-${isAgents ? 'agents' : 'overview'}-${tab}-${
          (Date.now() / 1000) | 0
        }.pdf`

        let timeRange

        //Search time range
        try {
          timeRange =
            this.betweenDates() ||
            document
              .getElementById('timePicker')
              .getElementsByTagName('span')[1].innerHTML
        } catch (error) {
          timeRange = false
        }

        const timeZone = new Date().getTimezoneOffset()
        const data = {
          images,
          tableResults,
          sectionTitle,
          timeRange,
          queryFilters,
          metrics,
          name,
          title: isAgents ? `Agents ${tab}` : `Overview ${tab}`,
          filters: appliedFilters.filters,
          time: appliedFilters.time,
          searchBar: appliedFilters.searchBar,
          tables: appliedFilters.tables,
          pdfName: tab,
          section: isAgents ? 'agents' : 'overview',
          isAgents,
          timeZone,
        }
        await this.genericReq('POST', '/report/generate', {
          data: JSON.stringify(data),
        })
        this.$rootScope.$applyAsync()
        try {
          const reportingUrl = this.navigationService.updateURLParameter(
            window.location.href,
            'currentTab',
            'mg-reporting'
          )
          this.notification.showSuccessToast(
            `Success. Go to Management -> <a href=${reportingUrl}> Reporting </a>`
          )
        } catch (error) {
          this.notification.showSuccessToast(
            'Success. Go to Management ->  Reporting'
          )
        }
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        return
      } catch (error) {
        this.$rootScope.reportBusy = false
        this.$rootScope.reportStatus = false
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        if (error === 'Impossible fetch visualizations') {
          this.notification.showErrorToast(`Reporting error: ${error}.`)
        } else {
          this.notification.showErrorToast('Reporting error.')
        }
      }
    }

    async reportInventoryData(agentId) {
      try {
        let tableResults = {}
        let isAgents
        this.$rootScope.$broadcast('loadingReporting', { status: true })
        //Get agent info and formating tables
        try {
          const agent = await Promise.all([
            this.apiReq(`/agents?q=id=${agentId}`),
            this.apiReq(`/syscheck/${agentId}/last_scan`),
            this.apiReq(`/rootcheck/${agentId}/last_scan`),
            this.apiReq(`/syscollector/${agentId}/hardware`),
            this.apiReq(`/syscollector/${agentId}/os`),
          ])

          const agentInfo = agent[0].data.data.affected_items[0]
          const {
            name,
            id,
            ip,
            version,
            manager,
            os,
            dateAdd,
            lastKeepAlive,
            group,
          } = agentInfo

          isAgents = {
            ID: id,
            Name: name,
            IP: ip,
            Version: version,
            Manager: manager,
            OS: os.codename
              ? `${os.name} ${os.codename} ${os.version}`
              : `${os.name} ${os.version}`,
            dateAdd: dateAdd,
            lastKeepAlive: lastKeepAlive,
            group: group.toString(),
          }
        } catch (error) {
          isAgents = 'inventory'
        }

        //Network interfaces
        const netiface = await this.apiReq(`/syscollector/${agentId}/netiface`)
        const networkInterfaceKeys = ['Name', 'Mac', 'State', 'MTU', 'Type']
        const networkInterfaceData = netiface.data.data.affected_items.map(
          (i) => {
            i.mtu = i.mtu ? i.mtu.toString() : 'undefined'
            return [i.name, i.mac, i.state, i.mtu, i.type]
          }
        )
        const networkInterfaceTable = {
          fields: networkInterfaceKeys,
          rows: networkInterfaceData,
        }
        tableResults['Network interfaces'] = networkInterfaceTable

        //Network ports
        const ports = await this.apiReq(`/syscollector/${agentId}/ports`)
        const networkPortsKeys = ['Local IP', 'Local Port', 'State', 'Protocol']
        const networkPortsData = ports.data.data.affected_items.map((p) => {
          p.local.port = p.local.port ? p.local.port.toString() : 'undefined'
          return [p.local.ip, p.local.port, p.state, p.protocol]
        })
        const networkPortsTable = {
          fields: networkPortsKeys,
          rows: networkPortsData,
        }
        tableResults['Network ports'] = networkPortsTable

        //Network addresses
        const netaddr = await this.apiReq(`/syscollector/${agentId}/netaddr`)
        const networkAdressessKeys = [
          'Interface',
          'Address',
          'Netmask',
          'Protocol',
          'Broadcast',
        ]
        const networkAdressessData = netaddr.data.data.affected_items.map(
          (n) => {
            return [n.iface, n.address, n.netmask, n.proto, n.broadcast]
          }
        )
        const networkAdressessTable = {
          fields: networkAdressessKeys,
          rows: networkAdressessData,
        }
        tableResults['Network addresses'] = networkAdressessTable

        //Processes
        const processes = await this.apiReq(
          `/syscollector/${agentId}/processes`
        )
        const processesKeys = ['Name', 'Euser', 'Priority', 'State']
        const processesData = processes.data.data.affected_items.map((n) => {
          n.nice = n.nice || n.nice === 0 ? n.nice.toString() : 'undefined'
          n.state = this.keyEquivalence[n.state]
          return [n.name, n.euser, n.nice, n.state]
        })
        const processesTable = { fields: processesKeys, rows: processesData }
        tableResults['Processes'] = processesTable

        //Packages
        const packages = await this.apiReq(`/syscollector/${agentId}/packages`)
        const packagesKeys = ['Name', 'Architecture', 'Version', 'Description']
        const packagesData = packages.data.data.affected_items.map((p) => {
          return [p.name, p.architecture, p.version, p.description]
        })
        const packagesTable = { fields: packagesKeys, rows: packagesData }
        tableResults['Packages'] = packagesTable

        const timeZone = new Date().getTimezoneOffset()

        const data = {
          images: [],
          tableResults,
          timeRange: false,
          sectionTitle: 'Inventory Data',
          queryFilters: '',
          metrics: {},
          pdfName: 'agents-inventory',
          isAgents,
          timeZone,
        }

        await this.genericReq('POST', '/report/generate', {
          data: JSON.stringify(data),
        })

        this.$rootScope.$applyAsync()
        const reportingUrl = this.navigationService.updateURLParameter(
          window.location.href,
          'currentTab',
          'mg-reporting'
        )
        this.notification.showSuccessToast(
          `Success. Go to Management -> <a href=${reportingUrl}> Reporting </a>`
        )
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        return
      } catch (error) {
        this.notification.showErrorToast('Reporting error')
      }
    }

    async reportGroupConfiguration(groupName, reportData, apiId) {
      try {
        this.$rootScope.$broadcast('loadingReporting', { status: true })
        const timeZone = new Date().getTimezoneOffset()

        const data = {
          images: [],
          apiId: apiId,
          timeRange: false,
          sectionTitle: 'Group ' + groupName.name + ' configuration',
          queryFilters: '',
          metrics: {},
          tableResults: {},
          pdfName: 'group-conf',
          timeZone,
          data: reportData,
          groupName: groupName,
        }

        await this.genericReq('POST', '/report/generateConfigurationReport', {
          data: JSON.stringify(data),
        })

        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        const reportingUrl = this.navigationService.updateURLParameter(
          window.location.href,
          'currentTab',
          'mg-reporting'
        )
        this.notification.showSuccessToast(
          `Success. Go to Management -> <a href=${reportingUrl}> Reporting </a>`
        )
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        return
      } catch (error) {
        this.notification.showErrorToast('Reporting error')
      }
    }

    async reportAgentConfiguration(agentId, reportData, apiId) {
      try {
        let isAgents
        this.$rootScope.$broadcast('loadingReporting', { status: true })
        try {
          const agent = await Promise.all([
            this.apiReq(`/agents?q=id=${agentId}`),
            this.apiReq(`/syscheck/${agentId}/last_scan`),
            this.apiReq(`/rootcheck/${agentId}/last_scan`),
            this.apiReq(`/syscollector/${agentId}/hardware`),
            this.apiReq(`/syscollector/${agentId}/os`),
          ])

          const agentInfo = agent[0].data.data.affected_items[0]
          const {
            name,
            id,
            ip,
            version,
            manager,
            os,
            dateAdd,
            lastKeepAlive,
            group,
          } = agentInfo

          isAgents = {
            ID: id,
            Name: name,
            IP: ip,
            Version: version,
            Manager: manager,
            OS: `${os.name} ${os.version}`,
            dateAdd: dateAdd,
            lastKeepAlive: lastKeepAlive,
            group: group.toString(),
          }
        } catch (error) {
          isAgents = false
        }

        const isAgentConf = true
        const timeZone = new Date().getTimezoneOffset()

        const data = {
          images: [],
          isAgentConf,
          isAgents,
          apiId: apiId,
          timeRange: false,
          sectionTitle: `Agent ${isAgents.ID} configuration`,
          queryFilters: '',
          metrics: {},
          tableResults: {},
          pdfName: 'agent-conf',
          timeZone,
          data: reportData,
          agentId: agentId,
        }

        await this.genericReq('POST', '/report/generateConfigurationReport', {
          data: JSON.stringify(data),
        })

        this.$rootScope.$broadcast('loadingReporting', { status: false })

        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        const reportingUrl = this.navigationService.updateURLParameter(
          window.location.href,
          'currentTab',
          'mg-reporting'
        )
        this.notification.showSuccessToast(
          `Success. Go to Management -> <a href=${reportingUrl}> Reporting </a>`
        )
        this.$rootScope.$applyAsync()

        return
      } catch (error) {
        this.notification.showErrorToast('Reporting error')
      }
    }
  }

  module.service('$reportingService', ReportingService)
})
