define(function (require, exports, module) {
  const $ = require('jquery')
  const tableLib = require("../thirdPartyLibs/dataTables.min.js")

  // Exportable DataTable class
  const table = class DataTable {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     * @param {String} urlArg: API endpoint
     * @param {Object} opt: options
     */
    constructor($el, urlArg ,opt) {
      this.table = $el.DataTable({
        "ordering":  true,
        "orderMulti": true,
        "paging": true,
        "processing": opt.processing || true,
        "serverSide": opt.serverSide || true,
        "pageLength": opt.pages || 10,
        "ajax": {
          url: urlArg,
          type: opt.method || 'get',
          dataFilter: (data) => {
            let json = jQuery.parseJSON(data);
            json.recordsTotal = json.data.totalItems;
            json.recordsFiltered = json.data.totalItems;
            json.data = json.data.items;
            return JSON.stringify(json); // return JSON string
          },
        },
        "bFilter": opt.filterVisible || false,
        'sDom': '<"top"i>rt<"bottom"flp><"clear">',
        "columns": opt.columns
      })
    }
  }
  return table
})