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
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("tinycolor2");

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-icons/Check"
var Check_ = __webpack_require__(44);
var Check_default = /*#__PURE__*/__webpack_require__.n(Check_);

// EXTERNAL MODULE: external "@splunk/react-ui/AnimationToggle"
var AnimationToggle_ = __webpack_require__(34);
var AnimationToggle_default = /*#__PURE__*/__webpack_require__.n(AnimationToggle_);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "tinycolor2"
var external_tinycolor2_ = __webpack_require__(12);
var external_tinycolor2_default = /*#__PURE__*/__webpack_require__.n(external_tinycolor2_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Switch/SwitchStyles.js





var diameter = '18px';
var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "SwitchStyles__StyledBox",
  componentId: "tie4e6-0"
})(["", ";position:relative;padding:calc((", " - ", ") / 2) 0;flex-shrink:0;&[data-size='small']{font-size:", ";padding:calc((", " - ", ") / 2) 0;}&[data-error]{color:", ";}&[data-disabled]{color:", ";}"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('inputHeight'), diameter, Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('inputHeightSmall'), diameter, Object(themes_["variable"])('Switch', 'wrapperErrorColor'), Object(themes_["variable"])('textDisabledColor'));

var SwitchStyles_switchBase = function switchBase(name) {
  return Object(external_styled_components_["css"])(["", ";position:relative;width:", ";height:", ";border:", ";border-color:", ";color:", ";flex:0 0 auto;top:", ";&:focus{box-shadow:", ";}&[data-selected='true']:not([disabled]),&[data-selected='some']:not([disabled]){border-color:", ";background-color:", ";}[data-error] > &{border-color:", ";color:", ";&[data-selected='true']:not([disabled]){border-color:", ";}}&[disabled]{border-color:", ";color:", ";cursor:not-allowed;background-color:'#23242b';}"], Object(themes_["mixin"])('reset')('inline-block'), diameter, diameter, Object(themes_["variable"])('border'), Object(themes_["variable"])('Switch', name, 'borderColor'), Object(themes_["variable"])('Switch', name, 'color'), Object(themes_["variable"])('Switch', name, 'top'), Object(themes_["variable"])('Switch', name, 'focusShadow'), Object(themes_["variable"])('Switch', name, 'selectedBorderColor'), Object(themes_["variable"])('Switch', name, 'selectedBackgroundColor'), Object(themes_["variable"])('Switch', name, 'errorBorderColor'), Object(themes_["variable"])('Switch', name, 'errorColor'), Object(themes_["variable"])('Switch', name, 'selectedErrorBorderColor'), Object(themes_["variable"])('Switch', name, 'disabledBorderColor'), Object(themes_["variable"])('Switch', name, 'disabledColor'));
};

var radioBase = Object(external_styled_components_["css"])(["margin:", ";&:not([disabled]),&{border-radius:50%;}&[data-selected='true']::after{display:block;content:'';position:absolute;left:4px;top:4px;width:calc(", " - 10px);height:calc(", " - 10px);border-radius:50%;background-color:currentColor;}"], Object(themes_["variable"])('Switch', 'Radio', 'margin'), diameter, diameter);
var radioBackground = Object(external_styled_components_["css"])(["&:not([disabled]):hover,&:not([disabled]):focus{::before{display:block;content:'';width:30px;height:30px;background:rgba(255,255,255,0.15);border-radius:50%;position:absolute;top:-7px;left:-7px;}}"]);
var StyledRadioClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "SwitchStyles__StyledRadioClickable",
  componentId: "tie4e6-1"
})(["", ";", ";", ""], SwitchStyles_switchBase('Radio'), radioBase, function (props) {
  return Object(themes_["variable"])('Switch', 'Radio', 'hasBackground')(props) && radioBackground;
});
var StyledRadioSpan = StyledRadioClickable.withComponent('span');
var checkboxBackground = Object(external_styled_components_["css"])(["&:not([disabled]):hover,&:not([disabled]):focus{::before{display:block;content:'';width:30px;height:30px;background:rgba(255,255,255,0.15);border-radius:4px;position:absolute;top:-7px;left:-7px;}}"]);
var checkboxBase = Object(external_styled_components_["css"])(["padding:2px;line-height:", ";margin-bottom:0;font-size:10px;text-align:center;vertical-align:middle;border-radius:2px;cursor:pointer;"], diameter);
var StyledCheckboxClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "SwitchStyles__StyledCheckboxClickable",
  componentId: "tie4e6-2"
})(["", ";", ";", ""], SwitchStyles_switchBase('Checkbox'), checkboxBase, function (props) {
  return Object(themes_["variable"])('Switch', 'Checkbox', 'hasBackground')(props) && checkboxBackground;
});
var StyledCheckboxSpan = StyledCheckboxClickable.withComponent('span');
var StyledSome = external_styled_components_default.a.div.withConfig({
  displayName: "SwitchStyles__StyledSome",
  componentId: "tie4e6-3"
})(["display:block;margin:2px;height:calc(", " - 10px);width:calc(", " - 10px);background:currentColor;border-radius:1px;"], diameter, diameter);
var StyledIndicator = external_styled_components_default.a.div.withConfig({
  displayName: "SwitchStyles__StyledIndicator",
  componentId: "tie4e6-4"
})(["background-color:", ";border-color:", ";box-sizing:border-box;border-radius:50%;height:", ";height:", ";width:", ";width:", ";margin:", ";position:absolute;left:-1px;top:-1px;transition:left ", ";[data-selected='true'] &{left:calc(100% - ", " + 1px);}"], Object(themes_["variable"])('Switch', 'Toggle', 'indicatorBackgroundColor'), Object(themes_["variable"])('Switch', 'Toggle', 'indicatorBorderColor'), diameter, Object(themes_["variable"])('Switch', 'Toggle', 'indicatorSize'), diameter, Object(themes_["variable"])('Switch', 'Toggle', 'indicatorSize'), Object(themes_["variable"])('Switch', 'Toggle', 'indicatorMargin'), function (props) {
  return props.delay;
}, diameter);
var StyledToggleOutline = external_styled_components_default.a.div.withConfig({
  displayName: "SwitchStyles__StyledToggleOutline",
  componentId: "tie4e6-5"
})(["position:absolute;border:1px solid transparent;transition:border-color ", ";border-radius:calc(", " * 0.5);border-radius:", ";top:-1px;right:-1px;bottom:-1px;left:-1px;z-index:1;margin:", ";"], function (props) {
  return props.delay;
}, diameter, Object(themes_["variable"])('Switch', 'Toggle', 'outlineBorderRadius'), Object(themes_["variable"])('Switch', 'Toggle', 'outlineMargin'));
var toggleShadow = Object(themes_["variable"])('Switch', 'Toggle', 'shadow');
var StyledToggleClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "SwitchStyles__StyledToggleClickable",
  componentId: "tie4e6-6"
})(["position:relative;width:calc(", " * 2);width:", ";height:", ";background-color:", ";border-radius:calc(", " * 0.5);transition:background-color ", ";flex:0 0 auto;top:", ";&:not([disabled]){border:", ";border-color:", ";box-shadow:", ";", "{background-color:", ";box-shadow:", ";border-width:1px;border-style:", ";border-radius:50%;}&:hover ", "{background-color:", ";}&:hover ", "{background-color:", ";&:focus ", "{background:", ";}}&:focus ", "{background:", ";}}&[disabled]{border:1px solid ", ";box-shadow:inset 0 2px 0 rgba(0,0,0,0.06);background-color:", ";", "{background-color:", ";border-color:", ";border-width:1px;border-style:solid;}}&[data-selected='true']{background-color:", ";border-color:", ";box-shadow:", ";&[disabled]{background-color:", ";border-color:transparent;", "{background-color:", ";}}}[data-error] > &:not([disabled]){background-color:", ";}[data-error] > &:not([disabled]) > ", "{border-color:", ";}&:focus:not([disabled]){outline:0;box-shadow:", ";> ", "{border-color:", ";border-color:", ";}}"], diameter, Object(themes_["variable"])('Switch', 'Toggle', 'width'), diameter, Object(themes_["variable"])('Switch', 'Toggle', 'backgroundColor'), diameter, function (props) {
  return props.delay;
}, Object(themes_["variable"])('Switch', 'Toggle', 'top'), Object(themes_["variable"])('border'), Object(themes_["variable"])('Switch', 'Toggle', 'borderColor'), toggleShadow,
/* sc-sel */
StyledIndicator, Object(themes_["variable"])('Switch', 'Toggle', 'indicatorBackgroundColor'), Object(themes_["variable"])('Switch', 'Toggle', 'toggleIndicatorShadowOff'), Object(themes_["variable"])('Switch', 'Toggle', 'toggleIndicatorBorderStyle'),
/* sc-sel */
StyledIndicator, Object(themes_["variable"])('Switch', 'Toggle', 'indicatorHoverBackgroundColor'),
/* sc-sel */
StyledToggleOutline, Object(themes_["variable"])('Switch', 'Toggle', 'outlineHoverBackgroundColor'),
/* sc-sel */
StyledToggleOutline, Object(themes_["variable"])('Switch', 'Toggle', 'outlineHoverBackgroundColor'),
/* sc-sel */
StyledToggleOutline, Object(themes_["variable"])('Switch', 'Toggle', 'outlineHoverBackgroundColor'), Object(themes_["variable"])('Switch', 'Toggle', 'disabledBorderColor'), Object(themes_["variable"])('Switch', 'Toggle', 'disabledBackgroundColor'),
/* sc-sel */
StyledIndicator, Object(themes_["variable"])('Switch', 'Toggle', 'disabledIndBackgroundColor'), Object(themes_["variable"])('Switch', 'Toggle', 'disabledIndBorderColor'), Object(themes_["variable"])('Switch', 'Toggle', 'selectedBackgroundColor'), Object(themes_["variable"])('Switch', 'Toggle', 'selectedBorderColor'), Object(themes_["variable"])('Switch', 'Toggle', 'toggleIndicatorShadowOn'), Object(themes_["variable"])('Switch', 'Toggle', 'selectedDisabledBackgroundColor'),
/* sc-sel */
StyledIndicator, Object(themes_["variable"])('Switch', 'Toggle', 'selectedDisabledIndBackgroundColor'), Object(themes_["variable"])('Switch', 'Toggle', 'errorToggleBackgroundColor'),
/* sc-sel */
StyledToggleOutline, Object(themes_["variable"])('Switch', 'Toggle', 'errorToggleOutlineBorderColor'), Object(themes_["variable"])('Switch', 'Toggle', 'toggleFocusShadow'),
/* sc-sel */
StyledToggleOutline, function (props) {
  return external_tinycolor2_default()(Object(themes_["variable"])('focusColor')(props)).setAlpha(0.8).toRgbString();
}, Object(themes_["variable"])('Switch', 'Toggle', 'toggleFocusBorderColor'));
var StyledToggleSpan = StyledToggleClickable.withComponent('span');
var StyledLabel = external_styled_components_default.a.label.withConfig({
  displayName: "SwitchStyles__StyledLabel",
  componentId: "tie4e6-7"
})(["", ";flex:1 1 auto;padding-left:", ";color:inherit;line-height:", ";&:not([data-disabled='true']){cursor:pointer;}&[data-size='small']{font-size:", ";padding-top:1px;}"], Object(themes_["mixin"])('reset')('inline-block'), Object(themes_["variable"])('Switch', 'labelPaddingLeft'), Object(themes_["variable"])('Switch', 'labelLineHeight'), Object(themes_["variable"])('fontSizeSmall'));

