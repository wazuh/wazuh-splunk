require([
  "splunkjs/mvc",
  "jquery",
  "/static/app/wazuh/js/customViews/tableView.js"

  // Add comma-separated libraries and modules manually here, for example:
  // ..."splunkjs/mvc/simplexml/urltokenmodel",
  // "splunkjs/mvc/tokenforwarder"
],
  function (
    mvc,
    $,
    tableView
  ) {

    $(document).ready(() => {
      let opts = {
        pages: 10,
        processing: true,
        serverSide: true,
        filterVisible: false,
        columns: [
          { "data": "timestamp", 'orderable': true },
          { "data": "tag", 'orderable': true },
          { "data": "description", 'orderable': true },
          { "data": "level", 'orderable': true }
        ]
      }
      const table = new tableView()
      table.element($('#miid'))
      table.build('http://192.168.0.159:8000/custom/wazuh/manager/logs?ip=192.168.0.130&port=55000&user=foo&pass=bar', opts)
      // table.search($('#tag'))
    })

  })