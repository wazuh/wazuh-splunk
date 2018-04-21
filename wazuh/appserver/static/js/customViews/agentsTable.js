define(function (require, exports, module) {
  const $ = require('jquery')
  const TableView = require("./tableView.js")

  const table = class TableAgents extends TableView {

    /**
     * Constructor method
     * @param {*} $el: DOM table element to attach the table 
     */
    constructor($el) {
      super()
      this.generateTableView($el)
      this.opts = {
        pages: 10,
        processing: true,
        serverSide: true,
        filterVisible: false,
        columns: [
          { "data": "id", 'orderable': true },
          { "data": "ip", 'orderable': true },
          { "data": "name", 'orderable': true },
          { "data": "status", 'orderable': true },
          { "data": "os-platform", 'orderable': true },
          { "data": "os-uname", 'orderable': true },
          { "data": "os-name", 'orderable': true },
          { "data": "os-arch", 'orderable': false },
          { "data": "os-version", 'orderable': true },
          { "data": "dateAdd", 'orderable': false },
          { "data": "lastKeepAlive", 'orderable': false },
          { "data": "last_rootcheck", 'orderable': false },
          { "data": "last_syscheck", 'orderable': false },
          { "data": "version", 'orderable': false }
        ]
      }
    }

    generateTableView($element){
      $element.prepend('<table id="myAgentTable" class="table table-striped table-condensed"><thead><tr><th>id</th><th>ip</th><th>name</th><th>status</th><th>os-platform</th><th>os-uname</th><th>os-name</th><th>os-arch</th><th>os-version</th><th>dateAdd</th><th>lastKeepAlive</th><th>last_rootcheck</th><th>last_syscheck</th><th>version</th></tr></thead></table>')
      super.element($('#myAgentTable'))
    }
    /**
     * Build: generates and draws an agents datatable
     * @param {*} urlArg : url to get the data from
     * @param {Object} opt: options
     */
    build(urlArg) {
      const url = urlArg.baseUrl+'/custom/wazuh/agents/agents?ip='+urlArg.ipApi+'&port='+urlArg.portApi+'&user='+urlArg.userApi+'&pass='+urlArg.passApi
      super.build(url, this.opts)
    }
  }

  return table
})