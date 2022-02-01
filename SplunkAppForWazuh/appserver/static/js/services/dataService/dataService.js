/*
 * Wazuh app - Wazuh data factory
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../module', 'splunkjs/mvc'], function (module) {
  'use strict'
  /**
   * Class that handles dynamic table methods
   */
  module.service('$dataService', function ($requestService) {
    return class DataFactory {
      /**
       * Class constructor
       * @param {String} path
       * @param {Object} implicitFilter
       */
      constructor(path, implicitFilter, implicitSort, isServerSidePagination) {
        this.isServerSidePagination = isServerSidePagination || false
        this.implicitFilter = implicitFilter || false
        this.implicitSort = implicitSort || false
        this.items = []
        this.path = path
        this.filters = []
        this.sortValue = false
        this.sortDir = this.implicitSort !== false
        this.busy = false
        if (this.implicitFilter) this.filters.push(...this.implicitFilter)
        if (this.implicitSort) {
          this.addSorting(this.implicitSort)
        }
      }

      /**
       * Sorts table by a value
       * @param {String} value
       */
      addSorting(value) {
        this.sortValue = value
        this.sortDir = !this.sortDir
      }

      /**
       * Removes filters added to table
       */
      removeFilters() {
        this.filters = []
        if (this.implicitFilter) this.filters.push(...this.implicitFilter)
      }

      /**
       * Serializes filters
       * @param {Object} parameters
       */
      serializeFilters(parameters) {
        if (this.sortValue) {
          parameters.sort = this.sortDir ? '-' + this.sortValue : this.sortValue
        }

        for (const filter of this.filters) {
          if (filter.value !== '') parameters[filter.name] = filter.value
        }
      }

      /**
       * Adds a filter to the table
       * @param {String} filterName
       * @param {String} value
       */
      addFilter(filterName, value) {
        this.filters = this.filters.filter(
          (filter) => filter.name !== filterName
        )
        if (typeof value !== 'undefined') {
          this.filters.push({
            name: filterName,
            value: value,
          })
        }
      }

      /**
       * Performs a HTTP request for fetching data
       * @param {Object} options
       */
      async fetch(options = {}) {
        try {
          if (this.busy) return { items: this.items, time: 0 }
          this.busy = true
          const start = new Date()

          // If it has server-side pagination or If offset is not given, it means we need to start again
          if (this.isServerSidePagination || !options.offset) this.items = []

          const offset = options.offset || 0
          const limit = options.limit || 500
          const parameters = { limit, offset }
          this.serializeFilters(parameters)

          // Fetch next <limit> items
          const firstPage = await $requestService.apiReq(this.path, parameters)

          if (firstPage.data.error) {
            this.busy = false
            return Promise.reject(firstPage.data.message)
          } else {
            if (!this.isServerSidePagination)
              this.items = this.items.filter((item) => !!item)

            this.items.push(...firstPage.data.data.affected_items)

            const totalItems =
              firstPage.data.data.totalItems !== undefined
                ? firstPage.data.data.totalItems
                : firstPage.data.data.total_affected_items

            const remaining =
              this.items.length === totalItems
                ? 0
                : totalItems - this.items.length

            // Ignore manager as an agent, once the team solves this issue, review this line
            if (this.path === '/agents')
              this.items = this.items.filter((item) => item.id !== '000')

            if (!this.isServerSidePagination && remaining > 0)
              this.items.push(...Array(remaining).fill(null))

            const end = new Date()
            const elapsed = (end - start) / 1000
            this.busy = false
            return { totalItems, items: this.items, time: elapsed }
          }
        } catch (error) {
          this.busy = false
          return Promise.reject(error)
        }
      }

      /**
       * Resets table parameters
       */
      reset() {
        this.items = []
        this.filters = []
        this.sortValue = false
        this.sortDir = false
        this.sortValue = false
        if (this.implicitFilter) this.filters.push(...this.implicitFilter)
      }
    }
  })
})
