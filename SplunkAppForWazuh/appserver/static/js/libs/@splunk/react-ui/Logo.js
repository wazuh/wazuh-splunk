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
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
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

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/Logo/LogoStyles.js


var appearances = {
  corporate: '#97999b',
  enterprise: '#5cc05c',
  // splunk enterprise green
  light: '#f58220' // splunk lite orange

};
var StyledSvg = external_styled_components_default.a.svg.withConfig({
  displayName: "LogoStyles__StyledSvg",
  componentId: "sc-1im25zp-0"
})(["flex:0 0 auto;stroke-width:0;&[data-inline='true']{vertical-align:middle;display:inline-block;}&[data-inline='false']{display:block;margin:0 auto;}&[data-inverted='false'] > [data-color='text']{fill:", ";}&[data-inverted='true'] > [data-color='text']{fill:", ";}> [data-color='brand']{fill:", ";}"], Object(themes_["variable"])('Logo', 'svgTextFill'), Object(themes_["variable"])('Logo', 'svgInvertedTextFill'), function (_ref) {
  var appearance = _ref.appearance;
  return appearances[appearance];
});

// CONCATENATED MODULE: ./src/Logo/Logo.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable max-len */




 // The Logo component is an internal component that will be removed from this package soon.
// It is not intended to be used by external developers.
// Please note the "Trademarks" section of this package's license.

var propTypes = {
  /** @private */
  appearance: external_prop_types_default.a.oneOf(['corporate', 'enterprise', 'light']),

  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Setting inline to false will center the logo and make it a block element. */
  inline: external_prop_types_default.a.bool,

  /** Inverting changes the black text to white, but does not affect the brand colors. */
  invert: external_prop_types_default.a.bool,

  /** @private */
  screenReaderText: external_prop_types_default.a.string,

  /**
   * By default, the logo inherits it's height from the font-size. This size will increase
   * or decrease the height in relation to the inherited font-size.
   */
  size: external_prop_types_default.a.number,

  /** @private */
  viewBox: external_prop_types_default.a.string.isRequired
};
var defaultProps = {
  appearance: 'corporate',
  inline: true,
  invert: false,
  size: 1
};
var splunkPath = external_react_default.a.createElement("path", {
  "data-color": "text",
  d: "M25.897 43.612c0 1.613-.343 3.1-1.024 4.47-.683 1.368-1.635 2.528-2.854 3.48-1.22.952-2.67 1.696-4.354 2.233-1.683.537-3.524.804-5.524.804-2.39 0-4.536-.33-6.44-.984-1.9-.657-3.8-1.74-5.703-3.248l3.144-5.114c1.512 1.266 2.875 2.193 4.095 2.778 1.217.586 2.462.876 3.73.876 1.56 0 2.816-.4 3.768-1.206.95-.806 1.426-1.892 1.426-3.258 0-.586-.087-1.138-.256-1.648-.17-.512-.487-1.038-.95-1.575-.462-.536-1.095-1.12-1.9-1.755-.804-.635-1.84-1.417-3.104-2.343-.974-.684-1.924-1.39-2.848-2.122-.927-.733-1.767-1.516-2.523-2.346-.754-.83-1.363-1.755-1.826-2.78-.464-1.027-.694-2.198-.694-3.515 0-1.51.316-2.89.948-4.138.63-1.244 1.495-2.305 2.59-3.183 1.096-.88 2.408-1.564 3.94-2.05 1.534-.49 3.2-.734 5-.734 1.9 0 3.737.254 5.52.763 1.776.51 3.423 1.247 4.936 2.215L22.14 23.83c-1.95-1.367-3.997-2.05-6.144-2.05-1.314 0-2.4.343-3.254 1.026-.853.684-1.28 1.537-1.28 2.564 0 .978.377 1.858 1.132 2.64.75.78 2.05 1.88 3.9 3.294 1.86 1.37 3.402 2.564 4.625 3.59 1.223 1.026 2.19 1.992 2.9 2.894.71.904 1.2 1.82 1.47 2.748.266.93.403 1.953.403 3.076M68.473 34.622c0 2.88-.44 5.527-1.323 7.94-.882 2.417-2.103 4.527-3.67 6.33-1.567 1.807-3.426 3.21-5.58 4.21-2.153.997-4.478 1.497-6.974 1.497-1.125 0-2.18-.098-3.158-.293-.98-.196-1.908-.526-2.79-.988-.88-.466-1.75-1.064-2.605-1.8-.857-.73-1.75-1.636-2.68-2.71V72h-9.4V17.135h9.4l.052 5.34c1.712-2.146 3.567-3.72 5.57-4.72 2.003-1 4.325-1.498 6.963-1.498 2.394 0 4.58.45 6.557 1.353 1.978.902 3.69 2.158 5.13 3.768 1.44 1.613 2.552 3.538 3.335 5.783.78 2.246 1.173 4.733 1.173 7.463m-10.226.37c0-4-.81-7.164-2.432-9.484-1.62-2.32-3.83-3.48-6.628-3.48-2.947 0-5.28 1.232-6.997 3.7-1.72 2.466-2.58 5.8-2.58 9.997 0 4.102.848 7.325 2.54 9.668 1.696 2.347 4.017 3.516 6.964 3.516 1.767 0 3.226-.45 4.382-1.353 1.154-.903 2.086-2.05 2.798-3.44.712-1.392 1.215-2.908 1.51-4.544.294-1.636.443-3.16.443-4.58M72.657 53.697h9.65V.007h-9.65M113.868 53.71l-.024-4.9c-1.856 2.053-3.762 3.53-5.716 4.435-1.955.904-4.226 1.354-6.817 1.354-2.88 0-5.31-.574-7.29-1.72-1.98-1.15-3.407-2.847-4.285-5.095-.245-.536-.428-1.1-.55-1.685-.122-.585-.232-1.255-.33-2.014-.097-.758-.16-1.625-.183-2.602-.024-.976-.036-2.174-.036-3.592v-20.81h9.648v20.955c0 1.86.085 3.274.257 4.252.17.974.478 1.855.92 2.634 1.126 2.055 3.113 3.08 5.955 3.08 3.627 0 6.127-1.514 7.497-4.544.344-.78.59-1.647.737-2.6.15-.953.22-2.307.22-4.066V17.08h9.65v36.63h-9.65M155.483 53.695V32.793c0-1.852-.085-3.265-.258-4.24-.17-.97-.478-1.85-.916-2.63-1.13-2.046-3.114-3.07-5.957-3.07-1.814 0-3.37.378-4.67 1.133-1.298.754-2.267 1.864-2.902 3.325-.345.83-.577 1.72-.7 2.67-.12.95-.182 2.277-.182 3.982v19.735h-9.733v-36.55h9.732l.017 4.9c1.858-2.05 3.762-3.53 5.718-4.434 1.954-.905 4.227-1.356 6.816-1.356 2.885 0 5.315.597 7.295 1.792 1.978 1.192 3.408 2.885 4.287 5.08.195.536.368 1.084.513 1.644.148.563.27 1.206.367 1.937.1.733.158 1.598.182 2.597.025 1 .04 2.207.04 3.62v20.767h-9.65M196.087 54.436l-14.555-20.188v19.458h-9.73V.016h9.73V31.54h1.024L195.5 16.55l7.316 3.144-12.437 13.312 14.704 18.286-8.998 3.146"
});
var greaterPath = external_react_default.a.createElement("path", {
  "data-color": "brand",
  d: "M213.438 52.705v-6.428L236.112 35.1l-22.674-11.033v-6.574l29.26 14.683v5.99l-29.26 14.54M215.657 11.183h.424c.483 0 .893-.176.893-.63 0-.32-.234-.64-.89-.64-.19 0-.324.013-.425.03v1.24zm0 2.03h-.584V9.546c.307-.044.6-.087 1.036-.087.553 0 .917.115 1.137.277.22.16.336.408.336.76 0 .48-.32.772-.716.89v.028c.322.06.54.35.615.89.086.57.175.788.23.906h-.61c-.09-.117-.176-.452-.25-.934-.087-.467-.32-.643-.787-.643h-.41v1.578zm.612-4.688c-1.446 0-2.63 1.24-2.63 2.774 0 1.56 1.184 2.786 2.645 2.786 1.46.015 2.626-1.227 2.626-2.773 0-1.548-1.166-2.79-2.625-2.79h-.017zm.015-.51c1.795 0 3.226 1.46 3.226 3.284 0 1.852-1.43 3.296-3.242 3.296-1.796 0-3.254-1.444-3.254-3.298 0-1.825 1.458-3.285 3.253-3.285h.016z"
});
/**
 The logo component provides the Splunk corporate logo and four platform logos.
*/

