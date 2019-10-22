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

module.exports = require("react");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _splunk_react_ui_ScreenReaderContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _splunk_react_ui_ScreenReaderContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_splunk_react_ui_ScreenReaderContent__WEBPACK_IMPORTED_MODULE_4__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var InlineSVG = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.svg.withConfig({
  displayName: "SVG__InlineSVG",
  componentId: "sc-12p19go-0"
})(["flex:0 0 auto;vertical-align:middle;display:inline-block;"]);
var BlockSVG = styled_components__WEBPACK_IMPORTED_MODULE_3___default.a.svg.withConfig({
  displayName: "SVG__BlockSVG",
  componentId: "sc-12p19go-1"
})(["flex:0 0 auto;display:block;margin:0 auto;"]);
var viewBoxRegex = /-?\d.?\d* -?\d+.?\d* \d+.?\d* \d+.?\d*/;
var propTypes = {
  /** @private */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,

  /**
   *  This defaults to the value of the size prop. Height can be defined as a number of ems, or as
   * a string with any other unit.
   */
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),

  /** Hide default screen text tooltip visually but still render it for screen readers. */
  hideDefaultTooltip: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /**
   * Setting inline to false will remove vertical-align: middle, and center the icon horizonatally.
   */
  inline: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,

  /** A string to display to screen readers instead of the 'icon' value. Set the prop to null or
   * an empty string to hide the icon from screen readers, such as when there is already a text
   * label beside the icon. All icons have a default value that matches the icon name. */
  screenReaderText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['null'])]),

  /**
   * For convenience, the size prop the value for width or height (which ever is larger), and
   * scales the other dimension proportionally.
   * The default size of 0.75 makes the icon a similar size as the font
   * size. Size can be defined as a number of ems, or as a string with any other unit.
   */
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),

  /**
   * This defaults to the value of the size prop. Width can be defined as  a number of ems, or as
   * a string with any other unit.
   */
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]),

  /**
   * The value of the viewBox attribute is a string, consisting of list of four space-separated numbers:
   * min-x, min-y, width and height. For instance: "0 0 24 24" or "-20.4 -11.8 203.4 203.5";
   */
  // eslint-disable-next-line consistent-return
  viewBox: function viewBox(props, propName, componentName) {
    var value = props[propName];

    if (!viewBoxRegex.test(value)) {
      return new Error("Invalid prop value: ".concat(value, " for ").concat(propName, " in ").concat(componentName, ". Must be four space-separated numbers, such as \"0 0 24 24.\""));
    }
  },

  /**
   * By default, the aspect ratio is preserved and the height and width define a max dimension,
   * and the icon is centered in the space. These are the standard svg values.  */
  preserveAspectRatio: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['none', 'xMinYMin', 'xMidYMin', 'xMaxYMin', 'xMinYMid', 'xMidYMid', 'xMaxYMid', 'xMinYMax', 'xMidYMax', 'xMaxYMax'])
};
var defaultProps = {
  hideDefaultTooltip: false,
  inline: true,
  size: 0.75,
  preserveAspectRatio: 'xMidYMid'
};

function SVG(props) {
  var children = props.children,
      height = props.height,
      hideDefaultTooltip = props.hideDefaultTooltip,
      inline = props.inline,
      preserveAspectRatio = props.preserveAspectRatio,
      screenReaderText = props.screenReaderText,
      size = props.size,
      width = props.width,
      viewBox = props.viewBox,
      otherProps = _objectWithoutProperties(props, ["children", "height", "hideDefaultTooltip", "inline", "preserveAspectRatio", "screenReaderText", "size", "width", "viewBox"]);

  var sizeValue = parseFloat(size);
  var sizeUnit = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(size) ? size.match(/[^\d]+/) : 'em';
  var vbHeight = parseFloat(viewBox.split(' ')[3], 10);
  var vbWidth = parseFloat(viewBox.split(' ')[2], 10);
  var maxDimension = Math.max(vbWidth, vbHeight);
  var cHeight = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(height) ? vbHeight / maxDimension * sizeValue : height;
  var cWidth = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isUndefined"])(width) ? vbWidth / maxDimension * sizeValue : width;
  var SVGElement = inline ? InlineSVG : BlockSVG;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SVGElement, _extends({
    focusable: "false",
    height: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(cHeight) ? cHeight : "".concat(cHeight.toFixed(4)).concat(sizeUnit),
    width: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isString"])(cWidth) ? cWidth : "".concat(cWidth.toFixed(4)).concat(sizeUnit),
    viewBox: viewBox,
    "aria-hidden": !screenReaderText,
    preserveAspectRatio: preserveAspectRatio,
    xmlns: "http://www.w3.org/2000/svg"
  }, otherProps), screenReaderText && (hideDefaultTooltip ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_splunk_react_ui_ScreenReaderContent__WEBPACK_IMPORTED_MODULE_4___default.a, null, screenReaderText) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, screenReaderText)), children);
}

/* harmony default export */ __webpack_exports__["default"] = (SVG);
SVG.propTypes = propTypes;
SVG.defaultProps = defaultProps;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ })

/******/ });