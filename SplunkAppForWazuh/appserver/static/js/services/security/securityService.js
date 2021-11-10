

define(["../module"], function(module) {
  "use strict";

  module.service("$securityService", function($requestService, $state) {

    const removeUser = async user => {
      try {
        const result = await $requestService.apiReq(
          `/security/users?user_ids=${user}`,
          {},
          "DELETE"
        );
        if (result.data.error !== 0) {
          throw new Error(result.data.message);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    };
   
    const getRoles = async () => {
      try {
        const result = await $requestService.apiReq(`/security/roles`);
        if (result.data.error !== 0) {
          throw new Error(result.data.message);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    const addUser = async (user, pass) => {
      try {
        const data = await $requestService.apiReq(
          "/security/users",
          {
            content: JSON.stringify({username: user, password: pass}),
            origin: "json"
          },
          "POST"
        );
        return data
      }catch(error){
        this.notification.showErrorToast("Error adding user: "+error);
        return Promise.reject(error);
      }
    }

    const addRunAs = async (user, status) => {
      try {
        const data = await $requestService.apiReq(
          `/security/users/${user}/run_as`,
          {
            content: JSON.stringify({allow_run_as: status}),
            origin: "json"
          },
          "PUT"
        );
        return data
      }catch(error){
        this.notification.showErrorToast("Error modifying run as: "+error);
        return Promise.reject(error);
      }
    }

    const addRoles = async (user, roles) => {
      try {
        const data = await $requestService.apiReq(
          `/security/users/${user}/roles`,
          {
            content: JSON.stringify({roles_ids: roles}),
            origin: "json"
          },
          "POST"
        );
        return data
      }catch(error){
        this.notification.showErrorToast("Error adding roles: "+error);
        return Promise.reject(error);
      }
    }

    return {
      addUser: addUser,
      addRunAs: addRunAs,
      addRoles: addRoles,
      getRoles: getRoles,
      removeUser: removeUser
    };    
  });
});