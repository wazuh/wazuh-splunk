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
/******/ 	return __webpack_require__(__webpack_require__.s = 139);
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

/***/ 139:
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

// CONCATENATED MODULE: ./src/Heading/HeadingStyles.js



var isSection = function isSection(level) {
  return level.toString().charAt(0) === 's';
};

var levelToElement = {
  '1': 'h1',
  '2': 'h2',
  '3': 'h3',
  '4': 'h4',
  s: 'h4',
  ss: 'h5'
};
var section = Object(external_styled_components_["css"])(["color:", ";margin:0.707em 0 0.2em;text-transform:uppercase;"], Object(themes_["variable"])('Heading', 'sectionColor'));
var StyledH1 = external_styled_components_default.a.h1.withConfig({
  displayName: "HeadingStyles__StyledH1",
  componentId: "sc-59vz70-0"
})(["", ";color:", ";margin:1.414em 0 0.4em;text-rendering:optimizelegibility;", ";font-size:", ";font-size:", ";font-size:", ";font-size:", ";font-size:", ";font-weight:", ";line-height:", ";line-height:", ";line-height:", ";line-height:", ";line-height:", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Heading', 'headingColor'), function (props) {
  return isSection(props.level) ? section : null;
}, function (props) {
  return levelToElement[props.level] === 'h1' ? Object(themes_["variable"])('Heading', 'h1FontSize') : null;
}, function (props) {
  return levelToElement[props.level] === 'h2' ? Object(themes_["variable"])('Heading', 'h2FontSize') : null;
}, function (props) {
  return levelToElement[props.level] === 'h3' ? Object(themes_["variable"])('Heading', 'h3FontSize') : null;
}, function (props) {
  return levelToElement[props.level] === 'h4' ? isSection(props.level) && Object(themes_["variable"])('Heading', 'fontSize') || Object(themes_["variable"])('Heading', 'h4FontSize') : null;
}, function (props) {
  return levelToElement[props.level] === 'h5' && isSection(props.level) ? Object(themes_["variable"])('Heading', 'h5FontSize') : null;
}, function (props) {
  return levelToElement[props.level] === 'h4' && !isSection(props.level) ? 'bold' : Object(themes_["variable"])('Heading', 'fontWeight');
}, function (props) {
  return levelToElement[props.level] === 'h1' ? Object(themes_["variable"])('Heading', 'h1LineHeight') : null;
}, function (props) {
  return levelToElement[props.level] === 'h2' ? Object(themes_["variable"])('Heading', 'h2LineHeight') : null;
}, function (props) {
  return levelToElement[props.level] === 'h3' ? Object(themes_["variable"])('Heading', 'h3LineHeight') : null;
}, function (props) {
  return levelToElement[props.level] === 'h4' ? Object(themes_["variable"])('Heading', 'h4LineHeight') : null;
}, function (props) {
  return levelToElement[props.level] === 'h5' ? Object(themes_["variable"])('Heading', 'h5LineHeight') : null;
});
var StyledH5 = StyledH1.withComponent('h5');
var StyledH4 = StyledH1.withComponent('h4');
var StyledH3 = StyledH1.withComponent('h3');
var StyledH2 = StyledH1.withComponent('h2');

// CONCATENATED MODULE: ./src/Heading/Heading.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var styledH = {
  h1: StyledH1,
  h2: StyledH2,
  h3: StyledH3,
  h4: StyledH4,
  h5: StyledH5
};
var propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Corresponds to the respective `<hX>` HTML tags. Use `s` for section-style headings (`ss` for small variant).
   */
  level: external_prop_types_default.a.oneOf([1, 2, 3, 4, 's', 'ss'])
};
var defaultProps = {
  level: 2
};
function Heading(props) {
  var level = props.level,
      children = props.children,
      elementRef = props.elementRef;
  var Styled = styledH[levelToElement[level]];
  return external_react_default.a.createElement(Styled, _extends({
    "data-test": "heading"
  }, Object(themes_["ref"])(elementRef), props), children);
}
Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/Heading/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return Heading; });


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