define([
  "../../module",
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/multidropdownview",
  "splunkjs/mvc"
], function(controllers,SearchManager, MultiDropdownView, mvc) {
  'use strict'

  class Users {
    constructor($scope, $route, isAdmin, usersData, roleData, $notificationService, $securityService) {
      this.scope = $scope
      this.scope.isAdmin = isAdmin;
      this.notification = $notificationService;
      this.securityService = $securityService;
      this.scope.isEditingUser = false;
      this.scope.isAddNewUser = false;
      
      this.scope.userName = "";
      this.scope.userId = "";
      this.scope.userPassword = "";
      this.scope.userPasswordConfirm = "";
      this.scope.userAllowRunAs = false;
      this.scope.userRoles = [];

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
        ev.stopPropagation();
        this.scope.isAddNewUser = false;
        this.scope.isEditingUser = true;

        this.scope.userName = parameters.user.username;
        this.scope.userId = parameters.user.userId;
        this.scope.userAllowRunAs = parameters.user.allow_run_as;      
      });
    }

    async saveUser() {
      try{
        if(this.scope.userPassword === this.scope.userPasswordConfirm && this.scope.userName != ""){
          //add user
          const newUserData = await this.securityService.addUser(
             this.scope.userName,
             this.scope.userPassword
          )
          console.log("return: ", newUserData.data.affected_items[0].id);
          console.log("return: ", newUserData.data.data.affected_items[0].id);
          
          //allow run as if needed
          await this.securityService.addRunAs(
            newUserData.data.affected_items[0].id,
            this.scope.allow_run_as
          )          
          //add roles
          await this.securityService.addRoles(
            newUserData.data.affected_items[0].id,
            this.scope.userRoles
          )
        }else{
          this.notification.showErrorToast("Both password must be equals and usernamecan't be empty");  
        }

      }catch(error){
        this.notification.showErrorToast(error);
      } 
      finally {
        this.cancelAddUser();
      }
    }

    async editUser() {
      try{

        this.dropdown.val(this.scope.userRoles);
        // this.dropdown.on("change", newValue => {
        //   this.dropdown.val(this.scope.userRoles);
        // });
       editUserRequest({
          roles: this.scope.userRoles,
          username: this.scope.userName,
          userID: this.scope.userId,
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
        this.scope.userId = "";
        this.scope.userName = "";
        this.scope.userPassword = "";
        this.scope.userPasswordConfirm = "";
        this.scope.userAllowRunAs = false;
        this.dropdown.val([]);
        this.scope.$applyAsync();

        // this.scope.role = [];
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
    
    editUserRequest = async userPayload => {
      return await $requestService.apiReq(
        `/security/users/${userPayload.userID}`,
        {
          content: JSON.stringify(userPayload),
          origin: "json"
        },
        "PUT"
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
