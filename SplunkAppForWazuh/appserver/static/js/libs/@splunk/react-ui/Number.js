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
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
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

/***/ 108:
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

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-icons/SVG"
var SVG_ = __webpack_require__(70);
var SVG_default = /*#__PURE__*/__webpack_require__.n(SVG_);

// CONCATENATED MODULE: ./src/Number/IncrementIcon.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



/* eslint-disable max-len */

function SortedUp(props) {
  return external_react_default.a.createElement(SVG_default.a, _extends({
    viewBox: "0 0 933 600"
  }, props), external_react_default.a.createElement("path", {
    fill: "currentColor",
    d: "M0 466.438L466.438 0l466.44 467.466-134.59 133.56-331.85-331.848-331.85 331.85L0 466.438z"
  }));
}
// EXTERNAL MODULE: external "@splunk/react-ui/Button"
var Button_ = __webpack_require__(16);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@splunk/react-ui/Text"
var Text_ = __webpack_require__(22);
var Text_default = /*#__PURE__*/__webpack_require__.n(Text_);

// CONCATENATED MODULE: ./src/Number/NumberStyles.js




var incrementorWidthSmall = '16px';
var NumberStyles_incrementorWidth = Object(external_styled_components_["css"])(["", ""], Object(themes_["variable"])('Number', 'incrementorWidth'));
var incrementorWidthLarge = '30px';
var StyledText = external_styled_components_default()(Text_default.a).withConfig({
  displayName: "NumberStyles__StyledText",
  componentId: "sc-1pus3mm-0"
})(["&[data-size='small']{&[data-inline]{width:80px;}}&[data-size='medium']{&[data-inline]{width:", ";}}&[data-size='large']{&[data-inline]{width:140px;}}"], Object(themes_["variable"])('Number', 'mediumWidth'));
var StyledControls = external_styled_components_default.a.div.withConfig({
  displayName: "NumberStyles__StyledControls",
  componentId: "sc-1pus3mm-1"
})(["border:", ";position:absolute;top:0;bottom:0;width:", ";z-index:1;[data-size='small'] > &{width:", ";}[data-size='large'] > &{width:", ";}&[data-position='last']{right:0;}&[data-position='first']{left:0;}"], Object(themes_["variable"])('Number', 'controlsBorder'), NumberStyles_incrementorWidth, incrementorWidthSmall, incrementorWidthLarge);
var incrementor = Object(external_styled_components_["css"])(["background-color:", ";position:absolute;padding:3px;font-size:inherit;min-width:0;min-height:0;height:calc(50% + 0.5px);width:100%;&:not([disabled]){color:", ";border-color:", ";&:hover{color:", ";background-color:", ";&:active{color:", ";border-color:", ";}}&:focus{background-color:", ";}}&[disabled]{border-color:", ";color:", ";}"], Object(themes_["variable"])('Number', 'incrementorBackgroundColor'), Object(themes_["variable"])('Number', 'incrementorColor'), Object(themes_["variable"])('Number', 'incrementorBorderColor'), Object(themes_["variable"])('Number', 'incrementorHoverColor'), Object(themes_["variable"])('Number', 'incrementorBackgroundColor'), Object(themes_["variable"])('Number', 'incrementorColor'), Object(themes_["variable"])('Number', 'incrementorBorderColor'), Object(themes_["variable"])('Number', 'incrementorBackgroundColor'), Object(themes_["variable"])('Number', 'incrementorDisabledBorderColor'), Object(themes_["variable"])('Number', 'incrementorDisabledColor'));
var StyledPlusButton = external_styled_components_default()(Button_default.a).withConfig({
  displayName: "NumberStyles__StyledPlusButton",
  componentId: "sc-1pus3mm-2"
})(["", ";top:0;border-bottom-left-radius:0;border-bottom-right-radius:0;&[data-append]{border-right:1px solid ", ";}"], incrementor, Object(themes_["variable"])('Number', 'plusButtonBorderRightColor'));
var StyledMinusButton = external_styled_components_default()(Button_default.a).withConfig({
  displayName: "NumberStyles__StyledMinusButton",
  componentId: "sc-1pus3mm-3"
})(["", ";bottom:0;border-top-left-radius:0;border-top-right-radius:0;&[data-append]{border-right:1px solid ", ";}"], incrementor, Object(themes_["variable"])('Number', 'minusButtonBorderRightColor'));

