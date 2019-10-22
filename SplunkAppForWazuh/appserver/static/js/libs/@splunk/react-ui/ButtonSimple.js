
define(function (require, exports, module) {
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

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/ButtonSimple/baseStyles.js


var baseStyles_button = Object(external_styled_components_["css"])(["", ";border-radius:", ";cursor:pointer;position:relative;@media all and (-ms-high-contrast:none){max-width:calc(100% - 0.01px);}&:focus{z-index:3;}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('borderRadius'));
var chromed = Object(external_styled_components_["css"])(["", ";&[data-append]{border-top-right-radius:0;border-bottom-right-radius:0;border-right:none;}&[data-prepend]{border-top-left-radius:0;border-bottom-left-radius:0;}"], baseStyles_button);

// CONCATENATED MODULE: ./src/ButtonSimple/defaultStyles.js




var defaultStyles_defaultButton = function defaultButton(name) {
  return Object(external_styled_components_["css"])(["", ";box-shadow:", ";border-radius:", ";&:not([disabled]){background-color:", ";border:", ";color:", ";transition:background 0.2s,border 0.2s,box-shadow 0.2s,text-decoration 0.2s;&[data-selected]{box-shadow:", ";background-color:", ";border-color:", ";&:hover{box-shadow:", ";}&[data-prepend]{border-left:", ";border-left-color:", ";}}&:hover{box-shadow:", ";background-color:", ";}&:active{background-color:", ";box-shadow:", ";transition:none;&[data-prepend]{border-left:", ";border-left-color:", ";}}&:focus{box-shadow:", ";background-color:", ";&:hover{box-shadow:", ";}&:active{box-shadow:", ";background-color:", ";}&[data-selected]{box-shadow:", ";}&[data-append]{box-shadow:", ";&[data-selected]{box-shadow:", ";}}}}&[disabled]{color:", ";background-color:", ";border:1px solid ", ";cursor:not-allowed;&:not([data-selected]){box-shadow:none;}&[data-selected]{box-shadow:", ";background-color:", ";border-color:", ";}}&[data-append]{border-right:none;}"], chromed, Object(themes_["variable"])('ButtonSimple', name, 'shadow'), Object(themes_["variable"])('ButtonSimple', name, 'borderRadius'), Object(themes_["variable"])('ButtonSimple', name, 'backgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'border'), Object(themes_["variable"])('ButtonSimple', name, 'color'), Object(themes_["variable"])('ButtonSimple', name, 'selectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'selectedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'selectedBorderColor'), Object(themes_["variable"])('ButtonSimple', name, 'selectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'border'), Object(themes_["variable"])('ButtonSimple', name, 'selectedPrependLeftBorderColor'), Object(themes_["variable"])('ButtonSimple', name, 'hoverShadow'), Object(themes_["variable"])('ButtonSimple', name, 'hoverBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'activeShadow'), Object(themes_["variable"])('ButtonSimple', name, 'border'), Object(themes_["variable"])('ButtonSimple', name, 'activePrependLeftBorderColor'), Object(themes_["variable"])('ButtonSimple', name, 'focusShadow'), Object(themes_["variable"])('ButtonSimple', name, 'focusBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'focusHoverShadow'), Object(themes_["variable"])('ButtonSimple', name, 'focusActiveShadow'), Object(themes_["variable"])('ButtonSimple', name, 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'focusSelectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'focusAppendShadow'), Object(themes_["variable"])('ButtonSimple', name, 'focusAppendSelectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'disabledTextColor'), Object(themes_["variable"])('ButtonSimple', name, 'disabledBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'disabledBorderColor'), Object(themes_["variable"])('ButtonSimple', name, 'selectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'disabledSelectedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'disabledSelectedBorderColor'));
};

var defaultAppearance = defaultStyles_defaultButton('Default');
var secondary = Object(external_styled_components_["css"])(["", ";font-weight:", ";"], defaultStyles_defaultButton('Secondary'), Object(themes_["variable"])('fontWeightSemiBold'));

// CONCATENATED MODULE: ./src/ButtonSimple/coloredStyles.js




var coloredStyles_colorButton = function colorButton(name) {
  return Object(external_styled_components_["css"])(["", ";border-radius:", ";font-weight:", ";border:", ";&:not([disabled]){background-color:", ";color:", ";box-shadow:", ";transition:background 0.2s,border 0.2s,box-shadow 0.2s,text-decoration 0.2s;&[data-selected]{box-shadow:", ";background-color:", ";}&[data-prepend]{border-left:1px solid ", ";}&:hover{background-color:", ";border:", ";}&:active{background-color:", ";border:", ";transition:none;}&:focus{box-shadow:", ";background-color:", ";border:", ";&.selected{box-shadow:", ";}&:active{background-color:", ";border:", ";transition:none;}}}&[disabled]{color:", ";background-color:", ";border:", ";cursor:not-allowed;&:not([data-selected]){box-shadow:none;}&[data-selected]{box-shadow:", ";background-color:", ";border:", ";}}"], chromed, Object(themes_["variable"])('ButtonSimple', name, 'borderRadius'), Object(themes_["variable"])('fontWeightSemiBold'), Object(themes_["variable"])('ButtonSimple', name, 'border'), Object(themes_["variable"])('ButtonSimple', name, 'backgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'color'), Object(themes_["variable"])('ButtonSimple', name, 'shadow'), Object(themes_["variable"])('ButtonSimple', name, 'selectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'selectedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'prependBorderLeftColor'), Object(themes_["variable"])('ButtonSimple', name, 'hoverBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'hoverBorder'), Object(themes_["variable"])('ButtonSimple', name, 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'activeBorder'), Object(themes_["variable"])('ButtonSimple', name, 'focusShadow'), Object(themes_["variable"])('ButtonSimple', name, 'focusBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'focusBorder'), Object(themes_["variable"])('ButtonSimple', name, 'selectedFocusShadow'), Object(themes_["variable"])('ButtonSimple', name, 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'activeBorder'), Object(themes_["variable"])('ButtonSimple', name, 'disabledTextColor'), Object(themes_["variable"])('ButtonSimple', name, 'disabledBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'disabledBorder'), Object(themes_["variable"])('ButtonSimple', name, 'selectedShadow'), Object(themes_["variable"])('ButtonSimple', name, 'disabledSelectedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', name, 'disabledSelectedBorder'));
};

var primary = coloredStyles_colorButton('Primary');
var error = coloredStyles_colorButton('Error');

// CONCATENATED MODULE: ./src/ButtonSimple/pillStyles.js



var pill = Object(external_styled_components_["css"])(["", ";color:", ";border:1px solid transparent;&:not([disabled]){transition:background 0.2s,border 0.2s,box-shadow 0.2s,text-decoration 0.2s;&:hover{color:", ";background-color:", ";border-color:", ";}&:focus{color:", ";box-shadow:", ";}&:active,&[aria-expanded='true']{background-color:", ";transition:none;}}&[aria-invalid]:not([disabled]){&,&:hover{color:", ";}}&[data-selected]{border-color:", ";&[disabled]{border-color:", ";}}&[disabled]{color:", ";cursor:not-allowed;}"], baseStyles_button, Object(themes_["variable"])('ButtonSimple', 'Pill', 'color'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'hoverColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'hoverBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'hoverBorderColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'focusColor'), Object(themes_["variable"])('focusShadow'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'expandedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'invalidColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'selectedBorderColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'selectedDisabledBorderColor'), Object(themes_["variable"])('ButtonSimple', 'Pill', 'disabledTextColor'));

// CONCATENATED MODULE: ./src/ButtonSimple/toggleStyles.js



var toggle = Object(external_styled_components_["css"])(["", ";border:", ";background-color:", ";&:not([disabled]){border:", ";background-color:", ";color:", ";transition:background 0.2s,border 0.2s,text-decoration 0.2s;&:hover{background-color:", ";&:active{background-color:", ";border-color:", ";transition:none;}}&:active{background-color:", ";border-color:", ";transition:none;}&:focus{background-color:", ";}&[data-selected]{background-color:", ";}}&[disabled]{color:", ";background-color:", ";border-color:", ";cursor:not-allowed;&[data-selected]{background-color:", ";}}"], chromed, Object(themes_["variable"])('ButtonSimple', 'Toggle', 'border'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'backgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'border'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'backgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'color'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'hoverBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'activeBorderColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'activeBorderColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'focusBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'selectedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'disabledTextColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'disabledBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'disabledBorderColor'), Object(themes_["variable"])('ButtonSimple', 'Toggle', 'disabledSelectedBackgroundColor'));

// CONCATENATED MODULE: ./src/ButtonSimple/flatStyles.js



var flat = Object(external_styled_components_["css"])(["", ";color:", ";background-color:", ";border:", ";&:not([disabled]){background-color:", ";color:", ";transition:background 0.2s,text-decoration 0.2s;&:hover{background-color:", ";&:active{background-color:", ";transition:none;}}&:active{background-color:", ";transition:none;}&:focus{background-color:", ";}&[data-selected]{background-color:", ";}}&[disabled]{color:", ";background-color:", ";cursor:not-allowed;&[data-selected]{background-color:", ";}}"], chromed, Object(themes_["variable"])('ButtonSimple', 'Flat', 'color'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'backgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'border'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'backgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'color'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'hoverBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'activeBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'focusBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'selectedBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'disabledTextColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'disabledBackgroundColor'), Object(themes_["variable"])('ButtonSimple', 'Flat', 'disabledSelectedBackgroundColor'));

// CONCATENATED MODULE: ./src/ButtonSimple/ButtonSimpleStyles.js








var appearances = {
  default: defaultAppearance,
  error: error,
  primary: primary,
  secondary: secondary,
  pill: pill,
  toggle: toggle,
  flat: flat
};
var StyledClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "ButtonSimpleStyles__StyledClickable",
  componentId: "sc-1cwt4oo-0"
})(["", ";"], function (props) {
  if (props.status === 'error') {
    return appearances.error;
  }

  if (props.appearance === 'toggle' && !Object(themes_["variable"])('ButtonSimple', 'Toggle')(props)) {
    return appearances.default;
  }

  if (props.appearance === 'flat' && !Object(themes_["variable"])('ButtonSimple', 'Flat')(props)) {
    return appearances.default;
  }

  if (props.appearance === 'pill' && !Object(themes_["variable"])('ButtonSimple', 'Pill')(props)) {
    return appearances.secondary;
  }

  return appearances[props.appearance];
});

// CONCATENATED MODULE: ./src/ButtonSimple/ButtonSimple.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var ButtonSimple_ButtonSimple =
/*#__PURE__*/
function (_Component) {
  _inherits(ButtonSimple, _Component);

  function ButtonSimple() {
    _classCallCheck(this, ButtonSimple);

    return _possibleConstructorReturn(this, _getPrototypeOf(ButtonSimple).apply(this, arguments));
  }

  _createClass(ButtonSimple, [{
    key: "focus",

    /**
     * Places focus on the button.
     */
    value: function focus() {
      if (this.component) {
        this.component.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          appearance = _this$props.appearance,
          append = _this$props.append,
          children = _this$props.children,
          status = _this$props.status,
          prepend = _this$props.prepend,
          selected = _this$props.selected;
      return external_react_default.a.createElement(StyledClickable, _extends({
        "aria-invalid": status === 'error' || null,
        "data-test": "button-simple",
        "data-appearance": appearance,
        "data-error": status === 'error' ? true : null,
        "data-append": append || null,
        "data-prepend": prepend || null,
        "data-selected": selected || null
      }, Object(themes_["ref"])(function (c) {
        return _this.component = c;
      }), this.props), children, selected && external_react_default.a.createElement(ScreenReaderContent_default.a, null, Object(i18n_["_"])('Selected')));
    }
  }]);

  return ButtonSimple;
}(external_react_["Component"]);

_defineProperty(ButtonSimple_ButtonSimple, "propTypes", {
  /** Returns a value on click. Use when composing or testing. */
  action: external_prop_types_default.a.string,

  /** Changes the style of the button.
   * @themeNotes 'pill': supported by `enterprise`, `enterpriseDark` and `lite`. 'toggle' and 'flat': supported by `scp`.
   */
  appearance: external_prop_types_default.a.oneOf(['default', 'secondary', 'primary', 'pill', 'toggle', 'flat']),

  /** Removes the right border and border-radius of the button so you can
   * append things to it. */
  append: external_prop_types_default.a.bool,

  /** @private */
  children: external_prop_types_default.a.node,

  /** Add a disabled attribute and prevent clicking. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Restricts the horizontal size of the button. Set `inline` to false to
   * remove the right margin and stretch the button to the full width of
   * its container.  */
  inline: external_prop_types_default.a.bool,

  /** Opens the 'to' link in a new tab. */
  openInNewContext: external_prop_types_default.a.bool,

  /** Removes the left border and border-radius of the button so you can
   * prepend things to it. */
  prepend: external_prop_types_default.a.bool,

  /** Adds the style to make the button appear selected. */
  selected: external_prop_types_default.a.bool,

  /** Turns the button red. If you use this prop, apply other error
   * indicators such as an error message, to meet accessibility
   * requirements. */
  status: external_prop_types_default.a.oneOf(['normal', 'error']),

  /** Identifies the url for a link. If set, Splunk UI applies an <a> tag
   * instead of a <button> tag. */
  to: external_prop_types_default.a.string
});

_defineProperty(ButtonSimple_ButtonSimple, "defaultProps", {
  appearance: 'default',
  append: false,
  disabled: false,
  status: 'normal',
  inline: true,
  openInNewContext: false,
  prepend: false,
  selected: false
});


// CONCATENATED MODULE: ./src/ButtonSimple/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return ButtonSimple_ButtonSimple; });


/***/ })

/******/ });

});