define(['../module'], function (module) {
  'use strict'

  module.service('$apiReq', function ($q, $apiService) {
    return {
      request: async (method, path, body) => {
        try {

          if (!method || !path || !body) {
            throw new Error('Missing parameters')
          }

          if (!currentApiIndexService.getCurrentAPI()) {
            throw new Error('No API selected.')
          }

          let data = ''
          if (method === 'get')
            data = await $apiService.get(path)
          else
            data = await $apiService.post(path)
          if (data.error) {
            throw new Error(data.error)
          }

          return $q.resolve(data)

        } catch (error) {
          return error && error.data && error.data.message ?
            $q.reject(error.data.message) :
            $q.reject(error.message || error)
        }
      }
    }
  })
})