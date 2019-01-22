define(['../module', 'jquery'], function(module, $) {
  'use strict'
  class ReportingService {
    constructor(
      $rootScope,
      vis2png,
      $currentDataService,
      $requestService,
      $notificationService
    ) {
      this.$rootScope = $rootScope
      this.vis2png = vis2png
      this.visHandlers = $currentDataService
      this.genericReq = $requestService.httpReq
      this.apiReq = $requestService.apiReq
      this.errorHandler = $notificationService.showSimpleToast
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
          this.errorHandler('Report in progress')
          return
        }
        if (!this.$rootScope.$$phase) this.$rootScope.$digest()

        this.vis2png.clear()

        for (const item of vizz) {
          const tmpHTMLElement = $(`#${item}`)
          this.vis2png.assignHTMLItem(item, tmpHTMLElement)
        }

        const appliedFilters = this.visHandlers.getSerializedFilters()

        const images = await this.vis2png.checkArray(vizz)
        const name = `wazuh-${
          isAgents ? 'agents' : 'overview'
        }-${tab}-${(Date.now() / 1000) | 0}.pdf`

        //Search time range
        const timeRange = document.getElementById('timePicker').getElementsByTagName('span')[1].innerHTML ?
          document.getElementById('timePicker').getElementsByTagName('span')[1].innerHTML : ' '

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
          isAgents
        }

        await this.genericReq('POST', '/report/generate', {
          data: JSON.stringify(data)
        })

        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        this.errorHandler('Success. Go to Management -> Reporting')
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        return
      } catch (error) {
        this.errorHandler('Reporting error')
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
            this.apiReq(`/agents/${agentId}`),
            this.apiReq(`/syscheck/${agentId}/last_scan`),
            this.apiReq(`/rootcheck/${agentId}/last_scan`),
            this.apiReq(`/syscollector/${agentId}/hardware`),
            this.apiReq(`/syscollector/${agentId}/os`)
          ])
          isAgents = {
            ID: agent[0].data.data.id,
            Name: agent[0].data.data.name,
            IP: agent[0].data.data.ip,
            Version: agent[0].data.data.version,
            Manager: agent[0].data.data.manager,
            OS: `${agent[0].data.data.os.name} ${
              agent[0].data.data.os.codename
            } ${agent[0].data.data.os.version}`,
            dateAdd: agent[0].data.data.dateAdd,
            lastKeepAlive: agent[0].data.data.lastKeepAlive,
            group: agent[0].data.data.group.toString()
          }
        } catch (error) {
          isAgents = 'inventory'
        }

        //Network interfaces
        const netiface = await this.apiReq(`/syscollector/${agentId}/netiface`)
        const networkInterfaceKeys = ['Name', 'Mac', 'State', 'MTU', 'Type']
        const networkInterfaceData = netiface.data.data.items.map(i => {
          i.mtu = i.mtu ? i.mtu.toString() : 'undefined'
          return [i.name, i.mac, i.state, i.mtu, i.type]
        })
        const networkInterfaceTable = {
          fields: networkInterfaceKeys,
          rows: networkInterfaceData
        }
        tableResults['Network interfaces'] = networkInterfaceTable

        //Network ports
        const ports = await this.apiReq(`/syscollector/${agentId}/ports`)
        const networkPortsKeys = ['Local IP', 'Local Port', 'State', 'Protocol']
        const networkPortsData = ports.data.data.items.map(p => {
          p.local.port = p.local.port ? p.local.port.toString() : 'undefined'
          return [p.local.ip, p.local.port, p.state, p.protocol]
        })
        const networkPortsTable = {
          fields: networkPortsKeys,
          rows: networkPortsData
        }
        tableResults['Network ports'] = networkPortsTable

        //Network addresses
        const netaddr = await this.apiReq(`/syscollector/${agentId}/netaddr`)
        const networkAdressessKeys = [
          'Interface',
          'Address',
          'Netmask',
          'Protocol',
          'Broadcast'
        ]
        const networkAdressessData = netaddr.data.data.items.map(n => {
          return [n.iface, n.address, n.netmask, n.proto, n.broadcast]
        })
        const networkAdressessTable = {
          fields: networkAdressessKeys,
          rows: networkAdressessData
        }
        tableResults['Network addresses'] = networkAdressessTable

        //Processes
        const processes = await this.apiReq(
          `/syscollector/${agentId}/processes`
        )
        const processesKeys = ['Name', 'Euser', 'Nice', 'State']
        const processesData = processes.data.data.items.map(n => {
          n.nice = n.nice ? n.nice.toString() : 'undefined'
          return [n.name, n.euser, n.nice, n.state]
        })
        const processesTable = { fields: processesKeys, rows: processesData }
        tableResults['Processes'] = processesTable

        //Packages
        const packages = await this.apiReq(`/syscollector/${agentId}/packages`)
        const packagesKeys = ['Name', 'Architecture', 'Version', 'Description']
        const packagesData = packages.data.data.items.map(p => {
          return [p.name, p.architecture, p.version, p.description]
        })
        const packagesTable = { fields: packagesKeys, rows: packagesData }
        tableResults['Packages'] = packagesTable

        const data = {
          images: [],
          tableResults,
          timeRange: '',
          sectionTitle: 'Inventory Data',
          queryFilters: '',
          metrics: {},
          pdfName: 'agents-inventory',
          isAgents
        }

        await this.genericReq('POST', '/report/generate', {
          data: JSON.stringify(data)
        })

        if (!this.$rootScope.$$phase) this.$rootScope.$digest()
        this.errorHandler('Success. Go to Management -> Reporting')
        this.$rootScope.$broadcast('loadingReporting', { status: false })
        return
      } catch (error) {
        console.error(error)
        this.errorHandler('Reporting error')
      }
    }
  }

  module.service('$reportingService', ReportingService)
})
