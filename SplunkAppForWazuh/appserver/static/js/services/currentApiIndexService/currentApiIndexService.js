define(['../module'], function (module) {
  'use strict';

  module.service('$currentApiIndexService', function ($state) {
    const service = {
      /**
    * Delete selected index
    */
      remove: () => {
        sessionStorage.selectedIndex = ''
      },

      /**
       * Select an Index by name
       * @param {String} index 
       */
      select: (index) => {
        sessionStorage.selectedIndex = index
      },

      /**
       * Returns currently selected index
       * @param {String} index 
       */
      get: () => {
        return (sessionStorage.selectedIndex !== '') ? sessionStorage.selectedIndex  : 'wazuh'
      }
    }

    return service;
  });
});