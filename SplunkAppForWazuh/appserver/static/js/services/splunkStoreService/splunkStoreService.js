define(['../module', 'splunkjs/mvc'], function (module, mvc) {
  'use strict'
  module.service('$splunkStoreService', function () {
    const service = mvc.createService({ owner: "nobody" })

    /**
     * GET method
     * @param {String} url 
     */
    const get = (url) => {
      return new Promise((resolve, reject) => {
        service.request(url, "GET", null, null, null, { "Content-Type": "application/json" }, (err, data) => {
          if (err)
            return reject(err)
          resolve(data.data)
        })
      })
    }

    /**
     * POST method
     * @param {String} url 
     * @param {Object} record 
     */
    const post = (url, record) => {
      return new Promise((resolve, reject) => {
        service.request(url, "POST", null, null, JSON.stringify(record), { "Content-Type": "application/json" }, (err, data) => {
          if (err)
            return reject(err)
          return resolve(data)
        })
      })
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
      get: get,
      post: post,
      delete: deletes,
      update: update
    }
    return methods
  })
})