// CONCATENATED MODULE: ./src/Number/Number.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Number_extends() { Number_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Number_extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Number_Number =
/*#__PURE__*/
function (_Component) {
  _inherits(Number, _Component);

  _createClass(Number, null, [{
    key: "validatePrependAppend",
    value: function validatePrependAppend(append, prepend) {
      if (false) {}
    }
  }, {
    key: "stringToNumber",
    value: function stringToNumber(str, props) {
      var val = str;

      if (!Object(external_lodash_["isString"])(val) || val === '') {
        return undefined;
      } // remove leading non-numeric characters.


      val = val.replace(/^[^\d.-]/, '');
      var valNumeric = Number.limitValue(parseFloat(val, 10), props);

      if (Object(external_lodash_["isFinite"])(valNumeric)) {
        return valNumeric;
      }

      return undefined;
    }
  }, {
    key: "limitValue",
    value: function limitValue(val, _ref) {
      var min = _ref.min,
          max = _ref.max,
          roundTo = _ref.roundTo;
      var newVal = val;

      if (!Object(external_lodash_["isFinite"])(val)) {
        return newVal;
      }

      if (Object(external_lodash_["isFinite"])(min)) {
        newVal = Math.max(min, newVal);
      }

      if (Object(external_lodash_["isFinite"])(max)) {
        newVal = Math.min(max, newVal);
      } // eslint-disable-next-line no-restricted-properties


      var pow = Math.pow(10, roundTo);
      return Math.round(newVal * pow) / pow;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (Object(external_lodash_["has"])(props, 'value') && props.value !== state.prevValueProp) {
        var valNumeric = Number.stringToNumber(state.stringValue, props);
        return props.value !== valNumeric ? {
          prevValueProp: props.value,
          stringValue: Object(external_lodash_["isFinite"])(props.value) ? props.value.toString() : ''
        } : {
          prevValueProp: props.value
        };
      }

      return null;
    }
  }]);

  function Number(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Number);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Number)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputBlur", function (e) {
      _this.updateString(e);

      _this.props.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (e, _ref2) {
      var value = _ref2.value;

      _this.setValueFromString(e, value);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      if (!e.metaKey && !e.ctrlKey && !e.altKey && Object(keyboard_["addsCharacter"])(e) !== false) {
        // only allow numbers, negative and decimals
        if (!Object(keyboard_["isNumeric"])(e)) {
          e.preventDefault();
        } // if minus is not allowed or there is already one, prevent input


        if (Object(keyboard_["isMinus"])(e) && (_this.preventNegativeNumbers() || _this.state.stringValue.indexOf('-') >= 0)) {
          e.preventDefault();
        } // if decimal is not allowed or there is already one, prevent input


        if (Object(keyboard_["isDecimal"])(e) && (_this.props.roundTo <= 0 || _this.state.stringValue.indexOf('.') >= 0)) {
          e.preventDefault();
        }
      } // Arrow up and down will increment


      if (Object(keyboard_["keycode"])(e) === 'up') {
        _this.increment(e, _this.props.step);

        e.preventDefault();
      } else if (Object(keyboard_["keycode"])(e) === 'down') {
        _this.increment(e, -_this.props.step);

        e.preventDefault();
      }

      _this.props.onKeyDown(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyUp", function (e) {
      if (Object(keyboard_["keycode"])(e) === 'enter') {
        _this.updateString(e);
      }

      _this.props.onKeyUp(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIncrement", function (e) {
      _this.increment(e, _this.props.step);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDecrement", function (e) {
      _this.increment(e, -_this.props.step);
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');

    var _value = _this.isControlled() ? props.value : props.defaultValue;

    _this.state = {
      // value stores internal state, only in uncontrolled mode
      value: _this.isControlled() ? null : _value,
      // prevValueProp is used to keep track of changes to the value prop, only in controlled mode
      prevValueProp: _this.isControlled() ? _value : null,
      // stringValue stores the current contents of the input text box - it might be out of range, invalid, ...
      stringValue: Object(external_lodash_["isFinite"])(_value) ? _value.toString() : ''
    };

    if (false) {}

    Number.validatePrependAppend(_this.props.append, _this.props.prepend);
    return _this;
  }

  _createClass(Number, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}

      if (false) {}

      Number.validatePrependAppend(this.props.append, this.props.prepend);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.isControlled() ? this.props.value : this.state.value;
    }
  }, {
    key: "setValueFromString",
    value: function setValueFromString(e, str) {
      var _this2 = this;

      var value = Number.stringToNumber(str, this.props);
      var name = this.props.name;
      this.setState({
        value: this.isControlled() ? null : value,
        stringValue: str
      }, function () {
        if (_this2.getValue() !== value || !_this2.isControlled()) {
          _this2.props.onChange(e, {
            value: value,
            name: name
          });
        }
      });
    }
  }, {
    key: "setValue",
    value: function setValue(e, value) {
      var _this3 = this;

      var name = this.props.name;
      this.setState({
        value: this.isControlled() ? null : value,
        stringValue: value.toString()
      }, function () {
        if (_this3.getValue() !== value || !_this3.isControlled()) {
          _this3.props.onChange(e, {
            value: value,
            name: name
          });
        }
      });
    }
  }, {
    key: "focus",

    /**
     * Place focus on the input.
     */
    value: function focus() {
      if (this.text) {
        this.text.focus();
      }
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "updateString",
    value: function updateString() {
      var value = this.getValue();
      this.setState({
        stringValue: Object(external_lodash_["isFinite"])(value) ? value.toString() : ''
      });
    }
  }, {
    key: "increment",
    value: function increment(e, amount) {
      var valNumeric = Number.stringToNumber(this.state.stringValue, this.props);
      var targetValNumeric; // increment appropriate number

      if (Object(external_lodash_["isFinite"])(valNumeric)) {
        // increment the entered value
        targetValNumeric = valNumeric + amount;
      } else if (Object(external_lodash_["isFinite"])(this.props.defaultValue)) {
        // increment the defaultValue
        targetValNumeric = this.props.defaultValue + amount;
      } else if (amount > 0) {
        // increment up to max or step value
        targetValNumeric = this.props.max || this.props.step;
      } else {
        // increment down to min or 0
        targetValNumeric = this.props.min || 0; // set to min or 0
      }

      this.setValue(e, Number.limitValue(targetValNumeric, this.props));
    }
  }, {
    key: "preventNegativeNumbers",
    value: function preventNegativeNumbers() {
      return Object(external_lodash_["isFinite"])(this.props.min) && this.props.min >= 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          append = _this$props.append,
          describedBy = _this$props.describedBy,
          disabled = _this$props.disabled,
          error = _this$props.error,
          hideStepButtons = _this$props.hideStepButtons,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? this.state.value : _this$props$value,
          max = _this$props.max,
          min = _this$props.min,
          prepend = _this$props.prepend,
          size = _this$props.size,
          theme = _this$props.theme;
      var textProps = Object(external_lodash_["omit"])(this.props, ['defaultValue', 'hideStepButtons', 'min', 'max', 'roundTo', 'step']);
      var disableIncrement = Object(external_lodash_["isFinite"])(value) && Object(external_lodash_["isFinite"])(max) && value >= max;
      var disableDecrement = Object(external_lodash_["isFinite"])(value) && Object(external_lodash_["isFinite"])(min) && value <= min;
      var incrementorWidthMedium = Object(themes_["variable"])('Number', 'incrementorWidth')({
        theme: theme
      });
      var incrementorWidth = {
        small: '16px',
        medium: incrementorWidthMedium,
        large: '30px'
      };
      var inputStyle = append && !prepend ? {
        paddingLeft: "".concat(incrementorWidth[size])
      } : {
        paddingRight: "".concat(incrementorWidth[size])
      };
      var iconSizes = {
        small: {
          height: '4px',
          width: '6px'
        },
        medium: {
          height: '4px',
          width: '6px'
        },
        large: {
          height: '6px',
          width: '8px'
        }
      };
      return external_react_default.a.createElement(StyledText, Number_extends({
        autoComplete: false,
        "data-test": "number"
      }, Object(themes_["ref"])(function (c) {
        return _this4.text = c;
      }), textProps, {
        inputStyle: !hideStepButtons ? inputStyle : null,
        onChange: this.handleInputChange,
        onBlur: this.handleInputBlur,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        value: this.state.stringValue,
        "aria-describedby": describedBy,
        size: size,
        error: error,
        "data-test-value": value
      }), !disabled && !hideStepButtons && external_react_default.a.createElement(StyledControls, {
        "data-position": append && !prepend ? 'first' : 'last',
        "data-size": size
      }, external_react_default.a.createElement(StyledPlusButton, {
        appearance: "toggle",
        onClick: this.handleIncrement,
        disabled: disableIncrement,
        error: error,
        append: append,
        prepend: !append,
        inline: false,
        "data-test": "increment",
        tabIndex: "-1"
      }, external_react_default.a.createElement(SortedUp, {
        width: iconSizes[size].width,
        height: iconSizes[size].height,
        screenReaderText: Object(i18n_["_"])('Increment')
      })), external_react_default.a.createElement(StyledMinusButton, {
        appearance: "toggle",
        onClick: this.handleDecrement,
        disabled: disableDecrement,
        error: error,
        append: append,
        prepend: !append,
        inline: false,
        "data-test": "decrement",
        tabIndex: "-1"
      }, external_react_default.a.createElement(SortedUp, {
        width: iconSizes[size].width,
        height: iconSizes[size].height,
        screenReaderText: Object(i18n_["_"])('Decrement'),
        style: {
          transform: 'rotateX(180deg)'
        }
      }))));
    }
  }]);

  return Number;
}(external_react_["Component"]);

