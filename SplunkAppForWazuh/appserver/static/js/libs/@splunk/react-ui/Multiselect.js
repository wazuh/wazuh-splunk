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
/******/ 	return __webpack_require__(__webpack_require__.s = 95);
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

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Menu");

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ResultsMenu");

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Popover");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/filter");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Text");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Dropdown");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Link");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 69:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Chip");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ }),

/***/ 95:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/Menu"
var Menu_ = __webpack_require__(17);

// EXTERNAL MODULE: external "@splunk/ui-utils/filter"
var filter_ = __webpack_require__(21);

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/react-ui/Button"
var Button_ = __webpack_require__(16);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@splunk/react-ui/Link"
var Link_ = __webpack_require__(29);
var Link_default = /*#__PURE__*/__webpack_require__.n(Link_);

// EXTERNAL MODULE: external "@splunk/react-ui/ResultsMenu"
var ResultsMenu_ = __webpack_require__(18);
var ResultsMenu_default = /*#__PURE__*/__webpack_require__.n(ResultsMenu_);

// EXTERNAL MODULE: external "@splunk/react-ui/Text"
var Text_ = __webpack_require__(22);
var Text_default = /*#__PURE__*/__webpack_require__.n(Text_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Multiselect/Option.jsx
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





/**
 * An option within a `Multiselect`. This inherits from
 * [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
 * so any elements passed to it must also be pure.
 */

var Option_Option =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Option, _PureComponent);

  function Option() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Option);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Option)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          value = _this$props.value,
          disabled = _this$props.disabled;

      if (!disabled) {
        onClick(e, {
          value: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (c) {
      _this.c = c;
    });

    return _this;
  }

  _createClass(Option, [{
    key: "scrollIntoViewIfNeeded",
    value: function scrollIntoViewIfNeeded() {
      this.c.scrollIntoViewIfNeeded();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          value = _this$props2.value,
          children = _this$props2.children,
          compact = _this$props2.compact,
          label = _this$props2.label,
          otherProps = _objectWithoutProperties(_this$props2, ["value", "children", "compact", "label"]);

      var ariaProps = {};

      if (compact) {
        ariaProps['aria-checked'] = this.props.selected;
      } else {
        ariaProps['aria-selected'] = this.props.selected;
      }

      return external_react_default.a.createElement(Menu_["Item"], _extends({
        "data-test": "option",
        "data-test-value": value
      }, Object(themes_["ref"])(this.handleMount), otherProps, {
        selectable: compact,
        selectableAppearance: compact ? 'checkbox' : undefined,
        onClick: this.handleClick // ariaProps contains the required attributes
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        ,
        role: "option",
        value: value
      }, ariaProps), children || label);
    }
  }]);

  return Option;
}(external_react_["PureComponent"]);

_defineProperty(Option_Option, "propTypes", {
  /**
   * When provided, `children` is rendered instead of the `label`.
   *
   * Caution: The element(s) passed here must be pure.
   */
  children: external_prop_types_default.a.node,

  /**
   * @private this is passed down from Multiselect.
   */
  compact: external_prop_types_default.a.bool,

  /**
   * Additional information to explain the option, such as "Recommended".
   */
  description: external_prop_types_default.a.string,

  /**
   * The description text may appear to the right of the label or under the label.
   * @themeNotes Themes that don't support 'right' fall back to 'bottom'.
   */
  descriptionPosition: external_prop_types_default.a.oneOf(['right', 'bottom']),

  /**
   * If disabled=true, the option is grayed out and cannot be clicked.
   */
  disabled: external_prop_types_default.a.bool,

  /**
   * Adding hidden options can be useful for resolving the selected display label and icon,
   * when the option should not be in the list. This scenario can arise when Select's filter is
   * controlled, because the selected item may be filtered out; and when a legacy option is
   * valid, but should no longer be displayed as a selectable option.
   */
  hidden: external_prop_types_default.a.bool,

  /**
   * The icon to show before the label. See the @splunk/react-icons package for
   * drop in icons.
   *
   * Caution: The element(s) passed here must be pure. All icons in the react-icons package are pure.
   */
  icon: external_prop_types_default.a.node,

  /**
   * The text to show for the option when `children` is not defined. When filtering, the
   * `label` is used for matching to the filter text.
   */
  label: external_prop_types_default.a.string.isRequired,

  /** @private */
  onClick: external_prop_types_default.a.func,

  /**
   * Sections of the label string to highlight as a match. This is automatically set for
   * uncontrolled filters, so it's not normally necessary to set this property when using
   * filtering.
   */
  matchRanges: external_prop_types_default.a.arrayOf(external_prop_types_default.a.shape({
    start: external_prop_types_default.a.number.isRequired,
    end: external_prop_types_default.a.number.isRequired
  })),

  /** @private */
  selected: external_prop_types_default.a.bool,

  /** The `Chip` appearance to use if the option is selected. Not supported in compact mode. */
  selectedAppearance: external_prop_types_default.a.oneOf(['info', 'success', 'warning', 'error']),

  /** The `Chip` background color to use if the option is selected. Not supported in compact mode. */
  selectedBackgroundColor: external_prop_types_default.a.string,

  /** The `Chip` foreground color to use if the option is selected. Not supported in compact mode. */
  selectedForegroundColor: external_prop_types_default.a.string,

  /**
   * When `true`, wrapping is disabled and any additional text is ellipsised.
   */
  truncate: external_prop_types_default.a.bool,

  /**
   * The label and/or icon will be placed on the Control's toggle if it matches this value.
   */
  value: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.number, external_prop_types_default.a.bool]).isRequired
});

_defineProperty(Option_Option, "defaultProps", {
  compact: false,
  descriptionPosition: 'bottom',
  disabled: false,
  onClick: function onClick() {},
  selected: false,
  truncate: false
});

/* harmony default export */ var Multiselect_Option = (Option_Option);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Dropdown"
var Dropdown_ = __webpack_require__(25);
var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown_);

// CONCATENATED MODULE: ./src/Multiselect/CompactStyles.js



var StyledDropdown = external_styled_components_default()(Dropdown_default.a).withConfig({
  displayName: "CompactStyles__StyledDropdown",
  componentId: "me10n1-0"
})(["&[data-inline]{width:400px;}"]);
var StyledFilter = external_styled_components_default.a.div.withConfig({
  displayName: "CompactStyles__StyledFilter",
  componentId: "me10n1-1"
})(["padding:8px;min-width:160px;:not([data-placement='above']) > &{border-bottom:", ";}[data-placement='above'] > &{border-top:", ";}"], Object(themes_["variable"])('border'), Object(themes_["variable"])('border'));
var StyledCount = external_styled_components_default.a.span.withConfig({
  displayName: "CompactStyles__StyledCount",
  componentId: "me10n1-2"
})(["padding-right:", ";"], Object(themes_["variable"])('spacingQuarter'));
var StyledToggleAllControls = external_styled_components_default.a.div.withConfig({
  displayName: "CompactStyles__StyledToggleAllControls",
  componentId: "me10n1-3"
})(["padding:", " 8px;&:not([data-placement='above']){border-bottom:", ";}&[data-placement='above']{border-top:", ";}"], Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('border'), Object(themes_["variable"])('border'));

// CONCATENATED MODULE: ./src/Multiselect/Compact.jsx
function Compact_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Compact_typeof = function _typeof(obj) { return typeof obj; }; } else { Compact_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Compact_typeof(obj); }

function Compact_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Compact_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Compact_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Compact_extends() { Compact_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Compact_extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Compact_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Compact_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Compact_createClass(Constructor, protoProps, staticProps) { if (protoProps) Compact_defineProperties(Constructor.prototype, protoProps); if (staticProps) Compact_defineProperties(Constructor, staticProps); return Constructor; }

function Compact_possibleConstructorReturn(self, call) { if (call && (Compact_typeof(call) === "object" || typeof call === "function")) { return call; } return Compact_assertThisInitialized(self); }

function Compact_getPrototypeOf(o) { Compact_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Compact_getPrototypeOf(o); }

function Compact_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Compact_setPrototypeOf(subClass, superClass); }

function Compact_setPrototypeOf(o, p) { Compact_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Compact_setPrototypeOf(o, p); }

function Compact_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Compact_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















var Compact_Compact =
/*#__PURE__*/
function (_Component) {
  Compact_inherits(Compact, _Component);

  function Compact(props) {
    var _getPrototypeOf2;

    var _this;

    Compact_classCallCheck(this, Compact);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Compact_possibleConstructorReturn(this, (_getPrototypeOf2 = Compact_getPrototypeOf(Compact)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleSelectAll", function (e) {
      var values = Object(external_lodash_["uniq"])(_this.getCurrentValues().concat(_this.displayedValues));
      var _this$props = _this.props,
          name = _this$props.name,
          children = _this$props.children;

      if (!_this.isControlled()) {
        values = external_react_default.a.Children.toArray(children).filter(function (child) {
          return Object(external_lodash_["includes"])(values, child.props.value) && !child.props.disabled;
        }).map(function (child) {
          return child.props.value;
        });

        _this.setState({
          values: values
        });
      }

      _this.props.onChange(e, {
        values: values,
        name: name
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleClearAll", function (e) {
      // Clear the filtered items, items when filtering. Else clear all the items.
      var values = _this.state.filterKeyword ? external_lodash_["without"].apply(void 0, [_this.getCurrentValues()].concat(_toConsumableArray(_this.displayedValues))) : [];
      var name = _this.props.name;

      if (!_this.isControlled()) {
        _this.setState({
          values: values
        });
      }

      _this.props.onChange(e, {
        values: values,
        name: name
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleRequestRemove", function (e, _ref) {
      var value = _ref.value;
      Object(external_lodash_["defer"])(function () {
        return _this.removeValue(e, value);
      }); // allow the event to bubble before removing.
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleTextKeyDown", function (e) {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          onScrollBottom = _this$props2.onScrollBottom,
          tabConfirmsNewValue = _this$props2.tabConfirmsNewValue;

      if (Object(keyboard_["keycode"])(e) === 'tab') {
        e.preventDefault();

        if (tabConfirmsNewValue && !Object(external_lodash_["isUndefined"])(_this.activeValue) && _this.availableOptionCount <= 1) {
          _this.toggleValue(e, _this.activeValue);
        }
      }

      if (e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }

      if (Object(keyboard_["keycode"])(e) === 'down') {
        e.preventDefault();

        _this.setState(function (state) {
          return {
            activeIndex: Math.min(state.activeIndex + 1, _this.availableOptionCount - 1)
          };
        });

        if (children && onScrollBottom) {
          var beforeLastChild = children.length - (2 + _this.getCurrentValues().length);

          if (_this.state.activeIndex === beforeLastChild) {
            onScrollBottom();
          }
        }
      }

      if (Object(keyboard_["keycode"])(e) === 'up') {
        e.preventDefault();

        _this.setState(function (state) {
          return {
            activeIndex: Math.max(state.activeIndex - 1, 0)
          };
        });
      }

      if (Object(keyboard_["keycode"])(e) === 'enter' && !Object(external_lodash_["isUndefined"])(_this.activeValue) && _this.state.open) {
        _this.toggleValue(e, _this.activeValue);
      }
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleMenuOptionClick", function (e, _ref2) {
      var value = _ref2.value;
      e.preventDefault();

      _this.toggleValue(e, value);
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleTextChange", function (e, _ref3) {
      var value = _ref3.value;

      _this.setState({
        filterKeyword: value,
        open: true,
        activeIndex: 0
      });

      _this.props.onFilterChange(e, {
        keyword: value
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleTextFocus", function () {
      _this.setState({
        textHasFocus: true
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleTextBlur", function () {
      _this.setState({
        textHasFocus: false
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleRequestOpen", function (e) {
      _this.setState({
        open: true,
        activeIndex: 0,
        topValues: _this.getCurrentValues(),
        filterKeyword: ''
      });

      _this.props.onFilterChange(e, {
        keyword: ''
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleRequestClose", function () {
      _this.setState({
        open: false
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleScrollBottom", function () {
      if (_this.state.open && !_this.state.isLoadingOptions) {
        _this.props.onScrollBottom();
      }
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleMount", function (container) {
      _this.setState({
        dropdown: container
      });
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleInputMount", function (el) {
      _this.input = el;

      _this.props.inputRef(el);
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "handleActiveOptionMount", function (c) {
      if (c) {
        c.scrollIntoViewIfNeeded();
      }
    });

    Compact_defineProperty(Compact_assertThisInitialized(Compact_assertThisInitialized(_this)), "renderMenu", function (_ref4) {
      var anchorWidth = _ref4.anchorWidth,
          maxHeight = _ref4.maxHeight,
          placement = _ref4.placement;
      var _this$state = _this.state,
          filterKeyword = _this$state.filterKeyword,
          textHasFocus = _this$state.textHasFocus,
          topValues = _this$state.topValues;
      var _this$props3 = _this.props,
          allowNewValues = _this$props3.allowNewValues,
          controlledFilter = _this$props3.controlledFilter;

      var currentValues = _this.getCurrentValues();

      _this.availableOptionCount = 0;
      _this.selectedOptionCount = 0;
      _this.activeValue = undefined;
      var foundExactMatch;
      var childrenTopCount = 0;

      function isOption(child) {
        return Object(external_lodash_["get"])(child, ['props', 'value'], false);
      }

      var children = external_react_["Children"].toArray(_this.props.children).reduce(function (acc, item, i) {
        // ignore Headings and Dividers
        if (!isOption(item)) {
          acc.push(item);
          return acc;
        } // Find out if the search string exactly matches a value


        if (item.props.value === _this.state.filterKeyword) {
          foundExactMatch = true;
        } // Format the Menu.Item


        var clonedItem = Object(external_react_["cloneElement"])(item, {
          key: item.key || i,
          onClick: _this.handleMenuOptionClick,
          selectable: false,
          selected: currentValues && currentValues.indexOf(item.props.value) >= 0,
          compact: true,
          role: 'option'
        }); // Move previously selected items to the top section

        if (topValues && topValues.indexOf(item.props.value) >= 0) {
          if (childrenTopCount === 0) {
            acc.splice(childrenTopCount, 0, external_react_default.a.createElement(ResultsMenu_default.a.Divider, {
              key: "topDivider"
            }));
          }

          acc.splice(childrenTopCount, 0, clonedItem);
          childrenTopCount += 1;
        } else {
          acc.push(clonedItem);
        }

        return acc;
      }, []); // Add missing items

      Object(external_lodash_["forEachRight"])(currentValues, function (value) {
        var matchedItem = Object(external_lodash_["find"])(children, function (item) {
          return item.props && item.props.value === value;
        });

        if (!matchedItem) {
          if (value === _this.state.filterKeyword) {
            foundExactMatch = true;
          }

          var isTopValue = topValues && topValues.indexOf(value) >= 0;
          children.splice(isTopValue ? 0 : childrenTopCount + 1, 0, external_react_default.a.createElement(Multiselect_Option, {
            label: String(value),
            value: value,
            key: "missing-value-".concat(value),
            onClick: _this.handleMenuOptionClick,
            compact: true,
            selected: true
          }));

          if (isTopValue) {
            childrenTopCount += 1;
          }
        }
      }); // Filter the items

      var keywords = Object(filter_["stringToKeywords"])(filterKeyword);
      children = controlledFilter ? children : children.filter(function (option) {
        if (isOption(option)) {
          return Object(filter_["testPhrase"])(option.props.label, keywords);
        }

        return true; // Keep all headers and non-interactive options
      }) // hightlight the matched text
      .map(function (option) {
        if (!isOption(option)) {
          return option;
        } // highlight matched text


        var matchRanges = keywords && Object(filter_["keywordLocations"])(option.props.label, keywords);
        return Object(external_react_["cloneElement"])(option, {
          matchRanges: matchRanges || undefined
        });
      }); // Add the option to add the new value

      if (allowNewValues && !foundExactMatch && filterKeyword) {
        children.splice(childrenTopCount, 0, external_react_default.a.createElement(Multiselect_Option, {
          label: "".concat(filterKeyword, " (new value)"),
          value: filterKeyword,
          key: "newValue",
          compact: true,
          onClick: _this.handleMenuOptionClick
        }));
      } // Highlight the selected Items and remove hidden


      children = children.reduce(function (acc, item) {
        // ignore Dividers & Headings
        if (!isOption(item)) {
          acc.push(item);
          return acc;
        } // Ignore any hidden items


        if (item.props && item.props.hidden) {
          return acc;
        }

        var active = _this.availableOptionCount === _this.state.activeIndex;
        _this.availableOptionCount += 1;
        _this.selectedOptionCount += item.props.selected ? 1 : 0;

        if (!active || !textHasFocus) {
          acc.push(item);
          return acc;
        }

        if (!item.props.disabled) {
          _this.activeValue = item.props.value;
        }

        var clonedItem = Object(external_react_["cloneElement"])(item, {
          active: active,
          id: _this.activeItemId,
          ref: _this.handleActiveOptionMount
        });
        acc.push(clonedItem);
        return acc;
      }, []);
      _this.displayedValues = children.reduce(function (acc, item) {
        if (item.props && item.props.value) {
          acc.push(item.props.value);
        }

        return acc;
      }, []);
      return external_react_default.a.createElement(ResultsMenu_default.a, Compact_extends({
        childrenStart: _this.renderControls({
          placement: placement,
          hasChildren: !!children.length
        }),
        placement: placement,
        maxHeight: maxHeight,
        onScrollBottom: _this.props.onScrollBottom ? _this.handleScrollBottom : undefined,
        "data-test": "results-menu",
        isLoading: _this.props.isLoadingOptions
      }, Object(external_lodash_["pick"])(_this.props, 'className', 'noOptionsMessage', 'footerMessage', 'animateLoading', 'loadingMessage'), {
        style: Object(external_lodash_["extend"])({
          width: Math.max(anchorWidth, 200)
        }, _this.props.menuStyle)
      }), children);
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'values');
    _this.state = {
      open: false,
      textHasFocus: false,
      values: props.defaultValues || [],
      activeIndex: 0,
      filterKeyword: ''
    };

    if (false) {}

    if (false) {}

    _this.activeItemId = Object(id_["createDOMID"])('active-item');
    return _this;
  }

  Compact_createClass(Compact, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}

      if (false) {}
    }
  }, {
    key: "getCurrentValues",
    value: function getCurrentValues() {
      return this.isControlled() ? this.props.values : this.state.values;
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
    /**
     * Place focus on the text input.
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.state.dropdown) {
        this.state.dropdown.focus();
      }
    }
  }, {
    key: "toggleValue",
    value: function toggleValue(e, value) {
      var values = this.getCurrentValues();
      var currentIndex = this.getCurrentValues().indexOf(value);
      var name = this.props.name;
      var newValues;

      if (currentIndex >= 0) {
        newValues = _toConsumableArray(values.slice(0, currentIndex)).concat(_toConsumableArray(values.slice(currentIndex + 1)));
      } else {
        newValues = values.concat([value]);
      }

      if (!this.isControlled()) {
        this.setState({
          values: newValues,
          open: true
        });
      }

      this.props.onChange(e, {
        values: newValues,
        name: name
      });
    }
  }, {
    key: "removeValue",
    value: function removeValue(e, value) {
      var values = Object(external_lodash_["without"])(this.getCurrentValues(), value);
      var name = this.props.name;

      if (!this.isControlled()) {
        this.setState({
          values: values
        });
      }

      this.props.onChange(e, {
        values: values,
        name: name
      });
    }
  }, {
    key: "renderControls",
    value: function renderControls(_ref5) {
      var placement = _ref5.placement,
          hasChildren = _ref5.hasChildren;
      var selectControls = external_react_default.a.createElement(StyledToggleAllControls, {
        "data-placement": placement,
        key: "selectAll"
      }, external_react_default.a.createElement(Link_default.a, {
        onClick: this.handleSelectAll,
        disabled: !(this.availableOptionCount - this.selectedOptionCount),
        "data-test": "select-all",
        style: {
          marginRight: 20
        }
      }, this.state.filterKeyword ? Object(i18n_["_"])('Select All Matches') : Object(i18n_["_"])('Select All')), external_react_default.a.createElement(Link_default.a, {
        onClick: this.handleClearAll,
        disabled: !this.selectedOptionCount,
        "data-test": "clear-all"
      }, this.state.filterKeyword ? Object(i18n_["_"])('Clear All Matches') : Object(i18n_["_"])('Clear All')));
      /* eslint-disable jsx-a11y/tabindex-no-positive */

      return external_react_default.a.createElement("div", {
        key: "controls"
      }, placement === 'above' && hasChildren && selectControls, external_react_default.a.createElement(StyledFilter, {
        key: "filter",
        "data-test": "filter",
        "data-placement": placement
      }, external_react_default.a.createElement(Text_default.a, {
        autoComplete: false,
        value: this.state.filterKeyword,
        appearance: "search",
        onChange: this.handleTextChange,
        onKeyDown: this.handleTextKeyDown,
        onKeyUp: this.handleTextKeyUp,
        onFocus: this.handleTextFocus,
        onBlur: this.handleTextBlur,
        placeholder: Object(i18n_["_"])('filter'),
        tabIndex: 1,
        "aria-activedescendant": this.activeItemId,
        ref: this.handleInputMount
      })), placement !== 'above' && hasChildren && selectControls);
      /* eslint-enable jsx-a11y/tabindex-no-positive */
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          defaultPlacement = _this$props4.defaultPlacement,
          describedBy = _this$props4.describedBy,
          disabled = _this$props4.disabled,
          error = _this$props4.error,
          inline = _this$props4.inline,
          labelledBy = _this$props4.labelledBy,
          placeholder = _this$props4.placeholder,
          scrollContainer = _this$props4.scrollContainer,
          size = _this$props4.size,
          otherProps = Compact_objectWithoutProperties(_this$props4, ["children", "defaultPlacement", "describedBy", "disabled", "error", "inline", "labelledBy", "placeholder", "scrollContainer", "size"]); // Generate buttonLabels


      var currentValues = this.getCurrentValues();
      var childrenArray = external_react_["Children"].toArray(children);
      var buttonLabel = currentValues.reduce(function (acc, value, index, orig) {
        var matchedItem = Object(external_lodash_["find"])(childrenArray, function (item) {
          return item.props.value === value;
        });

        if (matchedItem) {
          acc.push(matchedItem.props.children || matchedItem.props.label);
        } else {
          acc.push(value);
        }

        if (index < orig.length - 1) {
          acc.push(Object(i18n_["_"])(', '));
        }

        return acc;
      }, []);
      var toggle = external_react_default.a.createElement(Button_default.a, {
        appearance: "toggle",
        label: buttonLabel.length > 0 ? buttonLabel : placeholder,
        error: error,
        inline: inline,
        size: size,
        disabled: disabled || null,
        isMenu: true,
        role: "listbox",
        "aria-labelledby": labelledBy,
        "aria-describedby": describedBy,
        "aria-multiselectable": "true"
      }, !!currentValues.length && external_react_default.a.createElement(StyledCount, {
        "data-role": "count"
      }, "(", currentValues.length, ")"));
      return external_react_default.a.createElement(StyledDropdown, Compact_extends({
        "data-test-values": JSON.stringify(currentValues),
        closeReasons: ['clickAway', 'escapeKey', 'offScreen', 'toggleClick'],
        inline: inline,
        toggle: toggle
      }, Object(external_lodash_["omit"])(otherProps, 'allowNewValues', 'animateLoading', 'className', 'controlledFilter', 'defaultValues', 'footerMessage', 'inputRef', 'isLoadingOptions', 'menuStyle', 'noOptionsMessage', 'onChange', 'onFilterChange', 'onScrollBottom', 'values', 'useClickawayOverlay'), {
        onClick: disabled ? null : this.handleClick,
        onRequestOpen: this.handleRequestOpen,
        onRequestClose: this.handleRequestClose,
        open: this.state.open,
        repositionMode: "flip",
        scrollContainer: scrollContainer,
        defaultPlacement: defaultPlacement,
        canCoverAnchor: window.innerHeight < 500
      }, Object(themes_["ref"])(this.handleMount)), this.renderMenu);
    }
  }]);

  return Compact;
}(external_react_["Component"]);

Compact_defineProperty(Compact_Compact, "propTypes", {
  /*
   * Whether or not to show the wait spinner when loading. It's recommended to set this to
   * `true` when loading may take more than one second.
   */
  animateLoading: external_prop_types_default.a.bool,

  /**
   * Allow the user to add arbitrary values.
   */
  allowNewValues: external_prop_types_default.a.bool,

  /**
   * `children` should be `Multiselect.Option`, `Multiselect.Heading`, or
   * `Multiselect.Divider`.
   */
  children: external_prop_types_default.a.node,

  /** If true, this component will not handle filtering. The parent must update the
   * Options based on the onFilterChange value. */
  controlledFilter: external_prop_types_default.a.bool,

  /**
   * The default placement of the dropdown menu. It might be rendered in a different direction
   * depending upon the space available.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'vertical']),

  /**
   * Set this property instead of value to keep the value uncontrolled.
   */
  defaultValues: external_prop_types_default.a.array,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /** Disable adding and removing. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Display as in an error. */
  error: external_prop_types_default.a.bool,

  /**
   * The footer message can show additional information, such as a truncation message.
   */
  footerMessage: external_prop_types_default.a.node,

  /** Make the control an inline block with variable width. */
  inline: external_prop_types_default.a.bool,

  /**
   * Invoked with the input element when the component mounts and null when it unmounts.
   */
  inputRef: external_prop_types_default.a.func,

  /*
   * Whether or not to show the loading message and/or wait spinner. It's recommended to
   * remove the old children while loading new children to ensure the loading message is
   * not hidden.
   */
  isLoadingOptions: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /**
   * The loading message to show when isLoadingOptions. */
  loadingMessage: external_prop_types_default.a.node,

  /**
   * Style properties to apply to the Menu. */
  menuStyle: external_prop_types_default.a.object,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /**
   * The noOptionsMessage is shown when there are no children and not loading, such as when
   * there are no Options matching the filter. This can be customized to the type of content,
   * such as "No matching dashboards"; insert other content, such as an error message; or
   * communicate a minimum number of chararters to enter to see results. */
  noOptionsMessage: external_prop_types_default.a.node,

  /**
   * A callback to receive the change events.  If values is set, this callback is required.
   * This must set the values prop to retain the change.
   */
  onChange: external_prop_types_default.a.func,

  /**
   *  A callback function when the list is scrolled to the bottom. Use to fetch more results and append to list.
   *  Note: Set to null when all items are loaded.
   */
  onScrollBottom: external_prop_types_default.a.func,

  /**
   * A callback with the change event and value of the filter box. Providing this callback and
   * setting controlledFilter to true enables you to filter and update the children by other
   * criteria.
   */
  onFilterChange: external_prop_types_default.a.func,

  /**
   * If 'value' is undefined or don't match an item, the Button will display this text.
   */
  placeholder: external_prop_types_default.a.string,

  /**
   * The container with which the popover must scroll to stay aligned with the anchor.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /** The overall size of the control. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** Pressing tab while entering an input confirms the new value. Requires `allowNewValues`. */
  tabConfirmsNewValue: external_prop_types_default.a.bool,

  /**
   * Value will be matched to one of the children to deduce the label and/or icon for the
   * toggle.
   */
  values: external_prop_types_default.a.array
});

Compact_defineProperty(Compact_Compact, "defaultProps", {
  animateLoading: false,
  allowNewValues: false,
  defaultPlacement: 'vertical',
  disabled: false,
  inline: false,
  inputRef: function inputRef() {},
  isLoadingOptions: false,
  menuStyle: {},
  noOptionsMessage: Object(i18n_["_"])('No matches'),
  onChange: function onChange() {},
  onFilterChange: function onFilterChange() {},
  placeholder: Object(i18n_["_"])('Select...'),
  scrollContainer: 'window',
  size: 'medium',
  tabConfirmsNewValue: false
});

Compact_defineProperty(Compact_Compact, "Option", Multiselect_Option);

Compact_defineProperty(Compact_Compact, "Divider", ResultsMenu_default.a.Divider);

Compact_defineProperty(Compact_Compact, "Heading", ResultsMenu_default.a.Heading);

/* harmony default export */ var Multiselect_Compact = (Compact_Compact);
// EXTERNAL MODULE: external "@splunk/react-ui/Chip"
var Chip_ = __webpack_require__(69);
var Chip_default = /*#__PURE__*/__webpack_require__.n(Chip_);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/Multiselect/NormalStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "NormalStyles__StyledBox",
  componentId: "sc-2uz0a2-0"
})(["border:", ";border-color:", ";border-radius:", ";align-items:flex-start;flex-wrap:wrap;padding:2px 0 0 2px;min-height:", ";background-color:", ";max-height:300px;overflow-y:auto;[data-inline='true'] + &{margin-left:", ";}&[data-hasfocus]{box-shadow:", ";}&[aria-disabled]{cursor:not-allowed;background-color:", ";border-color:", ";}&[data-error]{border-color:", ";color:", ";}&[data-size='small']{min-height:", ";}&[data-inline]{width:400px;}&[data-popoveropen='true']{position:relative;z-index:", ";}"], Object(themes_["variable"])('border'), Object(themes_["variable"])('Multiselect', 'Normal', 'boxBorderColor'), Object(themes_["variable"])('borderRadius'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('Multiselect', 'Normal', 'boxBackgroundColor'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('focusShadow'), Object(themes_["variable"])('Multiselect', 'Normal', 'boxDisabledBackgroundColor'), Object(themes_["variable"])('Multiselect', 'Normal', 'boxDisabledBorderColor'), Object(themes_["variable"])('Multiselect', 'Normal', 'boxInvalidBorderColor'), Object(themes_["variable"])('Multiselect', 'Normal', 'boxInvalidColor'), Object(themes_["variable"])('inputHeightSmall'), function (props) {
  return Object(themes_["variable"])('zindexFixedNavbar')(props) - 1;
});
var StyledInputWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "NormalStyles__StyledInputWrapper",
  componentId: "sc-2uz0a2-1"
})(["flex:1 0 auto;max-width:100%;"]);
var StyledInput = external_styled_components_default.a.input.withConfig({
  displayName: "NormalStyles__StyledInput",
  componentId: "sc-2uz0a2-2"
})(["", ";min-width:100%;max-width:100%;line-height:12px;padding:", ";&[data-size='small']{padding:3px;font-size:", ";}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('fontSizeSmall'));
var StyledOverlay = external_styled_components_default.a.div.withConfig({
  displayName: "NormalStyles__StyledOverlay",
  componentId: "sc-2uz0a2-3"
})(["&[data-popoveropen='true']{position:fixed;top:0;left:0;width:100%;height:100%;z-index:", ";}"], function (props) {
  return Object(themes_["variable"])('zindexFixedNavbar')(props) - 2;
});

// CONCATENATED MODULE: ./src/Multiselect/Normal.jsx
function Normal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Normal_typeof = function _typeof(obj) { return typeof obj; }; } else { Normal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Normal_typeof(obj); }

function Normal_toConsumableArray(arr) { return Normal_arrayWithoutHoles(arr) || Normal_iterableToArray(arr) || Normal_nonIterableSpread(); }

function Normal_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Normal_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Normal_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Normal_defineProperty(target, key, source[key]); }); } return target; }

function Normal_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Normal_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Normal_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Normal_extends() { Normal_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Normal_extends.apply(this, arguments); }

function Normal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Normal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Normal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Normal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Normal_defineProperties(Constructor, staticProps); return Constructor; }

function Normal_possibleConstructorReturn(self, call) { if (call && (Normal_typeof(call) === "object" || typeof call === "function")) { return call; } return Normal_assertThisInitialized(self); }

function Normal_getPrototypeOf(o) { Normal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Normal_getPrototypeOf(o); }

function Normal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Normal_setPrototypeOf(subClass, superClass); }

function Normal_setPrototypeOf(o, p) { Normal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Normal_setPrototypeOf(o, p); }

function Normal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Normal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















var Normal_Normal =
/*#__PURE__*/
function (_Component) {
  Normal_inherits(Normal, _Component);

  function Normal(props) {
    var _getPrototypeOf2;

    var _this;

    Normal_classCallCheck(this, Normal);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Normal_possibleConstructorReturn(this, (_getPrototypeOf2 = Normal_getPrototypeOf(Normal)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleClick", function () {
      _this.input.focus();
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleRequestRemove", function (e, _ref) {
      var value = _ref.value;
      Object(external_lodash_["defer"])(function () {
        return _this.removeValue(e, value);
      }); // allow the event to bubble before removing.
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleInputFocus", function (e) {
      if (_this.state.filterKeyword !== '') {
        _this.props.onFilterChange(e, {
          keyword: ''
        });
      }

      _this.setState({
        filterKeyword: '',
        hasFocus: true,
        open: true
      });
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleInputKeyDown", function (e) {
      var _this$props = _this.props,
          children = _this$props.children,
          onScrollBottom = _this$props.onScrollBottom,
          tabConfirmsNewValue = _this$props.tabConfirmsNewValue;

      if (Object(keyboard_["keycode"])(e) === 'tab' && _this.state.open) {
        if (tabConfirmsNewValue && !Object(external_lodash_["isUndefined"])(_this.activeValue) && _this.availableOptionCount <= 1) {
          e.preventDefault();

          _this.addValue(e, _this.activeValue);

          _this.input.focus();
        } else {
          _this.setState({
            open: false
          });
        }
      }

      if (e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }

      if (Object(keyboard_["keycode"])(e) === 'down') {
        e.preventDefault();

        if (_this.state.open) {
          _this.setState(function (state) {
            return {
              activeIndex: Math.min(state.activeIndex + 1, _this.availableOptionCount - 1)
            };
          });
        } else {
          _this.setState({
            activeIndex: 0,
            open: true
          });
        }

        if (children && onScrollBottom) {
          var beforeLastChild = children.length - (2 + _this.getCurrentValues().length);

          if (_this.state.activeIndex === beforeLastChild) {
            onScrollBottom();
          }
        }
      }

      if (Object(keyboard_["keycode"])(e) === 'up') {
        e.preventDefault();

        if (_this.state.open) {
          _this.setState(function (state) {
            return {
              activeIndex: Math.max(state.activeIndex - 1, 0)
            };
          });
        } else {
          _this.setState({
            activeIndex: 0,
            open: true
          });
        }
      }

      if (Object(keyboard_["keycode"])(e) === 'enter' && !Object(external_lodash_["isUndefined"])(_this.activeValue) && _this.state.open) {
        _this.addValue(e, _this.activeValue);
      }

      if (Object(keyboard_["keycode"])(e) === 'backspace' && _this.input.value === '' && _this.getCurrentValues().length) {
        _this.removeValue(e, Object(external_lodash_["last"])(_this.getCurrentValues()));
      }
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleInputChange", function (e) {
      _this.setState({
        filterKeyword: e.target.value,
        open: true,
        activeIndex: 0
      });

      _this.props.onFilterChange(e, {
        keyword: e.target.value
      });
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleMenuOptionClick", function (e, _ref2) {
      var value = _ref2.value;

      _this.addValue(e, value);

      _this.input.focus();
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleInputBlur", function (_ref3) {
      var relatedTarget = _ref3.relatedTarget;
      var popoverEl = document.getElementById(_this.popoverId);
      var blurTo = relatedTarget || document.activeElement; // IE11 doesn't support relatedTarget but sets activeElement

      var isBlurToOwnOption = popoverEl && blurTo && popoverEl.contains(blurTo);

      _this.setState(function (state) {
        return {
          filterKeyword: isBlurToOwnOption ? state.filterKeyword : '',
          hasFocus: false
        };
      });
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleRequestClose", function (_ref4) {
      var reason = _ref4.reason,
          event = _ref4.event;

      if (reason === 'escapeKey' || reason === 'offScreen' || !_this.state.el.contains(event.target)) {
        _this.setState({
          open: false
        });
      }

      if (reason === 'escapeKey') {
        _this.input.focus();
      }
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleScrollBottom", function () {
      if (_this.state.open && !_this.state.isLoadingOptions) {
        _this.props.onScrollBottom();
      }
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.setState({
        el: el
      });

      _this.props.elementRef(el);
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleInputMount", function (el) {
      _this.input = el;

      _this.props.inputRef(el);
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "handleActiveOptionMount", function (c) {
      if (c) {
        c.scrollIntoViewIfNeeded();
      }
    });

    Normal_defineProperty(Normal_assertThisInitialized(Normal_assertThisInitialized(_this)), "renderMenu", function (_ref5) {
      var anchorWidth = _ref5.anchorWidth,
          maxHeight = _ref5.maxHeight,
          placement = _ref5.placement;
      return external_react_default.a.createElement(ResultsMenu_default.a, Normal_extends({
        placement: placement,
        maxHeight: maxHeight,
        isLoading: _this.props.isLoadingOptions,
        onScrollBottom: _this.props.onScrollBottom ? _this.handleScrollBottom : undefined
      }, Object(external_lodash_["pick"])(_this.props, 'noOptionsMessage', 'footerMessage', 'animateLoading', 'loadingMessage'), {
        style: Object(external_lodash_["extend"])({
          width: Math.max(anchorWidth, 200)
        }, _this.props.menuStyle)
      }), _this.children);
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'values');
    _this.state = {
      hasFocus: false,
      open: false,
      values: props.defaultValues || [],
      activeIndex: 0,
      filterKeyword: '',
      el: null
    };
    _this.popoverId = Object(id_["createDOMID"])('popover');
    _this.activeItemId = Object(id_["createDOMID"])('active-item');

    if (false) {}

    if (false) {}

    return _this;
  }

  Normal_createClass(Normal, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}

      if (false) {}

      if (this.isControlled() && prevProps.values !== this.props.values) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          filterKeyword: '',
          activeIndex: 0
        });

        if (this.state.filterKeyword !== '') {
          this.props.onFilterChange(null, {
            keyword: ''
          });
        }
      }
    }
  }, {
    key: "getCurrentValues",
    value: function getCurrentValues() {
      return this.isControlled() ? this.props.values : this.state.values;
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
    /**
     * Place focus on the text input.
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.input) {
        this.input.focus();
      }
    }
  }, {
    key: "addValue",
    value: function addValue(e, value) {
      var values = this.getCurrentValues().concat([value]);
      var name = this.props.name;

      if (!this.isControlled()) {
        this.setState({
          values: values,
          activeIndex: 0,
          open: true,
          filterKeyword: ''
        });
      }

      this.props.onChange(e, {
        values: values,
        name: name
      });
    }
  }, {
    key: "removeValue",
    value: function removeValue(e, value) {
      var values = Object(external_lodash_["without"])(this.getCurrentValues(), value);
      var name = this.props.name;

      if (!this.isControlled()) {
        this.setState({
          values: values
        });
      }

      this.props.onChange(e, {
        values: values,
        name: name
      });
    }
  }, {
    key: "renderButtons",
    value: function renderButtons(selectedItems) {
      var _this2 = this;

      // selectedItems may contain items or unmatched values at this point
      return selectedItems.map(function (item) {
        return external_react_default.a.createElement(Chip_default.a, {
          "aria-selected": true,
          disabled: _this2.props.disabled,
          icon: item.props ? item.props.icon : null,
          key: item.props ? item.props.value : item,
          "data-test": "selected-option",
          size: _this2.props.size,
          onRequestRemove: _this2.handleRequestRemove,
          role: "option",
          value: item.props ? item.props.value : item,
          appearance: item.props ? item.props.selectedAppearance : null,
          backgroundColor: item.props ? item.props.selectedBackgroundColor : null,
          foregroundColor: item.props ? item.props.selectedForegroundColor : null
        }, item.props ? item.props.children || item.props.label : item);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          allowNewValues = _this$props2.allowNewValues,
          children = _this$props2.children,
          controlledFilter = _this$props2.controlledFilter,
          defaultPlacement = _this$props2.defaultPlacement,
          describedBy = _this$props2.describedBy,
          disabled = _this$props2.disabled,
          error = _this$props2.error,
          inline = _this$props2.inline,
          labelledBy = _this$props2.labelledBy,
          placeholder = _this$props2.placeholder,
          scrollContainer = _this$props2.scrollContainer,
          size = _this$props2.size,
          useClickawayOverlay = _this$props2.useClickawayOverlay,
          otherProps = Normal_objectWithoutProperties(_this$props2, ["allowNewValues", "children", "controlledFilter", "defaultPlacement", "describedBy", "disabled", "error", "inline", "labelledBy", "placeholder", "scrollContainer", "size", "useClickawayOverlay"]);

      var ariaProps = _objectSpread({}, Object(external_lodash_["pickBy"])(otherProps, function (val, key) {
        return key === 'role' || key.indexOf('aria-') === 0;
      }), {
        'aria-describedby': describedBy,
        'aria-labelledby': labelledBy,
        'aria-invalid': error || null
      });

      var currentValues = this.getCurrentValues();
      var selectedItems = currentValues.slice(0);
      var foundExactMatch = currentValues.indexOf(this.state.filterKeyword) >= 0; // Map Options to selected values

      if (currentValues && currentValues.length) {
        external_react_["Children"].forEach(children, function (item) {
          if (Object(external_react_["isValidElement"])(item)) {
            var selectedIndex = currentValues.indexOf(item.props.value);

            if (selectedIndex !== -1) {
              selectedItems[selectedIndex] = item;
            }
          }
        });
      } // Filter the items


      var keywords = Object(filter_["stringToKeywords"])(this.state.filterKeyword);
      var childrenFiltered = controlledFilter ? external_react_["Children"].toArray(children) // ensure consistent keys
      : external_react_["Children"].toArray(children).filter(function (option) {
        if (Object(external_lodash_["get"])(option, ['props', 'label'], false)) {
          return Object(filter_["testPhrase"])(option.props.label, keywords);
        }

        return true; // Keep all headers and non-interactive options
      });
      this.availableOptionCount = 0;
      this.activeValue = undefined;
      this.children = external_react_["Children"].map(childrenFiltered, function (item, i) {
        if (!item.props || !Object(external_lodash_["has"])(item.props, 'value')) {
          // ignore Headings and Dividers
          return item;
        } // find out if the search string exactly matches a value


        if (item.props.value === _this3.state.filterKeyword) {
          foundExactMatch = true;
        } // remove items that are already selected


        var selectedIndex = currentValues.indexOf(item.props.value);

        if (selectedIndex >= 0) {
          return null;
        } // highlight matched text


        var _item$props = item.props,
            label = _item$props.label,
            matchRanges = _item$props.matchRanges;
        var matchRangesCalc = !controlledFilter && !matchRanges && keywords && Object(filter_["keywordLocations"])(label, keywords); // clone item

        var clonedItem = Object(external_react_["cloneElement"])(item, {
          key: i,
          onClick: _this3.handleMenuOptionClick,
          matchRanges: matchRanges || matchRangesCalc || undefined
        });
        return clonedItem;
      }); // Add the option to add the new value

      if (allowNewValues && !foundExactMatch && this.state.filterKeyword) {
        this.children.unshift(external_react_default.a.createElement(Multiselect_Option, {
          label: "".concat(this.state.filterKeyword, " (new value)"),
          value: this.state.filterKeyword,
          key: "newValue",
          onClick: this.handleMenuOptionClick
        }));
      }

      if (this.state.open) {
        // highlight the selected Item
        this.children = external_react_["Children"].map(this.children, function (item) {
          if (!item.props || !Object(external_lodash_["has"])(item.props, 'value')) {
            // ignore Headings and Dividers
            return item;
          }

          var active = _this3.availableOptionCount === _this3.state.activeIndex;
          _this3.availableOptionCount += 1;

          if (!active) {
            return item;
          }

          if (!item.props.disabled) {
            _this3.activeValue = item.props.value;
          }

          var clonedItem = Object(external_react_["cloneElement"])(item, {
            active: active,
            id: _this3.activeItemId,
            ref: _this3.handleActiveOptionMount
          });
          return clonedItem;
        });
      }

      var inputWidth = "".concat(this.state.filterKeyword.length * 0.8, "em");
      return [external_react_default.a.createElement(StyledBox, Normal_extends({
        key: "control",
        "data-test-values": JSON.stringify(currentValues),
        inline: inline,
        "data-hasfocus": this.state.hasFocus || null
      }, external_lodash_["omit"].apply(void 0, [otherProps, 'animateLoading', 'className', 'controlledFilter', 'defaultValues', 'footerMessage', 'inputRef', 'isLoadingOptions', 'labelledBy', 'menuStyle', 'noOptionsMessage', 'onChange', 'onFilterChange', 'onScrollBottom', 'values', 'useClickawayOverlay'].concat(Normal_toConsumableArray(Object(external_lodash_["keys"])(ariaProps)))), {
        onClick: disabled ? null : this.handleClick,
        "data-disabled": disabled || null,
        "data-error": error || null,
        "data-size": size,
        "data-test-popover-id": this.popoverId,
        "data-popoveropen": this.state.open,
        flex: true,
        elementRef: this.handleMount,
        role: "listbox",
        "aria-disabled": disabled || null
      }), this.renderButtons(selectedItems), !disabled && external_react_default.a.createElement(StyledInputWrapper, {
        role: "combobox",
        "aria-owns": this.state.open ? this.popoverId : null,
        "aria-haspopup": true,
        "aria-expanded": this.state.open
      }, external_react_default.a.createElement(StyledInput, Normal_extends({
        "data-test": "textbox"
      }, Object(themes_["ref"])(this.handleInputMount), {
        onBlur: this.handleInputBlur,
        onFocus: this.handleInputFocus,
        onChange: this.handleInputChange,
        onKeyDown: this.handleInputKeyDown,
        value: this.state.filterKeyword,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
        "aria-autocomplete": "list",
        style: {
          flexBasis: inputWidth,
          width: inputWidth
        },
        placeholder: currentValues.length ? '' : placeholder,
        "data-size": size,
        "aria-activedescendant": this.state.open && this.availableOptionCount > 0 ? this.activeItemId : null,
        "aria-controls": this.state.open ? this.popoverId : null
      }, ariaProps))), !disabled && external_react_default.a.createElement(Popover_default.a, {
        open: this.state.open && !!this.state.el,
        autoCloseWhenOffScreen: true,
        anchor: this.state.el,
        appearance: "light",
        onRequestClose: this.handleRequestClose,
        scrollContainer: scrollContainer,
        canCoverAnchor: false,
        defaultPlacement: defaultPlacement,
        repositionMode: "flip",
        id: this.popoverId
      }, this.renderMenu)), useClickawayOverlay && this.state.open ? external_react_default.a.createElement(StyledOverlay, Normal_extends({
        key: "overlay",
        "data-popoveropen": this.state.open,
        "data-test": "overlay"
      }, Object(themes_["ref"])(this.handleOverlayMount))) : null];
    }
  }]);

  return Normal;
}(external_react_["Component"]);

Normal_defineProperty(Normal_Normal, "propTypes", {
  /*
   * Whether or not to show the wait spinner when loading. It's recommended to set this to
   * `true` when loading may take more than one second.
   */
  animateLoading: external_prop_types_default.a.bool,

  /**
   * Allow the user to add arbitrary values.
   */
  allowNewValues: external_prop_types_default.a.bool,

  /**
   * `children` should be `Multiselect.Option`, `Multiselect.Heading`, or
   * `Multiselect.Divider`.
   */
  children: external_prop_types_default.a.node,

  /** If true, this component will not handle filtering. The parent must update the
   * Options based on the onFilterChange value. */
  controlledFilter: external_prop_types_default.a.bool,

  /**
   * The default placement of the dropdown menu. It might be rendered in a different direction
   * depending upon the space available.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'vertical']),

  /**
   * Set this property instead of value to keep the value uncontrolled.
   */
  defaultValues: external_prop_types_default.a.array,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /** Disable adding and removing. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Display as in an error. */
  error: external_prop_types_default.a.bool,

  /**
   * The footer message can show additional information, such as a truncation message.
   */
  footerMessage: external_prop_types_default.a.node,

  /** Make the control an inline block with variable width. */
  inline: external_prop_types_default.a.bool,

  /**
   * Invoked with the input element when the component mounts and null when it unmounts.
   */
  inputRef: external_prop_types_default.a.func,

  /*
   * Whether or not to show the loading message and/or wait spinner. It's recommended to
   * remove the old children while loading new children to ensure the loading message is
   * not hidden.
   */
  isLoadingOptions: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /**
   * The loading message to show when isLoadingOptions. */
  loadingMessage: external_prop_types_default.a.node,
  menuStyle: external_prop_types_default.a.object,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /**
   * The noOptionsMessage is shown when there are no children and not loading, such as when
   * there are no Options matching the filter. This can be customized to the type of content,
   * such as "No matching dashboards"; insert other content, such as an error message; or
   * communicate a minimum number of chararters to enter to see results. */
  noOptionsMessage: external_prop_types_default.a.node,

  /**
   * A callback to receive the change events.  If values is set, this callback is required.
   * This must set the values prop to retain the change.
   */
  onChange: external_prop_types_default.a.func,

  /**
   *  A callback function when the list is scrolled to the bottom. Use to fetch more results and append to list.
   *  Note: Set to null when all items are loaded.
   */
  onScrollBottom: external_prop_types_default.a.func,

  /**
   * A callback with the change event and value of the filter box. Providing this callback and
   * setting controlledFilter to true enables you to filter and update the children by other
   * criteria.
   */
  onFilterChange: external_prop_types_default.a.func,

  /**
   * If 'value' is undefined or don't match an item, the Button will display this text.
   */
  placeholder: external_prop_types_default.a.string,

  /**
   * The container with which the popover must scroll to stay aligned with the anchor.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /** The overall size of the control. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** Pressing tab while entering an input confirms the new value. Requires `allowNewValues`. */
  tabConfirmsNewValue: external_prop_types_default.a.bool,

  /**
   * Specifies whether or not to add a overlay div to clickaway from the popover. This is
   * to avoid cases where some other element is accidentally clicked when the popover is open
   */
  useClickawayOverlay: external_prop_types_default.a.bool,

  /**
   * Value will be matched to one of the children to deduce the label and/or icon for the
   * toggle.
   */
  values: external_prop_types_default.a.array
});

Normal_defineProperty(Normal_Normal, "defaultProps", {
  animateLoading: false,
  allowNewValues: false,
  defaultPlacement: 'vertical',
  disabled: false,
  elementRef: function elementRef() {},
  inline: false,
  inputRef: function inputRef() {},
  isLoadingOptions: false,
  menuStyle: {},
  noOptionsMessage: Object(i18n_["_"])('No matches'),
  onChange: function onChange() {},
  onFilterChange: function onFilterChange() {},
  placeholder: Object(i18n_["_"])('Select...'),
  scrollContainer: 'window',
  size: 'medium',
  tabConfirmsNewValue: false,
  useClickawayOverlay: false
});

Normal_defineProperty(Normal_Normal, "Option", Multiselect_Option);

Normal_defineProperty(Normal_Normal, "Divider", ResultsMenu_default.a.Divider);

Normal_defineProperty(Normal_Normal, "Heading", ResultsMenu_default.a.Heading);

/* harmony default export */ var Multiselect_Normal = (Normal_Normal);
// CONCATENATED MODULE: ./src/Multiselect/Multiselect.jsx
function Multiselect_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Multiselect_typeof = function _typeof(obj) { return typeof obj; }; } else { Multiselect_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Multiselect_typeof(obj); }

function Multiselect_extends() { Multiselect_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Multiselect_extends.apply(this, arguments); }

function Multiselect_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Multiselect_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Multiselect_createClass(Constructor, protoProps, staticProps) { if (protoProps) Multiselect_defineProperties(Constructor.prototype, protoProps); if (staticProps) Multiselect_defineProperties(Constructor, staticProps); return Constructor; }

function Multiselect_possibleConstructorReturn(self, call) { if (call && (Multiselect_typeof(call) === "object" || typeof call === "function")) { return call; } return Multiselect_assertThisInitialized(self); }

function Multiselect_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Multiselect_getPrototypeOf(o) { Multiselect_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Multiselect_getPrototypeOf(o); }

function Multiselect_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Multiselect_setPrototypeOf(subClass, superClass); }

function Multiselect_setPrototypeOf(o, p) { Multiselect_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Multiselect_setPrototypeOf(o, p); }

function Multiselect_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var Multiselect_Multiselect =
/*#__PURE__*/
function (_Component) {
  Multiselect_inherits(Multiselect, _Component);

  function Multiselect() {
    Multiselect_classCallCheck(this, Multiselect);

    return Multiselect_possibleConstructorReturn(this, Multiselect_getPrototypeOf(Multiselect).apply(this, arguments));
  }

  Multiselect_createClass(Multiselect, [{
    key: "render",
    value: function render() {
      var Tag = this.props.compact ? Multiselect_Compact : Multiselect_Normal;
      return external_react_default.a.createElement(Tag, Multiselect_extends({
        "data-test": "multiselect"
      }, Object(external_lodash_["omit"])(this.props, 'className', 'compact')));
    }
  }]);

  return Multiselect;
}(external_react_["Component"]);

Multiselect_defineProperty(Multiselect_Multiselect, "propTypes", {
  /*
   * Whether or not to show the wait spinner when loading. It's recommended to set this to
   * `true` when loading may take more than one second.
   */
  animateLoading: external_prop_types_default.a.bool,

  /**
   * Allow the user to add arbitrary values.
   */
  allowNewValues: external_prop_types_default.a.bool,

  /**
   * When compact, options are shown as checkboxes and the input is a single line. This is
   * useful when placing the Multiselect in a horizontal bar, such as a filter.
   */
  compact: external_prop_types_default.a.bool,

  /**
   * `children` should be `Multiselect.Option`, `Multiselect.Heading`, or
   * `Multiselect.Divider`.
   */
  children: external_prop_types_default.a.node,

  /** If true, this component will not handle filtering. The parent must update the
   * Options based on the onFilterChange value. */
  controlledFilter: external_prop_types_default.a.bool,

  /**
   * The default placement of the dropdown menu. It might be rendered in a different direction
   * depending upon the space available.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'vertical']),

  /**
   * Set this property instead of value to keep the value uncontrolled.
   */
  defaultValues: external_prop_types_default.a.array,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /** Disable adding and removing. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Display as in an error. */
  error: external_prop_types_default.a.bool,

  /**
   * The footer message can show additional information, such as a truncation message.
   */
  footerMessage: external_prop_types_default.a.node,

  /** Make the control an inline block with variable width. */
  inline: external_prop_types_default.a.bool,

  /**
   * Invoked with the input element when the component mounts and null when it unmounts.
   */
  inputRef: external_prop_types_default.a.func,

  /*
   * Whether or not to show the loading message and/or wait spinner. It's recommended to
   * remove the old children while loading new children to ensure the loading message is
   * not hidden.
   */
  isLoadingOptions: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /**
   * The loading message to show when isLoadingOptions. */
  loadingMessage: external_prop_types_default.a.node,

  /**
   * Style properties to apply to the Menu. This is primarily used to override the width of
   * the menu should it need to be wider than the toggle Button. */
  menuStyle: external_prop_types_default.a.object,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /**
   * The noOptionsMessage is shown when there are no children and not loading, such as when
   * there are no Options matching the filter. This can be customized to the type of content,
   * such as "No matching dashboards"; insert other content, such as an error message; or
   * communicate a minimum number of chararters to enter to see results. */
  noOptionsMessage: external_prop_types_default.a.node,

  /**
   * A callback to receive the change events.  If values is set, this callback is required.
   * This must set the values prop to retain the change.
   */
  onChange: external_prop_types_default.a.func,

  /**
   * A callback with the change event and value of the filter box. Providing this callback and
   * setting controlledFilter to true enables you to filter and update the children by other
   * criteria.
   */
  onFilterChange: external_prop_types_default.a.func,

  /**
   * If 'value' is undefined or don't match an item, the Button will display this text.
   */
  placeholder: external_prop_types_default.a.string,

  /**
   * The container with which the popover must scroll to stay aligned with the anchor.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /** The overall size of the control. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** Pressing tab while entering an input confirms the new value. Requires `allowNewValues`. */
  tabConfirmsNewValue: external_prop_types_default.a.bool,

  /**
   * Specifies whether or not to add a overlay div to clickaway from the popover. This is
   * to avoid cases where some other element is accidentally clicked when the popover is open.
   * Note: This only works with the Normal multiselect.
   */
  useClickawayOverlay: external_prop_types_default.a.bool,

  /**
   * Value will be matched to one of the children to deduce the label and/or icon for the
   * toggle.
   */
  values: external_prop_types_default.a.array
});

Multiselect_defineProperty(Multiselect_Multiselect, "defaultProps", {
  animateLoading: false,
  allowNewValues: false,
  compact: false,
  defaultPlacement: 'vertical',
  disabled: false,
  inline: false,
  inputRef: function inputRef() {},
  isLoadingOptions: false,
  menuStyle: {},
  noOptionsMessage: Object(i18n_["_"])('No matches'),
  onChange: function onChange() {},
  onFilterChange: function onFilterChange() {},
  placeholder: Object(i18n_["_"])('Select...'),
  scrollContainer: 'window',
  size: 'medium',
  tabConfirmsNewValue: false,
  useClickawayOverlay: false
});

Multiselect_defineProperty(Multiselect_Multiselect, "Option", Multiselect_Option);

Multiselect_defineProperty(Multiselect_Multiselect, "Heading", Menu_["Heading"]);

Multiselect_defineProperty(Multiselect_Multiselect, "Divider", Menu_["Divider"]);

/* harmony default export */ var src_Multiselect_Multiselect = (Multiselect_Multiselect);

// CONCATENATED MODULE: ./src/Multiselect/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Multiselect_Multiselect; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Heading", function() { return Menu_["Heading"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Option", function() { return Multiselect_Option; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Divider", function() { return Menu_["Divider"]; });



/***/ })

/******/ });