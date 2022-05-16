/*
 * Wazuh app - Group handler service
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../module'], function (module) {
  'use strict'

  class CDBEditor {
    constructor($requestService) {
      this.getConfig = $requestService.getConfiguration
      this.apiReq = $requestService.apiReq
    }

    async sendConfiguration(file, path, content, overwrite = false) {
      try {
        const url = `/lists/files/${file}?overwrite=${overwrite}`
        const result = await this.apiReq(
          `${url}`,
          { content, origin: 'raw' },
          'PUT'
        )
        if (
          !result ||
          !result.data ||
          result.data.error !== 0 ||
          (result.data.error && result.data.error !== 0)
        ) {
          if (result.data.error === 1905) {
            return result
          } else {
            throw new Error(
              result.data.error || 'File upload failed. Check the logs.'
            )
          }
        }
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async getConfiguration(file, _path) {
      try {
        const url = `/lists/files/${file}?raw=true`
        const result = await this.apiReq(url, { origin: 'raw' })
        if (!result || !result.data) {
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
