
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
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]
        const opts = {
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
        table.element($('#myLogTable'))
        table.build(baseUrl+'/custom/wazuh/manager/logs?ip='+jsonData[0].ipapi+'&port='+jsonData[0].portapi+'&user='+jsonData[0].userapi+'&pass='+jsonData[0].passapi, opts)
      })
    })

    $('header').remove()
    new LayoutView({ "hideFooter": false, "hideChrome": false, "hideSplunkBar": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])
  }
)