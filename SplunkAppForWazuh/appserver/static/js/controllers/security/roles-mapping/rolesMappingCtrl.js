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
      $notificationService,
    ) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.scope.roles = this.getRolesList(
        roles.data.data.affected_items || []
      );
      this.notification = $notificationService;
      this.scope.addingNewRoleMapping = false;

      this.dropdown = new MultiDropdownView({
        id: "roles-dropdown",
        managerid: "roles-search",
        choices: this.scope.roles,
        el: $("#roles-dropdown-view")
      }).render();

      this.searchManager = new SearchManager({
        id: "roles-mapping-search",
        search:
          "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      });

      this.dropdown.on("change", newValue => {
        if (newValue && this.dropdown) {
          this.scope.roles = newValue;
          this.scope.$applyAsync();
        }
      });

    }

    getRolesList(rolesData) {
      return rolesData.map(role => {
        return { label: role.name, value: role.id };
      });
    }

    $onInit() {
      this.scope.addNewRoleMapping = () => this.addNewRoleMapping();
      this.scope.addingNewRoleMapping = false;
      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("roles-dropdown");
        mvc.Components.revokeInstance("roles-mapping-search");
        this.dropdown = null;
        this.searchManager = null;
      });
    }

    addNewRoleMapping() {
      try {
        this.clearAll();
        this.scope.addingNewRoleMapping = true;
        this.scope.policies = [];
        this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role Mapping.");
      }
    }

    clearAll() {
      this.scope.addingNewRoleMapping = false;
    }

  }
  controllers.controller('rolesMappingCtrl', RolesMapping)
})
