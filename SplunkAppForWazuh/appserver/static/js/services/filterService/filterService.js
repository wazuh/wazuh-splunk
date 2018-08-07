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
          console.log('processing filter ', filter)
          const filters = JSON.parse(window.localStorage.getItem('filters'))
          console.log('the already existent filters ', filters)
          let isInIt = false
          for (const fil of filters) {
            for (let key in fil) {
              console.log('a key ', key + ' a filter ', filters[key])
              console.log('Object.keys(filter) ', Object.keys(filter))
              for (let keyDup in filter) {
                if (keyDup === key) {
                  console.log('already exists, rewriting ', filters[key], filter[key])
                  filters[key] = filter[key]
                  isInIt = true
                  break;
                }
              }
            }
          }
          if (!isInIt) {
            console.log('a new filter ', filter)
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