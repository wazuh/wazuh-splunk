
define([
  'splunkjs/mvc/simplexml/searcheventhandler',
  '../viz/viz'
], function (
  SearchEventHandler,
  Viz
  ) {
    'use strict'
    
    return class SearchHandler extends Viz {
      
      /**
      * Builds a SearchHandler instance
      * @param {String} id 
      * @param {String} search 
      * @param {String} token 
      * @param {String} value 
      * @param {Object} bindedValue 
      * @param {UrlTokenModel} submittedTokenModel 
      */
      constructor(id, search,token, value, bindedValue, submittedTokenModel, $scope) {
        
        super(new SearchEventHandler({
          id: id,
          managerid: `${id}Search`,
          event: 'done',
          conditions: [
            {
              attr: 'any',
              value: '*',
              actions: [
                { 'type': 'set', 'token': token, 'value': value },
              ]
            }
          ]
        }), id, search)
        this.getSearch().on('search:done', () => {
          const result = submittedTokenModel.get(token)
          if (result && result !== token) {
            $scope[bindedValue] = result
          } else {
            $scope[bindedValue] = '-'
          }
          if (!$scope.$$phase) $scope.$digest()
        })
        submittedTokenModel.on(`change:${token}`, (model, loadedToken, options) => {
          const loadedTokenJS = submittedTokenModel.get(token)
          if (typeof loadedTokenJS !== 'undefined' && loadedTokenJS !== 'undefined') {
            $scope[bindedValue] = loadedTokenJS
          } else {
            $scope[bindedValue] = '-'
          }
          if (!$scope.$$phase) $scope.$digest()
        })
      }
    }
  })