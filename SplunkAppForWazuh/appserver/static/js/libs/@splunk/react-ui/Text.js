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
/******/ 	return __webpack_require__(__webpack_require__.s = 113);
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

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@splunk/ui-utils/style"
var style_ = __webpack_require__(28);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/react-icons/Clear"
var Clear_ = __webpack_require__(81);
var Clear_default = /*#__PURE__*/__webpack_require__.n(Clear_);

// EXTERNAL MODULE: external "@splunk/react-icons/Search"
var Search_ = __webpack_require__(82);
var Search_default = /*#__PURE__*/__webpack_require__.n(Search_);

// CONCATENATED MODULE: ./src/Text/syncHeightWithShadow.js
// This file was adapted from [Call-Em-All's material-ui](https://github.com/mui-org/material-ui),
// which is MIT-licensed:
//
// The MIT License (MIT)
//
// Copyright (c) 2014 Call-Em-All
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// End of MIT license text.
function syncHeightWithShadow() {
  var shadow = this.shadow;

  if (this.props.multiline && shadow) {
    var style = window.getComputedStyle(shadow);
    var lineHeightValue = style.getPropertyValue('line-height');

    if (false) {}

    var lineHeight = parseInt(lineHeightValue, 10);
    var paddingTop = parseInt(style.getPropertyValue('padding-top'), 10);
    var paddingBottom = parseInt(style.getPropertyValue('padding-bottom'), 10);
    var borderTop = parseInt(style.getPropertyValue('border-top-width'), 10);
    var borderBottom = parseInt(style.getPropertyValue('border-bottom-width'), 10);
    var newHeight = shadow.scrollHeight + borderTop + borderBottom;
    /* eslint-disable no-restricted-globals */
    // Leverage the global `isNaN` here for IE support, rather than Number.isNaN.
    // We know newHeight is numeric because we parseInt() above, so `isNaN` should be reliable.

    if (newHeight === undefined || isNaN(newHeight)) {
      return;
    }
    /* eslint-enable no-restricted-globals */


    if (this.props.rowsMax >= this.props.rowsMin) {
      var maxHeight = this.props.rowsMax * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom + 1; // need one extra.

      newHeight = Math.min(maxHeight, newHeight);
    }

    var minHeight = this.props.rowsMin * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom + 1; // need one extra.

    newHeight = Math.max(minHeight, newHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight
      });
    }
  }
}
// EXTERNAL MODULE: external "lodash/startCase"
var startCase_ = __webpack_require__(83);
var startCase_default = /*#__PURE__*/__webpack_require__.n(startCase_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/Text/TextStyles.js




var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "TextStyles__StyledBox",
  componentId: "sc-148yeee-0"
})(["flex-grow:1;flex-shrink:1;position:relative;&[data-inline]{width:230px;flex-basis:230px;[data-inline] + &{margin-left:", ";}}&[data-size='small']{font-size:", ";}&[data-size='large']{font-size:", ";line-height:", ";}"], Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('fontSizeLarge'), Object(themes_["variable"])('lineHeight'));

var TextStyles_addPadding = function addPadding(property, type, base) {
  return Object(external_styled_components_["css"])(["", ":", ";"],
  /* sc-prop */
  property, function (_ref) {
    var customStyle = _ref.customStyle;
    var custom = customStyle && customStyle["padding".concat(startCase_default()(type))] || '0px';
    return custom ? Object(external_styled_components_["css"])(["calc(", " + ", ")"], base, custom) : base;
  });
};

var paddingSearchIconLeft = Object(external_styled_components_["css"])(["", ";"], TextStyles_addPadding('padding-left', 'left', Object(themes_["variable"])('Text', 'searchIconPaddingLeft')));
var paddingForClearOrSearch = Object(external_styled_components_["css"])(["", ";[data-size='small'] > &{", ";}[data-size='large'] > &{", ";}"], TextStyles_addPadding('padding-right', 'right', Object(themes_["variable"])('Text', 'inputClearOrSearchPaddingRight')), TextStyles_addPadding('padding-right', 'right', '24px'), TextStyles_addPadding('padding-right', 'right', '36px'));
/* Some of these need greater specificity than input[type=text] */

var StyledInputInput = external_styled_components_default.a.input.withConfig({
  displayName: "TextStyles__StyledInputInput",
  componentId: "sc-148yeee-1"
})(["&,&[type]{box-sizing:border-box;display:block;margin:0;line-height:inherit;height:inherit;color:", ";border-radius:", ";background-color:", ";border:", ";border-color:", ";font-size:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);width:100%;padding-top:", ";", ";padding-bottom:", ";", ";min-height:", ";position:relative;[data-size='small'] > &{padding-top:3px;", ";padding-bottom:3px;", ";min-height:", ";}[data-size='large'] > &{padding-top:8px;", ";padding-bottom:8px;", ";min-height:", ";}&[data-append]{margin-right:-1px;border-top-right-radius:0;border-bottom-right-radius:0;border-right:none;}&[data-prepend]{border-top-left-radius:0;border-bottom-left-radius:0;}&:focus:not([disabled]){border-color:", ";box-shadow:", ";color:", ";outline:0;border-collapse:separate;z-index:1;&[data-can-clear]{", ";}}&[data-error]{border-color:", ";color:", ";}&::-ms-clear{display:none;width:0;height:0;}&::placeholder{color:", ";opacity:1;}}textarea&{resize:none;overflow:auto;}"], Object(themes_["variable"])('Text', 'inputColor'), Object(themes_["variable"])('borderRadius'), Object(themes_["variable"])('Text', 'inputBackgroundColor'), Object(themes_["variable"])('border'), Object(themes_["variable"])('Text', 'inputBorderColor'), Object(themes_["variable"])('Text', 'spacingQuarter'), TextStyles_addPadding('padding-right', 'right', Object(themes_["variable"])('Text', 'spacingHalf')), Object(themes_["variable"])('Text', 'spacingQuarter'), TextStyles_addPadding('padding-left', 'left', Object(themes_["variable"])('Text', 'spacingHalf')), Object(themes_["variable"])('inputHeight'), TextStyles_addPadding('padding-right', 'right', Object(themes_["variable"])('spacingQuarter')), TextStyles_addPadding('padding-left', 'left', Object(themes_["variable"])('spacingQuarter')), Object(themes_["variable"])('inputHeightSmall'), TextStyles_addPadding('padding-right', 'right', '11px'), TextStyles_addPadding('padding-left', 'left', '11px'), Object(themes_["variable"])('inputHeightLarge'), Object(themes_["variable"])('Text', 'inputFocusBorderColor'), Object(themes_["variable"])('Text', 'inputFocusShadow'), Object(themes_["variable"])('Text', 'inputFocusColor'), paddingForClearOrSearch, Object(themes_["variable"])('Text', 'inputErrorBorderColor'), Object(themes_["variable"])('Text', 'inputErrorColor'), Object(themes_["variable"])('textGray'));
var StyledInputTextarea = StyledInputInput.withComponent('textarea');
var StyledInputSearchInput = external_styled_components_default()(StyledInputInput).withConfig({
  displayName: "TextStyles__StyledInputSearchInput",
  componentId: "sc-148yeee-2"
})(["&,&[type]{", ";", ";}"], paddingForClearOrSearch, paddingSearchIconLeft);
var StyledInputSearchTextarea = external_styled_components_default()(StyledInputTextarea).withConfig({
  displayName: "TextStyles__StyledInputSearchTextarea",
  componentId: "sc-148yeee-3"
})(["&,&[type]{", ";", ";}"], paddingForClearOrSearch, paddingSearchIconLeft);
var disabledStyles = Object(external_styled_components_["css"])(["&,&[type]{color:", ";background-color:", ";border-color:", ";box-shadow:inset 0 1px 2px rgba(0,0,0,0.025);cursor:not-allowed;", ";}"], Object(themes_["variable"])('Text', 'inputDisabledColor'), Object(themes_["variable"])('Text', 'inputDisabledBackgroundColor'), Object(themes_["variable"])('Text', 'inputDisabledBorderColor'), function (_ref2) {
  var renderSearchIcon = _ref2.renderSearchIcon;
  return renderSearchIcon && paddingSearchIconLeft;
});
var StyledInputDisabledTextarea = external_styled_components_default()(StyledInputTextarea).withConfig({
  displayName: "TextStyles__StyledInputDisabledTextarea",
  componentId: "sc-148yeee-4"
})(["&,&[type]{", ";}"], disabledStyles);
var StyledInputDisabledInput = external_styled_components_default()(StyledInputInput).withConfig({
  displayName: "TextStyles__StyledInputDisabledInput",
  componentId: "sc-148yeee-5"
})(["&,&[type]{", ";}"], disabledStyles);
var StyledSearchIconWrapper = external_styled_components_default.a.span.withConfig({
  displayName: "TextStyles__StyledSearchIconWrapper",
  componentId: "sc-148yeee-6"
})(["color:", ";position:absolute;z-index:1;[data-size='small'] > &{right:6px;top:6px;}[data-size='medium'] > &{", " top:", ";&[disabled]{color:", ";}}[data-size='large'] > &{", ";top:11px;}"], Object(themes_["variable"])('Text', 'searchIconWrapperColor'), function (props) {
  var position = Object(themes_["variable"])('Text', 'searchIconPosition')(props);
  return TextStyles_addPadding(Object(themes_["variable"])('Text', 'searchIconPosition'), position, Object(themes_["variable"])('Text', 'searchIconWrapperRight'));
}, Object(themes_["variable"])('Text', 'searchIconWrapperTop'), Object(themes_["variable"])('Text', 'disabledSearchIconColor'), TextStyles_addPadding('right', 'right', '11px'));
var StyledClear = external_styled_components_default.a.span.withConfig({
  displayName: "TextStyles__StyledClear",
  componentId: "sc-148yeee-7"
})(["", ";position:absolute;", ";top:", ";font-size:0.83333em;color:", ";cursor:pointer;z-index:1;[data-size='small'] > &{padding:7px;}[data-size='medium'] > &{padding:", ";}[data-size='large'] > &{padding:11px;}"], Object(themes_["mixin"])('reset')('inline'), TextStyles_addPadding('right', 'right', Object(themes_["variable"])('Text', 'clearIconRight')), Object(themes_["variable"])('Text', 'clearIconTop'), Object(themes_["variable"])('Text', 'clearColor'), Object(themes_["variable"])('Text', 'clearIconPadding'));
var StyledPlaceholder = external_styled_components_default.a.span.withConfig({
  displayName: "TextStyles__StyledPlaceholder",
  componentId: "sc-148yeee-8"
})(["color:", ";position:absolute;max-width:100%;font-size:inherit;line-height:inherit;z-index:1;[data-size='small'] > &{top:5px;", ";}[data-size='medium'] > &{top:7px;", ";}[data-size='large'] > &{top:10px;", ";}"], Object(themes_["variable"])('Text', 'placeholderColor'), TextStyles_addPadding('left', 'left', '7px'), function (props) {
  return props.renderSearchIcon ? TextStyles_addPadding('left', 'left', Object(themes_["variable"])('Text', 'placeholderWithSearchLeft')) : TextStyles_addPadding('left', 'left', Object(themes_["variable"])('Text', 'placeholderMediumSize'));
}, TextStyles_addPadding('left', 'left', '12px'));

// CONCATENATED MODULE: ./src/Text/Text.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













/** Note, Text places role and aria props onto the input. All other props are placed on the wrapper.
 */

var Text_Text =
/*#__PURE__*/
function (_Component) {
  _inherits(Text, _Component);

  _createClass(Text, null, [{
    key: "validateRows",
    value: function validateRows(_ref) {
      var rowsMin = _ref.rowsMin,
          rowsMax = _ref.rowsMax;

      if (false) {}
    }
  }]);

  function Text(props) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResize", function () {
      _this.syncHeightWithShadow();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputMount", function (el) {
      _this.input = el;

      _this.props.inputRef(el);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (e) {
      var value = e.target.value;
      var name = _this.props.name;

      if (!_this.isControlled()) {
        _this.setState({
          value: value
        });
      }

      _this.props.onChange(e, {
        value: value,
        name: name
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputKeyDown", function (e) {
      _this.props.onKeyDown(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputSelect", function (e) {
      _this.props.onSelect(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputFocus", function (e) {
      _this.setState({
        hasFocus: true
      });

      _this.props.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputBlur", function (e) {
      _this.setState({
        hasFocus: false
      });

      _this.props.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClear", function (e) {
      // Only respond to left mouse button.
      if (e.button === 0) {
        e.preventDefault();
        var value = '';
        var name = _this.props.name;

        if (!_this.isControlled()) {
          _this.setState({
            value: value
          });
        }

        _this.props.onChange(e, {
          value: value,
          name: name
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePlaceholderMouseDown", function () {
      _this.focus();
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');
    _this.syncHeightWithShadow = syncHeightWithShadow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      hasFocus: false,
      value: props.defaultValue || ''
    };

    if (false) {}

    Text.validateRows(props);
    _this.handleResize = Object(external_lodash_["throttle"])(_this.handleResize, 100);
    return _this;
  }

  _createClass(Text, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Object(external_lodash_["defer"])(this.syncHeightWithShadow); // wait for styles to load
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.multiline) {
        this.syncHeightWithShadow();
      }

      if (false) {}

      if (false) {}

      Text.validateRows(this.props);
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
    /**
     * Place focus on the input.
     */

  }, {
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "select",
    value: function select() {
      this.input.select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          appearance = _this$props.appearance,
          append = _this$props.append,
          autoComplete = _this$props.autoComplete,
          autoFocus = _this$props.autoFocus,
          canClear = _this$props.canClear,
          children = _this$props.children,
          className = _this$props.className,
          classNamePrivate = _this$props.classNamePrivate,
          disabled = _this$props.disabled,
          describedBy = _this$props.describedBy,
          elementRef = _this$props.elementRef,
          error = _this$props.error,
          inputClassName = _this$props.inputClassName,
          inputId = _this$props.inputId,
          inputStyle = _this$props.inputStyle,
          labelledBy = _this$props.labelledBy,
          multiline = _this$props.multiline,
          name = _this$props.name,
          placeholder = _this$props.placeholder,
          prepend = _this$props.prepend,
          size = _this$props.size,
          tabIndex = _this$props.tabIndex,
          theme = _this$props.theme,
          type = _this$props.type,
          useSyntheticPlaceholder = _this$props.useSyntheticPlaceholder,
          value = _this$props.value,
          otherProps = _objectWithoutProperties(_this$props, ["appearance", "append", "autoComplete", "autoFocus", "canClear", "children", "className", "classNamePrivate", "disabled", "describedBy", "elementRef", "error", "inputClassName", "inputId", "inputStyle", "labelledBy", "multiline", "name", "placeholder", "prepend", "size", "tabIndex", "theme", "type", "useSyntheticPlaceholder", "value"]);

      var ariaProps = _objectSpread({}, Object(external_lodash_["pickBy"])(otherProps, function (val, key) {
        return key === 'role' || key.indexOf('aria-') === 0;
      }), {
        'aria-describedby': describedBy,
        'aria-labelledby': labelledBy,
        'aria-invalid': error || null,
        'aria-multiline': multiline
      });

      var boxProps = Object(external_lodash_["omit"])(otherProps, ['className', 'inputRef', 'onChange', 'onKeyDown', 'onSelect', 'onFocus', 'onBlur', 'rowsMax', 'rowsMin'].concat(_toConsumableArray(Object(external_lodash_["keys"])(ariaProps))));
      var displayValue = this.isControlled() ? value : this.state.value;
      var StyledInputTag = multiline ? StyledInputTextarea : StyledInputInput;
      var StyledInputTagSearch = multiline ? StyledInputSearchTextarea : StyledInputSearchInput;
      var StyledInput = appearance === 'search' ? StyledInputTagSearch : StyledInputTag;
      var StyledInputDisabled = multiline ? StyledInputDisabledTextarea : StyledInputDisabledInput;
      var canClearOrSearch = !disabled && (canClear || appearance === 'search'); // These props are used by both the input and its shadow.

      var displayProps = {
        className: Object(style_["toClassName"])(className, inputClassName),
        'data-append': append || null,
        'data-can-clear': canClearOrSearch || null,
        'data-error': error || null,
        'data-prepend': prepend || null,
        value: displayValue
      };

      var inputProps = _objectSpread({}, displayProps, ariaProps, {
        'data-test': 'textbox',
        autoComplete: autoComplete ? 'on' : 'off',
        autoFocus: autoFocus,
        id: inputId,
        placeholder: placeholder && !useSyntheticPlaceholder ? placeholder : null,
        name: name,
        onChange: this.handleInputChange,
        onKeyDown: this.handleInputKeyDown,
        onSelect: this.handleInputSelect,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur
      }, Object(themes_["ref"])(this.handleInputMount), {
        role: 'textbox',
        style: _objectSpread({
          height: this.state.height
        }, Object(external_lodash_["omit"])(inputStyle, ['paddingLeft', 'paddingRight'])),
        customStyle: inputStyle,
        tabIndex: tabIndex,
        type: multiline ? null : type
      });

      var haveSyntheticPlaceholder = useSyntheticPlaceholder && placeholder && !displayValue;
      var searchIconPosition = Object(themes_["variable"])('Text', 'searchIconPosition')({
        theme: theme
      });
      var renderSearchIcon = appearance === 'search' && (!displayValue && searchIconPosition !== 'left' || searchIconPosition === 'left');
      return external_react_default.a.createElement(StyledBox, _extends({
        className: Object(style_["toClassName"])(className, classNamePrivate),
        "data-size": size,
        "data-test": "text",
        "data-test-value": displayValue,
        elementRef: elementRef
      }, boxProps), disabled ? external_react_default.a.createElement(StyledInputDisabled, _extends({
        className: Object(style_["toClassName"])(className, classNamePrivate),
        customStyle: inputStyle,
        "data-multiline": multiline || null,
        "data-test": "disabled-textbox",
        renderSearchIcon: renderSearchIcon,
        disabled: true,
        readOnly: true,
        style: multiline ? {
          height: this.state.height
        } : undefined,
        type: multiline ? null : type,
        value: displayValue
      }, Object(themes_["ref"])(multiline ? function (el) {
        return _this2.shadow = el;
      } : undefined), ariaProps)) : external_react_default.a.createElement(StyledInput, inputProps), !disabled && multiline && external_react_default.a.createElement(StyledInput, _extends({}, displayProps, {
        "aria-hidden": "true",
        onChange: external_lodash_["noop"],
        style: {
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          left: -10000,
          top: -10000
        },
        tabIndex: -1,
        customStyle: inputStyle
      }, Object(themes_["ref"])(function (el) {
        return _this2.shadow = el;
      }))), !disabled && multiline && external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: "window",
        onResize: this.handleResize
      }), haveSyntheticPlaceholder && external_react_default.a.createElement(ScreenReaderContent_default.a, null, placeholder), haveSyntheticPlaceholder && external_react_default.a.createElement(StyledPlaceholder, {
        "data-role": "placeholder",
        onMouseDown: this.handlePlaceholderMouseDown,
        "aria-hidden": true,
        renderSearchIcon: renderSearchIcon,
        customStyle: inputStyle
      }, placeholder), canClearOrSearch && !!displayValue && (this.state.hasFocus || appearance === 'search') && external_react_default.a.createElement(StyledClear, {
        "data-test": "clear",
        onMouseDown: this.handleClear,
        tabIndex: -1,
        customStyle: inputStyle
      }, external_react_default.a.createElement(Clear_default.a, {
        inline: false,
        size: 1
      })), appearance === 'search' && renderSearchIcon && external_react_default.a.createElement(StyledSearchIconWrapper, {
        disabled: disabled,
        customStyle: inputStyle
      }, external_react_default.a.createElement(Search_default.a, {
        inline: false,
        size: "16px"
      })), children);
    }
  }]);

  return Text;
}(external_react_["Component"]);

_defineProperty(Text_Text, "propTypes", {
  /** Setting the appearance to search will create a rounded input. */
  appearance: external_prop_types_default.a.oneOf(['default', 'search']),

  /** Append removes rounded borders and border from the right side. */
  append: external_prop_types_default.a.bool,

  /** Enable or disable the browsers autoComplete functionality. */
  autoComplete: external_prop_types_default.a.bool,

  /** Specify that the input / textarea should request focus when mounted. */
  autoFocus: external_prop_types_default.a.bool,

  /** Include an "X" button to clear the value.
   * If the `appearance` prop is set to `search` this prop is ignored. */
  canClear: external_prop_types_default.a.bool,

  /** @private */
  children: external_prop_types_default.a.node,

  /** @private */
  className: external_prop_types_default.a.string,

  /** @private. */
  classNamePrivate: external_prop_types_default.a.string,

  /**
   * Set this property instead of value to make value uncontrolled. */
  defaultValue: external_prop_types_default.a.string,

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

  /** When false, display as inline-block with the default width. */
  inline: external_prop_types_default.a.bool,

  /** @private. */
  inputClassName: external_prop_types_default.a.string,

  /**
   * An id for the input, which may be necessary for accessibility, such as for aria
   * attributes.
   */
  inputId: external_prop_types_default.a.string,

  /**
   * Invoked with the input DOM element when the component mounts and null when it unmounts.
   */
  inputRef: external_prop_types_default.a.func,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /** When true, allows multiline input and ignores the 'type' property. */
  multiline: external_prop_types_default.a.bool,

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

  /** A callback for when the text selection or cursor position changes. */
  onSelect: external_prop_types_default.a.func,

  /** The gray text shown when the input is empty. */
  placeholder: external_prop_types_default.a.string,

  /** Prepend removes rounded borders from the left side. */
  prepend: external_prop_types_default.a.bool,

  /** Maximum number of rows to display when multiLine option is set to true. */
  rowsMax: external_prop_types_default.a.number,

  /** Minimum number of rows to display when multiLine option is set to true. */
  rowsMin: external_prop_types_default.a.number,

  /** The overall size of the input. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),
  tabIndex: external_prop_types_default.a.number,

  /** @private */
  theme: external_prop_types_default.a.object,
  type: external_prop_types_default.a.oneOf(['text', 'password']),

  /** Some browsers remove placeholder text on focus. The synthetic placeholder never does. */
  useSyntheticPlaceholder: external_prop_types_default.a.bool,

  /**
   * The contents of the input. Setting this value makes the property controlled. A callback
   * is required. */
  value: external_prop_types_default.a.string,

  /** @private A style object for the inner input element. */
  inputStyle: external_prop_types_default.a.object
});

_defineProperty(Text_Text, "defaultProps", {
  appearance: 'default',
  append: false,
  autoComplete: true,
  autoFocus: false,
  canClear: false,
  disabled: false,
  error: false,
  inline: false,
  inputRef: function inputRef() {},
  inputStyle: {},
  multiline: false,
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onSelect: function onSelect() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  placeholder: '',
  prepend: false,
  rowsMax: 8,
  rowsMin: 2,
  size: 'medium',
  tabIndex: 0,
  type: 'text',
  theme: null,
  useSyntheticPlaceholder: false
});

_defineProperty(Text_Text, "componentType", 'Text');

var textwithTheme = Object(external_styled_components_["withTheme"])(Text_Text);
textwithTheme.propTypes = Text_Text.propTypes;
textwithTheme.defaultProps = Text_Text.defaultProps;
/* harmony default export */ var src_Text_Text = (textwithTheme);
// CONCATENATED MODULE: ./src/Text/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Text_Text; });


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/style");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 81:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Clear");

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Search");

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

module.exports = require("lodash/startCase");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });