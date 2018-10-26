define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
], function (
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  AreaChart,
  Table,
  TimePicker,
  ) {
    'use strict'
    
    app.controller('agentsGeneralCtrl', function ($urlTokenModel, $scope, $requestService, $notificationService, $stateParams, $currentDataService, agent, $state) {
      let filters = $currentDataService.getSerializedFilters()
      const timePicker = new TimePicker('#timePicker')
      const timePickerInstance = timePicker.get()
      
      timePickerInstance.on("change", function (newValue) {
        if (newValue && timePickerInstance)
        $urlTokenModel.handleValueChange(timePickerInstance)
      })
      
      const agentInfo = {
        name: agent[0].data.data.name,
        status: agent[0].data.data.status,
        ip: agent[0].data.data.ip,
        version: agent[0].data.data.version,
        group: agent[0].data.data.group,
        lastKeepAlive: agent[0].data.data.lastKeepAlive,
        dateAdd: agent[0].data.data.dateAdd,
        agentOS: `${agent[0].data.data.os.name} ${agent[0].data.data.os.codename} ${agent[0].data.data.os.version}`,
        syscheck: agent[1].data.data,
        rootcheck: agent[2].data.data
      }
      $scope.agentInfo = agentInfo
      
      $scope.agent = agent[0].data.data
      $scope.id = $stateParams.id
      
      $scope.goGroups = async (group) => {
        try {
          const groupInfo = await $requestService.apiReq(`/agents/groups/`)
          const groupData = groupInfo.data.data.items.filter( item => item.name === group)
          if (!groupInfo || !groupInfo.data || !groupInfo.data.data || groupInfo.data.error) {
            throw Error('Missing fields')
          }
          $state.go(`mg-groups`, { group: groupData[0] } )
        } catch (err) {
          $notificationService.showSimpleToast('Error fetching group data')
        }
      }
      
      const launchSearches = () => {
        filters = $currentDataService.getSerializedFilters()
        $state.reload();
        searches.map(search => search.startSearch())
      }
      
      $scope.$on('deletedFilter', () => {
        launchSearches()
      })
      
      $scope.$on('barFilter', () => {
        launchSearches()
      })
      
      const vizz = [      
        /**
        * Visualizations
        */
       new PieChart('top5AlertsVizz',
       `${filters} sourcetype=wazuh | top \"rule.description\" limit=5`,
       'top5AlertsVizz'),
       new PieChart('top5GroupsVizz',
       `${filters} sourcetype=wazuh | top rule.groups limit=5`,
       'top5GroupsVizz'),
       new PieChart('top5PCIreqVizz',
       `${filters} sourcetype=wazuh | top rule.pci_dss{} limit=5`,
       'top5PCIreqVizz'),
       new LinearChart('alertLevelEvoVizz',
       `${filters} sourcetype=wazuh rule.level=*| timechart count by rule.level`,
       'alertLevelEvoVizz'),
       new ColumnChart('alertsVizz',
       `${filters} sourcetype=wazuh | timechart span=2h count`,
       'alertsVizz'),
       new Table('agentsSummaryVizz',
       `${filters} sourcetype=wazuh |stats count sparkline by rule.id, rule.description, rule.level | sort rule.level DESC | rename rule.id as \"Rule ID\", rule.description as \"Description\", rule.level as Level, count as Count`,
       'agentsSummaryVizz')
      ]
      
      /**
      * When controller is destroyed
      */
      $scope.$on('$destroy', () => {
        timePicker.destroy()
        vizz.map( (vizz) => vizz.destroy())
      })
      
    })
  })
  
  