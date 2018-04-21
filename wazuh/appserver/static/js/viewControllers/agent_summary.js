
require([
  "splunkjs/mvc",
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/wazuh/js/customViews/tableView.js"
],
  function (
    mvc,
    $,
    LayoutView,
    tableView
  ) {

    const service = mvc.createService({ owner: "nobody" })

    $(document).ready(() => {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done((data) => {

        // Inject DataTable
        const jsonData = JSON.parse(data)
        console.log(jsonData)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]

        const opts = {
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
        const table = new tableView($('#myAgentTable'))
        table.build(baseUrl+'/custom/wazuh/agents/agents?ip='+jsonData[0].ipapi+'&port='+jsonData[0].portapi+'&user='+jsonData[0].userapi+'&pass='+jsonData[0].passapi, opts)
      })
    })
    
    $('header').remove()
    new LayoutView({ "hideFooter": false, "hideChrome": false, "hideSplunkBar": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])
  }
)

