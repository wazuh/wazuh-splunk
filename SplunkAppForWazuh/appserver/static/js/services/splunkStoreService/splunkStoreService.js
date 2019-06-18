define(['../module'], function(module) {
  'use strict'
  module.service('$splunkStoreService', function($requestService) {
    /**
     * Obtains all APIs
     * @param {Object} id
     */
    const getAllApis = async () => {
      try {
        const result  = await $requestService.httpReq(
          `GET`,
          `/manager/get_apis`
        )
        const data = result.data
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Select an API by ID
     * @param {Object} id
     */
    const getApiById = async id => {
      try {
        const result = await $requestService.httpReq(
          `GET`,
          `/manager/get_api`,
          { apiId: id }
        )
        const data = result.data
        const parsed = JSON.parse(data)
        const parsedJson = JSON.parse(parsed)

        const parsedData = parsedJson.data
        return parsedData
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Inserts an entry
     * @param {Object} payload
     */
    const insert = async payload => {
      try {
        const result  = await $requestService.httpReq(
          `POST`,
          `manager/add_api`,
          payload
        )
        const data = result.data
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * DELETE method
     * @param {String} url
     */
    const deletes = async key => {
      try {
        const result  = await $requestService.httpReq(
          `DELETE`,
          `manager/remove_api`,
          { _key: key }
        )
        const data = result.data
        if (data.error || data.status === 400) throw new Error(data.error)
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Update a record
     * @param {String} key
     * @param {Object} newRegister: The API to update
     */
    const update = async newRegister => {
      try {
        const  result  = await $requestService.httpReq(
          `PUT`,
          `manager/update_api`,
          newRegister
        )
        const data = result.data
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    const methods = {
      getAllApis: getAllApis,
      getApiById: getApiById,
      insert: insert,
      delete: deletes,
      update: update
    }
    return methods
  })
})
