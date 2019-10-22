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
/******/ 	return __webpack_require__(__webpack_require__.s = 128);
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

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RefreshLight; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function RefreshLight(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Refresh'),
    viewBox: "0 0 20 20"
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
    transform: "translate(7.1876 7.7733) scale(1 -1) rotate(9) translate(-8 -8)"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "m4.0374 1.9649c0.15281-0.23001 0.46315-0.29258 0.69316-0.13977 0.23001 0.15281 0.29258 0.46315 0.13977 0.69316-1.219 1.8348-1.3159 4.2157-0.19485 6.1575 1.6129 2.7936 5.1851 3.7508 7.9788 2.1379 0.23915-0.13807 0.54494-0.056134 0.68301 0.18301s0.056134 0.54494-0.18301 0.68301c-3.2719 1.8891-7.4558 0.76801-9.3448-2.5039-1.3128-2.2739-1.1993-5.0627 0.22795-7.2109z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
    transform: "translate(13.087 11.032) rotate(-30) translate(-1.5 -2.5)",
    stroke: "currentColor"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "m2.1391 2.5532l-1.7021 1.8572 1.7021-1.8572z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "m2.1391 2.5532l-1.7021-1.8572 1.7021 1.8572z"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    transform: "translate(12.975 11.726) scale(-1 1) rotate(-21) translate(-12.975 -11.726)",
    d: "m12.849 5.3391c0.24186-0.13325 0.54596-0.045206 0.67921 0.19666 0.13325 0.24186 0.045206 0.54596-0.19666 0.67921-1.8521 1.0204-3.0268 2.9665-3.0268 5.1196 0 3.2258 2.6151 5.8409 5.8409 5.8409 0.27614 0 0.5 0.22386 0.5 0.5 0 0.27614-0.22386 0.5-0.5 0.5-3.7781 0-6.8409-3.0628-6.8409-6.8409 0-2.5212 1.376-4.8009 3.5442-5.9955z"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
    transform: "translate(7.6692 15.961) scale(-1 1) rotate(-21) translate(-1.5 -2.5)",
    stroke: "currentColor"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    transform: "translate(1.288 3.4818) rotate(-90) translate(-1.288 -3.4818)",
    d: "m2.2166 4.3329l-1.8572-1.7021"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    transform: "translate(1.288 1.6246) rotate(-90) translate(-1.288 -1.6246)",
    d: "m0.35946 2.4757l1.8572-1.7021-1.8572 1.7021z"
  })));
}

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/SVGInternal");

/***/ })

/******/ });