function SVG(props) {
  var appearance = props.appearance,
      children = props.children,
      elementRef = props.elementRef,
      inline = props.inline,
      invert = props.invert,
      screenReaderText = props.screenReaderText,
      size = props.size,
      viewBox = props.viewBox,
      otherProps = _objectWithoutProperties(props, ["appearance", "children", "elementRef", "inline", "invert", "screenReaderText", "size", "viewBox"]);

  var vbWidth = parseInt(viewBox.split(' ')[2], 10);
  var vbHeight = parseInt(viewBox.split(' ')[3], 10);
  var width = vbWidth / vbHeight * size;
  return external_react_default.a.createElement(StyledSvg, _extends({
    appearance: appearance
  }, Object(themes_["ref"])(elementRef), {
    width: "".concat(width.toFixed(4), "em"),
    height: "".concat(size.toFixed(4), "em"),
    viewBox: viewBox,
    "data-inverted": invert,
    "data-inline": inline,
    xmlns: "http://www.w3.org/2000/svg"
  }, otherProps), external_react_default.a.createElement("title", null, screenReaderText), children);
}

SVG.propTypes = propTypes;
SVG.defaultProps = defaultProps;
function Splunk(props) {
  return external_react_default.a.createElement(SVG, _extends({
    "data-test": "splunk-logo",
    screenReaderText: Object(i18n_["_"])('Splunk'),
    viewBox: "0 0 243 72",
    appearance: "corporate"
  }, props), splunkPath, greaterPath);
}
function Enterprise(props) {
  return external_react_default.a.createElement(SVG, _extends({
    "data-test": "enterprise-logo",
    screenReaderText: Object(i18n_["_"])('Splunk Enterprise'),
    viewBox: "0 0 561 72",
    appearance: "enterprise"
  }, props), splunkPath, greaterPath, external_react_default.a.createElement("path", {
    "data-color": "brand",
    d: "M267.74 22.135c6.427 0 9.36 5.068 10.027 10.088H257.53c.902-5.982 5.01-10.088 10.21-10.088zm.133-5.775c-9.573 0-17.072 8.106-17.072 18.454v.13c0 10.52 7.623 18.454 17.73 18.454 5.968 0 10.463-2.045 14.578-6.632l.5-.558-4.257-3.813-.5.524c-2.98 3.12-6.216 4.572-10.187 4.572-5.823 0-10.21-3.992-11.133-10.022h26.807l.075-.665c.07-.633.07-1.07.07-1.728 0-11.02-6.83-18.717-16.61-18.717zM307.695 16.36c-4.516 0-8.173 1.692-10.902 5.035v-4.31h-6.564v35.523h6.563v-20.23c0-5.838 3.887-9.915 9.454-9.915 5.506 0 8.664 3.47 8.664 9.52v20.625h6.565V30.733c0-8.73-5.41-14.373-13.78-14.373M337.473 6.817h-6.565v10.267h-4.737v5.972h4.738v19.788c0 6.582 3.776 10.357 10.358 10.357 2.396 0 4.45-.486 6.466-1.53l.404-.21v-5.99l-1.072.517c-1.64.79-2.975 1.11-4.613 1.11-3.395 0-4.977-1.56-4.977-4.912v-19.13h10.794v-5.97h-10.794V6.816M367.265 22.135c6.428 0 9.36 5.068 10.028 10.088h-20.24c.904-5.982 5.01-10.088 10.212-10.088zm.133-5.775c-9.573 0-17.072 8.106-17.072 18.454v.13c0 10.52 7.623 18.454 17.73 18.454 5.967 0 10.463-2.045 14.577-6.632l.5-.558-4.258-3.813-.5.524c-2.98 3.12-6.216 4.572-10.187 4.572-5.823 0-10.208-3.992-11.133-10.022h26.808l.074-.665c.07-.633.07-1.07.07-1.728 0-11.02-6.83-18.717-16.61-18.717zM396.32 23.732v-6.648h-6.566v35.524h6.565V38.302c0-9.022 5-14.85 12.742-14.85h1.145v-6.93l-.72-.03c-5.335-.21-10.11 2.443-13.168 7.24M433.023 22.398c6.507 0 11.23 5.222 11.23 12.416v.13c0 7.273-4.616 12.35-11.23 12.35-5.68 0-11.56-4.643-11.56-12.415v-.132c0-7.628 6-12.35 11.56-12.35zm.92-6.038c-4.898 0-8.934 1.987-12.283 6.062v-5.338h-6.562V63.14h6.562V47.55c3.27 3.84 7.393 5.783 12.284 5.783 8.242 0 17.004-6.468 17.004-18.454v-.132c0-11.944-8.762-18.388-17.004-18.388zM463.72 23.732v-6.648h-6.563v35.524h6.562V38.302c0-9.022 5.004-14.85 12.747-14.85h1.14v-6.93l-.715-.03c-5.335-.21-10.112 2.443-13.173 7.24M482.302 11.143h7.286v-7.09h-7.286M482.632 52.608h6.563V17.084h-6.563M511.243 31.73l-.133-.04c-4.16-1.267-8.094-2.464-8.094-5.104v-.13c0-2.507 2.345-4.19 5.835-4.19 3.023 0 6.544 1.156 9.664 3.17l.65.42 3.072-5.093-.598-.396c-3.675-2.426-8.404-3.875-12.653-3.875-7.263 0-12.335 4.313-12.335 10.49v.13c0 6.98 6.82 8.916 11.804 10.33 4.5 1.258 7.943 2.445 7.943 5.27v.132c0 2.78-2.53 4.648-6.295 4.648-3.757 0-7.676-1.45-11.33-4.194l-.62-.46-3.414 4.82.543.44c3.936 3.188 9.515 5.17 14.56 5.17 7.69 0 12.856-4.4 12.856-10.95v-.133c0-7.02-6.893-9.088-11.453-10.456M543.8 22.135c6.43 0 9.36 5.068 10.03 10.088h-20.24c.906-5.982 5.013-10.088 10.21-10.088zm.134-5.775c-9.572 0-17.07 8.106-17.07 18.454v.13c0 10.52 7.62 18.454 17.727 18.454 5.97 0 10.467-2.045 14.58-6.632l.498-.558-4.257-3.813-.5.524c-2.977 3.12-6.215 4.572-10.185 4.572-5.823 0-10.21-3.992-11.134-10.022h26.81l.075-.665c.07-.633.07-1.07.07-1.728 0-11.02-6.83-18.717-16.61-18.717z"
  }));
}
function Hunk(props) {
  return external_react_default.a.createElement(SVG, _extends({
    "data-test": "hunk-logo",
    screenReaderText: Object(i18n_["_"])('Hunk'),
    viewBox: "0 0 249 72",
    appearance: "enterprise"
  }, props), external_react_default.a.createElement("path", {
    "data-color": "brand",
    d: "M0 3.287h11.886v28.13h32.28V3.286h11.887V70.94H44.165V42.43h-32.28v28.51H0V3.286M71.514 52.384V19.91h11.698v29c0 7.922 3.963 12.365 10.923 12.365 6.762 0 11.497-4.64 11.497-12.56V19.91h11.793v51.03h-11.793v-7.924C102.347 67.846 97.612 72 89.69 72c-11.505 0-18.176-7.73-18.176-19.616M132.018 19.91h11.693v7.83c3.29-4.735 8.024-8.89 15.95-8.89 11.498 0 18.168 7.724 18.168 19.52v32.57h-11.7V41.945c0-7.928-3.96-12.465-10.916-12.465-6.76 0-11.5 4.732-11.5 12.662V70.94h-11.694V19.91M191.94.39h11.69v42.14l21.163-22.62H239l-20.294 20.778 20.98 30.25h-13.73l-15.07-22.13-7.256 7.543v14.59h-11.69V.39"
  }), external_react_default.a.createElement("path", {
    "data-color": "brand",
    d: "M198.47 67.313h-.898v-.464h2.3v.463h-.897v2.375h-.504v-2.375M200.397 66.85h.53l.866 1.343.863-1.344h.53v2.838h-.498v-2.036l-.895 1.338h-.02l-.886-1.33v2.028h-.49v-2.84"
  }), external_react_default.a.createElement("path", {
    "data-color": "brand",
    d: "M243.124 12.627h.573c.65 0 1.204-.236 1.204-.85 0-.435-.316-.867-1.203-.867-.257 0-.434.018-.573.04v1.677zm0 2.744h-.79v-4.955c.415-.06.81-.118 1.4-.118.75 0 1.242.157 1.542.377.294.216.453.55.453 1.025 0 .65-.437 1.046-.968 1.202v.04c.435.08.73.475.83 1.204.12.77.238 1.066.315 1.225h-.83c-.12-.158-.236-.61-.335-1.262-.12-.632-.436-.87-1.064-.87h-.554v2.133zm.83-6.337c-1.955 0-3.556 1.677-3.556 3.752 0 2.11 1.6 3.77 3.577 3.77 1.973.02 3.55-1.66 3.55-3.75 0-2.095-1.577-3.772-3.55-3.772h-.022zm.02-.69c2.427 0 4.363 1.974 4.363 4.442 0 2.506-1.936 4.462-4.384 4.462-2.43 0-4.403-1.956-4.403-4.462 0-2.468 1.973-4.443 4.403-4.443h.022z"
  }));
}
function Light(props) {
  return external_react_default.a.createElement(SVG, _extends({
    "data-test": "light-logo",
    screenReaderText: Object(i18n_["_"])('Splunk Light'),
    viewBox: "0 0 386 72",
    appearance: "light"
  }, props), splunkPath, greaterPath, external_react_default.a.createElement("path", {
    "data-color": "brand",
    d: "M254.044 52.95h6.58V3.276h-6.58M269.75 52.95h6.582V17.333h-6.58M269.42 11.375h7.31v-7.11h-7.31M300.793 44.324c-6.204 0-11.063-4.773-11.063-10.865v-.134c0-6.22 4.653-10.733 11.063-10.733 5.795 0 11.79 4.04 11.79 10.8v.13c0 6.67-6.12 10.8-11.79 10.8zm11.59-22.184c-3.37-3.674-7.592-5.534-12.58-5.534-8.252 0-16.787 6.304-16.787 16.853v.13c0 10.466 8.535 16.72 16.787 16.72 4.983 0 9.137-1.914 12.647-5.84v1.923c0 7.24-4.25 11.393-11.657 11.393-4.585 0-8.856-1.417-12.692-4.212l-.67-.49-3.076 5.276.568.396c4.662 3.242 10.024 4.886 15.94 4.886 5.728 0 10.407-1.65 13.53-4.773 3.036-3.038 4.575-7.28 4.575-12.61V17.33h-6.58v4.81zM344.682 16.606c-4.527 0-8.195 1.696-10.932 5.048V3.274h-6.58V52.95h6.58V32.67c0-5.853 3.9-9.94 9.48-9.94 5.52 0 8.687 3.478 8.687 9.544v20.68h6.582V31.018c0-8.754-5.425-14.41-13.82-14.41M385.363 23.32v-5.988H374.54V7.037h-6.582v10.295h-4.75v5.988h4.75v19.84c0 6.6 3.785 10.385 10.385 10.385 2.403 0 4.462-.488 6.483-1.536l.404-.21v-6.007l-1.075.518c-1.642.79-2.982 1.114-4.624 1.114-3.404 0-4.99-1.565-4.99-4.925V23.32h10.824"
  }));
}
function Cloud(props) {
  return external_react_default.a.createElement(SVG, _extends({
    "data-test": "cloud-logo",
    screenReaderText: Object(i18n_["_"])('Splunk Cloud'),
    viewBox: "0 0 431 72",
    appearance: "enterprise"
  }, props), splunkPath, greaterPath, external_react_default.a.createElement("path", {
    "data-color": "brand",
    d: "M281.192 43.353c-3.11 3.337-6.418 4.96-10.117 4.96-6.77 0-12.075-5.63-12.075-12.82v-.134c0-7.15 5.156-12.752 11.738-12.752 4.62 0 7.563 2.42 10.055 5.033l.545.572 4.473-4.733-.484-.516c-2.826-3-7.03-6.446-14.52-6.446-10.278 0-18.64 8.512-18.64 18.976v.135c0 10.388 8.362 18.84 18.64 18.84 7.557 0 11.88-3.74 14.802-7l.49-.545-4.392-4.123-.514.55M290.98 53.66h6.696V2.882h-6.697M322.038 48.313c-6.81 0-12.145-5.63-12.145-12.82v-.134c0-7.27 5.162-12.752 12.008-12.752 6.85 0 12.212 5.66 12.212 12.886v.135c0 7.23-5.19 12.683-12.074 12.683zm0-31.795c-10.64 0-18.977 8.335-18.977 18.976v.135c0 10.564 8.276 18.84 18.84 18.84 10.68 0 19.046-8.335 19.046-18.976v-.135c0-10.566-8.306-18.842-18.908-18.842zM371.575 37.992c0 5.997-3.994 10.185-9.713 10.185-5.66 0-8.904-3.565-8.904-9.78V17.26h-6.698v22.42c0 8.944 5.54 14.723 14.117 14.723 4.66 0 8.342-1.713 11.198-5.223v4.48h6.63v-36.4h-6.63v20.732M401.35 48.245c-6.577 0-11.537-5.482-11.537-12.75v-.136c0-7.47 4.744-12.685 11.537-12.685 5.836 0 11.873 4.744 11.873 12.684v.134c0 6.133-4.54 12.75-11.873 12.75zm11.67-45.363v19.595c-3.356-3.957-7.59-5.96-12.615-5.96-8.447 0-17.424 6.628-17.424 18.91v.135c0 12.237 8.978 18.84 17.425 18.84 5.033 0 9.178-2.047 12.615-6.247v5.505h6.697V2.882h-6.697zM424.125 3.483h-1.167v-.6h2.987v.6h-1.166v3.084h-.655V3.483M426.625 2.882h.69l1.122 1.744 1.12-1.744h.688v3.685h-.645V3.924l-1.163 1.737h-.023l-1.153-1.723v2.63h-.635V2.882"
  }));
}
// CONCATENATED MODULE: ./src/Logo/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Splunk", function() { return Splunk; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Enterprise", function() { return Enterprise; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Hunk", function() { return Hunk; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Light", function() { return Light; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Cloud", function() { return Cloud; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ })

/******/ });