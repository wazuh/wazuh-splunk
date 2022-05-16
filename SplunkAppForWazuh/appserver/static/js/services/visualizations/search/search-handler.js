define(['splunkjs/mvc/simplexml/searcheventhandler', '../viz/viz'], function (
  SearchEventHandler,
  Viz
) {
  'use strict'

  const FORWARDER_ERROR =
    'Unable to retrieve results. It may be due to a connection problem with the Splunk forwarder,\nplease try restarting this service.'

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
        console.error(error)
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
        const result = this.submittedTokenModel.get(this.token)
        if (
          result &&
          result !== value &&
          typeof result !== 'undefined' &&
          result !== 'undefined'
        ) {
          this.scope[bindedValue] = result
        } else {
          this.scope[bindedValue] = '0'
          this.notification && this.notification.showErrorToast(FORWARDER_ERROR)
        }
        this.scope.$applyAsync()
      })

      this.submittedTokenModel.on(`change:${this.token}`, () => {
        const loadedTokenJS = this.submittedTokenModel.get(this.token)
        if (
          loadedTokenJS &&
          loadedTokenJS !== value &&
          typeof loadedTokenJS !== 'undefined' &&
          loadedTokenJS !== 'undefined'
        ) {
          this.scope[bindedValue] = loadedTokenJS
        } else {
          this.scope[bindedValue] = '0'
          this.notification && this.notification.showErrorToast(FORWARDER_ERROR)
        }
        this.scope.$applyAsync()
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
