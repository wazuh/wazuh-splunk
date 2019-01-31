define(['../module'], function(module) {
  'use strict'

  module.service('$currentDataService', function(
    $apiMgrService,
    $filterService,
    $navigationService,
    $apiIndexStorageService,
    $requestService
  ) {
    const getPollintState = () => {
      return $apiMgrService.getPollintState
    }

    const addApi = (record) => {
      return $apiMgrService.addApi(record)
    }

    const getBaseUrl = () => {
      return $requestService.getBaseUrl()
    }

    const getApi = () => {
      return $apiMgrService.getApi()
    }

    const getApiList = () => {
      return $apiMgrService.getApiList()
    }

    const checkRawConnection = api => {
      return $apiMgrService.checkRawConnection(api)
    }

    const checkSelectedApiConnection = () => {
      return $apiMgrService.checkSelectedApiConnection()
    }

    const checkApiConnection = id => {
      return $apiMgrService.checkApiConnection(id)
    }

    const remove = key => {
      return $apiMgrService.remove(key)
    }

    const insert = record => {
      return $apiMgrService.insert(record)
    }

    const chose = key => {
      return $apiMgrService.chose(key)
    }

    const getFilters = () => {
      return $filterService.getFilters()
    }

    const addFilter = filter => {
      return $filterService.addFilter(filter)
    }

    const getSerializedFilters = () => {
      return $filterService.getSerializedFilters()
    }

    const removeFilter = filter => {
      return $filterService.removeFilter(filter)
    }

    const cleanFilters = () => {
      return $filterService.cleanFilters()
    }

    const update = register => {
      return $apiMgrService.update(register)
    }
    const getClusterInfo = () => {
      return $apiMgrService.getClusterInfo()
    }
    const getFilter = () => {
      return $apiMgrService.getFilter()
    }

    const getIndex = () => {
      return $apiMgrService.getIndex()
    }

    const setIndex = index => {
      return $apiMgrService.setIndex(index)
    }

    const setApi = api => {
      return $apiMgrService.setApi(api)
    }

    const getExtensions = id => {
      return $apiIndexStorageService.getExtensions(id)
    }

    const setExtensions = (api, extensions) => {
      return $apiIndexStorageService.setExtensions(api, extensions)
    }

    const removeCurrentApi = () => {
      return $apiIndexStorageService.removeAPI()
    }

    const getCurrentAgent = () => {
      return $navigationService.getCurrentAgent()
    }

    const setCurrentAgent = id => {
      return $navigationService.setCurrentAgent(id)
    }

    /**
     * Gets extensions by ID
     * @param {String} id
     */
    const getExtensionsById = async id => {
      try {
        const currentExtensions = getExtensions(id)
        const result = {}
        if (currentExtensions) {
          Object.assign(result, currentExtensions)
        } else {
          const ext = await $requestService.httpReq(
            `GET`,
            `/manager/extensions`
          )
          Object.assign(result, ext.data)
        }
        return result
      } catch (err) {
        return Promise.reject(false)
      }
    }

    return {
      getPollintState: getPollintState,
      getBaseUrl: getBaseUrl,
      getApiList: getApiList,
      checkRawConnection: checkRawConnection,
      checkApiConnection: checkApiConnection,
      remove: remove,
      insert: insert,
      chose: chose,
      checkSelectedApiConnection: checkSelectedApiConnection,
      addFilter: addFilter,
      getSerializedFilters: getSerializedFilters,
      removeFilter: removeFilter,
      cleanFilters: cleanFilters,
      getFilters: getFilters,
      update: update,
      getIndex: getIndex,
      setIndex: setIndex,
      getClusterInfo: getClusterInfo,
      getFilter: getFilter,
      getApi: getApi,
      removeCurrentApi: removeCurrentApi,
      setApi: setApi,
      getCurrentAgent: getCurrentAgent,
      setCurrentAgent: setCurrentAgent,
      getExtensions: getExtensions,
      setExtensions: setExtensions,
      getExtensionsById: getExtensionsById,
      addApi: addApi
    }
  })
})
