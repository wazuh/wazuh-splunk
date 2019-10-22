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
/******/ 	return __webpack_require__(__webpack_require__.s = 149);
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

/***/ 149:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/TransitionOpen"
var TransitionOpen_ = __webpack_require__(35);
var TransitionOpen_default = /*#__PURE__*/__webpack_require__.n(TransitionOpen_);

// EXTERNAL MODULE: external "@splunk/react-icons/ChevronRight"
var ChevronRight_ = __webpack_require__(24);
var ChevronRight_default = /*#__PURE__*/__webpack_require__.n(ChevronRight_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/CollapsiblePanel/CollapsiblePanelStyles.js




var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "CollapsiblePanelStyles__StyledBox",
  componentId: "sc-1m68fm5-0"
})(["display:flex;flex-direction:column;min-height:", ";background-color:", ";> button{transition:background 0.2s,border 0.2s,box-shadow 0.2s;}& + &{margin-top:", ";}"], Object(themes_["variable"])('CollapsiblePanel', 'minHeight'), Object(themes_["variable"])('CollapsiblePanel', 'backgroundColor'), Object(themes_["variable"])('CollapsiblePanel', 'marginTop'));
var StyledIcon = external_styled_components_default.a.span.withConfig({
  displayName: "CollapsiblePanelStyles__StyledIcon",
  componentId: "sc-1m68fm5-1"
})(["position:absolute;left:", ";transition:", ";transform-origin:", ";padding-bottom:", ";"], Object(themes_["variable"])('CollapsiblePanel', 'iconPosition'), Object(themes_["variable"])('CollapsiblePanel', 'iconTransition'), Object(themes_["variable"])('CollapsiblePanel', 'iconTransfromOrigin'), Object(themes_["variable"])('CollapsiblePanel', 'paddingBottom'));
var StyledTitleClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "CollapsiblePanelStyles__StyledTitleClickable",
  componentId: "sc-1m68fm5-2"
})(["width:100%;flex-shrink:0;border-bottom:0;cursor:pointer;position:relative;display:block;padding:", ";line-height:", ";color:", ";background-color:", ";border:", ";box-shadow:", ";&[aria-expanded='false']{background-color:", ";color:", ";border-radius:0;}&[aria-expanded='false'] ", "{transform:", ";}&[aria-expanded='true'] ", "{transform:", ";}&[disabled]{cursor:default;color:", ";}&:focus,&:active{color:", ";border:", ";box-shadow:", ";}&:hover:not([disabled]){color:", ";background-color:", ";}"], Object(themes_["variable"])('CollapsiblePanel', 'titlePadding'), Object(themes_["variable"])('CollapsiblePanel', 'titleLineHeight'), Object(themes_["variable"])('CollapsiblePanel', 'titleClickableColor'), Object(themes_["variable"])('CollapsiblePanel', 'titleBackgroundColor'), Object(themes_["variable"])('CollapsiblePanel', 'titleBorder'), Object(themes_["variable"])('CollapsiblePanel', 'titleShadow'), Object(themes_["variable"])('CollapsiblePanel', 'titleClickableCollapsedBackgroundColor'), Object(themes_["variable"])('CollapsiblePanel', 'titleClickableCollapsedColor'),
/* sc-sel */
StyledIcon, Object(themes_["variable"])('CollapsiblePanel', 'iconTransfromOpen'),
/* sc-sel */
StyledIcon, Object(themes_["variable"])('CollapsiblePanel', 'iconTransfromClose'), Object(themes_["variable"])('textColor'), Object(themes_["variable"])('CollapsiblePanel', 'titleClickableColor'), Object(themes_["variable"])('CollapsiblePanel', 'titleFocusBorder'), Object(themes_["variable"])('CollapsiblePanel', 'titleFocusShadow'), Object(themes_["variable"])('CollapsiblePanel', 'titleClickableColor'), Object(themes_["variable"])('CollapsiblePanel', 'titleClickableHoverBackgroundColor'));
var StyledHeadingContent = external_styled_components_default.a.span.withConfig({
  displayName: "CollapsiblePanelStyles__StyledHeadingContent",
  componentId: "sc-1m68fm5-3"
})(["display:flex;justify-content:space-between;"]);
var StyledDescription = external_styled_components_default.a.span.withConfig({
  displayName: "CollapsiblePanelStyles__StyledDescription",
  componentId: "sc-1m68fm5-4"
})(["font-size:", ";position:", ";right:", ";"], Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('CollapsiblePanel', 'descriptionPosition'), Object(themes_["variable"])('CollapsiblePanel', 'descriptionPositionRight'));

