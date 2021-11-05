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
  "../../module",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/multidropdownview",
  "splunkjs/mvc"
], function(controllers, SearchManager, MultiDropdownView, mvc) {
  "use strict";

  class RolesMapping {
    constructor(
      $scope,
      isAdmin,
      roles,
      splunkUsers,
      $notificationService,
      $securityService,
    ) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.scope.roles = this.getRolesList(
        roles.data.data.affected_items || []
      );
      this.scope.splunkUsers = this.getSplunkUsersList(
        splunkUsers.data || []
      );
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.addingNewRoleMapping = false;
      this.scope.editingRoleMapping = false;
      this.dropdownRoles = new MultiDropdownView({
        id: "roles-dropdown",
        managerid: "roles-search",
        choices: this.scope.roles,
        el: $("#roles-dropdown-view")
      }).render();

      this.dropdownSplunkUsers = new MultiDropdownView({
        id: "splunk-users-dropdown",
        managerid: "splunk-users-search",
        choices: this.scope.splunkUsers,
        el: $("#splunk-users-dropdown-view")
      }).render();

      this.searchManager = new SearchManager({
        id: "roles-mapping-search",
        search:
          "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      });

      this.dropdownRoles.on("change", newValue => {
        if (newValue && this.dropdownRoles) {
          this.scope.roles = newValue;
          this.scope.$applyAsync();
        }
      });

      this.dropdownSplunkUsers.on("change", newValue => {
        if (newValue && this.dropdownSplunkUsers) {
          this.scope.splunkUsers = newValue;
          this.scope.$applyAsync();
        }
      });

    }

    /**
     * Searches for a term
     * @param {String} term
     */
     search(term) {
      this.scope.$broadcast('wazuhSearch', { term })
    }


    getRolesList(rolesData) {
      return rolesData.map(role => {
        return { label: role.name, value: role.id };
      });
    }

    getSplunkUsersList(users) {
      return Object.keys(users).map(user => {
        return { label: user, value: user };
      });
    }

    formatRules (rulesArray) {
      const tmpRules = rulesArray.map((item) => {
        const searchOperationTmp = Object.keys(item)[0];
        const userFieldTmp = Object.keys(item[searchOperationTmp])[0];
        const valueTmp = item[searchOperationTmp][userFieldTmp];
        return { value: valueTmp };
      });
    
      return tmpRules;
    }

    getFormatedRules (rulesArray) {
      let userRules;
    
      const operatorsCount = rulesArray.filter(rule => Array.isArray(rule[Object.keys(rule)[0]]))
        .length;
      switch (operatorsCount) {
        case 0: // only custom rules or internal users
        userRules = this.formatRules(rulesArray);
          break;
        case 2: // internal users and custom rules
          let operator;
          // get internal users rules
          operator = Object.keys(rulesArray[0])[0];
          userRules = formatRules(rulesArray[0][operator]);
            break;
        default:
          // set all rules as custom rules
          userRules = formatRules(rulesArray);
      }
    
      return { userRules };
    };

    decodeJsonRule (ruleObject) {
        
        var logicalOperator = Object.keys(ruleObject)[0];
    
        var rulesArray;
        if (logicalOperator === 'AND' || logicalOperator === 'OR') {
          rulesArray = ruleObject[logicalOperator];
        } else {
          rulesArray = [ruleObject];
        }

        var userRules = this.getFormatedRules(rulesArray).userRules.map(item => item.value) || [];

        return userRules
    };

    $onInit() {
      this.scope.addNewRoleMapping = () => this.addNewRoleMapping();
      this.scope.cancelRoleMappingEdition = () => this.cancelRoleMappingEdition();
      this.scope.saveRoleMapping = () => this.saveRoleMapping();
      this.scope.changeOperator = operator => this.changeOperator(operator);
      this.scope.addingNewRoleMapping = false;
      this.scope.search = term => this.search(term);
       // Come from the pencil icon on the roles table
       this.scope.$on("openRuleFromList", (ev, parameters) => {
        ev.stopPropagation();
        const isDisabled = parameters.rule.id === 1 || parameters.rule.id === 2
        this.scope.editingRoleMapping = true;
        this.scope.addingNewRoleMapping = true;
        this.scope.ruleId = parameters.rule.id
        this.scope.roleMappingName = parameters.rule.name;
        this.dropdownRoles.settings.set(
          "disabled",
          isDisabled
        );
        this.dropdownSplunkUsers.settings.set(
          "disabled",
          isDisabled
        );
        this.dropdownRoles.val(parameters.rule.roles);
        this.scope.editingRole = isDisabled;
        this.scope.overwrite = isDisabled;
        this.dropdownSplunkUsers.val(this.decodeJsonRule(parameters.rule.rule))
      });

      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("roles-dropdown");
        mvc.Components.revokeInstance("roles-mapping-search");
        mvc.Components.revokeInstance("splunk-users-dropdown");
        this.dropdownRoles = null;
        this.dropdownSplunkUsers = null
        this.searchManager = null;
      });
    }

    addNewRoleMapping() {
      try {
        this.clearAll();
        this.scope.addingNewRoleMapping = true;
        this.dropdownRoles.settings.set("disabled", false);
        this.dropdownSplunkUsers.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role Mapping.");
      }
    }

    clearAll() {
      this.scope.addingNewRoleMapping = false;
      this.scope.editingRoleMapping = false;
      this.scope.editingRole = false;
      this.scope.overwrite = false;
      this.scope.roleMappingName = "";
      this.scope.userField = "";
      this.dropdownRoles.val([]);
      this.dropdownSplunkUsers.val([]);
      this.scope.$applyAsync();
    }

    cancelRoleMappingEdition() {
      this.clearAll();
    }

    async saveRoleMapping() {
        try {
          const constainsBlanks = /.* .*/;
          const roleMappingName = this.scope.roleMappingName;
          const roleIds = this.dropdownRoles.val();
          const splunkUsers = this.dropdownSplunkUsers.val();
          const rulesMap = [];
          const isEdit = this.scope.editingRoleMapping;
          splunkUsers.forEach(item => {
            rulesMap.push({
              "FIND": {
                "username": item
              }
            })
          })
          const rule = rulesMap.length > 1 ? {"OR": rulesMap} : rulesMap[0];
  
          if (roleMappingName && (splunkUsers.length && roleIds.length != 0)) {
            if (constainsBlanks.test(roleMappingName)) {
              this.notification.showErrorToast(
                "Error creating a new role mapping. The name can not contain white spaces."
              );
            } else {
              this.scope.saveIncomplete = true;
              const result = isEdit ?
                await this.securityService.updateRule(
                  this.scope.ruleId,
                  { name: roleMappingName, rule: rule },
                  roleIds
                )
                :
                await this.securityService.saveRule(
                  { name: roleMappingName, rule: rule },
                  roleIds
                );
              if (
                result &&
                result.failed_items[0] &&
                result.failed_items[0].error.code === 4005
              ) {
                this.notification.showWarningToast(
                  result.failed_items[0].error.message ||
                    "Role mapping already exists."
                );
                this.scope.overwrite = true;
                this.scope.saveIncomplete = false;
                this.scope.$applyAsync();
                return;
              }
              if (
                result &&
                result.failed_items[0] &&
                result.failed_items[0].error.code === 4011
              ) {
                this.notification.showWarningToast(
                  result.failed_items[0].error.message
                );
                return;
              }
              if (result && result.total_failed_items === 0) {
                this.notification.showSuccessToast(`Role mapping ${result.affected_items[0].name} ${isEdit ? 'updated' : 'saved'} successfully.`);
                this.scope.saveIncomplete = false;
                this.scope.$applyAsync();
              } else {
                throw new Error(result.data.message || `Cannot ${isEdit ? 'updated' : 'saved'} this Role mapping.`);
              }
            }
            this.scope.saveIncomplete = false;
            this.clearAll();
          } else {
            this.notification.showWarningToast(
              `Please set all fields for the ${isEdit ? 'update' : 'new'} Role mapping.`
            );
          }
        } catch (error) {
          this.notification.showErrorToast(error);
        }
    }


  }
  controllers.controller('rolesMappingCtrl', RolesMapping)
})
