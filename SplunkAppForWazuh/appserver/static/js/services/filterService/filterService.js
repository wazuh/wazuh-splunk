define(['../module'], function (module) {
  'use strict'
  module.service('$filterService', function () {
    return {

      /**
       * Returns the stored filters
       */
      getFilters: () => {
        if (window.localStorage.filters)
          return JSON.parse(window.localStorage.filters)
        else
          return []
      },

      /**
       * Adds a new filter
       * @param {String} filter 
       */
      addFilter: (filter) => {
        const filterJson = JSON.parse(filter)
        if (window.localStorage.filters) {
          const filters = JSON.parse(window.localStorage.filters)
          let isInIt = false
          filters.map(fil => {
            if (fil[Object.keys(filterJson)]) {
              isInIt = true
              fil[Object.keys(filterJson)] = filterJson[Object.keys(filterJson)]
            }
          })
          if (!isInIt) {
            filters.push(filterJson)
          }
          window.localStorage.setItem('filters', JSON.stringify(filters))
        } else {
          window.localStorage.setItem('filters', `[${filter}]`)
        }
      },

      /**
       * Returns the filters in a way that visualizations can handle
       * @returns {String} The serialized filters
       */
      getSerializedFilters: () => {
        let filterStr = ' '
        if (window.localStorage.filters)
          for (const filter of JSON.parse(window.localStorage.filters)) {
            if (typeof filter === 'object') {
              const key = Object.keys(filter)[0]
              filterStr += key
              filterStr += '='
              filterStr += filter[key]
              filterStr += ' '
            } else {
              filterStr += filter + ' '
            }
          }
        return filterStr
      },

      /**
       * Removes a filter
       * @param {Object}: The filter to be removed
       */
      removeFilter: (filter) => {
        filter = JSON.parse(`{"${filter.split(':')[0]}":"${filter.split(':')[1]}"}`)
        const filters = JSON.parse(window.localStorage.filters)
        if (filters.length === 1) {
          delete window.localStorage.filters
          return
        }
        filters.map((item, index) => {
          if (Object.keys(item)[0] === Object.keys(filter)[0]) {
            filters.splice(index, 1)
          }
        })
        window.localStorage.setItem('filters', JSON.stringify(filters))
      },

      /**
       * Sets the filters empty
       */
      cleanFilters: () => {
        delete window.localStorage.filters
      }
    }
  })
})