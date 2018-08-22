define(['../module'], function (module) {
  'use strict'
  module.service('$apiMgrService', function ($requestService, $apiIndexStorageService, $splunkStoreService) {

    /**
     * Delete a record by ID
     * @param {String} key 
     */
    const remove = async (id) => {
      try {
        const api = await select(id)
        if ($apiIndexStorageService.getApi() && $apiIndexStorageService.getApi().url === api.url) {
          $apiIndexStorageService.removeAPI()
        }
        await $splunkStoreService.delete(`${id}`)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    const getApi = () => {
      return $apiIndexStorageService.getApi()
    }

    /**
     * Returns currently selected API
     * @param {String} API 
     */
    const getClusterInfo = () => {
      if ($apiIndexStorageService.getApi() && $apiIndexStorageService.getApi().cluster) {
        return getApi().cluster
      }
      else
        return null
    }

    /**
     * Returns the API filter (manager.name / cluster.name)
     */
    const getFilter = () => {
      if ($apiIndexStorageService.getApi() && $apiIndexStorageService.getApi().filter) {
        return $apiIndexStorageService.getApi().filter
      } else {
        return null
      }
    }

    /**
     * Sets index
     */
    const setIndex = (index) => {
      return $apiIndexStorageService.setIndex(index)
    }

    /**
     * Gets index
     */
    const getIndex = () => {
      return $apiIndexStorageService.getIndex()
    }

    /**
     * Select an API by ID
     * @param {String} key 
     */
    const select = async (key) => {
      try {
        return await $splunkStoreService.select(key)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Select an API as the default one, 'selected' field to true by ID
     * @param {String} key 
     */
    const chose = async (key) => {
      try {
        const apiList = await getApiList()
        for (let api of apiList) {
          if (api._key === key) {
            $apiIndexStorageService.setApi(api)
          }
        }
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Insert a new record in the KVstore DB
     * @param {Object} record 
     */
    const insert = async (record) => {
      try {
        console.log('sending this record to splunkstoreservice ',record)
        const result = await $splunkStoreService.insert(record)
        return result
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Returns the API list
     */
    const getApiList = async () => {
      try {
        const apiList = await $splunkStoreService.select()
        const selectedApi = $apiIndexStorageService.getApi()
        for (let i = 0; i < apiList.length; i++) {
          if (selectedApi && typeof selectedApi === 'string' && selectedApi !== 'undefined' && typeof JSON.parse(selectedApi) === 'object' && JSON.parse(selectedApi).url && apiList[i].url === JSON.parse(selectedApi).url) {
            apiList[i].selected = true
          }
        }
        return apiList
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with selected API was successful
     * @param {Object} apiList 
     */
    const checkSelectedApiConnection = async () => {
      try {
        const currentApi = $apiIndexStorageService.getApi()
        if (!currentApi) { return Promise.reject(new Error('No selected API in sessionStorage')) }
        const api = await checkApiConnection(currentApi._key)
        let selectedIndex = $apiIndexStorageService.getIndex()
        return { api, selectedIndex }
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
    * Check the current state of agents status history
    */
    const checkPollingState = async () => {
      try {
        const getPollingState = '/manager/polling_state/'
        const pollingStatus = await $requestService.httpReq(`GET`, getPollingState, false)
        return (pollingStatus.disabled === "true") ? false : true
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Checks a connection passed directly
     * @param {Object} api 
     */
    const checkRawConnection = async (api) => {
      try {
        if (api && typeof api === 'object' && api.url && api.portapi && api.userapi && api.passapi) {
          const checkConnectionEndpoint = '/manager/check_connection?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
          return await $requestService.httpReq('GET', checkConnectionEndpoint, true, false)
        } else {
          return Promise.reject(new Error('Incomplete object passed.'))
        }
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Updates an API
     * @param {Object} api 
     */
    const update = (key, register) => {
      return $splunkStoreService.update(key, register)
    }

    /**
     * Sets an API
     * @param {Object} api 
     */
    const setApi = (api) => {
      return $apiIndexStorageService.setApi(api)
    }

    /**
     * Check if connection with API was successful, also returns the whole needed information about it
     * @param {String} key 
     */
    const checkApiConnection = async (key) => {
      try {
        const api = await select(key)
        // delete api['passapi']
        const checkConnectionEndpoint = '/manager/check_connection?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
        const getClusterNameEndpoint = '/cluster/node?ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
        const getManagerNameEndpoint = '/agents/agent?id=000&ip=' + api.url + '&port=' + api.portapi + '&user=' + api.userapi + '&pass=' + api.passapi
        const clusterData = await $requestService.httpReq(`GET`, checkConnectionEndpoint, true)
        if (clusterData.data.error) {
          return Promise.reject(clusterData.data.error)
        }
        if (clusterData.data.token) {
          api.token = clusterData.data.token
        }
        api.filter = []
        // Get manager name. Necessary for both cases
        const managerName = await $requestService.httpReq(`GET`, getManagerNameEndpoint, true)
        if (managerName && managerName.data && managerName.data.data.length > 0 && managerName.data.data[0].name) {
          if (!api.managerName || api.managerName !== managerName.data.data[0].name) {
            api.managerName = managerName.data.data[0].name
            await $splunkStoreService.update(api._key, api)
          }
        }
        // If cluster is disabled, then filter by manager.name
        if (clusterData.data.data.enabled === "yes") {
          api.filter.push('cluster.name')
          const clusterName = await $requestService.httpReq(`GET`, getClusterNameEndpoint, true)
          api.filter.push(clusterName.data.cluster)
          if (!api.cluster || api.cluster !== clusterName.data.cluster) {
            api.cluster = clusterName.data.cluster
            await $splunkStoreService.update(api._key, api)
          }
        } else {
          if (api.cluster) {
            api.cluster = false
            await $splunkStoreService.update(api._key, api)
          }
          api.filter.push('manager.name')
          api.filter.push(api.managerName)
        }
        return api
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return {
      checkApiConnection: checkApiConnection,
      checkPollingState: checkPollingState,
      checkSelectedApiConnection: checkSelectedApiConnection,
      getApiList: getApiList,
      insert: insert,
      chose: chose,
      select: select,
      remove: remove,
      update: update,
      checkRawConnection: checkRawConnection,
      update: update,
      getClusterInfo: getClusterInfo,
      getFilter: getFilter,
      getIndex: getIndex,
      setIndex: setIndex,
      getApi: getApi,
      setApi: setApi
    }
  })
})