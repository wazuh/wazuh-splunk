/*
 * Wazuh app - Toast class
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
    const toastr = require("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js")

    /**
     * Toast class: encapsulates toastr library
     * @param {String} type 
     * @param {String} css 
     * @param {String} msg 
     */
    const customToastClass = class Toaster {
        constructor(type, css, msg, timeOut, fadeOut, fadeIn) {
            this.type = type
            this.css = css
            this.msg = msg
            toastr.options.positionClass = this.css
            toastr.options.extendedTimeOut = 0
            toastr.options.timeOut = timeOut
            toastr.options.fadeOut = fadeOut
            toastr.options.fadeIn = fadeIn
        }

        /**
         * Set time until toast disappears
         */
        delayToast() {
            const delay = 10;
            window.setTimeout(() => { this.show() }, delay);
        }

        /**
         * Draws a custom toast
         */
        show() {
            toastr[this.type](this.msg)
        }

    }
    return customToastClass
})