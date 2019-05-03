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

    const addApi = record => {
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

    const getSerializedFilters = hideOnlyShowFilters => {
      return $filterService.getSerializedFilters(hideOnlyShowFilters)
    }

    const removeFilter = filter => {
      return $filterService.removeFilter(filter)
    }

    const pinFilter = filter => {
      return $filterService.pinFilter(filter)
    }

    const cleanFilters = () => {
      return $filterService.cleanFilters()
    }

    const cleanAgentsPinedFilters = () => {
      return $filterService.cleanAgentsPinedFilters()
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

    /**
     * Gets admin extensions by ID
     * @param {String} id
     */
    const getAdminExtensions = async () => {
      try {
        const result = {}
        const ext = await $requestService.httpReq(
          `GET`,
          `/manager/admin_extensions`
        )
        Object.assign(result, ext.data)
        return result
      } catch (error) {
        return Promise.reject(false)
      }
    }

    /**
     * Checks if is admin
     */
    const isAdmin = async () => {
      try {
        const id = getApi().id
        const extensions = await getExtensionsById(id)
        return extensions['admin'] === 'true'
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * Checks if an extension is enabled
     */
    const extensionIsEnabled = async ext => {
      try {
        const extensions = await getCurrentExtensions()
        return extensions[ext] === 'true'
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /**
     * Get extension by for the current API id
     */
    const getCurrentExtensions = async () => {
      try {
        const id = getApi()['_key']
        return await getExtensionsById(id)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    /*
     * Gets reporting status
     */
    const getReportingStatus = async () => {
      try {
        const result = await getAdminExtensions()
        const status = result.reporting === 'true'
        return status
      } catch (error) {
        return true
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
      pinFilter: pinFilter,
      cleanFilters: cleanFilters,
      cleanAgentsPinedFilters: cleanAgentsPinedFilters,
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
      getAdminExtensions: getAdminExtensions,
      getCurrentExtensions: getCurrentExtensions,
      getExtensionsById: getExtensionsById,
      extensionIsEnabled: extensionIsEnabled,
      setExtensions: setExtensions,
      addApi: addApi,
      isAdmin: isAdmin,
      getReportingStatus: getReportingStatus
    }
  })
})
