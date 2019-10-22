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
/******/ 	return __webpack_require__(__webpack_require__.s = 142);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/id");

/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 142:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

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

// CONCATENATED MODULE: ./src/Tooltip/TooltipStyles.js



var size = '16px';
var Styled = external_styled_components_default.a.span.withConfig({
  displayName: "TooltipStyles__Styled",
  componentId: "sc-1we6bww-0"
})(["", ";"], Object(themes_["mixin"])('reset')('block'));
var StyledInline = external_styled_components_default.a.span.withConfig({
  displayName: "TooltipStyles__StyledInline",
  componentId: "sc-1we6bww-1"
})(["", ";"], Object(themes_["mixin"])('reset')('inline-block'));
var StyledToggle = external_styled_components_default.a.span.withConfig({
  displayName: "TooltipStyles__StyledToggle",
  componentId: "sc-1we6bww-2"
})(["display:block;"]);
var StyledToggleInline = external_styled_components_default.a.span.withConfig({
  displayName: "TooltipStyles__StyledToggleInline",
  componentId: "sc-1we6bww-3"
})(["display:inline-block;"]);
var StyledContent = external_styled_components_default.a.div.withConfig({
  displayName: "TooltipStyles__StyledContent",
  componentId: "sc-1we6bww-4"
})(["padding:", ";font-size:", ";line-height:18px;"], Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('fontSizeSmall'));
var StyledLink = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "TooltipStyles__StyledLink",
  componentId: "sc-1we6bww-5"
})(["display:inline-block;width:", ";height:", ";border:2px solid ", ";border-radius:", ";font-size:", ";font-weight:", ";line-height:calc(", " - 2px);text-align:center;color:", ";vertical-align:baseline;cursor:default;&:not([disabled]){&:hover{text-decoration:none;}&:focus{box-shadow:", ";}}"], size, size, Object(themes_["variable"])('linkColor'), size, Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('fontWeightSemiBold'), size, Object(themes_["variable"])('Tooltip', 'linkColor'), Object(themes_["variable"])('focusShadow'));

// CONCATENATED MODULE: ./src/Tooltip/Tooltip.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









/**
 * The Tooltip component wraps arbitrary content to be displayed when the target element is hovered
 * or focused.
 */

