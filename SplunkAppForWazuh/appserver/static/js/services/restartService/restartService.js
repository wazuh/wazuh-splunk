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
        const checkConfig = await $requestService.apiReq('/manager/configuration/validation')
        if (checkConfig.data.data.status === 'OK') {
          const result = await $requestService.apiReq('/manager/restart', {}, 'PUT')
          if (
            result &&
            result.data &&
            !result.data.error
          ) {
            return 'Restart signal sended successfully to the manager.'
          } else {
            throw new Error('Cannot send restart signal to the manager.')
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
        const checkConfig = await $requestService.apiReq('/cluster/configuration/validation')
        if (checkConfig.data.data.status === 'OK') {
          setTimeout(() => {
            $requestService.apiReq('/cluster/restart', {}, 'PUT')
              .then((result) => {
                if (
                  result &&
                  result.data &&
                  result.data.error !== 0
                ) {
                  throw new Error(result.data.message || result.data.error || 'Cannot restart the cluster.')
                }
              })
              .catch((error) => {
                $notificationService.showErrorToast(error || 'Cannot restart the cluster.')
              })
          }, 15000)
          return 'Cluster restart in progress, it will take up to 15 seconds.'
        } else {
          if (Array.isArray(checkConfig.data.data.details)) {
            const msgErr = checkConfig.data.data.details.join()
            throw msgErr
          } else {
            throw new Error('Bad configuration, restart aborted.')
          }
        }
      } catch (error) {
        throw new Error('Cannot restart the cluster.')
      }
    }

    const restartNode = async (node) => {
      try {
        const enabled = await clusterIsEnabled()
        if (enabled) {
          const checkConfig = await $requestService.apiReq(`/cluster/${node}/configuration/validation`)
          if (checkConfig.data.data.status === 'OK') {
            const result = await $requestService.apiReq(`/cluster/${node}/restart`, {}, 'PUT')
            if (
              result &&
              result.data &&
              !result.data.error
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
      try {
        const response = await $requestService.apiReq('/cluster/status')
        const result = ((response || {}).data || {}).data || {}
        const status = result.enabled === 'yes' && result.running === 'yes'
        return status
      } catch (error) {
        throw new Error('Cannot send restart signal')
      }

    }

    return {
      restart: restart,
      restartNode: restartNode
    }
  })
})
