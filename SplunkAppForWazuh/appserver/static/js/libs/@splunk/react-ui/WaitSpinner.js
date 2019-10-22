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
/******/ 	return __webpack_require__(__webpack_require__.s = 138);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/themes");

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-ui/AnimationToggle"
var AnimationToggle_ = __webpack_require__(34);
var AnimationToggle_default = /*#__PURE__*/__webpack_require__.n(AnimationToggle_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/WaitSpinner/WaitSpinnerStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "WaitSpinnerStyles__Styled",
  componentId: "sc-1v82vik-0"
})(["", ";"], Object(themes_["mixin"])('reset')('inline'));
var spin = Object(external_styled_components_["keyframes"])(["100%{transform:rotate(360deg);}"]);
var sizes = "\n    [data-size='small'] > & {\n        width: 14px;\n        height: 14px;\n    }\n\n    [data-size='medium'] > & {\n        width: 19px;\n        height: 19px;\n    }";
var StyledUnanimatedSvg = external_styled_components_default.a.svg.withConfig({
  displayName: "WaitSpinnerStyles__StyledUnanimatedSvg",
  componentId: "sc-1v82vik-1"
})(["", ""], sizes);
var StyledAnimatedSvg = external_styled_components_default.a.svg.withConfig({
  displayName: "WaitSpinnerStyles__StyledAnimatedSvg",
  componentId: "sc-1v82vik-2"
})(["transform-origin:center;animation:", " 1.2s steps(64) infinite;", ""], spin, sizes);
var StyledCircle = external_styled_components_default.a.circle.withConfig({
  displayName: "WaitSpinnerStyles__StyledCircle",
  componentId: "sc-1v82vik-3"
})(["fill:transparent;stroke:", ";stroke-width:2px;stroke-dasharray:34 19;"], Object(themes_["variable"])('WaitSpinner', 'circleStroke'));

// CONCATENATED MODULE: ./src/WaitSpinner/WaitSpinner.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var propTypes = {
  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** A string to display to screen readers. Set the prop to `null` or an empty string to hide the
   * spinner from screen readers, such as when there is already a text label beside it. */
  screenReaderText: external_prop_types_default.a.string,
  size: external_prop_types_default.a.oneOf(['small', 'medium'])
};
var defaultProps = {
  screenReaderText: Object(i18n_["_"])('Waiting'),
  size: 'small'
};

var WaitSpinner_renderSpinnerSvg = function renderSpinnerSvg(elementRef, screenReaderText, StyledSvg) {
  return function () {
    return external_react_default.a.createElement(StyledSvg, {
      ref: elementRef,
      viewBox: "0 0 19 19",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, screenReaderText && external_react_default.a.createElement("title", null, screenReaderText), external_react_default.a.createElement("g", null, external_react_default.a.createElement(StyledCircle, {
      cx: "9.5",
      cy: "9.5",
      r: "8.5"
    })));
  };
};

function WaitSpinner(props) {
  var elementRef = props.elementRef,
      size = props.size,
      screenReaderText = props.screenReaderText,
      otherProps = _objectWithoutProperties(props, ["elementRef", "size", "screenReaderText"]);

  return external_react_default.a.createElement(Styled, _extends({
    "data-size": size,
    "data-test": "wait-spinner"
  }, otherProps), external_react_default.a.createElement(AnimationToggle_default.a, {
    on: WaitSpinner_renderSpinnerSvg(elementRef, screenReaderText, StyledAnimatedSvg),
    off: WaitSpinner_renderSpinnerSvg(elementRef, screenReaderText, StyledUnanimatedSvg)
  }));
}
WaitSpinner.propTypes = propTypes;
WaitSpinner.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/WaitSpinner/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return WaitSpinner; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/AnimationToggle");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ })

/******/ });