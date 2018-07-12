define(['../module'], function (module) {
  'use strict';

  module.service('$currentApiIndexService', function () {
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
        return (sessionStorage.selectedIndex === '' || !sessionStorage.selectedIndex) ? 'wazuh' :  sessionStorage.selectedIndex
      },

      /**
      * Delete selected API
      */
      removeAPI: () => {
        delete sessionStorage.selectedAPI
      },

      /**
       * Select an API
       * @param {String} API 
       */
      setAPI: (API) => {
        console.log('setting API')
        delete sessionStorage.selectedAPI
        sessionStorage.selectedAPI = API
        console.log(sessionStorage.selectedAPI)
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