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

      constructor(element,id,search) {
        this.element = element
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
      }

      cancel(){
        this.search.cancel()
      }

      destroy(){
        this.search.cancel()
        console.log('destroying instance ',this.id)
        mvc.Components.revokeInstance(this.id)
        mvc.Components.revokeInstance(`${this.id}Search`)
        this.element = null
        this.search = null
      }

    }

  })
