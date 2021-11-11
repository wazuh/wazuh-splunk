define([
  "../../module",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/multidropdownview",
  "splunkjs/mvc"
], function(controllers,SearchManager, MultiDropdownView, mvc) {
  'use strict'

  class Users {
    constructor($scope, isAdmin, roleData, $notificationService, $userService) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.notification = $notificationService;
      this.userService = $userService;
      this.scope.isEditingUser = false;
      this.scope.isAddNewUser = false;

      this.scope.userName = "";
      this.scope.userId = "";
      this.scope.userPassword = "";
      this.scope.userPasswordConfirm = "";
      this.scope.userAllowRunAs = false;
      this.scope.userRoles = [];
      this.scope.editUserRoles = [];

      this.scope.roleData = this.getRoleList(roleData.data.data.affected_items || []);
    }

    $onInit() {
      this.scope.saveUser = () => this.saveUser();
      this.scope.editUser = () => this.editUser();
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
        this.scope.isAddNewUser = false;
        this.scope.isEditingUser = true;

        this.scope.userName = parameters.user.username;
        this.scope.userId = parameters.user.id;
        this.scope.userAllowRunAs = parameters.user.allow_run_as;
        this.scope.userRoles = parameters.user.roles;
        this.scope.editUserRoles = parameters.user.roles;

        this.dropdown.val(this.scope.userRoles);
        ev.stopPropagation();
      });
    }

    async saveUser() {
      try{
        if(this.scope.userPassword === this.scope.userPasswordConfirm && this.scope.userName != ""){
          //add user
          const newUserData = await this.userService.addUser(
             this.scope.userName,
             this.scope.userPassword
          )
          //allow run as if needed
          await this.userService.addRunAs(
            newUserData.data.data.affected_items[0].id,
            this.scope.userAllowRunAs
          )          
          //add roles
          await this.userService.addRoles(
            newUserData.data.data.affected_items[0].id,
            this.scope.userRoles
          )
        }else{
          this.notification.showErrorToast("Both password must be equals and usernamecan't be empty");  
        }

      }catch(error){
        this.notification.showErrorToast("Error adding a new user: "+error);
      } 
      finally {
        this.cancelAddUser();
      }
    }

    async editUser() {
      try{
        //remove roles
        await this.userService.deleteRoles(
          this.scope.userId,
          this.scope.editUserRoles
        )
        //allow run as if needed
        await this.userService.addRunAs(
          this.scope.userId,
          this.scope.userAllowRunAs
        )
        //add roles
        await this.userService.addRoles(
          this.scope.userId,
          this.scope.userRoles
        )
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
        this.scope.userId = "";
        this.scope.userName = "";
        this.scope.userPassword = "";
        this.scope.userPasswordConfirm = "";
        this.scope.userRoles = [];
        this.scope.editUserRoles = [];
        this.scope.userAllowRunAs = false;
        this.dropdown.val([]);
        this.scope.$applyAsync();

        // this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Error closing form.");
      }
    }

    // newUserRequest = async userPayload => {
    //   //1 save user and get id
    //   try {
    //     const data = await $requestService.apiReq(
    //       "/security/users",
    //       {
    //         content: JSON.stringify({name: userPayload.username, password: userPayload.password}),
    //         origin: "json"
    //       },
    //       "POST"
    //     );
    //     return data
    //   }catch(error){
    //     this.notification.showErrorToast("Error adding user: "+error);
    //   }
    //   //2 allow run_as

    //   //3 save roles
    // };

    // editUserRequest = async userPayload => {
    //   return await $requestService.apiReq(
    //     `/security/users/${userPayload.userID}`,
    //     {
    //       content: JSON.stringify(userPayload),
    //       origin: "json"
    //     },
    //     "PUT"
    //   );
    // };

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
