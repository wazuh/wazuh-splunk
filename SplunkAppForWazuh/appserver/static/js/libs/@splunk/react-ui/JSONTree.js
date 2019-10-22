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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("tinycolor2");

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

/***/ 99:
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

// EXTERNAL MODULE: external "tinycolor2"
var external_tinycolor2_ = __webpack_require__(12);
var external_tinycolor2_default = /*#__PURE__*/__webpack_require__.n(external_tinycolor2_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/JSONTree/TreeNodeStyles.js




var typeColor = {
  string: Object(themes_["variable"])('JSONTree', 'TreeNode', 'typeColorString'),
  number: Object(themes_["variable"])('JSONTree', 'TreeNode', 'typeColorNumber'),
  boolean: Object(themes_["variable"])('JSONTree', 'TreeNode', 'typeColorBoolean'),
  null: Object(themes_["variable"])('JSONTree', 'TreeNode', 'typeColorNull'),
  object: Object(themes_["variable"])('JSONTree', 'TreeNode', 'typeColorObject')
};
var wrap = Object(external_styled_components_["css"])(["word-break:break-word;word-wrap:break-word;"]);
var TreeNodeStyles_scroll = Object(external_styled_components_["css"])(["white-space:nowrap;"]);
var StyledValue = external_styled_components_default.a.span.withConfig({
  displayName: "TreeNodeStyles__StyledValue",
  componentId: "sc-1o9fa9i-0"
})(["color:", ";", ";"], function (_ref) {
  var valueType = _ref.valueType;
  return typeColor[valueType];
}, function (_ref2) {
  var overflowType = _ref2.overflowType;
  return overflowType === 'wrap' ? wrap : TreeNodeStyles_scroll;
});
var StyledValueInteractiveClickable = external_styled_components_default()(StyledValue.withComponent(Clickable_default.a)).withConfig({
  displayName: "TreeNodeStyles__StyledValueInteractiveClickable",
  componentId: "sc-1o9fa9i-1"
})(["font-family:inherit;&:focus{box-shadow:0 0 1px 2px ", ";outline:0;&:active{box-shadow:none;}}&:hover{background-color:", ";}"], function (props) {
  return external_tinycolor2_default()(Object(themes_["variable"])('focusColor')(props)).setAlpha(0.6).toRgbString();
}, Object(themes_["variable"])('backgroundColorHover'));
var StyledProperty = external_styled_components_default.a.span.withConfig({
  displayName: "TreeNodeStyles__StyledProperty",
  componentId: "sc-1o9fa9i-2"
})(["font-weight:bold;color:", ";"], Object(themes_["variable"])('JSONTree', 'TreeNode', 'propertyColor'));
var StyledExpandLinkClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "TreeNodeStyles__StyledExpandLinkClickable",
  componentId: "sc-1o9fa9i-3"
})(["cursor:pointer;color:", ";font-family:inherit;&:hover{background-color:", ";text-decoration:none;}&:focus{box-shadow:", ";&:active{box-shadow:none;}}"], Object(themes_["variable"])('JSONTree', 'TreeNode', 'expandLinkClickableColor'), Object(themes_["variable"])('backgroundColorHover'), Object(themes_["variable"])('focusShadowInset'));

// CONCATENATED MODULE: ./src/JSONTree/TreeNode.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * An internal container class for expandable tree nodes (objects and arrays).
 */

