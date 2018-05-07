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
    const promisedRequest = (verb, url) => {
        return new Promise((resolve, reject) => {
            $.ajax({ 'method': verb, 'url': url }, data => {
                resolve(JSON.parse(data))
            }).fail((err) => { reject(err) })
        })
    }
    return promisedRequest
})