// CONCATENATED MODULE: ./src/CollapsiblePanel/CollapsiblePanel.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var CollapsiblePanel_CollapsiblePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(CollapsiblePanel, _Component);

  function CollapsiblePanel(props) {
    var _this;

    _classCallCheck(this, CollapsiblePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollapsiblePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestClose", function (event) {
      var _this$props = _this.props,
          panelId = _this$props.panelId,
          onRequestClose = _this$props.onRequestClose;
      onRequestClose({
        event: event,
        panelId: panelId,
        reason: 'toggleClick'
      });

      _this.setState(_objectSpread({
        animating: true
      }, !_this.isControlled() ? {
        open: false
      } : {}));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestOpen", function (event) {
      var _this$props2 = _this.props,
          panelId = _this$props2.panelId,
          onRequestOpen = _this$props2.onRequestOpen;
      onRequestOpen({
        event: event,
        panelId: panelId,
        reason: 'toggleClick'
      });

      _this.setState(_objectSpread({
        animating: true
      }, !_this.isControlled() ? {
        open: true
      } : {}));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAnimationEnd", function () {
      _this.setState({
        animating: false
      });
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'open');
    _this.state = {};

    if (!_this.isControlled()) {
      _this.state = {
        open: props.defaultOpen || false
      };
    }

    if (false) {}

    _this.containerId = "container-".concat(Object(id_["createGUID"])());
    _this.toggleId = "toggle-".concat(Object(id_["createGUID"])());
    return _this;
  }

  _createClass(CollapsiblePanel, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.open !== prevProps.open) {
        this.setState({
          animating: true
        }); // eslint-disable-line react/no-did-update-set-state
      }

      if (false) {}

      if (false) {}
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          description = _this$props3.description,
          disabled = _this$props3.disabled,
          elementRef = _this$props3.elementRef,
          title = _this$props3.title,
          headingLevel = _this$props3.headingLevel;
      var animating = this.state.animating;
      var open = this.isControlled() ? this.props.open : this.state.open;
      return external_react_default.a.createElement(StyledBox, _extends({
        "data-test": "collapsible-panel",
        elementRef: elementRef
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(CollapsiblePanel.propTypes))), external_react_default.a.createElement("span", {
        "data-test": "heading",
        role: headingLevel ? 'heading' : null,
        "aria-level": headingLevel
      }, external_react_default.a.createElement(StyledTitleClickable, {
        disabled: disabled,
        onClick: open ? this.handleRequestClose : this.handleRequestOpen,
        id: this.toggleId,
        "aria-controls": this.containerId,
        "aria-expanded": open,
        "data-test": "toggle"
      }, external_react_default.a.createElement(StyledIcon, null, external_react_default.a.createElement(ChevronRight_default.a, {
        screenReaderText: open ? Object(i18n_["_"])('Panel is open') : Object(i18n_["_"])('Panel is closed')
      })), external_react_default.a.createElement(StyledHeadingContent, null, external_react_default.a.createElement("span", {
        "data-test": "title"
      }, title), description && external_react_default.a.createElement(StyledDescription, {
        "data-test": "description"
      }, description)))), external_react_default.a.createElement(TransitionOpen_default.a, {
        outerId: this.containerId,
        "aria-labelledby": this.toggleId,
        "data-test": "body",
        outerStyle: {
          overflow: animating ? 'hidden' : 'auto'
        },
        innerStyle: {
          tableLayout: 'fixed'
        },
        open: open,
        onAnimationEnd: this.handleAnimationEnd
      }, children));
    }
  }]);

  return CollapsiblePanel;
}(external_react_["Component"]);

_defineProperty(CollapsiblePanel_CollapsiblePanel, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Sets the initial state of a panel to expanded. Incompatible with
   `open`; use 'open' or 'defaultOpen', not both.
   */
  defaultOpen: external_prop_types_default.a.bool,

  /** Displays right-aligned text in the title bar of the `panel`. */
  description: external_prop_types_default.a.string,

  /**
   * Prevents the panel from expanding or collapsing.
   */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Sets the `aria-level` of a panel to make heading level fit the outline of the page.
   * If set, the heading element will have `role="heading"`
   */
  headingLevel: external_prop_types_default.a.number,

  /**
   * Identifies a specific panel. Splunk UI uses `panelId` for callbacks
   and managing expanded and collapsed states.
   */
  panelId: external_prop_types_default.a.any,

  /**
   * Invokes a callback when user requests to collapse the panel. Passes
   an object containing the `panelId`.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * Invokes a callback when user requests to expand the panel. Passes an
   object containing the `panelId`.
   */
  onRequestOpen: external_prop_types_default.a.func,

  /**
   * Controls the expanded state of a panel. Incompatible with
   `defaultOpen`; use 'open' or 'defaultOpen', not both.
   */
  open: external_prop_types_default.a.bool,

  /**
   * Displays the name of the `panel` in the panel's title bar.
   */
  title: external_prop_types_default.a.node.isRequired
});

_defineProperty(CollapsiblePanel_CollapsiblePanel, "defaultProps", {
  disabled: false,
  onRequestClose: function onRequestClose() {},
  onRequestOpen: function onRequestOpen() {}
});

/* harmony default export */ var src_CollapsiblePanel_CollapsiblePanel = (CollapsiblePanel_CollapsiblePanel);
// CONCATENATED MODULE: ./src/CollapsiblePanel/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_CollapsiblePanel_CollapsiblePanel; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/ChevronRight");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/TransitionOpen");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });