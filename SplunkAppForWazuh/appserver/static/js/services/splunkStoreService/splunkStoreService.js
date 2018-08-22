define(['../module'], function (module) {
  'use strict'
  module.service('$splunkStoreService', function ($requestService) {

    /**
     * Select an API by ID
     * @param {Object} id 
     */
    const select = async (id) => {
      try {
        const { data } = await $requestService.httpReq(`GET`, `/manager/get_apis`, true)
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * 
     * @param {Object} record 
     */
    const insert = async (record) => {
      try {
        console.log('inserting this record ',record)
        const { data } = await $requestService.httpReq(`POST`, `manager/add_api`, true, record)
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * DELETE method
     * @param {String} url 
     */
    const deletes = async (id) => {
      try {
        const { data } = await $requestService.httpReq(`DELETE`, `manager/remove_api`, true, {id:id})
        return data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * Update a record
     * @param {String} key 
     * @param {Object} newRegister 
     */
    const update = async (key, newRegister) => {
      try {
        const result = await post("storage/collections/data/credentials/" + key, newRegister)
        return result
      } catch (err) {
        return Promise.reject(err)
      }
    }

    const methods = {
      select: select,
      insert: insert,
      delete: deletes,
      update: update
    }
    return methods
  })
})