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
/******/ 	return __webpack_require__(__webpack_require__.s = 98);
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

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

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

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Scroll");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ }),

/***/ 98:
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

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Concertina/HeadingStyles.js



var StyledClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "HeadingStyles__StyledClickable",
  componentId: "o4z3zk-0"
})(["display:block;width:100%;cursor:pointer;position:relative;padding:6px ", ";line-height:", ";border-radius:0;color:", ";*:not(:first-child) > &[data-position='inner']{border-top:2px solid ", ";}*:not(:last-child) > &[data-position='inner']{border-bottom:2px solid ", ";}& + &:not([data-position='inner']){border-top:2px solid ", ";}&:focus:not([disabled]){box-shadow:", ";}&:not([data-status]){background-color:", ";&:hover:not([disabled]){background-color:", ";}}&[data-status='disabled']{background-color:", ";}&[data-status='error']{background-color:", ";color:", ";&:hover:not([disabled]){background-color:", ";}}&[data-status='warning']{background-color:", ";color:", ";&:hover:not([disabled]){background-color:", ";box-shadow:none;}}"], Object(themes_["variable"])('spacing'), Object(themes_["variable"])('lineHeight'), Object(themes_["variable"])('Concertina', 'Heading', 'clickableColor'), Object(themes_["variable"])('backgroundColor'), Object(themes_["variable"])('backgroundColor'), Object(themes_["variable"])('backgroundColor'), Object(themes_["variable"])('focusShadowInset'), Object(themes_["variable"])('Concertina', 'Heading', 'clickableBackgroundColor'), Object(themes_["variable"])('Concertina', 'Heading', 'clickableHoverBackgroundColor'), Object(themes_["variable"])('Concertina', 'Heading', 'clickableDisabledBackgroundColor'), Object(themes_["variable"])('errorColor'), Object(themes_["variable"])('white'), Object(themes_["variable"])('errorColorD10'), Object(themes_["variable"])('warningColor'), Object(themes_["variable"])('white'), Object(themes_["variable"])('warningColorD10'));
var StyledHeadingContent = external_styled_components_default.a.span.withConfig({
  displayName: "HeadingStyles__StyledHeadingContent",
  componentId: "o4z3zk-1"
})(["display:flex;justify-content:space-between;"]);
var StyledDescription = external_styled_components_default.a.span.withConfig({
  displayName: "HeadingStyles__StyledDescription",
  componentId: "o4z3zk-2"
})(["font-size:", ";"], Object(themes_["variable"])('fontSizeSmall'));

// CONCATENATED MODULE: ./src/Concertina/Heading.jsx
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







var Heading_Heading =
/*#__PURE__*/
function (_Component) {
  _inherits(Heading, _Component);

  function Heading() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Heading);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Heading)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      _this.props.onClick(e, {
        index: _this.props.index,
        panelId: _this.props.panelId,
        position: _this.props.position
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (container) {
      _this.container = container;
    });

    return _this;
  }

  _createClass(Heading, [{
    key: "focus",
    value: function focus() {
      this.container.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          description = _this$props.description,
          panelId = _this$props.panelId,
          position = _this$props.position,
          status = _this$props.status;
      return external_react_default.a.createElement(StyledClickable, _extends({
        "data-status": status === 'normal' ? null : status,
        disabled: status === 'disabled',
        "data-position": position,
        onClick: this.handleClick
      }, Object(themes_["ref"])(this.handleMount), {
        "data-test": "heading",
        "data-test-panel-id": panelId
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Heading.propTypes))), external_react_default.a.createElement(StyledHeadingContent, null, external_react_default.a.createElement("span", {
        "data-concertina-role": "title"
      }, children), description && external_react_default.a.createElement(StyledDescription, {
        "data-concertina-role": "description"
      }, description)));
    }
  }]);

  return Heading;
}(external_react_["Component"]);

