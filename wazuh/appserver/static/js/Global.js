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



    //
    // SEARCH MANAGERS
    //


    var search1 = new SearchManager({
      "id": "search1",
      "status_buckets": 0,
      "sample_ratio": null,
      "search": "| inputlookup kvstore_lookup | eval  KeyID = _key | table baseip ,baseport,ipapi,portapi,userapi,passapi | rename baseip as Base-IP, baseport as Base-Port, ipapi as IP-API, portapi as Port-API, userapi as Username, passapi as Password",
      "latest_time": "now",
      "earliest_time": "-24h@h",
      "cancelOnUnload": true,
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true });


    //
    // SPLUNK LAYOUT
    //

    $('header').remove();
    new LayoutView({ "hideSplunkBar": false, "hideFooter": false, "hideChrome": false, "hideAppBar": false })
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
      "drilldown": "none",
      "managerid": "search1",
      "el": $('#element1')
    }, { tokens: true, tokenNamespace: "submitted" }).render();


    //
    // VIEWS: FORM INPUTS
    //

    var input1 = new TextInput({
      "id": "input1",
      "value": "$form.baseip$",
      "el": $('#input1')
    }, { tokens: true }).render();

    input1.on("change", function (newValue) {
      FormUtils.handleValueChange(input1);
    });

    var input2 = new TextInput({
      "id": "input2",
      "value": "$form.baseport$",
      "el": $('#input2')
    }, { tokens: true }).render();

    input2.on("change", function (newValue) {
      FormUtils.handleValueChange(input2);
    });

    var input3 = new TextInput({
      "id": "input3",
      "value": "$form.apiip$",
      "el": $('#input3')
    }, { tokens: true }).render();

    input3.on("change", function (newValue) {
      FormUtils.handleValueChange(input3);
    });

    var input4 = new TextInput({
      "id": "input4",
      "value": "$form.apiport$",
      "el": $('#input4')
    }, { tokens: true }).render();

    input4.on("change", function (newValue) {
      FormUtils.handleValueChange(input4);
    });

    var input5 = new TextInput({
      "id": "input5",
      "value": "$form.apiuser$",
      "el": $('#input5')
    }, { tokens: true }).render();

    input5.on("change", function (newValue) {
      FormUtils.handleValueChange(input5);
    });

    var input6 = new TextInput({
      "id": "input6",
      "value": "$form.apipass$",
      "el": $('#input6')
    }, { tokens: true }).render();

    input6.on("change", function (newValue) {
      FormUtils.handleValueChange(input6);
    });


    // 
    // SUBMIT FORM DATA
    //
    // 
    // DELETE BUTTON
    //

    // Call this function when the Delete Record button is clicked
    $("#deleteRecord").click(function () {
      // Get the value of the key ID field
      var tokens = mvc.Components.get("default");
      //var form_keyid = tokens.get("KeyID");

      // Delete the record that corresponds to the key ID using
      // the del method to send a DELETE request
      // to the storage/collections/data/{collection}/ endpoint
      service.del("storage/collections/data/credentials/")
        .done(function () {
          // Run the search again to update the table
          search1.startSearch();
        });
      //return false;
    });
    // 
    // SERVICE OBJECT
    //

    // Create a service object using the Splunk SDK for JavaScript
    // to send REST requests
    var service = mvc.createService({ owner: "nobody" });

    var submit = new SubmitButton({
      id: 'submit',
      el: $('#search_btn')
    }, { tokens: true }).render();

    submit.on("submit", function () {
      service.del("storage/collections/data/credentials/")
        .done(function () {
          // Run the search again to update the table
          submitTokens();

          // When the Submit button is clicked, get all the form fields by accessing token values
          var tokens = mvc.Components.get("default");
          var form_baseip = tokens.get("baseip");
          var form_baseport = tokens.get("baseport");
          var form_apiip = tokens.get("apiip");
          var form_apiport = tokens.get("apiport");
          var form_apiuser = tokens.get("apiuser");
          var form_apipass = tokens.get("apipass");

          // Create a dictionary to store the field names and values
          var record = {
            "baseip": form_baseip,
            "baseport": form_baseport,
            "ipapi": form_apiip,
            "portapi": form_apiport,
            "userapi": form_apiuser,
            "passapi": form_apipass
          };

          // Use the request method to send a REST POST request
          // to the storage/collections/data/{collection}/ endpoint
          service.request(
            "storage/collections/data/credentials/",
            "POST",
            null,
            null,
            JSON.stringify(record),
            { "Content-Type": "application/json" },
            null)
            .done(function () {
              // Run the search again to update the table
              search1.startSearch();

              // Clear the form fields 
              $("#formCustomerInfo input[type=text]").val("");
            });
        });

    });

    // Initialize time tokens to default
    if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
      defaultTokenModel.set({ earliest: '0', latest: '' });
    }

    if (!_.isEmpty(urlTokenModel.toJSON())) {
      submitTokens();
    }


    //
    // DASHBOARD READY
    //

    DashboardController.ready();
    pageLoading = false;

  }
);
// ]]>
