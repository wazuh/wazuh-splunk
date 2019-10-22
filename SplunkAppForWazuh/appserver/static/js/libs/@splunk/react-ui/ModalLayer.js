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
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
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

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("tinycolor2");

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-motion"
var external_react_motion_ = __webpack_require__(15);

// EXTERNAL MODULE: external "@splunk/react-ui/Motion"
var Motion_ = __webpack_require__(27);
var Motion_default = /*#__PURE__*/__webpack_require__.n(Motion_);

// EXTERNAL MODULE: external "@splunk/react-ui/RenderToLayer"
var RenderToLayer_ = __webpack_require__(36);
var RenderToLayer_default = /*#__PURE__*/__webpack_require__.n(RenderToLayer_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "tinycolor2"
var external_tinycolor2_ = __webpack_require__(12);
var external_tinycolor2_default = /*#__PURE__*/__webpack_require__.n(external_tinycolor2_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/ModalLayer/ModalLayerStyles.js



var overlay = Object(external_styled_components_["css"])(["", ";position:fixed;top:0;right:0;bottom:0;left:0;"], Object(themes_["mixin"])('reset')('block'));
var StyledClickAwayOverlay = external_styled_components_default.a.div.withConfig({
  displayName: "ModalLayerStyles__StyledClickAwayOverlay",
  componentId: "bj2ql8-0"
})(["", ";z-index:", ";background-color:", ";"], overlay, Object(themes_["variable"])('zindexModalBackdrop'), function (props) {
  return external_tinycolor2_default()(Object(themes_["variable"])('ModalLayer', 'backgroundColor')(props)).setAlpha(0.8).toRgbString();
});
var StyledPeekOverlay = external_styled_components_default.a.div.withConfig({
  displayName: "ModalLayerStyles__StyledPeekOverlay",
  componentId: "bj2ql8-1"
})(["", ";z-index:", ";"], overlay, Object(themes_["variable"])('zindexModal'));

// CONCATENATED MODULE: ./src/ModalLayer/ModalLayer.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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








var ModalLayer_ModalLayer =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalLayer, _Component);

  _createClass(ModalLayer, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.open !== state.prevOpen) {
        return {
          animationId: Math.random(),
          // passed to react-motion, must be a number
          prevOpen: props.open
        };
      }

      return null;
    }
  }]);

  function ModalLayer(props) {
    var _this;

    _classCallCheck(this, ModalLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ModalLayer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickAway", function (event) {
      _this.props.onRequestClose({
        reason: 'clickAway',
        event: event
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickUnpeek", function (event) {
      event.preventDefault(); // prevent focus loss

      _this.props.onRequestClose({
        reason: 'clickUnpeek',
        event: event
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAnimationEnd", function () {
      _this.setState({
        animationId: 0
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderLayer", function () {
      var _this$props = _this.props,
          getMotionStyle = _this$props.getMotionStyle,
          getDefaultMotionStyle = _this$props.getDefaultMotionStyle,
          peek = _this$props.peek,
          renderModal = _this$props.renderModal,
          useLayerForClickAway = _this$props.useLayerForClickAway;
      var open = _this.props.open || !!_this.state.animationId;
      var modalOpenOpacity = peek ? 0.1 : 1;
      return external_react_default.a.createElement(Motion_default.a, {
        defaultStyle: _objectSpread({}, getDefaultMotionStyle(), {
          overlayOpacity: 0,
          opacity: 0
        }),
        style: _objectSpread({}, getMotionStyle(), {
          overlayOpacity: Object(external_react_motion_["spring"])(_this.props.open && !peek ? 1 : 0, {
            precision: 1
          }),
          opacity: Object(external_react_motion_["spring"])(_this.props.open ? modalOpenOpacity : 0, {
            precision: 1
          }),
          // SUI-1730: force react-motion to recognize an animation identity change (open / close)
          animationId: _this.state.animationId
        }),
        onRest: _this.handleAnimationEnd
      }, function (intepolatedStyle) {
        return external_react_default.a.createElement("div", null, renderModal(intepolatedStyle), open && useLayerForClickAway && peek && external_react_default.a.createElement(StyledPeekOverlay, {
          onMouseDown: _this.handleClickUnpeek,
          key: "peek"
        }), open && useLayerForClickAway && external_react_default.a.createElement(StyledClickAwayOverlay, {
          onMouseDown: _this.handleClickAway,
          key: "clickAway",
          style: {
            opacity: intepolatedStyle.overlayOpacity
          }
        }));
      });
    });

    _this.state = {
      animationId: 0,
      prevOpen: props.open
    };
    return _this;
  }

  _createClass(ModalLayer, [{
    key: "render",

    /* eslint-enable jsx-a11y/no-static-element-interactions */
    value: function render() {
      return external_react_default.a.createElement(RenderToLayer_default.a, {
        open: this.props.open || !!this.state.animationId || this.props.childrenInAnimation,
        closeReasons: ['escapeKey'],
        render: this.renderLayer,
        onRequestClose: this.props.onRequestClose
      });
    }
  }]);

  return ModalLayer;
}(external_react_["Component"]);

_defineProperty(ModalLayer_ModalLayer, "propTypes", {
  /**
   * A function that returns a default style object for react-motion. The values will be
   * used as initial values.
   */
  getDefaultMotionStyle: external_prop_types_default.a.func,

  /**
   * A function that returns a react-motion style object. The resulting interpolated style
   * will be passed to `renderModal`.
   */
  getMotionStyle: external_prop_types_default.a.func,

  /**
   * Indicate whether the animation of the children is still running.
   * If true, the ModalLayer should not close.
   */
  childrenInAnimation: external_prop_types_default.a.bool,

  /**
   * A function that will be called when a close event occurs.
   * The callback will be passed a reason (either 'escapeKey', 'clickAway' or 'clickUnpeek') and the event.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * Function that renders the modal.
   * @param {Object} intepolatedStyle - The current style object as interpolated by
   * react-motion.
   * @return {PropTypes.node}
   */
  renderModal: external_prop_types_default.a.func.isRequired,

  /**
   * Indicates whether to add an overlay mask on the whole page, blocking other interactions
   * while the Modal is open.
   */
  useLayerForClickAway: external_prop_types_default.a.bool,

  /**
   * Indicates whether the modal is currently open.
   */
  open: external_prop_types_default.a.bool,

  /**
   * Indicates whether the modal is in peek mode.
   */
  peek: external_prop_types_default.a.bool
});

_defineProperty(ModalLayer_ModalLayer, "defaultProps", {
  getDefaultMotionStyle: function getDefaultMotionStyle() {
    return {};
  },
  childrenInAnimation: false,
  open: false,
  peek: false,
  useLayerForClickAway: true,
  getMotionStyle: function getMotionStyle() {
    return {};
  },
  onRequestClose: function onRequestClose() {}
});

/* harmony default export */ var src_ModalLayer_ModalLayer = (ModalLayer_ModalLayer);
// CONCATENATED MODULE: ./src/ModalLayer/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_ModalLayer_ModalLayer; });


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Motion");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/RenderToLayer");

/***/ })

/******/ });