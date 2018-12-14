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
    /**
     * Class constructor
     * @param {*} $urlTokenModel 
     * @param {*} $rootScope 
     * @param {*} $scope 
     * @param {*} $currentDataService 
     * @param {*} $state 
     * @param {Object} awsMetrics 
     * @param {*} $notificationService 
     */
    constructor($urlTokenModel, $rootScope, $scope, $currentDataService, $state, awsMetrics, $notificationService) {
      this.rootScope = $rootScope
      this.scope = $scope
      this.state = $state
      this.awsMetrics = awsMetrics
      this.toast = $notificationService.showSimpleToast
      this.currentDataService = $currentDataService
      this.currentDataService.addFilter(
        `{"rule.groups":"amazon", "implicit":true}`
      )
      this.getFilters = this.currentDataService.getSerializedFilters
      this.filters = this.getFilters()
      this.submittedTokenModel = $urlTokenModel.getSubmittedTokenModel()
      this.timePicker = new TimePicker(
        '#timePicker',
        $urlTokenModel.handleValueChange
      )

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

    /**
     * On controller loads
     */
    $onInit() {
      try {
        this.amazonFilters = this.buildAmazonFilter()
        if (!this.awsMetrics) {
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
            buckets: [],
            accountInUse: [],
            regionsInUse: []
          }

          if (this.awsMetrics.disabled == "no") {
            this.scope.awsMetrics.enabled = "yes"
          } else {
            this.scope.awsMetrics.enabled = "no"
          }

          this.scope.awsMetrics.buckets = this.awsMetrics.buckets

          this.serializedAwsMetrics = this.serializedMetrics(this.awsMetrics.buckets)
          this.scope.awsMetrics.regionsInUse = this.serializedAwsMetrics.regions
          this.scope.awsMetrics.accountInUse = this.serializedAwsMetrics.accounts
        }

        this.dropdown = new Dropdown(
          'dropDownInput',
          `${this.filters} sourcetype=wazuh data.aws.source=* | stats by data.aws.source | fields data.aws.source | sort data.aws.source ASC`,
          'data.aws.source',
          '$form.awsSource$',
          'dropDownInput'
        )
        this.dropdownInstance = this.dropdown.getElement()
        this.dropdownInstance.on('change', (newValue) => {
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
        })

        this.vizz = [
          /**
           * Visualizations
           */
          new AreaChart(
            'eventsByIdOverTime',
            `${this.amazonFilters} sourcetype=wazuh | timechart count by data.aws.resource.instanceDetails.instanceId usenull=f`,
            'eventsByIdOverTime'
          ),
          new ColumnChart(
            'eventsByRegionOverTime',
            `${this.amazonFilters} sourcetype=wazuh | timechart count by data.aws.awsRegion usenull=f`,
            'eventsByRegionOverTime'
          ),
          new PieChart(
            'topEventsByServiceName',
            `${this.amazonFilters} sourcetype=wazuh | stats count BY data.aws.source`,
            'topEventsByServiceName'
          ),
          new PieChart(
            'topEventsByInstanceId',
            `${this.amazonFilters} sourcetype=wazuh | top data.aws.resource.instanceDetails.instanceId limit=5`,
            'topEventsByInstanceId'
          ),
          new PieChart(
            'topEventsByResourceType',
            `${this.amazonFilters} sourcetype=wazuh | top data.aws.resource.resourceType limit=5`,
            'topEventsByResourceType'
          ),
          new PieChart(
            'topEventsByRegion',
            `${this.amazonFilters} sourcetype=wazuh | top data.aws.awsRegion limit=5`,
            'topEventsByRegion'
          ),
          new Map(
            'map',
            `${
            this.amazonFilters
            } sourcetype=wazuh | geostats latfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lat" longfield="data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.geoLocation.lon" count`,
            'map'
          ),
          new Table(
            'top5Buckets',
            `${this.amazonFilters} sourcetype=wazuh | top data.aws.source limit=5`,
            'top5Buckets'
          ),
          new Table(
            'top5Rules',
            `${this.amazonFilters} sourcetype=wazuh | top rule.id, rule.description limit=5`,
            'top5Rules'
          )
        ]
      } catch (err) {
        this.toast(err.message || err)
      }
    }

    /**
     * Gets filters and launches search
     */
    launchSearches() {
      this.filters = this.getFilters()
      this.state.reload()
    }

    /**
     * Returns regions and accounts without duplicates
     * @param {Objects} buckets 
     */
    serializedMetrics(buckets) {
      try {
        let regions = []
        let accounts = []
        buckets.map(bucket => {
          if (!regions.includes(bucket.regions))
            regions.push(bucket.regions)
          if (!accounts.includes(bucket.aws_account_alias))
            accounts.push(bucket.aws_account_alias)
        })
        return { "regions": regions, "accounts": accounts }
      } catch (err) {
        return Promise.reject(err)
      }

    }

    /**
     * Gets amazon filters
     */
    getAwsFiltersValue() {
      try {
        let sourceValues = []
        let awsCurrentFilters = []
        if (JSON.parse(window.localStorage.getItem('awsSourceFilters'))) {
          awsCurrentFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
        }
        awsCurrentFilters = awsCurrentFilters.filter(item => item['data.aws.source'])
        awsCurrentFilters.map(filter => {
          sourceValues.push(filter['data.aws.source'])
        })
        return sourceValues
      } catch (err) {
        this.toast(err.message || err)
      }
    }

    /**
     * Serializes data.aws.source filters adding OR between filters
     * @param {Object} filters 
     */
    serializedSourceAwsFilters(filters) {
      try {
        let sourceFil = ""
        filters.map(fil => {
          sourceFil = `${sourceFil} data.aws.source=${fil['data.aws.source']} OR`
        })
        sourceFil = sourceFil.substring(0, sourceFil.length - 2);
        return sourceFil
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Serializes the rest of amazon filters
     * @param {Object} filters 
     */
    serializedRestAwsFilters(filters) {
      try {
        let restFil = ""
        filters.map(fil => {
          const key = Object.keys(fil)[0]
          const value = fil[key]
          const filter = `${key}=${value}`
          restFil = `${restFil} ${filter}`
        })
        return restFil
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Gets and builds amazon filters
     */
    buildAmazonFilter() {
      try {
        let filters = this.getFilters()
        if (JSON.parse(window.localStorage.getItem('awsSourceFilters'))) {
          const awsCurrentFilters = JSON.parse(window.localStorage.getItem('awsSourceFilters'))
          const sourceFilters = this.serializedSourceAwsFilters(awsCurrentFilters.filter(item => item['data.aws.source']))
          const restFilters = this.serializedRestAwsFilters(awsCurrentFilters.filter(item => !item['data.aws.source']))
          filters = `${filters} ${sourceFilters}`
          filters = `${filters} ${restFilters}`
        }
        return filters
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }

  app.controller('awsCtrl', AWS)
})
