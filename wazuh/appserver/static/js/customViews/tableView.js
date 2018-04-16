define(function (require, exports, module) {
  const _ = require("underscore")
  const $ = require('jquery')
  const tableLib = require("../thirdPartyLibs/dataTables.min.js")
  // Wrapper of DataTable objects
  let result = {}
  result.data = []
  const table = class DataTable {
    constructor() { console.log('builded') }
    generateTable($el, urlArg, pages) {
      $el.DataTable({
        "ajax": {
          'url': urlArg,
          'dataSrc': ''
        } ,
        "columns": [
          { "data": "timestamp" },
          { "data": "tag" },
          { "data": "description" },
          { "data": "level" }
      ]
      })
    }
  }
  return table
})