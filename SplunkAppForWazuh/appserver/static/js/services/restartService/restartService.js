define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function ($requestService) {

    const restartManager = async (url) => {
      try {
        console.log("url restart ", url)
        const result = await $requestService.apiReq(url, {}, `PUT`)
        if (
          result &&
          result.data &&
          result.data.error === 0
        ) {
          return 'Restart signal sended successfully.'
        } else {
          throw new Error('Cannot send restart signal.')
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      restartManager: restartManager
    }
  })
})
