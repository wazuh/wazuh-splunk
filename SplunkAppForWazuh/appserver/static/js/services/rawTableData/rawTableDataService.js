define(['splunkjs/mvc', 'splunkjs/mvc/simplexml/searcheventhandler', '../visualizations/viz/viz'], function (
  mvc,
  SearchEventHandler,
  Viz
) {
  'use strict'

  return class RawTableData extends Viz {
    /**
     * Builds a SearchHandler (Metrics) instance
     * @param {String} id
     * @param {String} search
     * @param {String} token
     * @param {String} value
     * @param {UrlTokenModel} submittedTokenModel
     * @param {$scope} $scope
     */
    constructor(
      id,
      search,
      token,
      value,
      submittedTokenModel,
      $scope
    ) {
      super(
        new SearchEventHandler({
          id: id,
          managerid: `${id}Search`,
          event: 'done',
          conditions: [
            {
              attr: 'any',
              value: '*',
              actions: [{ type: 'set', token: token, value: value }]
            }
          ]
        }),
        id,
        search
      )
      mvc.Components.revokeInstance(this.id)
      this.submittedTokenModel = submittedTokenModel
      this.token = token
      this.scope = $scope
      this.results = {}

      this.getSearch().on('search:failed', () => {
        console.error('Failed search')
      })

      this.getSearch().on('search:cancelled', () => {
        console.error('Cancelled search')
      })

      this.getSearch().on('search:error', error => {
        console.error(error)
      })

      this.getSearch().on('search:progress', () => {
      })

      this.getSearch().on('search:done', () => {
        const tableResults = mvc.Components.getInstance(`${this.id}Search`)
        const tableData = tableResults.data("results", {
          output_mode: "json_rows",
          count: 20
        })
        tableData.on("data", () => {
          this.results = { 'fields': tableData._data.fields, 'rows': tableData._data.rows }  
          this.getSearch().trigger('result', this.results)
        })
        tableData.on("error", (err) => {
          console.error(err)
        })
      })

      this.initSearch()
    }

    initSearch() {
      this.getSearch().startSearch()
    }

    /**
     * On class destroy
     */
    destroy() {
      this.getSearch().off('search:done')
      this.getSearch().off('search:error')
      this.getSearch().off('search:cancelled')
      this.getSearch().off('search:failed')
      this.getSearch().off('search:start')
      this.getSearch().off('search:progress')
      this.submittedTokenModel.off(`change:${this.token}`)
      super.destroy()
    }
  }
})