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
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
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

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/focus");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Tooltip");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/CloseButton");

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ModalLayer");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ }),

/***/ 88:
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

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/ModalLayer"
var ModalLayer_ = __webpack_require__(45);
var ModalLayer_default = /*#__PURE__*/__webpack_require__.n(ModalLayer_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/ui-utils/focus"
var focus_ = __webpack_require__(23);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/Modal/BodyStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "BodyStyles__StyledBox",
  componentId: "sc-1l33ada-0"
})(["background-color:", ";padding:calc(", " * 2);flex:0 1 auto;overflow:auto;@media all and (-ms-high-contrast:none){*::-ms-backdrop,&{max-height:calc(100vh - 180px);}}"], Object(themes_["variable"])('Modal', 'Body', 'boxBackgroundColor'), Object(themes_["variable"])('fontSize'));

// CONCATENATED MODULE: ./src/Modal/Body.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node
};
/**
 * A styled container for modal body content.
 */

function Body(props) {
  var children = props.children,
      otherProps = _objectWithoutProperties(props, ["children"]);

  return external_react_default.a.createElement(StyledBox, _extends({
    "data-test": "body"
  }, otherProps), children);
}

Body.propTypes = propTypes;
/* harmony default export */ var Modal_Body = (Body);
// CONCATENATED MODULE: ./src/Modal/FooterStyles.js



var FooterStyles_StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "FooterStyles__StyledBox",
  componentId: "mhvmxh-0"
})(["flex:0 0 auto;padding:", ";text-align:right;background-color:", ";border-top:1px solid ", ";& > button{min-width:80px;}"], Object(themes_["variable"])('spacing'), Object(themes_["variable"])('Modal', 'Footer', 'boxBackgroundColor'), Object(themes_["variable"])('Modal', 'Footer', 'boxBorderTopColor'));

// CONCATENATED MODULE: ./src/Modal/Footer.jsx
function Footer_extends() { Footer_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Footer_extends.apply(this, arguments); }

function Footer_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Footer_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Footer_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var pTypes = {
  /** @private */
  children: external_prop_types_default.a.node
};
/**
 * A styled container for modal footer content.
 */

function Footer(props) {
  var children = props.children,
      otherProps = Footer_objectWithoutProperties(props, ["children"]);

  return external_react_default.a.createElement(FooterStyles_StyledBox, Footer_extends({
    "data-test": "footer"
  }, otherProps), children);
}

Footer.propTypes = pTypes;
/* harmony default export */ var Modal_Footer = (Footer);
// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/Button"
var Button_ = __webpack_require__(16);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@splunk/react-ui/CloseButton"
var CloseButton_ = __webpack_require__(42);
var CloseButton_default = /*#__PURE__*/__webpack_require__.n(CloseButton_);

// EXTERNAL MODULE: external "@splunk/react-ui/Tooltip"
var Tooltip_ = __webpack_require__(26);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip_);

// CONCATENATED MODULE: ./src/Modal/PeekIcon.jsx


function Peek() {
  return external_react_default.a.createElement("svg", {
    viewBox: "0 0 24 24",
    focusable: "false",
    style: {
      display: 'block',
      height: '16px',
      width: '16px',
      fill: 'currentColor',
      margin: '2px auto 0 auto'
    }
  }, external_react_default.a.createElement("title", null, Object(i18n_["_"])('Peek behind modal')), external_react_default.a.createElement("path", {
    d: "M7 1h4v3H7zM13 1h4v3h-4zM3 3H1v2h4V1H3M1 7h3v4H1zM1 13h3v4H1zM1 19v2h2v2h2v-4H3M7 20h4v3H7zM13 20h4v3h-4zM19 19v4h2v-2h2v-2h-2M20 13h3v4h-3zM20 7h3v4h-3zM21 3V1h-2v4h4V3"
  }));
}
// CONCATENATED MODULE: ./src/Modal/HeaderStyles.js



var HeaderStyles_StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "HeaderStyles__StyledBox",
  componentId: "sc-1p3d393-0"
})(["flex:0 0 auto;display:flex;border-bottom:1px solid ", ";position:relative;min-height:30px;background-color:", ";padding:", ";align-items:center;padding-right:", ";"], Object(themes_["variable"])('Modal', 'Header', 'boxBorderBottomColor'), Object(themes_["variable"])('Modal', 'Header', 'boxBackgroundColor'), Object(themes_["variable"])('Modal', 'Header', 'boxPadding'), function (_ref) {
  var close = _ref.close,
      peek = _ref.peek;
  return close && peek ? Object(themes_["variable"])('Modal', 'Header', 'closeAndPeekPaddingRight') : (peek || close) && Object(themes_["variable"])('Modal', 'Header', 'closeOrPeekPaddingRight');
});
var StyledTitleWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "HeaderStyles__StyledTitleWrapper",
  componentId: "sc-1p3d393-1"
})(["flex-direction:column;"]);
var StyledIcon = external_styled_components_default.a.svg.withConfig({
  displayName: "HeaderStyles__StyledIcon",
  componentId: "sc-1p3d393-2"
})(["margin-right:16px;background-color:", ";width:40px;height:40px;padding:16px;border-radius:4px;"], Object(themes_["variable"])('Modal', 'Header', 'iconBackgroundColor'));
var StyledTitle = external_styled_components_default.a.h1.withConfig({
  displayName: "HeaderStyles__StyledTitle",
  componentId: "sc-1p3d393-3"
})(["", ";color:", ";font-size:20px;margin:0;line-height:", ";overflow-wrap:break-word;font-weight:", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Modal', 'Header', 'titleColor'), Object(themes_["variable"])('Modal', 'Header', 'titleLineHeight'), Object(themes_["variable"])('Modal', 'Header', 'titleFontWeightSemiBold'));
var StyledSubtitle = external_styled_components_default.a.h3.withConfig({
  displayName: "HeaderStyles__StyledSubtitle",
  componentId: "sc-1p3d393-4"
})(["", ";font-size:14px;line-height:", ";overflow-wrap:break-word;"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Modal', 'Header', 'subTitleLineHeight'));
var StyledCloseWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "HeaderStyles__StyledCloseWrapper",
  componentId: "sc-1p3d393-5"
})(["position:absolute;top:0;right:0;bottom:50%;width:0;max-height:35px;transform-origin:bottom right;transform:rotate(-90deg) translateX(100%);"]);
var StyledClose = external_styled_components_default.a.div.withConfig({
  displayName: "HeaderStyles__StyledClose",
  componentId: "sc-1p3d393-6"
})(["position:absolute;right:0;top:0;transform:rotate(90deg) translate(-50%,-50%);"]);

// CONCATENATED MODULE: ./src/Modal/Header.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Header_extends() { Header_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Header_extends.apply(this, arguments); }

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
 * A styled container for modal header content.
 */

var Header_Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Header)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestOpenTooltip", function () {
      _this.setState({
        tooltipOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestCloseTooltip", function () {
      _this.setState({
        tooltipOpen: false
      });
    });

    _this.state = {
      tooltipOpen: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icon = _this$props.icon,
          isPeeking = _this$props.isPeeking,
          peekHandlers = _this$props.peekHandlers,
          onRequestClose = _this$props.onRequestClose,
          title = _this$props.title,
          children = _this$props.children,
          subtitle = _this$props.subtitle;
      return external_react_default.a.createElement(HeaderStyles_StyledBox, Header_extends({
        "data-test": "header",
        peek: !!peekHandlers,
        close: !!onRequestClose
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Header.propTypes))), icon && external_react_default.a.createElement(StyledIcon, null, icon), title ? external_react_default.a.createElement(StyledTitleWrapper, null, title && external_react_default.a.createElement(StyledTitle, {
        "data-test": "title"
      }, title), subtitle && external_react_default.a.createElement(StyledSubtitle, {
        "data-test": "subtitle"
      }, subtitle)) : children, (onRequestClose || peekHandlers) && external_react_default.a.createElement(StyledCloseWrapper, null, peekHandlers && external_react_default.a.createElement(Tooltip_default.a, {
        content: Object(i18n_["_"])('Peek behind this dialog.'),
        defaultPlacement: "left",
        onRequestOpen: this.handleRequestOpenTooltip,
        onRequestClose: this.handleRequestCloseTooltip,
        open: !isPeeking && this.state.tooltipOpen,
        inline: false,
        style: {
          position: 'absolute',
          top: 0,
          right: 0,
          transform: onRequestClose ? 'rotate(90deg) translate(-50%, -50%) translateX(-34px)' : 'rotate(90deg) translate(-50%, -50%)'
        }
      }, external_react_default.a.createElement(Button_default.a, Header_extends({
        appearance: "pill",
        "data-test": "peek",
        icon: external_react_default.a.createElement(Peek, null)
      }, peekHandlers))), onRequestClose && external_react_default.a.createElement(StyledClose, null, external_react_default.a.createElement(CloseButton_default.a, {
        onClick: onRequestClose,
        "data-test": "close"
      }))));
    }
  }]);

  return Header;
}(external_react_["Component"]);

_defineProperty(Header_Header, "propTypes", {
  /**
   * Children may be passed *instead* of a title. Note that children will not
   * be rendered if a title is provided.
   */
  children: external_prop_types_default.a.node,

  /** @private */
  isPeeking: external_prop_types_default.a.bool,

  /**
   * If an `onRequestClose` function is provided, the header will include a close
   * button, which will invoke the `onRequestClose` callback when clicked.
   */
  onRequestClose: external_prop_types_default.a.func,

  /** @private */
  peekHandlers: external_prop_types_default.a.object,

  /**
   * Used as the main heading.
   */
  title: external_prop_types_default.a.string,

  /**
   * Used as the subheading. Only shown if `title` is also present.
   * @includeTheme scp
   */
  subtitle: external_prop_types_default.a.node,

  /**
   * The icon to show before the title.
   * @includeTheme scp
   */
  icon: external_prop_types_default.a.node
});

/* harmony default export */ var Modal_Header = (Header_Header);
// CONCATENATED MODULE: ./src/Modal/ModalStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "ModalStyles__Styled",
  componentId: "szmyku-0"
})(["", ";display:flex;flex-direction:column;max-height:calc(100vh - ", " * 4);max-width:calc(100vw - ", " * 4);position:fixed;left:50%;transform:", ";z-index:", ";box-shadow:", ";"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('spacing'), Object(themes_["variable"])('spacing'), Object(themes_["variable"])('Modal', 'transform'), Object(themes_["variable"])('zindexModal'), Object(themes_["variable"])('Modal', 'boxShadow'));

// CONCATENATED MODULE: ./src/Modal/Modal.jsx
function Modal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Modal_typeof = function _typeof(obj) { return typeof obj; }; } else { Modal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Modal_typeof(obj); }

function Modal_extends() { Modal_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Modal_extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Modal_defineProperty(target, key, source[key]); }); } return target; }

function Modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Modal_possibleConstructorReturn(self, call) { if (call && (Modal_typeof(call) === "object" || typeof call === "function")) { return call; } return Modal_assertThisInitialized(self); }

function Modal_getPrototypeOf(o) { Modal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Modal_getPrototypeOf(o); }

function Modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Modal_defineProperties(Constructor, staticProps); return Constructor; }

function Modal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Modal_setPrototypeOf(subClass, superClass); }

function Modal_setPrototypeOf(o, p) { Modal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Modal_setPrototypeOf(o, p); }

function Modal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Modal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















