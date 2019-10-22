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
/******/ 	return __webpack_require__(__webpack_require__.s = 126);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

/***/ }),

/***/ 126:
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

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Monogram/MonogramStyles.js


 // Thanks: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0

var hashCode = function hashCode(input) {
  var hash = 0;

  for (var i = 0; i < input.length;) {
    hash = (hash << 5) - hash + input.charCodeAt(i++) | 0; // eslint-disable-line no-bitwise, no-plusplus
  }

  return hash;
};

var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "MonogramStyles__Styled",
  componentId: "jw6u08-0"
})(["", ";align-items:center;justify-content:center;color:", ";background-color:", ";", " & + &{margin-left:4px;}"], Object(themes_["mixin"])('reset')('inline-flex'), Object(themes_["variable"])('Monogram', 'color'), function (props) {
  var backgroundColors = Object(themes_["variable"])('Monogram', 'backgroundColors')(props);
  return props.backgroundColor === 'auto' && backgroundColors[hashCode(props.initials) % backgroundColors.length] || props.backgroundColor;
}, function (_ref) {
  var size = _ref.size;
  return size === 'small' && Object(external_styled_components_["css"])(["height:32px;width:32px;border-radius:16px;font-size:14px;"]) || size === 'medium' && Object(external_styled_components_["css"])(["height:48px;width:48px;border-radius:24px;font-size:16px;"]) || size === 'large' && Object(external_styled_components_["css"])(["height:82px;width:82px;border-radius:41px;font-size:30px;"]) || Object(external_styled_components_["css"])(["width:148px;height:148px;border-radius:74px;font-size:58px;"]);
});
var StyledClickableComponent = Styled.withComponent(Clickable_default.a);
var StyledClickable = external_styled_components_default()(StyledClickableComponent).withConfig({
  displayName: "MonogramStyles__StyledClickable",
  componentId: "jw6u08-1"
})(["cursor:pointer;:focus,:hover{box-shadow:", ";}:active{opacity:0.85;}"], Object(themes_["variable"])('Monogram', 'clickableFocusHoverBoxShadow'));
var Initials = external_styled_components_default.a.span.withConfig({
  displayName: "MonogramStyles__Initials",
  componentId: "jw6u08-2"
})(["opacity:0.8;text-transform:capitalize;"]);

// CONCATENATED MODULE: ./src/Monogram/Monogram.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var propTypes = {
  /**
   * All CSS color definitions are supported, e.g. `#223344` or `red`.
   * If set to `auto` the background color is derived from the `initials` prop.
   */
  backgroundColor: external_prop_types_default.a.string,

  /** Invoked with the DOM element when the component mounts and `null` when it unmounts. */
  elementRef: external_prop_types_default.a.func,

  /** The contents of this `Monogram`. Must not exceed three characters in length. */
  initials: external_prop_types_default.a.string.isRequired,

  /**
   * The name is returned with `onClick` events, which can be used to identify the
   * control when multiple controls share an `onClick` callback. Not to be confused with `initials`.
   */
  name: external_prop_types_default.a.string,

  /** Enables interactive mode. */
  onClick: external_prop_types_default.a.func,

  /** Adjusts the size of the `Monogram`. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large', 'xlarge'])
};
var defaultProps = {
  backgroundColor: 'auto',
  size: 'medium'
};
/**
 * Returns a suitable set of initials for a name. Uses the first character of each
 * name segment and omits middle segments if the segment count is greater than three.
 * @param {string} name - The full name.
 * @returns {string} Limited to three characters. Empty if `name` is empty.
 * @public
 */

function getInitials(name) {
  var initials = (name.match(/[^\s-]+/g) || []).map(function (segment) {
    return segment[0];
  }).join('');
  return initials.length > 3 ? "".concat(initials[0]).concat(initials[initials.length - 1]) : initials;
}
function Monogram(_ref) {
  var backgroundColor = _ref.backgroundColor,
      elementRef = _ref.elementRef,
      initials = _ref.initials,
      name = _ref.name,
      onClick = _ref.onClick,
      size = _ref.size,
      otherProps = _objectWithoutProperties(_ref, ["backgroundColor", "elementRef", "initials", "name", "onClick", "size"]);

  var StyledComponent = onClick ? StyledClickable : Styled;

  var handleClick = function handleClick(e) {
    onClick(e, {
      name: name
    });
  };

  return external_react_default.a.createElement(StyledComponent, _extends({
    backgroundColor: backgroundColor
  }, Object(themes_["ref"])(elementRef), {
    initials: initials,
    onClick: onClick ? handleClick : undefined,
    size: size,
    "data-test": "monogram"
  }, otherProps), external_react_default.a.createElement(Initials, {
    "data-test": "initials"
  }, initials));
}
Monogram.propTypes = propTypes;
Monogram.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/Monogram/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return Monogram; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getInitials", function() { return getInitials; });



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