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
          for (const fil of filters) {
            for (let key in fil) {
              for (let keyDup in filter) {
                if (keyDup === key) {
                  filters[key] = filter[key]
                  isInIt = true
                  break;
                }
              }
            }
          }
          if (!isInIt) {
            filters.push(filter)
          }
          window.localStorage.setItem('filters', JSON.stringify(filters))
        } else {
          window.localStorage.setItem('filters', JSON.stringify([filter]))
        }
      },

      /**
       * Removes a filter
       */
      removeFilter: (filter) => {
        console.log('filters ',JSON.parse(window.localStorage.filters))
        delete filter['$$hashKey']
        console.log('deleting filter ',filter)

        const index = JSON.parse(window.localStorage.filters).indexOf(filter)
        console.log('index ',index)
        if (index > -1) {
          window.localStorage.setItem('filters',JSON.parse(window.localStorage.filters).splice(index, 1))
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