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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/id");

/***/ }),

/***/ 125:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/react-ui/ResultsMenu"
var ResultsMenu_ = __webpack_require__(18);
var ResultsMenu_default = /*#__PURE__*/__webpack_require__.n(ResultsMenu_);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

// EXTERNAL MODULE: external "@splunk/react-ui/Text"
var Text_ = __webpack_require__(22);
var Text_default = /*#__PURE__*/__webpack_require__.n(Text_);

// EXTERNAL MODULE: external "@splunk/react-ui/Menu"
var Menu_ = __webpack_require__(17);

// CONCATENATED MODULE: ./src/ComboBox/Option.jsx
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
 * An option within a `ComboBox`. This inherits from
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
          disabled = _this$props.disabled,
          onClick = _this$props.onClick,
          value = _this$props.value;

      if (!disabled) {
        onClick(e, {
          value: value
        });
      }
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
      var _this2 = this;

      // eslint-disable-next-line no-unused-vars
      var _this$props2 = this.props,
          value = _this$props2.value,
          otherProps = _objectWithoutProperties(_this$props2, ["value"]);

      return external_react_default.a.createElement(Menu_["Item"], _extends({
        ref: function ref(c) {
          return _this2.c = c;
        },
        "data-test": "option",
        "data-test-value": value
      }, otherProps, {
        onClick: this.handleClick,
        role: "option",
        "aria-selected": false
      }), value);
    }
  }]);

  return Option;
}(external_react_["PureComponent"]);

_defineProperty(Option_Option, "propTypes", {
  /** @private */
  active: external_prop_types_default.a.bool,

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
   * The icon to show before the label. See the @splunk/react-icons package for
   * drop in icons.
   *
   * Caution: The element(s) passed here must be pure. All icons in the react-icons package are pure.
   */
  icon: external_prop_types_default.a.node,

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

  /**
   * When `true`, wrapping is disabled and any additional text is ellipsised.
   */
  truncate: external_prop_types_default.a.bool,

  /**
   * The value of this option and the label shown for it.
   */
  value: external_prop_types_default.a.string.isRequired
});

_defineProperty(Option_Option, "defaultProps", {
  active: false,
  descriptionPosition: 'bottom',
  disabled: false,
  onClick: function onClick() {},
  truncate: false
});

/* harmony default export */ var ComboBox_Option = (Option_Option);
// CONCATENATED MODULE: ./src/ComboBox/ComboBox.jsx
function ComboBox_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ComboBox_typeof = function _typeof(obj) { return typeof obj; }; } else { ComboBox_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ComboBox_typeof(obj); }

function ComboBox_extends() { ComboBox_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return ComboBox_extends.apply(this, arguments); }

function ComboBox_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ComboBox_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ComboBox_createClass(Constructor, protoProps, staticProps) { if (protoProps) ComboBox_defineProperties(Constructor.prototype, protoProps); if (staticProps) ComboBox_defineProperties(Constructor, staticProps); return Constructor; }

function ComboBox_possibleConstructorReturn(self, call) { if (call && (ComboBox_typeof(call) === "object" || typeof call === "function")) { return call; } return ComboBox_assertThisInitialized(self); }

function ComboBox_getPrototypeOf(o) { ComboBox_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ComboBox_getPrototypeOf(o); }

function ComboBox_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ComboBox_setPrototypeOf(subClass, superClass); }

function ComboBox_setPrototypeOf(o, p) { ComboBox_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ComboBox_setPrototypeOf(o, p); }

function ComboBox_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ComboBox_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













function containsEvent(el, _ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _el$getBoundingClient = el.getBoundingClientRect(),
      top = _el$getBoundingClient.top,
      left = _el$getBoundingClient.left,
      bottom = _el$getBoundingClient.bottom,
      right = _el$getBoundingClient.right;

  return clientX > left && clientX < right && clientY > top && clientY < bottom;
}
/**
 * `ComboBox` allows the user to select a predefined string or enter a new value. Unlike `Select`
 * and `Multiselect`, `Option` value must always be a string and `Option` does not have a label
 * property.
 */


var ComboBox_ComboBox =
/*#__PURE__*/
function (_Component) {
  ComboBox_inherits(ComboBox, _Component);

  function ComboBox(props) {
    var _getPrototypeOf2;

    var _this;

    ComboBox_classCallCheck(this, ComboBox);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = ComboBox_possibleConstructorReturn(this, (_getPrototypeOf2 = ComboBox_getPrototypeOf(ComboBox)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleInputMount", function (el) {
      _this.textInput = el;

      _this.setState({
        anchor: el
      });

      _this.props.inputRef(el);
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleActiveOptionMount", function (c) {
      if (c) {
        c.scrollIntoViewIfNeeded();
      }
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleInputFocus", function () {
      var _this$props;

      /* SUI-930 On IE 11 this handler is essentially deferred after calling
       * this.textInput.focus(). this.focusCalledInternally enables the focus event to be ignored
       * when the menu closes. */
      if (_this.focusCalledInternally) {
        _this.focusCalledInternally = false;
      } else {
        _this.open();
      }

      (_this$props = _this.props).onFocus.apply(_this$props, arguments);
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleChange", function (e, _ref2) {
      var value = _ref2.value;
      var name = _this.props.name;

      if (!_this.isControlled()) {
        _this.setState({
          value: value,
          activeIndex: 0
        });
      } else {
        _this.setState({
          activeIndex: 0
        });
      }

      _this.props.onChange(e, {
        value: value,
        name: name
      });
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleSelectOption", function () {
      var _this2;

      (_this2 = _this).handleChange.apply(_this2, arguments);

      _this.focusCalledInternally = true;

      _this.focus();

      _this.close();
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleInputKeyDown", function (e) {
      var _this$props2 = _this.props,
          children = _this$props2.children,
          onKeyDown = _this$props2.onKeyDown,
          onScrollBottom = _this$props2.onScrollBottom;
      var numOptions = _this.availableOptionCount;
      var activeOption = _this.activeValue;

      if (_this.state.open) {
        switch (Object(keyboard_["keycode"])(e)) {
          case 'enter':
            {
              if (activeOption) {
                _this.handleSelectOption(e, {
                  value: activeOption
                });
              }

              break;
            }

          case 'tab':
            _this.close();

            break;

          case 'down':
            _this.setState(function (state) {
              return {
                activeIndex: Math.min(state.activeIndex + 1, numOptions - 1)
              };
            });

            if (children && onScrollBottom) {
              var beforeLastChild = children.length - 2;

              if (_this.state.activeIndex === beforeLastChild) {
                onScrollBottom();
              }
            }

            break;

          case 'up':
            _this.setState(function (state) {
              return {
                activeIndex: Math.max(state.activeIndex - 1, 0)
              };
            });

            break;

          default: // do nothing

        }
      } else if (Object(keyboard_["addsCharacter"])(e) !== false || // Safari 9.0 returns undefined
      Object(keyboard_["keycode"])(e) === 'enter' || Object(keyboard_["keycode"])(e) === 'backspace' || Object(keyboard_["keycode"])(e) === 'down' || Object(keyboard_["keycode"])(e) === 'up') {
        _this.open();
      }

      onKeyDown(e);
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleInputClick", function () {
      if (!_this.state.open && !_this.props.disabled) {
        _this.open();
      }
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleRequestClose", function (_ref3) {
      var event = _ref3.event,
          reason = _ref3.reason;
      var shouldClose = reason === 'offScreen' || reason === 'escapeKey' || reason === 'clickAway' && !containsEvent(_this.textInput, event);

      if (shouldClose) {
        _this.close();
      }
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "handleScrollBottom", function () {
      if (_this.state.open && !_this.state.isLoadingOptions) {
        _this.props.onScrollBottom();
      }
    });

    ComboBox_defineProperty(ComboBox_assertThisInitialized(ComboBox_assertThisInitialized(_this)), "renderMenu", function (_ref4) {
      var anchorWidth = _ref4.anchorWidth,
          maxHeight = _ref4.maxHeight;
      var _this$props3 = _this.props,
          children = _this$props3.children,
          controlledFilter = _this$props3.controlledFilter,
          isLoadingOptions = _this$props3.isLoadingOptions,
          menuStyle = _this$props3.menuStyle,
          onScrollBottom = _this$props3.onScrollBottom;
      var activeIndex = _this.state.activeIndex;

      var value = _this.getValue();

      var initialOptions = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]);
      var hasExactMatch = Object(external_lodash_["some"])(initialOptions, function (option) {
        return option.props.value === value;
      });

      if (!hasExactMatch && value) {
        initialOptions.unshift(external_react_default.a.createElement(ComboBox_Option, {
          key: "currentInput",
          value: value
        }));
      } // Hightlight Active


      _this.availableOptionCount = 0;
      _this.activeValue = undefined;
      var keywords = Object(filter_["stringToKeywords"])(value);
      _this.options = (controlledFilter ? initialOptions : initialOptions.filter(function (option) {
        if (Object(external_lodash_["get"])(option, ['props', 'value'], false)) {
          return Object(filter_["testPhrase"])(option.props.value, keywords);
        }

        return true; // Keep all headers and non-interactive options
      })).map(function (option, index) {
        if (!Object(external_lodash_["has"])(option.props, 'active')) {
          // ignore Headings and Dividers
          return option;
        }

        var active = _this.availableOptionCount === activeIndex;
        _this.availableOptionCount += 1;
        var matchRangesProp = option.props.matchRanges;
        var matchRanges = !controlledFilter && value && (hasExactMatch || index > 0) ? Object(filter_["keywordLocations"])(option.props.value, keywords) : undefined;

        if (active) {
          _this.activeValue = option.props.value;
          return Object(external_react_["cloneElement"])(option, {
            ref: _this.handleActiveOptionMount,
            id: _this.activeItemId,
            onClick: _this.handleSelectOption,
            matchRanges: matchRangesProp || matchRanges,
            active: true
          });
        }

        return Object(external_react_["cloneElement"])(option, {
          onClick: _this.handleSelectOption,
          matchRanges: matchRangesProp || matchRanges
        });
      });
      return external_react_default.a.createElement(ResultsMenu_default.a, ComboBox_extends({
        style: Object(external_lodash_["extend"])({
          overflow: 'auto',
          width: Math.max(anchorWidth, 200)
        }, menuStyle),
        maxHeight: maxHeight,
        onScrollBottom: onScrollBottom ? _this.handleScrollBottom : undefined,
        isLoading: isLoadingOptions
      }, Object(external_lodash_["pick"])(_this.props, 'className', 'noOptionsMessage', 'footerMessage', 'animateLoading', 'loadingMessage')), _this.options);
    });

    _this.state = {
      activeIndex: null,
      anchor: null,
      open: false,
      value: props.defaultValue || ''
    };
    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');
    _this.popoverId = Object(id_["createDOMID"])('popover');
    _this.activeItemId = Object(id_["createDOMID"])('active-item');

    if (false) {}

    if (false) {}

    return _this;
  }

  ComboBox_createClass(ComboBox, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (false) {}
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.isControlled() ? this.props.value : this.state.value;
    }
  }, {
    key: "open",
    value: function open() {
      this.setState({
        open: true,
        activeIndex: 0
      });
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        open: false
      });
    }
    /**
     * Focus the `ComboBox`.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.textInput.focus();
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "render",
    value: function render() {
      var defaultPlacement = this.props.defaultPlacement;
      var _this$state = this.state,
          anchor = _this$state.anchor,
          open = _this$state.open;
      var currentValue = this.getValue();
      return external_react_default.a.createElement(Text_default.a, ComboBox_extends({
        canClear: true,
        "data-test": "combo-box"
      }, Object(external_lodash_["omit"])(this.props, 'animateLoading', 'className', 'controlledFilter', 'isLoadingOptions', 'loadingMessage', 'menuStyle', 'noOptionsMessage', 'onScrollBottom', 'footerMessage', 'defaultValue'), {
        "data-test-popover-id": this.popoverId,
        "data-test-value": currentValue,
        "data-test-open": open && !!anchor,
        onFocus: this.handleInputFocus,
        onClick: this.handleInputClick,
        onChange: this.handleChange,
        onKeyDown: this.handleInputKeyDown,
        inputRef: this.handleInputMount,
        role: "combobox",
        value: currentValue,
        "aria-activedescendant": this.activeItemId,
        "aria-expanded": open,
        "aria-haspopup": true,
        "aria-controls": open ? this.popoverId : null
      }), external_react_default.a.createElement(Popover_default.a, {
        anchor: anchor,
        appearance: "light",
        autoCloseWhenOffScreen: true,
        canCoverAnchor: false,
        defaultPlacement: defaultPlacement,
        id: this.popoverId,
        onRequestClose: this.handleRequestClose,
        open: open && !!anchor,
        repositionMode: "flip"
      }, this.renderMenu));
    }
  }]);

  return ComboBox;
}(external_react_["Component"]);

ComboBox_defineProperty(ComboBox_ComboBox, "propTypes", {
  /*
   * Whether or not to show the wait spinner when loading. It's recommended to set this to
   * `true` when loading may take more than one second.
   */
  animateLoading: external_prop_types_default.a.bool,

  /** Append removes rounded borders and border from the right side. */
  append: external_prop_types_default.a.bool,

  /** All children must be instances of `ComboBox.Option`. */
  children: external_prop_types_default.a.node,

  /** If true, this component will not handle filtering. The parent must update the
   * Options based on the onChange value. */
  controlledFilter: external_prop_types_default.a.bool,

  /**
   * The default placement of the dropdown menu. It might be rendered in a different direction
   * depending upon the space available.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'vertical']),

  /** The initial value of the input. Only applicable in uncontrolled mode. */
  defaultValue: external_prop_types_default.a.string,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Highlight the field as having an error. The border and text will turn red.
   */
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
  onChange: external_prop_types_default.a.func,
  onFocus: external_prop_types_default.a.func,
  onKeyDown: external_prop_types_default.a.func,

  /**
   *  A callback function when the list is scrolled to the bottom. Use to fetch more results and append to list.
   *  Note: Set to null when all items are loaded.
   */
  onScrollBottom: external_prop_types_default.a.func,
  placeholder: external_prop_types_default.a.string,

  /** Prepend removes rounded borders from the left side. */
  prepend: external_prop_types_default.a.bool,

  /** The size of the text input. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /** The value of the input. Only applicable in controlled mode. */
  value: external_prop_types_default.a.string
});

ComboBox_defineProperty(ComboBox_ComboBox, "defaultProps", {
  animateLoading: false,
  controlledFilter: false,
  defaultPlacement: 'vertical',
  disabled: false,
  error: false,
  inline: false,
  inputRef: function inputRef() {},
  isLoadingOptions: false,
  menuStyle: {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onKeyDown: function onKeyDown() {},
  placeholder: Object(i18n_["_"])('Select...'),
  size: 'medium'
});

ComboBox_defineProperty(ComboBox_ComboBox, "Option", ComboBox_Option);

ComboBox_defineProperty(ComboBox_ComboBox, "Divider", ResultsMenu_["Divider"]);

ComboBox_defineProperty(ComboBox_ComboBox, "Heading", ResultsMenu_["Heading"]);

/* harmony default export */ var src_ComboBox_ComboBox = (ComboBox_ComboBox);

// CONCATENATED MODULE: ./src/ComboBox/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_ComboBox_ComboBox; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Option", function() { return ComboBox_Option; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Divider", function() { return ResultsMenu_["Divider"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Heading", function() { return ResultsMenu_["Heading"]; });



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