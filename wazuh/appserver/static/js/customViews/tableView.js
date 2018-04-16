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
        dom: "Bfrtip",
        paging: true,
        pageLength: 5,
        ajax: function (data, callback, settings) {
          $.ajax({
            url: urlArg,
            // dataType: 'text',
            type: 'get',
            dataSrc: 'data.items'
            // data: {
            //   RecordsStart: data.start,
            //   PageSize: data.length
            // },
            // success: function (data, textStatus, jQxhr) {
            //   callback({
            //     // draw: data.draw,
            //     data: data.Data,
            //     recordsTotal: data.TotalRecords,
            //     recordsFiltered: data.RecordsFiltered
            //   });
            // },
            // error: function (jqXhr, textStatus, errorThrown) {
            // }
          });
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