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
     * @param {Object} payload 
     */
    const insert = async (payload) => {
      try {
        console.log('inserting this payload ',payload)
        const { data } = await $requestService.httpReq(`POST`, `manager/add_api`, true, $.param({
            payload
          }))
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
        console.log('deleting an api ',id)
        const { data } = await $requestService.httpReq(`PUT`, `manager/remove_api`, true, $.param({
          id
        }))
        if (data.error || data.status === 400)
          throw new Error(data.error)
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
    const update = async (newRegister) => {
      try {
        const { data } = await $requestService.httpReq(`PUT`, `manager/update_api`, true, newRegister)
        return data
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