/*
 * Wazuh app - promisedRequest file
 * Copyright (C) 2018 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(function (require, exports, module) {
  const $ = require('jquery')

  /**
   * Promisified GET request
   * @param {String} url 
   */
  const promisedGet = (url) => {
    return new Promise((resolve, reject) => {
      $.get(url, data => {
        return resolve(JSON.parse(data))
      }).fail((err) => { return reject(err) })
    })
  }

  /**
   * Promisified POST request
   * @param {String} url 
   * @param {Object} payload 
   */
  const promisedPost = (url, payload) => {
    return new Promise((resolve, reject) => {
      $.post(url, payload, data => {
        return resolve(JSON.parse(data))
      }).fail((err) => { return reject(err) })
    })
  }

  /**
   * Load HTTP content asynchronously
   * @param {String} url 
   * Returns Promise
   */
  const promisedLoad = ($element, url) => {
    return new Promise((resolve, reject) => {
      $element.load(url, (data, status, xhr) => {
        if (status === 'error')
          reject(status)
        resolve(data)
      })
    })
  }
  return { promisedGet, promisedPost, promisedLoad }
})