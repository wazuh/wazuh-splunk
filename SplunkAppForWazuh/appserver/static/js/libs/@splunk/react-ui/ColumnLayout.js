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
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
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

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 97:
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

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/ColumnLayout/ColumnStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "ColumnStyles__Styled",
  componentId: "sc-1oxa151-0"
})(["", ";"], Object(themes_["mixin"])('reset')('block'));

// CONCATENATED MODULE: ./src/ColumnLayout/Column.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var propTypes = {
  /** @private. */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private. This prop must only inherit from parent component */
  gutter: external_prop_types_default.a.number,

  /** The number of columns the element should span. */
  span: external_prop_types_default.a.number,

  /** @private. This prop should be calculated and set by parent component */
  isFirstChild: external_prop_types_default.a.bool,

  /** @private. This prop should be calculated and set by parent component */
  isLastChild: external_prop_types_default.a.bool,

  /** @private. */
  style: external_prop_types_default.a.object
};
var defaultProps = {
  span: 1
};
function Column(props) {
  var children = props.children,
      elementRef = props.elementRef,
      gutter = props.gutter,
      span = props.span,
      isFirstChild = props.isFirstChild,
      isLastChild = props.isLastChild,
      style = props.style,
      otherProps = _objectWithoutProperties(props, ["children", "elementRef", "gutter", "span", "isFirstChild", "isLastChild", "style"]);

  var width = gutter ? "calc((100% - ".concat(11 * gutter, "px) * ").concat(span / 12, " + (").concat(gutter, "px * ").concat(span - 1, "))") : "".concat(100 / 12 * span, "%");
  var calcStyle = {
    marginLeft: isFirstChild ? undefined : gutter / 2,
    marginRight: isLastChild ? undefined : gutter / 2,
    flex: "".concat(span, " ").concat(span, " auto"),
    // may accomodate small rounding errors and dividers
    width: width
  };
  return external_react_default.a.createElement(Styled, _extends({
    "data-test": "column"
  }, Object(themes_["ref"])(elementRef), {
    style: Object(external_lodash_["defaults"])({}, style, calcStyle)
  }, otherProps), children);
}
Column.propTypes = propTypes;
Column.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/ColumnLayout/RowStyles.js


var RowStyles_Styled = external_styled_components_default.a.div.withConfig({
  displayName: "RowStyles__Styled",
  componentId: "k3oqy-0"
})(["", ";flex-flow:row nowrap;&[data-align-items='start']{align-items:flex-start;}&[data-align-items='end']{align-items:flex-end;}&[data-align-items='center']{align-items:center;}&[data-align-items='stretch']{align-items:stretch;}"], Object(themes_["mixin"])('reset')('flex'));
var StyledDivider = external_styled_components_default.a.div.withConfig({
  displayName: "RowStyles__StyledDivider",
  componentId: "k3oqy-1"
})(["border-left:", " 1px solid;flex:0 0 1;align-self:stretch;"], Object(themes_["variable"])('borderLightColor'));

// CONCATENATED MODULE: ./src/ColumnLayout/Row.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Row_extends() { Row_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Row_extends.apply(this, arguments); }

function Row_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Row_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Row_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Row_Row =
/*#__PURE__*/
function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Row)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cloneColumn", function (column, idx) {
      var _this$props = _this.props,
          gutter = _this$props.gutter,
          children = _this$props.children;
      var isFirstChild = idx === 0;
      var isLastChild = idx === external_react_["Children"].count(children) - 1;
      return Object(external_react_["cloneElement"])(column, {
        gutter: gutter,
        isFirstChild: isFirstChild,
        isLastChild: isLastChild
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "insertDividers", function (acc, row, idx, original) {
      acc.push(row);

      if (_this.props.divider && idx < original.length - 1) {
        acc.push(external_react_default.a.createElement(StyledDivider, {
          key: "".concat(idx, "-divider")
        }));
      }

      return acc;
    });

    return _this;
  }

  _createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          alignItems = _this$props2.alignItems,
          children = _this$props2.children,
          elementRef = _this$props2.elementRef,
          gutter = _this$props2.gutter,
          isFirstChild = _this$props2.isFirstChild,
          isLastChild = _this$props2.isLastChild,
          style = _this$props2.style,
          otherProps = Row_objectWithoutProperties(_this$props2, ["alignItems", "children", "elementRef", "gutter", "isFirstChild", "isLastChild", "style"]);

      var gutterStyle = {
        marginTop: isFirstChild ? undefined : gutter / 2,
        marginBottom: isLastChild ? undefined : gutter / 2
      };
      var childrenCloned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(this.cloneColumn).reduce(this.insertDividers, []);
      return external_react_default.a.createElement(RowStyles_Styled, Row_extends({
        style: Object(external_lodash_["defaults"])({}, style, gutterStyle),
        "data-align-items": alignItems,
        "data-test": "row"
      }, Object(themes_["ref"])(elementRef), Object(external_lodash_["omit"])(otherProps, 'divider')), childrenCloned);
    }
  }]);

  return Row;
}(external_react_["Component"]);

_defineProperty(Row_Row, "propTypes", {
  /** Set vertical alignment of columns in a row */
  alignItems: external_prop_types_default.a.oneOf(['start', 'end', 'center', 'stretch']),

  /** `children` must be `ColumnLayout.Column` elements */
  // eslint-disable-next-line consistent-return
  children: function children(props) {
    if (props.children) {
      var total = external_react_["Children"].toArray(props.children).filter(external_react_["isValidElement"]).reduce(function (sum, child) {
        return sum + child.props.span;
      }, 0);

      if (total > 0 && total < 12) {
        return new Error("Column spans must add up to 12. Current total is ".concat(total));
      }
    }
  },

  /** @private. This prop must only inherit from parent component */
  divider: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private. This prop must only inherit from parent component */
  gutter: external_prop_types_default.a.number,

  /** @private. This prop should be calculated and set by parent component */
  isFirstChild: external_prop_types_default.a.bool,

  /** @private. This prop should be calculated and set by parent component */
  isLastChild: external_prop_types_default.a.bool,

  /** @private. */
  style: external_prop_types_default.a.object
});

_defineProperty(Row_Row, "defaultProps", {
  alignItems: 'stretch'
});


// CONCATENATED MODULE: ./src/ColumnLayout/ColumnLayoutStyles.js


var ColumnLayoutStyles_Styled = external_styled_components_default.a.div.withConfig({
  displayName: "ColumnLayoutStyles__Styled",
  componentId: "a9oz81-0"
})(["", ";flex-direction:column;"], Object(themes_["mixin"])('reset')('flex'));
var ColumnLayoutStyles_StyledDivider = external_styled_components_default.a.div.withConfig({
  displayName: "ColumnLayoutStyles__StyledDivider",
  componentId: "a9oz81-1"
})(["border-top:", " 1px solid;height:0;"], Object(themes_["variable"])('borderLightColor'));

// CONCATENATED MODULE: ./src/ColumnLayout/ColumnLayout.jsx
function ColumnLayout_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ColumnLayout_typeof = function _typeof(obj) { return typeof obj; }; } else { ColumnLayout_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ColumnLayout_typeof(obj); }

function ColumnLayout_extends() { ColumnLayout_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return ColumnLayout_extends.apply(this, arguments); }

function ColumnLayout_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ColumnLayout_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ColumnLayout_createClass(Constructor, protoProps, staticProps) { if (protoProps) ColumnLayout_defineProperties(Constructor.prototype, protoProps); if (staticProps) ColumnLayout_defineProperties(Constructor, staticProps); return Constructor; }

function ColumnLayout_possibleConstructorReturn(self, call) { if (call && (ColumnLayout_typeof(call) === "object" || typeof call === "function")) { return call; } return ColumnLayout_assertThisInitialized(self); }

function ColumnLayout_getPrototypeOf(o) { ColumnLayout_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ColumnLayout_getPrototypeOf(o); }

function ColumnLayout_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ColumnLayout_setPrototypeOf(subClass, superClass); }

function ColumnLayout_setPrototypeOf(o, p) { ColumnLayout_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ColumnLayout_setPrototypeOf(o, p); }

function ColumnLayout_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ColumnLayout_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








/**
 * `ColumnLayout` provides simple API for laying out content into columns. It is based on flexbox
 * and has 12 columns.
 */

var ColumnLayout_ColumnLayout =
/*#__PURE__*/
function (_Component) {
  ColumnLayout_inherits(ColumnLayout, _Component);

  function ColumnLayout() {
    var _getPrototypeOf2;

    var _this;

    ColumnLayout_classCallCheck(this, ColumnLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = ColumnLayout_possibleConstructorReturn(this, (_getPrototypeOf2 = ColumnLayout_getPrototypeOf(ColumnLayout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    ColumnLayout_defineProperty(ColumnLayout_assertThisInitialized(ColumnLayout_assertThisInitialized(_this)), "cloneRow", function (row, idx) {
      var _this$props = _this.props,
          gutter = _this$props.gutter,
          divider = _this$props.divider,
          children = _this$props.children;
      var isFirstChild = idx === 0;
      var isLastChild = idx === external_react_["Children"].count(children) - 1;
      return Object(external_react_["cloneElement"])(row, {
        gutter: gutter,
        divider: divider === 'vertical',
        isFirstChild: isFirstChild,
        isLastChild: isLastChild
      });
    });

    ColumnLayout_defineProperty(ColumnLayout_assertThisInitialized(ColumnLayout_assertThisInitialized(_this)), "insertDividers", function (acc, row, idx, original) {
      acc.push(row);

      if (_this.props.divider === 'horizontal' && idx < original.length - 1) {
        acc.push(external_react_default.a.createElement(ColumnLayoutStyles_StyledDivider, {
          key: "".concat(idx, "-divider")
        }));
      }

      return acc;
    });

    return _this;
  }

  ColumnLayout_createClass(ColumnLayout, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          elementRef = _this$props2.elementRef;
      var childrenCloned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(this.cloneRow).reduce(this.insertDividers, []);
      return external_react_default.a.createElement(ColumnLayoutStyles_Styled, ColumnLayout_extends({
        "data-test": "column-layout"
      }, Object(themes_["ref"])(elementRef), Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(ColumnLayout.propTypes))), childrenCloned);
    }
  }]);

  return ColumnLayout;
}(external_react_["Component"]);

ColumnLayout_defineProperty(ColumnLayout_ColumnLayout, "propTypes", {
  /** `children` must be `ColumnLayout.Row` elements. */
  children: external_prop_types_default.a.node,

  /** Show dividers between columns. */
  divider: external_prop_types_default.a.oneOf(['none', 'vertical', 'horizontal']),

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Set gutter width in pixels. This is propagated down to its `children`. */
  gutter: external_prop_types_default.a.number
});

ColumnLayout_defineProperty(ColumnLayout_ColumnLayout, "defaultProps", {
  divider: 'none',
  gutter: 30
});

ColumnLayout_defineProperty(ColumnLayout_ColumnLayout, "Row", Row_Row);

ColumnLayout_defineProperty(ColumnLayout_ColumnLayout, "Column", Column);

/* harmony default export */ var src_ColumnLayout_ColumnLayout = (ColumnLayout_ColumnLayout);

// CONCATENATED MODULE: ./src/ColumnLayout/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_ColumnLayout_ColumnLayout; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Row", function() { return Row_Row; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });



/***/ })

/******/ });