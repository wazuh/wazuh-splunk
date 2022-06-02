define(['splunkjs/mvc/simplexml/searcheventhandler', '../viz/viz'], function (
  SearchEventHandler,
  Viz
) {
  'use strict'

  const FORWARDER_ERROR = `Unable to retrieve results.\n
  It may be due to a connection problem with the Splunk forwarder,\nplease try restarting this service.`

  return class SearchHandler extends Viz {
    /**
     * Builds a SearchHandler (Metrics) instance
     * @param {String} id
     * @param {String} search
     * @param {String} token
     * @param {String} value
     * @param {Object} bindedValue
     * @param {UrlTokenModel} submittedTokenModel
     * @param {scope} scope
     */
    constructor(
      id,
      search,
      token,
      value,
      bindedValue,
      submittedTokenModel,
      scope,
      loading,
      loadingBindedValue,
      notification = null
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
              actions: [{ type: 'set', token: token, value: value }],
            },
          ],
        }),
        id,
        search,
        scope
      )
      this.submittedTokenModel = submittedTokenModel
      this.token = token
      this.loading = loading
      this.loadingBindedValue = loadingBindedValue
      this.notification = notification

      this.getSearch().on('search:failed', () => {
        console.error('Failed search')
      })
      this.getSearch().on('search:cancelled', () => {
        console.error('Cancelled search')
      })

      this.getSearch().on('search:error', (error) => {
        console.error('search:error', error)
      })

      this.getSearch().on('search:progress', () => {
        if (this.loading) {
          this.scope[this.loadingBindedValue] = true
        }
      })

      this.getSearch().on('search:done', () => {
        if (this.loading) {
          this.scope[this.loadingBindedValue] = false
        }

        // More info in:
        // https://docs.splunk.com/DocumentationStatic/WebFramework/1.5/compref_splunkresultsmodel.html#top
        const resultModel = this.search.data('results')
        resultModel.on('data', (data) => {
          try {
            if (data.hasData()) {
              const result = this.submittedTokenModel.get(this.token)
              this.scope[bindedValue] = result
              this.scope.$applyAsync()
            }
          } catch (err) {
            console.error('Error fetching table data ', err)
          }
        })
        resultModel.on('error', (err) => {
          console.error('Search Handler - onError: ', err)
        })
        if (!this.search.query?.changed?.data?.resultCount)
          this.notification &&
            this.notification.showWarningToast(FORWARDER_ERROR)
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
