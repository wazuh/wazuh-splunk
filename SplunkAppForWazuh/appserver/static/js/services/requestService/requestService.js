define(['../module'], function(module) {
  'use strict';

  module.service('$requestService', function(
    $http,
    $apiIndexStorageService,
    $q
  ) {
    /**
     * Generated and returns the browser base URL + Splunk Port
     */
    const getBaseUrl = () => {
      return `${window.location.href.split(/\/[a-z][a-z]-[A-Z][A-Z]\//)[0]}/`;
    };

    /**
     * Generates and returns the browser base URL + Splunk Port
     */
    const getWellFormedUri = endpoint => {
      try {
        return `${getBaseUrl()}en-US/custom/SplunkAppForWazuh/${endpoint}`;
      } catch (err) {
        return Promise.reject(err);
      }
    };

    /**
     * Performs a HTTP request
     * @param {String} method
     * @param {String} endpoint
     * @param {Boolean} includedApi
     * @param {Object} payload
     */
    const httpReq = async (method, endpoint, payload = {}) => {
      try {
        if (!method || !endpoint) {
          throw new Error('Missing parameters');
        }
        const tmpUrl = getWellFormedUri(endpoint);
        const data = {};

        // Set content type to form urlencoded
        $http.defaults.headers.post['Content-Type'] =
          'application/x-www-form-urlencoded';
        // GET METHOD
        if (method === 'GET')
          Object.assign(data, await $http.get(tmpUrl, { params: payload }));
        // PUT METHOD
        else if (method === 'PUT')
          Object.assign(data, await $http.post(tmpUrl, payload));
        // POST METHOD
        else if (method === 'POST')
          Object.assign(data, await $http.post(tmpUrl, payload));
        // DELETE METHOD
        else if (method === 'DELETE')
          Object.assign(data, await $http.delete(tmpUrl));
        if (!data) {
          throw new Error(
            `Error doing a request to ${tmpUrl}, method: ${method}.`
          );
        }
        if (data.error && data.error !== '0') {
          throw new Error('HTTP error from server: ', data.error);
        }
        return $q.resolve(data);
      } catch (error) {
        return $q.reject(error);
      }
    };

    /**
     * Performs a GET request to Wazuh API
     * @param {String} endpoint
     * @param {Object} opts
     */
    const apiReq = async (endpoint, opts, method='GET') => {
      try {
        const currentApi = $apiIndexStorageService.getApi();
        const id = currentApi && currentApi.id ? currentApi.id : opts.id;
        const payload = { id, endpoint };
        if (opts && typeof opts === `object`) {
          Object.assign(payload, opts);
        }
        const result = await httpReq(`GET`, `/api/request`, payload);
        return result;
      } catch (err) {
        return Promise.reject(err);
      }
    };

    const service = {
      getBaseUrl: getBaseUrl,
      getWellFormedUri: getWellFormedUri,
      apiReq: apiReq,
      httpReq: httpReq
    };
    return service;
  });
});
