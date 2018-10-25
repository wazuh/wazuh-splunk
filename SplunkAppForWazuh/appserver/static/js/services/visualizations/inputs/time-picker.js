define([
  "splunkjs/mvc",
  "splunkjs/mvc/simpleform/input/timerange"
], function (
  mvc,
  TimeRangeInput
  ) {
    'use strict'
    
    return class TimePicker {
      
      /**
      * Generates a new visualization
      * @param {Object} element 
      * @param {String} id 
      */
      constructor(element) {
        this.input = new TimeRangeInput({
          "id": `timePicker`,
          "default": { "latest_time": "now", "earliest_time": "-24h@h" },
          "searchWhenChanged": true,
          "earliest_time": "$form.when.earliest$",
          "latest_time": "$form.when.latest$",
          "el": $(`${element}`)
        }, { tokens: true }).render()
        
      }
      
      /**
       * Gets the TimeRangeInput
       */
      get() {
        return this.input
      }

      /**
       * Destroys the TimeRangeInput instance
       */
      destroy(){
        mvc.Components.revokeInstance(`timePicker`)
      }
    }
  })
  