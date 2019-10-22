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
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
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

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/StepBar/StepStyles.js


var Styled = external_styled_components_default.a.li.withConfig({
  displayName: "StepStyles__Styled",
  componentId: "sc-50mac7-0"
})(["", ";flex:1 1 0px;text-align:center;position:relative;padding:25px 15px 0;&[data-status='active']{color:", ";font-weight:", ";}&:not([data-status='active']):not([data-status='prev']){color:", ";}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('StepBar', 'Step', 'currentStepColor'), Object(themes_["variable"])('StepBar', 'Step', 'currentStepFontWeight'), Object(themes_["variable"])('StepBar', 'Step', 'color'));
var StyledSvg = external_styled_components_default.a.svg.withConfig({
  displayName: "StepStyles__StyledSvg",
  componentId: "sc-50mac7-1"
})(["position:absolute;left:0;right:0;top:0;"]);
var StyledPrevOrActiveRect = external_styled_components_default.a.rect.withConfig({
  displayName: "StepStyles__StyledPrevOrActiveRect",
  componentId: "sc-50mac7-2"
})(["fill:", ";"], Object(themes_["variable"])('StepBar', 'Step', 'prevOrActiveFillColor'));
var StyledPrevOrActiveCircle = StyledPrevOrActiveRect.withComponent('circle');
var StyledGray = external_styled_components_default.a.rect.withConfig({
  displayName: "StepStyles__StyledGray",
  componentId: "sc-50mac7-3"
})(["fill:", ";"], Object(themes_["variable"])('StepBar', 'Step', 'grayFill'));
var StyledNext = external_styled_components_default.a.circle.withConfig({
  displayName: "StepStyles__StyledNext",
  componentId: "sc-50mac7-4"
})(["stroke:", ";stroke-width:3px;fill:", ";"], Object(themes_["variable"])('StepBar', 'Step', 'nextStroke'), Object(themes_["variable"])('backgroundColor'));

// CONCATENATED MODULE: ./src/StepBar/Step.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private. */
  isFirst: external_prop_types_default.a.bool,

  /** @private. */
  isLast: external_prop_types_default.a.bool,

  /** @private. Is the tab active. */
  status: external_prop_types_default.a.oneOf(['prev', 'active', 'next']),

  /**
   * A unique id for this step and used by the StepBar to keep track of the open Step.
   * Defaults to a zero-based index matching the component's position in StepBar.
   */
  stepId: external_prop_types_default.a.any
};
var defaultProps = {
  status: 'next',
  isLast: false,
  isFirst: false
};
function Step(props) {
  var children = props.children,
      elementRef = props.elementRef,
      isFirst = props.isFirst,
      isLast = props.isLast,
      status = props.status,
      stepId = props.stepId,
      otherProps = _objectWithoutProperties(props, ["children", "elementRef", "isFirst", "isLast", "status", "stepId"]);

  return external_react_default.a.createElement(Styled, _extends({
    "data-status": status,
    "data-test": "step",
    "data-test-step-id": stepId
  }, Object(themes_["ref"])(elementRef), otherProps), external_react_default.a.createElement(StyledSvg, {
    "data-status": status,
    focusable: "false",
    width: "100%",
    height: "15px",
    viewBox: "0 0 100 15",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, external_react_default.a.createElement(StyledGray, {
    x: isFirst ? '50' : '0',
    y: "6",
    width: isLast || isFirst ? '50%' : '100%',
    height: "3"
  }), status === 'active' && !isFirst && external_react_default.a.createElement(StyledPrevOrActiveRect, {
    x: "0",
    y: "6",
    width: "50%",
    height: "3"
  }), status === 'prev' && external_react_default.a.createElement(StyledPrevOrActiveRect, {
    x: isFirst ? '50%' : '0',
    y: "6",
    width: "100%",
    height: "3"
  })), external_react_default.a.createElement(StyledSvg, {
    "data-status": status,
    focusable: "false",
    width: "100%",
    height: "15px",
    viewBox: "0 0 15 15",
    xmlns: "http://www.w3.org/2000/svg"
  }, status !== 'next' && external_react_default.a.createElement(StyledPrevOrActiveCircle, {
    cx: "50%",
    cy: "50%",
    r: "7.5"
  }), status === 'next' && external_react_default.a.createElement(StyledNext, {
    cx: "50%",
    cy: "50%",
    r: "6"
  })), children);
}
Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/StepBar/StepBarStyles.js


var StepBarStyles_Styled = external_styled_components_default.a.ul.withConfig({
  displayName: "StepBarStyles__Styled",
  componentId: "grfsgi-0"
})(["", ";&[data-inline]{display:inline-flex;}"], Object(themes_["mixin"])('reset')('flex'));

// CONCATENATED MODULE: ./src/StepBar/StepBar.jsx
function StepBar_extends() { StepBar_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return StepBar_extends.apply(this, arguments); }

function StepBar_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = StepBar_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function StepBar_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var StepBar_propTypes = {
  /** The `stepId` of the `StepBar.Step` to activate. */
  activeStepId: external_prop_types_default.a.any.isRequired,

  /**
   * `children` should be `StepBar.Step`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Setting inline to true will make the Step Bar inline element. It will assume it's minimum
   * width.
   */
  inline: external_prop_types_default.a.bool
};
var StepBar_defaultProps = {
  inline: false
};
function StepBar(props) {
  var activeIndex = 0;
  var foundActive = false;

  var activeStepId = props.activeStepId,
      children = props.children,
      elementRef = props.elementRef,
      inline = props.inline,
      otherProps = StepBar_objectWithoutProperties(props, ["activeStepId", "children", "elementRef", "inline"]);

  var validChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]);
  var lastChildIndex = validChildren.length - 1;
  var clonedChildren = validChildren.map(function (child, idx) {
    var stepId = child.props.stepId || idx;
    var active = activeStepId === stepId;
    var childProps = {
      status: 'prev',
      stepId: stepId
    };

    if (foundActive) {
      childProps.status = 'next';
    }

    if (active) {
      childProps.status = 'active';
      foundActive = true;
      activeIndex = idx;
    }

    if (idx === 0) {
      childProps.isFirst = true;
    }

    if (idx === lastChildIndex) {
      childProps.isLast = true;
    }

    return Object(external_react_["cloneElement"])(child, childProps);
  });
  return external_react_default.a.createElement(StepBarStyles_Styled, StepBar_extends({
    "data-inline": inline || null,
    "data-test": "step-bar",
    "data-test-active-step-id": activeStepId // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
    ,
    role: "progressbar",
    "aria-valuemin": "1",
    "aria-valuemax": lastChildIndex + 1,
    "aria-valuenow": activeIndex + 1
  }, Object(themes_["ref"])(elementRef), otherProps), clonedChildren);
}
StepBar.propTypes = StepBar_propTypes;
StepBar.defaultProps = StepBar_defaultProps;
StepBar.Step = Step;

// CONCATENATED MODULE: ./src/StepBar/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return StepBar; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Step", function() { return Step; });



/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });