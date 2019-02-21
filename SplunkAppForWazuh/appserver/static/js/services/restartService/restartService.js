define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function ($requestService, $notificationService) {

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
            const msgErr = checkConfig.data.data.details.join()
            throw msgErr
          } else {
            throw new Error('Bad configuration, restart aborted.')
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const restartCluster = async () => {
      try {
        const checkConfig = await $requestService.apiReq(`/cluster/configuration/validation`)
        if (checkConfig.data.data.status === 'OK') {
          setTimeout(() => {
            $requestService.apiReq(`/cluster/restart`, {}, `PUT`).then((result) => {
              if (
                result &&
                result.data &&
                result.data.error === 0
              ) {
                $notificationService.showSimpleToast("Cluster received restart signal suscessfully.")
                return `Cluster received restart signal suscessfully.`
              } else {
                throw new Error(`Cannot send restart signal to the cluster.`)
              }
            })
          }, 15000)
          return "Cluster restart in progress, it will take up to 15 seconds."
        } else {
          if (Array.isArray(checkConfig.data.data.details)) {
            const msgErr = checkConfig.data.data.details.join()
            throw msgErr
          } else {
            throw new Error('Bad configuration, restart aborted.')
          }
        }
      } catch (error) {
        throw new Error(error)
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
              const msgErr = checkConfig.data.data.details.join()
              throw msgErr
            } else {
              throw new Error('Bad configuration, restart aborted.')
            }
          }
        } else {
          await restartManager()
          return `Cluster disabled, cannot send the restart signal to ${node}, the manager is going to restart.`
        }
      } catch (error) {
        throw new Error(error)
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
