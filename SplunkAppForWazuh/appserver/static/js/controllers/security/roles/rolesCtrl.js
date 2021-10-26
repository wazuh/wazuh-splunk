define(['../../module'], function(controllers) {
  'use strict'

  class Roles {
    constructor($scope) {
      this.scope = $scope
    }

    $onInit() {
      this.scope.addNewRole = () => this.addNewRole();
      this.scope.cancelRoleEdition = () => this.cancelRoleEdition();
      this.scope.enableSave = () => this.enableSave();
      this.scope.saveRole = () => this.saveRole();
      this.scope.addingNewRole = false;

      // Come from the pencil icon on the roles table
      this.scope.$on("openRoleFromList", (ev, parameters) => {
        ev.stopPropagation();
        this.scope.addingNewRole = true;
        this.scope.editingRole = true;
        this.scope.roleId = parameters.role.id;
        this.scope.roleName = parameters.role.name;
        this.scope.policies = parameters.role.policies;
        this.dropdown.settings.set(
          "disabled",
          RESERVED_ROLES.includes(parameters.role.name)
        );
        this.dropdown.val(this.scope.policies);
      });

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
        this.clearAll();
        this.scope.overwrite = false;
        this.scope.addingNewRole = true;
        this.scope.policies = [];
        this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }

    clearAll() {
      this.scope.policies = [];
      this.scope.roleName = "";
      this.dropdown.val([]);
      this.scope.addingNewRole = false;
      this.scope.editingRole = false;
    }

    /**
     * Cancel Role edition
     */
    cancelRoleEdition() {
      this.clearAll();
    }

    /**
     * Enables save button
     */
    enableSave() {
      this.scope.overwrite = false;
    }

    /**
     * Saves Role
     */
    async saveRole() {
      try {
        const constainsBlanks = /.* .*/;
        const roleName = this.scope.roleName;
        const roleId = this.scope.roleId;

        if (roleName) {
          if (constainsBlanks.test(roleName)) {
            this.notification.showErrorToast(
              "Error creating a new role. The name can not contain white spaces."
            );
          } else {
            this.scope.saveIncomplete = true;
            const policies = this.scope.policies;
            const result = await this.securityService.saveRole(
              { name: roleName, id: roleId },
              policies
            );
            if (result.failed_items[0] && result.failed_items[0].error.code === 4005) {
              this.notification.showWarningToast(
                result.failed_items[0].error.message || "Role already exists."
              );
              this.scope.overwrite = true;
              this.scope.saveIncomplete = false;
              this.scope.$applyAsync();
              return;
            }
            if (result && result.affected_items[0] && result.affected_items[0].error === 0) {
              this.notification.showSuccessToast("Role saved successfully.");
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
  controllers.controller('rolesCtrl', Roles)
})
