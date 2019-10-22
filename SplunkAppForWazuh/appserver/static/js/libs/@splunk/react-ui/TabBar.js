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
/******/ 	return __webpack_require__(__webpack_require__.s = 100);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/id");

/***/ }),

/***/ 100:
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

// CONCATENATED MODULE: ./src/TabBar/TabBarStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "TabBarStyles__Styled",
  componentId: "sc-4snvzg-0"
})(["", ";content:'';position:relative;&::before{content:'';display:block;position:absolute;left:0;top:0;right:0;bottom:0;border:0 solid ", ";}", ";"], Object(themes_["mixin"])('reset')('flex'), Object(themes_["variable"])('borderLightColor'), function (_ref) {
  var withUnderline = _ref.withUnderline;
  return withUnderline && Object(external_styled_components_["css"])(["&[data-tab-layout='horizontal']{&::before{border-bottom-width:1px;}}&[data-tab-layout='vertical']{display:inline-block;&::before{border-right-width:1px;}}"]);
});

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/TabBar/TabStyles.js



var tabUnderlineSize = '3px';
var tabHorizontalPadding = Object(themes_["variable"])('spacing');
var tabVerticalPadding = Object(themes_["variable"])('spacingHalf');
var StyledClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "TabStyles__StyledClickable",
  componentId: "cd5sdi-0"
})(["flex:0 1 auto;display:block;position:relative;line-height:24px;text-align:center;white-space:nowrap;color:", ";&[data-tab-layout='horizontal']{padding:", " ", ";margin-bottom:1px;}&[data-tab-layout='vertical']{width:100%;text-align:left;padding:", " ", ";right:1px;&[data-tab-has-icon]{text-align:center;}}&[aria-selected='true']{cursor:default;color:", ";font-weight:", ";}&[aria-selected='false']{box-shadow:none;&::after{display:", ";content:", ";font-weight:", ";height:", ";color:", ";overflow:", ";visibility:", ";}&:focus{box-shadow:", ";color:", ";}&:hover:not([disabled]){color:", ";}}"], Object(themes_["variable"])('TabBar', 'Tab', 'clickableColor'), tabUnderlineSize, tabHorizontalPadding, tabVerticalPadding, tabHorizontalPadding, Object(themes_["variable"])('TabBar', 'Tab', 'selectedColor'), Object(themes_["variable"])('TabBar', 'Tab', 'selectedFontWeight'), Object(themes_["variable"])('TabBar', 'Tab', 'afterDisplay'), Object(themes_["variable"])('TabBar', 'Tab', 'afterContent'), Object(themes_["variable"])('TabBar', 'Tab', 'afterFontWeight'), Object(themes_["variable"])('TabBar', 'Tab', 'afterHeight'), Object(themes_["variable"])('TabBar', 'Tab', 'afterColor'), Object(themes_["variable"])('TabBar', 'Tab', 'afterOverflow'), Object(themes_["variable"])('TabBar', 'Tab', 'afterVisibility'), Object(themes_["variable"])('TabBar', 'Tab', 'focusShadowInset'), Object(themes_["variable"])('TabBar', 'Tab', 'focusColor'), Object(themes_["variable"])('TabBar', 'Tab', 'hoverColor'));
var StyledUnderline = external_styled_components_default.a.div.withConfig({
  displayName: "TabStyles__StyledUnderline",
  componentId: "cd5sdi-1"
})(["position:absolute;background:", ";[data-tab-layout='horizontal'] > &{height:0;box-sizing:border-box;width:calc(100% - ", " * 2);bottom:-1px;transition:height 0.2s;}[aria-selected='true'] > &{background-color:", ";}[data-tab-layout='horizontal'][aria-selected='true'] > &,[data-tab-layout='horizontal']:hover:not([disabled]) > &{height:", ";}[data-tab-layout='vertical'] > &{width:0;height:calc(100% - ", " * 2);top:", ";right:-1px;transition:width 0.2s;}[data-tab-layout='vertical'][aria-selected='true'] > &,[data-tab-layout='vertical']:hover:not([disabled]) > &{width:", ";}"], Object(themes_["variable"])('borderLightColor'), tabHorizontalPadding, Object(themes_["variable"])('TabBar', 'Tab', 'underlineSelectedBackgroundColor'), tabUnderlineSize, tabVerticalPadding, tabVerticalPadding, tabUnderlineSize);
var StyledIcon = external_styled_components_default.a.span.withConfig({
  displayName: "TabStyles__StyledIcon",
  componentId: "cd5sdi-2"
})(["&[data-icon-size='inline']{text-align:left;padding-right:0.4em;> svg{transform:translateY(-1px);}}&[data-icon-size='small']{font-size:24px;height:24px;text-align:center;display:block;padding:4px 0;}&[data-icon-size='large']{font-size:48px;height:48px;text-align:center;display:block;padding:8px 0 0;}"]);
var StyledLabel = external_styled_components_default.a.div.withConfig({
  displayName: "TabStyles__StyledLabel",
  componentId: "cd5sdi-3"
})(["overflow:hidden;text-overflow:ellipsis;min-width:10px;"]);
var StyledTooltipContent = external_styled_components_default.a.div.withConfig({
  displayName: "TabStyles__StyledTooltipContent",
  componentId: "cd5sdi-4"
})(["padding:8px;font-size:", ";"], Object(themes_["variable"])('fontSizeSmall'));

// CONCATENATED MODULE: ./src/TabBar/Tab.jsx
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








var Tab_Tab =
/*#__PURE__*/
function (_Component) {
  _inherits(Tab, _Component);

  function Tab(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tab)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      var elementRef = _this.props.elementRef;

      _this.setState({
        anchor: el
      });

      if (elementRef) {
        elementRef(el);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTooltipOpen", function () {
      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTooltipClose", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          tabId = _this$props.tabId;
      onClick(e, {
        tabId: tabId
      });
      e.preventDefault();
    });

    _this.popoverId = Object(id_["createDOMID"])('popover');
    _this.state = {
      open: false,
      anchor: null
    };
    return _this;
  }

  _createClass(Tab, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          active = _this$props2.active,
          appearance = _this$props2.appearance,
          ariaControls = _this$props2.ariaControls,
          elementRef = _this$props2.elementRef,
          disabled = _this$props2.disabled,
          icon = _this$props2.icon,
          iconSize = _this$props2.iconSize,
          label = _this$props2.label,
          layout = _this$props2.layout,
          tabId = _this$props2.tabId,
          tooltip = _this$props2.tooltip,
          otherProps = _objectWithoutProperties(_this$props2, ["active", "appearance", "ariaControls", "elementRef", "disabled", "icon", "iconSize", "label", "layout", "tabId", "tooltip"]);

      var _this$state = this.state,
          anchor = _this$state.anchor,
          open = _this$state.open;
      return external_react_default.a.createElement(StyledClickable, _extends({
        role: "tab",
        "aria-controls": ariaControls,
        "aria-selected": active,
        "data-test": "tab",
        "data-test-tab-id": tabId,
        disabled: disabled,
        "data-tab-layout": layout,
        "data-test-popover-id": tooltip ? this.popoverId : undefined,
        "data-tab-has-icon": icon && iconSize !== 'inline' ? true : undefined,
        tabIndex: active ? -1 : undefined
      }, otherProps, {
        onClick: active ? undefined : this.handleClick,
        onFocus: this.handleTooltipOpen,
        onMouseEnter: this.handleTooltipOpen,
        onBlur: this.handleTooltipClose,
        onMouseLeave: this.handleTooltipClose,
        elementRef: this.handleMount,
        title: label
      }), external_react_default.a.createElement(StyledLabel, {
        "data-test": "label"
      }, icon && external_react_default.a.createElement(StyledIcon, {
        "data-icon-size": iconSize
      }, icon), label), appearance === 'navigation' && external_react_default.a.createElement(StyledUnderline, null), !disabled && tooltip && external_react_default.a.createElement(Popover_default.a, {
        anchor: anchor,
        appearance: "dark",
        closeReasons: [],
        id: this.popoverId,
        defaultPlacement: layout === 'vertical' ? 'right' : 'above',
        open: anchor && open
      }, external_react_default.a.createElement(StyledTooltipContent, null, tooltip)), tooltip && external_react_default.a.createElement(ScreenReaderContent_default.a, null, tooltip));
    }
  }]);

  return Tab;
}(external_react_["Component"]);

_defineProperty(Tab_Tab, "propTypes", {
  /** @private. Is the tab active. */
  active: external_prop_types_default.a.bool,

  /**
   * The ariaControls prop is the element id of the content displayed when the tab is selected.
   */
  ariaControls: external_prop_types_default.a.string,

  /** @private. Setting this prop to 'context' will create an appearance without underline. */
  appearance: external_prop_types_default.a.oneOf(['navigation', 'context']),

  /** Prevents user from clicking the tab. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** See Icon documention for more information. */
  icon: external_prop_types_default.a.node,

  /** @private. Size of icon. */
  iconSize: external_prop_types_default.a.oneOf(['inline', 'small', 'large']),

  /**
   * This is placed on the clickable element. For accessibility, the related content should
   * have a aria-labelledby attribute which matches this id. The id must be unique
   * within the document, unlike tabId, which must be unique within the TabBar instance.
   */
  id: external_prop_types_default.a.string,

  /** The text shown in the button. */
  label: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.element]),

  /** @private. The layout of tabs */
  layout: external_prop_types_default.a.oneOf(['horizontal', 'vertical']),

  /** @private. Call back function when activated */
  onClick: external_prop_types_default.a.func,

  /** A unique id for this tab and used by the TabBar to keep track of the open tab. */
  tabId: external_prop_types_default.a.string,

  /**
   * Content to show in a tooltip.
   */
  tooltip: external_prop_types_default.a.node
});

_defineProperty(Tab_Tab, "defaultProps", {
  active: false,
  disabled: false,
  onClick: function onClick() {}
});

/* harmony default export */ var TabBar_Tab = (Tab_Tab);
// CONCATENATED MODULE: ./src/TabBar/TabBar.jsx
function TabBar_extends() { TabBar_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return TabBar_extends.apply(this, arguments); }







var propTypes = {
  /** The `tabId` of the `TabBar.Tab` to activate. */
  activeTabId: external_prop_types_default.a.any,

  /**
   * Setting this prop to 'context' will create an appearance without underline.
   * @includeTheme scp
   */
  appearance: external_prop_types_default.a.oneOf(['navigation', 'context']),

  /**
   * `children` should be `TabBar.Tab`.
   */
  children: external_prop_types_default.a.node,

  /** @private */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Size of icon in `TabBar.Tab` if it has an icon */
  iconSize: external_prop_types_default.a.oneOf(['inline', 'small', 'large']),

  /** The layout of tabs */
  layout: external_prop_types_default.a.oneOf(['horizontal', 'vertical']),

  /** A callback that receives the event and data (selectedTabId). */
  onChange: external_prop_types_default.a.func,

  /** Width of each `TabBar.Tab` in pixels (Must be greater than 50 pixels). Leave blank for auto width. */
  tabWidth: external_prop_types_default.a.number
};
var defaultProps = {
  appearance: 'navigation',
  iconSize: 'inline',
  disabled: false,
  layout: 'horizontal',
  onChange: function onChange() {}
};

function TabBar(props) {
  var activeTabId = props.activeTabId,
      appearance = props.appearance,
      children = props.children,
      disabled = props.disabled,
      elementRef = props.elementRef,
      iconSize = props.iconSize,
      layout = props.layout,
      tabWidth = props.tabWidth,
      onChange = props.onChange;
  var clonedChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
    return Object(external_react_["cloneElement"])(child, {
      onClick: function onClick(e, data) {
        onChange(e, {
          selectedTabId: data.tabId
        });
      },
      active: activeTabId === child.props.tabId,
      appearance: appearance,
      disabled: disabled || child.props.disabled,
      style: tabWidth && tabWidth > 50 ? {
        width: tabWidth
      } : undefined,
      iconSize: iconSize,
      layout: layout
    });
  });
  return external_react_default.a.createElement(Styled, TabBar_extends({
    "data-test": "tab-bar",
    "data-test-active-tab-id": activeTabId,
    role: "tablist"
  }, Object(themes_["ref"])(elementRef), {
    "data-tab-layout": layout
  }, Object(external_lodash_["omit"])(props, Object(external_lodash_["keys"])(propTypes)), {
    withUnderline: appearance === 'navigation'
  }), clonedChildren);
}

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;
TabBar.Tab = TabBar_Tab;
/* harmony default export */ var TabBar_TabBar = (TabBar);

// CONCATENATED MODULE: ./src/TabBar/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return TabBar_TabBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Tab", function() { return TabBar_Tab; });



/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Popover");

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