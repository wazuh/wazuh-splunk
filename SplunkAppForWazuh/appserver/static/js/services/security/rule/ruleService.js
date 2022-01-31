/*
 * Wazuh app - Security Rule service
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
  "use strict"

  module.service("$ruleService", function ($requestService, _$state) {
    const fetchNewRule = async (rulePayload) => {
      return await $requestService.apiReq(
        "/security/rules",
        {
          content: JSON.stringify(rulePayload),
          origin: "json",
        },
        "POST"
      )
    }

    const editRule = async (id, rulePayload) => {
      return await $requestService.apiReq(
        `/security/rules/${id}`,
        {
          content: JSON.stringify(rulePayload),
          origin: "json",
        },
        "PUT"
      )
    }

    const deleteRoleRules = async (roleId, rules) => {
      return await $requestService.apiReq(
        `/security/roles/${roleId}/rules?rule_ids=${rules.join(",")}`,
        { content: "" },
        "DELETE"
      )
    }

    const addRoleRules = async (roleId, rules) => {
      return await $requestService.apiReq(
        `/security/roles/${roleId}/rules?rule_ids=${rules.join(",")}`,
        {},
        "POST"
      )
    }

    const removeRule = async (rule) => {
      try {
        const result = await $requestService.apiReq(
          `/security/rules?rule_ids=${rule}`,
          {},
          "DELETE"
        )

        if (
          result.data.data.failed_items.length &&
          result.data.data.failed_items[0].error.code === 4008
        ) {
          throw new Error(result.data.data.failed_items[0].error.message)
        }

        if (result.data.error !== 0) {
          throw new Error(result.data.message)
        }
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const saveRule = async (rule, roles) => {
      let ruleId = ""
      try {
        const result = await fetchNewRule(rule)
        const data = (result.data || {}).data || result
        if (data.error) {
          return data
        }
        if (data.failed_items && data.failed_items.length) {
          return data
        }

        if (data.affected_items && data.affected_items) {
          ruleId = data.affected_items[0].id
          await Promise.all(
            roles.map(async (role) => await addRoleRules(role, [ruleId]))
          )
          return data
        }

        if (result.data.error === 1905) {
          return result
        } else if (result.data.error) {
          throw new Error(
            result.data.message || result.data.error || "Cannot save Rule."
          )
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const updateRule = async (id, rule, currentRoles, newRoles) => {
      try {
        const result = await editRule(id, rule)
        const data = (result.data || {}).data || result
        if (data.error) {
          return data
        }
        if (data.failed_items && data.failed_items.length) {
          return data
        }

        if (data.affected_items && data.affected_items) {
          currentRoles.map(async (role) => {
            if (!newRoles.includes(role)) {
              await deleteRoleRules(role, [id])
            }
          })
          newRoles.map(async (role) => {
            if (!currentRoles.includes(role)) await addRoleRules(role, [id])
          })
          return data
        }

        if (result.data.error === 1905) {
          return result
        } else if (result.data.error) {
          throw new Error(
            result.data.message || result.data.error || "Cannot save Rule."
          )
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return {
      removeRule: removeRule,
      saveRule: saveRule,
      updateRule: updateRule,
    }
  })
})
