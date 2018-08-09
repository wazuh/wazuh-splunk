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
          for (let fil of filters) {
            if (typeof filter === 'string') {
              const key = filter.split(':')[0]
              const value = filter.split(':')[1]
              const newObject = `{"${key}":"${value}"}`
              filter = JSON.parse(newObject)
            }
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
          console.log('adding filters ',filters)
          window.localStorage.setItem('filters', JSON.stringify(filters))
        } else {
          console.log('creating filte in local storage ',filter)
          window.localStorage.setItem('filters', JSON.stringify([filter]))
        }
      },

      /**
       * Returns the filters in a way that visualizations can handle
       * @returns {String} The serialized filters
       */
      getSerializedFilters: () => {
        console.log('serialized filters ', window.localStorage.filters)
        let filters = window.localStorage.filters
        // for (const filter of window.localStorage.filters) {
        //   if (typeof filter === 'object') {
        //     const key = Object.keys(filter)[0]
        //     filters += key
        //     filters += '='
        //     filters += filter[key]
        //     filters += ' '
        //   } else {
        //     filters += filter + ' '
        //   }
        // }
        return filters
      },

      /**
       * Removes a filter
       * @param {Object}: The filter to be removed
       */
      removeFilter: (filter) => {
        console.log('filter in service to delete ',filter, typeof filter)
        filter = JSON.parse(`{"${filter.split(':')[0]}":${filter.split(':')[1]})`)
        const key = `"${Object.keys(filter)[0]}"`
        console.log('key in service ', key)
        const objectFilters = JSON.parse(window.localStorage.filters)
        console.log('key to delete ', key)
        const index = objectFilters.findIndex(x => { return x[key] == filter[key] })
        console.log('positiion ', index)
        if (index > -1) {
          objectFilters.splice(index, 1)
          console.log('tempObj after delete', objectFilters)
          window.localStorage.setItem('filters', JSON.stringify(objectFilters))
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