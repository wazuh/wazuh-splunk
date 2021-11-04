

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

    const addUser = async user => {
      try {
        const result = await $requestService.apiReq(
          `/security/users`,
          {
            "username":user,
            "password":"Testtest1!"
          },
          "POST"
        );
        if (result.data.error !== 0) {
          throw new Error(result.data.message);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return {
      addUser: addUser,
      getRoles: getRoles,
      removeUser: removeUser
    };    
  });
});