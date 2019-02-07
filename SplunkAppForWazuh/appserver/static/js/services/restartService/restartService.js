define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function ($requestService) {

    const restartManager = async () => {
      try {
        console.log("url restart ", url)
        const result = await $requestService.apiReq('/manager/restart', {}, `PUT`)
        if (
          result &&
          result.data &&
          result.data.error === 0
        ) {
          return 'Restart signal sended successfully to the cluster manager.'
        } else {
          throw new Error('Cannot send restart signal to the cluster manager.')
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const restartCluster = async () => {
      try {
        console.log("url restart ", url)
        const result = await $requestService.apiReq('/cluster/restart', {}, `PUT`)
        if (
          result &&
          result.data &&
          result.data.error === 0
        ) {
          return 'Restart signal sended successfully to the cluster nodes.'
        } else {
          throw new Error('Cannot send restart signal to the cluster nodes.')
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const restartNode = async (node) => {
      try {
        console.log("url restart ", url)
        const result = await $requestService.apiReq(`/cluster/${node}/restart`, {}, `PUT`)
        if (
          result &&
          result.data &&
          result.data.error === 0
        ) {
          return 'Restart signal sended successfully to the node ${node}.'
        } else {
          throw new Error(`Cannot send restart signal to the node ${node}.`)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    return {
      restartManager: restartManager,
      restartCluster: restartCluster,
      restartNode: restartNode
    }
  })
})
