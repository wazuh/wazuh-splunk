/*
 * Wazuh app - Security Policy service
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

define(["../../module"], function (module) {
  "use strict";

  module.service("$policyService", function ($requestService, $state) {
    const getPolicyData = async () => {
      try {
        return await $requestService.apiReq("/security/policies");
      } catch (error) {
        $state.go("settings.api");
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

    return {
      getPolicyData: getPolicyData,
      savePolicy: savePolicy,
      updatePolicy: updatePolicy,
      removePolicy: removePolicy,
      getResourceData: getResourceData,
      getActionData: getActionData
    };
  });
});
