define(['splunkjs/mvc/simplexml/searcheventhandler', '../viz/viz'], function(
  SearchEventHandler,
  Viz
) {
  'use strict'

  return class SearchHandler extends Viz {
    /**
     * Builds a SearchHandler (Metrics) instance
     * @param {String} id
     * @param {String} search
     * @param {String} token
     * @param {String} value
     * @param {Object} bindedValue
     * @param {UrlTokenModel} submittedTokenModel
     * @param {$scope} $scope
     */
    constructor(
      id,
      search,
      token,
      value,
      bindedValue,
      submittedTokenModel,
      $scope,
      loading,
      loadingBindedValue
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
      this.submittedTokenModel = submittedTokenModel
      this.token = token
      this.loading = loading
      this.loadingBindedValue = loadingBindedValue

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
        if (this.loading) {
          $scope[this.loadingBindedValue] = true
        }
      })

      this.getSearch().on('search:done', () => {
        if (this.loading) {
          $scope[this.loadingBindedValue] = false
        }
        const result = submittedTokenModel.get(this.token)
        if (
          result &&
          result !== value &&
          typeof result !== 'undefined' &&
          result !== 'undefined'
        ) {
          $scope[bindedValue] = result
        } else {
          $scope[bindedValue] = '0'
        }
        if (!$scope.$$phase) $scope.$digest()
      })

      this.submittedTokenModel.on(
        `change:${this.token}`,
        (model, loadedToken, options) => {
          const loadedTokenJS = this.submittedTokenModel.get(token)
          if (
            loadedTokenJS &&
            loadedTokenJS !== value &&
            typeof loadedTokenJS !== 'undefined' &&
            loadedTokenJS !== 'undefined'
          ) {
            $scope[bindedValue] = loadedTokenJS
          } else {
            $scope[bindedValue] = '0'
          }
          if (!$scope.$$phase) $scope.$digest()
        }
      )

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
