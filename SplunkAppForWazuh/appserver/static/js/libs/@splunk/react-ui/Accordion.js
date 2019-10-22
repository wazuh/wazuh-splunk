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
/******/ 	return __webpack_require__(__webpack_require__.s = 111);
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

/***/ 111:
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

// EXTERNAL MODULE: external "@splunk/react-ui/CollapsiblePanel"
var CollapsiblePanel_ = __webpack_require__(52);
var CollapsiblePanel_default = /*#__PURE__*/__webpack_require__.n(CollapsiblePanel_);

// CONCATENATED MODULE: ./src/Accordion/Panel.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var propTypes = {
  /** Displays right-aligned text in the title bar of the `panel`. */
  description: external_prop_types_default.a.string,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Identifies the unique id for a `panel`. Accordion uses 'panelID' to track
   * the expanded panel.
   */
  panelId: external_prop_types_default.a.any.isRequired,

  /**
   * Displays the the name of the `panel` in the panel's title bar.
   */
  title: external_prop_types_default.a.node.isRequired
};
/**
 * `Accordian.Panel` operates as a container component for content in an
 * `Accordion`.
 */

function Panel(props) {
  return external_react_default.a.createElement(CollapsiblePanel_default.a, _extends({
    "data-test": "panel",
    "data-test-panel-id": props.panelId,
    style: {
      flexShrink: 1
    }
  }, props));
}

Panel.propTypes = propTypes;
/* harmony default export */ var Accordion_Panel = (Panel);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Accordion/AccordionStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "AccordionStyles__StyledBox",
  componentId: "sc-5zvg1b-0"
})(["", ";flex-direction:column;margin-bottom:0;background:", ";"], Object(themes_["mixin"])('reset')('flex'), Object(themes_["variable"])('backgroundColor'));

// CONCATENATED MODULE: ./src/Accordion/Accordion.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Accordion_extends() { Accordion_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Accordion_extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Accordion_Accordion =
/*#__PURE__*/
function (_Component) {
  _inherits(Accordion, _Component);

  function Accordion(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Accordion);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Accordion)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestOpen", function (data) {
      if (!_this.isControlled()) {
        _this.setState({
          openPanelId: data.panelId
        });
      }

      _this.props.onChange(data.event, data);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestClose", function (data) {
      if (!_this.isControlled()) {
        _this.setState({
          openPanelId: null
        });
      }

      _this.props.onChange(data.event, data);
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'openPanelId');

    if (!_this.isControlled()) {
      _this.state = {
        openPanelId: props.defaultOpenPanelId
      };
    }

    if (false) {}

    return _this;
  }

  _createClass(Accordion, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
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
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          elementRef = _this$props.elementRef,
          collapseAll = _this$props.collapseAll;
      var openPanelId = this.isControlled() ? this.props.openPanelId : this.state.openPanelId; // remove false, null, 0, etc

      var childrenCleaned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
        return Object(external_react_["cloneElement"])(child, {
          disabled: !collapseAll && openPanelId === child.props.panelId,
          onRequestOpen: _this2.handleRequestOpen,
          onRequestClose: collapseAll ? _this2.handleRequestClose : undefined,
          open: openPanelId === child.props.panelId
        });
      });
      return external_react_default.a.createElement(StyledBox, Accordion_extends({
        "data-test": "accordion",
        "data-test-open-panel-id": openPanelId,
        elementRef: elementRef
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Accordion.propTypes))), childrenCleaned);
    }
  }]);

  return Accordion;
}(external_react_["Component"]);

_defineProperty(Accordion_Accordion, "propTypes", {
  /**
   * `children` of `Accordion` must be `Accordion.Panel`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Allow all panels to collapse. Should only be set to `true` if the default
   * panel cannot be determined.
   */
  collapseAll: external_prop_types_default.a.bool,

  /**
   * Sets the panel to expanded on the initial render. Use only when using
   * `Accordion` as an uncontrolled component. Must match the `panelId` of
   * one of the children `Accordion.Panel`s.
   */
  defaultOpenPanelId: external_prop_types_default.a.any,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Invoked on change of the open panel. Callback is passed data such as
   * the `panelId` of the `Accordion.Panel` that originated the request to
   * expand.
   */
  onChange: external_prop_types_default.a.func,

  /**
   * Indicates the `panelId` of the currently expanded `Accordion.Panel`.
   * Use only when using `Accordion` as a controlled component.
   */
  openPanelId: external_prop_types_default.a.any
});

_defineProperty(Accordion_Accordion, "defaultProps", {
  onChange: function onChange() {},
  collapseAll: false
});

_defineProperty(Accordion_Accordion, "Panel", Accordion_Panel);

/* harmony default export */ var src_Accordion_Accordion = (Accordion_Accordion);

// CONCATENATED MODULE: ./src/Accordion/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Accordion_Accordion; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Panel", function() { return Accordion_Panel; });



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

/***/ 52:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/CollapsiblePanel");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });