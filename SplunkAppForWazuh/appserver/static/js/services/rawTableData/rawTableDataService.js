define([
  'splunkjs/mvc',
  'splunkjs/mvc/simplexml/searcheventhandler',
  '../visualizations/viz/viz',
], function (mvc, SearchEventHandler, Viz) {
  'use strict'

  return class RawTableData extends Viz {
    /**
     * Builds a SearchHandler (Metrics) instance
     * @param {String} id
     * @param {String} search
     * @param {String} token
     * @param {String} value
     * @param {scope} scope
     * @param {string} name
     */
    constructor(id, search, token, value, scope, name) {
      super(
        new SearchEventHandler({
          id: id,
          managerid: `${id}Search`,
          event: 'done',
          conditions: [
            {
              attr: 'any',
              value: '*',
              actions: [{ type: 'set', token: token, value: value }],
            },
          ],
        }),
        id,
        search,
        scope
      )
      mvc.Components.revokeInstance(this.id)
      this.token = token
      this.name = name
      this.results = {}

      this.getSearch().on('search:failed', () => {
        this.results = {}
        console.error('Failed search')
      })

      this.getSearch().on('search:cancelled', () => {
        this.results = {}
        console.error('Cancelled search')
      })

      this.getSearch().on('search:error', (error) => {
        this.results = {}
        console.error(error)
      })

      this.getSearch().on('search:start', () => {
        this.results = {}
      })

      this.getSearch().on('search:progress', () => {})

      this.getSearch().on('search:done', () => {
        this.getSearch().finish = false
        const tableResults = mvc.Components.getInstance(`${this.id}Search`)
        const tableData = tableResults.data('results', {
          output_mode: 'json_rows',
          count: 20,
        })
        tableData.on('data', (data) => {
          try {
            if (data._data) {
              this.results.fields = tableData._data.fields
              this.results.rows = tableData._data.rows
              this.getSearch().finish = true
              this.checkVizzStatus()
            } else {
              this.getSearch().finish = false
            }
          } catch (err) {
            console.error('Error fetching table data ', err)
          }
        })
        tableData.on('error', (err) => {
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
      super.destroy()
    }
  }
})
