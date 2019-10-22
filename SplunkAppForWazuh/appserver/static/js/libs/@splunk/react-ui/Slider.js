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
/******/ 	return __webpack_require__(__webpack_require__.s = 123);
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

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("tinycolor2");

/***/ }),

/***/ 123:
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

// EXTERNAL MODULE: external "decimal.js-light"
var external_decimal_js_light_ = __webpack_require__(74);
var external_decimal_js_light_default = /*#__PURE__*/__webpack_require__.n(external_decimal_js_light_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/react-ui/Tooltip"
var Tooltip_ = __webpack_require__(26);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "tinycolor2"
var external_tinycolor2_ = __webpack_require__(12);
var external_tinycolor2_default = /*#__PURE__*/__webpack_require__.n(external_tinycolor2_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/Slider/SliderStyles.js




var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "SliderStyles__StyledBox",
  componentId: "sc-13j9dd5-0"
})(["", ";flex:1 1 auto;&[data-inline]{width:300px;}"], Object(themes_["mixin"])('reset')('block'));
var StyledInput = external_styled_components_default.a.div.withConfig({
  displayName: "SliderStyles__StyledInput",
  componentId: "sc-13j9dd5-1"
})(["flex:1 0 0px;vertical-align:middle;position:relative;cursor:default;height:", ";max-width:100%;"], Object(themes_["variable"])('inputHeight'));
var notchWidth = '1px';
var StyledSliderBar = external_styled_components_default.a.div.withConfig({
  displayName: "SliderStyles__StyledSliderBar",
  componentId: "sc-13j9dd5-2"
})(["position:absolute;top:12px;left:0;height:5px;width:100%;border-radius:2.5px;:not([data-disabled]){", ";}&[data-disabled]{background-color:", ";}"], function (props) {
  return !props.stepMarksWidth ? Object(external_styled_components_["css"])(["background-image:linear-gradient( to right,", ",", " ", "%,", " ", "%,", " );"], Object(themes_["variable"])('Slider', 'sliderBarLeftSideColor'), Object(themes_["variable"])('Slider', 'sliderBarLeftSideColor'), props.position, Object(themes_["variable"])('Slider', 'sliderBarRightSideColor'), props.position, Object(themes_["variable"])('Slider', 'sliderBarRightSideColor')) : Object(external_styled_components_["css"])(["background-image:linear-gradient( to right,", ",", " ", ",transparent ", ",transparent 100% ),repeating-linear-gradient( to right,", ",", " ", ",transparent ", ",transparent ", "% ),linear-gradient( to right,", ",", " ", "%,", " ", "%,", " );"], Object(themes_["variable"])('Slider', 'sliderBarLeftSideColor'), Object(themes_["variable"])('Slider', 'sliderBarLeftSideColor'), notchWidth, notchWidth, Object(themes_["variable"])('Slider', 'sliderBarStepMarksColor'), Object(themes_["variable"])('Slider', 'sliderBarStepMarksColor'), notchWidth, notchWidth, props.stepMarksWidth, Object(themes_["variable"])('Slider', 'sliderBarLeftSideColor'), Object(themes_["variable"])('Slider', 'sliderBarLeftSideColor'), props.position, Object(themes_["variable"])('Slider', 'sliderBarRightSideColor'), props.position, Object(themes_["variable"])('Slider', 'sliderBarRightSideColor'));
}, Object(themes_["variable"])('Slider', 'sliderBarDisabledBackgroundColor'));
var sliderThumbWidth = 18;
var StyledSliderThumb = external_styled_components_default.a.button.withConfig({
  displayName: "SliderStyles__StyledSliderThumb",
  componentId: "sc-13j9dd5-3"
})(["", ";display:block;position:relative;width:", "px;height:18px;border-radius:9px;border-width:0;background-color:", ";:not([data-disabled]){cursor:pointer;}&:focus,&:hover:not([data-disabled]),&:active{border-color:", ";outline:0;box-shadow:", ";z-index:1;}&[data-disabled]{background-color:", ";}"], Object(themes_["mixin"])('reset')('inline'), sliderThumbWidth, Object(themes_["variable"])('Slider', 'sliderThumbBackgroundColor'), function (props) {
  return external_tinycolor2_default()(Object(themes_["variable"])('focusColor')(props)).setAlpha(0.8).toRgbString();
}, Object(themes_["variable"])('focusShadow'), Object(themes_["variable"])('Slider', 'sliderThumbDisabledBackgroundColor'));
var label = Object(external_styled_components_["css"])(["flex:0 0 auto;line-height:", ";&[data-disabled]{color:", ";}"], Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('Slider', 'labelDisabledColor'));
var StyledMinLabelBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "SliderStyles__StyledMinLabelBox",
  componentId: "sc-13j9dd5-4"
})(["", ";margin-right:15px;text-align:right;"], label);
var StyledMaxLabelBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "SliderStyles__StyledMaxLabelBox",
  componentId: "sc-13j9dd5-5"
})(["", ";margin-left:15px;text-align:left;"], label);

// CONCATENATED MODULE: ./src/Slider/Slider.jsx
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











var Slider_Slider =
/*#__PURE__*/
function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Slider)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkPositionBounds", function (pos) {
      if (pos > 100) {
        return 100;
      }

      if (pos < 0) {
        return 0;
      }

      return pos;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "checkValueBounds", function (val) {
      if (val > _this.props.max) {
        return _this.props.max;
      }

      if (val < _this.props.min) {
        return _this.props.min;
      }

      return val;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function () {
      _this.setState({
        isFocused: false,
        showTooltip: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var pos = _this.percentageFromEvent(e);

      var value = _this.roundValueToStep(_this.positionToValue(pos));

      _this.setValue(e, {
        value: value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function () {
      _this.setState({
        isFocused: true,
        showTooltip: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      var step = _this.props.step;

      var val = _this.getValue();

      if (Object(keyboard_["keycode"])(e) === 'right') {
        val = _this.checkValueBounds(val + step);
      } else if (Object(keyboard_["keycode"])(e) === 'left') {
        val = _this.checkValueBounds(val - step);
      } else {
        return;
      }

      val = _this.roundValueToStep(val);

      _this.setValue(e, {
        value: val
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.setState({
        sliderBar: el
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseDown", function (e) {
      e.preventDefault();

      _this.sliderThumb.focus();

      _this.setState({
        selected: true,
        showTooltip: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseEnter", function () {
      _this.setState({
        showTooltip: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseLeave", function () {
      if (!_this.state.selected) {
        _this.setState({
          showTooltip: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseMove", function (e) {
      if (_this.state.selected) {
        var pos = _this.percentageFromEvent(e);

        var value = _this.roundValueToStep(_this.positionToValue(pos));

        _this.setValue(e, {
          value: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseUp", function () {
      _this.setState({
        selected: false,
        showTooltip: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "percentageFromEvent", function (e) {
      var boundingRect = _this.state.sliderBar.getBoundingClientRect();

      var offset = e.clientX - boundingRect.left;
      return _this.checkPositionBounds(offset / boundingRect.width * 100);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "positionToValue", function (pos) {
      var valRange = _this.props.max - _this.props.min;
      return pos / 100 * valRange + _this.props.min;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "roundValueToStep", function (val) {
      var step = _this.props.step;
      return new external_decimal_js_light_default.a(val).div(step).todp(0).mul(step).toNumber();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "valueToPosition", function (val) {
      var valRange = _this.props.max - _this.props.min;
      return (val - _this.props.min) / valRange * 100;
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');
    var defValue = Object(external_lodash_["has"])(props, 'defaultValue') ? props.defaultValue : _this.roundValueToStep((props.max - props.min) / 2);
    _this.state = {
      isFocused: false,
      selected: false,
      showTooltip: false,
      sliderBar: null,
      value: _this.isControlled() ? null : defValue
    };

    if (false) {}

    if (props.min >= props.max && process.env.NODE_ENV !== "production") {
      throw new Error('Error in Slider: max must be greater than min');
    }

    return _this;
  }

  _createClass(Slider, [{
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
    key: "setValue",
    value: function setValue(e, _ref) {
      var value = _ref.value;
      var currentValue = this.getValue();
      var name = this.props.name;

      if (currentValue !== value) {
        this.props.onChange(e, {
          value: value,
          name: name
        });

        if (!this.isControlled()) {
          this.setState({
            value: value
          });
        }
      }
    }
  }, {
    key: "focus",

    /**
     * Place focus on the slider.
     */
    value: function focus() {
      this.sliderThumb.focus();
    }
  }, {
    key: "stepWidthInPercentage",
    value: function stepWidthInPercentage() {
      return this.props.stepMarks === 'focus' && this.state.isFocused || this.props.stepMarks === 'always' ? this.props.step * 100 / (this.props.max - this.props.min) : null;
    }
  }, {
    key: "stepMarksWidth",
    value: function stepMarksWidth() {
      // don't render stepMarks if they are too small i.e. stepWidth is less than SliderThumb devided by 2
      var totalSteps = Math.round((this.props.max - this.props.min) / this.props.step);
      var wholeSlider = this.state.sliderBar.getBoundingClientRect();
      return wholeSlider.width / totalSteps > sliderThumbWidth / 2 ? this.stepWidthInPercentage() : null;
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

      var _this$props = this.props,
          describedBy = _this$props.describedBy,
          displayValue = _this$props.displayValue,
          disabled = _this$props.disabled,
          elementRef = _this$props.elementRef,
          inline = _this$props.inline,
          labelledBy = _this$props.labelledBy,
          min = _this$props.min,
          minLabel = _this$props.minLabel,
          max = _this$props.max,
          maxLabel = _this$props.maxLabel,
          stepMarks = _this$props.stepMarks;
      var _this$state = this.state,
          selected = _this$state.selected,
          sliderBar = _this$state.sliderBar;
      var currentValue = this.getValue();
      var position = this.valueToPosition(currentValue);
      var boxProps = Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Slider.propTypes));
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return external_react_default.a.createElement(StyledBox, _extends({
        "data-test": "slider",
        "data-test-value": currentValue,
        elementRef: elementRef,
        flex: true,
        inline: inline
      }, boxProps), selected && external_react_default.a.createElement(external_react_event_listener_default.a, {
        onMouseUp: this.handleMouseUp,
        onMouseMove: this.handleMouseMove,
        onResize: this.handleResize,
        target: "window"
      }), minLabel !== null && external_react_default.a.createElement(StyledMinLabelBox, {
        "data-test": "min-label",
        "data-disabled": disabled ? true : undefined
      }, minLabel || min), external_react_default.a.createElement(StyledInput, {
        onClick: disabled ? undefined : this.handleClick
      }, external_react_default.a.createElement(StyledSliderBar, _extends({
        position: position,
        "data-test": "bar",
        "data-disabled": disabled ? true : undefined
      }, Object(themes_["ref"])(this.handleMount), {
        stepMarksWidth: stepMarks !== 'never' && sliderBar ? this.stepMarksWidth() : undefined
      })), external_react_default.a.createElement(Tooltip_default.a, {
        content: displayValue || currentValue,
        inline: false,
        open: this.state.showTooltip,
        style: {
          left: "".concat(position, "%"),
          position: 'absolute',
          top: 6,
          marginLeft: -8
        }
      }, external_react_default.a.createElement(StyledSliderThumb, _extends({
        "aria-describedby": describedBy,
        "aria-labelledby": labelledBy,
        "aria-valuemax": max,
        "aria-valuemin": min,
        "aria-valuenow": currentValue,
        "data-test": "handle",
        onBlur: this.handleBlur,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onKeyDown: disabled ? undefined : this.handleKeyDown,
        onMouseDown: disabled ? undefined : this.handleMouseDown,
        onFocus: this.handleFocus
      }, Object(themes_["ref"])(function (el) {
        return _this2.sliderThumb = el;
      }), {
        role: "slider",
        "data-disabled": disabled ? true : undefined
      })))), maxLabel !== null && external_react_default.a.createElement(StyledMaxLabelBox, {
        "data-test": "max-label",
        "data-disabled": disabled ? true : undefined
      }, maxLabel || max));
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return Slider;
}(external_react_["Component"]);

_defineProperty(Slider_Slider, "propTypes", {
  /** Set this property instead of value to make value uncontrolled. */
  defaultValue: external_prop_types_default.a.number,

  /**
   * The id of the description. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's help component.
   */
  describedBy: external_prop_types_default.a.string,

  /** Whether or not the slider can be moved. */
  disabled: external_prop_types_default.a.bool,

  /** The label shown in the tooltip. Defaults to the value. */
  displayValue: external_prop_types_default.a.string,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** When false, display as inline-block with the default width. */
  inline: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /** The minimum value of the Slider input. */
  min: external_prop_types_default.a.number,

  /**
   * The label shown to the left of the slider. Defaults to the min value.
   * Set to null to remove.
   */
  minLabel: external_prop_types_default.a.node,

  /** The maximum value of the Slider input. */
  max: external_prop_types_default.a.number,

  /**
   * The label shown to the left of the slider. Defaults to the max value.
   * Set to null to remove.
   */
  maxLabel: external_prop_types_default.a.node,

  /**
   * The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback.
   */
  name: external_prop_types_default.a.string,

  /** Return event and data object with slider value. */
  onChange: external_prop_types_default.a.func,

  /** The step value of the Slider input. */
  step: external_prop_types_default.a.number,

  /** Whether or not the step marks should be shown. Defaults to show on focus. */
  stepMarks: external_prop_types_default.a.oneOf(['focus', 'always', 'never']),

  /**
   * The value of the slider.
   * Setting this value makes the property controlled. A callback is required.
   */
  value: external_prop_types_default.a.number
});

_defineProperty(Slider_Slider, "defaultProps", {
  disabled: false,
  inline: false,
  min: 1,
  max: 5,
  onChange: function onChange() {},
  step: 1,
  stepMarks: 'focus'
});

/* harmony default export */ var src_Slider_Slider = (Slider_Slider);
// CONCATENATED MODULE: ./src/Slider/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Slider_Slider; });


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Tooltip");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

module.exports = require("decimal.js-light");

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