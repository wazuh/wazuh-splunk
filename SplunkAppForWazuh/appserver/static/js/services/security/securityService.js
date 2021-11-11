/*
 * Wazuh app - Security service
--
 * Copyright (C) 2015-2021 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(["../module"], function(module) {
  "use strict";

  module.service("$securityService", function($requestService, $state) {
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

    const fetchNewRole = async roleName => {
      return await $requestService.apiReq(
        "/security/roles",
        {
          content: JSON.stringify({ name: roleName }),
          origin: "json"
        },
        "POST"
      );
    };

    const fetchNewRule = async rulePayload => {
      return await $requestService.apiReq(
        "/security/rules",
        {
          content: JSON.stringify(rulePayload),
          origin: "json"
        },
        "POST"
      );
    };

    const editRule = async (id,rulePayload) => {
      return await $requestService.apiReq(
        `/security/rules/${id}`,
        {
          content: JSON.stringify(rulePayload),
          origin: "json"
        },
        "PUT"
      );
    };

    const deleteRoleRules = async (roleId, rules) => {
      return await $requestService.apiReq(
        `/security/roles/${roleId}/rules?rule_ids=${rules.join(',')}`,
        { content: "" },
        "DELETE"
      );
    };

    const addRoleRules = async (roleId, rules) => {
      return await $requestService.apiReq(
        `/security/roles/${roleId}/rules?rule_ids=${rules.join(',')}`,
        );
    };

    const fetchEditRole = async (roleId, policies) => {
      return await $requestService.apiReq(
        `/security/roles/${roleId}/policies?policy_ids=${policies.toString()}`,
        { content: "" },
        "POST"
      );
    };

    const saveRole = async (role, policies) => {
      try {
        let roleId = "";

        if (!role.id) {
          const result = await fetchNewRole(role.name);

          if (typeof result.data.error === 'string') {
            throw new Error(`Cannot save Role ${role.name}`);
          }

          if (
            result.data.error === 1 &&
            result.data.data.failed_items[0].error.code === 4005
          ) {
            throw new Error(
              result.data.data.failed_items[0].error.message ||
              result.data.data.message ||
              "Cannot save Role."
            );
          }

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

        return await fetchEditRole(roleId, policies);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const savePolicy = async (policyName, actions, resources, effectValue) => {
      try {
        const result = await $requestService.apiReq(
          "/security/policies",
          {
            content: JSON.stringify({
              name: policyName,
              policy: {
                actions: actions,
                resources: resources,
                effect: effectValue
              }
            }),
            origin: "json"
          },
          "POST"
        );

        return result.data;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const updatePolicy = async (policyId, actions, resources, effectValue) => {
      try {
        const result = await $requestService.apiReq(
          `/security/policies/${policyId}`,
          {
            content: JSON.stringify({
              policy: {
                actions: actions,
                resources: resources,
                effect: effectValue
              }
            }),
            origin: "json"
          },
          "PUT"
        );

        return result.data;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const removeRole = async role => {
      try {
        const result = await $requestService.apiReq(
          `/security/roles?role_ids=${role}`,
          {},
          "DELETE"
        );

        if (
          result.data.data.failed_items.length &&
          result.data.data.failed_items[0].error.code === 4008
        ) {
          throw new Error(result.data.data.failed_items[0].error.message);
        }

        if (result.data.error !== 0) {
          throw new Error(result.data.message);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const removePolicy = async policy => {
      try {
        const result = await $requestService.apiReq(
          `/security/policies?policy_ids=${policy}`,
          {},
          "DELETE"
        );

        if (
          result.data.data.failed_items.length &&
          result.data.data.failed_items[0].error.code === 4008
        ) {
          throw new Error(result.data.data.failed_items[0].error.message);
        }

        if (result.data.error !== 0) {
          throw new Error(result.data.message);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const getResourceData = async () => {
      try {
        return await $requestService.apiReq("/security/resources");
      } catch (error) {
        $state.go("settings.api");
      }
    };

    const getActionData = async () => {
      try {
        return await $requestService.apiReq("/security/actions");
      } catch (error) {
        $state.go("settings.api");
      }
    };

    const removeRule = async rule => {
      try {
        const result = await $requestService.apiReq(
          `/security/rules?rule_ids=${rule}`,
          {},
          "DELETE"
        );

        if (
          result.data.data.failed_items.length &&
          result.data.data.failed_items[0].error.code === 4008
        ) {
          throw new Error(result.data.data.failed_items[0].error.message);
        }

        if (result.data.error !== 0) {
          throw new Error(result.data.message);
        }
        return result;
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const saveRule = async (rule,roles) => {
      let ruleId = "";
      try {
          const result = await fetchNewRule(rule);
          const data = (result.data || {}).data || result;
          if(data.error){
            return data;
          }
          if (data.failed_items && data.failed_items.length) {
            return data;
          }

          if (data.affected_items && data.affected_items) {
            ruleId = data.affected_items[0].id;
            await Promise.all(
              roles.map(async (role) => await addRoleRules(role, [ruleId]))
            );
            return data
          }

          if (result.data.error === 1905) {
            return result;
          } else if (result.data.error) {
            throw new Error(
              result.data.message || result.data.error || "Cannot save Rule."
            );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const updateRule = async (id,rule,currentRoles,newRoles) => {
      try {
          const result = await editRule(id,rule);
          const data = (result.data || {}).data || result;
          if(data.error){
            return data;
          }
          if (data.failed_items && data.failed_items.length) {
            return data;
          }

          if (data.affected_items && data.affected_items) {
              currentRoles.map(async (role) => {
                if(!newRoles.includes(role)){
                  await deleteRoleRules(role, [id])
                }
              });
              newRoles.map(async (role) => {
                if(!currentRoles.includes(role))
                  await addRoleRules(role, [id])
              });
            return data
          }

          if (result.data.error === 1905) {
            return result;
          } else if (result.data.error) {
            throw new Error(
              result.data.message || result.data.error || "Cannot save Rule."
            );
        }
      } catch (error) {
        return Promise.reject(error);
      }
    };

    return {
      getRoleData: getRoleData,
      getPolicyData: getPolicyData,
      saveRole: saveRole,
      getResourceData: getResourceData,
      getActionData: getActionData,
      savePolicy: savePolicy,
      updatePolicy: updatePolicy,
      removeRole: removeRole,
      removeRule: removeRule,
      saveRule: saveRule,
      updateRule: updateRule,
      removePolicy: removePolicy
    };
  });
});
