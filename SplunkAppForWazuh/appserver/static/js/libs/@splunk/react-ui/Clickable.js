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
/******/ 	return __webpack_require__(__webpack_require__.s = 140);
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

/***/ 140:
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

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/Clickable/ClickableStyles.js


var StyledA = external_styled_components_default.a.a.withConfig({
  displayName: "ClickableStyles__StyledA",
  componentId: "d1czrs-0"
})(["", ";cursor:pointer;&[disabled]{cursor:not-allowed;color:", ";}&::-moz-focus-inner{border:0;padding:0;}"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('Clickable', 'disabledColor'));
var StyledButton = StyledA.withComponent('button');

// CONCATENATED MODULE: ./src/Clickable/Clickable.jsx
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






var defaultValue = null; // default to to no history

var NavigationContext = external_react_default.a.createContext(defaultValue);
var WITH_SCHEME = /^[a-z0-9]+:/;
var SCHEME_RELATIVE = /^\/\//;
var isInternalLink = function isInternalLink(to) {
  return !WITH_SCHEME.test(to) && !SCHEME_RELATIVE.test(to);
};

var Clickable_Clickable =
/*#__PURE__*/
function (_Component) {
  _inherits(Clickable, _Component);

  function Clickable(props) {
    var _this;

    _classCallCheck(this, Clickable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Clickable).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;

      _this.props.elementRef(el);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOnClick", function (providedOnClick) {
      return function (e) {
        // when user command-click on mac or ctrl-click on other platforms, and
        // Tag is an <a>, let the click pass through, let the <a> to achieve user's
        // intent of 'open in new context'
        // on mac, ctrl-click will be caught and open option menu even before hitting
        // the DOM, so we're safe to check both metaKey and ctrlKey here
        // without platform sniffing
        if ((e.metaKey || e.ctrlKey) && _this.props.to) {
          return;
        }

        if (_this.props.onClick) {
          _this.props.onClick(e);
        } else if (providedOnClick && _this.props.to) {
          providedOnClick(e, {
            to: _this.props.to,
            openInNewContext: _this.props.openInNewContext
          });
        }
      };
    });

    if (false) {}

    return _this;
  }

  _createClass(Clickable, [{
    key: "focus",

    /**
     * Place focus on the element.
     */
    value: function focus() {
      this.el.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          to = _this$props.to,
          openInNewContext = _this$props.openInNewContext,
          children = _this$props.children,
          otherProps = _objectWithoutProperties(_this$props, ["to", "openInNewContext", "children"]);

      var Styled; // Only set the href attribute when enabled, and therefore using an <a> tag

      if (to && !otherProps.disabled) {
        Styled = StyledA;
        otherProps.href = to;
      } else {
        Styled = StyledButton;
        otherProps.type = otherProps.type || 'button';
      }

      if (to && openInNewContext) {
        otherProps.target = '_blank';

        if (!isInternalLink(to)) {
          otherProps.rel = 'noopener noreferrer';
        }
      }

      return external_react_default.a.createElement(NavigationContext.Consumer, null, function (providedOnClick) {
        return external_react_default.a.createElement(Styled, _extends({
          "data-test": "clickable"
        }, Object(themes_["ref"])(_this2.handleMount), otherProps, {
          onClick: _this2.handleOnClick(providedOnClick)
        }), children);
      });
    }
  }]);

  return Clickable;
}(external_react_["Component"]);
/**
 * Used to provide an override for the onClick for links for single page applications so that
 * internal links can navigate without a page reload.
 */


_defineProperty(Clickable_Clickable, "propTypes", {
  children: external_prop_types_default.a.node,

  /** Add a disabled attribute and prevent clicking. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * The onClick event handler will be ignored if ctrl or meta keys are pressed and
   * `to` is defined, which allows the link to open in a new context.
   */
  onClick: external_prop_types_default.a.func,

  /**
   * To open the link in a new window, set openInNewContext to true.
   */
  openInNewContext: external_prop_types_default.a.bool,

  /**
   * A url for a link. If set and not disabled, an <a> tag will be used instead of <button>.
   */
  to: external_prop_types_default.a.string
});

_defineProperty(Clickable_Clickable, "defaultProps", {
  disabled: false,
  elementRef: function elementRef() {},
  openInNewContext: false
});

var Clickable_NavigationProvider = function NavigationProvider(_ref) {
  var onClick = _ref.onClick,
      children = _ref.children;
  return external_react_default.a.createElement(NavigationContext.Provider, {
    value: onClick
  }, children);
};
Clickable_NavigationProvider.propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * An onClick handler to use when a link is clicked if no other onClick handler is supplied.
   * The function takes the event and an options argument with `to` and `openInNewContext`
   */
  onClick: external_prop_types_default.a.func
};
/* harmony default export */ var src_Clickable_Clickable = (Clickable_Clickable);
// CONCATENATED MODULE: ./src/Clickable/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Clickable_Clickable; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isInternalLink", function() { return isInternalLink; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NavigationProvider", function() { return Clickable_NavigationProvider; });



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