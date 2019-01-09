/*
 * Wazuh app - Group handler service
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../module'], function (module) {
  'use strict'

  class GroupHandler {
    constructor($requestService) {
      this.apiReq = $requestService.apiReq
    }

    async removeAgentFromGroup(group, agentId) {
      try {
        const result = await this.apiReq(`/agents/${agentId}/group/${group}`, {}, 'DELETE')
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async addAgentToGroup(group, agentId) {
      try {
        const result = await this.apiReq(`/agents/${agentId}/group/${group}`, {}, 'PUT')
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

    async sendConfiguration(group, content) {
      try {
        const result = await this.apiReq(
          `/agents/groups/${group}/files/agent.conf`,
          { content, origin: 'xmleditor' },
          'POST',
        )
        if(!result || !result.data || !result.data.data || result.data.data.error !== 0) {
          throw new Error('Cannot send file.')
        }
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

  }
  module.service('$groupHandler', GroupHandler)

})