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
/******/ 	return __webpack_require__(__webpack_require__.s = 102);
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

/***/ 102:
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

// EXTERNAL MODULE: external "@splunk/react-ui/Switch"
var Switch_ = __webpack_require__(33);
var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/RadioList/OptionStyles.js



var StyledSwitch = external_styled_components_default()(Switch_default.a).withConfig({
  displayName: "OptionStyles__StyledSwitch",
  componentId: "y7kg4r-0"
})(["flex-shrink:1;margin-right:calc(", " * 2);"], Object(themes_["variable"])('spacing'));

// CONCATENATED MODULE: ./src/RadioList/Option.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var propTypes = {
  /** @private. This will be be passed to the Switch component untouched. */
  children: external_prop_types_default.a.node,

  /**
   * The selectable value. If this matches the ControlRadioList value, the item is selceted.
   */
  value: external_prop_types_default.a.any.isRequired
};

function Option(props) {
  var children = props.children,
      otherProps = _objectWithoutProperties(props, ["children"]);

  return external_react_default.a.createElement(StyledSwitch, _extends({
    "data-test": "option",
    appearance: "radio"
  }, otherProps), children);
}

Option.propTypes = propTypes;
/* harmony default export */ var RadioList_Option = (Option);
// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/RadioList/RadioListStyles.js


var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "RadioListStyles__StyledBox",
  componentId: "sc-1walsgb-0"
})(["align-items:flex-start;flex-direction:", ";flex-wrap:wrap;"], function (props) {
  return props.appearance === 'horizontal' ? 'row' : 'column';
});

// CONCATENATED MODULE: ./src/RadioList/RadioList.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function RadioList_extends() { RadioList_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return RadioList_extends.apply(this, arguments); }

function RadioList_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = RadioList_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function RadioList_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var RadioList_RadioList =
/*#__PURE__*/
function (_Component) {
  _inherits(RadioList, _Component);

  function RadioList(props) {
    var _this;

    _classCallCheck(this, RadioList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RadioList).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e, data) {
      var name = _this.props.name;

      if (!_this.isControlled()) {
        _this.setState({
          value: data.value
        });
      }

      _this.props.onChange(e, _objectSpread({}, data, {
        name: name
      }));
    });

    _this.controlledExternally = Object(external_lodash_["has"])(props, 'value');
    _this.state = {
      value: props.defaultValue
    };

    if (false) {}

    if (false) {}

    return _this;
  }

  _createClass(RadioList, [{
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

      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          describedBy = _this$props.describedBy,
          disabled = _this$props.disabled,
          error = _this$props.error,
          labelledBy = _this$props.labelledBy,
          size = _this$props.size,
          value = _this$props.value,
          otherProps = RadioList_objectWithoutProperties(_this$props, ["appearance", "children", "describedBy", "disabled", "error", "labelledBy", "size", "value"]);

      var selectedValue = this.isControlled() ? value : this.state.value;
      var clonedChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (option, i) {
        return Object(external_react_["cloneElement"])(option, {
          selected: option.props.value === selectedValue,
          key: option.key || i,
          disabled: disabled || option.props.disabled,
          error: error,
          size: size,
          onClick: _this2.handleClick
        });
      });
      return external_react_default.a.createElement(StyledBox, RadioList_extends({
        flex: true,
        appearance: appearance,
        "data-test": "radio-list",
        "data-test-value": value,
        role: "radiogroup",
        "aria-labelledby": labelledBy,
        "aria-describedby": describedBy
      }, otherProps), clonedChildren);
    }
  }]);

  return RadioList;
}(external_react_["Component"]);

_defineProperty(RadioList_RadioList, "propTypes", {
  /** Changes the layout of the RadioList. */
  appearance: external_prop_types_default.a.oneOf(['horizontal', 'vertical']),

  /**
   * `children` should be `RadioList.Option`s.
   */
  children: external_prop_types_default.a.node,

  /**
   * Set this property instead of value to make value uncontrolled. */
  defaultValue: external_prop_types_default.a.any,

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
   * Highlight the field as having an error. The buttons and labels will turn red.
   */
  error: external_prop_types_default.a.bool,

  /**
   * The id of the label. When placed in a ControlGroup, this automatically set to the
   * ControlGroup's label.
   */
  labelledBy: external_prop_types_default.a.string,

  /** The name is returned with onChange events, which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /**
   * A callback to receive the change events.
   * If value is set, this callback is required. This must set the value prop to retain the
   * change.
   */
  onChange: external_prop_types_default.a.func,

  /** The size of the text label. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** The current selected value.  Setting this value makes the property controlled. A
   * callback is required. */
  value: external_prop_types_default.a.any
});

_defineProperty(RadioList_RadioList, "defaultProps", {
  appearance: 'vertical',
  disabled: false,
  error: false,
  onChange: function onChange() {},
  size: 'medium'
});

_defineProperty(RadioList_RadioList, "Option", RadioList_Option);

/* harmony default export */ var src_RadioList_RadioList = (RadioList_RadioList);

// CONCATENATED MODULE: ./src/RadioList/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_RadioList_RadioList; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Option", function() { return RadioList_Option; });



/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Switch");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });