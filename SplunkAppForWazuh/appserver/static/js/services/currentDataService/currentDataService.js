define(['../module'], function (module) {
  'use strict'

  module.service('$currentDataService', function ($apiMgrService, $filterService, $navigationService) {


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

    const checkApiConnection = (key) => {
      return $apiMgrService.checkApiConnection(key)
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

    const getSerializedFilters = () => {
      return $filterService.getSerializedFilters()
    }

    const removeFilter = (filter) => {
      return $filterService.removeFilter(filter)
    }

    const cleanFilters = () => {
      return $filterService.cleanFilters()
    }

    const update = (key, register) => {
      return $apiMgrService.update(key, register)
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

    const setIndex = (index) => {
      return $apiMgrService.setIndex(index)
    }

    const setApi = (api) => {
      return $apiMgrService.setApi(api)
    }

    const getCurrentAgent = () => {
      return $navigationService.getCurrentAgent()
    }

    const setCurrentAgent = (id) => {
      return $navigationService.setCurrentAgent(id)
    }

    return {
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
      setApi: setApi,
      getCurrentAgent: getCurrentAgent,
      setCurrentAgent: setCurrentAgent
    }
  })
})