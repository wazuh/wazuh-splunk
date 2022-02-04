define([
  'splunkjs/mvc',
  'splunkjs/mvc/utils',
  'splunkjs/mvc/searchmanager',
], function (mvc, utils, SearchManager) {
  'use strict'

  return class Viz {
    /**
     * Generates a new visualization
     * @param {Object} element
     * @param {String} id
     * @param {SearchManager} search
     * @param {scope} scope
     */

    constructor(element, id, search, scope, earliestTime, latestTime) {
      this.id = id
      this.earliestTime = earliestTime ? earliestTime : '$when.earliest$'
      this.latestTime = latestTime ? latestTime : '$when.latest$'
      this.search = new SearchManager(
        {
          id: `${this.id}Search`,
          earliest_time: this.earliestTime,
          latest_time: this.latestTime,
          status_buckets: 0,
          sample_ratio: null,
          cancelOnUnload: true,
          search: `${search}`,
          app: utils.getCurrentApp(),
          auto_cancel: 90,
          preview: true,
          tokenDependencies: {},
          runWhenTimeIsUndefined: false,
        },
        { tokens: true, tokenNamespace: 'submitted' }
      )
      this.element = element
      this.scope = scope
      this.finish = false
      this.search.on('search:done', () => {
        this.finish = true
        this.checkVizzStatus()
      })
      this.search.on('search:start', () => {
        this.finish = false
        this.checkVizzStatus()
      })
    }

    checkVizzStatus() {
      this.scope.$broadcast('checkReportingStatus', () => {})
    }

    changeSearch(newSearch) {
      mvc.Components.revokeInstance(`${this.id}Search`)
      this.search = null
      this.search = new SearchManager(
        {
          id: `${this.id}Search`,
          earliest_time: this.earliestTime || '$when.earliest$',
          latest_time: this.latestTime || '$when.latest$',
          status_buckets: 0,
          sample_ratio: null,
          cancelOnUnload: true,
          search: `${newSearch}`,
          app: utils.getCurrentApp(),
          auto_cancel: 90,
          preview: true,
          tokenDependencies: {},
          runWhenTimeIsUndefined: false,
        },
        { tokens: true, tokenNamespace: 'submitted' }
      )
      this.search.startSearch()
    }

    /**
     * Obtains the search of this viz
     */
    getSearch() {
      return this.search
    }

    /**
     * Obtains the element
     */
    getElement() {
      return this.element
    }
    /**
     * Cancels the search of this viz
     */
    cancel() {
      this.search.cancel()
    }

    /**
     * Deletes any instance of a visualization: vis and search
     * Also removes from Backbone modules
     */
    destroy() {
      try {
        this.cancel()
        mvc.Components.revokeInstance(this.id)
        mvc.Components.revokeInstance(`${this.id}Search`)
        this.element = null
        this.search = null
      } catch (err) {
        return
      }
    }
  }
})
