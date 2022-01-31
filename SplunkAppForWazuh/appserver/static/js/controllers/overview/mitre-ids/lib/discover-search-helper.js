/*
 * Wazuh app - Discover search helper
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define([
  "splunkjs/mvc/searchmanager",
  "splunkjs/mvc/utils",
  "splunkjs/mvc",
], function (SearchManager, utils, mvc) {
  "use strict"
  return class DiscoverSearchHelper {
    constructor({ id, search, onData, scope, earliest_time, latest_time }) {
      this.id = id
      this.scope = scope
      this.sanitizeTime({ earliest_time, latest_time })
      this.onData = typeof onData === "function" ? onData : function () {}
      this.manager = new SearchManager({
        id: this.id,
        preview: true,
        cache: 30,
        status_buckets: 0,
        search: search,
        cancelOnUnload: true,
        app: utils.getCurrentApp(),
        auto_cancel: 90,
        earliest_time: this.earliest_time,
        latest_time: this.latest_time,
      })
      this.manager.on("search:done", () => {
        this.scope.loadingVizz = false
        this.scope.$applyAsync()
        this.data = this.manager.data("results", {})
        this.data.on("data", () => {
          if (this.data.hasData()) {
            const rows = this.data.collection().raw.rows
            this.onData(rows)
          }
        })
      })
    }
    sanitizeTime({ earliest_time, latest_time }) {
      if (typeof earliest_time === "undefined" || earliest_time === "")
        this.earliest_time = "0"
      else this.earliest_time = earliest_time
      if (typeof latest_time === "undefined" || latest_time === "")
        this.latest_time = "now"
      else this.latest_time = latest_time
    }
    destroy() {
      try {
        mvc.Components.revokeInstance(this.id)
        delete this.search
      } catch (err) {
        return
      }
    }
  }
})
