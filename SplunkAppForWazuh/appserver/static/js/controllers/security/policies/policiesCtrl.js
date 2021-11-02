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
  "splunkjs/mvc/dropdownview",
  "splunkjs/mvc"
], function(controllers, SearchManager, MultiDropdownView, DropdownView, mvc) {
  "use strict";

  const effectOptions = [
    {
      label: "Allow",
      value: "allow"
    },
    {
      label: "Deny",
      value: "deny"
    }
  ];

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
      this.scope.addingNewPolicy = false;
      this.scope.editingPolicy = false;
      this.buildActionsMultiDropdown();
      this.buildEffectOptionsDropDown();
      this.buildResourcesMultiDropdown();
    }

    buildEffectOptionsDropDown() {
      this.effectOptions = new DropdownView({
        id: "effectOptions-dropdown",
        default: 'allow',
        choices: effectOptions,
        el: $("#effect-options-dropdown-view")
      }).render();

      this.effectOptions.on("change", newValue => {
        if (newValue && this.effectOptions) {
          this.scope.effectOptions = newValue;
        }
      });
    }

    buildActionsMultiDropdown() {
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

          this.resourcesDropdown.settings.set(
            "choices",
            this.getResourcesOfActions(this.scope.actions)
          );
          this.resourcesDropdown.settings.set("disabled", false);
          this.scope.$applyAsync();
        }
      });
    }

    buildResourcesMultiDropdown() {
      this.resourcesDropdown = new MultiDropdownView({
        id: "resources-dropdown",
        managerid: "resources-search",
        choices: this.scope.resources || [{ label: "*:*", value: "0" }],
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
      let result = [];
      for (let x of newValue) {
        Object.keys(this.scope.actionList)
          .map((name, idx) => {
            return (this.scope.actionData[x] || []).label === name
              ? result.push({
                  label: this.scope.actionList[name].resources,
                  value: this.scope.actionList[name].resources.toString()
                })
              : "";
          })
          .filter(value => {
            return value;
          });
      }
      return result;
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
      this.scope.savePolicy = () => this.savePolicy();
      this.scope.addingNewPolicy = false;

      // Come from the pencil icon on the policies table
      this.scope.$on("openPolicyFromList", (ev, parameters) => {
        ev.stopPropagation();
        this.scope.addingNewPolicy = true;
        this.scope.editingPolicy = true;
        this.scope.policyName = parameters.policy.name;
        this.scope.actions = parameters.policy.actions;
        this.actionsDropdown.val(this.scope.actions);
        this.resourcesDropdown.val(
          this.getResourcesOfActions(this.scope.actions)
        );
      });

      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("actions-dropdown");
        mvc.Components.revokeInstance("resources-dropdown");
        mvc.Components.revokeInstance("actions-search");
        mvc.Components.revokeInstance("resources-search");
        this.actionsDropdown = null;
        this.resourcesDropdown = null;
        this.actionsSearchManager = null;
        this.resourcesSearchManager = null;
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
        this.notification.showErrorToast("Cannot add new Policy.");
      }
    }

    clearAll() {
      this.scope.actions = [];
      this.scope.policyName = "";
      this.scope.addingNewPolicy = false;
      this.scope.editingPolicy = false;
      this.resourcesDropdown.val([]);
      this.actionsDropdown.val([]);
      this.scope.addingNewPolicy = false;
      this.scope.editingPolicy = false;
      this.scope.$applyAsync();
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
    async savePolicy() {
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
            const result = await this.securityService.savePolicy(
              policyName,
              policies
            );
            if (result && result.data && result.data.error === 0) {
              this.notification.showSuccessToast("File saved successfully.");
              this.scope.saveIncomplete = false;
              this.scope.$applyAsync();
            } else if (result.data.error === 1905) {
              this.notification.showWarningToast(
                result.data.message || "Policy already exists."
              );
              this.scope.overwrite = true;
              this.scope.saveIncomplete = false;
              this.scope.$applyAsync();
            } else {
              throw new Error(
                result.data.message || "Cannot save this Policy."
              );
            }
          }
        } else {
          this.notification.showWarningToast(
            "Please set a name for the new Policy."
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
