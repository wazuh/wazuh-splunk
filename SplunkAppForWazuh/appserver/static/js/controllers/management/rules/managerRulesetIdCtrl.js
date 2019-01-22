define(['../../module', './ruleset'], function(controllers, Ruleset) {
  'use strict'

  class RulesetId extends Ruleset {
    /**
     * Class Ruleset-id
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {*} $state
     * @param {Object} ruleInfo
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      $state,
      ruleInfo,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      extensions
    ) {
      super(
        $scope,
        $sce,
        $notificationService,
        'ruleset',
        $currentDataService,
        $tableFilterService,
        $csvRequestService
      )
      this.state = $state
      this.extensions = extensions
      try {
        this.filters = JSON.parse(window.localStorage.ruleset) || []
      } catch (err) {
        this.filters = []
      }

      this.scope.ruleInfo = ruleInfo.data.data.items[0]
      if (
        !(Object.keys((this.scope.ruleInfo || {}).details || {}) || []).length
      ) {
        this.scope.ruleInfo.details = false
      }
    }

    /**
     * On controller loads
     */
    $onInit() {
      this.scope.isObject = item => typeof item === 'object'
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      this.scope.addDetailFilter = (name, value) =>
        this.addDetailFilter(name, value)

      // Edit rules
      //Remove when fetchFile() works, only for a example
      this.ruleContent = '<!--  -  Docker integration rules  -  Created by Wazuh, Inc. <support@wazuh.com>.  -  This program is a free software; you can redistribute it and/or modify it under the terms of GPLv2.--><!--ID: 87900 - 87999--><group name="docker,">    <rule id="87900" level="0">        <decoded_as>json</decoded_as>        <field name="integration">docker</field>        <description>Docker alerts: $(docker.Type).</description>    </rule>     <rule id="87901" level="3">        <if_sid>87900</if_sid>        <field name="docker.status">create</field>        <description>Container $(docker.Actor.Attributes.name) created</description>    </rule>    <rule id="87902" level="3">        <if_sid>87900</if_sid>        <field name="docker.status">destroy</field>        <description>Container $(docker.Actor.Attributes.name) destroyed</description>    </rule>    <rule id="87903" level="3">        <if_sid>87900</if_sid>        <field name="docker.status">start</field>        <description>Container $(docker.Actor.Attributes.name) started</description>    </rule>	<rule id="87904" level="3">        <if_sid>87900</if_sid>        <field name="docker.status">stop</field>        <description>Container $(docker.Actor.Attributes.name) stopped</description>    </rule>    <rule id="87905" level="3">        <if_sid>87900</if_sid>        <field name="docker.status">^pause</field>        <description>Container $(docker.Actor.Attributes.name) paused</description>    </rule>    <rule id="87906" level="3">        <if_sid>87900</if_sid>        <field name="docker.status">unpause</field>        <description>Container $(docker.Actor.Attributes.name) unpaused</description>    </rule></group>'

      this.scope.adminMode = this.extensions['admin'] === 'true'      
      this.scope.saveRuleConfig = () => this.saveRuleConfig()
      this.scope.closeEditingFile = () => this.closeEditingFile()
      this.scope.xmlIsValid = valid => this.xmlIsValid(valid)
      this.scope.editRule = fileName =>
        this.editRule(fileName)
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
        window.localStorage.setItem('ruleset', JSON.stringify(this.filters))
        this.state.go('mg-rules')
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

    saveRuleConfig() {
      this.scope.editingFile = false
      /*this.scope.$broadcast('saveXmlFile', {
        ruleFile: this.scope.ruleInfo.file
      })*/
      this.toast("Rule configuration saved")
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

    async editRule(fileName) {
      try {
        this.scope.editingFile = true
        //this.scope.fetchedXML = await this.fetchFile()
        this.scope.fetchedXML = this.ruleContent
        this.scope.$broadcast('fetchedFile', { data: this.scope.fetchedXML })
      } catch (error) {
        this.scope.fetchedXML = null
        this.toast(error.message || error)
      }
      if (!this.scope.$$phase) this.scope.$digest()
      return
    }
  }
  controllers.controller('managerRulesetIdCtrl', RulesetId)
})
