/*
 * Wazuh app - API request service
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define(['../module'], function(app) {
  class CSVRequest {
    /**
     * Constructor
     * @param {*} $requestService Service to make requests to our server
     */
    constructor($requestService) {
      this.httpReq = $requestService.httpReq
    }

    /**
     * Fetchs data from /api/csv route using the below parameters.
     * @param {string} path Wazuh API route
     * @param {number|string} id API ID
     * @param {*} filters Array of Wazuh API filters. Optional
     */
    async fetch(path, id, filters = null) {
      try {
        let filterStr = '{'
        if (filters && typeof filters === 'object' && filters.length > 0) {
          filters.map(
            filter => (filterStr += `"${filter.name}": "${filter.value}",`)
          )
          filterStr = filterStr.slice(0, -1)
          filterStr += '}'
        } else {
          filterStr = null
        }
        const payload = filterStr
          ? { endpoint: path, apiId: id, filters: filterStr }
          : { endpoint: path, apiId: id }
        const output = await this.httpReq('POST', '/api/csv', payload)
        if (output.data.error) {
          throw Error(output.data.error)
        }
        if (output && output.data && output.data.length) return output.data
        else return []
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  app.service('$csvRequestService', CSVRequest)
})
