define(['../module'], function (module) {
  'use strict'

  class FilterService {
    constructor($notificationService) {
      this.notification = $notificationService
    }

    /**
     * Returns the filters
     * @returns {Array} the Array of filters
     */
    getFilters() {
      try {
        if (window.localStorage.filters)
          return JSON.parse(window.localStorage.filters)
        else return []
      } catch (err) {
        return []
      }
    }

    /**
     * Adds a new filter
     * @param {String} filter
     */
    addFilter(filter) {
      try {
        const filterJson = JSON.parse(filter)
        if (window.localStorage.filters) {
          const filters = JSON.parse(window.localStorage.filters)
          let isInIt = false
          filters.map((fil) => {
            let key = Object.keys(filterJson)
            if (key.length > 1) {
              key = key[0]
            }
            if (fil[key]) {
              isInIt = true
              fil[key] = filterJson[key]
            }
          })
          if (!isInIt) {
            filters.push(filterJson)
          }
          window.localStorage.setItem('filters', JSON.stringify(filters))
        } else {
          window.localStorage.setItem('filters', `[${filter}]`)
        }
      } catch (err) {
        this.notification.showErrorToast(
          'Incorrect format. Please use key:value syntax'
        )
      }
    }

    /**
     * Returns the filters in a way that visualizations can handle
     * @returns {String} The serialized filters
     */
    getSerializedFilters(hideOnlyShowFilters = true) {
      try {
        let filterStr = ' '
        let filters = []
        if (window.localStorage.filters) {
          filters = JSON.parse(window.localStorage.filters)
          filters = hideOnlyShowFilters
            ? filters.filter((fil) => !fil.onlyShow)
            : filters
        }
        for (const filter of filters) {
          if (typeof filter === 'object') {
            const key = Object.keys(filter)[0]
            filterStr += key
            filterStr += '='
            filterStr += filter[key].includes(' ')
              ? `"${filter[key]}"`
              : filter[key] // If phrase, use quotes
            filterStr += ' '
          } else {
            filterStr += filter + ' '
          }
        }
        return filterStr
      } catch (err) {
        this.notification.showErrorToast('Error when getting filters.')
      }
    }

    /**
     * Removes a filter
     * @param {Object}: The filter to be removed
     */
    removeFilter(filter) {
      try {
        filter = JSON.parse(
          `{"${filter.split(':')[0]}":"${filter.split(':')[1]}"}`
        )
        const filters = JSON.parse(window.localStorage.filters)
        if (filters.length === 1) {
          delete window.localStorage.filters
          return
        }
        filters.map((item, index) => {
          if (
            Object.keys(item)[0].replace(/{}$/, '') === Object.keys(filter)[0]
          ) {
            filters.splice(index, 1)
          }
        })
        window.localStorage.setItem('filters', JSON.stringify(filters))
      } catch (err) {
        this.notification.showErrorToast('Error removing filter.')
      }
    }

    /**
     * Pins a filter
     * @param {Object}: The filter to be pined
     */
    pinFilter(filter) {
      try {
        filter = JSON.parse(filter)
        const key = Object.keys(filter)[0]
        const value = filter[key]
        const pined = filter.pined
        let filters = JSON.parse(window.localStorage.filters)
        filters = filters.filter((fil) => Object.keys(fil)[0] != key)
        if (pined) {
          filter = JSON.parse(`{"${key}":"${value}"}`)
        } else {
          filter = JSON.parse(`{"${key}":"${value}", "pined":"true"}`)
        }
        filters.push(filter)
        window.localStorage.setItem('filters', JSON.stringify(filters))
      } catch (err) {
        this.notification.showErrorToast('Error pinning filter.')
      }
    }

    /**
     * Sets the filters empty
     */
    cleanFilters() {
      let filters = []
      try {
        if (window.localStorage.filters) {
          filters = JSON.parse(window.localStorage.filters)
          filters = filters.filter((fil) => fil.pined)
          filters = JSON.stringify(filters)
          window.localStorage.setItem('filters', filters)
        }
      } catch (err) {
        delete window.localStorage.filters // In case of error, delete all filters
      }
    }

    /**
     * Sets the filters empty
     */
    cleanAgentsPinedFilters() {
      try {
        let filters = []
        let pined = []
        if (window.localStorage.filters) {
          filters = JSON.parse(window.localStorage.filters)
          pined = filters.filter((fil) => fil.pined)
          filters = filters.filter((fil) => !fil.pined)
          pined = pined.filter(
            (pin) => !Object.keys(pin)[0].startsWith('agent.')
          )
          filters.push(...pined)
        }
        filters = JSON.stringify(filters)
        window.localStorage.setItem('filters', filters)
      } catch (err) {
        delete window.localStorage.filters // In case of error, delete all filters
      }
    }
  }
  module.service('$filterService', FilterService)
})
