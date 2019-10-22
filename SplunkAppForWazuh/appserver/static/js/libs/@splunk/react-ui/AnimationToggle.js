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
/******/ 	return __webpack_require__(__webpack_require__.s = 151);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// CONCATENATED MODULE: ./src/AnimationToggle/AnimationToggle.jsx
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



var defaultValue = false;
var AnimationToggleContext = external_react_default.a.createContext(defaultValue);

var callMeMaybe = function callMeMaybe(maybeFunction) {
  return typeof maybeFunction === 'function' ? maybeFunction() : maybeFunction;
};
/**
 * Used to allow animation to be externally controlled, via feature flag, provider or user preference.
 */


var AnimationToggle_AnimationToggle =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimationToggle, _Component);

  function AnimationToggle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AnimationToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AnimationToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "reducedMotionChanged", function () {
      _this.setState({
        reducedMotion: _this.reducedMotion && _this.reducedMotion.matches
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animationDisabledViaFeatureFlag", function () {
      return _this.context && _this.context.featureFlags && _this.context.featureFlags.animation === false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderAnimation", function (disabledViaProvider) {
      if (disabledViaProvider || _this.animationDisabledViaFeatureFlag()) {
        return callMeMaybe(_this.props.off);
      }

      if (_this.props.reduced && _this.state.reducedMotion) {
        return callMeMaybe(_this.props.reduced);
      }

      return callMeMaybe(_this.props.on);
    });

    _this.reducedMotion = _this.props.reduced && window.matchMedia && window.matchMedia('screen and (prefers-reduced-motion: reduce)');
    _this.state = {
      reducedMotion: _this.reducedMotion && _this.reducedMotion.matches
    };
    return _this;
  }

  _createClass(AnimationToggle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.reducedMotion) {
        this.reducedMotion.addListener(this.reducedMotionChanged);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.reducedMotion) {
        this.reducedMotion.removeListener(this.reducedMotionChanged);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(AnimationToggleContext.Consumer, null, this.renderAnimation);
    }
  }]);

  return AnimationToggle;
}(external_react_["Component"]);
/**
 * Used to disable animation
 */

_defineProperty(AnimationToggle_AnimationToggle, "propTypes", {
  /** What to render when animations are turned on. */
  on: external_prop_types_default.a.oneOfType([external_prop_types_default.a.node, external_prop_types_default.a.func]).isRequired,

  /** What to render when animations are turned off for testing. */
  off: external_prop_types_default.a.oneOfType([external_prop_types_default.a.node, external_prop_types_default.a.func]).isRequired,

  /** What to render when the user prefers reduced motion. */
  reduced: external_prop_types_default.a.oneOfType([external_prop_types_default.a.node, external_prop_types_default.a.func])
});

_defineProperty(AnimationToggle_AnimationToggle, "contextTypes", {
  featureFlags: external_prop_types_default.a.object
});

var AnimationToggle_AnimationToggleProvider = function AnimationToggleProvider(_ref) {
  var disabled = _ref.disabled,
      children = _ref.children;
  return external_react_default.a.createElement(AnimationToggleContext.Provider, {
    value: disabled
  }, children);
};
AnimationToggle_AnimationToggleProvider.propTypes = {
  /** @private */
  children: external_prop_types_default.a.node.isRequired,

  /** Prevents animation in components that use the `AnimationToggle`. */
  disabled: external_prop_types_default.a.bool
};
/* harmony default export */ var src_AnimationToggle_AnimationToggle = (AnimationToggle_AnimationToggle);
// CONCATENATED MODULE: ./src/AnimationToggle/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_AnimationToggle_AnimationToggle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AnimationToggle", function() { return AnimationToggle_AnimationToggle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AnimationToggleProvider", function() { return AnimationToggle_AnimationToggleProvider; });



/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });