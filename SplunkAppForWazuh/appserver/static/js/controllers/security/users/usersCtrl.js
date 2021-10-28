define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope, isAdmin, usersData) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.scope.isAddNewUser = true;
    }

    $onInit() {
      this.scope.isAddNewUser = false;
    }

    cancelAddUser() {
      try {
        this.clearAll();
        // this.scope.overwrite = false;
        // this.scope.isAddNewUser = true;
        // this.scope.policies = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }
    
    addNewUser() {
      try {
        this.clearAll();
        // this.scope.overwrite = false;
        this.scope.isAddNewUser = true;
        // this.scope.policies = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }

    clearAll() {
      // this.scope.policies = [];
      // this.scope.roleName = "";
      // this.dropdown.valisAddNewUser
      this.scope.addingNewRole = false;
      // this.scope.editingRole = false;
    }

  }
  controllers.controller('usersCtrl', Users)
  return Users
})
