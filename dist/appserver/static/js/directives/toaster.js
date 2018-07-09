"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    var $ = require('jquery');
    var toastr = require("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js");

    /**
     * Toast class: encapsulates toastr library
     * @param {String} type 
     * @param {String} css 
     * @param {String} msg 
     */
    var customToastClass = function () {
        function Toaster(type, css, msg, timeOut, fadeOut, fadeIn) {
            _classCallCheck(this, Toaster);

            this.type = type;
            this.css = css;
            this.msg = msg;
            toastr.options.positionClass = this.css;
            toastr.options.extendedTimeOut = 0;
            toastr.options.timeOut = timeOut;
            toastr.options.fadeOut = fadeOut;
            toastr.options.fadeIn = fadeIn;
        }

        /**
         * Set time until toast disappears
         */


        _createClass(Toaster, [{
            key: "delayToast",
            value: function delayToast() {
                var _this = this;

                var delay = 10;
                window.setTimeout(function () {
                    _this.show();
                }, delay);
            }

            /**
             * Draws a custom toast
             */

        }, {
            key: "show",
            value: function show() {
                toastr[this.type](this.msg);
            }
        }]);

        return Toaster;
    }();
    return customToastClass;
});