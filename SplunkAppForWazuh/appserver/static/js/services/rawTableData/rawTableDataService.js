define([
  'splunkjs/mvc',
  'splunkjs/mvc/utils',
  'splunkjs/mvc/searchmanager'
], function ( mvc, utils, SearchManager) {
  'use strict'

  return class RawTableData {
    constructor(id, search) {
      this.id = id
      this.search = new SearchManager({
        id: `${this.id}Search`,
        app: utils.getCurrentApp(),
        cache: false,
        search: search
      })
      this.result = null
    }

    cancel() {
      this.search.cancel()
    }

    destroy() {
      try {
        this.cancel()
        mvc.Components.revokeInstance(this.id)
        mvc.Components.revokeInstance(`${this.id}Search`)
        this.search = null
      } catch (err) { return }
    }

    async getResults() {
      return new Promise((resolve, reject) => {
        this.search.on("search:done", () => {
          const tableResults = mvc.Components.getInstance(`${this.id}Search`)
          const tableData = tableResults.data("results", {
            output_mode: "json_rows",
            count: 20
          })
          tableData.on("data", () => {
            resolve({ 'fields': tableData._data.fields, 'rows': tableData._data.rows })
          })
          tableData.on("error", (err) => {
            reject(err)
          })
        })
      })
    }
  }
})