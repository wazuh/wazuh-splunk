"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toClassName = toClassName;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable import/prefer-default-export */
// This file was adapted from [JedWatson's classnames](https://github.com/JedWatson/classnames),
// which is MIT-licensed:
//
// The MIT License (MIT)
//
// Copyright (c) 2018 Jed Watson
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// End of MIT license text.

/**
 * A simple utility for conditionally joining class names together for React components. It will
 * extract all of the strings from the provided arguments and join them together with spaces. If an
 * object is passed, the keys with truthy values will be used. Arguments like `false`, `null`, and
 * `undefined` will be ignored. Adapted from
 * [JedWatson's classnames](https://github.com/JedWatson/classnames).
 * @param {...Any}
 * @returns {String} className suitable for a React component.
 * @public
 */
function toClassName() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (accum, arg) {
    if (!arg) {
      return accum;
    }

    var argType = _typeof(arg);

    if (argType === 'string') {
      accum.push(arg);
    } else if (Array.isArray(arg)) {
      accum.push(toClassName.apply(void 0, _toConsumableArray(arg)));
    } else if (argType === 'object') {
      return accum.concat(Object.keys(arg).filter(function (key) {
        return arg[key];
      }));
    }

    return accum;
  }, []).join(' ');
}