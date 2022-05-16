define(['../module'], function (module) {
  'use strict'

  module.service(
    '$currentDataService',
    function (
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

      const checkRawConnection = (api) => {
        return $apiMgrService.checkRawConnection(api)
      }

      const checkSelectedApiConnection = () => {
        return $apiMgrService.checkSelectedApiConnection()
      }

      const checkApiConnection = (id) => {
        return $apiMgrService.checkApiConnection(id)
      }

      const remove = (key) => {
        return $apiMgrService.remove(key)
      }

      const insert = (record) => {
        return $apiMgrService.insert(record)
      }

      const chose = (key) => {
        return $apiMgrService.chose(key)
      }

      const getFilters = () => {
        return $filterService.getFilters()
      }

      const addFilter = (filter) => {
        return $filterService.addFilter(filter)
      }

      const getSerializedFilters = (hideOnlyShowFilters) => {
        return $filterService.getSerializedFilters(hideOnlyShowFilters)
      }

      const removeFilter = (filter) => {
        return $filterService.removeFilter(filter)
      }

      const pinFilter = (filter) => {
        return $filterService.pinFilter(filter)
      }

      const cleanFilters = () => {
        return $filterService.cleanFilters()
      }

      const cleanAgentsPinedFilters = () => {
        return $filterService.cleanAgentsPinedFilters()
      }

      const update = (register) => {
        return $apiMgrService.update(register)
      }
      const getFilter = () => {
        return $apiMgrService.getFilter()
      }

      const getIndex = () => {
        return $apiMgrService.getIndex()
      }

      const setIndex = (index) => {
        return $apiMgrService.setIndex(index)
      }

      const getSourceType = () => {
        return $apiMgrService.getSourceType()
      }

      const setSourceType = (sourceType) => {
        return $apiMgrService.setSourceType(sourceType)
      }

      const setApi = (api) => {
        return $apiMgrService.setApi(api)
      }

      const removeCurrentApi = () => {
        return $apiIndexStorageService.removeAPI()
      }

      const getCurrentAgent = () => {
        return $navigationService.getCurrentAgent()
      }

      const setCurrentAgent = (id) => {
        return $navigationService.setCurrentAgent(id)
      }

      /**
       * Gets extensions by ID
       * @param {String} id
       */
      const getExtensionsById = async (id) => {
        const result = {}
        try {
          let payload = {}
          let updateExtensionKey = false

          payload['_key'] = $apiIndexStorageService.getExtensionKey(id)
          if (!payload['_key']) {
            delete payload['_key']
            payload['api'] = id
            updateExtensionKey = true
          }

          const ext = await $requestService.httpReq(
            `POST`,
            `/manager/extensions`,
            payload
          )
          Object.assign(result, ext.data)

          if (updateExtensionKey) {
            $apiIndexStorageService.setExtensionKey(id, result['_key'])
          }
          return result
        } catch (err) {
          console.log(err)
          return Promise.reject(false)
        }
      }

      const setExtensionsById = async (id, extensions) => {
        const result = {}
        try {
          const ext = await $requestService.httpReq(
            `POST`,
            `/manager/save_extensions`,
            { extensions: JSON.stringify(extensions) }
          )
          Object.assign(result, ext.data)
          return result
        } catch (err) {
          console.log(err)
          return Promise.reject(false)
        }
      }

      const removeExtensionsById = async (id) => {
        const result = {}
        try {
          const key = $apiIndexStorageService.getExtensionKey(id)
          const response = await $requestService.httpReq(
            `POST`,
            `/manager/remove_extensions`,
            { _key: key }
          )
          Object.assign(result, response.data)
          $apiIndexStorageService.removeExtensionKey(id)
          return result
        } catch (err) {
          console.log(err)
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
       * Checks if an extension is enabled
       */
      const extensionIsEnabled = async (ext) => {
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

      /**
       * Get the current configuration
       */

      const getCurrentConfiguration = async () => {
        try {
          const conf = await $requestService.httpReq(
            `GET`,
            `/config/get_config`
          )
          return conf
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
        getFilter: getFilter,
        getApi: getApi,
        removeCurrentApi: removeCurrentApi,
        setApi: setApi,
        getCurrentAgent: getCurrentAgent,
        setCurrentAgent: setCurrentAgent,
        getAdminExtensions: getAdminExtensions,
        getCurrentExtensions: getCurrentExtensions,
        getCurrentConfiguration: getCurrentConfiguration,
        getExtensionsById: getExtensionsById,
        removeExtensionsById: removeExtensionsById,
        extensionIsEnabled: extensionIsEnabled,
        setExtensionsById: setExtensionsById,
        addApi: addApi,
        getReportingStatus: getReportingStatus,
        getSourceType: getSourceType,
        setSourceType: setSourceType,
      }
    }
  )
})
