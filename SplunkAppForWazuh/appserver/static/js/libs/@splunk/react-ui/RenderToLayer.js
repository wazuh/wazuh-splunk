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
/******/ 	return __webpack_require__(__webpack_require__.s = 154);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(37);

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// CONCATENATED MODULE: ./src/RenderToLayer/RenderToLayer.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var RenderToLayer_RenderToLayer =
/*#__PURE__*/
function (_Component) {
  _inherits(RenderToLayer, _Component);

  /**
   * @private
   * RenderToLayer.instanceStack keeps track of the current instances of RenderToLayer. This is
   * used by RenderToLayer#handleKeyDown to determine if the escapeKey event should be handled by
   * the current instance. Only the topmost RenderToLayer instance should honor the escapeKey.
   */
  function RenderToLayer(props) {
    var _this;

    _classCallCheck(this, RenderToLayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RenderToLayer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickOnLayer", function (_ref) {
      var nativeEvent = _ref.nativeEvent;
      _this.layerClickEvent = nativeEvent;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickOnWindow", function (event) {
      // clicks inside the layer should not be considered clickAways
      if (!_this.props.open || !Object(external_lodash_["includes"])(_this.props.closeReasons, 'clickAway') || _this.layerClickEvent === event) {
        return;
      }

      _this.props.onRequestClose({
        event: event,
        reason: 'clickAway'
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDownOnWindow", function (event) {
      if (_this.props.open && Object(keyboard_["keycode"])(event) === 'esc' && Object(external_lodash_["last"])(RenderToLayer.instanceStack) === _assertThisInitialized(_assertThisInitialized(_this)) && Object(external_lodash_["includes"])(_this.props.closeReasons, 'escapeKey')) {
        _this.props.onRequestClose({
          event: event,
          reason: 'escapeKey'
        });
      }
    });

    if (!RenderToLayer.layerContainer) {
      RenderToLayer.layerContainer = document.createElement('div');
      document.body.appendChild(RenderToLayer.layerContainer);
    }

    return _this;
  }

  _createClass(RenderToLayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.open) {
        RenderToLayer.instanceStack.push(this);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.open && this.props.open) {
        RenderToLayer.instanceStack.push(this);
      } else if (prevProps.open && !this.props.open) {
        Object(external_lodash_["remove"])(RenderToLayer.instanceStack, this);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          open = _this$props.open,
          renderLayer = _this$props.render;
      var renderedElement = null;

      if (open) {
        // A hook, `data-portal-layer`, is added to facilitate interactions with Backbone components.
        renderedElement = Object(external_react_dom_["createPortal"])(external_react_default.a.createElement("div", {
          "data-portal-layer": "",
          onMouseDown: this.handleClickOnLayer,
          onTouchStart: this.handleClickOnLayer,
          role: "presentation"
        }, renderLayer()), RenderToLayer.layerContainer);
      }

      return [open && external_react_default.a.createElement(external_react_event_listener_default.a, {
        key: "eventListener",
        target: "window",
        onKeyDown: this.handleKeyDownOnWindow,
        onMouseDown: this.handleClickOnWindow,
        onTouchStart: this.handleClickOnWindow
      }), renderedElement];
    }
  }]);

  return RenderToLayer;
}(external_react_["Component"]);

_defineProperty(RenderToLayer_RenderToLayer, "possibleCloseReasons", ['escapeKey', 'clickAway']);

_defineProperty(RenderToLayer_RenderToLayer, "propTypes", {
  closeReasons: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(RenderToLayer_RenderToLayer.possibleCloseReasons)),

  /**
   * Invoked when a potential close event occurs. The function is passed a data object
   * containing the event and a reason. Possible reasons are `escapeKey` and `clickAway`.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * Whether the component is currently open.
   */
  open: external_prop_types_default.a.bool,

  /**
   * The render function for the detached sub-tree.
   */
  render: external_prop_types_default.a.func.isRequired
});

_defineProperty(RenderToLayer_RenderToLayer, "defaultProps", {
  closeReasons: RenderToLayer_RenderToLayer.possibleCloseReasons,
  onRequestClose: function onRequestClose() {},
  open: false
});

_defineProperty(RenderToLayer_RenderToLayer, "instanceStack", []);

/* harmony default export */ var src_RenderToLayer_RenderToLayer = (RenderToLayer_RenderToLayer);
// CONCATENATED MODULE: ./src/RenderToLayer/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_RenderToLayer_RenderToLayer; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ })

/******/ });