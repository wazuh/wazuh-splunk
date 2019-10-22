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
/******/ 	return __webpack_require__(__webpack_require__.s = 96);
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

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 96:
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

// CONCATENATED MODULE: ./src/DefinitionList/DescriptionStyles.js


var Styled = external_styled_components_default.a.dd.withConfig({
  displayName: "DescriptionStyles__Styled",
  componentId: "sc-1arzlbk-0"
})(["", ";line-height:", ";padding-left:", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('lineHeight'), Object(themes_["variable"])('spacingQuarter'));

// CONCATENATED MODULE: ./src/DefinitionList/Description.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func
};
/**
 * Container component for a `DefinitionList` description.
 */

function Description(props) {
  var children = props.children,
      elementRef = props.elementRef,
      otherProps = _objectWithoutProperties(props, ["children", "elementRef"]);

  return external_react_default.a.createElement(Styled, _extends({
    "data-test": "description"
  }, Object(themes_["ref"])(elementRef), otherProps), children);
}
Description.propTypes = propTypes;
// CONCATENATED MODULE: ./src/DefinitionList/DefinitionListStyles.js


var DefinitionListStyles_Styled = external_styled_components_default.a.dl.withConfig({
  displayName: "DefinitionListStyles__Styled",
  componentId: "uwqrqh-0"
})(["", ";"], Object(themes_["mixin"])('reset')('block'));

// CONCATENATED MODULE: ./src/DefinitionList/TermStyles.js


var TermStyles_Styled = external_styled_components_default.a.dt.withConfig({
  displayName: "TermStyles__Styled",
  componentId: "c0kbv4-0"
})(["", ";float:left;width:120px;overflow:hidden;overflow-x:hidden;white-space:nowrap;font-weight:400;word-wrap:normal;&::after{content:' ..................................................................................';}"], Object(themes_["mixin"])('reset')('block'));

// CONCATENATED MODULE: ./src/DefinitionList/Term.jsx
function Term_extends() { Term_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Term_extends.apply(this, arguments); }

function Term_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Term_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Term_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var Term_propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func
};
/**
 * Container component for a `DefinitionList` term.
 */

function Term(props) {
  var children = props.children,
      elementRef = props.elementRef,
      otherProps = Term_objectWithoutProperties(props, ["children", "elementRef"]);

  return external_react_default.a.createElement(TermStyles_Styled, Term_extends({
    "data-test": "term"
  }, Object(themes_["ref"])(elementRef), otherProps), children);
}
Term.propTypes = Term_propTypes;
// CONCATENATED MODULE: ./src/DefinitionList/DefinitionList.jsx
function DefinitionList_extends() { DefinitionList_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return DefinitionList_extends.apply(this, arguments); }

function DefinitionList_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = DefinitionList_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function DefinitionList_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var DefinitionList_propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Defines the width of an item on the list.
   */
  termWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string])
};
var defaultProps = {
  termWidth: 120
};

function processChildren(props) {
  var children = props.children,
      termWidth = props.termWidth;
  return external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
    if (child.type === Term) {
      return Object(external_react_["cloneElement"])(child, {
        style: {
          width: termWidth
        }
      });
    }

    if (child.type === Description) {
      return Object(external_react_["cloneElement"])(child, {
        style: {
          marginLeft: termWidth
        }
      });
    }

    return child;
  });
}

function DefinitionList(props) {
  // eslint-disable-next-line no-unused-vars
  var children = props.children,
      elementRef = props.elementRef,
      termWidth = props.termWidth,
      otherProps = DefinitionList_objectWithoutProperties(props, ["children", "elementRef", "termWidth"]);

  return external_react_default.a.createElement(DefinitionListStyles_Styled, DefinitionList_extends({
    "data-test": "definition-list"
  }, Object(themes_["ref"])(elementRef), otherProps), processChildren(props));
}
DefinitionList.propTypes = DefinitionList_propTypes;
DefinitionList.defaultProps = defaultProps;
DefinitionList.Description = Description;
DefinitionList.Term = Term;

// CONCATENATED MODULE: ./src/DefinitionList/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return DefinitionList; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Description", function() { return Description; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Term", function() { return Term; });



/***/ })

/******/ });