var Modal_Modal =
/*#__PURE__*/
function (_Component) {
  Modal_inherits(Modal, _Component);

  Modal_createClass(Modal, null, [{
    key: "getDefaultMotionStyle",
    value: function getDefaultMotionStyle() {
      return {
        top: 0,
        opacity: 0
      };
    }
  }]);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    Modal_classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Modal_possibleConstructorReturn(this, (_getPrototypeOf2 = Modal_getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "getMotionStyle", function () {
      var theme = _this.props.theme;
      var isVerticalAlign = Object(themes_["variable"])('Modal', 'verticalAlign')({
        theme: theme
      }) === 'center';
      var topOpen = isVerticalAlign ? window.innerHeight / 2 : Object(external_react_motion_["spring"])(40, {
        precision: 1
      });
      var topClose = isVerticalAlign ? window.innerHeight / 2 : Object(external_react_motion_["spring"])(0, {
        precision: 1
      });

      if (_this.props.open) {
        return {
          top: topOpen,
          opacity: Object(external_react_motion_["spring"])(1, {
            precision: 1
          })
        };
      }

      return {
        top: topClose,
        opacity: Object(external_react_motion_["spring"])(0, {
          precision: 1
        })
      };
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleModalMount", function (element) {
      _this.el = element;

      if (element) {
        Object(external_lodash_["defer"])(focus_["takeFocus"], element, 'container');
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleModalKeyDown", function (e) {
      if (_this.state.peek) {
        e.preventDefault();
      } else {
        Object(focus_["handleTab"])(_this.el, e);
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleRequestClose", function (e) {
      if (_this.state.peek) {
        _this.setState({
          peek: false
        });
      } else {
        _this.props.onRequestClose(e);
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleKeyDownPeek", function (e) {
      if (_this.state.peek && (Object(keyboard_["keycode"])(e) === 'space' || Object(keyboard_["keycode"])(e) === 'enter')) {
        _this.setState({
          peek: false
        });
      }
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "handleClickPeek", function () {
      _this.setState(function (state) {
        return {
          peek: !state.peek
        };
      });
    });

    Modal_defineProperty(Modal_assertThisInitialized(Modal_assertThisInitialized(_this)), "renderModal", function (intepolatedStyle) {
      var _this$props = _this.props,
          enablePeek = _this$props.enablePeek,
          style = _this$props.style,
          children = _this$props.children;
      var top = intepolatedStyle.top,
          opacity = intepolatedStyle.opacity;
      var clonedChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
        if (enablePeek && child.type === Modal_Header) {
          return Object(external_react_["cloneElement"])(child, {
            isPeeking: _this.state.peek,
            peekHandlers: {
              onClick: _this.handleClickPeek,
              onKeyDown: _this.handleKeyDownPeek
            }
          });
        }

        return child;
      });
      return external_react_default.a.createElement(Styled // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
      , Modal_extends({}, Object(themes_["ref"])(_this.handleModalMount), {
        "data-test": "modal",
        style: _objectSpread({}, style, {
          top: top,
          opacity: opacity
        }),
        tabIndex: -1,
        onKeyDown: _this.handleModalKeyDown,
        role: "dialog"
      }, Object(external_lodash_["omit"])(_this.props, Object(external_lodash_["keys"])(Modal.propTypes))), clonedChildren);
    });

    _this.state = {
      peek: false
    };
    return _this;
  }

  Modal_createClass(Modal, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(ModalLayer_default.a, {
        open: this.props.open,
        peek: this.state.peek,
        getDefaultMotionStyle: Modal.getDefaultMotionStyle,
        renderModal: this.renderModal,
        getMotionStyle: this.getMotionStyle,
        onRequestClose: this.handleRequestClose
      });
    }
  }]);

  return Modal;
}(external_react_["Component"]);

Modal_defineProperty(Modal_Modal, "propTypes", {
  /**
   * Any renderable children can be passed to the modal.
   *
   * To take advantage of the default Splunk modal styles, use the
   * Modal.Header, Modal.Body, and Modal.Footer.
   */
  children: external_prop_types_default.a.node,

  /**
   * `true` if this modal should have a peek button in its header. Requires a `Modal.Header` to be present in
   * the Modal's children.
   * @excludeTheme scp
   */
  enablePeek: external_prop_types_default.a.bool,

  /**
   * A function that will be called when a close event occurs. The callback will be passed a
   * reason (either 'escapeKey' or 'clickAway') and the event.
   *
   * Generally, this callback should be used to toggle the `open` prop.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * `true` if this modal is currently open, otherwise `false`.
   */
  open: external_prop_types_default.a.bool,

  /** @private */
  style: external_prop_types_default.a.object,

  /** @private */
  theme: external_prop_types_default.a.object
});

Modal_defineProperty(Modal_Modal, "defaultProps", {
  enablePeek: false,
  onRequestClose: function onRequestClose() {},
  open: false,
  style: {},
  theme: null
});

Modal_defineProperty(Modal_Modal, "Header", Modal_Header);

Modal_defineProperty(Modal_Modal, "Body", Modal_Body);

Modal_defineProperty(Modal_Modal, "Footer", Modal_Footer);

/* harmony default export */ var src_Modal_Modal = (Object(external_styled_components_["withTheme"])(Modal_Modal));

// CONCATENATED MODULE: ./src/Modal/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Modal_Modal; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Header", function() { return Modal_Header; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Body", function() { return Modal_Body; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Footer", function() { return Modal_Footer; });



/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });