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
      this.scope.resourcesList = [];
      this.scope.resources = [];
      this.scope.resourceIdentifier = "";
      this.buildActionsMultiDropdown();
      this.buildEffectOptionsDropDown();
      this.buildResourcesDropdown();
    }

    buildEffectOptionsDropDown() {
      this.effectOptions = new DropdownView({
        id: "effectOptions-dropdown",
        default: "allow",
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
          this.resourcesDropdown.val([]);
          this.scope.$applyAsync();
        }
      });
    }

    buildResourcesDropdown() {
      this.resourcesDropdown = new DropdownView({
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
          this.scope.disableAdd = newValue.length === 0 || !newValue;
        } else {
          this.scope.disableAdd = !newValue;
        }
        this.scope.$applyAsync();
      });
    }

    getResourcesOfActions(newValue) {
      let result = [];
      for (let x of newValue) {
        Object.keys(this.scope.actionList)
          .map((name, idx) => {
            return (this.scope.actionData[x] || []).label === name
              ? result.push(
                  this.scope.actionList[name].resources.map(
                    (resource, index) => {
                      return {
                        label: resource,
                        value: index
                      };
                    }
                  )
                )
              : "";
          })
          .filter(value => {
            return value;
          });
      }
      return result[0];
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
      this.scope.addResourceIdentifier = () => this.addResourceIdentifier();
      this.scope.onResourceIdentifierChanged = () =>
        this.onResourceIdentifierChanged();
      this.scope.showConfirmRemoveEntry = (ev, key) =>
        this.showConfirmRemoveEntry(ev, key);
      this.scope.cancelRemoveEntry = () => this.cancelRemoveEntry();
      this.scope.confirmRemoveEntry = (ev, key) =>
        this.confirmRemoveEntry(ev, key);
      this.scope.addingNewPolicy = false;
      this.scope.disableAdd = true;

      // Come from the pencil icon on the policies table
      this.scope.$on("openPolicyFromList", (ev, parameters) => {
        ev.stopPropagation();
        this.scope.addingNewPolicy = true;
        this.scope.editingPolicy = true;
        this.scope.policyName = parameters.policy.name;
        this.scope.policyId = parameters.policy.id;
        this.scope.actions = parameters.policy.policy.actions;
        this.actionsDropdown.val(this.scope.actions);
        this.effectOptions.val(parameters.policy.policy.effect);
        parameters.policy.policy.resources.map(resource => {
          this.scope.resourcesList.push(resource);
        });
        this.scope.disableAdd = false;
      });

      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("actions-dropdown");
        mvc.Components.revokeInstance("resources-dropdown");
        mvc.Components.revokeInstance("effectOptions-dropdown");
        mvc.Components.revokeInstance("actions-search");
        mvc.Components.revokeInstance("resources-search");
        this.actionsDropdown = null;
        this.resourcesDropdown = null;
        this.effectOptions = null;
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

    addResourceIdentifier() {
      this.scope.resourcesList.push(
        `${this.resourcesDropdown._getSelectedData().label}:${
          this.scope.resourceIdentifier
        }`
      );
      this.scope.resourceIdentifier = "";
      this.resourcesDropdown.val([]);
    }

    onResourceIdentifierChanged() {
      this.scope.disableAdd = this.scope.resourceIdentifier.length > 0;
    }

    /**
     * Shows confirmation to remove a field
     * @param {*} ev
     * @param {String} key
     */
    showConfirmRemoveEntry(env, key) {
      this.scope.removingEntry = key;
    }

    /**
     * Cancels the removing of a entry
     */
    cancelRemoveEntry() {
      this.scope.removingEntry = false;
    }

    /**
     * Confirms if wants to remove a entry
     * @param {String} key
     */
    async confirmRemoveEntry(ev, key) {
      try {
        this.scope.resourcesList.splice(key, 1);
        this.refreshResourcesList();
        this.scope.removingEntry = false;
      } catch (error) {
        this.notification.showErrorToast("Error deleting entry.");
      }
    }

    /**
     * Refreshs Resources list fields
     */
    refreshResourcesList() {
      this.scope.$applyAsync();
    }

    clearAll() {
      this.scope.actions = [];
      this.scope.policyName = "";
      this.scope.addingNewPolicy = false;
      this.resourcesDropdown.val([]);
      this.actionsDropdown.val([]);
      this.scope.addingNewPolicy = false;
      this.scope.editingPolicy = false;
      this.scope.resourcesList = [];
      this.scope.resourceIdentifier = "";
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
            const resources = this.scope.resourcesList;
            const actions = this.actionsDropdown
              ._getSelectedData()
              .map(selected => selected.label);
            const effect = this.effectOptions.val();

            let result;
            if (this.scope.editingPolicy) {
              result = await this.securityService.updatePolicy(
                this.scope.policyId,
                actions,
                resources,
                effect
              );
            } else {
              result = await this.securityService.savePolicy(
                policyName,
                actions,
                resources,
                effect
              );
            }

            if (result && result.data && result.data.total_failed_items === 0) {
              this.notification.showSuccessToast("Policy saved successfully.");
              this.scope.saveIncomplete = false;
              this.clearAll();
              this.scope.removingEntry = false;
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
