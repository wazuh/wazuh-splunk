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
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("js/libs/@splunk/react-ui/themes");

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/style"
var style_ = __webpack_require__(28);

// EXTERNAL MODULE: external "@splunk/react-icons/Caret"
var Caret_ = __webpack_require__(30);
var Caret_default = /*#__PURE__*/__webpack_require__.n(Caret_);

// EXTERNAL MODULE: external "@splunk/react-icons/External"
var External_ = __webpack_require__(38);
var External_default = /*#__PURE__*/__webpack_require__.n(External_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/ButtonSimple"
var ButtonSimple_ = __webpack_require__(31);
var ButtonSimple_default = /*#__PURE__*/__webpack_require__.n(ButtonSimple_);

// CONCATENATED MODULE: ./src/Button/ButtonStyles.js



var StyledIcon = external_styled_components_default.a.span.withConfig({
  displayName: "ButtonStyles__StyledIcon",
  componentId: "sc-1py1q27-0"
})(["display:flex;align-items:center;flex-shrink:0;color:", ";padding-right:", ";&[disabled]{color:", ";}"], Object(themes_["variable"])('Button', 'iconColor'), Object(themes_["variable"])('Button', 'iconPaddingRight'), Object(themes_["variable"])('Button', 'disabledIconColor'));
var StyledButtonSimple = external_styled_components_default()(ButtonSimple_default.a).withConfig({
  displayName: "ButtonStyles__StyledButtonSimple",
  componentId: "sc-1py1q27-1"
})(["text-align:center;vertical-align:middle;text-decoration:none;white-space:nowrap;flex-grow:1;min-width:0;max-width:100%;padding:", " ", ";line-height:", ";min-height:", ";&[data-size='small']{padding:2px ", ";font-size:", ";min-height:", ";}&[data-size='large']{padding:8px calc(", " * 2);font-size:", ";min-height:", ";}@media all and (-ms-high-contrast:none){max-width:calc(100% - 0.01px);}&:not([data-inline]):not([data-append]):not([data-prepend]){width:100%;}&[data-inline]{display:inline-block;width:auto;vertical-align:middle;[data-inline] + &{margin-bottom:0;&:not([data-prepend]){margin-left:", ";}}}&[data-icon-only='true']{padding:0 ", ";min-width:", ";&[data-size='small']{padding:0 2px;min-width:", ";}&[data-size='large']{padding:0 8px;min-width:", ";}", "{padding-right:0;color:", ";}&[disabled]{", "{color:", ";}}}"], Object(themes_["variable"])('Button', 'paddingSmall'), Object(themes_["variable"])('Button', 'paddingLarge'), Object(themes_["variable"])('lineHeight'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('fontSize'), Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('inputHeightSmall'), Object(themes_["variable"])('fontSize'), Object(themes_["variable"])('fontSizeLarge'), Object(themes_["variable"])('inputHeightLarge'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('Button', 'iconOnlyPadding'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('inputHeightSmall'), Object(themes_["variable"])('inputHeightLarge'),
/* sc-sel */
StyledIcon, Object(themes_["variable"])('Button', 'iconOnlyColor'),
/* sc-sel */
StyledIcon, Object(themes_["variable"])('Button', 'iconOnlyDisabledColor'));
var StyledContentWrapper = external_styled_components_default.a.span.withConfig({
  displayName: "ButtonStyles__StyledContentWrapper",
  componentId: "sc-1py1q27-2"
})(["display:flex;flex-direction:row;justify-content:center;align-items:center;max-width:100%;[data-appearance='primary'] > &,[data-error] > &{padding:1px;}[data-appearance='primary'] > &{", "{color:", ";}}:focus > &,:active > &{position:relative;left:0;top:0;}"],
/* sc-sel */
StyledIcon, Object(themes_["variable"])('Button', 'primaryIconColor'));
var StyledLabel = external_styled_components_default.a.span.withConfig({
  displayName: "ButtonStyles__StyledLabel",
  componentId: "sc-1py1q27-3"
})(["text-overflow:ellipsis;overflow:hidden;flex:0 1 auto;&:not(:last-child){padding-right:", ";}[data-is-menu] > ", " > &{flex:1 1 auto;text-align:left;}"], Object(themes_["variable"])('Button', 'iconPaddingRight'),
/* sc-sel */
StyledContentWrapper);

// CONCATENATED MODULE: ./src/Button/Button.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Button_Button =
/*#__PURE__*/
function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Button)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          label = _this$props.label,
          icon = _this$props.icon,
          value = _this$props.value,
          action = _this$props.action,
          onClick = _this$props.onClick;
      onClick(e, {
        label: label,
        icon: icon,
        value: value,
        action: action
      });
    });

    return _this;
  }

  _createClass(Button, [{
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
      var _this2 = this;

      var _this$props2 = this.props,
          action = _this$props2.action,
          className = _this$props2.className,
          classNamePrivate = _this$props2.classNamePrivate,
          error = _this$props2.error,
          icon = _this$props2.icon,
          inline = _this$props2.inline,
          isMenu = _this$props2.isMenu,
          onClick = _this$props2.onClick,
          openInNewContext = _this$props2.openInNewContext,
          size = _this$props2.size,
          value = _this$props2.value;
      var _this$props3 = this.props,
          children = _this$props3.children,
          label = _this$props3.label;

      if (!label && Object(external_lodash_["isString"])(children)) {
        label = children;
        children = null;
      }

      return external_react_default.a.createElement(StyledButtonSimple, _extends({
        "aria-haspopup": isMenu || null,
        "aria-invalid": error || null,
        "data-test": "button"
      }, this.props, {
        className: Object(style_["toClassName"])(className, classNamePrivate),
        "data-action": action,
        "data-inline": inline || null,
        "data-is-menu": isMenu || null,
        "data-icon-only": icon && !label && !isMenu && !children,
        "data-size": size,
        status: error ? 'error' : 'normal',
        value: value,
        onClick: onClick ? this.handleClick : null
      }, Object(themes_["ref"])(function (c) {
        return _this2.component = c;
      }), {
        openInNewContext: openInNewContext
      }), external_react_default.a.createElement(StyledContentWrapper, null, icon && external_react_default.a.createElement(StyledIcon, null, icon), label && external_react_default.a.createElement(StyledLabel, {
        "data-test": "label"
      }, label), children, isMenu && external_react_default.a.createElement(Caret_default.a, {
        size: 0.5,
        screenReaderText: null
      }), openInNewContext && external_react_default.a.createElement(External_default.a, {
        screenReaderText: Object(i18n_["_"])('Open externally'),
        size: 0.8,
        style: {
          verticalAlign: 'baseline'
        }
      })));
    }
  }]);

  return Button;
}(external_react_["Component"]);

