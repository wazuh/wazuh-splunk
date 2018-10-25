define([
  "splunkjs/mvc/simpleform/input/dropdown",
  "../viz/viz"
], function (
  DropdownInput,
  Viz
  ) {
    'use strict'
    
    return class Dropdown extends Viz {
      
      /**
      * Generates a new Dropwdown Splunk visualization
      * @param {String} id 
      * @param {String} search 
      * @param {String} fieldName 
      * @param {String} attachedElement 
      */
      constructor(id, search, fieldName, attachedElement){
        super(new DropdownInput({
          "id": `${id}`,
          "choices": [
            { "label": "ALL", "value": "*" }
          ],
          "labelField": fieldName,
          "valueField": fieldName,
          "initialValue": "*",
          "selectFirstChoice": false,
          "showClearButton": true,
          "value": "$form.profile$",
          "searchWhenChanged": true,
          "managerid": `${id}Search`,
          "el": $(`#${attachedElement}`)
        }, { tokens: true, tokenNamespace: "submitted" }).render(), id, search)

      }
    }
  }) 