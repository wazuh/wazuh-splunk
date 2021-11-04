define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope, isAdmin, usersData, roleData, $notificationService, $securityService) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.isEditingRole = false;
      this.scope.isAddNewUser = false;
      
      this.scope.roleName = "";

      this.scope.roleData = this.getRoleList(roleData.data.data.affected_items || []);
    }

    $onInit() {
      this.scope.addNewUser = () => this.addNewUser();
      this.scope.cancelAddUser = () => this.cancelAddUser();
      this.scope.isAddNewUser = false;

      // this.dropdown = new MultiDropdownView({
      //   id: "roles-dropdown",
      //   managerid: "roles-search",
      //   choices: this.scope.roleData,
      //   el: $("#roles-dropdown-view")
      // }).render();
      // this.searchManager = new SearchManager({
      //   id: "roles-search",
      //   search:
      //     "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      // });
  
      // this.dropdown.on("change", newValue => {
      //   if (newValue && this.dropdown) {
      //     this.deleteRole(
      //       this.scope.roles.filter(role => !newValue.includes(role))[0]
      //     );
      //     this.scope.role = newValue;
      //     this.scope.$applyAsync();
      //   }
      // });
    }

  

    getRoleList(roleData) {
      return roleData.map(roles => {
        return { label: roles.name, value: roles.id };
      });
    }
    
    async deleteRole(roleId) {
      if (roleId) {
        const result = await this.securityService.removeRole(
          this.scope.roleId,
          roleId
        );
        if (result && result.data.error === 0) {
          this.notification.showSuccessToast(
            "Role was removed successfully."
          );
        }
      }
    }

    cancelAddUser() {
      try {
        // this.scope.overwrite = false;
        this.scope.isAddNewUser = false;
        // this.scope.role = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }
    
    addNewUser() {
      try {
        // this.scope.overwrite = false;
        this.scope.isAddNewUser = true;
        // this.scope.role = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }

  }
  controllers.controller('usersCtrl', Users)
  return Users
})
