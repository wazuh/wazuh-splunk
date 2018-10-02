define(['../module'], function (module) {
  'use strict'
  
  class FilterService {
    constructor($notificationService){
      this.$notificationService = $notificationService
    }
    
    /**
    * Returns the filters
    * @returns {Array} the Array of filters
    */
    getFilters(){
      try {
        if (window.localStorage.filters)
        return JSON.parse(window.localStorage.filters)
        else
        return []
      } catch (err) {
        return []
      }
    }
    
    /**
    * Adds a new filter
    * @param {String} filter
    */
    addFilter(filter){
      try {
        const filterJson = JSON.parse(filter)
        if (window.localStorage.filters) {
          const filters = JSON.parse(window.localStorage.filters)
          let isInIt = false
          filters.map(fil => {
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
        this.$notificationService.showSimpleToast('Incorrent format. Please use key:value syntax')
      }
    }
    
    /**
    * Returns the filters in a way that visualizations can handle
    * @returns {String} The serialized filters
    */
    getSerializedFilters(){
      try{
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
      } catch(err) {
        this.$notificationService.showSimpleToast('Error when getting filters.')
      }
    }
    
    /**
    * Removes a filter
    * @param {Object}: The filter to be removed
    */
    removeFilter(filter){
      try{
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
      } catch(err) {
        this.$notificationService.showSimpleToast('Error removing filter.')
      }
    }
    
    /**
    * Sets the filters empty
    */
    cleanFilters(){
      delete window.localStorage.filters
    }
    
  }
  module.service('$filterService', FilterService )
})