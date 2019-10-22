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
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
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

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LabelRotation90; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function LabelRotation90(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Label Rotation 90'),
    viewBox: "0 0 796 1500"
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M262.207 982.178h10.254c90.333 0 161.622-18.433 213.868-55.298 52.246-36.865 78.37-89.234 78.37-157.105 0-67.87-25.39-118.896-76.173-153.076l.733-2.198H795.41v-93.018H9.52v80.567l72.51 8.79C27.345 646.484 0 699.95 0 771.24c0 66.895 23.315 118.775 69.946 155.64 46.63 36.865 110.718 55.298 192.26 55.298zm10.254-93.018h-10.253c-58.594 0-104.004-11.72-136.23-35.156-32.227-23.438-48.34-58.838-48.34-106.2 0-61.036 28.32-105.47 84.96-133.302H402.1c56.64 28.32 84.96 72.51 84.96 132.568 0 46.875-19.164 82.276-57.495 106.2-38.33 23.927-90.698 35.89-157.104 35.89zM74.708 1282.47c0-99.12 65.674-148.68 197.022-148.68h21.24c60.057 0 107.787 11.962 143.187 35.888 35.4 23.926 53.1 61.523 53.1 112.793 0 37.598-11.474 68.36-34.423 92.286-22.95 23.926-52.002 36.133-87.158 36.62V1500c57.617-.488 104.858-20.874 141.723-61.157 36.865-40.283 55.297-92.407 55.297-156.372 0-77.636-24.902-137.45-74.707-179.443-49.804-41.992-115.478-62.988-197.02-62.988h-21.24c-82.033 0-147.83 20.995-197.39 62.987C24.78 1145.02 0 1204.834 0 1282.47c0 59.083 17.822 109.986 53.467 152.71 35.644 42.725 78.37 64.332 128.174 64.82v-88.623c-30.76-.488-56.274-13.306-76.537-38.452-20.264-25.147-30.396-55.298-30.396-90.454zM9.52 352.296v95.947c30.763-9.277 67.384-13.916 109.865-13.916h262.94c58.593 0 103.637-18.432 135.13-55.298 31.495-36.865 47.242-87.28 47.242-151.245 0-62.5-15.99-114.136-47.973-154.907C484.74 32.104 447.02 11.72 403.564 11.72v93.016c24.415 0 44.8 10.987 61.158 32.96 16.357 21.972 24.536 50.292 24.536 84.96 0 37.598-9.278 66.65-27.832 87.158-18.555 20.508-44.434 30.762-77.637 30.762h-55.665V235.84c0-74.22-14.526-132.08-43.58-173.584C255.494 20.752 214.6 0 161.866 0 110.107 0 70.19 14.648 42.115 43.945 14.037 73.242 0 116.21 0 172.852c0 33.69 7.813 65.063 23.438 94.116 15.625 29.053 36.865 53.59 63.72 73.608-16.113.977-41.992 4.883-77.637 11.72zm70.314-165.527c0-30.762 6.958-54.078 20.874-69.947 13.916-15.868 33.57-23.802 58.96-23.802 29.297 0 53.955 12.695 73.975 38.086 20.02 25.39 30.03 59.326 30.03 101.806v107.666H163.33c-24.414-12.695-44.434-32.96-60.06-60.79-15.624-27.833-23.436-58.84-23.436-93.018z"
  }));
}

/***/ })

/******/ });