define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function ($requestService) {

    const restart = async () => {
      try {
        const clusterEnabled = await clusterIsEnabled()
        if (clusterEnabled) {
          return await restartCluster()
        } else {
          return await restartManager()
        }
      } catch (error) {
        throw error
      }
    }

    const restartManager = async () => {
      try {
        const checkConfig = await $requestService.apiReq(`/manager/configuration/validation`)
        if (checkConfig.data.data.status === 'OK') {
          const result = await $requestService.apiReq(`/manager/restart`, {}, `PUT`)
          if (
            result &&
            result.data &&
            result.data.error === 0
          ) {
            return `Restart signal sended successfully to the manager.`
          } else {
            throw new Error(`Cannot send restart signal to the manager.`)
          }
        } else {
          if (Array.isArray(checkConfig.data.data.details)) {
            const objErr = {}
            objErr['badConfig'] = true
            objErr['error'] = checkConfig.data.data.details
            throw objErr
          } else {
            throw new Error('Bad configuration, restart aborted.')
          }
        }
      } catch (error) {
        throw error
      }
    }

    const restartCluster = async () => {
      try {
        const checkConfig = await $requestService.apiReq(`/cluster/configuration/validation`)
        if (checkConfig.data.data.status === 'OK') {
          const result = await $requestService.apiReq(`/cluster/restart`, {}, `PUT`)
          if (
            result &&
            result.data &&
            result.data.error === 0
          ) {
            return `Restart signal sended successfully to the cluster.`
          } else {
            throw new Error(`Cannot send restart signal to the cluster.`)
          }
        } else {
          if (Array.isArray(checkConfig.data.data.details)) {
            const objErr = {}
            objErr['badConfig'] = true
            objErr['error'] = checkConfig.data.data.details
            throw objErr
          } else {
            throw new Error('Bad configuration, restart aborted.')
          }
        }
      } catch (error) {
        throw error
      }
    }

    const restartNode = async (node) => {
      try {
        const enabled = await clusterIsEnabled()
        if (enabled) {
          const checkConfig = await $requestService.apiReq(`/cluster/${node}/configuration/validation`)
          if (checkConfig.data.data.status === 'OK') {
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
            if (Array.isArray(checkConfig.data.data.details)) {
              const objErr = {}
              objErr['badConfig'] = true
              objErr['error'] = checkConfig.data.data.details
              throw objErr
            } else {
              throw new Error('Bad configuration, restart aborted.')
            }
          }
        } else {
          await restartManager()
          return `Cluster disabled, cannot send the restart signal to ${node}, the manager is going to restart.`
        }
      } catch (error) {
        throw error
      }
    }

    const clusterIsEnabled = async () => {
      const result = await $requestService.apiReq('/cluster/status')
      const status = result.data.data.enabled === 'yes' &&
        result.data.data.running === 'yes' &&
        result.data.data.running === 'yes' ? true : false
      return status
    }

    return {
      restart: restart,
      restartNode: restartNode
    }
  })
})
