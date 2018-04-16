define(function (require, exports, module) {
  const _ = require("underscore")
  const $ = require('jquery')
  const tableLib = require("../thirdPartyLibs/dataTables.min.js")
  // Wrapper of DataTable objects
  let result = {}
  result.data = []
  const table = class DataTable {
    constructor() { }
    generateTable($el, urlArg, pages) {
      $el.DataTable({
        dom: "Bfrtip",
        paging: true,
        pageLength: 5,
        ajax: {
          url: urlArg,
          type: 'get',
          dataSrc: 'data.items'
        },
        serverSide: true,
        "columns": [
          { "data": "timestamp" },
          { "data": "tag" },
          { "data": "description" },
          { "data": "level" }
        ]

      });
    }
  }
  return table
})