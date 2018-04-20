define(function (require, exports, module) {
  const $ = require('jquery')
  const tableLib = require("../thirdPartyLibs/dataTables.min.js")

  // Exportable DataTable class
  const table = class DataTable {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    constructor($el){ 
      this.$el = $el
      this.table = ""
      // this.$el.DataTable({"retrieve": true}) 
    }

    /**
     * Build: generates and draws a datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build( urlArg, opt) {
      
      this.table = this.$el.DataTable({
        "ordering": opt.ordering || true,
        "retrieve": opt.retrieve || true,
        "orderMulti": true,
        "paging": true,
        "processing": opt.processing || true,
        "serverSide": opt.serverSide || true,
        "pageLength": opt.pages || 10,
        "ajax": {
          url: urlArg,
          type: opt.method || 'get',
          dataFilter: (data) => {
            console.log('getting data in table .....')
            let json = jQuery.parseJSON(data)
            console.log('parsed data in table ', json)
            json.recordsTotal = json.data.totalItems
            json.recordsFiltered = json.data.totalItems
            json.data = json.data.items
            return JSON.stringify(json) // return JSON string
          },
        },
        // "bFilter": opt.filterVisible || false,
        // 'sDom': '<"top"i>rt<"bottom"flp><"clear">',
        "columns": opt.columns
      })
      //this.table.draw()
    }

    search($el) {
      this.table.columns().every(function () {
        var that = this;
        console.log('that.search()', that.search())
        $el.on('keyup change', function () {
          if (that.search() !== this.value) {
            console.log('this.value', this.value)
            that
              .search(this.value)
              //.draw();
          }
        })
      })
    }

    /**
     * Click: perform a click in a row
     */
    click(cb) {
      const myThis = this;
      this.$el.on('click', 'tr', function () {
        console.log(myThis.table.row(this).data())
        cb(myThis.table.row(this).data())
      })
    }
  }
  
  return table
})