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
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
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

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DistributedEnvironment; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function DistributedEnvironment(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Distributed Environment')
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M1420.89 898.973c52.74 51.37 79.11 114.04 79.11 188.013 0 72.603-25.514 134.59-76.54 185.96-51.028 51.37-112.844 77.054-185.446 77.054-19.178 0-38.014-2.055-56.507-6.164C1056.85 1447.946 913.014 1500 750 1500s-306.85-52.055-431.507-156.164c-17.808 4.11-36.3 6.164-55.48 6.164-72.602 0-134.588-25.685-185.958-77.055C25.685 1221.575 0 1159.59 0 1086.985c0-73.97 26.37-136.643 79.11-188.012C76.37 877.74 75 853.083 75 825c0-139.04 38.356-264.897 115.068-377.568C266.78 334.76 367.123 252.74 491.096 201.37c13.7-58.22 44.178-106.336 91.438-144.35C629.794 19.008 684.59 0 746.918 0c60.96 0 115.068 18.664 162.33 55.993 47.26 37.33 77.738 84.76 91.437 142.295 126.027 50.685 228.253 132.876 306.678 246.575C1385.788 558.563 1425 685.273 1425 825c0 28.082-1.37 52.74-4.11 73.973zM750 452.055c52.055 0 96.404-18.322 133.048-54.966 36.644-36.645 54.966-80.994 54.966-133.05 0-51.37-18.322-95.376-54.966-132.02C846.404 95.378 802.055 77.056 750 77.056c-52.055 0-96.233 18.322-132.534 54.966-36.302 36.644-54.452 80.65-54.452 132.02 0 52.056 18.15 96.405 54.452 133.05 36.3 36.643 80.48 54.965 132.534 54.965zm-249.658 746.918C575 1249.658 658.22 1275 750 1275c91.78 0 175-25.342 249.658-76.027-16.44-36.302-24.658-73.63-24.658-111.987 0-65.753 21.404-123.116 64.212-172.09 42.81-48.97 96.404-77.91 160.788-86.814V825c0-86.3-22.432-165.24-67.295-236.815-44.863-71.575-104.623-126.54-179.28-164.897-23.973 31.507-53.94 56.335-89.898 74.486C827.567 515.924 788.7 525 746.917 525c-41.095 0-79.45-8.733-115.068-26.2-35.617-17.464-65.754-41.608-90.412-72.43-73.287 38.356-131.85 93.15-175.685 164.383C321.918 661.986 300 740.068 300 825v3.082c64.384 8.904 117.98 37.843 160.788 86.815C503.596 963.87 525 1021.233 525 1086.987c0 38.355-8.22 75.684-24.658 111.986zM264.042 1275c52.054 0 96.403-18.322 133.047-54.966 36.643-36.644 54.965-80.993 54.965-133.048 0-51.37-18.322-95.376-54.966-132.02C360.444 918.322 316.095 900 264.04 900c-52.054 0-96.232 18.322-132.533 54.966-36.302 36.644-54.452 80.65-54.452 132.02 0 52.055 18.15 96.404 54.452 133.048 36.3 36.644 80.48 54.966 132.534 54.966zm972.944 0c52.055 0 96.404-18.322 133.048-54.966 36.644-36.644 54.966-80.993 54.966-133.048 0-51.37-18.322-95.376-54.966-132.02C1333.39 918.322 1289.04 900 1236.986 900c-52.054 0-96.233 18.322-132.534 54.966-36.3 36.644-54.452 80.65-54.452 132.02 0 52.055 18.15 96.404 54.452 133.048 36.3 36.644 80.48 54.966 132.534 54.966z"
  }));
}

/***/ })

/******/ });