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
/******/ 	return __webpack_require__(__webpack_require__.s = 90);
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

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LabelRotation0; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* eslint-disable max-len */

function LabelRotation0(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_icons_SVGInternal__WEBPACK_IMPORTED_MODULE_2___default.a, _extends({
    screenReaderText: Object(_splunk_ui_utils_i18n__WEBPACK_IMPORTED_MODULE_1__["_"])('Label Rotation 0'),
    viewBox: "0 0 1500 796"
  }, props), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    d: "M982.178 533.203V522.95c0-90.333-18.433-161.622-55.298-213.868-36.865-52.246-89.234-78.37-157.105-78.37-67.87 0-118.896 25.392-153.076 76.173l-2.198-.733V0h-93.018v785.89h80.567l8.79-72.51c35.644 54.686 89.11 82.03 160.4 82.03 66.895 0 118.775-23.315 155.64-69.946 36.865-46.63 55.298-110.718 55.298-192.26zM889.16 522.95v10.253c0 58.594-11.72 104.004-35.156 136.23-23.438 32.227-58.838 48.34-106.2 48.34-61.036 0-105.47-28.32-133.302-84.96V393.31c28.32-56.64 72.51-84.96 132.568-84.96 46.875 0 82.276 19.165 106.2 57.495 23.927 38.33 35.89 90.698 35.89 157.104zm393.31 197.753c-99.12 0-148.68-65.674-148.68-197.02V502.44c0-60.057 11.962-107.787 35.888-143.187 23.926-35.4 61.523-53.1 112.793-53.1 37.598 0 68.36 11.474 92.286 34.423 23.926 22.95 36.133 52.002 36.62 87.158H1500c-.488-57.617-20.874-104.858-61.157-141.723-40.283-36.864-92.407-55.297-156.372-55.297-77.636 0-137.45 24.902-179.443 74.707-41.992 49.805-62.988 115.478-62.988 197.02v21.242c0 82.03 20.995 147.827 62.987 197.387 41.993 49.56 101.807 74.34 179.444 74.34 59.083 0 109.986-17.822 152.71-53.467 42.725-35.644 64.332-78.37 64.82-128.173h-88.623c-.488 30.76-13.306 56.274-38.452 76.538-25.147 20.263-55.298 30.395-90.454 30.395zM352.296 785.89h95.947c-9.277-30.763-13.916-67.384-13.916-109.865v-262.94c0-58.593-18.432-103.637-55.298-135.13-36.865-31.495-87.28-47.242-151.245-47.242-62.5 0-114.136 15.99-154.907 47.974C32.104 310.67 11.72 348.39 11.72 391.847h93.016c0-24.415 10.987-44.8 32.96-61.16 21.972-16.356 50.292-24.535 84.96-24.535 37.598 0 66.65 9.278 87.158 27.832 20.508 18.555 30.762 44.434 30.762 77.637v55.665H235.84c-74.22 0-132.08 14.527-173.584 43.58C20.752 539.916 0 580.81 0 633.544c0 51.758 14.648 91.675 43.945 119.75 29.297 28.077 72.266 42.115 128.907 42.115 33.69 0 65.063-7.812 94.116-23.437 29.053-15.625 53.59-36.866 73.608-63.72.977 16.112 4.883 41.99 11.72 77.636zm-165.527-70.314c-30.762 0-54.078-6.958-69.947-20.874-15.868-13.916-23.802-33.57-23.802-58.96 0-29.297 12.695-53.955 38.086-73.974 25.39-20.02 59.326-30.03 101.806-30.03h107.666V632.08c-12.695 24.414-32.96 44.434-60.79 60.06-27.833 15.624-58.84 23.436-93.018 23.436z"
  }));
}

/***/ })

/******/ });