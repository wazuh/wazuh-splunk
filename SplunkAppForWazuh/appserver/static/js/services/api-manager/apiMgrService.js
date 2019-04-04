define(['../module'], function(module) {
  'use strict'
  module.service('$apiMgrService', function(
    $requestService,
    $apiIndexStorageService,
    $splunkStoreService
  ) {
    // =========== CRUD METHODS =========== //

    /**
     * Gets an API by ID
     * @param {String} key
     */
    const select = async id => {
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
    const remove = async api => {
      try {
        await $splunkStoreService.delete(api._key)
        return
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Inserts a new record in the DB engine
     * @param {Object} record
     */
    const insert = async record => {
      try {
        const result = await $splunkStoreService.insert(record)
        return result
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Adds a new API entry with all fields
     * @param {Object} record
     */
    const addApi = async record => {
      try {
        // if the API is not connecting, then throw error
        const resultRawConnection = await checkRawConnection(record)
        record.managerName = resultRawConnection.data.managerName.name
        if (resultRawConnection.data.clusterMode.enabled === 'yes') {
          record.filterType = 'cluster.name'
          record.filterName = resultRawConnection.data.clusterName.cluster
        } else {
          record.filterType = 'manager.name'
          record.filterName = resultRawConnection.data.managerName.name
        }
        const key = await $splunkStoreService.insert(record)
        record['_key'] = key.result
        return record
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Updates an API
     * @param {Object} api
     */
    const update = register => {
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
        return apiList
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Sets an API
     * @param {Object} api
     */
    const setApi = api => {
      return $apiIndexStorageService.setApi(api)
    }

    /**
     * Returns currently selected API
     * @param {String} API
     */
    const getClusterInfo = () => {
      if (
        $apiIndexStorageService.getApi() &&
        $apiIndexStorageService.getApi().cluster
      ) {
        return getApi().cluster
      } else {
        return null
      }
    }

    /**
     * Returns the API filter (manager.name / cluster.name)
     */
    const getFilter = () => {
      if (
        $apiIndexStorageService.getApi() &&
        $apiIndexStorageService.getApi().filter
      ) {
        return $apiIndexStorageService.getApi().filter
      } else {
        return null
      }
    }

    /**
     * Sets index
     */
    const setIndex = index => {
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
    const chose = async id => {
      try {
        const apiList = await getApiList()
        const api = apiList.filter(api => api['_key'] === id)[0]
        if (api && typeof api === 'object') {
          $apiIndexStorageService.setApi(api)
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
        if (!currentApi) {
          throw new Error('No selected API in sessionStorage.')
        }
        const api = await checkApiConnection(currentApi['_key'])
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
        const getPollingStateRoute = '/manager/polling_state/'
        const pollingStatus = await $requestService.httpReq(
          `GET`,
          getPollingStateRoute
        )
        return pollingStatus.disabled === 'true' ? false : true
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Checks a connection passed directly
     * @param {Object} api
     */
    const checkRawConnection = async api => {
      try {
        if (
          api &&
          typeof api === 'object' &&
          api.url &&
          api.portapi &&
          api.userapi &&
          api.passapi
        ) {
          // Encode user and password, this prevent fails with special charsets
          const user = encodeURIComponent(api.userapi)
          const pass = encodeURIComponent(api.passapi)
          const clusterEnabled = api.filterType === 'cluster.name'
          const checkConnectionEndpoint = `/manager/check_connection?ip=${
            api.url
          }&port=${
            api.portapi
          }&user=${user}&pass=${pass}&cluster=${clusterEnabled}`
          const result = await $requestService.httpReq(
            'GET',
            checkConnectionEndpoint
          )
          if (result.data.status === 400 || result.data.error) {
            if (result.data.error === 3099) {
              throw new Error('ERROR3099 - Wazuh not ready yet.')
            } else {
              throw new Error('Unreachable API.')
            }
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
     * Checks if the API has to change its filters
     * @param {Object} api
     */
    const updateApiFilter = async api => {
      try {
        const results = await Promise.all([
          $requestService.apiReq(`/cluster/status`, {
            id: api['_key']
          }),
          $requestService.apiReq(`/agents/000`, {
            id: api['_key'],
            select: 'name'
          })
        ])

        const parsedResult = results.map(item =>
          item && item.data && item.data.data ? item.data.data : false
        )
        const [clusterData, managerName] = parsedResult

        if (managerName.name) {
          api.managerName = managerName.name
        }
        // If cluster is disabled, then filter by manager.name
        if (clusterData.enabled === 'yes') {
          api.filterType = 'cluster.name'
          const clusterName = await $requestService.apiReq(`/cluster/node`, {
            id: api['_key']
          })
          api.filterName = clusterName.data.data.cluster
        } else {
          api.filterType = 'manager.name'
          api.filterName = api.managerName
        }
        return api
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * Check if connection with API was successful, also returns the full needed information about it
     * @param {String} id
     */
    const checkApiConnection = async id => {
      try {
        const api = await select(id) //Before update cluster or not cluster
        await checkRawConnection(api)
        const apiSaved = { ...api } //eslint-disable-line
        const updatedApi = await updateApiFilter(api)
        let equal = true
        Object.keys(updatedApi).forEach(key => {
          if (updatedApi[key] !== apiSaved[key]) {
            equal = false
          }
        })
        if (!equal) {
          await $splunkStoreService.update(updatedApi)
        } else {
        }
        delete updatedApi['passapi']
        return updatedApi
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
      getClusterInfo: getClusterInfo,
      getFilter: getFilter,
      getIndex: getIndex,
      setIndex: setIndex,
      getApi: getApi,
      setApi: setApi,
      addApi: addApi
    }
  })
})
