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
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
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

/***/ 147:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/focus"
var focus_ = __webpack_require__(23);

// EXTERNAL MODULE: external "@splunk/ui-utils/style"
var style_ = __webpack_require__(28);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/TransitionOpen/TransitionOpenStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "TransitionOpenStyles__Styled",
  componentId: "sc-1gth369-0"
})(["", ";overflow:", ";"], Object(themes_["mixin"])('reset')('block'), function (_ref) {
  var hideOverflow = _ref.hideOverflow;
  return hideOverflow ? 'hidden' : null;
});
var StyledInner = external_styled_components_default.a.div.withConfig({
  displayName: "TransitionOpenStyles__StyledInner",
  componentId: "sc-1gth369-1"
})(["", ";", ";width:100%;"], Object(themes_["mixin"])('reset')('table'), Object(themes_["mixin"])('clearfix'));

// CONCATENATED MODULE: ./src/TransitionOpen/TransitionOpen.jsx
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











var TransitionOpen_TransitionOpen =
/*#__PURE__*/
function (_Component) {
  _inherits(TransitionOpen, _Component);

  _createClass(TransitionOpen, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.open !== state.prevOpen) {
        return {
          animating: true,
          prevOpen: props.open
        };
      }

      return null;
    }
  }]);

  function TransitionOpen(props) {
    var _this;

    _classCallCheck(this, TransitionOpen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransitionOpen).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getValue", function (el) {
      var animation = _this.props.animation;
      var value = 0;

      if (el) {
        if (_this.props.takeFocus) {
          Object(focus_["takeFocus"])(el, 'container');
        }

        switch (animation) {
          case 'slideFromTop':
          case 'slideFromBottom':
          case 'expandHeight':
          case 'none':
            value = el.clientHeight;
            break;

          case 'slideFromLeft':
          case 'slideFromRight':
          case 'expandWidth':
            value = el.clientWidth;
            break;

          default: // Intentionally left empty.

        }
      }

      return value;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      var value = _this.getValue(el);

      _this.setState({
        value: value,
        innerEl: el
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRest", function () {
      _this.setState({
        animating: false
      });

      _this.props.onAnimationEnd();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTab", function (e) {
      Object(focus_["handleTab"])(_this.state.innerEl, e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "internalRender", function (_ref) {
      var value = _ref.value;
      var _this$props = _this.props,
          animation = _this$props.animation,
          className = _this$props.className,
          children = _this$props.children,
          id = _this$props.id,
          innerClassName = _this$props.innerClassName,
          innerStyle = _this$props.innerStyle,
          open = _this$props.open,
          outerClassName = _this$props.outerClassName,
          outerId = _this$props.outerId,
          outerStyle = _this$props.outerStyle;
      var animating = _this.state.animating;
      var offset = _this.state.value - value;
      var transform;
      var dimension;

      if (animating) {
        switch (animation) {
          case 'slideFromTop':
            transform = "translateY(-".concat(offset, "px)");
            dimension = 'height';
            break;

          case 'slideFromBottom':
          case 'none':
            dimension = 'height';
            break;

          case 'slideFromLeft':
            transform = "translateX(".concat(-offset, "px)");
            dimension = 'width';
            break;

          case 'slideFromRight':
            dimension = 'width';
            break;

          case 'expandHeight':
            dimension = 'height';
            break;

          case 'expandWidth':
            dimension = 'width';
            break;

          default: // Intentionally left empty.

        }
      }
      /* eslint-disable jsx-a11y/no-static-element-interactions */


      return external_react_default.a.createElement(Styled, {
        className: Object(style_["toClassName"])(className, outerClassName),
        style: _objectSpread({}, outerStyle, dimension && _defineProperty({}, dimension, value)),
        hideOverflow: !open || animating,
        id: outerId
      }, (open || animating) && external_react_default.a.createElement(StyledInner, _extends({
        "data-test": "transition-open"
      }, Object(external_lodash_["omit"])(_this.props, Object(external_lodash_["keys"])(TransitionOpen.propTypes)), Object(themes_["ref"])(_this.handleMount), {
        tabIndex: -1,
        className: innerClassName,
        id: id,
        onKeyDown: _this.props.retainFocus ? _this.handleTab : null,
        style: _objectSpread({}, innerStyle, {
          transform: transform
        })
      }), children));
    });

    _this.state = {
      animating: props.animateOnMount ? props.open : false,
      innerEl: null,
      prevOpen: props.open,
      value: null
    };
    return _this;
  }

  _createClass(TransitionOpen, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var value = this.getValue(this.state.innerEl);

      if (this.state.value !== value) {
        this.setState({
          value: value
        }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          open = _this$props2.open,
          animation = _this$props2.animation;
      var value = this.state.value;
      var animateTo = open ? value : 0;
      return external_react_default.a.createElement(Motion_default.a, {
        onRest: this.handleRest,
        style: {
          value: animation !== 'none' ? Object(external_react_motion_["spring"])(animateTo, {
            precision: 1
          }) : animateTo || 0
        }
      }, this.internalRender);
    }
  }]);

  return TransitionOpen;
}(external_react_["Component"]);

_defineProperty(TransitionOpen_TransitionOpen, "propTypes", {
  animation: external_prop_types_default.a.oneOf(['slideFromTop', 'slideFromRight', 'slideFromBottom', 'slideFromLeft', 'expandHeight', 'expandWidth', 'none']),
  animateOnMount: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.node,

  /** @private */
  className: external_prop_types_default.a.string,

  /** The `id` of the inner container. */
  id: external_prop_types_default.a.string,

  /** An additional className to inner container. */
  innerClassName: external_prop_types_default.a.string,
  innerStyle: external_prop_types_default.a.object,
  onAnimationEnd: external_prop_types_default.a.func,

  /** Whether the component is currently open or not */
  open: external_prop_types_default.a.bool,

  /** An additional className to outer container. */
  outerClassName: external_prop_types_default.a.string,

  /** The `id` of the outer container. */
  outerId: external_prop_types_default.a.string,
  outerStyle: external_prop_types_default.a.object,

  /**
   * Keep focus within `TransitionOpen` while open.
   */
  retainFocus: external_prop_types_default.a.bool,

  /**
   * When true, the `TransitionOpen` will automatically take focus when 'open' changes to
   * true.
   */
  takeFocus: external_prop_types_default.a.bool
});

_defineProperty(TransitionOpen_TransitionOpen, "defaultProps", {
  animation: 'expandHeight',
  animateOnMount: false,
  innerStyle: {},
  onAnimationEnd: function onAnimationEnd() {},
  open: false,
  outerStyle: {},
  retainFocus: false,
  takeFocus: false
});

/* harmony default export */ var src_TransitionOpen_TransitionOpen = (TransitionOpen_TransitionOpen);
// CONCATENATED MODULE: ./src/TransitionOpen/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_TransitionOpen_TransitionOpen; });


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/focus");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Motion");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/style");

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