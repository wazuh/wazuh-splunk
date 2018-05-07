/*
 * Wazuh app - API configuration view controller
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
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
  "/static/app/wazuh/js/utilLib/promisedReq.js"

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
    asyncReq

    // Add comma-separated parameter names here, for example: 
    // ...UrlTokenModel, 
    // TokenForwarder
  ) {

    let pageLoading = true




    // 
    // TOKENS
    //

    // Create token namespaces
    const urlTokenModel = new UrlTokenModel()


    mvc.Components.registerInstance('url', urlTokenModel)


    const defaultTokenModel = mvc.Components.getInstance('default', { create: true })


    const submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })


    const service = mvc.createService({ owner: "nobody" })

    const userRegEx = new RegExp(/^.{3,100}$/)
    const passRegEx = new RegExp(/^.{3,100}$/)
    const urlRegEx = new RegExp(/^https?:\/\/[a-zA-Z0-9-.]{1,300}$/)
    const urlRegExIP = new RegExp(/^https?:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)
    const portRegEx = new RegExp(/^[0-9]{2,5}$/)

    /**
     * Check if an URL is valid or not
     * @param {String} url 
     */
    const validUrl = url => {
      return urlRegEx.test(url) || urlRegExIP.test(url)
    }

    /**
     * Check if a port is valid or not
     * @param {String} port 
     */
    const validPort = port => {
      return portRegEx.test(port)
    }

    /**
     * Check if an user is valid or not
     * @param {String} user 
     */
    const validUsername = user => {
      return userRegEx.test(user)
    }

    /**
     * Check if a password is valid or not
     * @param {String} pass 
     */
    const validPassword = pass => {
      return passRegEx.test(pass)
    }

    /**
     * Check if connection with API was successful
     * @param {Object} jsonData 
     */
    const checkConnection = async jsonData => {
      try {
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]

        // if (jsonData && jsonData[0] && jsonData[0].url)
        //   const parsedData = await asyncReq('get', baseUrl + '/custom/wazuh/agents/check_agents_groups?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, data => {
        //     if (parsedData.data)
        //       return true
        //   }).fail(() => {
        //     return false
        //   })
      } catch (err) {
        Promise.reject(err)
      }
    }

    // $('#input3').focusout( function (data) {
    //   const text = $(this).children().children().children().val();
    //   console.log(text)
    //   if ( validUrl(text) ) {
    //     console.log('valid url')
    //   } else {
    //     console.log('invalid url')
    //   }
    // })

    urlTokenModel.on('url:navigate', function () {
      defaultTokenModel.set(urlTokenModel.toJSON())
      if (!_.isEmpty(urlTokenModel.toJSON()) && !_.all(urlTokenModel.toJSON(), _.isUndefined)) {
        submitTokens()
      } else {
        submittedTokenModel.clear()
      }
    })

    // Initialize tokens
    defaultTokenModel.set(urlTokenModel.toJSON())

    const submitTokens = () => {
      // Copy the contents of the defaultTokenModel to the submittedTokenModel and urlTokenModel
      FormUtils.submitForm({ replaceState: pageLoading })
    }

    const setToken = (name, value) => {
      defaultTokenModel.set(name, value)
      submittedTokenModel.set(name, value)
    }

    const unsetToken = (name) => {
      defaultTokenModel.unset(name)
      submittedTokenModel.unset(name)
    }

    /**
     * On document ready
     */
    $(document).ready(() => {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done(async data => {
        try {
          jsonData = JSON.parse(data)
          const url = window.location.href
          const arr = url.split("/")
          const baseUrl = arr[0] + "//" + arr[2]
          let parsedData = ''
          if (jsonData && jsonData[0] && jsonData[0].url) {
            const endpoint = baseUrl + '/custom/wazuh/agents/check_agents_groups?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name
            parsedData = await asyncReq('get', endpoint)
          }
          if (parsedData.data)
            $('#statusLed').addClass('wz-green-led')
        } catch (err) {
          $('#statusLed').addClass('wz-green-red')
          Promise.reject(err)
        }
      })
    })

    /**
     * Searches and draws for already stored credentials
     */
    const search1 = new SearchManager({
      "id": "search1",
      "status_buckets": 0,
      "sample_ratio": null,
      "search": "| inputlookup kvstore_lookup | eval  KeyID = _key | table url,portapi,userapi | rename url as URL, portapi as Port, userapi as Username",
      "latest_time": "now",
      "earliest_time": "-24h@h",
      "cancelOnUnload": true,
      "app": utils.getCurrentApp(),
      "auto_cancel": 90,
      "preview": true,
      "tokenDependencies": {
      },
      "runWhenTimeIsUndefined": false
    }, { tokens: true })

    $('header').remove()
    new LayoutView({ "hideSplunkBar": false, "hideFooter": false, "hideChrome": false, "hideAppBar": false })
      .render()
      .getContainerElement()
      .appendChild($('.dashboard-body')[0])

    //
    // DASHBOARD EDITOR
    //

    new Dashboard({
      id: 'dashboard',
      el: $('.dashboard-body'),
      showTitle: true,
      editable: true
    }, { tokens: true }).render()

    //
    // VIEWS: VISUALIZATION ELEMENTS
    //

    const element1 = new TableElement({
      "id": "element1",
      "drilldown": "none",
      "managerid": "search1",
      "el": $('#element1')
    }, { tokens: true, tokenNamespace: "submitted" }).render()

    //
    // VIEWS: FORM INPUTS
    //

    const input3 = new TextInput({
      "id": "input3",
      "value": "$form.url$",
      "el": $('#input3')
    }, { tokens: true }).render()

    input3.on("change", function (newValue) {
      FormUtils.handleValueChange(input3)
    })

    const input4 = new TextInput({
      "id": "input4",
      "value": "$form.apiport$",
      "el": $('#input4')
    }, { tokens: true }).render()

    input4.on("change", function (newValue) {
      FormUtils.handleValueChange(input4)
    })

    const input5 = new TextInput({
      "id": "input5",
      "value": "$form.apiuser$",
      "el": $('#input5')
    }, { tokens: true }).render()

    input5.on("change", function (newValue) {
      FormUtils.handleValueChange(input5)
    })

    const input6 = new TextInput({
      "id": "input6",
      "value": "$form.apipass$",
      "el": $('#input6')
    }, { tokens: true }).render()

    /**
     * Action when submit button is clicked
     */
    input6.on("change", function (newValue) {
      service.request(
        "storage/collections/data/credentials/",
        "GET",
        null,
        null,
        null,
        { "Content-Type": "application/json" }, null
      ).done(data => {

        jsonData = JSON.parse(data)
        const url = window.location.href
        const arr = url.split("/")
        const baseUrl = arr[0] + "//" + arr[2]

        if (jsonData && jsonData[0] && jsonData[0].url)
          $.get(baseUrl + '/custom/wazuh/agents/check_agents_groups?ip=' + jsonData[0].url + '&port=' + jsonData[0].portapi + '&user=' + jsonData[0].userapi + '&pass=' + jsonData[0].passapi + '&id=' + data.name, data => {
            parsedData = JSON.parse(data)
            if (parsedData.data)
              $('#statusLed').addClass('wz-green-led')
          }).fail(() => {
            $('#statusLed').addClass('wz-green-red')
          })
      })
      FormUtils.handleValueChange(input6)
    })


    // 
    // SUBMIT FORM DATA
    //
    // 
    // DELETE BUTTON
    //

    // Call this function when the Delete Record button is clicked
    $("#deleteRecord").click(function () {
      // Get the value of the key ID field
      const tokens = mvc.Components.get("default")
      // Delete the record that corresponds to the key ID using
      // the del method to send a DELETE request
      // to the storage/collections/data/{collection}/ endpoint
      service.del("storage/collections/data/credentials/")
        .done(function () {
          // Run the search again to update the table
          search1.startSearch()
        })
    })
    // 
    // SERVICE OBJECT
    //

    // Create a service object using the Splunk SDK for JavaScript
    // to send REST requests

    const submit = new SubmitButton({
      id: 'submit',
      el: $('#search_btn')
    }, { tokens: true }).render()

    submit.on("submit", function () {
      service.del("storage/collections/data/credentials/")
        .done(function () {
          // Run the search again to update the table
          submitTokens()

          // When the Submit button is clicked, get all the form fields by accessing token values
          const tokens = mvc.Components.get("default")
          const form_url = tokens.get("url")
          const form_apiport = tokens.get("apiport")
          const form_apiuser = tokens.get("apiuser")
          const form_apipass = tokens.get("apipass")

          // Create a dictionary to store the field names and values
          const record = {
            "url": form_url,
            "portapi": form_apiport,
            "userapi": form_apiuser,
            "passapi": form_apipass
          }

          // Use the request method to send a REST POST request
          // to the storage/collections/data/{collection}/ endpoint
          service.request(
            "storage/collections/data/credentials/",
            "POST",
            null,
            null,
            JSON.stringify(record),
            { "Content-Type": "application/json" },
            null).done(() => {
              // Run the search again to update the table
              service.request(
                "storage/collections/data/credentials/",
                "GET",
                null,
                null,
                null,
                { "Content-Type": "application/json" }, null
              ).done(data => {


              })


            })
          search1.startSearch()

          // Clear the form fields 
          $("#formCustomerInfo input[type=text]").val("")

        })



    })



    // Initialize time tokens to default
    if (!defaultTokenModel.has('earliest') && !defaultTokenModel.has('latest')) {
      defaultTokenModel.set({ earliest: '0', latest: '' })


    }

    if (!_.isEmpty(urlTokenModel.toJSON())) {
      submitTokens()


    }


    //
    // DASHBOARD READY
    //

    DashboardController.ready()


    pageLoading = false



  }
)