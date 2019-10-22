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
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
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

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LabelRotation45; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function LabelRotation45(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Label Rotation 45'),
    viewBox: "0 0 1500 1474"
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M932.572 939.82l8.34-8.342c73.402-72.846 116.08-144.718 128.036-215.616 11.956-70.9-9.314-134.43-63.81-190.593-54.494-54.496-115.94-75.07-184.336-61.725l-.834-2.502 246.06-246.895-75.07-75.07-632.25 633.086 64.226 65.06 65.895-51.715c-15.015 73.4 6.115 138.74 63.39 196.014 55.05 53.382 115.94 76.18 182.67 68.396 66.728-7.785 132.622-44.485 197.682-110.1zm-66.728-83.412l-7.507 8.34c-47.266 47.267-92.725 74.375-136.376 81.326-43.65 6.95-85.773-8.48-126.366-46.292-48.934-48.935-62.002-107.6-39.203-175.996l192.68-192.68c69.508-22.797 127.895-10.008 175.16 38.37 25.58 25.023 39.76 53.522 42.54 85.496 2.78 31.974-4.448 64.782-21.686 98.424-17.24 33.642-43.652 67.98-79.24 103.012zm157.645 476.274c-79.52-80.074-66.45-172.938 39.202-278.59l16.682-16.683c106.21-105.098 198.795-117.888 277.757-38.37 30.03 30.028 45.6 64.087 46.71 102.178 1.113 38.09-12.232 71.316-40.036 99.675l70.9 70.9c46.153-46.155 67.84-100.51 65.06-163.068-2.78-62.558-30.03-119.416-81.743-170.575-41.704-41.705-86.885-67.98-135.54-78.823-48.657-10.843-96.48-7.228-143.467 10.844-46.988 18.073-91.89 48.518-134.708 91.335L986.79 979.02c-42.82 42.82-73.263 87.72-91.336 134.71-18.072 46.987-21.686 94.81-10.843 143.465 10.844 48.656 37.12 93.837 78.824 135.542 47.822 47.822 103.29 74.514 166.404 80.074 63.114 5.562 114.967-11.398 155.56-50.88l-71.733-71.732c-26.135 24.467-57.275 34.754-93.42 30.862-36.144-3.893-68.396-20.02-96.756-48.378zM221.914 636.205l77.572 77.57c18.906-35.03 44.763-68.395 77.572-100.09L588.086 401.82c47.266-48.933 68.814-100.37 64.643-154.308-4.17-53.94-32.113-106.765-83.827-158.48-33.365-33.92-69.648-58.248-108.85-72.984C420.848 1.312 384.286-3.275 350.366 2.285c-33.92 5.56-62.28 19.74-85.078 42.54l75.068 74.235c18.906-19.463 43.93-26.83 75.07-22.104 31.14 4.727 60.61 20.992 88.414 48.795 30.584 30.03 46.57 60.89 47.96 92.587 1.392 31.696-11.26 60.61-37.95 86.747l-44.208 45.04-85.08-84.243c-59.498-60.055-117.468-95.087-173.91-105.096-56.44-10.01-106.348 6.394-149.72 49.212-41.706 41.15-62.003 84.94-60.89 131.37 1.11 46.433 24.466 92.448 70.064 138.045 54.495 54.496 122.89 76.183 205.19 65.062-12.79 13.9-30.584 37.812-53.383 71.733zM145.177 446.03c-50.046-50.048-53.66-96.48-10.843-139.297 22.243-24.467 51.993-34.337 89.25-29.61 37.256 4.726 72.844 24.05 106.765 57.97l86.746 86.747-80.91 80.908c-29.47 9.453-61.722 9.314-96.755-.417-35.03-9.73-66.45-28.498-94.253-56.3z"
  }));
}

/***/ })

/******/ });