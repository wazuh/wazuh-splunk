/*
 * Wazuh app - Roles Mapping controller
--
 * Copyright (C) 2015-2021 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define([
  '../../module',
  'splunkjs/mvc/searchmanager',
  'splunkjs/mvc/multidropdownview',
  'splunkjs/mvc',
  '../../../libs/codemirror-conv/lib/codemirror',
], function (controllers, SearchManager, MultiDropdownView, mvc, CodeMirror) {
  'use strict'

  const operators = ['FIND', '$FIND', 'MATCH', '$MATCH']
  class RolesMapping {
    constructor(
      $scope,
      roles,
      splunkUsers,
      $notificationService,
      $ruleService,
      $security_service
    ) {
      this.scope = $scope
      this.scope.roles = this.getRolesList(roles.data.data.affected_items || [])
      this.scope.splunkUsersDropdown = this.getSplunkUsersList(
        splunkUsers.data || []
      )
      this.scope.splunkUsers =
        Object.keys(splunkUsers.data).map((data) => data) || []
      this.notification = $notificationService
      this.ruleService = $ruleService
      this.scope.addingNewRoleMapping = false
      this.scope.editingRoleMapping = false
      this.scope.operators = operators
      this.scope.customRules = []
      this.scope.logicalOperator = true
      this.scope.selectedOperator = operators[0]
      this.jsonCodeBox =
        document.getElementById('viewer_json_box') &&
        CodeMirror.fromTextArea(document.getElementById('viewer_json_box'), {
          lineNumbers: false,
          autoRefresh: true,
          matchClosing: true,
          matchBrackets: true,
          mode: { name: 'javascript', json: true },
          theme: 'ttcn',
          foldGutter: true,
          styleSelectedText: true,
          gutters: ['CodeMirror-lint-markers'],
          lint: true,
        })
      this.dropdownRoles = new MultiDropdownView({
        id: 'roles-dropdown',
        managerid: 'roles-search',
        choices: this.scope.roles,
        el: $('#roles-dropdown-view'),
      }).render()

      this.dropdownSplunkUsers = new MultiDropdownView({
        id: 'splunk-users-dropdown',
        managerid: 'splunk-users-search',
        choices: this.scope.splunkUsersDropdown,
        el: $('#splunk-users-dropdown-view'),
      }).render()

      this.searchManager = new SearchManager({
        id: 'roles-mapping-search',
        search:
          '| eventcount summarize=false index=* index=_* | dedup index | fields index',
      })

      this.dropdownRoles.on('change', (newValue) => {
        if (newValue && this.dropdownRoles) {
          this.scope.roles = newValue
          this.scope.$applyAsync()
        }
      })

      this.dropdownSplunkUsers.on('change', (newValue) => {
        if (newValue && this.dropdownSplunkUsers) {
          this.scope.splunkUsersDropdown = newValue
          this.scope.tmpInternalUsersRules = newValue.map((user) => {
            return {
              user_field: 'name',
              searchOperation: 'FIND',
              value: user,
            }
          })
          this.updateJsonRules()
          this.scope.$applyAsync()
        }
      })

      /* RBAC flags */
      this.isAllowed = (action, resource, params = ['*']) => {
        return $security_service.getPolicy(action, resource, params).isAllowed
      }

      this.scope.canReadRules = this.isAllowed('SECURITY_READ', ['RULE_ID'])
      this.scope.canCreateRules = this.isAllowed('SECURITY_CREATE', [
        'RESOURCELESS',
      ])
      this.scope.canUpdateRule = (id) =>
        this.isAllowed('SECURITY_UPDATE', ['RULE_ID'], [id])
    }

    /**
     * Searches for a term
     * @param {String} term
     */
    search(term) {
      this.scope.$broadcast('wazuhSearch', { term })
    }

    addNewCustomRule() {
      if (this.scope.customField && this.scope.customValue) {
        const rule = {
          user_field: this.scope.customField,
          searchOperation: this.scope.selectedOperator,
          value: this.scope.customValue,
        }
        this.scope.customRules.push(rule)
        this.scope.customField = ''
        this.scope.selectedOperator = operators[0]
        this.scope.customValue = ''
        this.updateJsonRules()
        this.scope.$applyAsync()
      } else {
        this.notification.showWarningToast(
          `Please set all fields for the custom rule.`
        )
      }
    }

    onSelectorChange(value) {
      this.scope.selectedOperator = value
    }

    removeRule(id) {
      this.scope.customRules.splice(id, 1)
      this.updateJsonRules()
    }

    updateJsonRules() {
      const ruleObject = this.getJsonFromRule(
        this.scope.tmpInternalUsersRules,
        this.scope.customRules,
        this.scope.logicalOperator
      )
      this.refreshJsonEditor(ruleObject)
    }

    toggleLogicalOperator(state) {
      this.scope.logicalOperator = state
      this.updateJsonRules()
    }

    getJsonFromRule(internalUserRules, rules, operator) {
      const ruleObject = {}
      const logicalOperator = operator ? 'AND' : 'OR'
      const usersRulesArray = internalUserRules.map((item) => {
        const tmpRule = {}
        tmpRule[item.searchOperation] = {}
        tmpRule[item.searchOperation][item.user_field] = item.value
        return tmpRule
      })
      const rulesArray = rules.map((item) => {
        const tmpRule = {}
        tmpRule[item.searchOperation] = {}
        tmpRule[item.searchOperation][item.user_field] = item.value
        return tmpRule
      })
      if (usersRulesArray.length && rulesArray.length) {
        ruleObject['OR'] = [
          {
            OR: usersRulesArray,
          },
          {
            [logicalOperator]: rulesArray,
          },
        ]
      } else {
        if (rulesArray.length == 1) {
          return rulesArray[0]
        } else if (usersRulesArray.length == 1) {
          return usersRulesArray[0]
        } else {
          if (usersRulesArray.length) {
            ruleObject['OR'] = usersRulesArray
          }
          if (rulesArray.length) {
            ruleObject[logicalOperator] = rulesArray
          }
        }
      }
      return ruleObject
    }

    refreshJsonEditor(newJsonRule) {
      this.jsonCodeBox.setValue(
        newJsonRule ? JSON.stringify(newJsonRule, null, 2) : ''
      )
      setTimeout(() => {
        this.jsonCodeBox.refresh()
        this.scope.$applyAsync()
      }, 1)
    }

    getRolesList(rolesData) {
      return rolesData.map((role) => {
        return {
          label: role.name,
          value: role.id,
        }
      })
    }

    getSplunkUsersList(users) {
      return Object.keys(users).map((user) => {
        return {
          label: user,
          value: user,
        }
      })
    }

    formatRules(rulesArray) {
      let wrongFormat = false
      const tmpRules = rulesArray.map((item) => {
        if (
          Object.keys(item).length !== 1 ||
          Array.isArray(item[Object.keys(item)[0]])
        ) {
          wrongFormat = true
        }
        const searchOperationTmp = Object.keys(item)[0]
        if (Object.keys(item[searchOperationTmp]).length !== 1) {
          wrongFormat = true
        }
        const userFieldTmp = Object.keys(item[searchOperationTmp])[0]
        const valueTmp = item[searchOperationTmp][userFieldTmp]

        return {
          user_field: userFieldTmp,
          searchOperation: searchOperationTmp,
          value: valueTmp,
        }
      })

      return { tmpRules, wrongFormat }
    }

    hasInternalUsers(rules, internalUsers) {
      return rules.every((rule) => {
        return internalUsers.some((user) => user === rule.value)
      })
    }

    getFormatedRules(rulesArray, internalUsers) {
      let customRules = []
      let internalUsersRules = []
      let wrongFormat = false
      let formatedRules
      let logicalOperator
      const operatorsCount = rulesArray.filter((rule) =>
        Array.isArray(rule[Object.keys(rule)[0]])
      ).length
      switch (operatorsCount) {
        case 0: // only custom rules or internal users
          formatedRules = this.formatRules(rulesArray)
          wrongFormat = formatedRules.wrongFormat
          if (
            !wrongFormat &&
            this.hasInternalUsers(formatedRules.tmpRules, internalUsers)
          ) {
            internalUsersRules = formatedRules.tmpRules
          } else if (!wrongFormat) {
            customRules = formatedRules.tmpRules
          }
          break
        case 2: // internal users and custom rules
          // get internal users rules
          var operator = Object.keys(rulesArray[0])[0]
          formatedRules = this.formatRules(rulesArray[0][operator])
          wrongFormat = formatedRules.wrongFormat
          if (
            !wrongFormat &&
            this.hasInternalUsers(formatedRules.tmpRules, internalUsers)
          ) {
            internalUsersRules = formatedRules.tmpRules
            customRules = formatedRules.tmpRules
          } else {
            // set all rules as custom rules
            formatedRules = this.formatRules(rulesArray)
            customRules = formatedRules.tmpRules
            wrongFormat = true
            break
          }

          //get custom rules
          operator = Object.keys(rulesArray[1])[0]
          formatedRules = this.formatRules(rulesArray[1][operator])
          customRules = formatedRules.tmpRules
          wrongFormat = formatedRules.wrongFormat
          logicalOperator = operator || 'AND'

          break
        default:
          // set all rules as custom rules
          formatedRules = this.formatRules(rulesArray)
          customRules = formatedRules.tmpRules
          wrongFormat = true
      }

      return {
        customRules,
        internalUsersRules,
        wrongFormat,
        logicalOperator,
      }
    }

    decodeJsonRule(jsonRule, internalUsers) {
      try {
        var wrongFormat = false
        const ruleObject = jsonRule
        if (Object.keys(ruleObject).length !== 1) {
          wrongFormat = true
        }
        var logicalOperator = Object.keys(ruleObject)[0]

        var rulesArray
        if (logicalOperator === 'AND' || logicalOperator === 'OR') {
          rulesArray = ruleObject[logicalOperator]
        } else {
          rulesArray = [ruleObject]
          logicalOperator = 'AND'
        }
        const formatedRules = this.getFormatedRules(rulesArray, internalUsers)

        return {
          customRules: formatedRules.customRules,
          internalUsersRules: formatedRules.internalUsersRules,
          wrongFormat: wrongFormat || formatedRules.wrongFormat,
          logicalOperator: formatedRules.logicalOperator || logicalOperator,
        }
      } catch (error) {
        return {
          customRules: [],
          internalUsersRules: [],
          wrongFormat: true,
        }
      }
    }

    changeOperator(operator) {
      this.scope.selectedOperator = operator
    }

    $onInit() {
      this.scope.addNewRoleMapping = () => this.addNewRoleMapping()
      this.scope.cancelRoleMappingEdition = () =>
        this.cancelRoleMappingEdition()
      this.scope.saveRoleMapping = () => this.saveRoleMapping()
      this.scope.openJsonEditor = () => this.openJsonEditor()
      this.scope.changeOperator = (operator) => this.changeOperator(operator)
      this.scope.addNewCustomRule = () => this.addNewCustomRule()
      this.scope.toggleLogicalOperator = (operator) =>
        this.toggleLogicalOperator(operator)
      this.scope.onSelectorChange = (e, idx) => this.onSelectorChange(e, idx)
      this.scope.updateUserField = (e, idx) => this.updateUserField(e, idx)
      this.scope.updateValueField = (e, idx) => this.updateValueField(e, idx)
      this.scope.removeRule = (id) => this.removeRule(id)
      this.scope.addingNewRoleMapping = false
      this.scope.isOpenJsonEditor = false
      this.scope.search = (term) => this.search(term)
      // Come from the pencil icon on the roles table
      this.scope.$on('openRuleFromList', (ev, parameters) => {
        ev.stopPropagation()
        const isDisabled = parameters.rule.id === 1 || parameters.rule.id === 2
        this.scope.editingRoleMapping = true
        this.scope.addingNewRoleMapping = true
        this.scope.ruleId = parameters.rule.id
        this.scope.roleMappingName = parameters.rule.name
        this.scope.currentRoles = parameters.rule.roles
        this.dropdownRoles.settings.set('disabled', isDisabled)
        this.dropdownSplunkUsers.settings.set('disabled', isDisabled)
        this.jsonCodeBox.setOption('readOnly', isDisabled)
        this.dropdownRoles.val(parameters.rule.roles)
        this.scope.editingRole = isDisabled
        this.scope.overwrite = isDisabled
        this.jsonCodeBox.setValue(JSON.stringify(parameters.rule.rule, null, 2))
        const {
          customRules,
          internalUsersRules,
          wrongFormat,
          logicalOperator,
        } = this.decodeJsonRule(parameters.rule.rule, this.scope.splunkUsers)
        this.scope.wrongFormat = wrongFormat
        this.scope.logicalOperator = logicalOperator === 'AND' ? true : false
        customRules.map((rule) => {
          this.scope.customRules.push(rule)
        })
        this.dropdownSplunkUsers.val(
          internalUsersRules.map((rules) => rules.value)
        )
        this.scope.$applyAsync()
      })

      this.scope.$on('$destroy', () => {
        mvc.Components.revokeInstance('roles-dropdown')
        mvc.Components.revokeInstance('roles-mapping-search')
        mvc.Components.revokeInstance('splunk-users-dropdown')
        this.dropdownRoles = null
        this.dropdownSplunkUsers = null
        this.searchManager = null
        this.jsonCodeBox.setValue('')
      })
    }

    addNewRoleMapping() {
      try {
        this.clearAll()
        this.scope.addingNewRoleMapping = true
        this.dropdownRoles.settings.set('disabled', false)
        this.dropdownSplunkUsers.settings.set('disabled', false)
      } catch (error) {
        this.notification.showErrorToast('Cannot add new Role Mapping.')
      }
    }

    openJsonEditor() {
      setTimeout(() => {
        this.jsonCodeBox.refresh()
        this.scope.$applyAsync()
      }, 1)
      this.scope.isOpenJsonEditor = this.scope.isOpenJsonEditor ? false : true
    }

    clearAll() {
      this.scope.addingNewRoleMapping = false
      this.scope.editingRoleMapping = false
      this.scope.editingRole = false
      this.scope.overwrite = false
      this.scope.roleMappingName = ''
      this.scope.userField = ''
      this.scope.customValue = ''
      this.scope.customField = ''
      this.scope.currentRoles = []
      this.scope.customRules = []
      this.dropdownRoles.val([])
      this.dropdownSplunkUsers.val([])
      this.jsonCodeBox.setOption('readOnly', false)
      this.scope.isOpenJsonEditor = false
      this.jsonCodeBox.setValue('')
      this.scope.$applyAsync()
    }

    cancelRoleMappingEdition() {
      this.clearAll()
    }

    async saveRoleMapping() {
      try {
        const constainsBlanks = /.* .*/
        const roleMappingName = this.scope.roleMappingName
        const roleIds = this.dropdownRoles.val()
        const splunkUsers = this.dropdownSplunkUsers.val()
        const isEdit = this.scope.editingRoleMapping
        const rule = JSON.parse(this.jsonCodeBox.getValue())

        if (roleMappingName && splunkUsers.length && roleIds.length != 0) {
          if (constainsBlanks.test(roleMappingName)) {
            this.notification.showErrorToast(
              'Error creating a new role mapping. The name can not contain white spaces.'
            )
          } else {
            this.scope.saveIncomplete = true
            const result = isEdit
              ? await this.ruleService.updateRule(
                  this.scope.ruleId,
                  { name: roleMappingName, rule: rule },
                  this.scope.currentRoles,
                  roleIds
                )
              : await this.ruleService.saveRule(
                  { name: roleMappingName, rule: rule },
                  roleIds
                )
            if (
              result &&
              result.failed_items[0] &&
              result.failed_items[0].error.code === 4005
            ) {
              this.notification.showWarningToast(
                result.failed_items[0].error.message ||
                  'Role mapping already exists.'
              )
              this.scope.overwrite = true
              this.scope.saveIncomplete = false
              this.scope.$applyAsync()
              return
            }
            if (
              result &&
              result.failed_items[0] &&
              result.failed_items[0].error.code === 4011
            ) {
              this.notification.showWarningToast(
                result.failed_items[0].error.message
              )
              return
            }
            if (result && result.total_failed_items === 0) {
              this.notification.showSuccessToast(
                `Role mapping ${result.affected_items[0].name} ${
                  isEdit ? 'updated' : 'saved'
                } successfully.`
              )
              this.scope.saveIncomplete = false
              this.scope.$applyAsync()
            } else {
              throw new Error(
                result.data.message ||
                  `Cannot ${isEdit ? 'updated' : 'saved'} this Role mapping.`
              )
            }
          }
          this.scope.saveIncomplete = false
          this.clearAll()
        } else {
          this.notification.showWarningToast(
            `Please set all fields for the ${
              isEdit ? 'update' : 'new'
            } Role mapping.`
          )
        }
      } catch (error) {
        this.notification.showErrorToast(error)
      }
    }
  }
  controllers.controller('rolesMappingCtrl', RolesMapping)
})
