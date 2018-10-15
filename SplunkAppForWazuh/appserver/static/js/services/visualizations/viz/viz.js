define([
  "splunkjs/mvc/utils",
  "splunkjs/mvc/searchmanager",


], function (
  utils,
  SearchManager
) {
    'use strict'


    return class Viz {

      constructor(element,id,search) {
        this.element = element
        this.search = new SearchManager({
          "id": `${id}Search`,
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
        this.cancel()
        this.element = null
        this.search = null
      }

    }

  })
