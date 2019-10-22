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
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
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

/***/ 103:
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

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-icons/ChevronLeft"
var ChevronLeft_ = __webpack_require__(39);
var ChevronLeft_default = /*#__PURE__*/__webpack_require__.n(ChevronLeft_);

// EXTERNAL MODULE: external "@splunk/react-icons/ChevronRight"
var ChevronRight_ = __webpack_require__(24);
var ChevronRight_default = /*#__PURE__*/__webpack_require__.n(ChevronRight_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/ButtonSimple"
var ButtonSimple_ = __webpack_require__(31);
var ButtonSimple_default = /*#__PURE__*/__webpack_require__.n(ButtonSimple_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Paginator/ButtonStyles.js



var StyledButtonSimple = external_styled_components_default()(ButtonSimple_default.a).withConfig({
  displayName: "ButtonStyles__StyledButtonSimple",
  componentId: "sc-1fke9ew-0"
})(["min-width:", ";min-height:", ";text-align:center;padding:", ";"], Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('spacingQuarter'));
var StyledPrevNext = external_styled_components_default.a.div.withConfig({
  displayName: "ButtonStyles__StyledPrevNext",
  componentId: "sc-1fke9ew-1"
})(["padding:0 3px;white-space:nowrap;"]);

// CONCATENATED MODULE: ./src/Paginator/Button.jsx
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






var Button_PaginatorButton =
/*#__PURE__*/
function (_Component) {
  _inherits(PaginatorButton, _Component);

  function PaginatorButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PaginatorButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PaginatorButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          page = _this$props.page;
      onClick(e, {
        page: page
      });
    });

    return _this;
  }

  _createClass(PaginatorButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          label = _this$props2.label,
          page = _this$props2.page;
      return external_react_default.a.createElement(StyledButtonSimple, _extends({
        "data-test": "page",
        "data-test-page": page,
        appearance: "pill",
        onClick: this.handleClick,
        inline: false
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(PaginatorButton.propTypes))), label, children && external_react_default.a.createElement(StyledPrevNext, null, children));
    }
  }]);

  return PaginatorButton;
}(external_react_["Component"]);

_defineProperty(Button_PaginatorButton, "propTypes", {
  children: external_prop_types_default.a.node,
  label: external_prop_types_default.a.string,

  /** Callback for button click event */
  onClick: external_prop_types_default.a.func,

  /** Index of page */
  page: external_prop_types_default.a.number
});

_defineProperty(Button_PaginatorButton, "defaultProps", {
  onClick: function onClick() {}
});

/* harmony default export */ var Button = (Button_PaginatorButton);
// CONCATENATED MODULE: ./src/Paginator/Paginator.jsx
function Paginator_extends() { Paginator_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Paginator_extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








var propTypes = {
  /** Display a link to the last page in a collection */
  alwaysShowLastPageLink: external_prop_types_default.a.bool,

  /** Currently selected page */
  current: external_prop_types_default.a.number,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Number of pages to display. If greater than `totalPages`, `totalPages` will be used instead.
   */
  numPageLinks: external_prop_types_default.a.number,

  /** Callback to handle page change */
  onChange: external_prop_types_default.a.func,

  /** Total number of pages in collection. This can change as collection populates. */
  totalPages: external_prop_types_default.a.number.isRequired
};
var defaultProps = {
  current: 1,
  alwaysShowLastPageLink: false,
  numPageLinks: 5
};

function Paginator(props) {
  var onChange = props.onChange,
      current = props.current,
      alwaysShowLastPageLink = props.alwaysShowLastPageLink,
      numPageLinks = props.numPageLinks,
      totalPages = props.totalPages,
      otherProps = _objectWithoutProperties(props, ["onChange", "current", "alwaysShowLastPageLink", "numPageLinks", "totalPages"]); // Can't show more links than total number of pages.


  var numLinks = Math.min(numPageLinks, totalPages);
  var loMid = Math.ceil(numLinks / 2);
  var hiMid = Math.ceil(totalPages - numLinks / 2);
  var pages = [];

  if (totalPages <= 1) {
    return null;
  }

  if ((current > totalPages || current < 1) && process.env.NODE_ENV !== "production") {
    throw new Error('Error in Paginator: Current page is out of bounds');
  }

  var firstPage;
  var lastPage;

  if (current <= loMid) {
    firstPage = 1;
    lastPage = firstPage + Math.min(totalPages, numLinks) - 1;
  } else if (current > loMid && current < hiMid) {
    lastPage = Math.ceil(current + (numLinks - 1) / 2);
    firstPage = lastPage - numLinks + 2;
  } else if (current >= hiMid) {
    firstPage = totalPages - numLinks + 1;
    lastPage = totalPages;
  }

  pages.push(external_react_default.a.createElement(Button, {
    "data-test": "prev",
    disabled: current === 1,
    onClick: onChange,
    page: current - 1,
    key: "prev",
    "aria-label": Object(i18n_["_"])('Go to previous page')
  }, external_react_default.a.createElement(ChevronLeft_default.a, {
    screenReaderText: null,
    style: {
      marginRight: 3,
      marginTop: -1
    }
  }), Object(i18n_["_"])('Prev')));

  if (current > loMid && totalPages > numLinks) {
    pages.push(external_react_default.a.createElement(Button, {
      label: "1",
      key: "first",
      onClick: onChange,
      page: 1,
      "aria-label": Object(i18n_["_"])('Go to first page')
    }));
    pages.push(external_react_default.a.createElement(Button, {
      label: "...",
      disabled: true,
      key: "prevEllipsis",
      "aria-hidden": "true"
    }));
  }

  for (var i = firstPage; i <= lastPage; i += 1) {
    var isCurrent = i === current;
    pages.push(external_react_default.a.createElement(Button, {
      label: String(i),
      selected: isCurrent,
      onClick: onChange,
      page: i,
      key: i,
      "aria-label": isCurrent ? Object(i18n_["_"])('Current page') : Object(i18n_["_"])('Go to page $1').replace('$1', i)
    }));
  }

  if (current < hiMid && totalPages > numLinks) {
    pages.push(external_react_default.a.createElement(Button, {
      label: "...",
      disabled: true,
      key: "nextEllipsis",
      "aria-hidden": "true"
    }));

    if (alwaysShowLastPageLink) {
      pages.push(external_react_default.a.createElement(Button, {
        "data-test": "last",
        label: String(totalPages),
        key: "last",
        onClick: onChange,
        page: totalPages,
        "aria-label": Object(i18n_["_"])('Go to last page')
      }));
    }
  }

  pages.push(external_react_default.a.createElement(Button, {
    "data-test": "next",
    disabled: current === totalPages,
    onClick: onChange,
    page: current + 1,
    key: "next",
    "aria-label": Object(i18n_["_"])('Go to next page')
  }, Object(i18n_["_"])('Next'), external_react_default.a.createElement(ChevronRight_default.a, {
    screenReaderText: null,
    style: {
      marginLeft: 3,
      marginTop: -1
    }
  })));
  return external_react_default.a.createElement(Box_default.a, Paginator_extends({
    "data-test": "paginator",
    "data-test-current": current,
    flex: true,
    inline: true,
    role: "navigation",
    "aria-label": Object(i18n_["_"])('Pagination navigation')
  }, otherProps), pages);
}

Paginator.propTypes = propTypes;
Paginator.defaultProps = defaultProps;
/* harmony default export */ var Paginator_Paginator = (Paginator);
// CONCATENATED MODULE: ./src/Paginator/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return Paginator_Paginator; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/ChevronRight");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ButtonSimple");

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/ChevronLeft");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });