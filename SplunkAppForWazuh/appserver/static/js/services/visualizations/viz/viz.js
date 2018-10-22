define([
  "splunkjs/mvc",
  "splunkjs/mvc/utils",
  "splunkjs/mvc/searchmanager",
], function (
  mvc,
  utils,
  SearchManager
  ) {
    
    'use strict'
    
    return class Viz {
      
      /**
      * Generates a new visualization
      * @param {Object} element 
      * @param {String} id 
      * @param {SearchManager} search 
      */
      constructor(element,id,search) {
        this.id = id
        this.search = new SearchManager({
          "id": `${this.id}Search`,
          "earliest_time": "$when.earliest$",
          "latest_time": "$when.latest$",
          "status_buckets": 0,
          "sample_ratio": null,
          "cancelOnUnload": true,
          "search": `${search}`,
          "app": utils.getCurrentApp(),
          "auto_cancel": 90,
          "preview": true,
          "tokenDependencies": {
          },
          "runWhenTimeIsUndefined": false
        }, { tokens: true, tokenNamespace: "submitted" })
        this.element = element
      }
      
      /**
      * Obtains the search of this viz
      */
      getSearch() {
        return this.search
      }
      
      /**
      * Obtains the element
      */
      getElement() {
        return this.element
      }
      /**
      * Cancels the search of this viz
      */
      cancel(){
        this.search.cancel()
      }
      
      /**
      * Deletes any instance of a visualization: vis and search
      * Also removes from Backbone modules
      */
      destroy(){
        try{
          this.cancel()
          mvc.Components.revokeInstance(this.id)
          mvc.Components.revokeInstance(`${this.id}Search`)
          this.element = null
          this.search = null
        } catch(err){}
      }
    }
  })
  