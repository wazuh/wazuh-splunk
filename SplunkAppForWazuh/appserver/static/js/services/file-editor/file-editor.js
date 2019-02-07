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
  
    class FileEditor {
      constructor($requestService) {
        this.sendConfig = $requestService.sendConfiguration
        this.getConfig = $requestService.getConfiguration
      }
  
      async sendConfiguration(file, dir, node, content) {
        try {
          const path = dir ? `${dir}/${file}` : file
          node = node ? `cluster/${node}` : 'manager'
          const url =  `/${node}/files?path=etc/${path}`
          const result = await this.sendConfig(url, content)
          if (
            !result ||
            !result.data ||
            !result.data.data ||
            result.data.error != 0
          ) {
            throw new Error(`Error updating ${file} content.`)
          }
           return result.data.data
        } catch (error) {
          return Promise.reject(error)
        }
      }
  
      async getConfiguration(file, dir, node) {
        try {
          const path = dir ? `${dir}/${file}` : file
          node = node ? `cluster/${node}` : 'manager'
          const url = `/${node}/files?path=etc/${path}`
          const result = await this.getConfig(url)
          if (
            !result ||
            !result.data ||
            !result.data.data ||
            result.data.error != 0
          ) {
            throw new Error(`Error fetching ${file} content.`)
          }
           return result.data.data
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }
    
  module.service('$fileEditor', FileEditor)
})