_defineProperty(Number_Number, "propTypes", {
  /** Append removes rounded borders and border from the right side and moves the
   * increment and decrement buttons to the left. */
  append: external_prop_types_default.a.bool,

  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Set this property instead of value to make value uncontrolled. */
  defaultValue: external_prop_types_default.a.number,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /** Whether or not the input is editable. */
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
   * An id for the input, which may be necessary for accessibility, such as for aria
   * attributes.
   */
  inputId: external_prop_types_default.a.string,

  /** When false, display as inline-block with the default width. */
  inline: external_prop_types_default.a.bool,

  /** Hide the increment & decrement step buttons if true. */
  hideStepButtons: external_prop_types_default.a.bool,

  /**
   * The number of decimal places for rounding. Set to zero to limit input to integers.
   * Negative numbers are supported. For instance, -2 will round to the nearest hundred.
   */
  roundTo: external_prop_types_default.a.number,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /** The smallest allowable value. */
  min: external_prop_types_default.a.number,

  /** The largest allowable value. */
  max: external_prop_types_default.a.number,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /** A callback for when the input loses focus. */
  onBlur: external_prop_types_default.a.func,

  /**
   * This is equivalent to onInput which is called on keydown, paste, etc.
   * If value is set, this callback is required. This must set the value prop to retain the
   * change.
   */
  onChange: external_prop_types_default.a.func,

  /** A callback for when the input takes focus. */
  onFocus: external_prop_types_default.a.func,

  /** A keydown callback can be used to prevent certain input by utilizing the event argument. */
  onKeyDown: external_prop_types_default.a.func,

  /** A keyup callback. */
  onKeyUp: external_prop_types_default.a.func,

  /** A callback for when the users selects text. */
  onSelect: external_prop_types_default.a.func,

  /** The gray text shown when the input is empty. */
  placeholder: external_prop_types_default.a.string,

  /** Prepend removes rounded borders from the left side. This cannot be used in combination
   * with append. */
  prepend: external_prop_types_default.a.bool,

  /** The overall size of the input. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /** The amount of increment and decrement applied by the buttons and arrow keys. */
  step: external_prop_types_default.a.number,

  /** Some browsers remove placeholder text on focus. The synthetic placeholder never does. */

  /** @private */
  theme: external_prop_types_default.a.object,
  useSyntheticPlaceholder: external_prop_types_default.a.bool,

  /**
   * The contents of the input. Setting this value makes the property controlled. A callback
   * is required. */
  value: external_prop_types_default.a.number
});

_defineProperty(Number_Number, "defaultProps", {
  append: false,
  disabled: false,
  error: false,
  inline: false,
  hideStepButtons: false,
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onKeyUp: function onKeyUp() {},
  onSelect: function onSelect() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  placeholder: '',
  prepend: false,
  roundTo: 5,
  size: 'medium',
  step: 1,
  theme: null,
  useSyntheticPlaceholder: false
});

var numberwithTheme = Object(external_styled_components_["withTheme"])(Number_Number);
numberwithTheme.propTypes = Number_Number.propTypes;
/* harmony default export */ var src_Number_Number = (numberwithTheme);
// CONCATENATED MODULE: ./src/Number/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Number_Number; });


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

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

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/SVG");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ })

/******/ });