// CONCATENATED MODULE: ./src/Switch/Switch.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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











var StyledClickables = {
  radio: StyledRadioClickable,
  checkbox: StyledCheckboxClickable,
  toggle: StyledToggleClickable
};
var StyledSpans = {
  radio: StyledRadioSpan,
  checkbox: StyledCheckboxSpan,
  toggle: StyledToggleSpan
};
/**
 * `Switch` is a basic form control with an on/off state. For a group of radio switches,
 * the `RadioList` component would typically be used instead of `Switch`.
 */

var Switch_Switch =
/*#__PURE__*/
function (_Component) {
  _inherits(Switch, _Component);

  _createClass(Switch, null, [{
    key: "validateProps",
    value: function validateProps(_ref) {
      var selected = _ref.selected,
          appearance = _ref.appearance;

      if (false) {}
    }
  }]);

  function Switch(props) {
    var _this;

    _classCallCheck(this, Switch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Switch).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidUpdate", Switch.validateProps);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleContainerClick", function (e) {
      var _this$props = _this.props,
          value = _this$props.value,
          selected = _this$props.selected;

      _this.props.onClick(e, {
        value: value,
        selected: selected
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyPress", function (e) {
      if (Object(keyboard_["keycode"])(e) === 'space') {
        e.preventDefault();

        _this.handleContainerClick(e);
      }
    });

    _this.labelId = Object(id_["createDOMID"])('label');
    _this.clickableId = Object(id_["createDOMID"])('clickable');
    Switch.validateProps(props);
    return _this;
  }

  _createClass(Switch, [{
    key: "focus",

    /**
     * Place focus on the toggle.
     */
    value: function focus() {
      this.toggle.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          appearance = _this$props2.appearance,
          children = _this$props2.children,
          disabled = _this$props2.disabled,
          error = _this$props2.error,
          id = _this$props2.id,
          inline = _this$props2.inline,
          interactive = _this$props2.interactive,
          labelledBy = _this$props2.labelledBy,
          onClick = _this$props2.onClick,
          selected = _this$props2.selected,
          selectedLabel = _this$props2.selectedLabel,
          size = _this$props2.size,
          someSelectedLabel = _this$props2.someSelectedLabel,
          unselectedLabel = _this$props2.unselectedLabel,
          value = _this$props2.value,
          otherProps = _objectWithoutProperties(_this$props2, ["appearance", "children", "disabled", "error", "id", "inline", "interactive", "labelledBy", "onClick", "selected", "selectedLabel", "size", "someSelectedLabel", "unselectedLabel", "value"]);

      var labelId = labelledBy; // consumer defined external label

      var clickableId = id; // consumer defined id
      // if has internal label defined with children....

      if (children) {
        labelId = this.labelId.labelId;
        // must use generated labelId
        clickableId = id || this.clickableId; // must have an id
      }

      var ariaChecked = selected === 'some' ? 'mixed' : selected;

      var switchProps = _objectSpread({
        disabled: disabled,
        'aria-labelledby': interactive ? labelId : undefined,
        'aria-checked': interactive ? ariaChecked : null,
        'aria-invalid': error ? true : undefined,
        id: clickableId
      }, Object(themes_["ref"])(function (c) {
        return _this2.toggle = c;
      }), {
        title: selected ? selectedLabel : unselectedLabel,
        onClick: disabled || !interactive ? null : this.handleContainerClick,
        'data-test': 'button',
        'data-selected': selected
      });

      var StyledSwitchComponent = interactive ? StyledClickables[appearance] : StyledSpans[appearance];
      var stateLabels = {
        true: selectedLabel,
        false: unselectedLabel,
        some: someSelectedLabel
      };

      var renderToggle = function renderToggle(delay) {
        return function () {
          return external_react_default.a.createElement(StyledSwitchComponent, _extends({
            role: interactive ? 'switch' : undefined
          }, switchProps, {
            delay: delay
          }), external_react_default.a.createElement(StyledIndicator, {
            delay: delay
          }), external_react_default.a.createElement(StyledToggleOutline, {
            delay: delay
          }));
        };
      };

      return external_react_default.a.createElement(StyledBox, _extends({
        flex: true,
        inline: inline,
        "data-size": size,
        "data-test": "switch",
        "data-test-selected": selected,
        "data-test-value": value,
        "data-test-error": error ? true : undefined,
        "data-error": error ? true : undefined,
        "data-disabled": disabled ? true : undefined
      }, otherProps), appearance === 'toggle' && external_react_default.a.createElement(AnimationToggle_default.a, {
        on: renderToggle('200ms'),
        off: renderToggle()
      }), appearance !== 'toggle' && external_react_default.a.createElement(StyledSwitchComponent, _extends({
        role: interactive ? appearance : undefined,
        status: interactive && error ? 'error' : undefined,
        "data-role": "switch-component" // used in selectable row Table to highlight the switch when hover the table toggle cell

      }, switchProps), selected === true && appearance === 'checkbox' && external_react_default.a.createElement(Check_default.a, {
        inline: false,
        size: "12px"
      }), selected === 'some' && appearance === 'checkbox' && external_react_default.a.createElement(StyledSome, null)), external_react_default.a.createElement(ScreenReaderContent_default.a, null, stateLabels["".concat(selected)]), children && external_react_default.a.createElement(StyledLabel, {
        "data-test": "label",
        id: labelId,
        htmlFor: clickableId,
        "data-size": size,
        "data-disabled": disabled || null
      }, children));
    }
  }]);

  return Switch;
}(external_react_["Component"]);

_defineProperty(Switch_Switch, "propTypes", {
  /**
   * The `radio` appearance is used to create `RadioList` and is not intended for use in an
   * individual switch.
   */
  appearance: external_prop_types_default.a.oneOf(['radio', 'checkbox', 'toggle']),

  /** @private. */
  children: external_prop_types_default.a.node,
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Highlight the field as having an error.
   */
  error: external_prop_types_default.a.bool,

  /**
   * If `Switch` is not provided children as the label, an id can be provided for the control.
   * Set a label's for attribute to this id to link the two elements.
   */
  id: external_prop_types_default.a.string,

  /** Make the control an inline block with variable width. */
  inline: external_prop_types_default.a.bool,

  /**
   * In a couple of cases, the switch is to show state, but is not interactive in itself.
   * The parent takes focus and handles click. Set interactive to false to prevent focus and
   * hover states, and remove accessibility properties.
   * @private */
  interactive: external_prop_types_default.a.bool,

  /**
   * If `Switch` is not provided children as the label, an id can be provided to
   * another element.
   */
  labelledBy: external_prop_types_default.a.string,
  onClick: external_prop_types_default.a.func,

  /**
   * 'some' is only valid when appearance is 'checkbox'. The current value of `selected` is
   * passed to the onClick handler.
   */
  selected: external_prop_types_default.a.oneOf([true, false, 'some']),

  /**
   * The selected label is shown in a tooltip and to Screen Readers.
   */
  selectedLabel: external_prop_types_default.a.string,

  /** The size of the text label. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /**
   * The some selected label is shown in a tooltip and to Screen Readers.
   */
  someSelectedLabel: external_prop_types_default.a.string,

  /**
   * The unselected label is shown in a tooltip and to Screen Readers.
   */
  unselectedLabel: external_prop_types_default.a.string,

  /**
   * The `value` is used as an identifier and is passed to the `onClick` handler. This is
   * useful when managing a group of switches with a single `onClick` handler.
   */
  value: external_prop_types_default.a.any
});

_defineProperty(Switch_Switch, "defaultProps", {
  appearance: 'checkbox',
  disabled: false,
  error: false,
  inline: false,
  interactive: true,
  onClick: function onClick() {},
  selected: false,
  selectedLabel: Object(i18n_["_"])('Selected'),
  someSelectedLabel: Object(i18n_["_"])('Some selected'),
  size: 'medium',
  unselectedLabel: Object(i18n_["_"])('Not selected')
});

/* harmony default export */ var src_Switch_Switch = (Switch_Switch);
// CONCATENATED MODULE: ./src/Switch/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Switch_Switch; });


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/AnimationToggle");

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Check");

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

/***/ })

/******/ });