
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
        var tokens = mvc.Components.get("default");
        var ipBase = tokens.get("baseip");
        var ipApi = tokens.get("ipapi");
        var portApi = tokens.get("portapi");
        var passApi = tokens.get("passwordapi");
        var userApi = tokens.get("userapi");
        var portBase = tokens.get("baseport");
        var endPoint = 'http://' + ipBase + ':' + portBase + '/custom/wazuh/manager/configuration?ip=' + ipApi + '&port=' + portApi + '&user=' + userApi + '&pass=' + passApi;
        $.get(endPoint, function (data) {
          var jsonObj = JSON.parse(data);
          console.log(jsonObj);
          // Fill the initial data
          $('#jsonOutput').text(jsonObj.global.jsonout_output);
          $('#logAlertLevel').text(jsonObj.alerts.log_alert_level);
          $('#nameCluster').text(jsonObj.cluster.name);
          $('#typeCluster').text(jsonObj.cluster.node_type);
          $('#sysFreq').text(jsonObj.syscheck.frequency);
          $('#sysAlertNewFiles').text(jsonObj.syscheck.alert_new_files);
          $('#rootFreq').text(jsonObj.rootcheck.frequency);
          $('#rootSkipNFS').text(jsonObj.rootcheck.skip_nfs);
          $('#authPurge').text(jsonObj.auth.purge);
          $('#authForceInsert').text(jsonObj.auth.force_insert);
          // First load Global view by default
          var globalUrl = "/static/app/wazuh/views/global.html"
          $('#dynamicContent').load(globalUrl, function (data) {
            $('#jsonViewOutput').text(jsonObj.global.jsonout_output);
            $('#logAll').text(jsonObj.global.logall);
            $('#logAllJson').text(jsonObj.global.logall_json);
            $('#whiteList').text(jsonObj.global.white_list);
            $('#logViewAlertLevel').text(jsonObj.alerts.log_alert_level);
            $('#emailNotifications').text(jsonObj.global.email_notification);
            $('#emailAlertLevel').text(jsonObj.alerts.email_alert_level);
            $('#emailTo').text(jsonObj.global.email_to);
            $('#emailFrom').text(jsonObj.global.email_from);
            $('#smtpServer').text(jsonObj.global.smtp_server);
            $('#maxEmailPerHour').text(jsonObj.global.email_maxperhour);
          });
          // If click on Global section
          $('#global').click(function () {
            var globalUrl = "/static/app/wazuh/views/global.html"
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              $('#jsonViewOutput').text(jsonObj.global.jsonout_output);
              $('#logAll').text(jsonObj.global.logall);
              $('#logAllJson').text(jsonObj.global.logall_json);
              $('#whiteList').text(jsonObj.global.white_list);
              $('#logViewAlertLevel').text(jsonObj.alerts.log_alert_level);
              $('#emailNotifications').text(jsonObj.global.email_notification);
              $('#emailAlertLevel').text(jsonObj.alerts.email_alert_level);
              $('#emailTo').text(jsonObj.global.email_to);
              $('#emailFrom').text(jsonObj.global.email_from);
              $('#smtpServer').text(jsonObj.global.smtp_server);
              $('#maxEmailPerHour').text(jsonObj.global.email_maxperhour);
            });
          })
          // If click on Cluster section
          $('#cluster').click(function () {
            var globalUrl = "/static/app/wazuh/views/cluster.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              $('#disabled').text(jsonObj.cluster.disabled);
              $('#hidden').text(jsonObj.cluster.hidden);
              $('#name').text(jsonObj.cluster.name);
              $('#interval').text(jsonObj.cluster.interval);
              $('#nodeName').text(jsonObj.cluster.node_name);
              $('#nodeType').text(jsonObj.cluster.node_type);
              $('#port').text(jsonObj.cluster.port);
              $('#bindAddress').text(jsonObj.cluster.bind_addr);
              $('#nodes').text(jsonObj.cluster.nodes);
            });
          })
          // If click on Syscheck section
          $('#syscheck').click(function () {
            var globalUrl = "/static/app/wazuh/views/syscheck.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              console.log('syscheck ',jsonObj.syscheck,typeof jsonObj.syscheck);
              console.log('syscheck frequency' ,jsonObj.syscheck.frequency, typeof jsonObj.syscheck.frequency);
              $('#sysDisabled').text(jsonObj.syscheck.frequency);
              $('#sysFrequency').text('dflñngdlg');
              $('#sysAutoIgnore').text(jsonObj.syscheck.auto_ignore);
              $('#sysViewAlertNewFiles').text(jsonObj.syscheck.alert_new_files);
              $('#sysScanOnStart').text(jsonObj.syscheck.scan_on_start);
              $('#sysNoDiff').text(jsonObj.syscheck.nodiff);
              $('#sysSkipNfs').text(jsonObj.syscheck.skip_nfs);
              //$('#sysMonitoringDirectories').text(jsonObj.syscheck.directories);
              console.log('size of directories ',jsonObj.syscheck.directories.length);
              for (var i = 0; i < jsonObj.syscheck.directories.length; i++) {
                console.log("one iteration")
                $('#monitoringDirectories').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Path</p>' +
                  '<p>' + jsonObj.syscheck.directories[i].path + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Check all</p>' +
                  '<p>' + jsonObj.syscheck.directories[i].check_all + '</p>' +
                  '</div>' 
                )
              }
            
            });
          })
          // If click on Rootcheck section
          $('#rootcheck').click(function () {
            var globalUrl = "/static/app/wazuh/views/rootcheck.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              $('#rootDisabled').text(jsonObj.rootcheck.disabled);
              $('#rootFiles').text(jsonObj.rootcheck.rootkit_files);
              $('#rootTrojans').text(jsonObj.rootcheck.rootkit_trojans);
              $('#rootViewFreq').text(jsonObj.rootcheck.frequency);
              $('#rootSkipNfs').text(jsonObj.rootcheck.skip_nfs);
              $('#rootSysAuditFiles').text(jsonObj.rootcheck.system_audit);
            });
          })
          // If click on Auth section
          $('#auth').click(function () {
            var globalUrl = "/static/app/wazuh/views/auth.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              $('#authDisabled').text(jsonObj.auth.disabled);
              $('#authViewPurge').text(jsonObj.auth.purge);
              $('#authViewForceInsert').text(jsonObj.auth.force_insert);
              $('#authSslVerifyHost').text(jsonObj.auth.ssl_verify_host);
              $('#authLimitMaxAgents').text(jsonObj.auth.limit_maxagents);
              $('#authForceTime').text(jsonObj.auth.force_time);
              $('#authSslManagerKey').text(jsonObj.auth.ssl_manager_key);
              $('#authSslManagerCert').text(jsonObj.auth.ssl_manager_cert);
              $('#authUseSourceIP').text(jsonObj.auth.use_source_ip);
              $('#authUsePassword').text(jsonObj.auth.use_password);
              $('#authPort').text(jsonObj.auth.port);
              $('#authSslAutoNegotiate').text(jsonObj.auth.ssl_auto_negotiate);
              $('#authCiphers').text(jsonObj.auth.ciphers);
            });
          })
          // If click on Ruleset section
          $('#ruleset').click(function () {
            var globalUrl = "/static/app/wazuh/views/ruleset.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              $('#ruleDecoderDirs').text(jsonObj.ruleset.decoder_dir);
              $('#ruleRulesDirs').text(jsonObj.ruleset.rule_dir);
              $('#ruleRuleExcludes').text(jsonObj.ruleset.rule_exclude);
              $('#ruleCdbLists').text(jsonObj.ruleset.list);
            });
          })
          // If click on Command section
          $('#command').click(function () {
            var globalUrl = "/static/app/wazuh/views/command.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              for (var i = 0; i < jsonObj.command.length; i++) {
                $('#commandChilds').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Name</p>' +
                  '<p>' + jsonObj.command[i].name  + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Expect</p>' +
                  '<p>' + jsonObj.command[i].expect + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Executable</p>' +
                  '<p>' + jsonObj.command[i].executable + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Timeout allowed</p>' +
                  '<p>' + jsonObj.command[i].timeout_allowed + '</p>' +
                  '</div>'
                )
              }
            });
          });
          // If click on Remote section
          $('#remote').click(function () {
            var globalUrl = "/static/app/wazuh/views/remote.html";
            $('#dynamicContent').empty();
            $('#dynamicContent').load(globalUrl, function (data) {
              for (var i = 0; i < jsonObj.remote.length; i++) {
                $('#remoteChilds').append(
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Connection</p>' +
                  '<p>' + jsonObj.remote[i].connection + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Port</p>' +
                  '<p>' + jsonObj.remote[i].port + '</p>' +
                  '</div>' +
                  '<div class="wz-flex-container wz-flex-row wz-flex-align-space-between">' +
                  '<p>Protocol</p>' +
                  '<p>' + jsonObj.remote[i].protocol + '</p>' +
                  '</div>' 
                )
              }
              $('#remConnection').text(jsonObj.remote.decoder_dir);
              $('#remPort').text(jsonObj.ruleset.rule_dir);
              $('#remProtocol').text(jsonObj.ruleset.rule_exclude);
            });
          });
        }).fail(function () {
          console.error("error");
        })
      });
    })


    //
    // SEARCH MANAGERS
    //

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


    //
    // VIEWS: FORM INPUTS
    //

    DashboardController.onReady(function () {
      if (!submittedTokenModel.has('earliest') && !submittedTokenModel.has('latest')) {
        submittedTokenModel.set({ earliest: '0', latest: '' });
      }
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