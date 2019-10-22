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
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Dropdown");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/MoreVertical");

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Anchor");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/Card/BodyStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "BodyStyles__StyledBox",
  componentId: "sc-1qxujgr-0"
})(["padding:", ";flex:1 1 auto;overflow:auto;height:100%;&:not(:first-child){padding-top:", ";}&:first-child{border-top-left-radius:", ";border-top-right-radius:", ";}&:last-child{border-bottom-left-radius:", ";border-bottom-right-radius:", ";}"], Object(themes_["variable"])('Card', 'Body', 'padding'), Object(themes_["variable"])('Card', 'Body', 'firstChildPaddingTop'), Object(themes_["variable"])('Card', 'borderRadius'), Object(themes_["variable"])('Card', 'borderRadius'), Object(themes_["variable"])('Card', 'borderRadius'), Object(themes_["variable"])('Card', 'borderRadius'));

// CONCATENATED MODULE: ./src/Card/Body.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func
};
/**
 * A styled container for card body content.
 */

function Body(props) {
  var children = props.children,
      otherProps = _objectWithoutProperties(props, ["children"]);

  return external_react_default.a.createElement(StyledBox, _extends({
    "data-test": "body"
  }, otherProps), children);
}

Body.propTypes = propTypes;
/* harmony default export */ var Card_Body = (Body);
// CONCATENATED MODULE: ./src/Card/FooterStyles.js



var FooterStyles_StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "FooterStyles__StyledBox",
  componentId: "sc-5u4alk-0"
})(["padding:", ";text-align:right;color:", ";&[data-show-top-border='true']{border-top:", ";}&:first-child{border-top:none;}"], Object(themes_["variable"])('Card', 'Footer', 'padding'), Object(themes_["variable"])('Card', 'Footer', 'boxColor'), Object(themes_["variable"])('Card', 'Footer', 'borderTop'));

// CONCATENATED MODULE: ./src/Card/Footer.jsx
function Footer_extends() { Footer_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Footer_extends.apply(this, arguments); }

function Footer_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Footer_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Footer_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var Footer_propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Show top border of footer.
   * @excludeTheme scp
   * */
  showBorder: external_prop_types_default.a.bool
};
var defaultProps = {
  showBorder: true
};
/**
 * A styled container for card footer content.
 */

function Footer(props) {
  var children = props.children,
      showBorder = props.showBorder,
      otherProps = Footer_objectWithoutProperties(props, ["children", "showBorder"]);

  return external_react_default.a.createElement(FooterStyles_StyledBox, Footer_extends({
    "data-test": "footer",
    "data-show-top-border": showBorder
  }, otherProps), children);
}

Footer.propTypes = Footer_propTypes;
Footer.defaultProps = defaultProps;
/* harmony default export */ var Card_Footer = (Footer);
// EXTERNAL MODULE: external "@splunk/react-icons/MoreVertical"
var MoreVertical_ = __webpack_require__(40);
var MoreVertical_default = /*#__PURE__*/__webpack_require__.n(MoreVertical_);

// EXTERNAL MODULE: external "@splunk/react-ui/Anchor"
var Anchor_ = __webpack_require__(53);
var Anchor_default = /*#__PURE__*/__webpack_require__.n(Anchor_);

// EXTERNAL MODULE: external "@splunk/react-ui/Button"
var Button_ = __webpack_require__(16);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@splunk/react-ui/Dropdown"
var Dropdown_ = __webpack_require__(25);
var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown_);

// CONCATENATED MODULE: ./src/Card/HeaderStyles.js



var StyledTitle = external_styled_components_default.a.h1.withConfig({
  displayName: "HeaderStyles__StyledTitle",
  componentId: "sc-1rxats5-0"
})(["", ";font-size:", ";font-weight:", ";line-height:1.2;margin:0;overflow-wrap:break-word;padding:0;"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('fontSizeLarge'), Object(themes_["variable"])('fontWeightSemiBold'));
var StyledSubtitle = external_styled_components_default.a.h2.withConfig({
  displayName: "HeaderStyles__StyledSubtitle",
  componentId: "sc-1rxats5-1"
})(["", ";font-size:", ";color:", ";margin:0;padding:0;font-weight:normal;"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('Card', 'Header', 'subtitleColor'));
var StyledTitleContainer = external_styled_components_default.a.div.withConfig({
  displayName: "HeaderStyles__StyledTitleContainer",
  componentId: "sc-1rxats5-2"
})(["&[data-truncate-title='true']{overflow:hidden;> ", ",> ", "{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}}&:not(:last-child){margin-right:", ";}"],
/* sc-sel */
StyledTitle,
/* sc-sel */
StyledSubtitle, Object(themes_["variable"])('spacingHalf'));
var StyledActionContainer = external_styled_components_default.a.div.withConfig({
  displayName: "HeaderStyles__StyledActionContainer",
  componentId: "sc-1rxats5-3"
})(["display:flex;justify-content:flex-end;align-items:center;"]);
var HeaderStyles_StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "HeaderStyles__StyledBox",
  componentId: "sc-1rxats5-4"
})(["display:flex;flex:0 0 auto;justify-content:space-between;position:relative;min-height:30px;padding:", ";border-top-left-radius:", ";border-top-right-radius:", ";>:not(", "):not(", "){flex:1 0 auto;}"], Object(themes_["variable"])('Card', 'Header', 'padding'), Object(themes_["variable"])('Card', 'borderRadius'), Object(themes_["variable"])('Card', 'borderRadius'),
/* sc-sel */
StyledTitleContainer,
/* sc-sel */
StyledActionContainer);

// CONCATENATED MODULE: ./src/Card/Header.jsx
function Header_extends() { Header_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Header_extends.apply(this, arguments); }

function Header_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Header_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Header_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var Header_propTypes = {
  /**
   * Adds a primary action to the header.
   * It's recommended to have only one primary action and use an icon-only button style.
   * @includeTheme scp
   */
  actionsPrimary: external_prop_types_default.a.node,

  /** Adds a secondary actions dropdown menu to the header. This prop should be a `Menu`.
   * @includeTheme scp
   */
  actionsSecondary: external_prop_types_default.a.node,

  /**
   * Make the title an anchor so it can be bookmarked with a fragment.
   */
  anchor: external_prop_types_default.a.string,

  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Used as the subheading.
   */
  subtitle: external_prop_types_default.a.node,

  /**
   * Used as the main heading.
   */
  title: external_prop_types_default.a.node,

  /**
   * Do not wrap Title and Subtitle. Long titles will truncate with ellipsis.
   */
  truncateTitle: external_prop_types_default.a.bool
};
var Header_defaultProps = {
  truncateTitle: true
};
/**
 * A styled container for card header content.
 */

function Header(props) {
  var actionsPrimary = props.actionsPrimary,
      actionsSecondary = props.actionsSecondary,
      anchor = props.anchor,
      title = props.title,
      subtitle = props.subtitle,
      truncateTitle = props.truncateTitle,
      children = props.children,
      otherProps = Header_objectWithoutProperties(props, ["actionsPrimary", "actionsSecondary", "anchor", "title", "subtitle", "truncateTitle", "children"]);

  var actionsSecondaryToggle = external_react_default.a.createElement(Button_default.a, {
    appearance: "secondary",
    "data-test": "actions-secondary-toggle",
    icon: external_react_default.a.createElement(MoreVertical_default.a, {
      size: 1.7,
      hideDefaultTooltip: true
    })
  });
  return external_react_default.a.createElement(HeaderStyles_StyledBox, Header_extends({
    "data-test": "header"
  }, otherProps), (title || subtitle) && external_react_default.a.createElement(StyledTitleContainer, {
    "data-truncate-title": truncateTitle
  }, title && external_react_default.a.createElement(StyledTitle, null, anchor ? external_react_default.a.createElement(Anchor_default.a, {
    name: anchor
  }, title) : title), subtitle && external_react_default.a.createElement(StyledSubtitle, null, subtitle)), children, (actionsPrimary || actionsSecondary) && external_react_default.a.createElement(StyledActionContainer, null, actionsPrimary, actionsSecondary && external_react_default.a.createElement(Dropdown_default.a, {
    toggle: actionsSecondaryToggle
  }, actionsSecondary)));
}

Header.propTypes = Header_propTypes;
Header.defaultProps = Header_defaultProps;
/* harmony default export */ var Card_Header = (Header);
// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Card/CardStyles.js



