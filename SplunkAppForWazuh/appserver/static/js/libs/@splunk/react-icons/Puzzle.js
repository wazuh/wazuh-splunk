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
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
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

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Puzzle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function Puzzle(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Puzzle'),
    viewBox: "0 0 1477 1477"
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M0 378l407-2c9.333 0 17.5-3 24.5-9s9.167-15.5 6.5-28.5-13-27.5-31-43.5c-30-26.667-50.667-49.5-62-68.5-11.333-19-17-42.5-17-70.5 0-10.667 3.333-23.5 10-38.5s17.333-31.833 32-50.5c14.667-18.667 37.667-34.5 69-47.5S507 0 549 0c34 0 64.667 4.167 92 12.5S689.667 31 705 43c15.333 12 28.167 25.5 38.5 40.5 10.333 15 17.167 28.5 20.5 40.5 3.333 12 5 22.667 5 32 0 26.667-5.667 50.667-17 72s-31.667 43.667-61 67c-11.333 8.667-19.667 17.333-25 26-5.333 8.667-7.833 16.167-7.5 22.5.333 6.333 2 12.167 5 17.5s7 9.167 12 11.5 10.167 3.5 15.5 3.5l406 1 2 408c-.667 9.333 2.333 18.5 9 27.5s16.667 12.167 30 9.5c13.333-2.667 27-15 41-37 39.333-52 83.667-78 133-78 14 0 29.667 3.833 47 11.5s35 19.5 53 35.5 33.167 39.167 45.5 69.5c12.333 30.333 18.833 64.833 19.5 103.5.667 39.333-4.833 74-16.5 104s-26.5 53-44.5 69-36 27.833-54 35.5c-18 7.667-34.667 11.5-50 11.5-46.667 0-92-28.333-136-85-8.667-12-17.333-20.5-26-25.5-8.667-5-15.833-6.833-21.5-5.5-5.667 1.333-10.833 4.167-15.5 8.5s-8.167 9.167-10.5 14.5-3.5 10.333-3.5 15v408H702l-10-1h-12l-11-2.5c-7.333-1.667-11.167-3.667-11.5-6-.333-2.333-2.5-5.667-6.5-10s-5-9.5-3-15.5c0-10.667 6.333-22.667 19-36 12.667-13.333 26.5-25.667 41.5-37 15-11.333 28.833-27 41.5-47 12.667-20 19-41.667 19-65 0-49.333-21.833-88.333-65.5-117s-95.167-43-154.5-43c-57.333 0-108.5 15.5-153.5 46.5S328 1212.333 328 1257c0 20.667 6.333 40.667 19 60s26.5 35.167 41.5 47.5c15 12.333 28.833 25.5 41.5 39.5 12.667 14 19 26.667 19 38 0 11.333-2.833 19.833-8.5 25.5-5.667 5.667-11.167 8.5-16.5 8.5l-8 1-416-1V378z"
  }));
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/SVGInternal");

/***/ })

/******/ });