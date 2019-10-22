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
/******/ 	return __webpack_require__(__webpack_require__.s = 132);
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

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/CardLayout/CardLayoutStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "CardLayoutStyles__Styled",
  componentId: "sc-1rhc9bh-0"
})(["", ";&[data-wrap-cards='true']{flex-wrap:wrap;}&[data-align-cards='center']{justify-content:center;}&[data-align-cards='right']{justify-content:flex-end;}"], Object(themes_["mixin"])('reset')('flex'));

// CONCATENATED MODULE: ./src/CardLayout/CardLayout.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var propTypes = {
  /** Align cards in layout. */
  alignCards: external_prop_types_default.a.oneOf(['left', 'center', 'right']),

  /**
   * Must be `Card`s.
   */
  children: external_prop_types_default.a.node,

  /** Width of each card. */
  cardWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string]),

  /** Minimum width of each Card. */
  cardMinWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string]),

  /** Maximum width of each Card. */
  cardMaxWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string]),

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Space in pixels between Cards. */
  gutterSize: external_prop_types_default.a.number,

  /** @private */
  style: external_prop_types_default.a.object,

  /** Let cards wrap to new line when container gets narrow. */
  wrapCards: external_prop_types_default.a.bool
};
var defaultProps = {
  alignCards: 'left',
  gutterSize: 10,
  style: {},
  wrapCards: true
};
function CardLayout(props) {
  var alignCards = props.alignCards,
      children = props.children,
      cardWidth = props.cardWidth,
      cardMinWidth = props.cardMinWidth,
      cardMaxWidth = props.cardMaxWidth,
      elementRef = props.elementRef,
      gutterSize = props.gutterSize,
      style = props.style,
      wrapCards = props.wrapCards,
      otherProps = _objectWithoutProperties(props, ["alignCards", "children", "cardWidth", "cardMinWidth", "cardMaxWidth", "elementRef", "gutterSize", "style", "wrapCards"]);

  var clonedChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
    return Object(external_react_["cloneElement"])(child, {
      minWidth: cardWidth || cardMinWidth || undefined,
      maxWidth: cardWidth || cardMaxWidth || undefined,
      margin: gutterSize / 2
    });
  });
  return external_react_default.a.createElement(Styled, _extends({}, Object(themes_["ref"])(elementRef), {
    style: _objectSpread({
      padding: gutterSize / 2
    }, style),
    "data-align-cards": alignCards,
    "data-test": "card-layout",
    "data-wrap-cards": wrapCards,
    role: "presentation"
  }, otherProps), clonedChildren);
}
CardLayout.propTypes = propTypes;
CardLayout.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/CardLayout/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return CardLayout; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });