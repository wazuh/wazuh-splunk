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
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
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

/***/ 110:
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

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@splunk/react-ui/Motion"
var Motion_ = __webpack_require__(27);
var Motion_default = /*#__PURE__*/__webpack_require__.n(Motion_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// CONCATENATED MODULE: ./src/Scroll/Inner.jsx
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






var Inner_Inner =
/*#__PURE__*/
function (_Component) {
  _inherits(Inner, _Component);

  function Inner(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Inner);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Inner)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheel", function (e) {
      var el = _this.state.containerEl; // if the element is scrollable in both directions, it's not safe to stop propagation.

      if (el.clientWidth !== el.scrollWidth && el.clientHeight !== el.scrollHeight) {
        return;
      }

      if (el.clientWidth !== el.scrollWidth) {
        if (e.deltaX < 0 && el.scrollLeft < Math.abs(e.deltaX)) {
          el.scrollLeft = 0;
          e.stopPropagation();
          e.preventDefault();
          return;
        }

        var maxLeft = el.scrollWidth - el.clientWidth;

        if (e.deltaX && e.deltaX + el.scrollLeft > maxLeft) {
          el.scrollLeft = maxLeft;
          e.stopPropagation();
          e.preventDefault();
        }
      }

      if (el.clientHeight !== el.scrollHeight) {
        if (e.deltaY < 0 && el.scrollTop < Math.abs(e.deltaY)) {
          el.scrollTop = 0;
          e.stopPropagation();
          e.preventDefault();
          return;
        }

        var maxTop = el.scrollHeight - el.clientHeight;

        if (e.deltaY && e.deltaY + el.scrollTop > maxTop) {
          el.scrollTop = maxTop;
          e.stopPropagation();
          e.preventDefault();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (containerEl) {
      _this.setState({
        containerEl: containerEl
      });

      _this.props.elementRef(containerEl);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseEnter", function () {
      _this.defaultWindowOverflowX = document.body.style.overflowX;
      _this.defaultWindowOverflowY = document.body.style.overflowY;
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseLeave", function () {
      document.body.style.overflowX = _this.defaultWindowOverflowX;
      document.body.style.overflowY = _this.defaultWindowOverflowY;
    });

    _this.state = {};
    return _this;
  }

  _createClass(Inner, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.containerEl && !prevState.containerEl) {
        this.state.containerEl.scrollTop = this.props.defaultTop;
        this.state.containerEl.scrollLeft = this.props.defaultLeft;
      }

      if (Object(external_lodash_["isFinite"])(this.props.top)) {
        this.state.containerEl.scrollTop = this.props.top;
      }

      if (Object(external_lodash_["isFinite"])(this.props.left)) {
        this.state.containerEl.scrollLeft = this.props.left;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onScroll = _this$props.onScroll,
          stopScrollPropagation = _this$props.stopScrollPropagation;
      var containerEl = this.state.containerEl;
      return external_react_default.a.createElement(external_react_default.a.Fragment, null, external_react_default.a.createElement(this.props.tagName, _extends({}, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Inner.propTypes)), {
        ref: this.handleMount,
        onMouseEnter: stopScrollPropagation === 'window' ? this.handleMouseEnter : undefined,
        onMouseLeave: stopScrollPropagation === 'window' ? this.handleMouseLeave : undefined,
        onScroll: onScroll
      }), children), stopScrollPropagation === true && containerEl && external_react_default.a.createElement(external_react_event_listener_default.a, {
        onWheel: Object(external_react_event_listener_["withOptions"])(this.handleWheel, {
          passive: false
        }),
        target: containerEl
      }));
    }
  }]);

  return Inner;
}(external_react_["Component"]);

_defineProperty(Inner_Inner, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /** The scrollLeft to set on Mount. */
  defaultLeft: external_prop_types_default.a.number,

  /** The scrollTop to set on Mount. */
  defaultTop: external_prop_types_default.a.number,
  elementRef: external_prop_types_default.a.func,

  /** If set, scroll to this position on update. If null, ignore. */
  left: external_prop_types_default.a.number,

  /** Prevent mouseWheel events from scrolling the page or other containers. */
  stopScrollPropagation: external_prop_types_default.a.oneOf([true, false, 'window']),

  /** A callback for when the scroll position changes. */
  onScroll: external_prop_types_default.a.func,

  /** @private */
  tagName: external_prop_types_default.a.string,

  /** If set, scroll to this position on update. If null, ignore. */
  top: external_prop_types_default.a.number
});

_defineProperty(Inner_Inner, "defaultProps", {
  defaultLeft: 0,
  defaultTop: 0,
  elementRef: function elementRef() {},
  onScroll: function onScroll() {},
  tagName: 'div'
});

/* harmony default export */ var Scroll_Inner = (Inner_Inner);
// CONCATENATED MODULE: ./src/Scroll/ScrollStyles.js



var StyledInner = external_styled_components_default()(Scroll_Inner).withConfig({
  displayName: "ScrollStyles__StyledInner",
  componentId: "sc-1xmsie6-0"
})(["", ";overflow:auto;overflow-y:auto;overflow-x:hidden;"], Object(themes_["mixin"])('reset')('block'));

// CONCATENATED MODULE: ./src/Scroll/Scroll.jsx
function Scroll_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Scroll_typeof = function _typeof(obj) { return typeof obj; }; } else { Scroll_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Scroll_typeof(obj); }

function Scroll_extends() { Scroll_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Scroll_extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Scroll_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Scroll_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Scroll_createClass(Constructor, protoProps, staticProps) { if (protoProps) Scroll_defineProperties(Constructor.prototype, protoProps); if (staticProps) Scroll_defineProperties(Constructor, staticProps); return Constructor; }

function Scroll_possibleConstructorReturn(self, call) { if (call && (Scroll_typeof(call) === "object" || typeof call === "function")) { return call; } return Scroll_assertThisInitialized(self); }

function Scroll_getPrototypeOf(o) { Scroll_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Scroll_getPrototypeOf(o); }

function Scroll_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Scroll_setPrototypeOf(subClass, superClass); }

function Scroll_setPrototypeOf(o, p) { Scroll_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Scroll_setPrototypeOf(o, p); }

function Scroll_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Scroll_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var Scroll_Scroll =
/*#__PURE__*/
function (_Component) {
  Scroll_inherits(Scroll, _Component);

  function Scroll(props) {
    var _getPrototypeOf2;

    var _this;

    Scroll_classCallCheck(this, Scroll);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Scroll_possibleConstructorReturn(this, (_getPrototypeOf2 = Scroll_getPrototypeOf(Scroll)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Scroll_defineProperty(Scroll_assertThisInitialized(Scroll_assertThisInitialized(_this)), "handleMount", function (inner) {
      _this.inner = inner;
    });

    Scroll_defineProperty(Scroll_assertThisInitialized(Scroll_assertThisInitialized(_this)), "handleRest", function () {
      _this.props.onScrollComplete();
    });

    Scroll_defineProperty(Scroll_assertThisInitialized(Scroll_assertThisInitialized(_this)), "handleScroll", function (e) {
      _this.setState({
        currentLeft: e.currentTarget.scrollLeft,
        currentTop: e.currentTarget.scrollTop
      });

      _this.props.onScroll(e);
    });

    Scroll_defineProperty(Scroll_assertThisInitialized(Scroll_assertThisInitialized(_this)), "renderInner", function (targetScroll) {
      var _this$props = _this.props,
          children = _this$props.children,
          elementRef = _this$props.elementRef,
          left = _this$props.left,
          top = _this$props.top,
          onScrollComplete = _this$props.onScrollComplete,
          otherProps = _objectWithoutProperties(_this$props, ["children", "elementRef", "left", "top", "onScrollComplete"]);

      return external_react_default.a.createElement(StyledInner, Scroll_extends({
        "data-test": "scroll"
      }, otherProps, {
        key: "inner",
        top: Object(external_lodash_["isFinite"])(top) ? targetScroll.top : undefined,
        left: Object(external_lodash_["isFinite"])(left) ? targetScroll.left : undefined
      }, Object(themes_["ref"])(_this.handleMount), {
        elementRef: elementRef,
        onScroll: _this.handleScroll
      }), children);
    });

    _this.state = {
      currentLeft: 0,
      currentTop: 0
    };
    return _this;
  }

  Scroll_createClass(Scroll, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          left = _this$props2.left,
          top = _this$props2.top;
      var _this$state = this.state,
          currentLeft = _this$state.currentLeft,
          currentTop = _this$state.currentTop;
      var targetScroll = {}; // When isFinite, the prop is defined and therefore animating.

      if (Object(external_lodash_["isFinite"])(left)) {
        targetScroll.left = Object(external_react_motion_["spring"])(left, {
          precision: 10
        });
      } else {
        targetScroll.left = currentLeft;
      }

      if (Object(external_lodash_["isFinite"])(top)) {
        targetScroll.top = Object(external_react_motion_["spring"])(top, {
          precision: 10
        });
      } else {
        targetScroll.top = currentTop;
      }

      return external_react_default.a.createElement(Motion_default.a, {
        defaultStyle: {
          left: 0,
          top: 0
        },
        style: targetScroll,
        onRest: this.handleRest
      }, this.renderInner);
    }
  }]);

  return Scroll;
}(external_react_["Component"]);

Scroll_defineProperty(Scroll_Scroll, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** A callback for when an animated update completes. Ensure the animate prop is set back to
   * false and return control to the user. */
  onScrollComplete: external_prop_types_default.a.func,

  /** A callback for when the scroll position changes. */
  onScroll: external_prop_types_default.a.func,

  /** Set this to animate to a specific scroll position. Remove this property onScrollComplete to
   restore control to the user. */
  top: external_prop_types_default.a.number,

  /** Set this to animate to a specific scroll position. Remove this property onScrollComplete to
   restore control to the user. */
  left: external_prop_types_default.a.number,

  /** prevent mouseWheel events from scrolling the page or other containers. 'window' only
   * stops the window from scrolling by removing the scroll bars, which has better performance
   * but can affect layout. */
  stopScrollPropagation: external_prop_types_default.a.oneOf([true, false, 'window']),
  tagName: external_prop_types_default.a.string
});

Scroll_defineProperty(Scroll_Scroll, "defaultProps", {
  onScroll: function onScroll() {},
  onScrollComplete: function onScrollComplete() {},
  stopScrollPropagation: false,
  tagName: 'div'
});

/* harmony default export */ var src_Scroll_Scroll = (Scroll_Scroll);
// CONCATENATED MODULE: ./src/Scroll/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Scroll_Scroll; });


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

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

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ })

/******/ });