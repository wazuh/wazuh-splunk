define([
  "../../module",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/multidropdownview",
  "splunkjs/mvc"
], function(controllers,SearchManager, MultiDropdownView, mvc) {
  'use strict'

  class Users {
    constructor($scope, isAdmin, usersData, roleData, $notificationService, $securityService) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.isEditingUser = false;
      this.scope.isAddNewUser = false;
      
      this.scope.userName = "";
      this.scope.userPassword = "";
      this.scope.userPasswordConfirm = "";
      this.scope.userAllowRunAs = false;
      this.scope.userRoles = [];

      this.scope.roleData = this.getRoleList(roleData.data.data.affected_items || []);
    }

    $onInit() {
      this.scope.saveUser = () => this.saveUser();
      this.scope.addNewUser = () => this.addNewUser();
      this.scope.cancelAddUser = () => this.cancelAddUser();
      this.scope.isAddNewUser = false;
      this.scope.isEditingUser = false;

      this.dropdown = new MultiDropdownView({
        id: "roles-dropdown",
        managerid: "roles-search",
        choices: this.scope.roleData,
        el: $("#roles-dropdown-view")
      }).render();

      this.searchManager = new SearchManager({
        id: "roles-search",
        search:
          "| eventcount summarize=false index=* index=_* | dedup index | fields index"
      });
  
      this.dropdown.on("change", newValue => {
        if (newValue && this.dropdown) {
          this.scope.userRoles = newValue;
          this.scope.$applyAsync();
        }
      });

      this.scope.$on("$destroy", () => {
        mvc.Components.revokeInstance("roles-dropdown");
        mvc.Components.revokeInstance("roles-search");
        this.dropdown = null;
        this.searchManager = null;
      });

      this.scope.$on("openUserFromList", (ev, parameters) => {
        ev.stopPropagation();
        this.scope.isAddNewUser = false;
        this.scope.isEditingUser = true;

        this.scope.userName = parameters.user.username;
        this.scope.userAllowRunAs = parameters.user.allow_run_as;

        console.log(console.log(parameters));
        console.log(console.log(parameters.user.username, parameters.user.allow_run_as, parameters.user.roles));
        
        // this.scope.policyName = parameters.policy.name;
        // this.actionsDropdown.val(this.scope.actions);
        // this.effectOptions.val(parameters.policy.policy.effect);
        // parameters.policy.policy.resources.map(resource => {
        //   this.scope.resourcesList.push(resource);
        // });
        // this.scope.disableAdd = false;
      });
    }

    async saveUser() {
      try{
       newUserRequest({
          roles: this.dropdown.val(),
          username: this.scope.userName,
          password:this.scope.userPassword
       })
      }catch(error){
        this.notification.showErrorToast(error);
      } 
      finally {
        this.cancelAddUser();
      }
    }

    getRoleList(roleData) {
      return roleData.map(roles => {
        return { label: roles.name, value: roles.id };
      });
    }

    cancelAddUser() {
      try {
        this.scope.isAddNewUser = false;
        this.scope.isEditingUser = false;
        this.scope.userName = "";
        this.scope.userPassword = "";
        this.scope.userPasswordConfirm = "";
        // this.scope.userAllowRunAs = false;
        this.dropdown.val([]);
        this.scope.$applyAsync();

        // this.scope.role = [];
        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Error closing form.");
      }
    }
    
    newUserRequest = async userPayload => {
      return await $requestService.apiReq(
        "/security/users",
        {
          content: JSON.stringify(userPayload),
          origin: "json"
        },
        "POST"
      );
    };

    addNewUser() {
      try {
        this.scope.isAddNewUser = true;
        this.scope.isEditingUser = false;

      } catch (error) {
        this.notification.showErrorToast("Cannot add new User.");
      }
    }

  }
  controllers.controller('usersCtrl', Users)
  return Users
})
