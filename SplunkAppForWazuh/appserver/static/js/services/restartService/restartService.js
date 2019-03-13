define(['../module'], function (module) {
  'use strict'
  module.service('$restartService', function (
    $requestService,
    $notificationService
  ) {
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
        await checkConfig('/manager')
        const result = await $requestService.apiReq(
          '/manager/restart',
          {},
          'PUT'
        )
        if (result && result.data && !result.data.error) {
          return 'Restart signal sended successfully to the manager.'
        } else {
          throw 'Cannot send restart signal to the manager.'
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const restartCluster = async () => {
      try {
        await checkConfig('/cluster')
        setTimeout(() => {
          $requestService
            .apiReq('/cluster/restart', {}, 'PUT')
            .then(result => {
              if (result && result.data && result.data.error !== 0) {
                throw result.data.message || result.data.error || 'Cannot restart the cluster.'
              }
            })
            .catch(error => {
              $notificationService.showErrorToast(
                error || 'Cannot restart the cluster.'
              )
            })
        }, 15000)
        return 'Cluster restart in progress, it will take up to 15 seconds.'
      } catch (error) {
        throw new Error('Cannot restart the cluster.')
      }
    }

    const restartNode = async node => {
      try {
        const enabled = await clusterIsEnabled()
        if (enabled) {
          await checkConfig(`/cluster/${node}`)
          const result = await $requestService.apiReq(
            `/cluster/${node}/restart`,
            {},
            'PUT'
          )
          if (result && result.data && !result.data.error) {
            return `Restart signal sended successfully to the node ${node}.`
          } else {
            throw `Cannot send restart signal to the node ${node}.`
          }
        } else {
          await restartManager()
          return `Cluster disabled, cannot send the restart signal to ${node}, the manager is going to restart.`
        }
      } catch (error) {
        throw new Error(error || `Cannot restart the node ${node}`)
      }
    }

    const clusterIsEnabled = async () => {
      try {
        const response = await $requestService.apiReq('/cluster/status')
        const result = ((response || {}).data || {}).data || {}
        const status = result.enabled === 'yes' && result.running === 'yes'
        return status
      } catch (error) {
        return Promise.reject(error || 'Cannot send restart signal')
      }
    }

    const checkConfig = async (node) => {
      try {
        const check = await $requestService.apiReq(`${node}/configuration/validation`)
        if (
          check &&
          check.data &&
          !check.data.error
        ) {
          if (check.data.data.status === 'OK') {
            return 'OK'
          } else {
            if (Array.isArray(check.data.data.details)) {
              const msgErr = check.data.data.details.join()
              return Promise.reject(msgErr)
            } else {
              return Promise.reject('Bad configuration, restart aborted.')
            }
          }
        } else {
          return Promise.reject(check.data.message || 'Cannot check configuration.')
        }
      } catch (error) {
        return Promise.reject(error || 'Bad configuration, restart aborted.')
      }
    }

    return {
      restart: restart,
      restartNode: restartNode
    }
  })
})
