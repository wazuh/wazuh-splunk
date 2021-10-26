/*
 * Wazuh app - Policies controller
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

  class Policies {
    constructor(
      $scope,
      isAdmin,
      policyData,
      actionData,
      resourceData,
      $notificationService,
      $securityService
    ) {
      this.scope = $scope;
      this.scope.isAdmin = isAdmin;
      this.scope.actionData = this.getActionList(actionData.data.data || []);
      this.scope.actionList = actionData.data.data;
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.policyName = "";
      this.scope.addingNewRole = false;
      this.scope.editingRole = false;

      this.actionsDropdown = new MultiDropdownView({
        id: "actions-dropdown",
        managerid: "actions-search",
        choices: this.scope.actionData,
        el: $("#actions-dropdown-view")
      }).render();
      this.actionsSearchManager = new SearchManager({
        id: "actions-search",
        search:
          "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      });

      this.actionsDropdown.on("change", newValue => {
        if (newValue && this.actionsDropdown) {
          this.scope.actions = newValue;

          this.resourcesDropdown.val(this.getResourcesOfActions(this.scope.actions));
        }
      });

      this.resourcesDropdown = new MultiDropdownView({
        id: "resources-dropdown",
        managerid: "resources-search",
        choices: this.scope.resources,
        el: $("#resources-dropdown-view")
      }).render();
      this.resourcesSearchManager = new SearchManager({
        id: "resources-search",
        search:
          "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      });

      this.resourcesDropdown.on("change", newValue => {
        if (newValue && this.resourcesDropdown) {
          this.scope.resources = newValue;
        }
      });
    }

    getResourcesOfActions(newValue) {
      return Object.keys(this.scope.actionList)
        .map((name, idx) => {
          return idx === newValue[idx]
            ? this.scope.actionList[name].resources
            : "";
        })
        .filter(value => {
          return value;
        });
    }

    getActionList(actionsData) {
      return Object.keys(actionsData).map((name, idx) => {
        return { label: name, value: idx };
      });
    }

    $onInit() {
      this.scope.addNewPolicy = () => this.addNewPolicy();
      this.scope.cancelPolicyEdition = () => this.cancelPolicyEdition();
      this.scope.enableSave = () => this.enableSave();
      this.scope.saveRole = () => this.saveRole();
      this.scope.addingNewPolicy = false;

      // Come from the pencil icon on the policies table
      this.scope.$on("openPolicyFromList", (ev, parameters) => {
        ev.stopPropagation();
        this.scope.addingNewPolicy = true;
        this.scope.editingPolicy = true;
        this.scope.policyName = parameters.policy.name;
        this.scope.actions = parameters.policy.actions;
        this.actionsDropdown.val(this.scope.actions);
        this.resourcesDropdown.val(this.getResourcesOfActions(this.scope.actions));
      });

      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("actions-dropdown");
        mvc.Components.revokeInstance("actions-search");
        this.actionsDropdown = null;
        this.searchManager = null;
      });
    }

    /**
     * Open the editor for a new policy
     */
    addNewPolicy() {
      try {
        this.clearAll();
        this.scope.overwrite = false;
        this.scope.addingNewPolicy = true;
        this.scope.actions = [];
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }

    clearAll() {
      this.scope.actions = [];
      this.scope.policyName = "";
      this.scope.addingNewPolicy = false;
      this.scope.editingPolicy = false;
      this.scope.items = null;
      this.scope.totalItems = null;
      this.scope.pagedItems = null;
      this.scope.currentPage = 0;
      this.scope.gap = 0;
    }

    /**
     * Cancel Policy edition
     */
    cancelPolicyEdition() {
      this.clearAll();
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
        const policyName = this.scope.policyName;
        if (policyName) {
          if (constainsBlanks.test(policyName)) {
            this.notification.showErrorToast(
              "Error creating a new policy. The name can not contain white spaces."
            );
          } else {
            this.scope.saveIncomplete = true;
            const policies = this.scope.policies;
            const result = await this.securityService.saveRole(
              policyName,
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

  controllers.controller("policiesCtrl", Policies);
  return Policies;
});
