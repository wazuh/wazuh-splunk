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
  "splunkjs/mvc/simplexml/urltokenmodel"
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
    UrlTokenModel

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
        setToken('baseip', parsedData[0].baseip);
        setToken('baseport', parsedData[0].baseport);
        setToken('ipapi', parsedData[0].ipapi);
        setToken('portapi', parsedData[0].portapi);
        setToken('userapi', parsedData[0].userapi);
        setToken('passwordapi', parsedData[0].passapi);
        setToken("loadedtokens", "true");
      });
    })

    //
    // SEARCH MANAGERS
    //


    var search1 = new SearchManager({
      "id": "search1",
      "cancelOnUnload": true,
      "sample_ratio": 1,
      "earliest_time": "-60m@m",
      "status_buckets": 0,
      "search": "| getruleset $baseip$ $baseport$ $ipapi$ $portapi$ $userapi$ $passwordapi$ id=* level=* | rename pci-0 as pci0,pci-1 as pci1,pci-2 as pci2,pci-3 as pci3,pci-4 as pci4, groups-0 as groups0, groups-1 as groups1, groups-2 as groups2 | eval Requirement = mvappend(pci0,pci1,pci2,pci3,pci4) | eval Groups = mvappend(groups0,groups1,groups2) | search Requirement=$pci$ | search Groups=$group$ | search level=$level$ |  search id=$id$ |table id, file, description, Requirement, Groups, level | dedup id |  sort - level",
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

    var element1 = new TableElement({
      "id": "element1",
      "count": 20,
      "dataOverlayMode": "none",
      "drilldown": "cell",
      "percentagesRow": "false",
      "rowNumbers": "false",
      "totalsRow": "false",
      "wrap": "false",
      "managerid": "search1",
      "el": $('#element1')
    }, { tokens: true, tokenNamespace: "submitted" }).render();

    element1.on("click", function (e) {
      if (e.field !== undefined) {
        e.preventDefault();
        var url = TokenUtils.replaceTokenNames("{{SPLUNKWEB_URL_PREFIX}}/app/wazuh/search?q=| getruleset $baseip$ $baseport$ $ipapi$ $portapi$ $userapi$ $passwordapi$ id=* level=* | rename pci-0 as pci0,pci-1 as pci1,pci-2 as pci2,pci-3 as pci3,pci-4 as pci4, groups-0 as groups0, groups-1 as groups1, groups-2 as groups2 | eval Requirement = mvappend(pci0,pci1,pci2,pci3,pci4) | eval Groups = mvappend(groups0,groups1,groups2) | search Requirement=$pci$ | search Groups=$group$ | table id, file, description, Requirement, Groups, level | dedup id |  sort - level&earliest=-60m@m&latest=now", _.extend(submittedTokenModel.toJSON(), e.data), TokenUtils.getEscaper('url'), TokenUtils.getFilters(mvc.Components));
        utils.redirect(url, false, "_blank");
      }
    });


    //
    // VIEWS: FORM INPUTS
    //

    var input1 = new TextInput({
      "id": "input1",
      "initialValue": "*",
      "searchWhenChanged": true,
      "default": "*",
      "value": "$form.id$",
      "el": $('#input1')
    }, { tokens: true }).render();

    input1.on("change", function (newValue) {
      FormUtils.handleValueChange(input1);
    });

    var input2 = new TextInput({
      "id": "input2",
      "initialValue": "*",
      "searchWhenChanged": true,
      "default": "*",
      "value": "$form.pci$",
      "el": $('#input2')
    }, { tokens: true }).render();

    input2.on("change", function (newValue) {
      FormUtils.handleValueChange(input2);
    });

    var input3 = new TextInput({
      "id": "input3",
      "initialValue": "*",
      "searchWhenChanged": true,
      "default": "*",
      "value": "$form.level$",
      "el": $('#input3')
    }, { tokens: true }).render();

    input3.on("change", function (newValue) {
      FormUtils.handleValueChange(input3);
    });

    var input4 = new TextInput({
      "id": "input4",
      "initialValue": "*",
      "searchWhenChanged": true,
      "default": "*",
      "value": "$form.group$",
      "el": $('#input4')
    }, { tokens: true }).render();

    input4.on("change", function (newValue) {
      FormUtils.handleValueChange(input4);
    });

    DashboardController.onReady(function () {
      if (!submittedTokenModel.has('earliest') && !submittedTokenModel.has('latest')) {
        submittedTokenModel.set({ earliest: '0', latest: '' });
      }
    });

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