_defineProperty(Button_Button, "propTypes", {
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

  /** @private */
  className: external_prop_types_default.a.string,

  /** @private An additional className to add to the button. */
  classNamePrivate: external_prop_types_default.a.string,

  /** Prevents user from clicking the button. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Turns the button red. If you use this prop, apply other error
   * indicators such as an error message, to meet accessibility
   * requirements. */
  error: external_prop_types_default.a.bool,

  /** Applies the text that displays on the button. */
  label: external_prop_types_default.a.node,

  /** Applies an icon to the button. See @splunk/react-icons documentation for
   * more information. */
  icon: external_prop_types_default.a.node,

  /**
   * Restricts the horizontal size of the button. Set `inline` to false to
   * remove the right margin and stretch the button to the full width of
   * its container.  */
  inline: external_prop_types_default.a.bool,

  /** Displays the chevron-down icon to indicate that the button behaves
   * as a menu. */
  isMenu: external_prop_types_default.a.bool,

  /** Prevents callback when the button is disabled. */
  onClick: external_prop_types_default.a.func,

  /** Opens the 'to' link in a new browser tab.  */
  openInNewContext: external_prop_types_default.a.bool,

  /** Removes the left border and border-radius of the button so you can
   * prepend things to it. */
  prepend: external_prop_types_default.a.bool,

  /** Adds the style to make the button appear selected. */
  selected: external_prop_types_default.a.bool,

  /** Adjusts the size of the button. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /** Identifies the url for a link. If set, Splunk UI applies an <a> tag
   * instead of a <button> tag. */
  to: external_prop_types_default.a.string,

  /** Returns a value on click. Use when composing or testing. */
  value: external_prop_types_default.a.any
});

_defineProperty(Button_Button, "defaultProps", {
  appearance: 'default',
  append: false,
  disabled: false,
  error: false,
  inline: true,
  isMenu: false,
  onClick: null,
  openInNewContext: false,
  prepend: false,
  selected: false,
  size: 'medium'
});

/* harmony default export */ var src_Button_Button = (Button_Button);
// CONCATENATED MODULE: ./src/Button/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Button_Button; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("js/libs/@splunk/ui-utils/style");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("js/libs/@splunk/react-icons/Caret");

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = require("js/libs/@splunk/react-ui/ButtonSimple");

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = require("js/libs/@splunk/react-icons/External");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("js/libs/@splunk/ui-utils/i18n");

/***/ })

/******/ });

});
