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
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
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

/***/ 109:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/filter"
var filter_ = __webpack_require__(21);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

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

// EXTERNAL MODULE: external "@splunk/react-icons/Caret"
var Caret_ = __webpack_require__(30);
var Caret_default = /*#__PURE__*/__webpack_require__.n(Caret_);

// EXTERNAL MODULE: external "@splunk/react-ui/Menu"
var Menu_ = __webpack_require__(17);

// CONCATENATED MODULE: ./src/Select/Option.jsx
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
 * An option within a `Select`. This inherits from
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
    /**
     * Place focus on the button.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.c.focus();
    }
  }, {
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(Menu_["Item"], _extends({
        "data-test": "option",
        "data-test-value": this.props.value,
        selectable: true
      }, Object(themes_["ref"])(this.handleMount), Object(external_lodash_["omit"])(this.props, 'label'), {
        onClick: this.handleClick,
        role: "option",
        "aria-selected": this.props.selected
      }), this.props.children || this.props.label);
    }
  }]);

  return Option;
}(external_react_["PureComponent"]);

_defineProperty(Option_Option, "propTypes", {
  /** @private */
  active: external_prop_types_default.a.bool,

  /**
   * When provided, `children` is rendered instead of the `label`.
   *
   * Caution: The element(s) passed here must be pure.
   */
  children: external_prop_types_default.a.node,

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
  onClick: external_prop_types_default.a.func,

  /** @private */
  selected: external_prop_types_default.a.bool,

  /**
   * When `true`, wrapping is disabled and any additional text is ellipsised.
   */
  truncate: external_prop_types_default.a.bool,

  /**
   * The label and/or icon will be placed on the Control's toggle if it matches this value.
   */
  value: external_prop_types_default.a.any.isRequired
});

_defineProperty(Option_Option, "defaultProps", {
  active: false,
  descriptionPosition: 'bottom',
  disabled: false,
  hidden: false,
  onClick: function onClick() {},
  selected: false,
  truncate: false
});

/* harmony default export */ var Select_Option = (Option_Option);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Dropdown"
var Dropdown_ = __webpack_require__(25);
var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown_);

// CONCATENATED MODULE: ./src/Select/SelectStyles.js



var StyledDropdown = external_styled_components_default()(Dropdown_default.a).withConfig({
  displayName: "SelectStyles__StyledDropdown",
  componentId: "sc-109fkof-0"
})(["&[data-select-appearance='link']{vertical-align:baseline;}"]);
var StyledFilter = external_styled_components_default.a.div.withConfig({
  displayName: "SelectStyles__StyledFilter",
  componentId: "sc-109fkof-1"
})(["padding:8px;min-width:160px;&:first-child{border-bottom:", ";}&:last-child{border-top:", ";}"], Object(themes_["variable"])('border'), Object(themes_["variable"])('border'));
var StyledLinkIcon = external_styled_components_default.a.span.withConfig({
  displayName: "SelectStyles__StyledLinkIcon",
  componentId: "sc-109fkof-2"
})(["padding-right:2px;"]);
var StyledLinkCaret = external_styled_components_default.a.span.withConfig({
  displayName: "SelectStyles__StyledLinkCaret",
  componentId: "sc-109fkof-3"
})(["padding-left:2px;"]);

// CONCATENATED MODULE: ./src/Select/Select.jsx
function Select_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Select_typeof = function _typeof(obj) { return typeof obj; }; } else { Select_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Select_typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Select_defineProperty(target, key, source[key]); }); } return target; }

function Select_extends() { Select_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Select_extends.apply(this, arguments); }

function Select_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Select_possibleConstructorReturn(self, call) { if (call && (Select_typeof(call) === "object" || typeof call === "function")) { return call; } return Select_assertThisInitialized(self); }

function Select_getPrototypeOf(o) { Select_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Select_getPrototypeOf(o); }

function Select_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Select_createClass(Constructor, protoProps, staticProps) { if (protoProps) Select_defineProperties(Constructor.prototype, protoProps); if (staticProps) Select_defineProperties(Constructor, staticProps); return Constructor; }

function Select_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Select_setPrototypeOf(subClass, superClass); }

function Select_setPrototypeOf(o, p) { Select_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Select_setPrototypeOf(o, p); }

function Select_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Select_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















var Select_Select =
/*#__PURE__*/
function (_Component) {
  Select_inherits(Select, _Component);

  Select_createClass(Select, null, [{
    key: "validateAppearance",
    value: function validateAppearance(props) {
      if (false) {}
    }
  }]);

  function Select(props) {
    var _getPrototypeOf2;

    var _this;

    Select_classCallCheck(this, Select);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Select_possibleConstructorReturn(this, (_getPrototypeOf2 = Select_getPrototypeOf(Select)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleActiveOptionMount", function (comp) {
      if (comp) {
        comp.scrollIntoViewIfNeeded();
      }
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleTextKeyDown", function (e) {
      if (Object(keyboard_["keycode"])(e) === 'tab') {
        e.preventDefault();
        return;
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
      }

      if (Object(keyboard_["keycode"])(e) === 'up') {
        e.preventDefault();

        _this.setState(function (state) {
          return {
            activeIndex: Math.max(state.activeIndex - 1, 0)
          };
        });
      }

      if (Object(keyboard_["keycode"])(e) === 'enter' && _this.activeValue) {
        e.preventDefault();

        _this.selectValue(e, {
          value: _this.activeValue
        });
      }
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleTextChange", function (e, data) {
      e.preventDefault();

      _this.setState({
        activeIndex: 0,
        filterKeyword: data.value,
        open: true
      });

      _this.props.onFilterChange(e, {
        keyword: data.value
      });
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleTextKeyUp", function (e) {
      if (Object(keyboard_["keycode"])(e) === 'tab') {
        e.preventDefault();
      }
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleSelectedItemMount", function (c) {
      _this.selectedOption = c;
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleItemClick", function (e, _ref) {
      var value = _ref.value;

      if (!_this.state.open) {
        return;
      }

      _this.selectValue(e, {
        value: value
      });
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleRequestOpen", function () {
      _this.setState({
        open: true
      }, function () {
        if (_this.selectedOption && !_this.props.filter) {
          _this.selectedOption.focus();
        } else if (_this.props.filter) {
          _this.setState({
            activeIndex: _this.selectedOptionIndex || 0
          });
        }
      });
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleRequestClose", function () {
      _this.setState({
        open: false,
        activeIndex: 0
      });
    });

    Select_defineProperty(Select_assertThisInitialized(Select_assertThisInitialized(_this)), "handleScrollBottom", function () {
      if (_this.state.open && !_this.state.isLoadingOptions) {
        _this.props.onScrollBottom();
      }
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');
    _this.state = {
      value: Object(external_lodash_["has"])(props, 'defaultValue') ? props.defaultValue : '',
      open: false,
      filterKeyword: _this.props.filter ? '' : null,
      activeIndex: null
    };

    if (false) {}

    if (false) {}

    Select.validateAppearance(props);
    _this.menuId = Object(id_["createDOMID"])('menu');
    _this.activeItemId = Object(id_["createDOMID"])('active-item');
    return _this;
  }

  Select_createClass(Select, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}

      if (false) {}

      Select.validateAppearance(this.props);
    }
  }, {
    key: "getCurrentValue",
    value: function getCurrentValue() {
      return this.isControlled() ? this.props.value : this.state.value;
    }
  }, {
    key: "selectValue",
    value: function selectValue(e, _ref2) {
      var value = _ref2.value;
      var name = this.props.name;

      if (!this.isControlled()) {
        this.setState({
          value: value
        });
      }

      this.handleRequestClose();
      this.focus();

      if (this.getCurrentValue() !== value) {
        this.props.onChange(e, {
          value: value,
          name: name
        });
      }
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
    /**
     * Place focus on the toggle.
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.dropdown) {
        this.dropdown.focus();
      }
    } // Setup Filter

  }, {
    key: "renderFilter",
    value: function renderFilter() {
      /* eslint-disable jsx-a11y/tabindex-no-positive */
      return this.props.filter ? external_react_default.a.createElement(StyledFilter, {
        key: "filter"
      }, external_react_default.a.createElement(Text_default.a, {
        value: this.state.filterKeyword,
        appearance: "search",
        onChange: this.handleTextChange,
        onKeyDown: this.handleTextKeyDown,
        onKeyUp: this.handleTextKeyUp,
        placeholder: Object(i18n_["_"])('filter'),
        tabIndex: 1,
        role: "combobox",
        "aria-activedescendant": this.activeItemId,
        "aria-expanded": "true",
        "aria-controls": this.menuId
      })) : null;
      /* eslint-enable jsx-a11y/tabindex-no-positive */
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          defaultPlacement = _this$props.defaultPlacement,
          describedBy = _this$props.describedBy,
          disabled = _this$props.disabled,
          elementRef = _this$props.elementRef,
          error = _this$props.error,
          filter = _this$props.filter,
          inline = _this$props.inline,
          isLoadingOptions = _this$props.isLoadingOptions,
          labelledBy = _this$props.labelledBy,
          labelText = _this$props.labelText,
          menuStyle = _this$props.menuStyle,
          onScrollBottom = _this$props.onScrollBottom,
          placeholder = _this$props.placeholder,
          scrollContainer = _this$props.scrollContainer;
      var _this$state = this.state,
          filterKeyword = _this$state.filterKeyword,
          open = _this$state.open;
      var label;
      var icon;
      var keywords = Object(filter_["stringToKeywords"])(filterKeyword);

      function isOption(child) {
        return Object(external_lodash_["has"])(child, ['props', 'value']);
      }

      var isAnyValueSelected = false;
      var childrenCloned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (item) {
        if (!isOption(item)) {
          // ignore Headings and Dividers
          return item;
        }

        var selected = item.props.value === _this2.getCurrentValue();

        var stringLabel = Object(external_lodash_["has"])(item.props, 'label') ? item.props.label : item.props.value; // If selected, set up the label and icon for the toggle button.

        if (selected) {
          isAnyValueSelected = true;
          label = item.props.children || stringLabel;
          icon = item.props.icon;

          if (_this2.props.prefixLabel) {
            label = "".concat(_this2.props.prefixLabel, ": ").concat(label);
          }

          if (_this2.props.suffixLabel) {
            label = "".concat(label, " ").concat(_this2.props.suffixLabel);
          }
        }

        if (item.props.hidden) {
          return null;
        }

        return Object(external_react_["cloneElement"])(item, {
          selected: selected,
          selectable: true,
          ref: selected ? _this2.handleSelectedItemMount : undefined
        });
      }).filter(function (item) {
        if (isOption(item) && filter === true) {
          return Object(filter_["testPhrase"])(item.props.label, keywords);
        }

        return item !== null; // Keep all headers and non-interactive options
      }).map(function (item) {
        var props = {};

        if (isOption(item)) {
          props.onClick = _this2.handleItemClick;
        }

        if (isOption(item) && filter === true) {
          props.matchRanges = Object(filter_["keywordLocations"])(item.props.label, keywords) || undefined;
        }

        return Object(external_react_["cloneElement"])(item, props);
      });
      /* Hightlight Active Option
       * The active option is shown as highlighted when focused in the filter.
       * Pressing enter selects the active option, just as if the user clicked it.
       * Up and down arrows shifts the active option to the previous or next.
       */
      // availableOptionCount defines the max value for this.state.activeIndex.

      this.availableOptionCount = 0; // On enter keypress in the filter, the activeValue is selected.

      this.activeValue = undefined; // On mount, selectedOptionIndex is used to highlight selected the item.

      this.selectedOptionIndex = undefined;

      var highlightActive = function highlightActive(item) {
        if (!Object(external_lodash_["has"])(item.props, 'active')) {
          // ignore Headings and Dividers
          return item;
        }

        if (item.props.selected && !item.props.disabled) {
          _this2.selectedOptionIndex = _this2.availableOptionCount;
        }

        var active = _this2.availableOptionCount === _this2.state.activeIndex;
        _this2.availableOptionCount += 1;

        if (!active) {
          return item;
        }

        if (!item.props.disabled) {
          _this2.activeValue = item.props.value;
        }

        return Object(external_react_["cloneElement"])(item, {
          ref: _this2.handleActiveOptionMount,
          active: true,
          id: _this2.activeItemId
        });
      };

      var ariaLabel = "".concat(labelText ? "".concat(labelText, ", ") : '').concat(label || placeholder);
      var finalChildren = filter ? external_react_["Children"].map(childrenCloned, highlightActive) : external_react_["Children"].toArray(childrenCloned); // ensure consistent keys

      var toggle = appearance === 'link' ? external_react_default.a.createElement(Link_default.a, {
        label: label || placeholder,
        disabled: disabled,
        "aria-label": ariaLabel,
        "aria-labelledby": labelText ? null : labelledBy,
        "aria-describedby": describedBy
      }, !!icon && external_react_default.a.createElement(StyledLinkIcon, null, icon), label || placeholder, external_react_default.a.createElement(StyledLinkCaret, null, external_react_default.a.createElement(Caret_default.a, {
        screenReaderText: null
      }))) : external_react_default.a.createElement(Button_default.a, Select_extends({
        error: error,
        icon: icon,
        inline: false,
        isMenu: true,
        label: label || placeholder,
        "aria-label": ariaLabel,
        "aria-labelledby": labelText ? null : labelledBy,
        "aria-describedby": describedBy
      }, Object(external_lodash_["pick"])(this.props, 'appearance', 'append', 'disabled', 'prepend', 'size')));

      var createMenu = function createMenu(_ref3) {
        var anchorWidth = _ref3.anchorWidth,
            maxHeight = _ref3.maxHeight,
            placement = _ref3.placement;
        return external_react_default.a.createElement(ResultsMenu_default.a, Select_extends({
          childrenStart: _this2.renderFilter(),
          maxHeight: maxHeight,
          onScrollBottom: onScrollBottom ? _this2.handleScrollBottom : undefined,
          placement: placement,
          isLoading: isLoadingOptions,
          id: _this2.menuId
        }, Object(external_lodash_["pick"])(_this2.props, 'className', 'noOptionsMessage', 'footerMessage', 'animateLoading', 'loadingMessage'), {
          style: _objectSpread({
            minWidth: anchorWidth,
            maxWidth: Math.max(anchorWidth, 300)
          }, menuStyle)
        }), finalChildren);
      };

      return external_react_default.a.createElement(StyledDropdown, Select_extends({
        toggle: toggle,
        "data-test": "select",
        "data-test-value": this.getCurrentValue(),
        inline: appearance === 'link' || inline,
        open: open,
        retainFocus: !filter,
        takeFocus: !isAnyValueSelected || !!filter,
        closeReasons: ['clickAway', 'escapeKey', 'offScreen', 'toggleClick'],
        onRequestClose: this.handleRequestClose,
        onRequestOpen: this.handleRequestOpen,
        "data-select-appearance": appearance,
        defaultPlacement: filter ? defaultPlacement : undefined,
        canCoverAnchor: window.innerHeight < 500
      }, Object(themes_["ref"])(function (c) {
        return _this2.dropdown = c;
      }), {
        elementRef: elementRef,
        scrollContainer: scrollContainer
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Select.propTypes))), createMenu);
    }
  }]);

  return Select;
}(external_react_["Component"]);

Select_defineProperty(Select_Select, "propTypes", {
  /*
   * Whether or not to show the wait spinner when loading. It's recommended to set this to
   * `true` when loading may take more than one second.
   */
  animateLoading: external_prop_types_default.a.bool,

  /** Change the style of the button or link. */
  appearance: external_prop_types_default.a.oneOf(['default', 'link', 'primary', 'pill', 'toggle']),

  /**
   * Remove rounding from the left side of the toggle.
   */
  append: external_prop_types_default.a.bool,

  /**
   * `children` should be `Select.Option`, `Select.Header`, or `Select.Divider`.
   */
  children: external_prop_types_default.a.node,

  /**
   * The default placement of the dropdown menu. It might be rendered in a different direction
   * depending upon the space available. This property is effective only when filter is enabled.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'vertical']),

  /**
   * Set this property instead of value to keep the value uncontrolled.
   */
  defaultValue: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.number, external_prop_types_default.a.bool]),

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /**
   * disabled to toggle.
   */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Highlight the field as having an error. The button will turn red.
   */
  error: external_prop_types_default.a.bool,

  /**
   * Whether to show the filter box. When true, the children are automatically
   * filtered based on the label. When controlled, the parent component must provide a
   * onFilterChange callback and update the children. This can also be used to fetch new
   * results. */
  filter: external_prop_types_default.a.oneOf([false, true, 'controlled']),

  /**
   * The footer message can show additional information, such as a truncation message.
   */
  footerMessage: external_prop_types_default.a.node,

  /** Make the control an inline block with variable width. */
  inline: external_prop_types_default.a.bool,

  /*
   * Whether or not to show the loading message and/or wait spinner. It's recommended to
   * remove the old children while loading new children to ensure the loading message is
   * not hidden.
   */
  isLoadingOptions: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label. This property is not used when `labelText` is provided.
   */
  labelledBy: external_prop_types_default.a.string,

  /**
   * Text presented in the label for this field.
   * This is used to supply this text along with the current value to a screenreader.
   */
  labelText: external_prop_types_default.a.string,

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
   * A callback to receive the change events.
   * If value is set, this callback is required. This must set the value prop to retain the
   * change.
   */
  onChange: external_prop_types_default.a.func,

  /**
   * A callback function when the list is scrolled to the bottom. Use to fetch more results and append to list.
   * Note: Set to null when all items are loaded.
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
   * When used outside of a control group, it can be useful to include the label on the toggle.
   */
  prefixLabel: external_prop_types_default.a.string,

  /**
   * Remove rounding from the left side of the toggle.
   */
  prepend: external_prop_types_default.a.bool,

  /**
   * The container with which the popover must scroll to stay aligned with the anchor.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /** The size of the toggle. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /**
   * Places this string after the selected label.
   */
  suffixLabel: external_prop_types_default.a.string,

  /**
   * Value will be matched to one of the children to deduce the label and/or icon for the
   * toggle.
   */
  value: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.number, external_prop_types_default.a.bool])
});

Select_defineProperty(Select_Select, "defaultProps", {
  animateLoading: false,
  appearance: 'toggle',
  append: false,
  children: [],
  defaultPlacement: 'vertical',
  disabled: false,
  error: false,
  filter: false,
  inline: true,
  isLoadingOptions: false,
  menuStyle: {},
  noOptionsMessage: Object(i18n_["_"])('No matches'),
  onFilterChange: function onFilterChange() {},
  onChange: function onChange() {},
  placeholder: Object(i18n_["_"])('Select...'),
  prepend: false,
  scrollContainer: 'window',
  size: 'medium'
});

Select_defineProperty(Select_Select, "Option", Select_Option);

Select_defineProperty(Select_Select, "Divider", ResultsMenu_["Divider"]);

Select_defineProperty(Select_Select, "Heading", ResultsMenu_["Heading"]);

/* harmony default export */ var src_Select_Select = (Select_Select);

// CONCATENATED MODULE: ./src/Select/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Select_Select; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Option", function() { return Select_Option; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Divider", function() { return ResultsMenu_["Divider"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Heading", function() { return ResultsMenu_["Heading"]; });



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

/***/ 30:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Caret");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ })

/******/ });