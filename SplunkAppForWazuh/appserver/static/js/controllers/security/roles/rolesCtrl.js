/*
 * Wazuh app - Roles controller
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

  class Roles {
    constructor(
      $scope,
      isAdmin,
      roleData,
      policiesData,
      $notificationService,
      $securityService
    ) {
      this.scope = $scope;
      this.scope.isAdmin = isAdmin;
      this.scope.roleData = roleData.data.data.affected_items || [];
      this.scope.policiesData = this.getPoliciesList(
        policiesData.data.data.affected_items || []
      );
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.addingNewRole = false;

      this.dropdown = new MultiDropdownView({
        id: "policies-dropdown",
        managerid: "policies-search",
        labelField: "index",
        valueField: "index",
        choices: this.scope.policiesData,
        el: $("#policies-dropdown-view")
      }).render();
      this.searchManager = new SearchManager({
        id: "policies-search",
        search:
          "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      });
    }

    getPoliciesList(policiesData) {
      return policiesData.map(policy => {
        return { label: policy.name, value: policy.id };
      });
    }

    $onInit() {
      this.scope.addNewRole = () => this.addNewRole();
      this.scope.cancelRoleEdition = () => this.cancelRoleEdition();
      this.scope.enableSave = () => this.enableSave();
      this.scope.saveRole = () => this.saveRole();
      this.scope.addingNewRole = false;
      this.scope.addingNewRole = false;

      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("policies-dropdown");
        mvc.Components.revokeInstance("policies-search");
        this.dropdown = null;
        this.searchManager = null;
      });
    }

    /**
     * Open the editor for a new role
     */
    addNewRole() {
      try {
        this.scope.overwrite = false;
        this.scope.addingNewRole = true;
        this.scope.policies = {
          list: {}
        };
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }

    /**
     * Cancel Role edition
     */
    cancelRoleEdition() {
      this.scope.policies = false;
      this.scope.addingNewRole = false;
      this.scope.items = null;
      this.scope.totalItems = null;
      this.scope.pagedItems = null;
      this.scope.currentPage = 0;
      this.scope.gap = 0;
    }

    /**
     * Enables save button
     */
    enableSave() {
      this.scope.overwrite = false;
    }

    /**
     * Saves the CDB list content
     */
    async saveRole() {
      try {
        const constainsBlanks = /.* .*/;
        const roleName = this.scope.currentRole.name;
        if (roleName) {
          if (constainsBlanks.test(roleName)) {
            this.notification.showErrorToast(
              "Error creating a new role. The name can not contain white spaces."
            );
          } else {
            this.scope.saveIncomplete = true;
            const policies = this.scope.currentRole.policies; // obtener lista de policies seleccionadas
            const result = await this.securityService.saveRole(
              roleName,
              policies
            );
            if (result && result.data && result.data.error === 0) {
              this.notification.showSuccessToast("File saved successfully.");
              this.scope.saveIncomplete = false;
              this.scope.$applyAsync();
            } else if (result.data.error === 1905) {
              this.notification.showWarningToast(
                result.data.message || "Role already exists."
              );
              this.scope.overwrite = true;
              this.scope.saveIncomplete = false;
              this.scope.$applyAsync();
            } else {
              throw new Error(result.data.message || "Cannot save this Role.");
            }
          }
        } else {
          this.notification.showWarningToast(
            "Please set a name for the new Role."
          );
        }
      } catch (error) {
        this.scope.saveIncomplete = false;
        this.notification.showErrorToast(error);
      }
    }
  }

  controllers.controller("rolesCtrl", Roles);
  return Roles;
});