var TreeNode_JSONTreeNode =
/*#__PURE__*/
function (_Component) {
  _inherits(JSONTreeNode, _Component);

  function JSONTreeNode(props) {
    var _this;

    _classCallCheck(this, JSONTreeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JSONTreeNode).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleExpandClick", function () {
      _this.setState(function (state) {
        return {
          open: !state.open
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickValue", function (e) {
      _this.props.onClickValue(e, {
        key: e.target.dataset.path,
        value: e.target.textContent
      });
    });

    _this.state = {
      open: props.defaultOpen
    };
    _this.regularIndent = Object(external_lodash_["fill"])(Array(props.indentLevel), Object(external_lodash_["repeat"])("\xA0", props.indent));
    _this.closingIndent = Object(external_lodash_["fill"])(Array(props.indentLevel - 1), Object(external_lodash_["repeat"])("\xA0", props.indent));
    return _this;
  }

  _createClass(JSONTreeNode, [{
    key: "renderExpandLink",
    value: function renderExpandLink() {
      return external_react_default.a.createElement(StyledExpandLinkClickable, {
        onClick: this.handleExpandClick,
        "aria-expanded": this.state.open,
        "data-test": "toggle"
      }, "\xA0", this.state.open ? '[-]' : '[+]', "\xA0");
    }
  }, {
    key: "renderValue",
    value: function renderValue(value, propertyDataPath) {
      var _this$props = this.props,
          indent = _this$props.indent,
          indentLevel = _this$props.indentLevel,
          onClickValue = _this$props.onClickValue,
          expandChildren = _this$props.expandChildren,
          overflow = _this$props.overflow;
      var isPrimitive = !Object(external_lodash_["isObject"])(value); // isObject is true for arrays

      var representation = value; // determine if value should be represented as a simple string
      // or as a child node

      if (!isPrimitive) {
        if (Object(external_lodash_["isEmpty"])(value)) {
          representation = Object(external_lodash_["isArray"])(value) ? '[]' : '{}';
        } else {
          representation = external_react_default.a.createElement(JSONTreeNode, {
            obj: value,
            dataPath: propertyDataPath,
            defaultOpen: expandChildren,
            expandChildren: expandChildren,
            onClickValue: onClickValue,
            indent: indent,
            indentLevel: indentLevel + 1,
            overflow: overflow
          });
        }
      } else if (typeof value === 'string') {
        representation = "\"".concat(value, "\"");
      } else if (typeof value === 'boolean') {
        representation = value.toString();
      } else if (value === null) {
        representation = 'null';
      } // for string or number representations, apply styles and optional interactivity


      if (Object(external_lodash_["isString"])(representation) || Object(external_lodash_["isNumber"])(representation)) {
        if (onClickValue) {
          return external_react_default.a.createElement(StyledValueInteractiveClickable, {
            valueType: value === null ? 'null' : _typeof(value),
            overflowType: overflow,
            onClick: this.handleClickValue,
            "data-path": propertyDataPath
          }, representation);
        }

        return external_react_default.a.createElement(StyledValue, {
          valueType: value === null ? 'null' : _typeof(value),
          overflowType: overflow
        }, representation);
      }

      return representation;
    }
  }, {
    key: "renderObject",
    value: function renderObject() {
      var _this2 = this;

      var _this$props2 = this.props,
          obj = _this$props2.obj,
          dataPath = _this$props2.dataPath;

      if (Object(external_lodash_["isObject"])(obj) || Object(external_lodash_["isArray"])(obj)) {
        return Object(external_lodash_["keys"])(obj).map(function (key, index, properties) {
          var value = obj[key];
          var propertyDataPath = "".concat(dataPath, ".").concat(key);

          var representation = _this2.renderValue(value, propertyDataPath);

          var propertyLabel = !Object(external_lodash_["isArray"])(obj) ? external_react_default.a.createElement("span", null, external_react_default.a.createElement(StyledProperty, null, key), ":", ' ') : null;
          return external_react_default.a.createElement("div", {
            key: propertyDataPath,
            role: "treeitem",
            "data-test-path": propertyDataPath
          }, _this2.regularIndent, propertyLabel, representation, index + 1 < properties.length ? ',' : null);
        });
      } // edge case: a single number/string/boolean being rendered (still valid JSON)


      return external_react_default.a.createElement("div", {
        role: "treeitem",
        "data-test-path": "."
      }, this.renderValue(obj, '.'));
    }
  }, {
    key: "render",
    value: function render() {
      var open = this.state.open;
      var obj = this.props.obj;
      var isExpandable = Object(external_lodash_["isObject"])(obj) && !Object(external_lodash_["isEmpty"])(obj) || Object(external_lodash_["isArray"])(obj) && !obj.length === 0;
      return external_react_default.a.createElement("span", {
        "data-test": isExpandable ? 'node' : null,
        "data-test-expanded": isExpandable ? this.state.open : null
      }, isExpandable && (Object(external_lodash_["isArray"])(obj) ? '[' : '{'), isExpandable && this.renderExpandLink(), !isExpandable || open ? this.renderObject() : null, !isExpandable || open ? this.closingIndent : null, isExpandable && (Object(external_lodash_["isArray"])(obj) ? ']' : '}'));
    }
  }]);

  return JSONTreeNode;
}(external_react_["Component"]);

_defineProperty(TreeNode_JSONTreeNode, "propTypes", {
  /** @private */
  obj: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.array, external_prop_types_default.a.number, external_prop_types_default.a.string, external_prop_types_default.a.bool]),

  /** @private */
  dataPath: external_prop_types_default.a.string,

  /** @private */
  onClickValue: external_prop_types_default.a.func,

  /** @private */
  defaultOpen: external_prop_types_default.a.bool,

  /** @private */
  expandChildren: external_prop_types_default.a.bool,

  /** @private */
  indent: external_prop_types_default.a.number,

  /** @private */
  indentLevel: external_prop_types_default.a.number,

  /** @private */
  overflow: external_prop_types_default.a.oneOf(['wrap', 'scroll'])
});

