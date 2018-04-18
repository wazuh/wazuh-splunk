// <![CDATA[
// <![CDATA[
//
// LIBRARY REQUIREMENTS
//
// In the require function, we include the necessary libraries and modules for
// the HTML dashboard. Then, we pass variable names for these libraries and
// modules as function parameters, in order.
// 
// When you add libraries or modules, remember to retain this mapping order
// between the library or module and its function parameter. You can do this by
// adding to the end of these lists, as shown in the commented examples below.

require([
  "splunkjs/mvc",
  "jquery",
  "splunkjs/mvc/layoutview",
  "splunkjs/mvc/simplexml/urltokenmodel",
  "/static/app/wazuh/js/customViews/tableView.js"
],
  function (
    mvc,
    $,
    LayoutView,
    UrlTokenModel,
    tableView

  ) {

    var urlTokenModel = new UrlTokenModel()
    mvc.Components.registerInstance('url', urlTokenModel)
    var defaultTokenModel = mvc.Components.getInstance('default', { create: true })
    var service = mvc.createService({ owner: "nobody" })

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
        // Extract backend Protocol://URL:Port for making requests
        const url = window.location.href
        const arr = url.split("/");
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
        const table = new tableView($('#miid'), baseUrl+'/custom/wazuh/manager/logs?ip='+jsonData[0].ipapi+'&port='+jsonData[0].portapi+'&user='+jsonData[0].userapi+'&pass='+jsonData[0].passapi, opts)
        // table.search($('#tag'))
      })
    })

    $('header').remove();
    new LayoutView({ "hideFooter": false, "hideChrome": false, "hideSplunkBar": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])
  }
)