var cardTransitionTime = '0.2s';
var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "CardStyles__Styled",
  componentId: "k4w3qo-0"
})(["", ";display:inline-flex;flex-direction:column;align-items:stretch;background-color:", ";min-width:100px;flex:1;vertical-align:top;border:1px solid transparent;border-radius:", ";transition:height ", ",width ", ",min-width ", ",max-width ", ",margin ", ",box-shadow ", ",border-color ", ";&[data-clickable='true']{cursor:pointer;&:hover{box-shadow:", ";background-color:", ";}&:focus{box-shadow:", ";background-color:", ";}&[data-selected='true']{border-color:", ";background-color:", ";}}&[data-card-has-border='true']{border-color:", ";}"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('Card', 'backgroundColor'), Object(themes_["variable"])('Card', 'borderRadius'), cardTransitionTime, cardTransitionTime, cardTransitionTime, cardTransitionTime, cardTransitionTime, cardTransitionTime, cardTransitionTime, Object(themes_["variable"])('Card', 'overlayShadow'), Object(themes_["variable"])('Card', 'hoverBackgroundColor'), Object(themes_["variable"])('Card', 'focusShadow'), Object(themes_["variable"])('Card', 'focusBackgroundColor'), Object(themes_["variable"])('Card', 'clickableSelectedBorderColor'), Object(themes_["variable"])('Card', 'selectedBackgroundColor'), Object(themes_["variable"])('Card', 'borderColor'));
var StyledClickable = Styled.withComponent(Clickable_default.a);
/* A child element we add to <button>s to make flexbox work.
   Without this wrapper element, child elements won't flex
   in Firefox.
   This unfortunately exposes some fragility in IE (e.g., adding
   a flex: 1 style here will cause the card to collapse) so test
   across the supported browsers if making a change here.
*/

var StyledFirefoxFlexHack = external_styled_components_default.a.div.withConfig({
  displayName: "CardStyles__StyledFirefoxFlexHack",
  componentId: "k4w3qo-1"
})(["display:flex;flex:1 1 auto;flex-direction:column;align-items:stretch;justify-content:stretch;height:100%;border-radius:", ";"], Object(themes_["variable"])('Card', 'borderRadius'));

// CONCATENATED MODULE: ./src/Card/Card.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Card_extends() { Card_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Card_extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function Card_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Card_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Card_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var Card_Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Card)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCardClick", function (e) {
      var _this$props = _this.props,
          selected = _this$props.selected,
          value = _this$props.value;

      _this.props.onClick(e, {
        selected: selected,
        value: value
      });
    });

    return _this;
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          elementRef = _this$props2.elementRef,
          minWidth = _this$props2.minWidth,
          maxWidth = _this$props2.maxWidth,
          margin = _this$props2.margin,
          onBlur = _this$props2.onBlur,
          onClick = _this$props2.onClick,
          openInNewContext = _this$props2.openInNewContext,
          showBorder = _this$props2.showBorder,
          selected = _this$props2.selected,
          style = _this$props2.style,
          to = _this$props2.to,
          otherProps = Card_objectWithoutProperties(_this$props2, ["children", "elementRef", "minWidth", "maxWidth", "margin", "onBlur", "onClick", "openInNewContext", "showBorder", "selected", "style", "to"]);

      var isClickable = !!onClick || !!to;

      var cardStyle = _objectSpread({
        minWidth: minWidth,
        maxWidth: maxWidth,
        margin: margin
      }, style);

      if (isClickable) {
        return external_react_default.a.createElement(StyledClickable, Card_extends({
          "data-clickable": true,
          "data-selected": selected,
          "data-card-has-border": showBorder,
          elementRef: elementRef,
          style: _objectSpread({}, cardStyle),
          "data-test": "card",
          role: "presentation"
        }, otherProps, {
          onClick: onClick ? this.handleCardClick : undefined,
          onBlur: onBlur,
          openInNewContext: openInNewContext,
          to: to || undefined
        }), external_react_default.a.createElement(StyledFirefoxFlexHack, null, children));
      }

      return external_react_default.a.createElement(Styled, Card_extends({
        "data-selected": selected,
        "data-card-has-border": showBorder
      }, Object(themes_["ref"])(elementRef), {
        style: cardStyle,
        "data-test": "card",
        role: "presentation"
      }, otherProps), children);
    }
  }]);

  return Card;
}(external_react_["Component"]);

_defineProperty(Card_Card, "propTypes", {
  /**
   * Any renderable children can be passed to the card.
   *
   * To take advantage of the default Splunk card styles, use the
   * Card.Header, Card.Body, and Card.Footer.
   */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private */
  margin: external_prop_types_default.a.number,

  /** @private */
  minWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string]),

  /** @private */
  maxWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string]),

  /**
   * Callback when card loses focus.
   */
  onBlur: external_prop_types_default.a.func,

  /**
   * Callback when card is clicked.
   */
  onClick: external_prop_types_default.a.func,

  /**
   * To open the `to` link in a new window, set openInNewContext to true.
   */
  openInNewContext: external_prop_types_default.a.bool,

  /**
   * If card is selected.
   */
  selected: external_prop_types_default.a.bool,

  /**
   * The card includes a border if `true`.
   * @excludeTheme scp
   * */
  showBorder: external_prop_types_default.a.bool,

  /** @private */
  style: external_prop_types_default.a.object,

  /**
   * A url to go to when card is clicked.
   */
  to: external_prop_types_default.a.string,

  /** Returns a value on click. Use when composing or have multiple selectable cards. */
  value: external_prop_types_default.a.any
});

_defineProperty(Card_Card, "defaultProps", {
  selected: false,
  style: {},
  showBorder: true,
  openInNewContext: false
});

_defineProperty(Card_Card, "Header", Card_Header);

_defineProperty(Card_Card, "Body", Card_Body);

_defineProperty(Card_Card, "Footer", Card_Footer);

/* harmony default export */ var src_Card_Card = (Card_Card);

// CONCATENATED MODULE: ./src/Card/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Card_Card; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Header", function() { return Card_Header; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Body", function() { return Card_Body; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Footer", function() { return Card_Footer; });



/***/ })

/******/ });