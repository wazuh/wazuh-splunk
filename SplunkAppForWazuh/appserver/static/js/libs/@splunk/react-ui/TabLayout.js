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
/******/ 	return __webpack_require__(__webpack_require__.s = 104);
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

/***/ 104:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/TabBar"
var TabBar_ = __webpack_require__(51);
var TabBar_default = /*#__PURE__*/__webpack_require__.n(TabBar_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/TabLayout/TabLayoutStyles.js


var StyledPanel = external_styled_components_default.a.div.withConfig({
  displayName: "TabLayoutStyles__StyledPanel",
  componentId: "sc-1edbp0f-0"
})(["", ";"], Object(themes_["mixin"])('reset')('block'));
var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "TabLayoutStyles__Styled",
  componentId: "sc-1edbp0f-1"
})(["text-align:center;margin-top:", ";&[data-flex='true']{display:flex;> ", "{width:100%;}> [role='tablist']{flex:0 0 auto;}}"], Object(themes_["variable"])('spacing'),
/* sc-sel */
StyledPanel);

// CONCATENATED MODULE: ./src/TabLayout/Panel.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** See Icon documention for more information.
   * @excludeTheme scp
   */
  icon: external_prop_types_default.a.node,

  /** The text shown in the button. */
  label: external_prop_types_default.a.string,

  /** A unique id for this panel and used by the TabLayout to keep track of the open panel. */
  panelId: external_prop_types_default.a.string.isRequired,

  /**
   * Content to show in a tooltip when the user hovers over or focuses on the tab.
   */
  tooltip: external_prop_types_default.a.node,

  /** Prevents user from clicking the tab. */
  disabled: external_prop_types_default.a.bool
};
var defaultProps = {
  disabled: false
};

function Panel(props) {
  var children = props.children,
      elementRef = props.elementRef,
      panelId = props.panelId;
  return external_react_default.a.createElement(StyledPanel, _extends({
    "data-test": "panel",
    "data-test-panel-id": panelId
  }, Object(themes_["ref"])(elementRef), {
    role: "tabpanel"
  }, Object(external_lodash_["omit"])(props, Object(external_lodash_["keys"])(propTypes))), children);
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
/* harmony default export */ var TabLayout_Panel = (Panel);
// CONCATENATED MODULE: ./src/TabLayout/TabLayout.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function TabLayout_extends() { TabLayout_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return TabLayout_extends.apply(this, arguments); }

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
 * The `TabLayout` is a group of managed `Panels`. Only one panel can be open at a time.
 * TabLayout supports both the controlled and uncontrolled patterns.
 */

var TabLayout_TabLayout =
/*#__PURE__*/
function (_Component) {
  _inherits(TabLayout, _Component);

  function TabLayout(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TabLayout);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TabLayout)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e, data) {
      var activePanelId = data.selectedTabId;

      if (!_this.isControlled()) {
        _this.setState({
          activePanelId: activePanelId
        });
      }

      _this.props.onChange(e, {
        activePanelId: activePanelId
      });
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'activePanelId');

    if (!_this.isControlled()) {
      _this.state = {
        activePanelId: props.defaultActivePanelId
      };
    }

    if (false) {}

    _this.guid = Object(id_["createDOMID"])();
    return _this;
  }

  _createClass(TabLayout, [{
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

      var panel;
      var activePanelId = this.isControlled() ? this.props.activePanelId : this.state.activePanelId;
      var children = this.props.children;
      var tabs = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
        var props = child.props;
        var id = "".concat(_this2.guid, "-").concat(props.panelId);
        var tabId = "".concat(_this2.guid, "-").concat(props.panelId, "-tab");

        if (props.panelId === activePanelId) {
          panel = Object(external_react_["cloneElement"])(child, {
            'aria-labelledby': tabId,
            id: id
          });
        }

        return external_react_default.a.createElement(TabBar_default.a.Tab, {
          appearance: _this2.props.appearance,
          icon: props.icon,
          key: props.panelId,
          label: props.label,
          tabId: props.panelId,
          id: tabId,
          ariaControls: id,
          tooltip: props.tooltip,
          disabled: props.disabled
        });
      });

      if (false) {}

      return external_react_default.a.createElement(Styled, TabLayout_extends({
        "data-test": "tab-layout",
        "data-test-active-panel-id": activePanelId,
        "data-flex": this.props.layout === 'vertical' || undefined
      }, Object(themes_["ref"])(this.props.elementRef), Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(TabLayout.propTypes))), external_react_default.a.createElement(TabBar_default.a, {
        appearance: this.props.appearance,
        activeTabId: activePanelId,
        onChange: this.handleChange,
        iconSize: this.props.iconSize,
        tabWidth: this.props.tabWidth,
        layout: this.props.layout
      }, tabs), panel);
    }
  }]);

  return TabLayout;
}(external_react_["Component"]);

_defineProperty(TabLayout_TabLayout, "propTypes", {
  /**
   * Setting this prop to 'context' will create an appearance without underline.
   * @includeTheme scp
   */
  appearance: external_prop_types_default.a.oneOf(['navigation', 'context']),

  /**
   * `children` should be `TabLayout.Panel`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Sets the active panel on the initial render. It should match the `panelId` of one of
   * the child `TabLayout.Panel`s. Only use `defaultActivePanelId` when using `TabLayout`
   * as an uncontrolled component.
   */
  defaultActivePanelId: external_prop_types_default.a.any,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Size of icon in `TabLayout.Panel` if it has an icon.
   * @excludeTheme scp
   */
  iconSize: external_prop_types_default.a.oneOf(['inline', 'small', 'large']),

  /**
   * The layout direction for tabs.
   * @excludeTheme scp
   */
  layout: external_prop_types_default.a.oneOf(['horizontal', 'vertical']),

  /** Width of each tab in pixels (Must be greater than 10 pixels). Leave blank for auto width. */
  tabWidth: external_prop_types_default.a.number,

  /** A callback that receives the event and data (selectedPanelId). */
  onChange: external_prop_types_default.a.func,

  /** The `panelId` of the `TabLayout.Panel` to activate. */
  activePanelId: external_prop_types_default.a.any
});

_defineProperty(TabLayout_TabLayout, "defaultProps", {
  appearance: 'navigation',
  iconSize: 'inline',
  layout: 'horizontal',
  onChange: function onChange() {}
});

_defineProperty(TabLayout_TabLayout, "Panel", TabLayout_Panel);

/* harmony default export */ var src_TabLayout_TabLayout = (TabLayout_TabLayout);

// CONCATENATED MODULE: ./src/TabLayout/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_TabLayout_TabLayout; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Panel", function() { return TabLayout_Panel; });



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

/***/ 51:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/TabBar");

/***/ })

/******/ });