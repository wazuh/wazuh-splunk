define(['../module'], function (module) {
  'use strict'
  module.service('$splunkStoreService', function ($requestService) {
    /**
     * Obtains all APIs
     * @param {Object} id
     */
    const getAllApis = async () => {
      try {
        const { data } = await $requestService.httpReq(
          `GET`,
          `/manager/get_apis`
        )
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Select an API by ID
     * @param {Object} id
     */
    const getApiById = async (id) => {
      try {
        const { data } = await $requestService.httpReq(
          `GET`,
          `/manager/get_api`,
          { apiId: id }
        )
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
    const insert = async (payload) => {
      try {
        const { data } = await $requestService.httpReq(
          `POST`,
          `manager/add_api`,
          payload
        )
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * DELETE method
     * @param {String} url
     */
    const deletes = async (key) => {
      try {
        const { data } = await $requestService.httpReq(
          `DELETE`,
          `manager/remove_api`,
          { _key: key }
        )
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
    const update = async (newRegister) => {
      try {
        const { data } = await $requestService.httpReq(
          `PUT`,
          `manager/update_api`,
          newRegister
        )
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
      update: update,
    }
    return methods
  })
})
