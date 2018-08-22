define(['../module'], function (module) {
  'use strict'
  module.service('$splunkStoreService', function ($requestService) {

    /**
     * Select an API by ID
     * @param {Object} id 
     */
    const select = async (id) => {
      try {
        const result = await $requestService.httpReq(`GET`, `/manager/get_apis`, true)
        return result.data
      } catch (err) {
        console.error('error in select ',err)
        return Promise.reject(err)
      }
    }

    /**
     * 
     * @param {Object} record 
     */
    const insert = async (record) => {
      try {
        return await $requestService.httpReq(`POST`, `/manager/db`, false, record)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    /**
     * DELETE method
     * @param {String} url 
     */
    const deletes = (url) => {
      if (!url || url === '') {
        url = "storage/collections/data/credentials/"
      }
      return new Promise((resolve, reject) => {
        service.del(url, {}, (err, data) => {
          if (err) {
            return reject(err)
          }
          return resolve(data)
        })
      })
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