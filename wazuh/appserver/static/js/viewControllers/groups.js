
require([
  "splunkjs/mvc",
  "underscore",
  "jquery",
  "splunkjs/mvc/layoutview",
  "/static/app/wazuh/js/customViews/tableView.js"
],
  function (
    mvc,
    _,
    $,
    LayoutView,
    tableView
  ) {

    const service = mvc.createService({ owner: "nobody" })

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
            { "data": "id", 'orderable': false },
            { "data": "name", 'orderable': false },
            { "data": "ip", 'orderable': false },
            { "data": "last_keepalive", 'orderable': false }
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
        const tableGroups = new tableView()
        tableGroups.element($('#myGroupTable'))
        tableGroups.build(baseUrl + '/custom/wazuh/manager/groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi, optsGroups)
        $('#row2').hide()
        $('#row3').hide()
        const tableFiles = new tableView()
        tableFiles.element($('#myFilesTable'))
        const tableAgents = new tableView()
        tableAgents.element($('#myAgentsGroupTable'))
        tableGroups.click(data => {
          console.log('data',data,' ',typeof data)
          const groupName = data.name
          tableFiles.build(baseUrl + '/custom/wazuh/agents/files?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, optsFiles)
          const agentsUrl = baseUrl + '/custom/wazuh/agents/groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name
          $.get(baseUrl+'/custom/wazuh/agents/check_agents_groups?ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, data => {
            parsedData = JSON.parse(data)
            if (parsedData && !parsedData.error && parsedData.data && parsedData.data.items && parsedData.data.items.length > 0 && parsedData.data.totalItems)
              tableAgents.build(agentsUrl, optsAgentsGroup)
            else
              $('#panel3').html('<p>No agents were found in this group.</p>')
          })
          tableFiles.click(data => {
            $.get(baseUrl + '/custom/wazuh/agents/filescontent?id=' + groupName + '&filename=' + data.filename + '&ip=' + jsonData[0].ipapi + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi, data => {
              $('#precode').prepend('<pre style="height: 100%" class="wz-pre json-beautifier jsonbeauty scroll "><code>'+data+'</code></pre>')
              $('#row3').show(200)
            })
          })
          $('#row2').show(200)
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