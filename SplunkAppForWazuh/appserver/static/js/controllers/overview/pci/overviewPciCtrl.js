define([
  '../../module',
  '../../../services/visualizations/chart/linear-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input',
  '../../../services/rawTableData/rawTableDataService'
], function(
  app,
  LinearChart,
  ColumnChart,
  PieChart,
  Table,
  TimePicker,
  Dropdown,
  RawTableDataService
) {
  'use strict'

  class PCI {
    /**
     * Class PCI-DSS
     * @param {*} $urlTokenModel
     * @param {*} $scope
     * @param {*} $currentDataService
     * @param {*} $state
     * @param {*} $reportingService
     */
    constructor(
      $urlTokenModel,
      $scope,
      $currentDataService,
      $state,
      $reportingService,
      pciTabs,
      reportingEnabled,
      gdprExtensionEnabled,
      hipaaExtensionEnabled,
      nistExtensionEnabled
    ) {
      this.scope = $scope
      this.scope.reportingEnabled = reportingEnabled
      this.scope.gdprExtensionEnabled = gdprExtensionEnabled
      this.scope.hipaaExtensionEnabled = hipaaExtensionEnabled
      this.scope.nistExtensionEnabled = nistExtensionEnabled
      this.state = $state
      this.scope.pciTabs = pciTabs ? pciTabs : false
      this.reportingService = $reportingService
      this.tableResults = {}
      this.getFilters = $currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()

      this.scope.$on('deletedFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('barFilter', event => {
        event.stopPropagation()
        this.launchSearches()
      })

      this.scope.$on('$destroy', () => {
        this.dropdown.destroy()
        this.timePicker.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      this.scope.expandArray = [false, false, false, false, false]
      this.scope.expand = (i, id) => this.expand(i, id)

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${
          this.filters
        } sourcetype=wazuh rule.pci_dss{}="*"| stats count by "rule.pci_dss{}" | sort "rule.pci_dss{}" ASC | fields - count`,
        'rule.pci_dss{}',
        '$form.pci$',
        'dropDownInput',
        this.scope
      )
      this.dropdownInstance = this.dropdown.getElement()

      this.dropdownInstance.on('change', newValue => {
        if (newValue && this.dropdownInstance)
          $urlTokenModel.handleValueChange(this.dropdownInstance)
      })

      this.vizz = [
        new ColumnChart(
          'pciReqVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$"  | stats count by rule.pci_dss{}`,
          'pciReqVizz',
          this.scope
        ),
        new LinearChart(
          'evoVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="*" | timechart count by rule.pci_dss{}`,
          'evoVizz',
          this.scope
        ),
        new PieChart(
          'agentsVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count by agent.name`,
          'agentsVizz',
          this.scope
        ),
        new ColumnChart(
          'requirementsByAgentVizz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" agent.name=*| chart  count(rule.pci_dss{}) by rule.pci_dss{},agent.name`,
          'requirementsByAgentVizz',
          this.scope
        ),
        new Table(
          'alertsSummaryViz',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryViz',
          this.scope
        ),
        new RawTableDataService(
          'alertsSummaryTable',
          `${
            this.filters
          } sourcetype=wazuh rule.pci_dss{}="$pci$" | stats count sparkline by agent.name, rule.pci_dss{}, rule.description | sort count DESC | rename agent.name as "Agent Name", rule.pci_dss{} as Requirement, rule.description as "Rule description", count as Count`,
          'alertsSummaryTableToken',
          '$result$',
          this.scope,
          'Alerts Summary'
        )
      ]
    }

    $onInit() {
      try {
        this.scope.loadingVizz = true
        /**
         * Generates report
         */
        this.scope.startVis2Png = () =>
          this.reportingService.startVis2Png(
            'overview-pci',
            'PCI DSS',
            this.filters,
            [
              'pciReqVizz',
              'groupsVizz',
              'agentsVizz',
              'requirementsByAgentVizz',
              'alertsSummaryViz'
            ],
            {}, //Metrics
            this.tableResults
          )

        this.scope.$on('loadingReporting', (event, data) => {
          this.scope.loadingReporting = data.status
        })

        this.scope.$on('checkReportingStatus', () => {
          this.vizzReady = !this.vizz.filter(v => {
            return v.finish === false
          }).length
          if (this.vizzReady) {
            this.scope.loadingVizz = false
          } else {
            this.vizz.map(v => {
              if (v.constructor.name === 'RawTableData') {
                this.tableResults[v.name] = v.results
              }
            })
            this.scope.loadingVizz = true
          }
          if (!this.scope.$$phase) this.scope.$digest()
        })
      } catch (error) {}
    }

    expand(i, id) {
      this.scope.expandArray[i] = !this.scope.expandArray[i]
      let vis = $(
        '#' + id + ' .panel-body .splunk-view .shared-reportvisualizer'
      )
      this.scope.expandArray[i]
        ? vis.css('height', 'calc(100vh - 200px)')
        : vis.css('height', '250px')

      let vis_header = $('.wz-headline-title')
      vis_header.dblclick(e => {
        if (this.scope.expandArray[i]) {
          this.scope.expandArray[i] = !this.scope.expandArray[i]
          this.scope.expandArray[i]
            ? vis.css('height', 'calc(100vh - 200px)')
            : vis.css('height', '250px')
          this.scope.$applyAsync()
        } else {
          e.preventDefault()
        }
      })
    }

    /**
     * Get filters and launches the search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }
  }
  app.controller('overviewPciCtrl', PCI)
})
