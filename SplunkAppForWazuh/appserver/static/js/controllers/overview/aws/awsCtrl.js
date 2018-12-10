define([
  '../../module',
  '../../../services/visualizations/chart/pie-chart',
  '../../../services/visualizations/chart/area-chart',
  '../../../services/visualizations/chart/column-chart',
  '../../../services/visualizations/table/table',
  '../../../services/visualizations/map/map',
  '../../../services/visualizations/inputs/time-picker',
  '../../../services/visualizations/inputs/dropdown-input'
], function (app, PieChart, AreaChart, ColumnChart, Table, Map, TimePicker, Dropdown) {
  'use strict'

  class AWS {
    constructor($urlTokenModel, $rootScope, $scope, $currentDataService, $state, awsMetrics) {
      this.rootScope = $rootScope
      this.scope = $scope
      this.state = $state
      this.awsMetrics = awsMetrics
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(`{"rule.groups":"amazon", "implicit":true}`)
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.implicitFilters = this.serializedImplicitFilters(this.currentDataService.getFilters().filter(item => item['implicit']))
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

      if (this.awsMetrics == false) {
        this.scope.awsMetrics = {
          enabled: "N/D",
          scanInterval: "N/D",
          runOnStart: "N/D",
          skipOnError: "N/D",
          buckets: "N/D",
          accountInUse: "N/D",
          regionsInUse: "N/D"
        }
      } else {
        this.awsMetrics = this.awsMetrics[0]['aws-s3']
        this.scope.awsMetrics = {
          enabled: "",
          scanInterval: this.awsMetrics.interval,
          runOnStart: this.awsMetrics.run_on_start,
          skipOnError: this.awsMetrics.skip_on_error,
          buckets: "",
          accountInUse: "",
          regionsInUse: ""
        }
        if (this.awsMetrics.disabled == "no")
          this.scope.awsMetrics.enabled = "yes"
        else
          this.scope.awsMetrics.enabled = "no"
        this.awsMetrics.buckets.map(bucket => {
          this.scope.awsMetrics.buckets = `${this.scope.awsMetrics.buckets} ${bucket.name}`
        })
        this.serializedAwsMetrics = this.serializedMetrics(this.awsMetrics.buckets)
        this.scope.awsMetrics.regionsInUse = this.serializedAwsMetrics.regions
        this.scope.awsMetrics.accountInUse = this.serializedAwsMetrics.accounts
      }

      this.dropdown = new Dropdown(
        'dropDownInput',
        `${this.implicitFilters} sourcetype=wazuh data.aws.source=* | stats by data.aws.source | fields data.aws.source | sort data.aws.source ASC`,
        'data.aws.source',
        '$form.awsSource$',
        'dropDownInput'
      )
      this.dropdownInstance = this.dropdown.getElement()
      this.dropdownInstance.on('change', (newValue) => {
        try {
          this.oldValue = window.localStorage.getItem('lastAwsSourceFilter')
          if (!this.oldValue || (this.oldValue && this.oldValue != newValue)) {
            this.awsCurrentFilters = []
            if (JSON.parse(window.localStorage.getItem('awsSourceFilters')))
              this.awsCurrentFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
            this.sourceValues = this.getAwsFiltersValue()
            this.newKey = 'data.aws.source'
            this.newFilter = {}
            this.newFilter[this.newKey] = newValue
            this.oldValue = window.localStorage.getItem('lastAwsFilter')
            if (newValue === '*') {
              this.newAwsFilters = this.awsCurrentFilters.filter(item => !item['data.aws.source'])
              window.localStorage.setItem('awsSourceFilters', JSON.stringify(this.newAwsFilters))
              window.localStorage.setItem('lastAwsSourceFilter', newValue)
              this.rootScope.$broadcast('applyFiltersAws')
              this.state.reload()
            } else {
              if (!this.sourceValues.includes(newValue)) {
                this.awsCurrentFilters.push(this.newFilter)
                window.localStorage.setItem('awsSourceFilters', JSON.stringify(this.awsCurrentFilters))
                window.localStorage.setItem('lastAwsSourceFilter', newValue)
                this.rootScope.$broadcast('applyFiltersAws')
                this.state.reload()
              }
            }
          }
        } catch (err) {
          console.error("error: ", err)
        }
      })

      this.vizz = [
        /**
         * Visualizations
         */
        new AreaChart(
          'eventsByIdOverTime',
          `${this.filters} sourcetype=wazuh | timechart count by data.aws.resource.instanceDetails.instanceId usenull=f`,
          'eventsByIdOverTime'
        ),
        new ColumnChart(
          'eventsByRegionOverTime',
          `${this.filters} sourcetype=wazuh | timechart count by data.aws.awsRegion usenull=f`,
          'eventsByRegionOverTime'
        ),
        new PieChart(
          'topEventsByServiceName',
          `${this.filters} sourcetype=wazuh | stats count BY data.aws.source`,
          'topEventsByServiceName'
        ),
        new PieChart(
          'topEventsByInstanceId',
          `${this.filters} sourcetype=wazuh | top data.aws.resource.instanceDetails.instanceId limit=5`,
          'topEventsByInstanceId'
        ),
        new PieChart(
          'topEventsByResourceType',
          `${this.filters} sourcetype=wazuh | top data.aws.resource.resourceType limit=5`,
          'topEventsByResourceType'
        ),
        new PieChart(
          'topEventsByRegion',
          `${this.filters} sourcetype=wazuh | top data.aws.awsRegion limit=5`,
          'topEventsByRegion'
        ),
        new Map(
          'map',
          `${
          this.filters
          } sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,
          'map'
        ),
        new Table(
          'top5Buckets',
          `${this.filters} sourcetype=wazuh | top data.aws.source limit=5`,
          'top5Buckets'
        ),
        new Table(
          'top5Rules',
          `${this.filters} sourcetype=wazuh | top rule.id, rule.description limit=5`,
          'top5Rules'
        )
      ]
      this.scope.$on('deletedFilter', () => {
        this.launchSearches()
      })

      this.scope.$on('barFilter', () => {
        this.launchSearches()
      })

      /**
       * On controller destroy
       */
      this.scope.$on('$destroy', () => {
        this.timePicker.destroy()
        this.dropdown.destroy()
        this.vizz.map(vizz => vizz.destroy())
      })
    }
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }

    serializedMetrics(buckets) {
      let regions = []
      let accounts = []
      buckets.map(bucket => {
        if (!regions.includes(bucket.regions))
          regions.push(bucket.regions)
        if (!accounts.includes(bucket.aws_account_alias))
          accounts.push(bucket.aws_account_alias)
      })
      return { "regions": regions.toString().replace(/,/g, " "), "accounts": accounts.toLocaleString().replace(/,/g, " ") }
    }

    serializedImplicitFilters(filters) {
      let implicitFilters = ""
      let key = ""
      filters.map(filter => {
        key = Object.keys(filter)[0]
        implicitFilters = `${implicitFilters} ${key}=${filter[key]}`
      })
      return implicitFilters
    }

    getAwsFiltersValue() {
      let sourceValues = []
      let awsCurrentFilters = []
      if (JSON.parse(window.localStorage.getItem('awsSourceFilters')))
        awsCurrentFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
      awsCurrentFilters = awsCurrentFilters.filter(item => item['data.aws.source'])
      awsCurrentFilters.map(filter => {
        sourceValues.push(filter['data.aws.source'])
      })
      return sourceValues
    }
  }

  app.controller('awsCtrl', AWS)
})