_defineProperty(TreeNode_JSONTreeNode, "defaultProps", {
  dataPath: '',
  defaultOpen: false,
  expandChildren: false,
  indent: 4,
  indentLevel: 1,
  overflow: 'scroll'
});


// CONCATENATED MODULE: ./src/JSONTree/JSONTreeStyles.js


var base = Object(external_styled_components_["css"])(["", ";font-family:", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('monoFontFamily'));
var StyledScrollCode = external_styled_components_default.a.code.withConfig({
  displayName: "JSONTreeStyles__StyledScrollCode",
  componentId: "aim135-0"
})(["", ";overflow-x:auto;white-space:nowrap;"], base);
var StyledWrapCode = external_styled_components_default.a.code.withConfig({
  displayName: "JSONTreeStyles__StyledWrapCode",
  componentId: "aim135-1"
})(["", ";white-space:pre-wrap;"], base);

// CONCATENATED MODULE: ./src/JSONTree/JSONTree.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







var propTypes = {
  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * The JSON string to visualize. Alternatively, this prop also accepts objects and other
   * possible return types of `JSON.parse`. Note that `JSONTree` doesn't perform any type
   * validation – if the passed value contains circular dependencies, or types not
   * representable in JSON (functions, symbols, …), the component behavior is unspecified.
   */
  json: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.object, external_prop_types_default.a.array, external_prop_types_default.a.number, external_prop_types_default.a.bool]).isRequired,

  /**
   * Number of space characters per level of indentation.
   */
  indent: external_prop_types_default.a.number,

  /**
   * Optional event handler to call if values are clicked on.
   * The function signature is `onClickValue({key, value})`, where `key` is the property path
   * (for example `.a.b`) and `value` the value that was clicked.
   */
  onClickValue: external_prop_types_default.a.func,

  /**
   * Start with all nodes expanded if `true`. The default is `false`, which expands only the first
   * level of properties.
   */
  expandChildren: external_prop_types_default.a.bool,

  /**
   * Handle overflow by either wrapping values or by enabling scrolling.
   */
  overflow: external_prop_types_default.a.oneOf(['wrap', 'scroll'])
};
var defaultProps = {
  indent: 4,
  expandChildren: false,
  overflow: 'scroll'
};
/**
 * Used to visualize a JSON string.
 */

function JSONTree(props) {
  var json = props.json,
      elementRef = props.elementRef,
      expandChildren = props.expandChildren,
      onClickValue = props.onClickValue,
      indent = props.indent,
      overflow = props.overflow,
      otherProps = _objectWithoutProperties(props, ["json", "elementRef", "expandChildren", "onClickValue", "indent", "overflow"]);

  var obj = Object(external_lodash_["isString"])(json) ? JSON.parse(json) : json;
  var StyledCode = overflow === 'wrap' ? StyledWrapCode : StyledScrollCode;
  return external_react_default.a.createElement(StyledCode, _extends({
    "data-test": "json-tree",
    "data-language": "language-json"
  }, Object(themes_["ref"])(elementRef), {
    role: "tree"
  }, otherProps), external_react_default.a.createElement(TreeNode_JSONTreeNode, {
    obj: obj,
    defaultOpen: true,
    expandChildren: expandChildren,
    onClickValue: onClickValue,
    indent: indent,
    overflow: overflow
  }));
}
JSONTree.propTypes = propTypes;
JSONTree.defaultProps = defaultProps;
// CONCATENATED MODULE: ./src/JSONTree/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return JSONTree; });


/***/ })

/******/ });