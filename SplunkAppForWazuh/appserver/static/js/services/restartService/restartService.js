define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function ($requestService) {

    const restart = async () => {
      try {
        const clusterStatus = await $requestService.apiReq('/cluster/status')
        const instance = clusterStatus.data.data.enabled === 'yes' &&
          clusterStatus.data.data.running === 'yes' &&
          clusterStatus.data.data.running === 'yes' ? 'cluster' : 'manager'
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
      } catch (error) {

      }
    }

    const restartNode = async (node) => {
      try {
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
