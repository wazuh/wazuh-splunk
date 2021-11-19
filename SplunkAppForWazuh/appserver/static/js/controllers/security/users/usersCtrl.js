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
      this.scope.isViewUser = false;

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
      this.scope.checkPasswordStrength = (val) => this.checkPasswordStrength(val);
      this.scope.editUser = () => this.editUser();
      this.scope.addNewUser = () => this.addNewUser();
      this.scope.reloadNewUser = (val) => this.reloadNewUser(val);
      this.scope.enableSave = () => this.enableSave();
      this.scope.cancelAddUser = () => this.cancelAddUser();
      this.scope.isAddNewUser = false;
      this.scope.isViewUser = false;
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
      
      this.scope.$on("viewUserContent", (ev, parameters) => {      
        this.scope.isViewUser = true;
        this.dropdown.settings.set("disabled", true)
        ev.stopPropagation();
      })

      this.scope.$on("openUserFromList", (ev, parameters) => {      
        this.scope.isAddNewUser = true;
        this.scope.isViewUser = false;
        this.scope.isEditingUser = true;

        this.scope.userName = parameters.user.username;
        this.scope.userId = parameters.user.id;
        this.scope.userAllowRunAs = parameters.user.allow_run_as;
        this.scope.userRoles = parameters.user.roles;
        this.scope.editUserRoles = parameters.user.roles;

        // this.dropdown.isDisabled = true
        this.dropdown.settings.set("disabled", false)

        this.dropdown.val(this.scope.userRoles);
        ev.stopPropagation();
      });
    }

    enableSave() {
      this.scope.overwrite = false;
    }

    checkPasswordStrength(password){    
      return /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/.test(password);
    }

    async saveUser() {
      try{
        if(this.scope.userName == "" || /.* .*/.test(this.scope.userName)){
          throw new Error("Username can't contain empty spaces")
        }
        if(this.scope.userName === "" || this.scope.userName === undefined){
          throw new Error("Username can't be empty")
        }
        if(this.scope.userPassword === undefined || this.scope.userPassword === "" ||
          this.scope.userPasswordConfirm === undefined || this.scope.userPasswordConfirm === ""){
          throw new Error("Password can't be empty")
        }
        if(this.scope.userPassword != this.scope.userPasswordConfirm){
          throw new Error("Both password must be equals")
        }
                
        let checkedPass = this.scope.checkPasswordStrength(this.scope.userPassword)
        if(!checkedPass){
          throw new Error("Password must contain at least one upper case, one number and one special character. Also, the length must be greater than 8")
        }

        //add user
        let newUserData = await this.userService.addUser(
          this.scope.userName,
          this.scope.userPassword
        )

        if (newUserData.data.data.failed_items.length > 0 || newUserData.data.error != 0) {
          throw new Error("Cannot save the new user");
        }

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

        this.notification.showSuccessToast(`User created successfully.`);
      }catch(error){
        this.notification.showErrorToast("Error adding a new user: "+error);
      } finally{
        this.cancelAddUser();
        this.scope.$applyAsync();
      }
    }

    async editUser() {
      try{
        let checkedPass = this.scope.checkPasswordStrength(this.scope.userPassword)
        if(this.scope.userPassword === this.scope.userPasswordConfirm){      
          if(this.scope.userPassword != ""){
            if(checkedPass){
              await this.userService.editPassword(
                this.scope.userId,
                this.scope.userPassword
              )
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
            }else{            
              throw Error("Password must have at least one upper case, one number and one special character");  
            }
          }else{
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
          }
        }else{            
          throw Error("Password must be equals");  
        }
        this.notification.showSuccessToast(`User modified successfully.`);
        this.cancelAddUser();
        this.scope.$applyAsync();
      }catch(error){
        this.notification.showErrorToast("Error editing user: "+error);
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
        this.scope.isViewUser = false;
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
      } catch (error) {
        this.notification.showErrorToast("Error closing form.");
      }
    }

    addNewUser() {
      try {
        this.notification.showWarningToast(`Password must contain at least one upper case, 
        one number and one special character. Also, the length must be greater than 8`);

        this.scope.isAddNewUser = true;
        this.scope.isViewUser = false;
        this.scope.overwrite = false;
        this.scope.isEditingUser = false;
        this.dropdown.settings.set("disabled", false);
      } catch (error) {
        this.notification.showErrorToast("Cannot add new User.");
      }
    }
    
  }
  controllers.controller('usersCtrl', Users)
  return Users
})
