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
/******/ 	return __webpack_require__(__webpack_require__.s = 116);
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

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-icons/Error"
var Error_ = __webpack_require__(65);
var Error_default = /*#__PURE__*/__webpack_require__.n(Error_);

// EXTERNAL MODULE: external "@splunk/react-icons/Warning"
var Warning_ = __webpack_require__(66);
var Warning_default = /*#__PURE__*/__webpack_require__.n(Warning_);

// EXTERNAL MODULE: external "@splunk/react-icons/Success"
var Success_ = __webpack_require__(67);
var Success_default = /*#__PURE__*/__webpack_require__.n(Success_);

// EXTERNAL MODULE: external "@splunk/react-icons/InfoCircle"
var InfoCircle_ = __webpack_require__(68);
var InfoCircle_default = /*#__PURE__*/__webpack_require__.n(InfoCircle_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Message/MessageStyles.js



var MessageStyles_StyledIcon = external_styled_components_default.a.span.withConfig({
  displayName: "MessageStyles__StyledIcon",
  componentId: "sc-13dj0tx-0"
})(["position:absolute;top:7px;left:0;width:25px;text-align:center;color:", ";"], Object(themes_["variable"])('Message', 'iconColor'));
var StyledIconInfo = external_styled_components_default()(MessageStyles_StyledIcon).withConfig({
  displayName: "MessageStyles__StyledIconInfo",
  componentId: "sc-13dj0tx-1"
})(["color:", ";"], Object(themes_["variable"])('Message', 'iconInfoColor'));
var StyledIconSuccess = external_styled_components_default()(MessageStyles_StyledIcon).withConfig({
  displayName: "MessageStyles__StyledIconSuccess",
  componentId: "sc-13dj0tx-2"
})(["color:", ";"], Object(themes_["variable"])('Message', 'iconSuccessColor'));
var StyledIconWarning = external_styled_components_default()(MessageStyles_StyledIcon).withConfig({
  displayName: "MessageStyles__StyledIconWarning",
  componentId: "sc-13dj0tx-3"
})(["color:", ";"], Object(themes_["variable"])('Message', 'iconWarningColor'));
var StyledIconError = external_styled_components_default()(MessageStyles_StyledIcon).withConfig({
  displayName: "MessageStyles__StyledIconError",
  componentId: "sc-13dj0tx-4"
})(["color:", ";"], Object(themes_["variable"])('Message', 'iconErrorColor'));
var iconReferences = [StyledIconInfo, StyledIconSuccess, StyledIconWarning, StyledIconError];

var MessageStyles_iconSpacing = function iconSpacing(iconReference) {
  return Object(external_styled_components_["css"])(["&[data-fill] > ", "{left:", ";}"],
  /* sc-sel */
  iconReference, Object(themes_["variable"])('spacingQuarter'));
};

var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "MessageStyles__StyledBox",
  componentId: "sc-13dj0tx-5"
})(["", ";position:relative;margin-bottom:", ";padding:", " 0 ", " 40px;word-wrap:break-word;&[data-fill='info']{background-color:", ";border:1px solid ", ";border-radius:", ";}&[data-fill='success']{background-color:", ";border:1px solid ", ";border-radius:", ";}&[data-fill='warning']{background-color:", ";border:1px solid ", ";border-radius:", ";}&[data-fill='error']{background-color:", ";border:1px solid ", ";border-radius:", ";}", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('Message', 'boxInfoBackgroundColor'), Object(themes_["variable"])('infoColor'), Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('Message', 'boxSuccessBackgroundColor'), Object(themes_["variable"])('successColor'), Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('Message', 'boxWarningBackgroundColor'), Object(themes_["variable"])('warningColor'), Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('Message', 'boxErrorBackgroundColor'), Object(themes_["variable"])('errorColor'), Object(themes_["variable"])('spacingQuarter'), iconReferences.map(function (iconReference) {
  return MessageStyles_iconSpacing(iconReference);
}));

// CONCATENATED MODULE: ./src/Message/Message.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Adds a background and border.
   */
  fill: external_prop_types_default.a.bool,

  /** The severity or type of warning */
  type: external_prop_types_default.a.oneOf(['info', 'success', 'warning', 'error'])
};
var defaultProps = {
  fill: false,
  type: 'warning'
};
function Message(_ref) {
  var children = _ref.children,
      type = _ref.type,
      fill = _ref.fill,
      otherProps = _objectWithoutProperties(_ref, ["children", "type", "fill"]);

  var Icon = {
    info: InfoCircle_default.a,
    success: Success_default.a,
    warning: Warning_default.a,
    error: Error_default.a
  }[type];
  var StyledIcon = {
    info: StyledIconInfo,
    success: StyledIconSuccess,
    warning: StyledIconWarning,
    error: StyledIconError
  }[type];
  return external_react_default.a.createElement(StyledBox, _extends({
    "data-test": "message",
    "data-fill": fill ? type : undefined,
    "data-test-type": type
  }, otherProps), external_react_default.a.createElement(StyledIcon, null, external_react_default.a.createElement(Icon, {
    width: "24px",
    height: "24px"
  })), external_react_default.a.createElement("span", {
    "data-test": "content"
  }, children));
}
Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/Message/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return Message; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Error");

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Warning");

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Success");

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/InfoCircle");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });