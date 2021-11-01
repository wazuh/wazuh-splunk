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
  '../../../libs/codemirror-conv/lib/codemirror',
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/multidropdownview",
  "splunkjs/mvc"
], function(controllers, CodeMirror, SearchManager, MultiDropdownView, mvc) {
  "use strict";

  const OPERATORS = [
    "FIND",
    "FIND$",
    "MATCH",
    "MATCH$",
  ];
  class RolesMapping {
    constructor(
      $scope,
      isAdmin,
      roles,
      $notificationService,
      $securityService
    ) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.scope.roles = this.getRolesList(
        roles.data.data.affected_items || []
      );
      this.scope.operators = this.getOperatorsList(
        OPERATORS || []
      );;
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.addingNewRoleMapping = false;
      this.dropdownRoles = new MultiDropdownView({
        id: "roles-dropdown",
        managerid: "roles-search",
        choices: this.scope.roles,
        el: $("#roles-dropdown-view")
      }).render();
      this.dropdownOperators = new MultiDropdownView({
        id: "operator-dropdown",
        managerid: "operator-search",
        choices: this.scope.operators,
        el: $("#operator-dropdown-view")
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

      this.dropdownOperators.on("change", newValue => {
        if (newValue && this.dropdownOperators) {
          this.scope.operators = newValue;
          this.scope.$applyAsync();
        }
      });

    }

    getRolesList(rolesData) {
      return rolesData.map(role => {
        return { label: role.name, value: role.id };
      });
    }

    getOperatorsList(operatorsData) {
      return operatorsData.map(operator => {
        return { label: operator, value: operator };
      });
    }

    $onInit() {
      this.scope.addNewRoleMapping = () => this.addNewRoleMapping();
      this.scope.cancelRoleMappingEdition = () => this.cancelRoleMappingEdition();
      this.scope.saveRoleMapping = () => this.saveRoleMapping();
      this.scope.addingNewRoleMapping = false;
      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("roles-dropdown");
        mvc.Components.revokeInstance("operator-dropdown");
        mvc.Components.revokeInstance("roles-mapping-search");
        this.dropdownRoles = null;
        this.searchManager = null;
      });
    }

    addNewRoleMapping() {
      try {
        this.clearAll();
        this.scope.addingNewRoleMapping = true;
        this.dropdownRoles.val([]);
        this.dropdownRoles.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role Mapping.");
      }
    }

    clearAll() {
      this.scope.addingNewRoleMapping = false;
      this.scope.roleMappingName = "";
      this.dropdownRoles.val([]);
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
          const rule = {}
  
          if (roleMappingName) {
            if (constainsBlanks.test(roleMappingName)) {
              this.notification.showErrorToast(
                "Error creating a new role mapping. The name can not contain white spaces."
              );
            } else {
              this.scope.saveIncomplete = true;
              const result = await this.securityService.saveRule(
                { name: roleMappingName, rule: rule, roles: roleIds }
              );
              if (
                result &&
                result.data.error &&
                result.data.data.failed_items[0] &&
                result.data.data.failed_items[0].error.code === 4005
              ) {
                this.notification.showWarningToast(
                  result.data.datafailed_items[0].error.message ||
                    "Role mapping already exists."
                );
                this.scope.overwrite = true;
                this.scope.saveIncomplete = false;
                this.scope.$applyAsync();
                return;
              }
              if (
                result &&
                result.data.error &&
                result.data.data.failed_items[0] &&
                result.data.data.failed_items[0].error.code === 4011
              ) {
                this.notification.showWarningToast(
                  result.data.data.failed_items[0].error.message
                );
                return;
              }
              if (result && result.data.error === 0) {
                this.notification.showSuccessToast("Role mapping saved successfully.");
                this.scope.saveIncomplete = false;
                this.scope.$applyAsync();
              } else {
                throw new Error(result.data.message || "Cannot save this Role mapping.");
              }
            }
          } else {
            this.notification.showWarningToast(
              "Please set a name for the new Role mapping."
            );
          }
        } catch (error) {
          this.notification.showErrorToast(error);
        } finally {
          this.scope.saveIncomplete = false;
          this.clearAll();
        }
    }


  }
  controllers.controller('rolesMappingCtrl', RolesMapping)
})
