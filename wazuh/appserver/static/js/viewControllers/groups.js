
require([
  "splunkjs/mvc",
  "underscore",
  "jquery",
  "splunkjs/mvc/simplexml/urltokenmodel",
  "splunkjs/mvc/layoutview",
  "/static/app/wazuh/js/customViews/tableView.js"

  // Add comma-separated libraries and modules manually here, for example:
  // ..."splunkjs/mvc/simplexml/urltokenmodel",
  // "splunkjs/mvc/tokenforwarder"
],
  function (
    mvc,
    _,
    $,
    UrlTokenModel,
    LayoutView,
    tableView
  ) {

    // Create token namespaces
    var urlTokenModel = new UrlTokenModel()
    mvc.Components.registerInstance('url', urlTokenModel)
    var defaultTokenModel = mvc.Components.getInstance('default', { create: true })
    var submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
    var service = mvc.createService({ owner: "nobody" })

    urlTokenModel.on('url:navigate', () => {
      defaultTokenModel.set(urlTokenModel.toJSON())
      if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
        submitTokens()
      } else {
        submittedTokenModel.clear()
      }
    })

    // Initialize tokens
    defaultTokenModel.set(urlTokenModel.toJSON())

    const setToken = (name, value) => {
      defaultTokenModel.set(name, value)
      submittedTokenModel.set(name, value)
    }

    const unsetToken = (name) => {
      defaultTokenModel.unset(name)
      submittedTokenModel.unset(name)
    }

    $(document).ready( () => {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done(data => {
        const jsonData = JSON.parse(data)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]

        // Options for Groups table
        const optsGroups = {
          pages: 10,
          processing: true,
          serverSide: true,
          filterVisible: false,
          columns: [
            { "data": "name", 'orderable': true },
            { "data": "merged_sum", 'orderable': true }
          ]
        }
        // Options for Agents Group table
        const optsAgentsGroup = {
          pages: 10,
          processing: true,
          serverSide: true,
          filterVisible: false,
          columns: [
            { "data": "id", 'orderable': true },
            { "data": "name", 'orderable': true },
            { "data": "ip", 'orderable': true },
            { "data": "last_keepalive", 'orderable': true }
          ]
        }

        // Options for Files Group table
        const optsFiles = {
          pages: 10,
          processing: true,
          serverSide: true,
          filterVisible: false,
          columns: [
            { "data": "filename", 'orderable': true },
            { "data": "hash", 'orderable': true }
          ]
        }
        const tableGroups = new tableView($('#myGroupTable'))
        tableGroups.build(baseUrl + '/custom/wazuh/manager/groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi, optsGroups)
        $('#row2').hide()
        $('#row3').hide()
        const tableFiles = new tableView($('#myFilesTable'))
        const tableAgents = new tableView($('#myAgentsGroupTable'))
        tableGroups.click(data => {
          const groupName = data.name
          //setToken("name", data.name)
          tableFiles.build(baseUrl + '/custom/wazuh/agents/files?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, optsFiles)
          const agentsUrl = baseUrl + '/custom/wazuh/agents/groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name
          $.get(baseUrl+'/custom/wazuh/agents/check_agents_groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, data => {
            parsedData = JSON.parse(data)
            console.log('AGENTS JSOINDATA', parsedData)
            if (parsedData && !parsedData.error && parsedData.data && parsedData.data.items && parsedData.data.items.length > 0 && parsedData.data.totalItems)
              tableAgents.build(agentsUrl, optsFiles)
            else
              $('#panel3').html('<p>No agents were found in this group.</p>')
          })
          // // tableAgents.build(baseUrl + '/custom/wazuh/agents/groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, optsAgentsGroup)
          tableFiles.click(data => {
            console.log('perform click on file',baseUrl + '/custom/wazuh/agents/filescontent?id=' + data.name + '&filename=' + data.filename + '&ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi)
            $.get(baseUrl + '/custom/wazuh/agents/filescontent?id=' + groupName + '&filename=' + data.filename + '&ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi, data => {
              $('#precode').prepend('<pre style="height: 100%" class="wz-pre json-beautifier jsonbeauty scroll "><code>'+data+'</code></pre>')
              $('#row3').show(200)
            })
          })
          $('#row2').show(200)
          //setToken("showDetails", "true")
        })
      })
    })

    $('header').remove()
    new LayoutView({ "hideFooter": false, "hideSplunkBar": false, "hideAppBar": false, "hideChrome": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])
  }
)