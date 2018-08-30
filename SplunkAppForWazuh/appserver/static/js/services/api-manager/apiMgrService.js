define(['../module'], function (module) {
  'use strict'
  module.service('$apiMgrService', function ($requestService, $apiIndexStorageService, $splunkStoreService) {

    // =========== CRUD METHODS =========== //

    /**
     * Gets an API by ID
     * @param {String} key 
     */
    const select = async (id) => {
      try {
        const entry = await $splunkStoreService.getApiById(id)
        return entry
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Deletes a record by ID
     * @param {Object} api: An API entry to delete 
     */
    const remove = async (api) => {
      try {
        if ($apiIndexStorageService.getApi() && $apiIndexStorageService.getApi().url === api.url) {
          $apiIndexStorageService.removeAPI()
        }
        await $splunkStoreService.delete({ 'id': api.id })
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Inserts a new record in the DB engine
     * @param {Object} record 
     */
    const insert = async (record) => {
      try {
        const result = await $splunkStoreService.insert(record)
        return result
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Updates an API
     * @param {Object} api 
     */
    const update = (register) => {
      return $splunkStoreService.update(register)
    }

    // =========== API METHODS =========== //

    /**
     * Gets the current selected API
     */
    const getApi = () => {
      return $apiIndexStorageService.getApi()
    }

    /**
     * Returns the API list
     * @returns {Array}
     */
    const getApiList = async () => {
      try {
        const apiList = await $splunkStoreService.getAllApis()
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
     * Sets an API
     * @param {Object} api 
     */
    const setApi = (api) => {
      return $apiIndexStorageService.setApi(api)
    }


    /**
     * Returns currently selected API
     * @param {String} API 
     */
    const getClusterInfo = () => {
      if ($apiIndexStorageService.getApi() && $apiIndexStorageService.getApi().cluster) {
        return getApi().cluster
      } else {
        return null
      }
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
     * Select an API as the default one, 'selected' field to true by ID
     * @param {String} id 
     */
    const chose = async (id) => {
      try {
        const apiList = await getApiList()
        for (const api of apiList) {
          if (api.id === id) {
            $apiIndexStorageService.setApi(api)
          }
        }
        return
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
        const api = await checkApiConnection(currentApi.id)
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
        const pollingStatus = await $requestService.httpReq(`GET`, getPollingState)
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
          const checkConnectionEndpoint = `/manager/check_connection?ip=${api.url}&port=${api.portapi}&user=${api.userapi}&pass=${api.passapi}`
          const result = await $requestService.httpReq('GET', checkConnectionEndpoint)
          if (result.data.status === 400 || result.data.error) {
            throw new Error('Cannot connect to API.')
          }
          return result
        }
        // Otherwise throw a new error
        throw new Error('Missing API fields.')
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Check if connection with API was successful, also returns the full needed information about it
     * @param {String} id 
     */
    const checkApiConnection = async (id) => {
      try {
        const api = await select(id)
        const clusterData = await $requestService.apiReq(`/cluster/status`, { id: id })
        if (clusterData.data.error) {
          throw new Error(clusterData.data.error)
        }
        // Get manager name. Necessary for both cases
        const managerName = await $requestService.apiReq(`/agents/000`, { id: id, select: 'name' })
        if (managerName && managerName.data && managerName.data.data && managerName.data.data.name) {
          api.managerName = managerName.data.data.name
        }
        // If cluster is disabled, then filter by manager.name
        if (clusterData.data.data.enabled === "yes") {
          api.filterType = 'cluster.name'
          const clusterName = await $requestService.apiReq(`/cluster/node`, { id: id })
          api.filterName = clusterName.data.data.cluster
        } else {
          api.filterType = 'manager.name'
          api.filterName = api.managerName
        }
        await $splunkStoreService.update(api)
        delete api['passapi']
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