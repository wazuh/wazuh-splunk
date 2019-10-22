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
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
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

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-icons/Remove"
var Remove_ = __webpack_require__(32);
var Remove_default = /*#__PURE__*/__webpack_require__.n(Remove_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Chip/ChipStyles.js



var StyledBasic = external_styled_components_default.a.div.withConfig({
  displayName: "ChipStyles__StyledBasic",
  componentId: "xs1qcl-0"
})(["", ";background-color:", ";border-radius:2px;color:", ";line-height:", ";margin-right:2px;margin-bottom:2px;&[data-size='small']{height:calc(", " - 6px);padding:2px ", ";font-size:", ";max-width:calc(100% - 3px);}&[data-size='medium']{height:calc(", " - 6px);padding:", " 8px;max-width:calc(100% - 3px);}&[disabled]{background-color:", ";}"], Object(themes_["mixin"])('reset')('inline-flex'), function (_ref) {
  var appearance = _ref.appearance,
      backgroundColor = _ref.backgroundColor;
  return appearance && Object(themes_["variable"])('Chip', "".concat(appearance, "ColorBackgroundColor")) || backgroundColor || Object(themes_["variable"])('Chip', 'clickableBackgroundColor');
}, Object(themes_["variable"])('Chip', 'clickableColor'), Object(themes_["variable"])('lineHeight'), Object(themes_["variable"])('inputHeightSmall'), Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('Chip', 'clickableDisabledBackgroundColor'));
var Styled = external_styled_components_default()(StyledBasic).withConfig({
  displayName: "ChipStyles__Styled",
  componentId: "xs1qcl-1"
})(["align-items:center;"]);
var StyledClickable = external_styled_components_default()(StyledBasic.withComponent(Clickable_default.a)).withConfig({
  displayName: "ChipStyles__StyledClickable",
  componentId: "xs1qcl-2"
})(["flex:0 1 auto;line-height:16px;&:focus{box-shadow:", ";color:", ";}&:not([disabled]):hover{background-color:", ";color:", ";}"], Object(themes_["variable"])('focusShadow'), Object(themes_["variable"])('linkColor'), Object(themes_["variable"])('Chip', 'clickableHoverBackgroundColor'), Object(themes_["variable"])('linkColor'));
var StyledInner = external_styled_components_default.a.div.withConfig({
  displayName: "ChipStyles__StyledInner",
  componentId: "xs1qcl-3"
})(["display:flex;max-width:100%;"]);
var StyledIcon = external_styled_components_default.a.div.withConfig({
  displayName: "ChipStyles__StyledIcon",
  componentId: "xs1qcl-4"
})(["flex:0 0 auto;margin-right:3px;color:", ";[disabled] > ", " > &{color:", ";}"], function (props) {
  return props.foregroundColor || Object(themes_["variable"])('Chip', 'iconColor');
},
/* sc-sel */
StyledInner, Object(themes_["variable"])('textDisabledColor'));
var StyledLabel = external_styled_components_default.a.div.withConfig({
  displayName: "ChipStyles__StyledLabel",
  componentId: "xs1qcl-5"
})(["flex:0 1 auto;color:", ";overflow:hidden;white-space:nowrap;text-overflow:ellipsis;[disabled] > ", " > &{color:", ";}"], function (props) {
  return props.foregroundColor || Object(themes_["variable"])('Chip', 'labelColor');
},
/* sc-sel */
StyledInner, Object(themes_["variable"])('textDisabledColor'));
var StyledRemove = external_styled_components_default.a.span.withConfig({
  displayName: "ChipStyles__StyledRemove",
  componentId: "xs1qcl-6"
})(["color:", ";font-size:0.75em;padding-left:", ";flex:0 0 auto;"], function (props) {
  return props.foregroundColor || 'inherit';
}, Object(themes_["variable"])('spacingQuarter'));

// CONCATENATED MODULE: ./src/Chip/Chip.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var propTypes = {
  /**
   * The severity or type of this `Chip`.
   * Setting this prop will cause the `backgroundColor` prop to be ignored.
   */
  appearance: external_prop_types_default.a.oneOf(['info', 'success', 'warning', 'error']),

  /**
   * Change the background color of the `Chip`.
   * Hexadecimal color and valid color names are allowed, e.g. `#ffffff`, or `white`.
   * If the `appearance` prop is set this prop is ignored.
   */
  backgroundColor: external_prop_types_default.a.string,
  children: external_prop_types_default.a.node.isRequired,

  /** Disables the `Chip`. */
  disabled: external_prop_types_default.a.bool,

  /** Invoked with the DOM element when the component mounts and null when it unmounts. */
  elementRef: external_prop_types_default.a.func,

  /**
   * Change the text and icon color of the `Chip`.
   * Hexadecimal color and valid color names are allowed, e.g. `#ffffff`, or `white`.
   */
  foregroundColor: external_prop_types_default.a.string,

  /** The icon to show before the label. See the Icon component for more information. */
  icon: external_prop_types_default.a.node,

  /** A remove button is included if this callback is set. */
  onRequestRemove: external_prop_types_default.a.func,

  /** Adjusts the size. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** This value is included in `onRequestRemove` callbacks. */
  value: external_prop_types_default.a.any
};
var defaultProps = {
  disabled: false,
  size: 'medium'
};
function Chip(props) {
  var appearance = props.appearance,
      backgroundColor = props.backgroundColor,
      disabled = props.disabled,
      elementRef = props.elementRef,
      foregroundColor = props.foregroundColor,
      children = props.children,
      icon = props.icon,
      onRequestRemove = props.onRequestRemove,
      size = props.size,
      value = props.value,
      otherProps = _objectWithoutProperties(props, ["appearance", "backgroundColor", "disabled", "elementRef", "foregroundColor", "children", "icon", "onRequestRemove", "size", "value"]);

  function handleRemoveClick(e) {
    onRequestRemove(e, {
      value: value
    });
  }

  var Tag = onRequestRemove ? StyledClickable : Styled;
  return external_react_default.a.createElement(Tag, _extends({
    appearance: appearance,
    backgroundColor: backgroundColor,
    "data-size": size,
    "data-test": "chip",
    "data-test-value": value,
    disabled: disabled,
    onClick: onRequestRemove ? handleRemoveClick : null
  }, Object(themes_["ref"])(elementRef), otherProps), external_react_default.a.createElement(StyledInner, null, icon && external_react_default.a.createElement(StyledIcon, {
    foregroundColor: foregroundColor
  }, icon), external_react_default.a.createElement(StyledLabel, {
    foregroundColor: foregroundColor,
    "data-test": "label"
  }, children), onRequestRemove && external_react_default.a.createElement(StyledRemove, {
    foregroundColor: foregroundColor
  }, external_react_default.a.createElement(Remove_default.a, {
    size: 0.85
  }))));
}
Chip.propTypes = propTypes;
Chip.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/Chip/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return Chip; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Remove");

/***/ })

/******/ });