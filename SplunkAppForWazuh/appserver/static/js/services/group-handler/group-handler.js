/*
 * Wazuh app - Group handler service
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(["../module"], function (module) {
  "use strict"

  class GroupHandler {
    constructor($requestService) {
      this.req = $requestService
    }

    async removeAgentFromGroup(group, agentId) {
      try {
        const result = await this.req.apiReq(
          `/agents/${agentId}/group/${group}`,
          {},
          "DELETE"
        )
        if (result && result.data && !result.data.error) {
          return result.data
        } else {
          throw new Error(result.data.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async addAgentToGroup(group, agentId) {
      try {
        const result = await this.req.apiReq(
          `/agents/${agentId}/group/${group}`,
          {},
          "PUT"
        )
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async modifyGroup() {
      try {
        throw new Error("Not yet implemented")
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async removeGroup(group) {
      try {
        const result = await this.req.apiReq(
          `/groups?groups_list=${group}`,
          {},
          "DELETE"
        )
        if (result.data.error != 0) {
          throw new Error(result.data.message)
        }
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async createGroup(name) {
      try {
        const content = JSON.stringify({ group_id: name })
        const result = await this.req.apiReq(
          `/groups`,
          { content, origin: "json" },
          "POST"
        )
        if (result.data.error != 0) {
          throw new Error(result.data.message)
        }
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async sendConfiguration(group, content) {
      try {
        const result = this.req.sendGroupConfiguration(
          `/groups/${group}/configuration`,
          content
        )
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  module.service("$groupHandler", GroupHandler)
})
