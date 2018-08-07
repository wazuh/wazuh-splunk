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
       * @param {Object} filter 
       */
      addFilter: (filter) => {
        if (window.localStorage.filters) {
          const filters = JSON.parse(window.localStorage.getItem('filters'))
          let isInIt = false
          for(const key in filters){
            if (Object.keys(filter)[0] === key) {
              filters[key] = filter[key]
              isInIt = true
              break;
            }
          }
          if(!isInIt) {
            filters.push(filter)
          }
          window.localStorage.setItem('filters', JSON.stringify(filters))
        } else {
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