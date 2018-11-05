define(['../module'], function (app) {
  'use strict'
  
  class ApiIndexStorageService{
    constructor(){
      this.sessionStorage = sessionStorage
    }
    
    /**
    * Removes the selected index
    */
    removeIndex() {
      delete this.sessionStorage.selectedIndex
    }
    
    /**
    * Select an Index by name
    * @param {String} index 
    */
    setIndex (index) {
      this.sessionStorage.selectedIndex = `{"index":"${index}"}`
    }
    
    /**
    * Returns currently selected index
    * @param {String} index 
    */
    getIndex () {
      if (this.sessionStorage.selectedIndex){
        return JSON.parse(this.sessionStorage.selectedIndex)
      }
      else
      return { "index": "wazuh" }
    }
    
    /**
    * Delete selected API
    */
    removeAPI () {
      try{
        delete this.sessionStorage.selectedAPI
      }catch(err){}
    }
    
    /**
    * Select an API
    * @param {String} API 
    */
    setApi (API) {
      try {
        delete this.sessionStorage.selectedAPI
        if (typeof API === 'object'){
          this.sessionStorage.selectedAPI = JSON.stringify(API)
        }
      } catch (error) {}
      
    }
    
    /**
    * Returns currently selected API
    * @param {String} API 
    */
    getApi () {
      try{
        if (this.sessionStorage.selectedAPI){
          return JSON.parse(this.sessionStorage.selectedAPI)
        }
      }catch(err){
        return null
      }
    }
    
    getExtensions(id) {
      try{
        const current = JSON.parse(this.sessionStorage.extensions)
        return current ? current[id] : false
      } catch(err) {
        return false
      }
    }
    
    setExtensions(id, extensions) {
      const current = this.sessionStorage.extensions || {}
      current[id] = {...extensions}
      if (extensions) {
        this.sessionStorage.extensions = current
      }
    }
    
    
  }
  app.service('$apiIndexStorageService', ApiIndexStorageService)
})