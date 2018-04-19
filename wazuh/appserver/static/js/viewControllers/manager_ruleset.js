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
  "splunkjs/mvc/utils",
  "splunkjs/mvc/tokenutils",
  "underscore",
  "jquery",
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/layoutview",
  "splunkjs/mvc/simplexml/dashboardview",
  "splunkjs/mvc/simplexml/dashboard/panelref",
  "splunkjs/mvc/simplexml/element/chart",
  "splunkjs/mvc/simplexml/element/event",
  "splunkjs/mvc/simplexml/element/html",
  "splunkjs/mvc/simplexml/element/list",
  "splunkjs/mvc/simplexml/element/map",
  "splunkjs/mvc/simplexml/element/single",
  "splunkjs/mvc/simplexml/element/table",
  "splunkjs/mvc/simplexml/element/visualization",
  "splunkjs/mvc/simpleform/formutils",
  "splunkjs/mvc/simplexml/eventhandler",
  "splunkjs/mvc/simplexml/searcheventhandler",
  "splunkjs/mvc/simpleform/input/dropdown",
  "splunkjs/mvc/simpleform/input/radiogroup",
  "splunkjs/mvc/simpleform/input/linklist",
  "splunkjs/mvc/simpleform/input/multiselect",
  "splunkjs/mvc/simpleform/input/checkboxgroup",
  "splunkjs/mvc/simpleform/input/text",
  "splunkjs/mvc/simpleform/input/timerange",
  "splunkjs/mvc/simpleform/input/submit",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/savedsearchmanager",
  "splunkjs/mvc/postprocessmanager",
  "splunkjs/mvc/simplexml/urltokenmodel",
  "/static/app/wazuh/js/customViews/tableView.js"

  // Add comma-separated libraries and modules manually here, for example:
  // ..."splunkjs/mvc/simplexml/urltokenmodel",
  // "splunkjs/mvc/tokenforwarder"
],
  function (
    mvc,
    utils,
    TokenUtils,
    _,
    $,
    DashboardController,
    LayoutView,
    Dashboard,
    PanelRef,
    ChartElement,
    EventElement,
    HtmlElement,
    ListElement,
    MapElement,
    SingleElement,
    TableElement,
    VisualizationElement,
    FormUtils,
    EventHandler,
    SearchEventHandler,
    DropdownInput,
    RadioGroupInput,
    LinkListInput,
    MultiSelectInput,
    CheckboxGroupInput,
    TextInput,
    TimeRangeInput,
    SubmitButton,
    SearchManager,
    SavedSearchManager,
    PostProcessManager,
    UrlTokenModel,
    tableView

    // Add comma-separated parameter names here, for example: 
    // ...UrlTokenModel, 
    // TokenForwarder
  ) {

    var pageLoading = true;


    // 
    // TOKENS
    //

    // Create token namespaces
    var urlTokenModel = new UrlTokenModel();
    mvc.Components.registerInstance('url', urlTokenModel);
    var defaultTokenModel = mvc.Components.getInstance('default', { create: true });
    var submittedTokenModel = mvc.Components.getInstance('submitted', { create: true });
    var service = mvc.createService({ owner: "nobody" });

    urlTokenModel.on('url:navigate', function () {
      defaultTokenModel.set(urlTokenModel.toJSON());
      if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
        submitTokens();
      } else {
        submittedTokenModel.clear();
      }
    });

    // Initialize tokens
    defaultTokenModel.set(urlTokenModel.toJSON());

    function submitTokens() {
      // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
      FormUtils.submitForm({ replaceState: pageLoading });
    }

    function setToken(name, value) {
      defaultTokenModel.set(name, value);
      submittedTokenModel.set(name, value);
    }

    function unsetToken(name) {
      defaultTokenModel.unset(name);
      submittedTokenModel.unset(name);
    }

    $(document).ready(function () {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done(function (data) {
        var parsedData = JSON.parse(data);
        console.log(parsedData)
        console.log('BASEIP', JSON.parse(data)[0].baseip);
        setToken('baseip', parsedData[0].baseip);
        setToken('baseport', parsedData[0].baseport);
        setToken('ipapi', parsedData[0].ipapi);
        setToken('portapi', parsedData[0].portapi);
        setToken('userapi', parsedData[0].userapi);
        setToken('passwordapi', parsedData[0].passapi);
        setToken("loadedtokens", "true");
        const url = window.location.href
        const arr = url.split("/");
        const baseUrl = arr[0] + "//" + arr[2]
        console.log('BASEURL ',baseUrl)
        const opts = {
          pages: 10,
          processing: true,
          serverSide: true,
          filterVisible: false,
          columns: [
            { "data": "id", 'orderable': true },
            { "data": "path", 'orderable': true },
            { "data": "status", 'orderable': true },
            { "data": "file", 'orderable': true },
            { "data": "groups", 'orderable': false },
            { "data": "description", 'orderable': true },
            { "data": "level", 'orderable': true },
            { "data": "pci", 'orderable': false }
          ]
        }
        const table = new tableView($('#myTable'), baseUrl+'/custom/wazuh/manager/rules?ip='+parsedData[0].ipapi+'&port='+parsedData[0].portapi+'&user='+parsedData[0].userapi+'&pass='+parsedData[0].passapi, opts)
        table.click(data => {
          setToken("showDetails", "true")
          setToken("id", data.id || "-")
          setToken("description", data.description || "-")
          setToken("Groups", data.groups)
          setToken("details-if_sid", data.details.if_sid || "-")
          setToken("details-regex", data.details.regex || "-")
          setToken("details-info", data.details.info || "-")
          setToken("details-frequency", data.details.frequency || "-")
        })

      })
    })

    //
    // SEARCH MANAGERS
    //


    // var search1 = new SearchManager({
    //   "id": "search1",
    //   "cancelOnUnload": true,
    //   "sample_ratio": 1,
    //   "earliest_time": "-24h@h",
    //   "status_buckets": 0,
    //   "search": "| getruleset 192.168.0.159 8000 192.168.0.130 55000 foo bar |table id, file, description, groups, level,pci | dedup id |  sort - level | fillnull value='-'",
    //   "latest_time": "now",
    //   "app": utils.getCurrentApp(),
    //   "auto_cancel": 90,
    //   "preview": true,
    //   "tokenDependencies": {
    //   },
    //   "runWhenTimeIsUndefined": false
    // }, { tokens: true, tokenNamespace: "submitted" });

    var search2 = new SearchManager({
      "id": "search2",
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "-24h@h",
      "status_buckets": 0,
      "search": "index=wazuh sourcetype=wazuh | top rule.id",
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    var search3 = new SearchManager({
      "id": "search3",
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "-24h@h",
      "status_buckets": 0,
      "search": "index=wazuh sourcetype=wazuh | top rule.groups",
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    var search4 = new SearchManager({
      "id": "search4",
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "-24h@h",
      "status_buckets": 0,
      "search": "index=wazuh sourcetype=wazuh | top rule.pci_dss{} useother=f",
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });

    var search5 = new SearchManager({
      "id": "search5",
      "cancelOnUnload": true,
      "sample_ratio": null,
      "earliest_time": "-24h@h",
      "status_buckets": 0,
      "search": "index=wazuh sourcetype=wazuh  | top rule.level",
      "latest_time": "now",
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true, tokenNamespace: "submitted" });


    //
    // SPLUNK LAYOUT
    //

    $('header').remove();
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0]);

    //
    // DASHBOARD EDITOR
    //

    new Dashboard({
      id: 'dashboard',
      el: $('.dashboard-body'),
      showTitle: true,
      editable: true
    }, { tokens: true }).render();


    //
    // VIEWS: VISUALIZATION ELEMENTS
    //

    // var element1 = new TableElement({
    //   "id": "element1",
    //   "count": 5,
    //   "dataOverlayMode": "none",
    //   "drilldown": "cell",
    //   "fields": ["id", "file", "description", "Requirement", "level"],
    //   "rowNumbers": "false",
    //   "wrap": "true",
    //   "managerid": "search1",
    //   "el": $('#element1')
    // }, { tokens: true, tokenNamespace: "submitted" }).render();

    // element1.on("click", function (e) {
    //   if (e.field !== undefined) {
    //     e.preventDefault();
    //     setToken("showDetails", TokenUtils.replaceTokenNames("true", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("Groups", TokenUtils.replaceTokenNames("$row.Groups$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("Requirement", TokenUtils.replaceTokenNames("$row.Requirement$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("description", TokenUtils.replaceTokenNames("$row.description$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("id", TokenUtils.replaceTokenNames("$row.id$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("details-if_sid", TokenUtils.replaceTokenNames("$row.details-if_sid$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("details-regex", TokenUtils.replaceTokenNames("$row.details-regex$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("details-info", TokenUtils.replaceTokenNames("$row.details-info$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //     setToken("details-frequency", TokenUtils.replaceTokenNames("$row.details-frequency$", _.extend(submittedTokenModel.toJSON(), e.data)));
    //   }
    // });

    var element2 = new HtmlElement({
      "id": "element2",
      "useTokens": true,
      "el": $('#element2')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    DashboardController.addReadyDep(element2.contentLoaded());

    var element3 = new ChartElement({
      "id": "element3",
      "charting.drilldown": "none",
      "resizable": true,
      "charting.chart": "pie",
      "managerid": "search2",
      "el": $('#element3')
    }, { tokens: true, tokenNamespace: "submitted" }).render();


    var element4 = new ChartElement({
      "id": "element4",
      "charting.drilldown": "none",
      "resizable": true,
      "charting.chart": "pie",
      "managerid": "search3",
      "el": $('#element4')
    }, { tokens: true, tokenNamespace: "submitted" }).render();


    var element5 = new ChartElement({
      "id": "element5",
      "charting.drilldown": "none",
      "resizable": true,
      "charting.chart": "pie",
      "managerid": "search4",
      "el": $('#element5')
    }, { tokens: true, tokenNamespace: "submitted" }).render();


    var element6 = new ChartElement({
      "id": "element6",
      "charting.drilldown": "none",
      "resizable": true,
      "charting.chart": "pie",
      "managerid": "search5",
      "el": $('#element6')
    }, { tokens: true, tokenNamespace: "submitted" }).render();


    // Initialize time tokens to default
    if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
      defaultTokenModel.set({ earliest: '0', latest: '' });
    }

    submitTokens();


    //
    // DASHBOARD READY
    //

    DashboardController.ready();
    pageLoading = false;

  }
);
// ]]>
