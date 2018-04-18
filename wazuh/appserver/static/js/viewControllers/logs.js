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
        const parsedData = JSON.parse(data)
        console.log(parsedData)
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
        const table = new tableView($('#miid'), 'http://192.168.0.159:8000/custom/wazuh/manager/logs?ip=192.168.0.130&port=55000&user=foo&pass=bar', opts)
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