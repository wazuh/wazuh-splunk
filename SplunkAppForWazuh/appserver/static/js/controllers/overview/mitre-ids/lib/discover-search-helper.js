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
  'splunkjs/mvc',
], function (SearchManager, mvc) {
  'use strict'

  return class DiscoverSearchHelper {

    constructor({ id, search, onData, scope }) {
      this.id = id;
      this.scope = scope;
      this.onData = typeof onData === 'function' ? onData : function () { };
      this.manager = new SearchManager({
        id: this.id,
        preview: true,
        cache: false,
        status_buckets: 300,
        search: search
      });
      this.manager.on('search:done', () => {
        this.scope.loadingVizz = false;
        this.scope.$applyAsync();

        this.data = this.manager.data("results", {});
        this.data.on("data", () => {
          if (this.data.hasData()) {
            const rows = this.data.collection().raw.rows;
            this.onData(rows);
          }
        });
      })
    }
    destroy() {
      try {
        mvc.Components.revokeInstance(this.id)
        delete (this.search)
      } catch (err) {
        return
      }
    }
  }

})