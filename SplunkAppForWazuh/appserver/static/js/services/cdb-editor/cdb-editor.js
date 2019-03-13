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

  class CDBEditor {
    constructor($requestService) {
      this.getConfig = $requestService.getConfiguration
      this.apiReq = $requestService.apiReq
    }

    async sendConfiguration(file, path, content, overwrite = false) {
      try {
        const url = overwrite
          ? `/manager/files?path=${path}/${file}&overwrite=true`
          : `/manager/files?path=${path}/${file}`
        const result = await this.apiReq(
          `${url}`,
          { content, origin: 'raw' },
          'POST'
        )
        if (
          !result ||
          !result.data ||
          !result.data.data ||
          result.data.error !== 0 ||
          (result.data.data.error && result.data.data.error !== 0)
        ) {
          if (result.data.error === 1905) {
            return result
          } else {
            throw new Error(result.data.message || 'Cannot send this file.')
          }
        }
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async getConfiguration(file, path) {
      try {
        const url = `/manager/files?path=${path}/${file}`
        const result = await this.getConfig(url)
        if (
          !result ||
          !result.data ||
          !result.data.data ||
          result.data.error != 0
        ) {
          throw new Error('Error fetching cdb list content')
        }
        return result.data.data
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  module.service('$cdbEditor', CDBEditor)
})
