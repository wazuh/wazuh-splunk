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
       */
      addFilter: (filter) => {
        if (window.localStorage.filters) {
          console.log('adding filter')
          const filters = JSON.parse(window.localStorage.getItem('filters'))
          filters.push(filter)
          window.localStorage.setItem('filters', JSON.stringify(filters))

        } else {
          console.log('filters empty, adding first one filter')
          window.localStorage.setItem('filters', JSON.stringify([filter]))
        }
      },

      /**
       * Sets the filters empty
       */
      cleanFilters: () => {
        window.localStorage.filters = []
      }
    }
  })
})