define(['../../module', '../rules/ruleset'], function(controllers, Ruleset) {
  'use strict'

  class DecodersId extends Ruleset {
    /**
     * Class Decoders-ID
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $state
     * @param {Object} currentDecoder
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $state,
      currentDecoder,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      extensions
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'decoders',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      )
      this.state = $state
      this.extensions = extensions
      try {
        this.filters = JSON.parse(window.localStorage.decoders) || []
      } catch (err) {
        this.filters = []
      }
      this.scope.currentDecoder = currentDecoder.data.data.items[0]
    }

    /**
     * On controller load
     */
    $onInit() {
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.addDetailFilter = (name, value) =>
        this.addDetailFilter(name, value)

      // Edit decoders
      //Remove when fetchFile() works, only for a example
      this.decoderContent = '<!--  -  Exim decoders  -  Author: Alexandr Garaga.  -  Copyright (C) 2009 Trend Micro Inc.  -  Updated by Wazuh, Inc. <support@wazuh.com>.  -  This program is a free software; you can redistribute it and/or modif$--><!-- Exim  - Examples:  - 2017-01-23 03:44:14 dovecot_login authenticator failed for (hydra) [10.101.1.18]:35686: 535 Incorrect authentication data (set_id=user)  - 2017-01-24 05:22:29 dovecot_plain authenticator failed for (test) [::1]:39454: 535 Incorrect authentication data (set_id=test)  - 2017-01-24 03:09:46 SMTP connection from [10.101.1.10]:55010 (TCP/IP connection count = 1)  - 2017-01-24 02:53:13 SMTP connection from (hydra) [10.101.1.10]:53682 lost  - 2017-01-24 05:36:23 SMTP call from (000000) [::1]:39480 dropped: too many syntax or protocol errors (last command was "123")--><decoder name="exim-authfailed">  <parent>windows-date-format</parent>  <prematch offset="after_parent">authenticator failed</prematch>  <regex offset="after_prematch">[(\S+)]:\d+: \d+ Incorrect authentication data \(set_id=(\w+)\)</regex>  <order>srcip,user</order></decoder><decoder name="exim-connect">  <parent>windows-date-format</parent>  <prematch offset="after_parent">^SMTP connection from </prematch>  <regex offset="after_prematch">[(\S+)]:\d+ \(TCP/IP connection count</regex>  <order>srcip</order></decoder><decoder name="exim-disconnect">  <parent>windows-date-format</parent>  <prematch offset="after_parent">^SMTP connection from </prematch>  <regex offset="after_prematch">[(\S+)]:\d+ lost</regex>  <order>srcip</order></decoder><decoder name="exim-syntax-errors">  <parent>windows-date-format</parent>  <prematch offset="after_parent">^SMTP call from </prematch>  <regex offset="after_prematch">[(\S+)]:\d+ dropped: too many syntax or protocol errors</regex>  <order>srcip</order></decoder>'

      this.scope.adminMode = this.extensions['admin'] === 'true'     
      this.scope.isLocal = this.scope.currentDecoder.path === '/var/ossec/etc/decoders' ? true : false 
      this.scope.saveDecoderConfig = () => this.saveDecoderConfig()
      this.scope.closeEditingFile = () => this.closeEditingFile()
      this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
      this.scope.editDecoder = fileName =>
        this.editDecoder(fileName)
    }

    /**
     * Adds a filter
     * @param {String} name
     * @param {String} value
     */
    addDetailFilter(name, value) {
      try {
        const filter = { name: name, value: value }
        this.filters.push(filter)
        window.localStorage.setItem('decoders', JSON.stringify(this.filters))
        this.state.go('mg-decoders')
      } catch (err) {
        this.toast(err.message || err)
      }
    }

    closeEditingFile() {
      this.scope.editingFile = false
      this.scope.$broadcast('closeEditXmlFile', {})
    }

    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      if (!this.scope.$$phase) this.scope.$digest()
    }

    saveDecoderConfig() {
      this.scope.editingFile = false
      /*this.scope.$broadcast('saveXmlFile', {
        ruleFile: this.scope.ruleInfo.file
      })*/
      this.toast("Decoder configuration saved")
    }

    async fetchFile() {
      // MISSING API CALL TO DO THIS
      /*try {
        const data = await this.apiReq(
          `/agents/groups/${this.scope.currentGroup.name}/files/agent.conf`,
          { format: 'xml' }
        )
        const xml = ((data || {}).data || {}).data || false
        if (!xml) {
          throw new Error('Could not fetch agent.conf file')
        }
        return xml
      } catch (error) {
        return Promise.reject(error)
      }*/
    }

    async editDecoder(fileName) {
      try {
        this.scope.editingFile = true
        //this.scope.fetchedXML = await this.fetchFile()
        this.scope.fetchedXML = this.decoderContent
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.toast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }
  }
  controllers.controller('managerDecodersIdCtrl', DecodersId)
})
