define(['../module'], function (module) {
  'use strict';

  module.service('$currentApiIndexService', function ($state) {
    const service = {
      /**
    * Delete selected index
    */
      removeIndex: () => {
        sessionStorage.selectedIndex = ''
      },

      /**
       * Select an Index by name
       * @param {String} index 
       */
      selectIndex: (index) => {
        sessionStorage.selectedIndex = index
      },

      /**
       * Returns currently selected index
       * @param {String} index 
       */
      getIndex: () => {
        return (sessionStorage.selectedIndex !== '') ? sessionStorage.selectedIndex : 'wazuh'
      },

      /**
      * Delete selected API
      */
      removeAPI: () => {
        sessionStorage.selectedAPI = ''
      },

      /**
       * Select an API
       * @param {String} API 
       */
      selectAPI: (API) => {
        sessionStorage.selectedAPI = API
      },

      /**
       * Returns currently selected API
       * @param {String} API 
       */
      getAPI: () => {
        return sessionStorage.selectedAPI
      }
    }

    return service;
  });
});