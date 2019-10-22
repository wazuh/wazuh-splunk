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
/******/ 	return __webpack_require__(__webpack_require__.s = 122);
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

/***/ 122:
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

// EXTERNAL MODULE: external "@splunk/react-ui/ModalLayer"
var ModalLayer_ = __webpack_require__(45);
var ModalLayer_default = /*#__PURE__*/__webpack_require__.n(ModalLayer_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/TransitionOpen"
var TransitionOpen_ = __webpack_require__(35);
var TransitionOpen_default = /*#__PURE__*/__webpack_require__.n(TransitionOpen_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/SidePanel/SidePanelStyles.js



var panel = Object(external_styled_components_["css"])(["", ";position:fixed;display:flex;box-shadow:0 0 12px rgba(0,0,0,0.3);flex-direction:column;background-color:", ";z-index:", ";"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('SidePanel', 'panelBackgroundColor'), Object(themes_["variable"])('zindexModal'));
var StyledLeftPanelTransitionOpen = external_styled_components_default()(TransitionOpen_default.a).withConfig({
  displayName: "SidePanelStyles__StyledLeftPanelTransitionOpen",
  componentId: "e3op2b-0"
})(["", ";top:0;left:0;height:100vh;"], panel);
var StyledRightPanelTransitionOpen = external_styled_components_default()(TransitionOpen_default.a).withConfig({
  displayName: "SidePanelStyles__StyledRightPanelTransitionOpen",
  componentId: "e3op2b-1"
})(["", ";right:0;top:0;height:100vh;"], panel);
var StyledTopPanelTransitionOpen = external_styled_components_default()(TransitionOpen_default.a).withConfig({
  displayName: "SidePanelStyles__StyledTopPanelTransitionOpen",
  componentId: "e3op2b-2"
})(["", ";top:0;left:0;width:100vw;"], panel);
var StyledBottomPanelTransitionOpen = external_styled_components_default()(TransitionOpen_default.a).withConfig({
  displayName: "SidePanelStyles__StyledBottomPanelTransitionOpen",
  componentId: "e3op2b-3"
})(["", ";left:0;bottom:0;width:100vw;"], panel);

// CONCATENATED MODULE: ./src/SidePanel/SidePanel.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var animationMap = {
  left: 'slideFromLeft',
  right: 'slideFromRight',
  top: 'slideFromTop',
  bottom: 'slideFromBottom'
};

var SidePanel_SidePanel =
/*#__PURE__*/
function (_Component) {
  _inherits(SidePanel, _Component);

  _createClass(SidePanel, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.open !== state.prevOpen) {
        return {
          panelAnimating: true,
          prevOpen: props.open
        };
      }

      return null;
    }
  }]);

  function SidePanel(props) {
    var _this;

    _classCallCheck(this, SidePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SidePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePanelAnimationEnd", function () {
      _this.setState({
        panelAnimating: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderModal", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          dockPosition = _this$props.dockPosition,
          innerClassName = _this$props.innerClassName,
          innerStyle = _this$props.innerStyle,
          outerClassName = _this$props.outerClassName,
          outerStyle = _this$props.outerStyle;
      var StyledTransitionOpen = {
        left: StyledLeftPanelTransitionOpen,
        right: StyledRightPanelTransitionOpen,
        top: StyledTopPanelTransitionOpen,
        bottom: StyledBottomPanelTransitionOpen
      }[dockPosition];
      var defaultInnerStyle = dockPosition === 'left' || dockPosition === 'right' ? {
        height: '100%'
      } : {
        width: '100%'
      };
      return external_react_default.a.createElement(StyledTransitionOpen, _extends({
        "data-test": "side-panel",
        animation: animationMap[dockPosition],
        animateOnMount: true,
        innerClassName: innerClassName,
        innerStyle: _objectSpread({}, defaultInnerStyle, innerStyle),
        onAnimationEnd: _this.handlePanelAnimationEnd,
        open: _this.props.open,
        outerClassName: outerClassName,
        outerStyle: outerStyle,
        retainFocus: true,
        role: "dialog",
        takeFocus: true,
        tabIndex: -1
      }, Object(external_lodash_["omit"])(_this.props, Object(external_lodash_["keys"])(SidePanel.propTypes))), children);
    });

    _this.state = {
      panelAnimating: false,
      prevOpen: props.open
    };
    return _this;
  }

  _createClass(SidePanel, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          open = _this$props2.open,
          onRequestClose = _this$props2.onRequestClose,
          useLayerForClickAway = _this$props2.useLayerForClickAway;
      var panelAnimating = this.state.panelAnimating;
      return external_react_default.a.createElement(ModalLayer_default.a, {
        childrenInAnimation: panelAnimating,
        open: open,
        onRequestClose: onRequestClose,
        renderModal: this.renderModal,
        useLayerForClickAway: useLayerForClickAway
      });
    }
  }]);

  return SidePanel;
}(external_react_["Component"]);

_defineProperty(SidePanel_SidePanel, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * The position of the panel on the screen.
   */
  dockPosition: external_prop_types_default.a.oneOf(['top', 'bottom', 'left', 'right']),

  /**
   * The inner element can control the width of the side bar when placed left or right, and
   * the height when placed top or bottom.
   */
  innerClassName: external_prop_types_default.a.string,

  /**
   * The inner element can control the width of the side bar when placed left or right, and
   * the height when placed top or bottom.
   */
  innerStyle: external_prop_types_default.a.object,

  /**
   * A function that will be called when a close event occurs. The callback will be passed a
   * reason and the event.
   *
   * Generally, this callback should be used to togle the `open` prop.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * Indicates the current open state of the panel.
   */
  open: external_prop_types_default.a.bool,

  /**
   * The outer element grows to the width of the side bar when placed left or right, or
   * the height when placed top or bottom. It has minimal styles:
   * a white background and a box shadow. Adding styles to this container
   * could be useful when the sidebar should be shorter than the width or height of the page,
   * or multiple sidebars are shown.
   */
  outerClassName: external_prop_types_default.a.string,

  /**
   * The outer element grows to the width of the side bar when placed left or right, or
   * the height when placed top or bottom. It has minimal styles:
   * a white background and a box shadow. Adding styles to this container
   * could be useful when the sidebar should be shorter than the width or height of the page,
   * or multiple sidebars are shown.
   */
  outerStyle: external_prop_types_default.a.object,

  /**
   * Indicates whether to add an overlay mask on the whole page, blocking other interactions
   * while the panel is open.
   */
  useLayerForClickAway: external_prop_types_default.a.bool
});

_defineProperty(SidePanel_SidePanel, "defaultProps", {
  open: false,
  dockPosition: 'right',
  onRequestClose: function onRequestClose() {},
  useLayerForClickAway: true
});

/* harmony default export */ var src_SidePanel_SidePanel = (SidePanel_SidePanel);
// CONCATENATED MODULE: ./src/SidePanel/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_SidePanel_SidePanel; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

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

/***/ 45:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ModalLayer");

/***/ })

/******/ });