_defineProperty(Heading_Heading, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node.isRequired,

  /** Text to place to the right of the title */
  description: external_prop_types_default.a.string,

  /** @private */
  index: external_prop_types_default.a.number.isRequired,

  /** @private */
  onClick: external_prop_types_default.a.func.isRequired,

  /** @private */
  panelId: external_prop_types_default.a.string.isRequired,

  /** @private */
  position: external_prop_types_default.a.oneOf(['top', 'inner', 'bottom']),

  /** The panel can be in an warning, error or disabled state. */
  status: external_prop_types_default.a.oneOf(['normal', 'warning', 'error', 'disabled'])
});

_defineProperty(Heading_Heading, "defaultProps", {
  position: 'inner'
});

/* harmony default export */ var Concertina_Heading = (Heading_Heading);
// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/Scroll"
var Scroll_ = __webpack_require__(41);
var Scroll_default = /*#__PURE__*/__webpack_require__.n(Scroll_);

// CONCATENATED MODULE: ./src/Concertina/ConcertinaStyles.js




var StyledScroll = external_styled_components_default()(Scroll_default.a).withConfig({
  displayName: "ConcertinaStyles__StyledScroll",
  componentId: "sc-1an5gr2-0"
})(["position:absolute;left:0;top:0;right:0;bottom:0;"]);
var StyledBox = external_styled_components_default()(StyledScroll.withComponent(Box_default.a)).withConfig({
  displayName: "ConcertinaStyles__StyledBox",
  componentId: "sc-1an5gr2-1"
})(["overflow:hidden;"]);
var StyledTop = external_styled_components_default.a.div.withConfig({
  displayName: "ConcertinaStyles__StyledTop",
  componentId: "sc-1an5gr2-2"
})(["position:absolute;left:0;top:0;right:0;z-index:1;background-color:", ";&::after{content:'';position:absolute;bottom:-10px;height:10px;left:0;right:0;background-image:linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0));}"], Object(themes_["variable"])('backgroundColor'));
var StyledBottom = external_styled_components_default.a.div.withConfig({
  displayName: "ConcertinaStyles__StyledBottom",
  componentId: "sc-1an5gr2-3"
})(["position:absolute;left:0;bottom:0;right:0;background-color:", ";&::before{content:'';position:absolute;top:-5px;height:5px;left:0;right:0;background-image:linear-gradient(0deg,rgba(0,0,0,0.15),rgba(0,0,0,0));}"], Object(themes_["variable"])('backgroundColor'));
var StyledPanelBody = external_styled_components_default.a.div.withConfig({
  displayName: "ConcertinaStyles__StyledPanelBody",
  componentId: "sc-1an5gr2-4"
})([":not([data-status]) > &{background-color:", ";}[data-status='error'] > &{background-color:", ";}[data-status='warning'] > &{background-color:", ";}[data-status='disabled'] > &{display:none;}"], Object(themes_["variable"])('backgroundColor'), Object(themes_["variable"])('Concertina', 'panelBodyErrorBackgroundColor'), Object(themes_["variable"])('Concertina', 'panelBodyWarningBackgroundColor'));

// CONCATENATED MODULE: ./src/Concertina/Panel.jsx
function Panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Panel_typeof = function _typeof(obj) { return typeof obj; }; } else { Panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Panel_typeof(obj); }

function Panel_extends() { Panel_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Panel_extends.apply(this, arguments); }

function Panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) Panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) Panel_defineProperties(Constructor, staticProps); return Constructor; }

function Panel_possibleConstructorReturn(self, call) { if (call && (Panel_typeof(call) === "object" || typeof call === "function")) { return call; } return Panel_assertThisInitialized(self); }

function Panel_getPrototypeOf(o) { Panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Panel_getPrototypeOf(o); }

function Panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Panel_setPrototypeOf(subClass, superClass); }

function Panel_setPrototypeOf(o, p) { Panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Panel_setPrototypeOf(o, p); }

function Panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var Panel_Panel =
/*#__PURE__*/
function (_Component) {
  Panel_inherits(Panel, _Component);

  function Panel(props) {
    var _getPrototypeOf2;

    var _this;

    Panel_classCallCheck(this, Panel);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Panel_possibleConstructorReturn(this, (_getPrototypeOf2 = Panel_getPrototypeOf(Panel)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Panel_defineProperty(Panel_assertThisInitialized(Panel_assertThisInitialized(_this)), "measureHeight", function (e) {
      _this.delayUpdate();

      if (!_this.state.containerEl) {
        return;
      }

      var newHeight = _this.state.containerEl.clientHeight;

      if (newHeight === _this.lastHeight) {
        return;
      }

      var data = {
        panelId: _this.props.panelId,
        index: _this.props.index,
        height: _this.state.containerEl.offsetHeight,
        headingHeight: _this.state.containerEl.offsetHeight - _this.state.bodyEl.offsetHeight
      };
      _this.lastHeight = newHeight;

      _this.props.onChange(e, data);
    });

    Panel_defineProperty(Panel_assertThisInitialized(Panel_assertThisInitialized(_this)), "handleMount", function (containerEl) {
      _this.setState({
        containerEl: containerEl
      });

      _this.props.elementRef(containerEl);
    });

    Panel_defineProperty(Panel_assertThisInitialized(Panel_assertThisInitialized(_this)), "handleHeadingMount", function (heading) {
      _this.setState({
        heading: heading
      });
    });

    Panel_defineProperty(Panel_assertThisInitialized(Panel_assertThisInitialized(_this)), "handleBodyMount", function (bodyEl) {
      _this.setState({
        bodyEl: bodyEl
      });
    });

    _this.state = {};
    return _this;
  }

  Panel_createClass(Panel, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.children !== prevProps.children || !prevState.containerEl) {
        this.measureHeight();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
    }
  }, {
    key: "delayUpdate",
    value: function delayUpdate() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = Object(external_lodash_["delay"])(this.measureHeight, 300);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.state.heading.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          description = _this$props.description,
          elementRef = _this$props.elementRef,
          index = _this$props.index,
          onHeadingClick = _this$props.onHeadingClick,
          onChange = _this$props.onChange,
          panelId = _this$props.panelId,
          status = _this$props.status,
          style = _this$props.style,
          title = _this$props.title;
      return external_react_default.a.createElement("div", Panel_extends({
        ref: this.handleMount,
        "data-status": status,
        "data-test": "panel",
        "data-test-panel-id": panelId
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Panel.propTypes))), external_react_default.a.createElement(Concertina_Heading, {
        onClick: onHeadingClick,
        ref: this.handleHeadingMount,
        description: description,
        index: index,
        panelId: panelId,
        position: "inner",
        status: status
      }, title), external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: window,
        onResize: this.measureHeight
      }), external_react_default.a.createElement(StyledPanelBody, Panel_extends({
        "data-test": "body",
        style: style
      }, Object(themes_["ref"])(this.handleBodyMount)), children));
    }
  }]);

  return Panel;
}(external_react_["Component"]);

Panel_defineProperty(Panel_Panel, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /** Displays right-aligned text in the title bar of the `panel`. */
  description: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private */
  index: external_prop_types_default.a.number,

  /** @private */
  onHeadingClick: external_prop_types_default.a.func,

  /** @private */
  onChange: external_prop_types_default.a.func,

  /** An optional id that will be displayed in the markup for testing. */
  panelId: external_prop_types_default.a.string,

  /** @private */
  style: external_prop_types_default.a.object,

  /**
   * Set the state of a `panel` to 'error' (red), 'warning' (yellow), or 'disabled' (grey).
   * Disabled panels do not allow user interaction, and do not display content.
   */
  status: external_prop_types_default.a.oneOf(['normal', 'warning', 'error', 'disabled']),

  /**
   * Displays left-aligned title text in the title bar of the `panel`.
   */
  title: external_prop_types_default.a.node.isRequired
});

Panel_defineProperty(Panel_Panel, "defaultProps", {
  elementRef: function elementRef() {},
  onHeadingClick: function onHeadingClick() {},
  onChange: function onChange() {},
  status: 'normal'
});

/* harmony default export */ var Concertina_Panel = (Panel_Panel);
// CONCATENATED MODULE: ./src/Concertina/Concertina.jsx
function Concertina_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Concertina_typeof = function _typeof(obj) { return typeof obj; }; } else { Concertina_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Concertina_typeof(obj); }

function Concertina_extends() { Concertina_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Concertina_extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Concertina_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Concertina_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Concertina_createClass(Constructor, protoProps, staticProps) { if (protoProps) Concertina_defineProperties(Constructor.prototype, protoProps); if (staticProps) Concertina_defineProperties(Constructor, staticProps); return Constructor; }

function Concertina_possibleConstructorReturn(self, call) { if (call && (Concertina_typeof(call) === "object" || typeof call === "function")) { return call; } return Concertina_assertThisInitialized(self); }

function Concertina_getPrototypeOf(o) { Concertina_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Concertina_getPrototypeOf(o); }

function Concertina_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Concertina_setPrototypeOf(subClass, superClass); }

function Concertina_setPrototypeOf(o, p) { Concertina_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Concertina_setPrototypeOf(o, p); }

function Concertina_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Concertina_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var Concertina_Concertina =
/*#__PURE__*/
function (_Component) {
  Concertina_inherits(Concertina, _Component);

  function Concertina(props) {
    var _getPrototypeOf2;

    var _this;

    Concertina_classCallCheck(this, Concertina);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Concertina_possibleConstructorReturn(this, (_getPrototypeOf2 = Concertina_getPrototypeOf(Concertina)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "handleUpdate", function (e, data) {
      _this.panelPositions[data.index] = data;
      var total = 0;

      _this.panelPositions.forEach(function (panel) {
        // eslint-disable-next-line no-param-reassign
        panel.offsetTop = total;
        total += panel.height || 0;
      });

      _this.updateHeadings();
    });

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "handleElementMount", function (scrollEl) {
      _this.setState({
        scrollEl: scrollEl
      }); // The scrollEl gets unmounted during the animation, it's necessary to cache the
      // recorded height until it is remounted.


      if (scrollEl) {
        _this.setState({
          innerWidth: scrollEl.clientWidth
        });
      }
    });

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "handleResize", function () {
      _this.setState(function (state) {
        return {
          innerWidth: state.scrollEl.clientWidth
        };
      });
    });

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "handleScroll", function () {
      _this.updateHeadings();
    });

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "handleScrollComplete", function () {
      _this.setState({
        targetTop: undefined
      });
    });

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "handleClick", function (e, _ref) {
      var index = _ref.index,
          position = _ref.position;
      var scrollEl = _this.state.scrollEl;
      var headingsBeforeHeight = Object(external_lodash_["take"])(_this.panelPositions, index).map(function (item) {
        return item.headingHeight;
      }).reduce(function (a, b) {
        return a + b;
      }, 0); // sum the heights

      var headingsAfterHeight = Object(external_lodash_["takeRight"])(_this.panelPositions, _this.panelPositions.length - index - 1).map(function (item) {
        return item.headingHeight;
      }).reduce(function (a, b) {
        return a + b;
      }, 0); // sum the heights

      var availableHeight = scrollEl.clientHeight - headingsBeforeHeight - headingsAfterHeight;
      var panelHeight = _this.panelPositions[index].height;
      var topPosition = _this.panelPositions[index].offsetTop - headingsBeforeHeight;
      var bottomPosition = topPosition - (availableHeight - panelHeight);
      var shouldPartlyPopUp = availableHeight > panelHeight && (position === 'bottom' || position === 'inner'); // if the entire panel is in view, do nothing

      if (shouldPartlyPopUp && bottomPosition < scrollEl.scrollTop) {
        return;
      }

      var targetTop = shouldPartlyPopUp ? bottomPosition : topPosition; // handleRest will shift focus;

      if (position !== 'inner') {
        e.currentTarget.blur();
      }

      _this.setState({
        targetTop: targetTop
      });
    });

    Concertina_defineProperty(Concertina_assertThisInitialized(Concertina_assertThisInitialized(_this)), "updateHeadings", function () {
      var scrollEl = _this.state.scrollEl;

      if (!scrollEl) {
        return;
      }

      var top = scrollEl.scrollTop;

      function reduceTop(show, panel) {
        if (panel.offsetTop < top) {
          top += panel.headingHeight;
          return show + 1;
        }

        return show;
      }

      var bottom = top + scrollEl.clientHeight;

      function reduceBottom(show, panel) {
        if (panel.offsetTop + panel.headingHeight > bottom) {
          bottom -= panel.headingHeight;
          return show + 1;
        }

        return show;
      }

      _this.setState({
        panelsTopCount: _this.panelPositions.reduce(reduceTop, 0),
        panelsBottomCount: _this.panelPositions.reduceRight(reduceBottom, 0)
      });
    });

    _this.state = {
      panelsTopCount: 0,
      panelsBottomCount: 0,
      innerWidth: '100%'
    };
    _this.panelPositions = [];
    _this.updateHeadings = Object(external_lodash_["debounce"])(_this.updateHeadings, 0);
    return _this;
  }

  Concertina_createClass(Concertina, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.updateHeadings.cancel();
    }
  }, {
    key: "renderHeadings",
    value: function renderHeadings(items, position) {
      var _this2 = this;

      var headings = external_react_["Children"].toArray(items).map(function (item) {
        return external_react_default.a.createElement(Concertina_Heading, {
          onClick: _this2.handleClick,
          description: item.props.description,
          panelId: item.props.panelId,
          index: item.props.index,
          position: position,
          status: item.props.status,
          key: item.props.panelId,
          tabIndex: -1
        }, item.props.title);
      });
      return headings;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          children = _this$props.children,
          otherProps = _objectWithoutProperties(_this$props, ["children"]);

      var childrenCleaned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (item, i) {
        return Object(external_react_["cloneElement"])(item, {
          panelId: item.props.panelId || "".concat(i),
          index: i,
          onHeadingClick: _this3.handleClick,
          onChange: _this3.handleUpdate
        });
      });
      var topPanels = Object(external_lodash_["take"])(childrenCleaned, this.state.panelsTopCount);
      var bottomPanels = Object(external_lodash_["takeRight"])(childrenCleaned, this.state.panelsBottomCount);
      return external_react_default.a.createElement(StyledBox, Concertina_extends({
        "data-test": "concertina"
      }, otherProps), external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: "window",
        onResize: this.handleResize
      }), this.state.panelsTopCount > 0 && external_react_default.a.createElement(StyledTop, {
        style: {
          width: this.state.innerWidth
        },
        "data-test": "dock-top"
      }, this.renderHeadings(topPanels, 'top')), external_react_default.a.createElement(StyledScroll, {
        onScroll: this.handleScroll,
        stopScrollPropagation: true,
        key: "scroll-container",
        elementRef: this.handleElementMount,
        "data-test": "scroll",
        top: this.state.targetTop,
        onScrollComplete: this.handleScrollComplete
      }, childrenCleaned), this.state.panelsBottomCount > 0 && external_react_default.a.createElement(StyledBottom, {
        style: {
          width: this.state.innerWidth
        },
        "data-test": "dock-bottom"
      }, this.renderHeadings(bottomPanels, 'bottom')));
    }
  }]);

  return Concertina;
}(external_react_["Component"]);

Concertina_defineProperty(Concertina_Concertina, "propTypes", {
  /**
   * `Concertina` `children` must be `Concertina.Panel`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func
});

Concertina_defineProperty(Concertina_Concertina, "Panel", Concertina_Panel);

/* harmony default export */ var src_Concertina_Concertina = (Concertina_Concertina);

// CONCATENATED MODULE: ./src/Concertina/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Concertina_Concertina; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Panel", function() { return Concertina_Panel; });



/***/ })

/******/ });