var Tooltip_Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tooltip)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      // Handle mouseenter and mouseleave with native events due to current issues with how they
      // are handled by react. See https://github.com/facebook/react/issues/4251 and SUI-1232.
      if (el) {
        el.addEventListener('mouseenter', _this.handleMouseEnter);
        el.addEventListener('mouseleave', _this.handleMouseLeave);
      } else if (_this.state.anchor) {
        _this.state.anchor.removeEventListener('mouseenter', _this.handleMouseEnter);

        _this.state.anchor.removeEventListener('mouseleave', _this.handleMouseLeave);
      }

      _this.setState({
        anchor: el
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseEnter", function (e) {
      _this.handleRequestOpen(e, {
        reason: 'mouseEnterToggle'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function (e) {
      _this.handleRequestOpen(e, {
        reason: 'focusToggle'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseLeave", function (e) {
      _this.handleRequestClose(e, {
        reason: 'mouseLeaveToggle'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function (e) {
      _this.handleRequestClose(e, {
        reason: 'blurToggle'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePopoverOnRequestClose", function (data) {
      _this.handleRequestClose(null, data);
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'open');
    _this.popoverId = Object(id_["createDOMID"])('popover');
    _this.ariaDescriptionId = Object(id_["createDOMID"])('aria-description');
    _this.state = {
      open: false,
      anchor: null
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (false) {}
    }
  }, {
    key: "handleRequestClose",
    value: function handleRequestClose(e, data) {
      if (!this.isControlled()) {
        this.setState({
          open: false
        });
      }

      this.props.onRequestClose(e, data);
    }
  }, {
    key: "handleRequestOpen",
    value: function handleRequestOpen(e, data) {
      if (!this.isControlled()) {
        this.setState({
          open: true
        });
      }

      this.props.onRequestOpen(e, data);
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          content = _this$props.content,
          elementRef = _this$props.elementRef,
          inline = _this$props.inline,
          onRequestClose = _this$props.onRequestClose,
          onRequestOpen = _this$props.onRequestOpen,
          open = _this$props.open,
          defaultPlacement = _this$props.defaultPlacement,
          otherProps = _objectWithoutProperties(_this$props, ["children", "content", "elementRef", "inline", "onRequestClose", "onRequestOpen", "open", "defaultPlacement"]);

      var anchor = this.state.anchor;
      var hasContent = !!content;
      var openRender = !!anchor && this.isControlled() ? open : hasContent && this.state.open;
      var StyledComp = inline ? StyledInline : Styled;
      var StyledToggleComp = inline ? StyledToggleInline : StyledToggle;
      return external_react_default.a.createElement(StyledComp, _extends({
        "data-test": "tooltip",
        "data-test-open": openRender,
        "data-test-popover-id": this.popoverId
      }, Object(themes_["ref"])(elementRef), otherProps), external_react_default.a.createElement(StyledToggleComp, _extends({
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }, Object(themes_["ref"])(this.handleMount), {
        "data-test": "toggle"
      }), hasContent && Object(external_react_["isValidElement"])(children) ? Object(external_react_["cloneElement"])(children, {
        describedBy: this.ariaDescriptionId
      }) : children, hasContent && !children && external_react_default.a.createElement(StyledLink, {
        "aria-describedby": this.ariaDescriptionId,
        "aria-controls": openRender ? this.popoverId : undefined
      }, "?"), hasContent && external_react_default.a.createElement(ScreenReaderContent_default.a, {
        id: this.ariaDescriptionId
      }, content)), external_react_default.a.createElement(Popover_default.a, {
        align: "center",
        anchor: anchor,
        appearance: "dark",
        closeReasons: ['offScreen'],
        defaultPlacement: defaultPlacement,
        id: this.popoverId,
        open: openRender,
        onRequestClose: this.handlePopoverOnRequestClose
      }, external_react_default.a.createElement(StyledContent, null, content)));
    }
  }]);

  return Tooltip;
}(external_react_["Component"]);

_defineProperty(Tooltip_Tooltip, "propTypes", {
  /**
   * Provide a node to replace the default question mark.
   * For accessibility, ensure that the child:
   * * Can take focus
   * * Accepts a `describedBy` string prop and places it as `aria-describedby`
   * on the appropriate internal element
   */
  children: external_prop_types_default.a.node,

  /**
   * The content of the tooltip. If the content is falsy and the `open` prop
   * is uncontrolled, the tooltip will never display.
   */
  content: external_prop_types_default.a.node,

  /**
   * The default placement of the `Tooltip`. It may render in a different location if there is
   * not enough space in the default direction.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'left', 'right']),

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Set inline to false when adding a tooltip to a block element.
   */
  inline: external_prop_types_default.a.bool,

  /**
   * Callback function fired when the popover is requested to be closed.
   *
   * @param {event} event Can be `null` depending on the reason the tooltip is closing.
   * @param {object} data
   * @param {string} data.reason The reason for the close request.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * Callback function fired when the popover is requested to be opened.
   *
   * @param {event} event
   * @param {object} data
   * @param {string} data.reason The reason for the open request.
   */
  onRequestOpen: external_prop_types_default.a.func,

  /**
   * Whether or not the tooltip is shown. Setting this value makes the property controlled.
   * The onRequestClose and onRequestOpen callbacks are usually used.
   */
  open: external_prop_types_default.a.bool
});

_defineProperty(Tooltip_Tooltip, "defaultProps", {
  defaultPlacement: 'above',
  inline: true,
  onRequestClose: function onRequestClose() {},
  onRequestOpen: function onRequestOpen() {}
});

/* harmony default export */ var src_Tooltip_Tooltip = (Tooltip_Tooltip);
// CONCATENATED MODULE: ./src/Tooltip/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Tooltip_Tooltip; });


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Popover");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ })

/******/ });