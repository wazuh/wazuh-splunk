define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope, isAdmin, usersData) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.scope.isAddNewUser = false;
    }

    $onInit() {
      this.scope.addNewUser = () => this.addNewUser();
      this.scope.cancelAddUser = () => this.cancelAddUser();
      this.scope.isAddNewUser = false;
    }

    cancelAddUser() {
      try {
        // this.scope.overwrite = false;
        this.scope.isAddNewUser = false;
        // this.scope.policies = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }
    
    addNewUser() {
      try {
        // this.scope.overwrite = false;
        this.scope.isAddNewUser = true;
        // this.scope.policies = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new Role.");
      }
    }

  }
  controllers.controller('usersCtrl', Users)
  return Users
})
