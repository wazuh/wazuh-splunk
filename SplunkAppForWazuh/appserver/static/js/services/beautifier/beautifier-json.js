/*
 * Wazuh app - Module for JSON beautify
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(["../module"], function (module) {
  "use strict"
  module.service("$beautifierJson", function () {
    /**
     * Replaces strings
     * @param {String} match
     * @param {String} pIndent
     * @param {String} pKey
     * @param {String} pVal
     * @param {String} pEnd
     */
    const replacer = (match, pIndent, pKey, pVal, pEnd) => {
      let key = "<span class=json-key>"
      let val = "<span class=json-value>"
      let str = "<span class=json-string>"
      let r = pIndent || ""
      if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: "
      if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + "</span>"
      return r + (pEnd || "")
    }

    /**
     * Parses and formats a JSON Object
     * @param {Object} obj
     */
    const prettyPrint = (obj) => {
      let jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm
      return JSON.stringify(obj, null, 3)
        .replace(/&/g, "&amp;")
        .replace(/\\"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(jsonLine, replacer)
    }
    return {
      replacer: replacer,
      prettyPrint: prettyPrint,
    }
  })
})
