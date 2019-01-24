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

define(['../module'], function(module) {
  'use strict'

  class GroupHandler {
    constructor($requestService) {
      this.req = $requestService
    }

    async removeAgentFromGroup(group, agentId) {
      try {
        const result = await this.req.apiReq(
          `/agents/${agentId}/group/${group}`,
          {},
          'DELETE'
        )
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async addAgentToGroup(group, agentId) {
      try {
        const result = await this.req.apiReq(
          `/agents/${agentId}/group/${group}`,
          {},
          'PUT'
        )
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async modifyGroup() {
      try {
        throw new Error('Not yet implemented')
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async removeGroup(group) {
      try {
        const result = await this.req.apiReq(
          `/agents/groups/${group}`,
          {},
          'DELETE'
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
        const result = await this.req.apiReq(
          `/agents/groups/${name}`,
          {},
          'PUT'
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
        const result = this.req.sendConfiguration(
          `/agents/groups/${group}/files/agent.conf`,
          content
        )
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  module.service('$groupHandler', GroupHandler)
})
