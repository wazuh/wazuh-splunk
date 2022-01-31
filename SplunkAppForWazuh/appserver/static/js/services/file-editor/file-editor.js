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

  class FileEditor {
    constructor($requestService) {
      this.sendConfig = $requestService.sendConfiguration
      this.getConfig = $requestService.getConfiguration
      this.apiReq = $requestService.apiReq
      this.typeFilesByPath = {
        "ruleset/rules": "rules",
        "etc/rules": "rules",
        "ruleset/decoders": "decoders",
        "etc/decoders": "decoders",
        "etc/lists": "lists",
      }
    }

    async sendConfiguration(file, dir, node, content, overwrite = false) {
      try {
        const typeFile = this.typeFilesByPath[dir]
        let url = `/${typeFile}/files/${file}?overwrite=${overwrite}`
        if (file === "ossec.conf") {
          const nodeUrl = node ? `cluster/${node}` : "manager"
          url = `/${nodeUrl}/configuration`
        }
        const result = await this.sendConfig(url, content)
        if (
          !result ||
          !result.data ||
          !result.data.data ||
          result.data.error !== 0
        ) {
          if (result.data.error === 1905) {
            return "fileAlreadyExists"
          } else {
            throw new Error(
              result.data.message || `Error updating ${file} content.`
            )
          }
        }
        return await this.checkConfiguration(node)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async getConfiguration(file, dir, node, _readOnly = false) {
      try {
        const typeFile = this.typeFilesByPath[dir]
        let url = `/${typeFile}/files/${file}?raw=true`
        if (file === "ossec.conf") {
          const nodeUrl = node ? `cluster/${node}` : "manager"
          url = `/${nodeUrl}/configuration?raw=true`
        }

        // let path = dir ? `${dir}/${file}` : file
        // if (!readOnly) {
        //   path = path.startsWith("etc/") ? path : `etc/${path}`
        // }
        const result = await this.apiReq(url, { origin: "xmlreader" })
        if (!result || !result.data) {
          throw new Error(`Error fetching ${file} content.`)
        }
        if (!result.data.data)
          //Force XML box to be printed when the file is empty
          return " "
        return result.data.data
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async checkConfiguration(node) {
      try {
        const url = node
          ? `/cluster/configuration/validation?nodes_list=${node}`
          : "/manager/configuration/validation"
        const check = await this.apiReq(url)
        if (check && check.data && !check.data.error) {
          if (check.data.data.affected_items[0].status !== "OK") {
            const errObj = {}
            errObj["badConfig"] = true
            errObj["errMsg"] = [
              ...new Set(check.data.data.affected_items.details),
            ]
            return Promise.reject(errObj)
          } else {
            return "Configuration saved."
          }
        } else {
          return Promise.reject(
            check.data.message || "Cannot check configuration."
          )
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    async removeFile(item) {
      try {
        const file = item.filename || item.name
        const typeFile = this.typeFilesByPath[item.relative_dirname]
        const url = `/${typeFile}/files/${file}`
        const result = await this.apiReq(url, {}, "DELETE")
        if (result && result.data && !result.data.error) {
          return `File ${file} deleted.`
        } else {
          throw new Error(result.data.message || `Cannot remove ${file}`)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }

  module.service("$fileEditor", FileEditor)
})
