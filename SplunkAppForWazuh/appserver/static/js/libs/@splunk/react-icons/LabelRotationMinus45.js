module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/SVGInternal");

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LabelRotationMinus45; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function LabelRotationMinus45(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Label Rotation Minus 45'),
    viewBox: "0 0 1474 1500"
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M939.82 567.428l-8.342-8.34c-72.846-73.402-144.718-116.08-215.616-128.036-70.9-11.956-134.43 9.314-190.593 63.81-54.496 54.494-75.07 115.94-61.725 184.336l-2.502.834-246.895-246.06-75.07 75.07 633.086 632.25 65.06-64.226-51.715-65.895c73.4 15.015 138.74-6.115 196.014-63.39 53.382-55.05 76.18-115.94 68.396-182.67-7.785-66.728-44.485-132.622-110.1-197.682zm-83.412 66.728l8.34 7.507c98.982 98.98 110.66 186.562 35.034 262.743-48.935 48.934-107.6 62.002-175.996 39.203l-192.68-192.68c-22.797-69.508-10.008-127.895 38.37-175.16 25.023-25.58 53.522-39.76 85.496-42.54 31.974-2.78 64.782 4.448 98.424 21.686 33.642 17.24 67.98 43.652 103.012 79.24zm476.274-157.645c-80.074 79.52-172.938 66.45-278.59-39.202l-16.683-16.682C932.31 314.416 919.52 221.83 999.04 142.87c30.028-30.03 64.087-45.6 102.178-46.71 38.09-1.113 71.316 12.232 99.675 40.036l70.9-70.9c-46.155-46.153-100.51-67.84-163.068-65.06-62.558 2.78-119.416 30.03-170.575 81.743-41.705 41.704-67.98 86.885-78.823 135.54-10.843 48.657-7.228 96.48 10.844 143.467 18.073 46.988 48.518 91.89 91.335 134.708l17.516 17.516c42.82 42.82 87.72 73.263 134.71 91.336 46.987 18.072 94.81 21.686 143.465 10.843 48.656-10.844 93.837-37.12 135.542-78.824 47.822-47.822 74.514-103.29 80.074-166.404 5.562-63.114-11.398-114.967-50.88-155.56l-71.732 71.733c24.467 26.135 34.754 57.275 30.862 93.42-3.893 36.144-20.02 68.396-48.378 96.756zm-696.477 801.575l77.57-77.572c-35.03-18.906-68.395-44.763-100.09-77.572L401.82 911.914c-48.933-47.266-100.37-68.814-154.308-64.643-53.94 4.17-106.765 32.113-158.48 83.827-33.92 33.365-58.248 69.648-72.984 108.85-14.736 39.204-19.323 75.766-13.763 109.686 5.56 33.92 19.74 62.28 42.54 85.078l74.235-75.068c-19.463-18.906-26.83-43.93-22.104-75.07 4.727-31.14 20.992-60.61 48.795-88.414 30.03-30.584 60.89-46.57 92.587-47.96 31.696-1.392 60.61 11.26 86.747 37.95l45.04 44.208-84.243 85.08c-60.055 59.498-95.087 117.468-105.096 173.91-10.01 56.44 6.394 106.348 49.212 149.72 41.15 41.706 84.94 62.003 131.37 60.89 46.433-1.11 92.448-24.466 138.045-70.064 54.496-54.495 76.183-122.89 65.062-205.19 13.9 12.79 37.812 30.584 71.733 53.383zm-190.176 76.738c-50.048 50.046-96.48 53.66-139.297 10.843-24.467-22.243-34.337-51.993-29.61-89.25 4.726-37.256 24.05-72.844 57.97-106.765l86.747-86.746 80.908 80.91c9.453 29.47 9.314 61.722-.417 96.755-9.73 35.03-28.498 66.45-56.3 94.253z"
  }));
}

/***/ })

/******/ });