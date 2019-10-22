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
/******/ 	return __webpack_require__(__webpack_require__.s = 114);
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

/***/ 114:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/react-ui/Dropdown"
var Dropdown_ = __webpack_require__(25);
var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown_);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/Text"
var Text_ = __webpack_require__(22);
var Text_default = /*#__PURE__*/__webpack_require__.n(Text_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Color/ColorStyles.js



var StyledDropdown = external_styled_components_default.a.div.withConfig({
  displayName: "ColorStyles__StyledDropdown",
  componentId: "sc-44cjtm-0"
})(["width:", ";padding:", ";display:", ";flex-direction:", ";border-radius:", ";"], Object(themes_["variable"])('Color', 'width'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('Color', 'display'), Object(themes_["variable"])('Color', 'flexDirection'), Object(themes_["variable"])('Color', 'borderRadius'));
var StyledSwatches = external_styled_components_default.a.ul.withConfig({
  displayName: "ColorStyles__StyledSwatches",
  componentId: "sc-44cjtm-1"
})(["", ";", ";margin-bottom:", ";margin-right:", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["mixin"])('clearfix'), Object(themes_["variable"])('Color', 'swatchesListMarginBottom'), Object(themes_["variable"])('Color', 'swatchesListMarginRight'));
var StyledSwatch = external_styled_components_default.a.li.withConfig({
  displayName: "ColorStyles__StyledSwatch",
  componentId: "sc-44cjtm-2"
})(["", ";margin-right:", ";margin-bottom:", ";border-radius:", ";"], Object(themes_["mixin"])('reset')('inline-block'), Object(themes_["variable"])('Color', 'Swatch', 'marginRight'), Object(themes_["variable"])('Color', 'Swatch', 'marginBottom'), Object(themes_["variable"])('Color', 'Swatch', 'borderRadius'));
var StyledInput = external_styled_components_default.a.div.withConfig({
  displayName: "ColorStyles__StyledInput",
  componentId: "sc-44cjtm-3"
})(["display:flex;width:", ";margin-bottom:", ";position:", ";"], Object(themes_["variable"])('Color', 'Input', 'width'), Object(themes_["variable"])('Color', 'Input', 'marginBottom'), Object(themes_["variable"])('Color', 'Input', 'position'));
var textBoxSwatchStyle = Object(external_styled_components_["css"])(["&[data-role='textbox-swatch']{width:22px;height:22px;position:absolute;left:7px;top:7px;z-index:1;}"]);
var StyledClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "ColorStyles__StyledClickable",
  componentId: "sc-44cjtm-4"
})(["display:block;border:", ";border-radius:", ";flex:0 0 auto;", ";", ";", " &:focus{border-color:", ";box-shadow:", ";}&[data-size='small']{width:", ";height:", ";}&[data-size='medium']{width:", ";height:", ";}&[data-prepend='append']{border-right:none;}&[disabled]{background-image:linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8));}&[aria-invalid]{box-shadow:inset 0 0 0 2px white;border-color:", ";}", ""], Object(themes_["variable"])('Color', 'Swatch', 'border'), Object(themes_["variable"])('Color', 'Swatch', 'borderRadius'), function (props) {
  return props.value === 'transparent' ? Object(external_styled_components_["css"])(["background-image:linear-gradient( 45deg,", " 25%,", " 25%,", " 75%,", " 75%,", " ),linear-gradient( 45deg,", " 25%,", " 25%,", " 75%,", " 75%,", " );background-size:10px 10px;background-position:0 0,5px 5px;"], Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternOddColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternEvenColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternEvenColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternOddColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternOddColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternOddColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternEvenColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternEvenColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternOddColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternOddColor')) : "background-color: ".concat(props.value);
}, function (props) {
  return props.value === null ? Object(external_styled_components_["css"])(["background-image:linear-gradient( to bottom right,", " 48%,", ",", " 52% );"], Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternEvenColor'), Object(themes_["variable"])('Color', 'Swatch', 'nullLineColor'), Object(themes_["variable"])('Color', 'Swatch', 'transparentPatternEvenColor')) : "background-color: ".concat(props.value);
}, function (props) {
  return props.value === 'transparent' && Object(external_styled_components_["css"])(["background-color:", ";"], Object(themes_["variable"])('Color', 'Swatch', 'transparentBackgroundColor'));
}, Object(themes_["variable"])('Color', 'Swatch', 'focusBorderColor'), Object(themes_["variable"])('focusShadow'), Object(themes_["variable"])('Color', 'Swatch', 'smallSize'), Object(themes_["variable"])('Color', 'Swatch', 'smallSize'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('Color', 'clickableInvalidBorderColor'), function (props) {
  return Object(themes_["variable"])('Color', 'Swatch', 'textBoxSwatch')(props) && textBoxSwatchStyle;
});

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// CONCATENATED MODULE: ./src/Color/Swatch.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Swatch_Swatch =
/*#__PURE__*/
function (_Component) {
  _inherits(Swatch, _Component);

  function Swatch() {
    _classCallCheck(this, Swatch);

    return _possibleConstructorReturn(this, _getPrototypeOf(Swatch).apply(this, arguments));
  }

  _createClass(Swatch, [{
    key: "focus",
    value: function focus() {
      this.clickable.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          append = _this$props.append,
          onClick = _this$props.onClick,
          prepend = _this$props.prepend,
          size = _this$props.size,
          value = _this$props.value,
          otherProps = _objectWithoutProperties(_this$props, ["append", "onClick", "prepend", "size", "value"]);

      function handleClick(e) {
        onClick(e, {
          value: value
        });
      }

      var screenReaderValue = value === null ? Object(i18n_["_"])('no color') : value;
      return external_react_default.a.createElement(StyledClickable, _extends({
        "data-append": append ? true : null,
        "data-prepend": prepend ? true : null,
        "data-size": size,
        "data-test": "swatch",
        "data-test-value": value
      }, Object(themes_["ref"])(function (c) {
        _this.clickable = c;
      }), {
        onClick: handleClick,
        value: value
      }, otherProps), external_react_default.a.createElement(ScreenReaderContent_default.a, null, screenReaderValue));
    }
  }]);

  return Swatch;
}(external_react_["Component"]);

_defineProperty(Swatch_Swatch, "propTypes", {
  /** Append removes border from the right side. */
  append: external_prop_types_default.a.bool,

  /** @private. Call back function when activated. */
  onClick: external_prop_types_default.a.func,

  /** This has no affect on the appearance at this time but is recommend to be used when a
   * control is joined to the left. Styles may change in the future. */
  prepend: external_prop_types_default.a.bool,

  /** The size of the swatch. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** The color of the swatch to be shown. */
  value: external_prop_types_default.a.string
});

_defineProperty(Swatch_Swatch, "defaultProps", {
  onClick: function onClick() {},
  size: 'medium'
});

/* harmony default export */ var Color_Swatch = (Swatch_Swatch);
// CONCATENATED MODULE: ./src/Color/Color.jsx
function Color_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Color_typeof = function _typeof(obj) { return typeof obj; }; } else { Color_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Color_typeof(obj); }

function Color_extends() { Color_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Color_extends.apply(this, arguments); }

function Color_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Color_possibleConstructorReturn(self, call) { if (call && (Color_typeof(call) === "object" || typeof call === "function")) { return call; } return Color_assertThisInitialized(self); }

function Color_getPrototypeOf(o) { Color_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Color_getPrototypeOf(o); }

function Color_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Color_createClass(Constructor, protoProps, staticProps) { if (protoProps) Color_defineProperties(Constructor.prototype, protoProps); if (staticProps) Color_defineProperties(Constructor, staticProps); return Constructor; }

function Color_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Color_setPrototypeOf(subClass, superClass); }

function Color_setPrototypeOf(o, p) { Color_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Color_setPrototypeOf(o, p); }

function Color_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Color_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












/*
 * When the dropdown opens:
 * 1. If palette contains the color and the color is selected, the dropdown focus the color.
 * 2. If palette doesn't contain the color:
 *     1. If the Color.inputTopLayout flag is set in the current theme, the input receives focus.
 *     2. Otherwise the first color swatch receives focus.
 */

var Color_Color =
/*#__PURE__*/
function (_Component) {
  Color_inherits(Color, _Component);

  Color_createClass(Color, null, [{
    key: "hasNull",
    value: function hasNull(palette) {
      return palette.some(function (color) {
        return color === null;
      });
    }
  }, {
    key: "hasTransparent",
    value: function hasTransparent(palette) {
      return palette.some(function (color) {
        return Object(external_lodash_["toLower"])(color) === 'transparent';
      });
    }
  }, {
    key: "isValidHEX",
    value: function isValidHEX(value) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
    }
  }]);

  function Color(props) {
    var _this;

    Color_classCallCheck(this, Color);

    _this = Color_possibleConstructorReturn(this, Color_getPrototypeOf(Color).call(this, props));

    Color_defineProperty(Color_assertThisInitialized(Color_assertThisInitialized(_this)), "handleSwatchClick", function (e, _ref) {
      var value = _ref.value;
      var prevValue = _this.isControlled() ? _this.props.value : _this.state.value;
      var hasColorChanged = value !== prevValue;
      var name = _this.props.name;
      var displayValue = value === null ? 'N/A' : value;

      if (!_this.isControlled()) {
        _this.setState({
          value: value
        });
      }

      _this.setState({
        displayValue: displayValue,
        open: false
      });

      if (hasColorChanged) {
        _this.props.onChange({
          value: value,
          name: name
        });
      }

      _this.focus();

      e.preventDefault();
    });

    Color_defineProperty(Color_assertThisInitialized(Color_assertThisInitialized(_this)), "handleTextChange", function (e, _ref2) {
      var value = _ref2.value;

      _this.setState({
        displayValue: value
      });
    });

    Color_defineProperty(Color_assertThisInitialized(Color_assertThisInitialized(_this)), "handleTextKeyDown", function (e) {
      if (Object(keyboard_["keycode"])(e) === 'enter') {
        _this.handleRequestClose({
          reason: 'enterKey'
        });

        _this.focus();

        e.preventDefault();
      }
    });

    Color_defineProperty(Color_assertThisInitialized(Color_assertThisInitialized(_this)), "handleButtonClick", function (e) {
      _this.handleRequestClose({
        reason: 'buttonClick'
      });

      _this.focus();

      e.preventDefault();
    });

    Color_defineProperty(Color_assertThisInitialized(Color_assertThisInitialized(_this)), "handleRequestClose", function (_ref3) {
      var reason = _ref3.reason;
      var displayValue = _this.state.displayValue;
      var value = _this.state.value;

      if (Object(external_lodash_["toLower"])(displayValue) === 'n/a') {
        displayValue = 'N/A';

        _this.setState({
          displayValue: displayValue
        });
      } else if (Object(external_lodash_["toLower"])(displayValue) === 'transparent') {
        displayValue = 'transparent';

        _this.setState({
          displayValue: displayValue
        });
      } // If the user typein the hexadecimal number without # in front,
      // we are able to add # automatically.


      if (displayValue !== 'N/A' && Object(external_lodash_["toLower"])(displayValue) !== 'transparent' && !Object(external_lodash_["startsWith"])(displayValue, '#')) {
        displayValue = "#".concat(displayValue);

        if (reason === 'escapeKey') {
          _this.setState({
            displayValue: value
          });
        } else {
          _this.setState({
            displayValue: displayValue
          });
        }
      }

      if (reason !== 'contentClick') {
        _this.setState({
          open: false
        });
      }

      if (reason !== 'escapeKey') {
        _this.submitValue(displayValue);
      }
    });

    Color_defineProperty(Color_assertThisInitialized(Color_assertThisInitialized(_this)), "handleRequestOpen", function () {
      var value = _this.isControlled() ? _this.props.value : _this.state.value;
      var displayValue = value === null ? 'N/A' : value;

      _this.setState({
        displayValue: displayValue,
        open: true
      }, function () {
        if (_this.focusSwatch.current && _this.focusSwatch.current.focus) {
          _this.focusSwatch.current.focus();
        }

        if (_this.focusInput.current && _this.focusInput.current.focus) {
          _this.focusInput.current.focus();
        }
      });
    });

    _this.focusSwatch = external_react_default.a.createRef();
    _this.focusInput = external_react_default.a.createRef();
    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value'); // value can be hexadecimal color, 'transparent' or null

    var _value = props.defaultValue || props.value;

    if (_value !== null) {
      _value = Object(external_lodash_["toLower"])(_value);
    } // displayValue can be hexadecimal color or 'transparent' to represent 'transparent' or 'N/A' to represent null


    var _displayValue = _value === null ? 'N/A' : _value;

    _this.state = {
      value: _value,
      displayValue: _displayValue,
      open: false
    };

    if (false) {}

    return _this;
  }

  Color_createClass(Color, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}

      if (false) {}
    }
  }, {
    key: "submitValue",
    value: function submitValue(displayValue) {
      if (Color.isValidHEX(displayValue) || Color.hasTransparent(this.props.palette) && displayValue === 'transparent' || Color.hasNull(this.props.palette) && displayValue === 'N/A') {
        var hasColorChanged = displayValue !== this.props.value;
        var name = this.props.name;
        var value = displayValue === 'N/A' ? null : displayValue;

        if (displayValue && !this.isControlled()) {
          this.setState({
            value: value
          });
        }

        if (hasColorChanged) {
          this.props.onChange({
            value: value,
            name: name
          });
        }
      }
    }
    /**
     * Place focus on the input.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.dropdown.focus();
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "renderInput",
    value: function renderInput() {
      var displayValue = this.state.displayValue;
      var theme = this.props.theme;
      var inputTopLayout = Object(themes_["variable"])('Color', 'inputTopLayout')({
        theme: theme
      });
      var showTransparent = Color.hasTransparent(this.props.palette) && Object(external_lodash_["toLower"])(displayValue) === 'transparent';
      var showNull = Color.hasNull(this.props.palette) && Object(external_lodash_["toLower"])(displayValue) === 'n/a';
      var inputSwatchValue = displayValue;

      if (!Object(external_lodash_["startsWith"])(displayValue, '#')) {
        inputSwatchValue = "#".concat(displayValue);
      }

      inputSwatchValue = showTransparent ? 'transparent' : inputSwatchValue;
      inputSwatchValue = showNull ? null : inputSwatchValue;
      var currentValue = this.isControlled() ? this.props.value : this.state.value;
      var colorExist = Object(external_lodash_["includes"])(this.props.palette, currentValue);
      var shouldFocus = inputTopLayout && (!colorExist || !this.focusSwatch);
      return external_react_default.a.createElement(StyledInput, null, external_react_default.a.createElement(Text_default.a, {
        append: !inputTopLayout,
        prepend: !inputTopLayout,
        inputStyle: inputTopLayout ? {
          paddingLeft: '20px'
        } : null,
        onKeyDown: this.handleTextKeyDown,
        onChange: this.handleTextChange,
        value: displayValue,
        ref: shouldFocus ? this.focusInput : null
      }), external_react_default.a.createElement(Color_Swatch, {
        "data-test": "textbox-swatch",
        "data-role": "textbox-swatch",
        onClick: this.handleButtonClick,
        value: inputSwatchValue,
        tabIndex: "-1",
        prepend: true
      }, external_react_default.a.createElement(ScreenReaderContent_default.a, null, "Apply Color")));
    }
  }, {
    key: "renderPalette",
    value: function renderPalette() {
      var _this2 = this;

      var currentValue = this.isControlled() ? this.props.value : this.state.value;
      var colorExist = Object(external_lodash_["includes"])(this.props.palette, currentValue);
      return external_react_default.a.createElement(StyledSwatches, null, this.props.palette.map(function (value, index) {
        var formattedValue = value === null ? null : Object(external_lodash_["toLower"])(value);
        var selected = value === currentValue;
        var shouldFocus = !colorExist && index === 0 || colorExist && selected;
        return external_react_default.a.createElement(StyledSwatch, {
          key: formattedValue
        }, external_react_default.a.createElement(Color_Swatch, {
          value: formattedValue,
          ref: shouldFocus ? _this2.focusSwatch : null,
          onClick: _this2.handleSwatchClick
        }));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          disabled = _this$props.disabled,
          describedBy = _this$props.describedBy,
          elementRef = _this$props.elementRef,
          error = _this$props.error,
          labelledBy = _this$props.labelledBy,
          name = _this$props.name,
          size = _this$props.size;
      var value = this.isControlled() ? this.props.value : this.state.value;
      var displayValue = this.state.displayValue;
      var toggle = external_react_default.a.createElement(Color_Swatch, {
        "aria-describedby": describedBy,
        "aria-labelledby": labelledBy,
        "aria-invalid": error || null,
        disabled: disabled,
        name: name,
        size: size,
        value: value
      });
      return external_react_default.a.createElement(Dropdown_default.a, Color_extends({
        closeReasons: ['clickAway', 'escapeKey', 'offScreen', 'toggleClick'],
        "data-test": "color",
        "data-test-value": displayValue,
        elementRef: elementRef,
        onRequestClose: this.handleRequestClose,
        onRequestOpen: this.handleRequestOpen,
        open: this.state.open,
        ref: function ref(c) {
          _this3.dropdown = c;
        },
        retainFocus: true,
        takeFocus: false // Disable the default focus behavior in Dropdown.
        ,
        toggle: toggle
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Color.propTypes))), external_react_default.a.createElement(StyledDropdown, null, this.renderPalette(), this.renderInput()));
    }
  }]);

  return Color;
}(external_react_["Component"]);

Color_defineProperty(Color_Color, "propTypes", {
  /** Append removes border from the right side. */
  append: external_prop_types_default.a.bool,

  /** Set this property instead of value to make value uncontrolled. */
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

  /** Add an error attribute. */
  error: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /** A callback that receives the value of a newly selected color. */
  onChange: external_prop_types_default.a.func,

  /** An array of optional color swatch values (hexadecimal or 'transparent').
   * The 'transparent' option should only be put at the start or end of the palette. */
  palette: external_prop_types_default.a.array,

  /** This has no affect on the appearance at this time but is recommend to be used when a
   * control is joined to the left. Styles may change in the future. */
  prepend: external_prop_types_default.a.bool,

  /** The size of the swatch. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** @private */
  theme: external_prop_types_default.a.object,

  /**
   * The value of the color (hexadecimal or 'transparent').
   * Setting this value makes the property controlled.
   * A callback is required.
   */
  value: external_prop_types_default.a.string
});

Color_defineProperty(Color_Color, "defaultProps", {
  append: false,
  disabled: false,
  error: false,
  onChange: function onChange() {},
  palette: [],
  prepend: false,
  theme: null,
  size: 'medium'
});

var colorwithTheme = Object(external_styled_components_["withTheme"])(Color_Color);
colorwithTheme.propTypes = Color_Color.propTypes;
colorwithTheme.defaultProps = Color_Color.defaultProps;
/* harmony default export */ var src_Color_Color = (Object(external_styled_components_["withTheme"])(colorwithTheme));
// CONCATENATED MODULE: ./src/Color/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Color_Color; });


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Text");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Dropdown");

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

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ })

/******/ });