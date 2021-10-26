

define(["../module"], function(module) {
  "use strict";

  module.service("$securityService", function($requestService, $state) {
<<<<<<< HEAD
    
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
=======
    const getRoleData = async () => {
      try {
        return await $requestService.apiReq("/security/roles");
      } catch (error) {
        $state.go("settings.api");
      }
    };

    const getPolicyData = async () => {
      try {
        return await $requestService.apiReq("/security/policies");
      } catch (error) {
        $state.go("settings.api");
      }
    };

    const fetchNewRole = async (roleName) => {
      return await $requestService.apiReq(
        "/security/roles",
        {
          content: JSON.stringify({ name: roleName }),
          origin: "json"
        },
        "POST"
      );
    };

    const saveRole = async (role, policies) => {
      try {
        let roleId = "";

        if (!role.id) {
          const result = await fetchNewRole(role.name);

          const data = (result.data || {}).data;
          if (data.failed_items && data.failed_items.length) {
            return data;
          }

          if (data.affected_items && data.affected_items) {
            roleId = data.affected_items[0].id;
          }

          if (result.data.error === 1905) {
            return result;
          } else if (result.data.error) {
            throw new Error(
              result.data.message || result.data.error || "Cannot save Role."
            );
          }
        } else {
          roleId = role.id;
        }

        const policyResult = await $requestService.apiReq(
          `/security/roles/${roleId}/policies`,
          {
            policy_ids: policies.toString()
          },
          "POST"
        );

        const policiesData = (policyResult.data || {}).data;
        if (policiesData.failed_items && policiesData.failed_items.length) {
          return policiesData;
        }
>>>>>>> 48ef8b6c... feat(security-policies): Fixed handler errors
      } catch (error) {
        return Promise.reject(error);
      }
    }
    const getUsers = async user => {
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
    }
    const addUser = async user => {
      try {
        const result = await $requestService.apiReq(
          `/security/users`,
          {
            "username":"test",
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
      getUsers: getUsers,
      removeUser: removeUser
    };    
  });
});