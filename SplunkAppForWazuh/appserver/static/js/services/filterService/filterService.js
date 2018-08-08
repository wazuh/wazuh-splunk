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
       * @param {Object}: The filter to be removed
       */
      removeFilter: (filter) => {
        delete filter['$$hashKey']
        const key = Object.keys(filter)[0]
        console.log('key ', key)
        console.log('finding key in ', JSON.parse(window.localStorage.filters))
        const index = JSON.parse(window.localStorage.filters).findIndex(x => { return x[key] == filter[key] })
        console.log('index ',index)
        if (index > -1) {
          console.log(' array of filters ',JSON.parse(window.localStorage.filters))
          console.log('deleting in position ',index)
          const newArr = JSON.parse(window.localStorage.filters).splice(index, 1)
          console.log('newArr ', newArr)
          window.localStorage.setItem('filters', JSON.stringify(newArr))
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