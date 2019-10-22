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
/******/ 	return __webpack_require__(__webpack_require__.s = 106);
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

/***/ 106:
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

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/SlidingPanels/SlidingPanelsStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "SlidingPanelsStyles__StyledBox",
  componentId: "lab7rq-0"
})(["overflow:hidden;position:relative;"]);
var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "SlidingPanelsStyles__Styled",
  componentId: "lab7rq-1"
})(["", ";", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["mixin"])('clearfix'));

// CONCATENATED MODULE: ./src/SlidingPanels/Panel.jsx
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






/**
 * Container for arbitrary content.
 */

var Panel_Panel =
/*#__PURE__*/
function (_Component) {
  _inherits(Panel, _Component);

  function Panel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Panel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;

      _this.props.elementRef(el);
    });

    return _this;
  }

  _createClass(Panel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMount(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.onUnmount(this);
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.el.clientHeight;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.el.clientWidth;
    }
  }, {
    key: "render",
    value: function render() {
      var panelId = this.props.panelId;
      return external_react_default.a.createElement(Styled, _extends({
        "data-test": "panel",
        "data-test-panel-id": panelId
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Panel.propTypes)), Object(themes_["ref"])(this.handleMount)));
    }
  }]);

  return Panel;
}(external_react_["Component"]);

_defineProperty(Panel_Panel, "propTypes", {
  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * A unique id for this panel and used by the SlidingPanels to keep track of the open panel.
   */
  panelId: external_prop_types_default.a.any.isRequired,

  /**
   * @private.
   * Used internally, func passed in from outer place will be overwritten
   * by SlidingPanels during rendering
   */
  onMount: external_prop_types_default.a.func,

  /**
   * @private.
   * Used internally, func passed in from outer place will be overwritten
   * by SlidingPanels during rendering
   */
  onUnmount: external_prop_types_default.a.func
});

_defineProperty(Panel_Panel, "defaultProps", {
  elementRef: function elementRef() {},
  onMount: function onMount() {},
  onUnmount: function onUnmount() {}
});

/* harmony default export */ var SlidingPanels_Panel = (Panel_Panel);
// CONCATENATED MODULE: ./src/SlidingPanels/SlidingPanels.jsx
function SlidingPanels_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SlidingPanels_typeof = function _typeof(obj) { return typeof obj; }; } else { SlidingPanels_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SlidingPanels_typeof(obj); }

function SlidingPanels_extends() { SlidingPanels_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return SlidingPanels_extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { SlidingPanels_defineProperty(target, key, source[key]); }); } return target; }

function SlidingPanels_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SlidingPanels_possibleConstructorReturn(self, call) { if (call && (SlidingPanels_typeof(call) === "object" || typeof call === "function")) { return call; } return SlidingPanels_assertThisInitialized(self); }

function SlidingPanels_getPrototypeOf(o) { SlidingPanels_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SlidingPanels_getPrototypeOf(o); }

function SlidingPanels_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SlidingPanels_createClass(Constructor, protoProps, staticProps) { if (protoProps) SlidingPanels_defineProperties(Constructor.prototype, protoProps); if (staticProps) SlidingPanels_defineProperties(Constructor, staticProps); return Constructor; }

function SlidingPanels_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SlidingPanels_setPrototypeOf(subClass, superClass); }

function SlidingPanels_setPrototypeOf(o, p) { SlidingPanels_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SlidingPanels_setPrototypeOf(o, p); }

function SlidingPanels_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SlidingPanels_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var SlidingPanels_SlidingPanels =
/*#__PURE__*/
function (_Component) {
  SlidingPanels_inherits(SlidingPanels, _Component);

  SlidingPanels_createClass(SlidingPanels, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.activePanelId !== state.prevActivePanelId) {
        // instead of using panelId, assign each sliding event an id and
        // use it as the key to make sure new panelA will transit as expeced if
        // old panelA has not fully left yet
        return {
          prevActivePanelId: props.activePanelId,
          animating: true,
          panelLoading: true,
          slidingId: state.slidingId + 1
        };
      } // Return null to indicate no change to state


      return null;
    }
  }]);

  function SlidingPanels() {
    var _getPrototypeOf2;

    var _this;

    SlidingPanels_classCallCheck(this, SlidingPanels);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = SlidingPanels_possibleConstructorReturn(this, (_getPrototypeOf2 = SlidingPanels_getPrototypeOf(SlidingPanels)).call.apply(_getPrototypeOf2, [this].concat(args)));

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "panelInstances", {});

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "willEnter", function () {
      return {
        translateX: 1
      };
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "willLeave", function () {
      return {
        translateX: Object(external_react_motion_["spring"])(-1, {
          precision: 1
        })
      };
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "handlePanelMount", function (panel) {
      _this.panelInstances[panel.props.panelId] = panel;

      if (panel.props.panelId === _this.props.activePanelId) {
        _this.setState({
          activePanel: panel,
          panelLoading: false
        });
      }
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "handlePanelUnmount", function (panel) {
      _this.panelInstances[panel.props.panelId] = null;
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "handleAnimationEnd", function () {
      _this.setState({
        animating: false
      });

      _this.props.onAnimationEnd();
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "renderPanel", function (transitionStyle, idx, maxWidth) {
      var key = transitionStyle.key,
          currentPanel = transitionStyle.data.currentPanel,
          translateX = transitionStyle.style.translateX;
      var transition = _this.props.transition;
      var offset = translateX * maxWidth * (transition === 'forward' ? 1 : -1);

      var panelStyle = _objectSpread({}, _this.state.animating ? {
        transform: "translateX(".concat(offset, "px)")
      } : {}, idx > 0 ? {
        position: 'absolute',
        left: 0,
        top: 0
      } : {});

      return Object(external_react_["cloneElement"])(currentPanel, {
        key: key,
        style: _objectSpread({}, currentPanel.props.style, panelStyle),
        onMount: _this.handlePanelMount,
        onUnmount: _this.handlePanelUnmount
      });
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "renderInnerContainer", function (styles) {
      var _this$props = _this.props,
          innerClassName = _this$props.innerClassName,
          innerStyle = _this$props.innerStyle;
      var maxWidth = styles.map(function (s) {
        var currentPanel = _this.panelInstances[s.data.currentPanel.props.panelId];
        return currentPanel ? currentPanel.getWidth() : 0;
      }).reduce(function (max, current) {
        return Math.max(max, current);
      }, 0);
      return external_react_default.a.createElement("div", {
        style: innerStyle,
        className: innerClassName
      }, styles.map(function (ts, idx) {
        return _this.renderPanel(ts, idx, maxWidth);
      }));
    });

    SlidingPanels_defineProperty(SlidingPanels_assertThisInitialized(SlidingPanels_assertThisInitialized(_this)), "renderOuterContainer", function (interpolatedOuterStyle) {
      var _this$props2 = _this.props,
          activePanelId = _this$props2.activePanelId,
          children = _this$props2.children,
          outerClassName = _this$props2.outerClassName,
          outerStyle = _this$props2.outerStyle;
      var _this$state = _this.state,
          animating = _this$state.animating,
          slidingId = _this$state.slidingId;

      var style = _objectSpread({}, outerStyle, animating ? interpolatedOuterStyle : {});

      var currentPanel;
      external_react_["Children"].forEach(children, function (child) {
        if (Object(external_react_["isValidElement"])(child) && child.props.panelId === activePanelId) {
          currentPanel = child;
        }
      });

      if (false) {}

      var transitionStyle = {
        key: slidingId.toString(16),
        data: {
          currentPanel: currentPanel
        },
        style: {
          translateX: Object(external_react_motion_["spring"])(0, {
            precision: 0.01
          })
        }
      };
      return external_react_default.a.createElement(StyledBox, SlidingPanels_extends({
        className: outerClassName,
        "data-test": "sliding-panels",
        "data-test-active-panel-id": activePanelId,
        style: style
      }, Object(external_lodash_["omit"])(_this.props, Object(external_lodash_["keys"])(SlidingPanels.propTypes))), external_react_default.a.createElement(external_react_motion_["TransitionMotion"], {
        willEnter: _this.willEnter,
        willLeave: _this.willLeave,
        styles: [transitionStyle]
      }, _this.renderInnerContainer));
    });

    _this.state = {
      animating: false,
      prevActivePanelId: _this.props.activePanelId,
      slidingId: 0
    };
    return _this;
  }

  SlidingPanels_createClass(SlidingPanels, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          activePanel = _this$state2.activePanel,
          panelLoading = _this$state2.panelLoading;
      var width = activePanel ? activePanel.getWidth() : null;
      var height = activePanel ? activePanel.getHeight() : null; // When a new panel is loading, the activePanel is about to be removed. The height and/or
      // width of that panel may have changed since the last render. To ensure that the next
      // panel animates from the current height and width (rather than the previously loaded one),
      // we must set the style with numbers that will not be interpolated.

      var style = panelLoading ? {
        width: width,
        height: height
      } : {
        width: Object(external_react_motion_["spring"])(width, {
          precision: 1
        }),
        height: Object(external_react_motion_["spring"])(height, {
          precision: 1
        })
      };
      return external_react_default.a.createElement(external_react_motion_["Motion"], {
        style: style,
        onRest: this.handleAnimationEnd
      }, this.renderOuterContainer);
    }
  }]);

  return SlidingPanels;
}(external_react_["Component"]);

SlidingPanels_defineProperty(SlidingPanels_SlidingPanels, "propTypes", {
  activePanelId: external_prop_types_default.a.any.isRequired,

  /** @private. */
  children: external_prop_types_default.a.node.isRequired,

  /** An additional className to inner container. */
  innerClassName: external_prop_types_default.a.string,
  innerStyle: external_prop_types_default.a.object,
  onAnimationEnd: external_prop_types_default.a.func,

  /** An additional className to outer container. */
  outerClassName: external_prop_types_default.a.string,
  outerStyle: external_prop_types_default.a.object,
  transition: external_prop_types_default.a.oneOf(['forward', 'backward'])
});

SlidingPanels_defineProperty(SlidingPanels_SlidingPanels, "defaultProps", {
  onAnimationEnd: function onAnimationEnd() {},
  transition: 'forward'
});

SlidingPanels_defineProperty(SlidingPanels_SlidingPanels, "Panel", SlidingPanels_Panel);

/* harmony default export */ var src_SlidingPanels_SlidingPanels = (SlidingPanels_SlidingPanels);
// CONCATENATED MODULE: ./src/SlidingPanels/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_SlidingPanels_SlidingPanels; });


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("react-motion");

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

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });