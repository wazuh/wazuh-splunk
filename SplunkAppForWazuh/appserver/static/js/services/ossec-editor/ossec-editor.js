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
  
    class OssecEditor {
      constructor($requestService) {
        this.sendConfig = $requestService.sendConfiguration
        this.getConfig = $requestService.getConfiguration
      }
  
      async sendManagerConfiguration(content) {
        try {
          const result = await this.sendConfig(`/manager/files?path=etc/ossec.conf`, content)
          if (
            !result ||
            !result.data ||
            !result.data.data ||
            result.data.error != 0
          ) {
            throw new Error("Error updating manager configuration.")
          }
           return result.data.data
        } catch (error) {
          return Promise.reject(error)
        }
      }

      async getManagerConfiguration() {
        try {
          const url = `/manager/files?path=etc/ossec.conf`
          const result = await this.getConfig(url)
          if (
            !result ||
            !result.data ||
            !result.data.data ||
            result.data.error != 0
          ) {
            throw new Error("Error fetching manager configuration.")
          }
           return result.data.data
        } catch (error) {
          return Promise.reject(error)
        }
      }

      async sendNodeConfiguration(){}
      async getNodeConfiguration(){}
    }
    module.service('$ossecEditor', OssecEditor)
  })