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
/******/ 	return __webpack_require__(__webpack_require__.s = 148);
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

/***/ 148:
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

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(20);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/react-icons/Calendar"
var Calendar_ = __webpack_require__(55);
var Calendar_default = /*#__PURE__*/__webpack_require__.n(Calendar_);

// EXTERNAL MODULE: external "@splunk/react-ui/Calendar"
var react_ui_Calendar_ = __webpack_require__(56);
var react_ui_Calendar_default = /*#__PURE__*/__webpack_require__.n(react_ui_Calendar_);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/react-ui/Text"
var Text_ = __webpack_require__(22);
var Text_default = /*#__PURE__*/__webpack_require__.n(Text_);

// CONCATENATED MODULE: ./src/Date/DateStyles.js



var StyledText = external_styled_components_default()(Text_default.a).withConfig({
  displayName: "DateStyles__StyledText",
  componentId: "sc-89m3oe-0"
})(["position:", ";letter-spacing:", ";&[data-inline]{width:", ";flex-basis:", ";&[data-size='small']{width:", ";flex-basis:", ";}&[data-size='large']{width:", ";flex-basis:", ";}}"], Object(themes_["variable"])('Date', 'position'), Object(themes_["variable"])('Date', 'letterSpacing'), Object(themes_["variable"])('Date', 'width'), Object(themes_["variable"])('Date', 'width'), Object(themes_["variable"])('Date', 'widthSmall'), Object(themes_["variable"])('Date', 'widthSmall'), Object(themes_["variable"])('Date', 'widthLarge'), Object(themes_["variable"])('Date', 'widthLarge'));
var IconContainer = external_styled_components_default.a.div.withConfig({
  displayName: "DateStyles__IconContainer",
  componentId: "sc-89m3oe-1"
})(["position:absolute;height:calc(100% - 2px);left:1px;top:1px;z-index:1;display:flex;align-items:center;padding:0 10px;border-bottom-left-radius:3px;border-top-left-radius:3px;&[disabled]{cursor:not-allowed;}"]);

// CONCATENATED MODULE: ./src/Date/Date.jsx
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














var Date_Date =
/*#__PURE__*/
function (_Component) {
  _inherits(Date, _Component);

  /**
   * This static value can be used to convert a moment date to a compatible string
   * to set the `value` prop.
   * ```
   * moment().format(Date.momentFormat);
   * ```
   * @public
   * @name momentFormat
   * @memberOf Date
   * @type string
   */
  function Date(props) {
    var _this;

    _classCallCheck(this, Date);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Date).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "applyTextChange", function (e) {
      var date = external_moment_default()(_this.state.tempTextInputDate, 'l', _this.props.locale);

      if (date.isValid()) {
        _this.handleDateChange(e, {
          value: date.format(Date.momentFormat),
          origin: 'textInput'
        });
      } else {
        _this.setState({
          tempTextInputDate: null,
          calendarOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDateChange", function (e, _ref) {
      var value = _ref.value,
          origin = _ref.origin;

      if (origin !== 'textInput') {
        _this.focusCalledInternally = true;

        _this.focus();
      }

      if (_this.getValue() !== value) {
        _this.setState({
          value: _this.isControlled() ? null : value,
          tempTextInputDate: null,
          calendarOpen: false
        });

        var name = _this.props.name;

        _this.props.onChange(e, {
          value: value,
          name: name
        });
      } else {
        _this.setState({
          calendarOpen: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function (e) {
      /* SUI-930 On IE 11 this handler is essentially deferred after calling
       * this.textInput.focus(). this.focusCalledInternally enables the focus event to be ignored
       * when the menu closes. */
      if (_this.focusCalledInternally) {
        _this.focusCalledInternally = false;
      } else {
        _this.setState({
          calendarOpen: true
        });
      }

      _this.props.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      if (!_this.state.calendarOpen) {
        _this.setState({
          calendarOpen: true
        });
      }

      _this.props.onClick(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (e, _ref2) {
      var value = _ref2.value;

      _this.setState({
        tempTextInputDate: value,
        calendarOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      if (Object(keyboard_["keycode"])(e) === 'enter' || Object(keyboard_["keycode"])(e) === 'tab') {
        _this.applyTextChange();
      } else if ((Object(keyboard_["keycode"])(e) === 'up' || Object(keyboard_["keycode"])(e) === 'down') && !_this.state.calendarOpen) {
        _this.setState({
          calendarOpen: true
        });
      } else if (Object(keyboard_["keycode"])(e) === 'esc') {
        _this.setState({
          tempTextInputDate: null,
          calendarOpen: false
        });

        _this.focus();
      }

      _this.props.onKeyDown(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (comp) {
      _this.setState({
        anchor: comp
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestClose", function (_ref3) {
      var event = _ref3.event,
          reason = _ref3.reason;

      if ((reason === 'clickAway' || reason === 'escapeKey') && event.target !== _this.state.anchor.input) {
        _this.applyTextChange();
      }
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');
    var dateString = _this.isControlled() ? props.value : props.defaultValue || external_moment_default()().locale(props.locale).format(Date.momentFormat);
    _this.state = {
      value: _this.isControlled() ? null : dateString,
      calendarOpen: false,
      tempTextInputDate: null
    };
    _this.popoverId = Object(id_["createDOMID"])('calender');

    if (false) {}

    return _this;
  }

  _createClass(Date, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}

      if (false) {}
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.isControlled() ? this.props.value : this.state.value;
    }
  }, {
    key: "getTextInputValue",
    value: function getTextInputValue() {
      return this.state.tempTextInputDate === null ? external_moment_default()(this.getValue(), Date.momentFormat, this.props.locale).format('l') : this.state.tempTextInputDate;
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
    /**
     * Place focus on the input.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.state.anchor.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var theme = this.props.theme;
      var shouldRenderIcon = Object(themes_["variable"])('Date', 'shouldRenderIcon')({
        theme: theme
      });
      var currentValue = this.getValue();
      return external_react_default.a.createElement(StyledText, _extends({
        "data-test": "date",
        "data-test-value": currentValue,
        "data-test-popover-id": this.popoverId,
        onChange: this.handleInputChange,
        onClick: this.handleClick,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        value: this.getTextInputValue()
      }, Object(themes_["ref"])(this.handleMount), Object(external_lodash_["omit"])(this.props, 'className', 'defaultValue', 'onClick', 'onFocus', 'onKeyDown', 'locale', 'onChange', 'value', 'scrollContainer'), {
        inputStyle: shouldRenderIcon ? {
          paddingLeft: '20px'
        } : null
      }), shouldRenderIcon && external_react_default.a.createElement(IconContainer, {
        disabled: this.props.disabled
      }, external_react_default.a.createElement(Calendar_default.a, {
        size: 1
      })), external_react_default.a.createElement(Popover_default.a, {
        anchor: this.state.anchor,
        id: this.popoverId,
        open: this.props.disabled ? false : this.state.calendarOpen,
        onRequestClose: this.handleRequestClose,
        scrollContainer: this.props.scrollContainer
      }, external_react_default.a.createElement(react_ui_Calendar_default.a, {
        value: currentValue,
        locale: this.props.locale,
        onChange: this.handleDateChange
      })));
    }
  }]);

  return Date;
}(external_react_["Component"]);

_defineProperty(Date_Date, "propTypes", {
  /** Default date to display. Set this instead of value to make the Date uncontrolled. */
  defaultValue: external_prop_types_default.a.string,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /** Add a disabled attribute and prevent clicking. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Highlight the field as having an error. The border and text will turn red.
   */
  error: external_prop_types_default.a.bool,

  /** When false, display as inline-block with the default width. */
  inline: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /** Locale set by language and localization specifiers. */
  locale: external_prop_types_default.a.string,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /** A callback for when the input loses focus. */
  onBlur: external_prop_types_default.a.func,

  /**
   * Return event and data object with date string (in YYYY-MM-DD format) when a date is
   * selected.
   */
  onChange: external_prop_types_default.a.func,
  onClick: external_prop_types_default.a.func,
  onFocus: external_prop_types_default.a.func,
  onKeyDown: external_prop_types_default.a.func,

  /**
   * The container with which the popover must scroll to stay aligned with the anchor.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /** The overall size of the input. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /** @private */
  theme: external_prop_types_default.a.object,

  /** Setting this value makes the property controlled. An onChange callback is required.
   *
   * The value must be in the format 'YYYY-MM-DD'. To simplify creation of these strings,
   * Date provides a Moment.js formatting string:
   * ```
   * moment().format(Date.momentFormat);
   * ```
   */
  value: external_prop_types_default.a.string
});

_defineProperty(Date_Date, "defaultProps", {
  disabled: false,
  error: false,
  inline: true,
  locale: 'en_US',
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onClick: function onClick() {},
  onFocus: function onFocus() {},
  onKeyDown: function onKeyDown() {},
  size: 'medium',
  scrollContainer: 'window',
  theme: null
});

_defineProperty(Date_Date, "momentFormat", 'YYYY-MM-DD');

var datewithTheme = Object(external_styled_components_["withTheme"])(Date_Date);
datewithTheme.propTypes = Date_Date.propTypes;
datewithTheme.defaultProps = Date_Date.defaultProps;
/* harmony default export */ var src_Date_Date = (datewithTheme);
// CONCATENATED MODULE: ./src/Date/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Date_Date; });


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Popover");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Text");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Calendar");

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Calendar");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ })

/******/ });