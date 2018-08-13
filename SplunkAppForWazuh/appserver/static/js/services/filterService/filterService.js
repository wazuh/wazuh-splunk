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

      // /**
      //  * Adds a new filter
      //  * @param {Object} filter 
      //  */
      // addFilter: (filter) => {
      //   console.log('lets add a filter',filter)
      //   if (window.localStorage.filters) {
      //     const filters = JSON.parse(window.localStorage.getItem('filters'))
      //     let isInIt = false
      //     for (let fil of filters) {
      //       if (typeof filter === 'string') {
      //         console.log('filter ',filter)
      //         const key = filter.split(':')[0]
      //         const value = filter.split(':')[1]
      //         const filter = `{"${key}":"${value}"}`
      //         filter = JSON.parse(newObject)
      //       }
      //       for (let key in fil) {
      //         for (let keyDup in filter) {
      //           if (keyDup === key) {
      //             filters[key] = filter[key]
      //             isInIt = true
      //             break;
      //           }
      //         }
      //       }
      //     }
      //     if (!isInIt) {
      //       filters.push(filter)
      //     }
      //     window.localStorage.setItem('filters', JSON.stringify(filters))
      //   } else {
      //     window.localStorage.setItem('filters', JSON.stringify([filter]))
      //   }
      // },

      /**
       * Adds a new filter
       * @param {String} filter 
       */
      addFilter: (filter) => {
        const filterJson = JSON.parse(filter)
        if (window.localStorage.filters) {
          const filters = JSON.parse(window.localStorage.filters)
          filters.map(fil => {
            if (fil[Object.keys(filterJson)]) {
              fil[Object.keys(filterJson)] = filterJson[Object.keys(filterJson)]
            } else {
              filters.push(filterJson)
            }
          })
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
            console.log('coincide ', item, index)
            filters.splice(index, 1)
          }
        })
        window.localStorage.setItem('filters', JSON.stringify(filters))
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