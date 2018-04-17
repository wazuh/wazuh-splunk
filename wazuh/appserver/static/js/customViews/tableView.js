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
        "ordering": true,
        "orderMulti": true,
        "paging": true,
        "processing": true,
        "serverSide": true,
        "pageLength": 5,
        "ajax": {
          url: urlArg,
          type: 'get',
          dataFilter: (data) => {
            let json = jQuery.parseJSON(data);
            console.log(json)
            json.recordsTotal = json.data.totalItems;
            json.recordsFiltered = json.data.totalItems;
            json.data = json.data.items;
            return JSON.stringify(json); // return JSON string
          },
        },
        "columns": [
          { "data": "timestamp", 'orderable': true },
          { "data": "tag", 'orderable': true },
          { "data": "description", 'orderable': true },
          { "data": "level", 'orderable': true }
        ]
      });
    }
  }
  return table
})