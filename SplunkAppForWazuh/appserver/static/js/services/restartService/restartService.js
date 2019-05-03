define(['../module'], function(module) {
  'use strict'
  module.service('$restartService', function($requestService) {
    const restart = async () => {
      try {
        const clusterEnabled = await clusterIsEnabled()
        if (clusterEnabled) {
          return await restartCluster()
        } else {
          return await restartManager()
        }
      } catch (error) {
        return Promise.reject(error)
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
          return 'Restarting manager.'
        } else {
          throw 'Cannot send restart signal to the manager.'
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const restartCluster = async () => {
      try {
        await checkConfig('/cluster')
        const result = await $requestService.apiReq(
          '/cluster/restart',
          { delay: 15 },
          'PUT'
        )
        if (result && result.data && result.data.error !== 0) {
          throw result.data.message ||
            result.data.error ||
            'Cannot restart the cluster.'
        }
        return 'Restarting cluster, it will take up to 30 seconds.'
      } catch (error) {
        return Promise.reject('Cannot restart the cluster.: ' + error)
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
            return `Restarting node ${node}, please wait.`
          } else {
            throw `Cannot send restart signal to the node: ${node}.`
          }
        } else {
          await restartManager()
          return `Restarting manager because cluster is disabled and cannot send the restart signal to ${node}.`
        }
      } catch (error) {
        return Promise.reject(error || `Cannot restart the node: ${node}`)
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

    const checkConfig = async node => {
      try {
        const check = await $requestService.apiReq(
          `${node}/configuration/validation`
        )
        if (check && check.data && !check.data.error) {
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
          return Promise.reject(
            check.data.message || 'Cannot check configuration.'
          )
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
