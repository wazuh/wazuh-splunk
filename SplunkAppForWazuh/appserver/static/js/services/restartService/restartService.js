define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function ($requestService) {

    const restart = async () => {
      try {
        const clusterStatus = await $requestService.apiReq('/cluster/status')
        const instance = clusterStatus.data.data.enabled === 'yes' &&
          clusterStatus.data.data.running === 'yes' &&
          clusterStatus.data.data.running === 'yes' ? 'cluster' : 'manager'
        const checkConfig = await $requestService.apiReq(`/${instance}/configuration/validation`)
        if (checkConfig.data.data === 'Configuration is OK') {
          const result = await $requestService.apiReq(`/${instance}/restart`, {}, `PUT`)
          if (
            result &&
            result.data &&
            result.data.error === 0
          ) {
            return `Restart signal sended successfully to the ${instance}.`
          } else {
            throw new Error(`Cannot send restart signal to the ${instance}.`)
          }
        } else {
          throw new Error('Bad configuration, restart aborted.')
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const restartNode = async (node) => {
      try {
        const checkConfig = await $requestService.apiReq(`/${instance}/configuration/validation`)
        if (checkConfig.data.data === 'Configuration is OK') {
          const result = await $requestService.apiReq(`/cluster/${node}/restart`, {}, `PUT`)
          if (
            result &&
            result.data &&
            result.data.error === 0
          ) {
            return `Restart signal sended successfully to the node ${node}.`
          } else {
            throw new Error(`Cannot send restart signal to the node ${node}.`)
          }
        } else {
          throw new Error('Bad configuration, restart aborted.')
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      restart: restart,
      restartNode: restartNode
    }
  })
})
