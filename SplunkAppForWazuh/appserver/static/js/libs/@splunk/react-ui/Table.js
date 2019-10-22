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
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/themes");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/id");

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Popover");

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/ChevronRight");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Dropdown");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Tooltip");

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Caret");

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Switch");

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/MoreVertical");

/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports) {

module.exports = require("react-resize-detector");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Info");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Sort");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/SortedDown");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/SortedUp");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/ChevronDown");

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */
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

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// EXTERNAL MODULE: external "react-resize-detector"
var external_react_resize_detector_ = __webpack_require__(75);
var external_react_resize_detector_default = /*#__PURE__*/__webpack_require__.n(external_react_resize_detector_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/Table/BodyStyles.js


var Styled = external_styled_components_default.a.tbody.withConfig({
  displayName: "BodyStyles__Styled",
  componentId: "sc-19lnobp-0"
})(["", ";"], Object(themes_["mixin"])('reset')('table-row-group'));

// CONCATENATED MODULE: ./src/Table/Body.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Body_Body =
/*#__PURE__*/
function (_Component) {
  _inherits(Body, _Component);

  function Body() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Body);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Body)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragStart", function (dragIndex, dragDataId) {
      _this.rect = _this.el.parentElement.parentElement.getBoundingClientRect();
      _this.rowHeight = _this.el.children[0].getBoundingClientRect().height;

      _this.setState({
        dragIndex: dragIndex,
        dragDataId: dragDataId
      });

      window.addEventListener('dragenter', _this.handleDragEnter);
      window.addEventListener('dragover', _this.handleDragOver);
      window.addEventListener('drop', _this.handleDrop);
      window.addEventListener('dragend', _this.handleDragEnd);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragOver", function (e) {
      e.preventDefault(); // necessary for the drop event to fire

      e.dataTransfer.dropEffect = 'move';
      var y = e.clientY;

      _this.updateScrollPosition(y);

      _this.updateDragPositon(y);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragEnter", function (e) {
      e.preventDefault(); // necessary for the drop event to fire

      _this.setState({
        dragPosition: e.clientY
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDrop", function (e) {
      e.preventDefault(); // necessary to prevent cell from animating to original position;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragEnd", function () {
      var _this$state = _this.state,
          dragIndex = _this$state.dragIndex,
          dragDataId = _this$state.dragDataId;

      var guidelineIndex = _this.calculateGuideIndex(); // The new index is not necessarily the same as the guidelineIndex


      var toIndex = dragIndex < guidelineIndex ? guidelineIndex - 1 : guidelineIndex;

      if (dragIndex !== toIndex) {
        _this.props.onRequestMoveRow({
          fromIndex: dragIndex,
          toIndex: toIndex,
          dataId: dragDataId
        });
      }

      _this.setState({
        dragPosition: null
      });

      _this.cleanupDrag();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onRequestMoveRow", function (_ref) {
      var dataId = _ref.dataId,
          fromIndex = _ref.fromIndex,
          toIndex = _ref.toIndex;

      _this.setState({
        dragDataId: dataId
      });

      if (toIndex < _this.props.children.length) {
        _this.props.onRequestMoveRow({
          fromIndex: fromIndex,
          toIndex: toIndex,
          dataId: dataId
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;

      if (_this.props.elementRef) {
        _this.props.elementRef(el);
      }
    });

    _this.state = {
      expanded: [],
      dragDataId: undefined,
      dragIndex: undefined,
      dragPosition: null
    };
    _this.updateDragPositon = Object(external_lodash_["throttle"])(_this.updateDragPositon, 100, {
      trailing: false
    });
    return _this;
  }

  _createClass(Body, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanupDrag();
    }
  }, {
    key: "handleRowExpansion",
    value: function handleRowExpansion(key) {
      var current = this.state.expanded;

      if (this.props.rowExpansion === 'single') {
        if (Object(external_lodash_["includes"])(current, key)) {
          this.setState({
            expanded: []
          });
        } else {
          this.setState({
            expanded: [key]
          });
        }
      } else if (this.props.rowExpansion === 'multi') {
        if (Object(external_lodash_["includes"])(current, key)) {
          this.setState({
            expanded: Object(external_lodash_["without"])(current, key)
          });
        } else {
          this.setState({
            expanded: current.concat(key)
          });
        }
      }
    }
  }, {
    key: "calculateGuideIndex",
    value: function calculateGuideIndex() {
      var _this$state2 = this.state,
          dragIndex = _this$state2.dragIndex,
          dragPosition = _this$state2.dragPosition;

      if (dragPosition === null || !this.el) {
        return -1;
      }

      this.rows = Array.prototype.slice.call(this.el.children);
      var overIndex = Object(external_lodash_["findIndex"])(this.rows, function (row) {
        var rect = row.getBoundingClientRect();
        return dragPosition > rect.top && dragPosition < rect.bottom;
      });

      if (overIndex === -1) {
        // must be too far left or right;
        var rect = this.el.getBoundingClientRect();
        return dragPosition < rect.top ? 0 : this.rows.length;
      }

      if (overIndex > dragIndex) {
        return overIndex + 1;
      }

      return overIndex;
    }
  }, {
    key: "updateDragPositon",
    value: function updateDragPositon(dragPosition) {
      this.setState({
        dragPosition: dragPosition
      });
    }
  }, {
    key: "updateScrollPosition",
    value: function updateScrollPosition(y) {
      var rect = this.rect;

      if (y < rect.top + this.rowHeight * 2 + 5) {
        this.el.parentElement.parentElement.scrollTop = this.el.parentElement.parentElement.scrollTop - 1;
      }
    }
  }, {
    key: "cleanupDrag",
    value: function cleanupDrag() {
      window.removeEventListener('dragenter', this.handleDragEnter);
      window.removeEventListener('dragover', this.handleDragOver);
      window.removeEventListener('drop', this.handleDrop);
      window.removeEventListener('dragend', this.handleDragEnd);
      this.updateDragPositon.cancel();
      this.rows = null;
      this.rect = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          elementRef = _this$props.elementRef,
          actions = _this$props.actions,
          onRequestMoveColumn = _this$props.onRequestMoveColumn,
          onRequestMoveRow = _this$props.onRequestMoveRow,
          rowExpansion = _this$props.rowExpansion,
          stripeRows = _this$props.stripeRows,
          scrollContainer = _this$props.scrollContainer,
          otherProps = _objectWithoutProperties(_this$props, ["children", "elementRef", "actions", "onRequestMoveColumn", "onRequestMoveRow", "rowExpansion", "stripeRows", "scrollContainer"]);

      var rows = [];
      var guidelineRowIndex = this.calculateGuideIndex();
      var activeElementId = this.state.dragDataId || undefined;
      external_react_["Children"].forEach(children, function (child, i) {
        var showRowGuideline = 'none';

        if (guidelineRowIndex === children.length && i + 1 === children.length) {
          showRowGuideline = 'after';
        } else if (guidelineRowIndex === i) {
          showRowGuideline = 'before';
        }

        if (child) {
          if (false) {}

          var key = child.key;
          var oddOrEven = i % 2 ? 'even' : 'odd';
          var stripe = stripeRows ? oddOrEven : 'none';
          var expanded = Object(external_lodash_["includes"])(_this2.state.expanded, key);
          rows.push(Object(external_react_["cloneElement"])(child, {
            index: i,
            showRowGuideline: showRowGuideline,
            stripe: stripe,
            actions: actions,
            expanded: expanded,
            expandable: rowExpansion !== 'none',
            draggable: !!onRequestMoveRow,
            onExpansion: function onExpansion() {
              return _this2.handleRowExpansion(key);
            },
            onRequestMoveColumn: onRequestMoveColumn,
            onRequestMoveRow: onRequestMoveRow && _this2.onRequestMoveRow,
            onDragStart: onRequestMoveRow && _this2.handleDragStart,
            key: child.key || child.props.dataId || i,
            dataId: child.key || child.props.dataId || i,
            activeElementId: activeElementId,
            scrollContainer: scrollContainer
          }));

          if (expanded && child.props.expansionRow) {
            external_react_["Children"].forEach(child.props.expansionRow, function (expansionRow, index) {
              return rows.push(Object(external_react_["cloneElement"])(expansionRow, {
                key: "".concat(key, "-expansion-").concat(index),
                stripe: stripe,
                onRequestMoveColumn: onRequestMoveColumn,
                onRequestMoveRow: onRequestMoveRow,
                'data-expansion-row': 'true'
              }));
            });
          }
        }
      });

      if (rows.length === 0) {
        return null;
      }

      return external_react_default.a.createElement(Styled, _extends({
        "data-test": "body"
      }, otherProps, Object(themes_["ref"])(this.handleMount)), rows);
    }
  }]);

  return Body;
}(external_react_["Component"]);

_defineProperty(Body_Body, "splunkUiType", 'Table.Body');

_defineProperty(Body_Body, "propTypes", {
  /** @private. Generally passed by Table rather than added directly. */
  actions: external_prop_types_default.a.bool,

  /**
   * `children` should be `Table.Row`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private. Generally passed by Table rather than added directly. */
  rowExpansion: external_prop_types_default.a.oneOf(['single', 'multi', 'none']),

  /** @private. Generally passed by Table rather than added directly. */
  onRequestMoveColumn: external_prop_types_default.a.func,

  /** @private. Generally passed by Table rather than added directly. */
  onRequestMoveRow: external_prop_types_default.a.func,

  /** @private. Generally passed by Table rather than added directly. */
  stripeRows: external_prop_types_default.a.bool,

  /** @private. Generally passed by Table rather than added directly. */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string])
});

_defineProperty(Body_Body, "defaultProps", {
  actions: false,
  rowExpansion: 'none',
  stripeRows: false
});

/* harmony default export */ var Table_Body = (Body_Body);
// CONCATENATED MODULE: ./src/Table/CellStyles.js


var tableCellPadding = '28px';
var tableCellTextColor = {
  odd: Object(themes_["variable"])('Table', 'Cell', 'stripeOddTextColor'),
  even: Object(themes_["variable"])('Table', 'Cell', 'stripeEvenTextColor'),
  none: Object(themes_["variable"])('Table', 'Cell', 'stripeNoneTextColor')
};
var CellStyles_Styled = external_styled_components_default.a.td.withConfig({
  displayName: "CellStyles__Styled",
  componentId: "f3fngi-0"
})(["", ";padding:", ";vertical-align:", ";border-left:0 solid transparent;border-right:0 solid transparent;word-wrap:break-word;color:", ";font-size:", ";line-height:", ";&[data-role='expand'],&[data-role='toggle']{vertical-align:top;}&[data-text-align='right']{text-align:right;}&[data-text-align='center']{text-align:center;}&[data-clickable]{cursor:pointer;&:hover{background-color:", ";&[data-role='expand']{color:", ";& > [data-role='expand-container']{background-color:", ";}}&:not([data-role='expand']):not([data-role='toggle']){background-color:", ";}}&:focus{box-shadow:", ";&[data-role='expand']{color:", ";& > [data-role='expand-container']{background-color:", ";}}}}&[data-appearance='link']{color:", ";&:hover{cursor:pointer;box-shadow:", ";}&:focus{color:", ";box-shadow:", ";}}&[data-appearance='rowLink']{color:", ";*:hover > &{cursor:pointer;}}&[data-role='expand']{padding:", ";}&[data-role='drag']{padding-left:0;padding-right:0;padding-top:0;}&[data-role='row-actions']{padding:", ";}[data-expansion-row='true'] > &:first-child{padding-top:calc(", " - ", ");}[data-expansion-row='true'] > &:last-child{padding-bottom:calc(", " / 2);}[data-has-movable-columns='true'] > &:not([data-movable-column='false']){padding-left:calc(", " + 1px);&:first-child{padding-left:", ";}}", ""], Object(themes_["mixin"])('reset')('table-cell'), Object(themes_["variable"])('Table', 'Cell', 'padding'), Object(themes_["variable"])('Table', 'Cell', 'verticalAlign'), function (props) {
  return tableCellTextColor[props.stripe];
}, Object(themes_["variable"])('Table', 'Cell', 'fontSize'), Object(themes_["variable"])('Table', 'Cell', 'lineHeight'), Object(themes_["variable"])('Table', 'Cell', 'clickableBackgroundColor'), Object(themes_["variable"])('Table', 'Cell', 'clickableExpandIconColor'), Object(themes_["variable"])('Table', 'Cell', 'expandContainerHoverBackgroundColor'), Object(themes_["variable"])('Table', 'Cell', 'clickableHoverBackgroundColor'), Object(themes_["variable"])('Table', 'focusShadowInset'), Object(themes_["variable"])('Table', 'Cell', 'clickableExpandIconColor'), Object(themes_["variable"])('Table', 'Cell', 'expandContainerHoverBackgroundColor'), Object(themes_["variable"])('Table', 'Cell', 'linkColor'), Object(themes_["variable"])('focusShadowInset'), Object(themes_["variable"])('Table', 'Cell', 'linkFocusColor'), Object(themes_["variable"])('focusShadowInset'), Object(themes_["variable"])('Table', 'Cell', 'linkColor'), Object(themes_["variable"])('Table', 'Cell', 'expandPadding'), Object(themes_["variable"])('Table', 'Cell', 'rowActionsPadding'), tableCellPadding, Object(themes_["variable"])('spacing'), tableCellPadding, tableCellPadding, tableCellPadding, function (props) {
  return props.disabled && Object(external_styled_components_["css"])(["color:", ";"], Object(themes_["variable"])('Table', 'Cell', 'disabledTextColor'));
});

// CONCATENATED MODULE: ./src/Table/Cell.jsx
function Cell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Cell_typeof = function _typeof(obj) { return typeof obj; }; } else { Cell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Cell_typeof(obj); }

function Cell_extends() { Cell_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Cell_extends.apply(this, arguments); }

function Cell_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Cell_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Cell_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Cell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Cell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Cell_createClass(Constructor, protoProps, staticProps) { if (protoProps) Cell_defineProperties(Constructor.prototype, protoProps); if (staticProps) Cell_defineProperties(Constructor, staticProps); return Constructor; }

function Cell_possibleConstructorReturn(self, call) { if (call && (Cell_typeof(call) === "object" || typeof call === "function")) { return call; } return Cell_assertThisInitialized(self); }

function Cell_getPrototypeOf(o) { Cell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Cell_getPrototypeOf(o); }

function Cell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Cell_setPrototypeOf(subClass, superClass); }

function Cell_setPrototypeOf(o, p) { Cell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Cell_setPrototypeOf(o, p); }

function Cell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Cell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var Cell_Cell =
/*#__PURE__*/
function (_Component) {
  Cell_inherits(Cell, _Component);

  function Cell() {
    var _getPrototypeOf2;

    var _this;

    Cell_classCallCheck(this, Cell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Cell_possibleConstructorReturn(this, (_getPrototypeOf2 = Cell_getPrototypeOf(Cell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Cell_defineProperty(Cell_assertThisInitialized(Cell_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;

      _this.props.elementRef(el);
    });

    Cell_defineProperty(Cell_assertThisInitialized(Cell_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          data = _this$props.data,
          onClick = _this$props.onClick;
      onClick(e, data);
    });

    Cell_defineProperty(Cell_assertThisInitialized(Cell_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          onClick = _this$props2.onClick,
          onKeyDown = _this$props2.onKeyDown;

      if (Object(keyboard_["keycode"])(e) === 'enter') {
        onClick(e, data);
      }

      onKeyDown(e);
    });

    return _this;
  }

  Cell_createClass(Cell, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          align = _this$props3.align,
          appearance = _this$props3.appearance,
          children = _this$props3.children,
          disabled = _this$props3.disabled,
          elementRef = _this$props3.elementRef,
          onClick = _this$props3.onClick,
          onKeyDown = _this$props3.onKeyDown,
          otherProps = Cell_objectWithoutProperties(_this$props3, ["align", "appearance", "children", "disabled", "elementRef", "onClick", "onKeyDown"]);

      var clickable = onClick !== Cell.defaultProps.onClick;
      var defaultAppearance = clickable ? 'link' : 'data';
      return external_react_default.a.createElement(CellStyles_Styled, Cell_extends({
        disabled: disabled ? true : undefined,
        "data-test": "cell",
        onKeyDown: this.handleKeyDown,
        "data-text-align": align,
        "data-appearance": appearance || defaultAppearance,
        "data-clickable": clickable ? true : undefined,
        onClick: this.handleClick
      }, Object(themes_["ref"])(this.handleMount), {
        tabIndex: clickable ? 0 : undefined
      }, otherProps), children);
    }
  }]);

  return Cell;
}(external_react_["Component"]);

Cell_defineProperty(Cell_Cell, "splunkUiType", 'Table.Cell');

Cell_defineProperty(Cell_Cell, "propTypes", {
  /** Align the text in the cell. */
  align: external_prop_types_default.a.oneOf(['left', 'center', 'right']),

  /** The cell's appearance will default to `'link'` when a `onClick` handler is provided.
   * 'data': Is used for regular text and row expansion.
   *      - The text does not turn blue in `enterprise`, `enterpriseDark`, `lite` themes.
   *      - The background color is not lighter on cell hover in `scp` theme.
   * 'link':
   *      - The text is blue and darker on cell hover in `enterprise`, `enterpriseDark`, `lite` themes.
   *      - The `link` appearance is not supported by the `scp` theme.
   * 'rowLink':
   *      - The text is blue and darker on row hover in `enterprise`, `enterpriseDark`, `lite` themes.
   *      - The text is white and the background color of the row is lighter on row hover in `scp` theme.
   * @private. */
  appearance: external_prop_types_default.a.oneOf(['data', 'link', 'rowLink']),

  /** @private. */
  children: external_prop_types_default.a.node,

  /** This data is returned with the onClick events as the second argument. */
  data: external_prop_types_default.a.any,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Providing an `onClick` handler will enable focus, hover and related styles.
   * @excludeTheme scp
   */
  onClick: external_prop_types_default.a.func,

  /** @private. This will be passed through, and will work as expected. */
  onKeyDown: external_prop_types_default.a.func,

  /** @private. Indicates which row the cell lies in. */
  stripe: external_prop_types_default.a.oneOf(['odd', 'even', 'none']),

  /** @private. */
  disabled: external_prop_types_default.a.bool
});

Cell_defineProperty(Cell_Cell, "defaultProps", {
  align: 'left',
  elementRef: function elementRef() {},
  onClick: function onClick() {},
  onKeyDown: function onKeyDown() {},
  stripe: 'none'
});

/* harmony default export */ var Table_Cell = (Cell_Cell);
// EXTERNAL MODULE: external "@splunk/react-icons/Info"
var Info_ = __webpack_require__(76);
var Info_default = /*#__PURE__*/__webpack_require__.n(Info_);

// EXTERNAL MODULE: external "@splunk/react-icons/Caret"
var Caret_ = __webpack_require__(30);
var Caret_default = /*#__PURE__*/__webpack_require__.n(Caret_);

// EXTERNAL MODULE: external "@splunk/react-icons/Sort"
var Sort_ = __webpack_require__(77);
var Sort_default = /*#__PURE__*/__webpack_require__.n(Sort_);

// EXTERNAL MODULE: external "@splunk/react-icons/SortedDown"
var SortedDown_ = __webpack_require__(78);
var SortedDown_default = /*#__PURE__*/__webpack_require__.n(SortedDown_);

// EXTERNAL MODULE: external "@splunk/react-icons/SortedUp"
var SortedUp_ = __webpack_require__(79);
var SortedUp_default = /*#__PURE__*/__webpack_require__.n(SortedUp_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// CONCATENATED MODULE: ./src/Table/DragHandleStyles.js


var StyledDrag = external_styled_components_default.a.div.withConfig({
  displayName: "DragHandleStyles__StyledDrag",
  componentId: "c8ovnl-0"
})(["display:block;width:7px;height:14px;cursor:move;background:", ";opacity:0.5;"], Object(themes_["variable"])('draggableBackground'));

// CONCATENATED MODULE: ./src/Table/DragHandle.jsx






function DragHandle(_ref) {
  var screenReaderContent = _ref.screenReaderContent;
  return external_react_default.a.createElement(StyledDrag, null, external_react_default.a.createElement(ScreenReaderContent_default.a, null, Object(i18n_["_"])(screenReaderContent)));
}

DragHandle.propTypes = {
  screenReaderContent: external_prop_types_default.a.string
};
/* harmony default export */ var Table_DragHandle = (DragHandle);
// CONCATENATED MODULE: ./src/Table/HeadInnerStyles.js


var tableHorizontalSpacing = '12px';
var StyledDragContainer = external_styled_components_default.a.div.withConfig({
  displayName: "HeadInnerStyles__StyledDragContainer",
  componentId: "sc-10okx75-0"
})(["position:absolute;cursor:move;top:", ";left:", ";padding:", ";border-radius:4px;"], Object(themes_["variable"])('Table', 'HeadInner', 'dragContainerTop'), Object(themes_["variable"])('Table', 'HeadInner', 'dragContainerLeft'), Object(themes_["variable"])('Table', 'HeadInner', 'dragContainerPadding'));
var StyledMenuIcon = external_styled_components_default.a.span.withConfig({
  displayName: "HeadInnerStyles__StyledMenuIcon",
  componentId: "sc-10okx75-1"
})(["color:", ";padding:", ";position:relative;"], Object(themes_["variable"])('Table', 'HeadInner', 'menuIconColor'), Object(themes_["variable"])('Table', 'HeadInner', 'menuIconPadding'));
var StyledLabel = external_styled_components_default.a.span.withConfig({
  displayName: "HeadInnerStyles__StyledLabel",
  componentId: "sc-10okx75-2"
})(["border-radius:", ";flex:0 1 auto;position:relative;overflow:hidden;word-wrap:break-word;color:", ";padding:", ";", " &[data-truncate]{text-overflow:ellipsis;white-space:nowrap;}&[data-fill]{flex:1 0 0px;}&[data-sortable]{padding-right:calc(", " + 4px);}[data-text-align='left'] > &{text-align:left;}[data-text-align='right'] > &{text-align:right;}[data-text-align='center'] > &{text-align:center;}", " + &{margin-left:", ";}"], Object(themes_["variable"])('Table', 'HeadInner', 'borderRadius'), Object(themes_["variable"])('Table', 'HeadInner', 'labelColor'), Object(themes_["variable"])('Table', 'HeadInner', 'labelPadding'), function (props) {
  return props['data-text-align'] === 'right' ? null : Object(external_styled_components_["css"])(["display:flex;justify-content:space-between;"]);
}, tableHorizontalSpacing,
/* sc-sel */
StyledDragContainer, tableHorizontalSpacing);
var HeadInnerStyles_Styled = external_styled_components_default.a.div.withConfig({
  displayName: "HeadInnerStyles__Styled",
  componentId: "sc-10okx75-3"
})(["", ";", ";position:relative;color:", ";font-size:", ";line-height:", ";padding:", ";", " &[data-dragging]{opacity:0;}&[data-draggable]{padding-left:16px;-webkit-user-drag:element;user-select:none;}&[data-clickable]:hover{color:", ";", "}&[data-text-align='left']{justify-content:", ";}&[data-text-align='right']{justify-content:", ";}&[data-text-align='center']{justify-content:center;}&[data-helper]{background-color:", ";position:absolute;left:-10000px;top:-10000px;box-shadow:", ";box-sizing:border-box;background-repeat:repeat-x;border:1px solid ", ";}@media print{background-image:none;}"], Object(themes_["mixin"])('reset')('flex'), Object(themes_["mixin"])('clearfix'), Object(themes_["variable"])('Table', 'HeadInner', 'color'), Object(themes_["variable"])('Table', 'HeadInner', 'fontSize'), Object(themes_["variable"])('Table', 'HeadInner', 'lineHeight'), function (props) {
  return props.toggleAll ? Object(themes_["variable"])('Table', 'HeadInner', 'toggleAllPadding') : Object(themes_["variable"])('Table', 'HeadInner', 'padding');
}, function (props) {
  return props.hasActionsHead && Object(external_styled_components_["css"])(["padding:0;"]);
}, Object(themes_["variable"])('Table', 'HeadInner', 'hoverColor'), function (props) {
  return !props.isMenu && Object(external_styled_components_["css"])(["& > ", "{background-color:", ";}& > ", "{background-color:", ";}"],
  /* sc-sel */
  StyledLabel, Object(themes_["variable"])('Table', 'HeadInner', 'focusBackgroundColor'),
  /* sc-sel */
  StyledDragContainer, Object(themes_["variable"])('Table', 'HeadInner', 'focusBackgroundColor'));
}, function (props) {
  return props.toggleAll ? 'center' : 'flex-start';
}, function (props) {
  return props.toggleAll ? 'center' : 'flex-end';
}, Object(themes_["variable"])('Table', 'HeadInner', 'helperBackgroundColor'), Object(themes_["variable"])('overlayShadow'), Object(themes_["variable"])('borderColor'));
var StyledSortIcon = external_styled_components_default.a.span.withConfig({
  displayName: "HeadInnerStyles__StyledSortIcon",
  componentId: "sc-10okx75-4"
})(["padding-left:", ";position:", ";right:0;top:-1px;color:", ";&[data-sorted]{color:", ";}"], tableHorizontalSpacing, Object(themes_["variable"])('Table', 'HeadInner', 'sortIconPosition'), Object(themes_["variable"])('Table', 'HeadInner', 'sortIconColor'), Object(themes_["variable"])('Table', 'HeadInner', 'sortedIconColor'));
var StyledResize = external_styled_components_default.a.button.withConfig({
  displayName: "HeadInnerStyles__StyledResize",
  componentId: "sc-10okx75-5"
})(["", ";position:absolute;right:-5px;width:9px;top:0;bottom:0;z-index:1;cursor:col-resize;th:last-child > ", " > &{right:0;width:5px;}&::-moz-focus-inner{border:0;padding:0;}&:focus{outline:none;&::before{content:'';position:absolute;background:", ";box-shadow:", ";left:4px;width:1px;top:0;bottom:0;}}"], Object(themes_["mixin"])('reset')('block'),
/* sc-sel */
HeadInnerStyles_Styled, Object(themes_["variable"])('focusColor'), Object(themes_["variable"])('focusShadow'));

// CONCATENATED MODULE: ./src/Table/HeadInner.jsx
function HeadInner_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { HeadInner_typeof = function _typeof(obj) { return typeof obj; }; } else { HeadInner_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return HeadInner_typeof(obj); }

function HeadInner_extends() { HeadInner_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return HeadInner_extends.apply(this, arguments); }

function HeadInner_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HeadInner_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function HeadInner_createClass(Constructor, protoProps, staticProps) { if (protoProps) HeadInner_defineProperties(Constructor.prototype, protoProps); if (staticProps) HeadInner_defineProperties(Constructor, staticProps); return Constructor; }

function HeadInner_possibleConstructorReturn(self, call) { if (call && (HeadInner_typeof(call) === "object" || typeof call === "function")) { return call; } return HeadInner_assertThisInitialized(self); }

function HeadInner_getPrototypeOf(o) { HeadInner_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return HeadInner_getPrototypeOf(o); }

function HeadInner_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) HeadInner_setPrototypeOf(subClass, superClass); }

function HeadInner_setPrototypeOf(o, p) { HeadInner_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return HeadInner_setPrototypeOf(o, p); }

function HeadInner_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function HeadInner_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var HeadInner_HeadInner =
/*#__PURE__*/
function (_Component) {
  HeadInner_inherits(HeadInner, _Component);

  function HeadInner(props) {
    var _getPrototypeOf2;

    var _this;

    HeadInner_classCallCheck(this, HeadInner);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = HeadInner_possibleConstructorReturn(this, (_getPrototypeOf2 = HeadInner_getPrototypeOf(HeadInner)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleResizeKeyDown", function (e) {
      var _this$props = _this.props,
          index = _this$props.index,
          columnId = _this$props.columnId,
          id = _this$props.id;

      if (Object(keyboard_["keycode"])(e) === 'left') {
        var newWidth = Math.max(_this.props.width - 10, 20);

        _this.props.onRequestResize(e, {
          index: index,
          columnId: columnId,
          id: id,
          width: newWidth
        });
      }

      if (Object(keyboard_["keycode"])(e) === 'right') {
        var _newWidth = _this.props.width + 10;

        _this.props.onRequestResize(e, {
          index: index,
          columnId: columnId,
          id: id,
          width: _newWidth
        });
      }
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleStartResize", function (e) {
      e.preventDefault(); // prevent text selection

      _this.setState({
        startClientX: e.clientX,
        startWidth: _this.props.width,
        resizing: true
      });
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleResize", function (e) {
      var _this$state = _this.state,
          startClientX = _this$state.startClientX,
          startWidth = _this$state.startWidth;
      var _this$props2 = _this.props,
          index = _this$props2.index,
          columnId = _this$props2.columnId,
          id = _this$props2.id;
      var change = startClientX - e.clientX;
      var width = Math.max(startWidth - change, 16);

      _this.props.onRequestResize(e, {
        index: index,
        columnId: columnId,
        id: id,
        width: width
      });
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleEndResize", function () {
      _this.setState({
        resizing: false
      });
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleDragStart", function (e) {
      if (e.dataTransfer.setDragImage) {
        // not supported in IE11
        var rect = _this.el.parentElement.getBoundingClientRect();

        _this.cloneEl = _this.el.cloneNode(true);
        _this.cloneEl.style.width = "".concat(rect.width, "px");
        _this.cloneEl.style.height = "".concat(rect.height, "px");

        _this.cloneEl.setAttribute('data-helper', 'true');

        document.body.appendChild(_this.cloneEl);
        e.dataTransfer.setDragImage(_this.cloneEl, e.clientX - rect.left, e.clientY - rect.top);

        _this.setState({
          isDragging: true
        });
      }

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', _this.el.textContent); // Required for Firefox

      _this.props.onDragStart(_this.props.index, _this.props.columnId);
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleDragEnd", function () {
      _this.cleanupDrag();

      _this.setState({
        isDragging: false
      });

      _this.props.onDragEnd();
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleAutosizeColumn", function (e) {
      var _this$props3 = _this.props,
          index = _this$props3.index,
          columnId = _this$props3.columnId;

      _this.props.onAutosizeColumn(e, {
        index: index,
        columnId: columnId
      });
    });

    HeadInner_defineProperty(HeadInner_assertThisInitialized(HeadInner_assertThisInitialized(_this)), "handleDoubleClick", function (e) {
      var _this$props4 = _this.props,
          index = _this$props4.index,
          columnId = _this$props4.columnId;

      _this.props.onAutosizeColumn(e, {
        index: index,
        columnId: columnId
      });
    });

    _this.state = {
      resizing: false,
      isDragging: false
    };
    return _this;
  }

  HeadInner_createClass(HeadInner, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanupDrag();
    }
  }, {
    key: "cleanupDrag",
    value: function cleanupDrag() {
      if (this.cloneEl) {
        if (this.cloneEl.remove) {
          this.cloneEl.remove();
        } else {
          this.cloneEl.parentNode.removeChild(this.cloneEl); // IE
        }

        this.cloneEl = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          align = _this$props5.align,
          label = _this$props5.label,
          hasActionsHead = _this$props5.hasActionsHead,
          isMenu = _this$props5.isMenu,
          onDragStart = _this$props5.onDragStart,
          onRequestResize = _this$props5.onRequestResize,
          resizable = _this$props5.resizable,
          sortDir = _this$props5.sortDir,
          truncate = _this$props5.truncate,
          toggleAll = _this$props5.toggleAll;
      var draggable = !!onDragStart;
      return external_react_default.a.createElement(HeadInnerStyles_Styled, HeadInner_extends({
        draggable: draggable || undefined,
        onDragStart: draggable ? this.handleDragStart : undefined,
        onDragEnd: draggable ? this.handleDragEnd : undefined,
        toggleAll: toggleAll || undefined,
        hasActionsHead: hasActionsHead || undefined
      }, Object(themes_["ref"])(this.handleMount), {
        "data-text-align": align,
        "data-draggable": draggable || undefined,
        "data-clickable": draggable || sortDir || isMenu || undefined,
        "data-dragging": this.state.isDragging || undefined
      }, Object(external_lodash_["omit"])(this.props, Object.keys(HeadInner.propTypes))), this.state.resizing && external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: "window",
        onMouseUp: this.handleEndResize,
        onMouseMove: this.handleResize
      }), onRequestResize && resizable && external_react_default.a.createElement(StyledResize, {
        onMouseDown: this.handleStartResize,
        onDoubleClick: this.handleDoubleClick,
        onKeyDown: this.handleResizeKeyDown,
        "data-test": "resize"
      }), draggable && external_react_default.a.createElement(StyledDragContainer, {
        "data-role": "drag-container"
      }, external_react_default.a.createElement(Table_DragHandle, {
        screenReaderContent: "Press left or right arrow key to reorder the columns."
      })), external_react_default.a.createElement(StyledLabel, {
        "data-sortable": sortDir || undefined,
        "data-text-align": align,
        "data-truncate": truncate || undefined,
        "data-fill": isMenu || undefined
      }, label, sortDir && external_react_default.a.createElement(StyledSortIcon, {
        "data-sorted": sortDir !== 'none' || undefined
      }, sortDir === 'none' && external_react_default.a.createElement(Sort_default.a, null), sortDir === 'asc' && external_react_default.a.createElement(SortedUp_default.a, null), sortDir === 'desc' && external_react_default.a.createElement(SortedDown_default.a, null)), isMenu && external_react_default.a.createElement(StyledMenuIcon, null, external_react_default.a.createElement(Caret_default.a, {
        screenReaderText: null,
        size: 0.5
      }))));
    }
  }]);

  return HeadInner;
}(external_react_["Component"]);

HeadInner_defineProperty(HeadInner_HeadInner, "propTypes", {
  align: external_prop_types_default.a.oneOf(['left', 'center', 'right']),
  columnId: external_prop_types_default.a.any,
  hasActionsHead: external_prop_types_default.a.bool,
  id: external_prop_types_default.a.string,
  index: external_prop_types_default.a.number,
  isMenu: external_prop_types_default.a.bool,
  label: external_prop_types_default.a.any,
  onAutosizeColumn: external_prop_types_default.a.func,
  onDragStart: external_prop_types_default.a.func,
  // eslint-disable-next-line consistent-return
  onRequestResize: function onRequestResize(props) {
    if (props.onRequestResize && !props.truncate) {
      return new Error('Head cells do not support truncate=false with resizable columns.');
    }
  },
  onDragEnd: external_prop_types_default.a.func,
  resizable: external_prop_types_default.a.bool,
  sortDir: external_prop_types_default.a.string,
  truncate: external_prop_types_default.a.bool,
  toggleAll: external_prop_types_default.a.bool,
  width: external_prop_types_default.a.number
});

HeadInner_defineProperty(HeadInner_HeadInner, "defaultProps", {
  align: 'left',
  isMenu: false,
  resizable: true,
  truncate: true
});

/* harmony default export */ var Table_HeadInner = (HeadInner_HeadInner);
// CONCATENATED MODULE: ./src/Table/HeadCellStyles.js



var HeadCellStyles_Styled = external_styled_components_default.a.th.withConfig({
  displayName: "HeadCellStyles__Styled",
  componentId: "fu1xif-0"
})(["", ";background-color:", ";box-sizing:content-box;text-align:left;vertical-align:", ";& + &{border-left:1px solid ", ";}&:focus{box-shadow:", ";outline:none;&:not([data-role='toggle-all']){& > ", "{& > ", "{background-color:", ";}}& > ", "{& > ", "{background-color:", ";}}}&[data-role='toggle-all']{& [data-role='switch-component']{border-color:", ";}}}&:hover{&[data-role='toggle-all']{& [data-role='switch-component']{border-color:", ";}}}&[data-dragging]{background-color:", ";box-shadow:none;}&[data-role='more-info-head-cell']{& > ", "{& > ", "{padding:", ";}}}&[data-role='actions-head-cell']{& > ", "{& > ", "{padding:1px 8px 0 0;}}}"], Object(themes_["mixin"])('reset')('table-cell'), Object(themes_["variable"])('Table', 'HeadCell', 'backgroundColor'), function (props) {
  return props.toggleAll ? 'middle' : 'top';
}, Object(themes_["variable"])('Table', 'HeadCell', 'borderLeftColor'), Object(themes_["variable"])('Table', 'HeadCell', 'focusShadow'),
/* sc-sel */
HeadInnerStyles_Styled,
/* sc-sel */
StyledLabel, Object(themes_["variable"])('Table', 'HeadCell', 'focusBackgroundColor'),
/* sc-sel */
HeadInnerStyles_Styled,
/* sc-sel */
StyledDragContainer, Object(themes_["variable"])('Table', 'HeadCell', 'focusBackgroundColor'), Object(themes_["variable"])('Table', 'HeadCell', 'toggleAllFocusBorderColor'), Object(themes_["variable"])('Table', 'HeadCell', 'toggleAllFocusBorderColor'), Object(themes_["variable"])('Table', 'HeadCell', 'draggingBackgroundColor'),
/* sc-sel */
HeadInnerStyles_Styled,
/* sc-sel */
StyledLabel, Object(themes_["variable"])('Table', 'HeadCell', 'moreInfoHeadCellPadding'),
/* sc-sel */
HeadInnerStyles_Styled,
/* sc-sel */
StyledLabel);
var StyledGuideLine = external_styled_components_default.a.div.withConfig({
  displayName: "HeadCellStyles__StyledGuideLine",
  componentId: "fu1xif-1"
})(["", ";width:1px;position:absolute;background-color:", ";height:100%;top:0;z-index:1;&[data-position='before']{float:left;", ":not(:first-child) > &{margin-left:-1px;}}&[data-position='after']{right:0;}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Table', 'HeadCell', 'guideLineBackgroundColor'),
/* sc-sel */
HeadCellStyles_Styled);

// CONCATENATED MODULE: ./src/Table/HeadCell.jsx
function HeadCell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { HeadCell_typeof = function _typeof(obj) { return typeof obj; }; } else { HeadCell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return HeadCell_typeof(obj); }

function HeadCell_extends() { HeadCell_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return HeadCell_extends.apply(this, arguments); }

function HeadCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HeadCell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function HeadCell_createClass(Constructor, protoProps, staticProps) { if (protoProps) HeadCell_defineProperties(Constructor.prototype, protoProps); if (staticProps) HeadCell_defineProperties(Constructor, staticProps); return Constructor; }

function HeadCell_possibleConstructorReturn(self, call) { if (call && (HeadCell_typeof(call) === "object" || typeof call === "function")) { return call; } return HeadCell_assertThisInitialized(self); }

function HeadCell_getPrototypeOf(o) { HeadCell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return HeadCell_getPrototypeOf(o); }

function HeadCell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) HeadCell_setPrototypeOf(subClass, superClass); }

function HeadCell_setPrototypeOf(o, p) { HeadCell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return HeadCell_setPrototypeOf(o, p); }

function HeadCell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function HeadCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var HeadCell_HeadCell =
/*#__PURE__*/
function (_Component) {
  HeadCell_inherits(HeadCell, _Component);

  function HeadCell(props) {
    var _this;

    HeadCell_classCallCheck(this, HeadCell);

    _this = HeadCell_possibleConstructorReturn(this, HeadCell_getPrototypeOf(HeadCell).call(this, props));

    HeadCell_defineProperty(HeadCell_assertThisInitialized(HeadCell_assertThisInitialized(_this)), "handleClick", function (e) {
      // ignore clicks on the resize handle
      if (e.target.getAttribute('data-test') !== 'resize' && _this.props.onSort) {
        var _this$props = _this.props,
            sortKey = _this$props.sortKey,
            sortDir = _this$props.sortDir,
            id = _this$props.id,
            index = _this$props.index,
            columnId = _this$props.columnId;

        _this.props.onSort(e, {
          sortKey: sortKey,
          sortDir: sortDir,
          id: id,
          columnId: columnId,
          index: index
        });
      }

      _this.props.onClick();
    });

    HeadCell_defineProperty(HeadCell_assertThisInitialized(HeadCell_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      var _this$props2 = _this.props,
          columnId = _this$props2.columnId,
          index = _this$props2.index,
          onKeyDown = _this$props2.onKeyDown,
          onRequestMoveColumn = _this$props2.onRequestMoveColumn;

      if (e.target.getAttribute('data-test') !== 'resize') {
        if (Object(keyboard_["keycode"])(e) === 'enter') {
          _this.handleClick(e);
        } else if (Object(keyboard_["keycode"])(e) === 'left' && onRequestMoveColumn && index > 0) {
          onRequestMoveColumn({
            fromIndex: index,
            toIndex: index - 1,
            columnId: columnId
          });
        } else if (Object(keyboard_["keycode"])(e) === 'right' && onRequestMoveColumn) {
          onRequestMoveColumn({
            fromIndex: index,
            toIndex: index + 1,
            columnId: columnId
          });
        }
      }

      if (onKeyDown) {
        onKeyDown(e, {
          index: index,
          columnId: columnId
        });
      }
    });

    HeadCell_defineProperty(HeadCell_assertThisInitialized(HeadCell_assertThisInitialized(_this)), "handleDragStart", function (index, columnId) {
      _this.setState({
        isDragging: true
      });

      _this.props.onDragStart(index, columnId);
    });

    HeadCell_defineProperty(HeadCell_assertThisInitialized(HeadCell_assertThisInitialized(_this)), "handleDragEnd", function () {
      _this.setState({
        isDragging: false
      });
    });

    _this.state = {
      isDragging: false
    };
    return _this;
  }

  HeadCell_createClass(HeadCell, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          align = _this$props3.align,
          visible = _this$props3.visible,
          children = _this$props3.children,
          columnId = _this$props3.columnId,
          elementRef = _this$props3.elementRef,
          hasActionsHead = _this$props3.hasActionsHead,
          id = _this$props3.id,
          index = _this$props3.index,
          onClick = _this$props3.onClick,
          onSort = _this$props3.onSort,
          onAutosizeColumn = _this$props3.onAutosizeColumn,
          onDragStart = _this$props3.onDragStart,
          onRequestResize = _this$props3.onRequestResize,
          resizable = _this$props3.resizable,
          sortDir = _this$props3.sortDir,
          showGuideline = _this$props3.showGuideline,
          style = _this$props3.style,
          truncate = _this$props3.truncate,
          toggleAll = _this$props3.toggleAll,
          width = _this$props3.width;
      var draggable = !!onDragStart;
      var hasOnClick = onClick !== HeadCell.defaultProps.onClick;
      var mergedStyle = Object(external_lodash_["merge"])(style, {
        width: width
      });
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return external_react_default.a.createElement(HeadCellStyles_Styled, HeadCell_extends({
        style: mergedStyle
      }, Object(themes_["ref"])(elementRef), {
        "data-test": "head-cell",
        "data-test-label": Object(external_lodash_["isString"])(children) ? children : undefined,
        "data-test-sort-dir": onSort && sortDir,
        id: visible ? id : undefined,
        onClick: onSort || hasOnClick ? this.handleClick : undefined,
        tabIndex: visible && (draggable || onSort || hasOnClick) ? 0 : undefined,
        "data-dragging": this.state.isDragging || undefined,
        toggleAll: toggleAll || undefined
      }, Object(external_lodash_["omit"])(this.props, Object.keys(HeadCell.propTypes)), {
        onKeyDown: draggable || onSort || hasOnClick ? this.handleKeyDown : undefined
      }), external_react_default.a.createElement(Table_HeadInner, {
        label: children,
        align: align,
        columnId: columnId,
        hasActionsHead: hasActionsHead,
        id: id,
        index: index,
        resizable: visible && resizable,
        onDragStart: onDragStart && this.handleDragStart,
        onDragEnd: onDragStart && this.handleDragEnd,
        onAutosizeColumn: onAutosizeColumn,
        onRequestResize: onRequestResize,
        sortDir: onSort && sortDir,
        truncate: truncate,
        toggleAll: toggleAll,
        width: width
      }), showGuideline !== 'none' && external_react_default.a.createElement(StyledGuideLine, {
        "data-position": showGuideline
      }));
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return HeadCell;
}(external_react_["Component"]);

HeadCell_defineProperty(HeadCell_HeadCell, "splunkUiType", 'Table.HeadCell');

HeadCell_defineProperty(HeadCell_HeadCell, "propTypes", {
  /** Align the text in the label. */
  align: external_prop_types_default.a.oneOf(['left', 'center', 'right']),

  /** @private. */
  children: external_prop_types_default.a.node,

  /**
   * An id that will be returned in the draggable, sort and resize events.
   */
  columnId: external_prop_types_default.a.any,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private Indicates the presence of actions. */
  hasActionsHead: external_prop_types_default.a.bool,

  /** @private */
  id: external_prop_types_default.a.string,

  /** @private The index of the cell, skipping the info column. */
  index: external_prop_types_default.a.number,

  /** @private. */
  onAutosizeColumn: external_prop_types_default.a.func,

  /**
   * A callback invoked when this head cell is clicked. If provided, this HeadCell will be
   * sortable and render the appropriate user interface.
   */
  onSort: external_prop_types_default.a.func,

  /** @private. */
  onDragStart: external_prop_types_default.a.func,

  /**
   * @private. This will be passed through, and will work as expected.
   */
  onKeyDown: external_prop_types_default.a.func,

  /** @private. */
  onClick: external_prop_types_default.a.func,

  /** @private. */
  onRequestMoveColumn: external_prop_types_default.a.func,

  /** @private. */
  // eslint-disable-next-line consistent-return
  onRequestResize: external_prop_types_default.a.func,

  /**
   * Allow the user to resize the column when onRequestResize is passed to the `Table`. Set
   * resizable to false to prevent some columns for resizing.
   */
  resizable: external_prop_types_default.a.bool,

  /** @private. */
  showGuideline: external_prop_types_default.a.oneOf(['none', 'before', 'after']),

  /**
   * The current sort direction of this column.
   */
  sortDir: external_prop_types_default.a.oneOf(['asc', 'desc', 'none']),

  /**
   * The `sortKey` will be passed in the data object to the `onSort` callback, if provided.
   */
  sortKey: external_prop_types_default.a.string,

  /** @private */
  style: external_prop_types_default.a.object,

  /**
   * Truncate the text in the label. `truncate=false` is not compatible with `Table`'s
   * `onRequestResize`.
   */
  truncate: external_prop_types_default.a.bool,

  /**
   * @private
   * Used internally to suppress focus and id when this `HeadCell` is superseded by one in an
   * overlaid `HeadTable` for user interactions.
   */
  visible: external_prop_types_default.a.bool,

  /**
   * The width of the column in pixels.
   */
  width: external_prop_types_default.a.number,

  /** @private. */
  toggleAll: external_prop_types_default.a.bool
});

HeadCell_defineProperty(HeadCell_HeadCell, "defaultProps", {
  align: 'left',
  visible: true,
  onClick: function onClick() {},
  onKeyDown: function onKeyDown() {},
  sortDir: 'none',
  resizable: true,
  showGuideline: 'none',
  truncate: true
});

/* harmony default export */ var Table_HeadCell = (HeadCell_HeadCell);
// EXTERNAL MODULE: external "@splunk/react-icons/ChevronDown"
var ChevronDown_ = __webpack_require__(80);
var ChevronDown_default = /*#__PURE__*/__webpack_require__.n(ChevronDown_);

// EXTERNAL MODULE: external "@splunk/react-icons/ChevronRight"
var ChevronRight_ = __webpack_require__(24);
var ChevronRight_default = /*#__PURE__*/__webpack_require__.n(ChevronRight_);

// EXTERNAL MODULE: external "@splunk/react-icons/MoreVertical"
var MoreVertical_ = __webpack_require__(40);
var MoreVertical_default = /*#__PURE__*/__webpack_require__.n(MoreVertical_);

// EXTERNAL MODULE: external "@splunk/react-ui/Button"
var Button_ = __webpack_require__(16);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@splunk/react-ui/Dropdown"
var Dropdown_ = __webpack_require__(25);
var Dropdown_default = /*#__PURE__*/__webpack_require__.n(Dropdown_);

// EXTERNAL MODULE: external "@splunk/react-ui/Tooltip"
var Tooltip_ = __webpack_require__(26);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip_);

// CONCATENATED MODULE: ./src/Table/RowDragCellStyles.js


var RowDragCellStyles_Styled = external_styled_components_default.a.td.withConfig({
  displayName: "RowDragCellStyles__Styled",
  componentId: "sc-1lbsob8-0"
})(["", ";box-sizing:content-box;touch-action:none;width:", ";& + &{border-left:1px solid ", ";}&:focus{box-shadow:", ";outline:none;}&:hover{box-shadow:", ";outline:none;}&[data-dragging]{background-color:", ";box-shadow:none;}"], Object(themes_["mixin"])('reset')('table-cell'), Object(themes_["variable"])('Table', 'RowDragCell', 'width'), Object(themes_["variable"])('backgroundColor'), Object(themes_["variable"])('focusShadowInset'), Object(themes_["variable"])('focusShadowInset'), Object(themes_["variable"])('Table', 'RowDragCell', 'draggingBackgroundColor'));
var RowDragCellStyles_StyledGuideLine = external_styled_components_default.a.div.withConfig({
  displayName: "RowDragCellStyles__StyledGuideLine",
  componentId: "sc-1lbsob8-1"
})(["", ";width:100%;height:1px;position:absolute;left:0;z-index:1;&[data-position='before']::before{content:' ';border-top:1px solid;border-color:", ";width:100%;height:1px;top:0;position:absolute;}&[data-position='after']{bottom:0;background-color:", ";}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Table', 'RowDragCell', 'guideLineBackgroundColor'), Object(themes_["variable"])('Table', 'RowDragCell', 'guideLineBackgroundColor'));
var RowDragCellStyles_StyledDrag = external_styled_components_default.a.div.withConfig({
  displayName: "RowDragCellStyles__StyledDrag",
  componentId: "sc-1lbsob8-2"
})(["", ";", ";justify-content:center;cursor:move;&[data-dragging]{opacity:0;}&[data-draggable]{padding:", ";-webkit-user-drag:element;user-select:none;}&[data-helper]{background-color:", ";position:absolute;left:-10000px;top:-10000px;box-shadow:", ";box-sizing:border-box;background-repeat:repeat-x;border:1px solid ", ";}@media print{background-image:none;}"], Object(themes_["mixin"])('reset')('flex'), Object(themes_["mixin"])('clearfix'), Object(themes_["variable"])('Table', 'RowDragCell', 'draggablePadding'), Object(themes_["variable"])('Table', 'RowDragCell', 'helperBackgroundColor'), Object(themes_["variable"])('overlayShadow'), Object(themes_["variable"])('borderColor'));

// CONCATENATED MODULE: ./src/Table/RowDragCell.jsx
function RowDragCell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { RowDragCell_typeof = function _typeof(obj) { return typeof obj; }; } else { RowDragCell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return RowDragCell_typeof(obj); }

function RowDragCell_extends() { RowDragCell_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return RowDragCell_extends.apply(this, arguments); }

function RowDragCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RowDragCell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RowDragCell_createClass(Constructor, protoProps, staticProps) { if (protoProps) RowDragCell_defineProperties(Constructor.prototype, protoProps); if (staticProps) RowDragCell_defineProperties(Constructor, staticProps); return Constructor; }

function RowDragCell_possibleConstructorReturn(self, call) { if (call && (RowDragCell_typeof(call) === "object" || typeof call === "function")) { return call; } return RowDragCell_assertThisInitialized(self); }

function RowDragCell_getPrototypeOf(o) { RowDragCell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RowDragCell_getPrototypeOf(o); }

function RowDragCell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) RowDragCell_setPrototypeOf(subClass, superClass); }

function RowDragCell_setPrototypeOf(o, p) { RowDragCell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RowDragCell_setPrototypeOf(o, p); }

function RowDragCell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RowDragCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var RowDragCell_RowDragCell =
/*#__PURE__*/
function (_Component) {
  RowDragCell_inherits(RowDragCell, _Component);

  function RowDragCell() {
    var _getPrototypeOf2;

    var _this;

    RowDragCell_classCallCheck(this, RowDragCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = RowDragCell_possibleConstructorReturn(this, (_getPrototypeOf2 = RowDragCell_getPrototypeOf(RowDragCell)).call.apply(_getPrototypeOf2, [this].concat(args)));

    RowDragCell_defineProperty(RowDragCell_assertThisInitialized(RowDragCell_assertThisInitialized(_this)), "state", {
      isDragging: false
    });

    RowDragCell_defineProperty(RowDragCell_assertThisInitialized(RowDragCell_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;
    });

    RowDragCell_defineProperty(RowDragCell_assertThisInitialized(RowDragCell_assertThisInitialized(_this)), "handleDragStart", function (e) {
      e.stopPropagation();

      if (e.dataTransfer.setDragImage) {
        // not supported in IE11
        var rect = _this.el.parentElement.getBoundingClientRect();

        _this.cloneEl = _this.el.cloneNode(true);
        _this.cloneEl.style.width = "".concat(rect.width, "px");
        _this.cloneEl.style.height = "".concat(rect.height, "px");

        _this.cloneEl.setAttribute('data-helper', 'true');

        document.body.appendChild(_this.cloneEl);
        e.dataTransfer.setDragImage(_this.cloneEl, e.clientX - rect.left, e.clientY - rect.top);

        _this.setState({
          isDragging: true
        });
      }

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', _this.el.textContent); // Required for Firefox

      _this.props.onDragStart(_this.props.index, _this.props.dataId);
    });

    RowDragCell_defineProperty(RowDragCell_assertThisInitialized(RowDragCell_assertThisInitialized(_this)), "handleDragEnd", function () {
      _this.cleanupDrag();

      _this.setState({
        isDragging: false
      });

      _this.props.onDragEnd();
    });

    RowDragCell_defineProperty(RowDragCell_assertThisInitialized(RowDragCell_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      var _this$props = _this.props,
          onRequestMoveRow = _this$props.onRequestMoveRow,
          index = _this$props.index,
          dataId = _this$props.dataId;
      var code = Object(keyboard_["keycode"])(e);

      if (code === 'up' || code === 'down') {
        e.preventDefault();
      }

      if (code === 'enter') {
        _this.handleClick(e);
      } else if (code === 'up' && onRequestMoveRow && index > 0) {
        onRequestMoveRow({
          fromIndex: index,
          toIndex: index - 1,
          dataId: dataId
        });
      } else if (code === 'down' && onRequestMoveRow) {
        onRequestMoveRow({
          fromIndex: index,
          toIndex: index + 1,
          dataId: dataId
        });
      }
    });

    return _this;
  }

  RowDragCell_createClass(RowDragCell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // get handle of the element and add focus
      var _this$props2 = this.props,
          dataId = _this$props2.dataId,
          activeElementId = _this$props2.activeElementId;

      if (dataId === activeElementId) {
        this.el.parentElement.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanupDrag();
    }
  }, {
    key: "cleanupDrag",
    value: function cleanupDrag() {
      if (this.cloneEl) {
        if (this.cloneEl.remove) {
          this.cloneEl.remove();
        } else {
          this.cloneEl.parentNode.removeChild(this.cloneEl); // IE
        }

        this.cloneEl = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          showRowGuideline = _this$props3.showRowGuideline,
          rowSpan = _this$props3.rowSpan,
          clickableRow = _this$props3.clickableRow;
      return external_react_default.a.createElement(RowDragCellStyles_Styled, {
        align: "center",
        "data-appearance": clickableRow ? 'rowLink' : 'data',
        "data-test": "drag",
        "data-role": "drag",
        tabIndex: 0,
        rowSpan: rowSpan,
        "data-dragging": this.state.isDragging || undefined,
        onKeyDown: this.handleKeyDown,
        onClick: this.handleClick
      }, showRowGuideline !== 'none' && external_react_default.a.createElement(RowDragCellStyles_StyledGuideLine, {
        "data-position": showRowGuideline
      }), external_react_default.a.createElement(RowDragCellStyles_StyledDrag, RowDragCell_extends({
        draggable: true,
        "data-draggable": true,
        "data-clickable": true,
        "data-dragging": this.state.isDragging || undefined,
        onDragStart: this.handleDragStart,
        onDragEnd: this.handleDragEnd
      }, Object(themes_["ref"])(this.handleMount)), external_react_default.a.createElement(Table_DragHandle, {
        screenReaderContent: "Press up or down arrow key to reorder the columns."
      })));
    }
  }]);

  return RowDragCell;
}(external_react_["Component"]);

RowDragCell_defineProperty(RowDragCell_RowDragCell, "propTypes", {
  /**
   * event-handler that is triggered when row drag begins
   */
  onDragStart: external_prop_types_default.a.func,

  /**
   * event-handler that is triggered when row drag ends
   */
  onDragEnd: external_prop_types_default.a.func,

  /**
   * callback for reordering the rows
   */
  onRequestMoveRow: external_prop_types_default.a.func,

  /**
   * index of the data-object in input array
   */
  index: external_prop_types_default.a.number,

  /**
   * unique-ID of the data-object in input array
   */
  dataId: external_prop_types_default.a.string,

  /**
   * dataID of the activeElement or the selected element in DOM
   */
  activeElementId: external_prop_types_default.a.string,

  /**
   * location where the guideline would be displayed
   */
  showRowGuideline: external_prop_types_default.a.oneOf(['none', 'before', 'after']),

  /**
   * event-handler for keyboard events
   */
  onKeyDown: external_prop_types_default.a.func,

  /**
   * no of rows a cell expands to. applies when a table is rendered with expandable rows option
   */
  rowSpan: external_prop_types_default.a.number,

  /** @private. The cell should use the 'rowLink' appearance if the row is clickable. */
  clickableRow: external_prop_types_default.a.bool
});

RowDragCell_defineProperty(RowDragCell_RowDragCell, "defaultProps", {
  showRowGuideline: 'none',
  onKeyDown: function onKeyDown() {},
  onDragEnd: function onDragEnd() {}
});

/* harmony default export */ var Table_RowDragCell = (RowDragCell_RowDragCell);
// CONCATENATED MODULE: ./src/Table/RowStyles.js




var StyledStripeNone = external_styled_components_default.a.tr.withConfig({
  displayName: "RowStyles__StyledStripeNone",
  componentId: "sc-1u33891-0"
})(["", ";border-bottom:", ";background-color:", ";&:hover{& > [data-appearance='rowLink']{cursor:pointer;color:", ";background-color:", ";}&:active{& > [data-appearance='rowLink']{color:", ";background-color:", ";}}}&:focus{& > [data-appearance='rowLink']{color:", ";background-color:", ";}}&[data-clickable]{cursor:pointer;&:hover{background-color:", ";}&:focus{box-shadow:", ";}}@media print{background-color:none;}", " ", ""], Object(themes_["mixin"])('reset')('table-row'), Object(themes_["variable"])('Table', 'Row', 'borderBottom'), Object(themes_["variable"])('Table', 'Row', 'backgroundColor'), Object(themes_["variable"])('Table', 'Row', 'linkHoverColor'), Object(themes_["variable"])('Table', 'Row', 'linkFocusBackgroundColor'), Object(themes_["variable"])('Table', 'Row', 'linkHoverColor'), Object(themes_["variable"])('Table', 'Row', 'linkActiveBackgroundColor'), Object(themes_["variable"])('Table', 'Row', 'linkHoverColor'), Object(themes_["variable"])('Table', 'Row', 'linkFocusBackgroundColor'), Object(themes_["variable"])('Table', 'Row', 'stripeNoneClickableHoverBackgroundColor'), Object(themes_["variable"])('Table', 'focusShadowInset'), function (props) {
  return props.expanded && Object(external_styled_components_["css"])(["border-bottom:none;"]);
}, function (props) {
  return !props.disabled && !props.expandable && Object(external_styled_components_["css"])(["&:not([data-expansion-row='true']){&:hover{background-color:", ";& > [data-clickable='true']{color:", ";}}}"], Object(themes_["variable"])('Table', 'Row', 'stripeHoverBackgroundColor'), Object(themes_["variable"])('Table', 'Row', 'clickableHoverColor'));
});
var StyledStripeOdd = external_styled_components_default()(StyledStripeNone).withConfig({
  displayName: "RowStyles__StyledStripeOdd",
  componentId: "sc-1u33891-1"
})(["background-color:", ";", " ", ""], Object(themes_["variable"])('Table', 'Row', 'stripeOddBackgroundColor'), function (props) {
  return !props.disabled && props.rowSelected && Object(external_styled_components_["css"])(["background-color:", ";& > ", "{color:", ";}", ""], Object(themes_["variable"])('Table', 'Row', 'stripeHoverBackgroundColor'),
  /* sc-sel */
  CellStyles_Styled, Object(themes_["variable"])('Table', 'Row', 'selectedTextColor'), !props.disabled && props.expanded && Object(external_styled_components_["css"])(["& + &{background-color:", ";}"], Object(themes_["variable"])('Table', 'Row', 'stripeHoverBackgroundColor')));
}, function (props) {
  return props.disabled && Object(external_styled_components_["css"])(["background-color:", ";"], Object(themes_["variable"])('Table', 'Row', 'disabledBackgroundColor'));
});
var StyledStripeEven = external_styled_components_default()(StyledStripeNone).withConfig({
  displayName: "RowStyles__StyledStripeEven",
  componentId: "sc-1u33891-2"
})(["background-color:", ";", " ", ""], Object(themes_["variable"])('Table', 'Row', 'stripeEvenBackgroundColor'), function (props) {
  return !props.disabled && props.rowSelected && Object(external_styled_components_["css"])(["background-color:", ";& > ", "{color:", ";}", ""], Object(themes_["variable"])('Table', 'Row', 'stripeHoverBackgroundColor'),
  /* sc-sel */
  CellStyles_Styled, Object(themes_["variable"])('Table', 'Row', 'selectedTextColor'), !props.disabled && props.expanded && Object(external_styled_components_["css"])(["& + &{background-color:", ";}"], Object(themes_["variable"])('Table', 'Row', 'stripeHoverBackgroundColor')));
}, function (props) {
  return props.disabled && Object(external_styled_components_["css"])(["background-color:", ";"], Object(themes_["variable"])('Table', 'Row', 'disabledBackgroundColor'));
});
var StyledCellExpansion = external_styled_components_default()(Table_Cell).withConfig({
  displayName: "RowStyles__StyledCellExpansion",
  componentId: "sc-1u33891-3"
})(["border-bottom:", ";"], Object(themes_["variable"])('Table', 'Row', 'borderBottom'));
var StyledCellSelection = external_styled_components_default()(Table_Cell).withConfig({
  displayName: "RowStyles__StyledCellSelection",
  componentId: "sc-1u33891-4"
})(["border-bottom:", ";&:hover{& [data-role='switch-component']{border-color:", ";}}&:focus{& [data-role='switch-component']{border-color:", ";}}"], Object(themes_["variable"])('Table', 'Row', 'borderBottom'), Object(themes_["variable"])('Table', 'Row', 'toggleAllFocusBorderColor'), Object(themes_["variable"])('Table', 'Row', 'toggleAllFocusBorderColor'));
var StyledCellSelectionDisabled = external_styled_components_default()(Table_Cell).withConfig({
  displayName: "RowStyles__StyledCellSelectionDisabled",
  componentId: "sc-1u33891-5"
})(["&&{cursor:not-allowed;}"]);
var StyledCellExpansionDisabled = external_styled_components_default()(Table_Cell).withConfig({
  displayName: "RowStyles__StyledCellExpansionDisabled",
  componentId: "sc-1u33891-6"
})(["width:35px;"]);
var StyledExpansionContainer = external_styled_components_default.a.div.withConfig({
  displayName: "RowStyles__StyledExpansionContainer",
  componentId: "sc-1u33891-7"
})(["border-radius:", ";width:", ";padding:", ";"], Object(themes_["variable"])('Table', 'Row', 'borderRadius'), Object(themes_["variable"])('Table', 'Row', 'expandContainerWidth'), Object(themes_["variable"])('Table', 'Row', 'padding'));

// EXTERNAL MODULE: external "@splunk/react-ui/Switch"
var Switch_ = __webpack_require__(33);
var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch_);

// CONCATENATED MODULE: ./src/Table/ToggleStyles.js



var StyledSwitch = external_styled_components_default()(Switch_default.a).withConfig({
  displayName: "ToggleStyles__StyledSwitch",
  componentId: "sc-4r8rj0-0"
})(["margin:", ";justify-content:center;position:", ";top:", ";& [data-role='switch-component']{&:not([disabled]):hover,&:not([disabled]):focus{::before{content:none;}}}"], function (props) {
  return props.allRows ? Object(themes_["variable"])('Table', 'Toggle', 'inHeadMargin') : Object(themes_["variable"])('Table', 'Toggle', 'margin');
}, Object(themes_["variable"])('Table', 'Toggle', 'position'), Object(themes_["variable"])('Table', 'Toggle', 'top'));

// CONCATENATED MODULE: ./src/Table/Toggle.jsx
function Toggle_extends() { Toggle_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Toggle_extends.apply(this, arguments); }

function Toggle_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Toggle_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Toggle_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var propTypes = {
  selected: external_prop_types_default.a.oneOf([true, false, 'some']),
  allRows: external_prop_types_default.a.bool,
  disabled: external_prop_types_default.a.bool
};
var defaultProps = {
  selected: 'no',
  allRows: false
};

function Toggle(props) {
  var selected = props.selected,
      allRows = props.allRows,
      disabled = props.disabled,
      otherProps = Toggle_objectWithoutProperties(props, ["selected", "allRows", "disabled"]);

  return external_react_default.a.createElement(StyledSwitch, Toggle_extends({
    allRows: allRows
  }, otherProps, {
    interactive: false,
    disabled: disabled,
    value: "",
    selected: selected,
    selectedLabel: allRows ? Object(i18n_["_"])('All rows selected') : Object(i18n_["_"])('Row selected'),
    unselectedLabel: allRows ? Object(i18n_["_"])('No rows selected') : Object(i18n_["_"])('Row unselected'),
    someSelectedLabel: Object(i18n_["_"])('Some rows selected')
  }));
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;
/* harmony default export */ var Table_Toggle = (Toggle);
// CONCATENATED MODULE: ./src/Table/Row.jsx
function Row_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Row_typeof = function _typeof(obj) { return typeof obj; }; } else { Row_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Row_typeof(obj); }

function Row_extends() { Row_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Row_extends.apply(this, arguments); }

function Row_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Row_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Row_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Row_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Row_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Row_createClass(Constructor, protoProps, staticProps) { if (protoProps) Row_defineProperties(Constructor.prototype, protoProps); if (staticProps) Row_defineProperties(Constructor, staticProps); return Constructor; }

function Row_possibleConstructorReturn(self, call) { if (call && (Row_typeof(call) === "object" || typeof call === "function")) { return call; } return Row_assertThisInitialized(self); }

function Row_getPrototypeOf(o) { Row_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Row_getPrototypeOf(o); }

function Row_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Row_setPrototypeOf(subClass, superClass); }

function Row_setPrototypeOf(o, p) { Row_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Row_setPrototypeOf(o, p); }

function Row_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Row_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















var StyledStripeComponents = {
  odd: StyledStripeOdd,
  even: StyledStripeEven,
  none: StyledStripeNone
};

var Row_Row =
/*#__PURE__*/
function (_Component) {
  Row_inherits(Row, _Component);

  function Row() {
    var _getPrototypeOf2;

    var _this;

    Row_classCallCheck(this, Row);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Row_possibleConstructorReturn(this, (_getPrototypeOf2 = Row_getPrototypeOf(Row)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Row_defineProperty(Row_assertThisInitialized(Row_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props = _this.props,
          data = _this$props.data,
          onClick = _this$props.onClick;

      if (!e.defaultPrevented) {
        onClick(e, data);
      }
    });

    Row_defineProperty(Row_assertThisInitialized(Row_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          onClick = _this$props2.onClick,
          onKeyDown = _this$props2.onKeyDown;

      if (Object(keyboard_["keycode"])(e) === 'enter' && onClick) {
        onClick(e, data);
      }

      onKeyDown(e);
    });

    Row_defineProperty(Row_assertThisInitialized(Row_assertThisInitialized(_this)), "handleToggle", function (e) {
      var _this$props3 = _this.props,
          data = _this$props3.data,
          disabled = _this$props3.disabled,
          onRequestToggle = _this$props3.onRequestToggle;

      if (!disabled) {
        e.preventDefault();
        onRequestToggle(e, data);
      }
    });

    Row_defineProperty(Row_assertThisInitialized(Row_assertThisInitialized(_this)), "renderActionPrimary", function () {
      var actionsPrimary = _this.props.actionsPrimary;

      if (actionsPrimary && actionsPrimary.props.onClick) {
        return Object(external_react_["cloneElement"])(actionsPrimary, {
          onClick: function onClick(e) {
            e.preventDefault();
            return actionsPrimary.props.onClick(e, _this.props.data);
          }
        });
      }

      return actionsPrimary;
    });

    Row_defineProperty(Row_assertThisInitialized(Row_assertThisInitialized(_this)), "renderActionSecondary", function () {
      var actionsSecondary = _this.props.actionsSecondary;

      if (actionsSecondary && actionsSecondary.props.children) {
        var actions = external_react_["Children"].toArray(actionsSecondary.props.children).filter(external_react_["isValidElement"]);
        var clonedActions = actions.map(function (action) {
          if (action.props.onClick) {
            return Object(external_react_["cloneElement"])(action, {
              onClick: function onClick(e) {
                return action.props.onClick(e, _this.props.data);
              }
            });
          }

          return action;
        });
        return Object(external_react_["cloneElement"])(actionsSecondary, {
          children: clonedActions
        });
      }

      return actionsSecondary;
    });

    return _this;
  }

  Row_createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          actionsPrimary = _this$props4.actionsPrimary,
          actionsSecondary = _this$props4.actionsSecondary,
          children = _this$props4.children,
          disabled = _this$props4.disabled,
          elementRef = _this$props4.elementRef,
          expandable = _this$props4.expandable,
          expanded = _this$props4.expanded,
          expansionRow = _this$props4.expansionRow,
          actions = _this$props4.actions,
          onExpansion = _this$props4.onExpansion,
          onClick = _this$props4.onClick,
          onKeyDown = _this$props4.onKeyDown,
          onRequestToggle = _this$props4.onRequestToggle,
          onRequestMoveColumn = _this$props4.onRequestMoveColumn,
          onRequestMoveRow = _this$props4.onRequestMoveRow,
          onDragStart = _this$props4.onDragStart,
          index = _this$props4.index,
          dataId = _this$props4.dataId,
          activeElementId = _this$props4.activeElementId,
          draggable = _this$props4.draggable,
          showRowGuideline = _this$props4.showRowGuideline,
          selected = _this$props4.selected,
          stripe = _this$props4.stripe,
          scrollContainer = _this$props4.scrollContainer,
          otherProps = Row_objectWithoutProperties(_this$props4, ["actionsPrimary", "actionsSecondary", "children", "disabled", "elementRef", "expandable", "expanded", "expansionRow", "actions", "onExpansion", "onClick", "onKeyDown", "onRequestToggle", "onRequestMoveColumn", "onRequestMoveRow", "onDragStart", "index", "dataId", "activeElementId", "draggable", "showRowGuideline", "selected", "stripe", "scrollContainer"]);

      var childrenCloned = !onClick ? external_react_["Children"].toArray(children).map(function (child) {
        return Object(external_react_["cloneElement"])(child, {
          disabled: disabled
        });
      }) // ensure consistent keys
      : external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (child) {
        return Object(external_react_["cloneElement"])(child, {
          appearance: 'rowLink',
          disabled: disabled
        });
      });
      var StyledStripe = StyledStripeComponents[stripe];
      var StyledCellToggle = disabled ? StyledCellSelectionDisabled : StyledCellSelection;
      var rowSpan = expanded ? external_react_["Children"].count(expansionRow) + 1 : null;
      var dataMovableColumn = onRequestMoveColumn ? 'false' : undefined;
      var actionsSecondaryToggle = external_react_default.a.createElement(Tooltip_default.a, {
        content: Object(i18n_["_"])('Actions')
      }, external_react_default.a.createElement(Button_default.a, {
        "aria-label": Object(i18n_["_"])('Actions'),
        appearance: "secondary",
        "data-test": "actions-secondary-toggle",
        icon: external_react_default.a.createElement(MoreVertical_default.a, {
          size: 1.4,
          hideDefaultTooltip: true
        })
      }));
      return external_react_default.a.createElement(StyledStripe, Row_extends({
        "data-test": "row",
        "data-test-selected": onRequestToggle ? selected : undefined,
        "data-clickable": onClick ? true : undefined,
        "data-has-movable-columns": onRequestMoveColumn ? 'true' : undefined,
        disabled: disabled ? true : undefined,
        expandable: expandable,
        expanded: expanded
      }, Object(themes_["ref"])(elementRef), {
        tabIndex: onClick ? 0 : undefined
      }, otherProps, {
        onClick: onClick ? this.handleClick : undefined,
        onKeyDown: this.handleKeyDown,
        rowSelected: onRequestToggle && selected
      }), draggable && external_react_default.a.createElement(Table_RowDragCell, {
        activeElementId: activeElementId,
        clickableRow: onClick ? true : undefined,
        dataId: dataId,
        "data-movable-column": dataMovableColumn,
        draggable: draggable,
        index: index,
        onRequestMoveRow: onRequestMoveRow,
        onDragStart: onDragStart,
        rowSpan: rowSpan,
        showRowGuideline: showRowGuideline
      }), onRequestToggle && external_react_default.a.createElement(StyledCellToggle, {
        appearance: onClick ? 'rowLink' : 'data',
        "data-test": "toggle",
        "data-role": "toggle",
        "data-movable-column": dataMovableColumn,
        onClick: this.handleToggle,
        rowSpan: rowSpan
      }, external_react_default.a.createElement(ScreenReaderContent_default.a, null, selected === true && Object(i18n_["_"])('Row selected'), selected === false && Object(i18n_["_"])('Row unselected')), external_react_default.a.createElement(Table_Toggle, {
        disabled: disabled,
        selected: selected,
        onClick: this.handleToggleFocus
      })), expandable && expansionRow && external_react_default.a.createElement(StyledCellExpansion, {
        "data-test": "expand",
        "data-role": "expand",
        "data-movable-column": dataMovableColumn,
        onClick: onExpansion,
        rowSpan: rowSpan,
        appearance: "data",
        align: "center",
        stripe: stripe
      }, external_react_default.a.createElement(StyledExpansionContainer, {
        "data-role": "expand-container"
      }, expanded ? external_react_default.a.createElement(ChevronDown_default.a, null) : external_react_default.a.createElement(ChevronRight_default.a, null))), expandable && !expansionRow && external_react_default.a.createElement(StyledCellExpansionDisabled, {
        "data-role": "expand",
        "data-movable-column": dataMovableColumn
      }), childrenCloned, actions && !actionsPrimary && !actionsSecondary && external_react_default.a.createElement(Table_Cell, {
        align: "right",
        appearance: disabled ? 'data' : 'rowLink',
        "data-test": "row-actions",
        "data-role": "row-actions"
      }), (actionsPrimary || actionsSecondary) && external_react_default.a.createElement(Table_Cell, {
        align: "right",
        appearance: "rowLink",
        "data-test": "row-actions",
        "data-role": "row-actions"
      }, actionsPrimary && this.renderActionPrimary(), actionsSecondary && external_react_default.a.createElement(Dropdown_default.a, {
        onClick: function onClick(e) {
          return e.preventDefault();
        },
        toggle: actionsSecondaryToggle,
        scrollContainer: scrollContainer
      }, this.renderActionSecondary())));
      /* eslint-enable */
    }
  }]);

  return Row;
}(external_react_["Component"]);

Row_defineProperty(Row_Row, "propTypes", {
  /** @private. Generally passed by Table rather than added directly. */
  activeElementId: external_prop_types_default.a.string,

  /**
   * Adds primary actions. It's recommended to use an icon-only button style.
   * The `onClick` handler of each action is passed the event and the `data` prop of this row.
   * @includeTheme scp
   */
  actionsPrimary: external_prop_types_default.a.node,

  /**
   * Adds a secondary actions dropdown menu. This prop should be a `Menu`.
   * The `onClick` handler of each action is passed the event and the `data` prop of this row.
   * @includeTheme scp
   */
  actionsSecondary: external_prop_types_default.a.node,

  /**
   * `children` should be `Table.Cell`.
   */
  children: external_prop_types_default.a.node,

  /** This data is returned with the onClick and toggle events as the second argument. */
  data: external_prop_types_default.a.any,

  /** @private. Generally passed by Table rather than added directly. */
  dataId: external_prop_types_default.a.string,

  /** Indicates whether the row selection is disabled. */
  disabled: external_prop_types_default.a.bool,

  /** @private. Generally passed by Table rather than added directly. */
  draggable: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private. */
  expandable: external_prop_types_default.a.bool,

  /** @private. */
  expanded: external_prop_types_default.a.bool,

  /**
   * An optional row that will be displayed when this row is expanded, or an array of rows.
   */
  expansionRow: external_prop_types_default.a.oneOfType([external_prop_types_default.a.element, external_prop_types_default.a.arrayOf(external_prop_types_default.a.element)]),

  /** @private. Indicates whether the table has an actions column. */
  actions: external_prop_types_default.a.bool,

  /** @private. Generally passed by Table rather than added directly. */
  index: external_prop_types_default.a.number,

  /** Providing an `onClick` handler will enable focus, hover and related styles. */
  onClick: external_prop_types_default.a.func,

  /** @private. Generally passed by Table rather than added directly. */
  onDragStart: external_prop_types_default.a.func,

  /** @private. */
  onExpansion: external_prop_types_default.a.func,

  /** @private. This will be passed through, and will work as expected. */
  onKeyDown: external_prop_types_default.a.func,

  /** @private. Generally passed by Table rather than added directly. */
  onRequestMoveColumn: external_prop_types_default.a.func,

  /** @private. Generally passed by Table rather than added directly. */
  onRequestMoveRow: external_prop_types_default.a.func,

  /**
   * An event handler for toggle of the row. resize of columns. The function is passed the event and the `data` prop for this row.
   */
  onRequestToggle: external_prop_types_default.a.func,

  /**
   * When an `onRequestToggle` handler is defined, this prop determines the appearance
   * of the toggle.
   */
  selected: external_prop_types_default.a.bool,

  /** @private. Generally passed by Table rather than added directly. */
  showRowGuideline: external_prop_types_default.a.oneOf(['none', 'before', 'after']),

  /** @private. */
  stripe: external_prop_types_default.a.oneOf(['odd', 'even', 'none']),

  /** @private. */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string])
});

Row_defineProperty(Row_Row, "defaultProps", {
  actionsPrimary: null,
  actionsSecondary: null,
  stripe: 'none',
  onExpansion: function onExpansion() {},
  onKeyDown: function onKeyDown() {}
});

Row_Row.splunkUiType = 'Table.Row';
/* harmony default export */ var Table_Row = (Row_Row);
// CONCATENATED MODULE: ./src/Table/HeadStyles.js



var HeadStyles_Styled = external_styled_components_default.a.thead.withConfig({
  displayName: "HeadStyles__Styled",
  componentId: "sc-16x022s-0"
})(["", ";"], Object(themes_["mixin"])('reset')('table-header-group'));
var StyledToggleAll = external_styled_components_default()(Table_HeadCell).withConfig({
  displayName: "HeadStyles__StyledToggleAll",
  componentId: "sc-16x022s-1"
})(["width:", ";"], Object(themes_["variable"])('Table', 'Head', 'toggleAllWidth'));
var StyledInfo = external_styled_components_default()(Table_HeadCell).withConfig({
  displayName: "HeadStyles__StyledInfo",
  componentId: "sc-16x022s-2"
})(["width:", ";"], Object(themes_["variable"])('Table', 'Head', 'infoWidth'));

// CONCATENATED MODULE: ./src/Table/Head.jsx
function Head_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Head_typeof = function _typeof(obj) { return typeof obj; }; } else { Head_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Head_typeof(obj); }

function Head_extends() { Head_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Head_extends.apply(this, arguments); }

function Head_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Head_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Head_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Head_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Head_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Head_createClass(Constructor, protoProps, staticProps) { if (protoProps) Head_defineProperties(Constructor.prototype, protoProps); if (staticProps) Head_defineProperties(Constructor, staticProps); return Constructor; }

function Head_possibleConstructorReturn(self, call) { if (call && (Head_typeof(call) === "object" || typeof call === "function")) { return call; } return Head_assertThisInitialized(self); }

function Head_getPrototypeOf(o) { Head_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Head_getPrototypeOf(o); }

function Head_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Head_setPrototypeOf(subClass, superClass); }

function Head_setPrototypeOf(o, p) { Head_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Head_setPrototypeOf(o, p); }

function Head_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Head_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Head_Head =
/*#__PURE__*/
function (_Component) {
  Head_inherits(Head, _Component);

  function Head(props) {
    var _this;

    Head_classCallCheck(this, Head);

    _this = Head_possibleConstructorReturn(this, Head_getPrototypeOf(Head).call(this, props));

    Head_defineProperty(Head_assertThisInitialized(Head_assertThisInitialized(_this)), "onRequestMoveColumn", function (_ref) {
      var columnId = _ref.columnId,
          fromIndex = _ref.fromIndex,
          toIndex = _ref.toIndex;

      if (toIndex < _this.props.children.length) {
        // HeadCell never requests less than zero
        _this.props.onRequestMoveColumn({
          fromIndex: fromIndex,
          toIndex: toIndex,
          columnId: columnId
        });
      }
    });

    Head_defineProperty(Head_assertThisInitialized(Head_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;

      _this.props.elementRef(el);
    });

    Head_defineProperty(Head_assertThisInitialized(Head_assertThisInitialized(_this)), "handleDragStart", function (dragIndex, dragColumnId) {
      _this.setState({
        dragColumnId: dragColumnId
      });

      window.addEventListener('dragend', _this.handleDragEnd);

      _this.props.onDragStart({
        dragIndex: dragIndex
      });
    });

    Head_defineProperty(Head_assertThisInitialized(Head_assertThisInitialized(_this)), "handleDragEnd", function () {
      var dragColumnId = _this.state.dragColumnId;
      var dragIndex = _this.props.dragIndex;

      var guidelineIndex = _this.calculateGuideIndex(); // The new index is not necessarily the same as the guidelineIndex


      var toIndex = dragIndex < guidelineIndex ? guidelineIndex - 1 : guidelineIndex;

      if (dragIndex !== toIndex) {
        _this.props.onRequestMoveColumn({
          fromIndex: dragIndex,
          toIndex: toIndex,
          columnId: dragColumnId
        });
      }

      _this.cleanupDrag();
    });

    _this.state = {
      dragColumnId: undefined // the item being reordered

    };
    return _this;
  }

  Head_createClass(Head, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanupDrag();
    }
  }, {
    key: "getCellWidths",
    value: function getCellWidths() {
      var headRowCells = this.el.firstElementChild.children;
      return Object(external_lodash_["map"])(headRowCells, function (el) {
        var computedStyle = window.getComputedStyle(el);
        return el.clientWidth - parseFloat(computedStyle.getPropertyValue('padding-right')) - parseFloat(computedStyle.getPropertyValue('padding-left'));
      });
    }
  }, {
    key: "getClientHeight",
    value: function getClientHeight() {
      return this.el.clientHeight;
    }
  }, {
    key: "getEl",
    value: function getEl() {
      return this.el;
    }
  }, {
    key: "calculateGuideIndex",
    value: function calculateGuideIndex() {
      var _this$props = this.props,
          dragIndex = _this$props.dragIndex,
          dragPosition = _this$props.dragPosition,
          hasInfoColumn = _this$props.hasInfoColumn,
          hasDragColumn = _this$props.hasDragColumn,
          onRequestToggleAllRows = _this$props.onRequestToggleAllRows;

      if (this.props.dragPosition === null || !this.el) {
        return -1;
      }

      this.cells = Array.prototype.slice.call(this.el.firstElementChild.children).slice(hasInfoColumn ? 1 : 0).slice(hasDragColumn ? 1 : 0).slice(onRequestToggleAllRows ? 1 : 0);
      var overIndex = Object(external_lodash_["findIndex"])(this.cells, function (cell) {
        var rect = cell.getBoundingClientRect();
        return dragPosition > rect.left && dragPosition < rect.right;
      });

      if (overIndex === -1) {
        // must be too far left or right;
        var rect = this.el.getBoundingClientRect();
        return dragPosition < rect.left ? 0 : this.cells.length;
      }

      if (overIndex > dragIndex) {
        return overIndex + 1;
      }

      return overIndex;
    }
  }, {
    key: "cleanupDrag",
    value: function cleanupDrag() {
      window.removeEventListener('dragend', this.handleDragEnd);
      this.cells = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          actions = _this$props2.actions,
          actionsColumnWidth = _this$props2.actionsColumnWidth,
          children = _this$props2.children,
          hasInfoColumn = _this$props2.hasInfoColumn,
          hasDragColumn = _this$props2.hasDragColumn,
          onRequestMoveColumn = _this$props2.onRequestMoveColumn,
          onRequestResizeColumn = _this$props2.onRequestResizeColumn,
          onRequestToggleAllRows = _this$props2.onRequestToggleAllRows,
          rowSelection = _this$props2.rowSelection,
          onAutosizeColumn = _this$props2.onAutosizeColumn,
          otherProps = Head_objectWithoutProperties(_this$props2, ["actions", "actionsColumnWidth", "children", "hasInfoColumn", "hasDragColumn", "onRequestMoveColumn", "onRequestResizeColumn", "onRequestToggleAllRows", "rowSelection", "onAutosizeColumn"]);

      var guidelineIndex = this.calculateGuideIndex();
      var clonedChildren = external_react_["Children"].toArray(children).map(function (child, index, original) {
        var showGuideline = 'none';

        if (guidelineIndex === original.length && index + 1 === original.length) {
          showGuideline = 'after';
        } else if (guidelineIndex === index) {
          showGuideline = 'before';
        }

        return Object(external_react_["cloneElement"])(child, {
          index: index,
          showGuideline: showGuideline,
          onRequestResize: onRequestResizeColumn,
          onDragStart: onRequestMoveColumn && _this2.handleDragStart,
          onRequestMoveColumn: onRequestMoveColumn && _this2.onRequestMoveColumn,
          onAutosizeColumn: onAutosizeColumn,
          key: child.key || child.props.columnId || index
        });
      });
      var toggleStateMap = {
        all: true,
        none: false,
        some: 'some'
      };
      var toggleState = toggleStateMap[rowSelection];
      var defultActionsColumnWidth = actionsColumnWidth || 48;
      return external_react_default.a.createElement(HeadStyles_Styled, Head_extends({}, Object(themes_["ref"])(this.handleMount), {
        "data-test": "head"
      }, Object(external_lodash_["omit"])(otherProps, Object(external_lodash_["keys"])(Head.propTypes))), external_react_default.a.createElement(Table_Row, null, hasDragColumn && external_react_default.a.createElement(Table_HeadCell, {
        key: "drag_rows_head_cell",
        "data-test": "drag-rows-head-cell",
        align: "center",
        width: 32,
        resizable: false
      }), onRequestToggleAllRows && external_react_default.a.createElement(StyledToggleAll, {
        key: "toggleAll",
        "data-test": "toggle-all",
        "data-role": "toggle-all",
        resizable: false,
        onClick: onRequestToggleAllRows,
        toggleAll: true
      }, external_react_default.a.createElement(Table_Toggle, {
        selected: toggleState,
        allRows: true
      })), hasInfoColumn && external_react_default.a.createElement(StyledInfo, {
        key: "more_info_head_cell",
        "data-test": "more-info-head-cell",
        "data-role": "more-info-head-cell",
        align: "center",
        resizable: false
      }, external_react_default.a.createElement(Info_default.a, null)), clonedChildren, actions.length > 0 && external_react_default.a.createElement(Table_HeadCell, {
        hasActionsHead: true,
        key: "actions_head_cell",
        "data-test": "actions-head-cell",
        "data-role": "actions-head-cell",
        align: "right",
        resizable: false,
        width: defultActionsColumnWidth,
        style: {
          minWidth: defultActionsColumnWidth
        }
      }, actions), actions.length === 0 && actionsColumnWidth && external_react_default.a.createElement(Table_HeadCell, {
        key: "actions_head_cell",
        "data-test": "actions-head-cell",
        "data-role": "actions-head-cell",
        align: "right",
        resizable: false,
        width: actionsColumnWidth,
        style: {
          minWidth: actionsColumnWidth
        }
      }, ' ')));
    }
  }]);

  return Head;
}(external_react_["Component"]);

Head_defineProperty(Head_Head, "splunkUiType", 'Table.Head');

Head_defineProperty(Head_Head, "propTypes", {
  /** @private. */
  actions: external_prop_types_default.a.arrayOf(external_prop_types_default.a.node),

  /** @private. */
  actionsColumnWidth: external_prop_types_default.a.number,

  /**
   * `children` should be `Table.HeadCell`.
   */
  // eslint-disable-next-line consistent-return
  children: function children(props) {
    if (props.onRequestResizeColumn) {
      var hasChildWithoutWidth = external_react_["Children"].toArray(props.children).filter(external_react_["isValidElement"]).some(function (child) {
        return !child.props.width;
      });

      if (hasChildWithoutWidth) {
        return new Error('Every Table.HeadCell must have a width prop when using onRequestResizeColumn.');
      }
    }
  },

  /** @private. */
  dragPosition: external_prop_types_default.a.number,

  /** @private. */
  dragIndex: external_prop_types_default.a.number,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** @private. */
  hasDragColumn: external_prop_types_default.a.bool,

  /** @private. */
  hasInfoColumn: external_prop_types_default.a.bool,

  /** @private. */
  onAutosizeColumn: external_prop_types_default.a.func,

  /** @private. */
  onDragStart: external_prop_types_default.a.func,

  /** @private. */
  onRequestMoveColumn: external_prop_types_default.a.func,

  /** @private. */
  onRequestResizeColumn: external_prop_types_default.a.func,

  /** @private. */
  onRequestToggleAllRows: external_prop_types_default.a.func,

  /** @private. */
  rowSelection: external_prop_types_default.a.oneOf(['all', 'some', 'none'])
});

Head_defineProperty(Head_Head, "defaultProps", {
  actions: [],
  elementRef: function elementRef() {}
});

/* harmony default export */ var Table_Head = (Head_Head);
// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

// CONCATENATED MODULE: ./src/Table/HeadDropdownCell.jsx
function HeadDropdownCell_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { HeadDropdownCell_typeof = function _typeof(obj) { return typeof obj; }; } else { HeadDropdownCell_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return HeadDropdownCell_typeof(obj); }

function HeadDropdownCell_extends() { HeadDropdownCell_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return HeadDropdownCell_extends.apply(this, arguments); }

function HeadDropdownCell_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HeadDropdownCell_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function HeadDropdownCell_createClass(Constructor, protoProps, staticProps) { if (protoProps) HeadDropdownCell_defineProperties(Constructor.prototype, protoProps); if (staticProps) HeadDropdownCell_defineProperties(Constructor, staticProps); return Constructor; }

function HeadDropdownCell_possibleConstructorReturn(self, call) { if (call && (HeadDropdownCell_typeof(call) === "object" || typeof call === "function")) { return call; } return HeadDropdownCell_assertThisInitialized(self); }

function HeadDropdownCell_getPrototypeOf(o) { HeadDropdownCell_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return HeadDropdownCell_getPrototypeOf(o); }

function HeadDropdownCell_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) HeadDropdownCell_setPrototypeOf(subClass, superClass); }

function HeadDropdownCell_setPrototypeOf(o, p) { HeadDropdownCell_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return HeadDropdownCell_setPrototypeOf(o, p); }

function HeadDropdownCell_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function HeadDropdownCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var HeadDropdownCell_HeadDropdownCell =
/*#__PURE__*/
function (_Component) {
  HeadDropdownCell_inherits(HeadDropdownCell, _Component);

  /**
   * Enumeration of the possible reasons for closing the Select.
   * 'clickAway', 'escapeKey', and 'offScreen' are inherited from Popover, but repeated here for
   * docs extraction.
   */
  function HeadDropdownCell(props) {
    var _getPrototypeOf2;

    var _this;

    HeadDropdownCell_classCallCheck(this, HeadDropdownCell);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = HeadDropdownCell_possibleConstructorReturn(this, (_getPrototypeOf2 = HeadDropdownCell_getPrototypeOf(HeadDropdownCell)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.setState({
        el: el
      });

      _this.props.elementRef(el);
    });

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleRequestClose", function (_ref) {
      var reason = _ref.reason,
          event = _ref.event;
      var _this$props = _this.props,
          closeReasons = _this$props.closeReasons,
          columnId = _this$props.columnId,
          focusToggleReasons = _this$props.focusToggleReasons,
          index = _this$props.index,
          onRequestClose = _this$props.onRequestClose;

      if (reason === 'clickAway') {
        var el = event.target;

        while (el) {
          // Ignore clicks on toggle.
          if (el === _this.state.el) {
            return;
          }

          el = el.parentNode;
        }
      }

      if (_this.isOpen() && Object(external_lodash_["includes"])(closeReasons, reason)) {
        if (Object(external_lodash_["includes"])(focusToggleReasons, reason)) {
          _this.focus();
        }

        if (!_this.isControlled()) {
          _this.setState({
            open: false
          });
        }

        onRequestClose(event, {
          index: index,
          reason: reason,
          columnId: columnId
        });
      }
    });

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleClick", function (e) {
      var _this$props2 = _this.props,
          columnId = _this$props2.columnId,
          index = _this$props2.index; // ignore clicks on the resize handle

      if (e.target.getAttribute('data-test') === 'resize') {
        return;
      }

      _this.setState({
        clientX: e.clientX || undefined
      });

      if (_this.isOpen()) {
        _this.handleRequestClose({
          reason: 'toggleClick',
          event: e
        });
      } else {
        _this.props.onRequestOpen(e, {
          reason: 'toggleClick',
          columnId: columnId,
          index: index
        });

        if (!_this.isControlled()) {
          _this.setState({
            open: true
          });
        }
      }
    });

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      var _this$props3 = _this.props,
          columnId = _this$props3.columnId,
          index = _this$props3.index,
          onKeyDown = _this$props3.onKeyDown,
          onRequestMoveColumn = _this$props3.onRequestMoveColumn;

      if (e.target.getAttribute('data-test') !== 'resize') {
        if (Object(keyboard_["keycode"])(e) === 'enter') {
          _this.handleClick(e);
        } else if (Object(keyboard_["keycode"])(e) === 'left' && onRequestMoveColumn && index > 0) {
          onRequestMoveColumn({
            fromIndex: index,
            toIndex: index - 1,
            columnId: columnId
          });
        } else if (Object(keyboard_["keycode"])(e) === 'right' && onRequestMoveColumn) {
          onRequestMoveColumn({
            fromIndex: index,
            toIndex: index + 1,
            columnId: columnId
          });
        }
      }

      if (onKeyDown) {
        onKeyDown(e, {
          index: index,
          columnId: columnId
        });
      }
    });

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleContentClick", function (event) {
      _this.handleRequestClose({
        reason: 'contentClick',
        event: event
      });
    });

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleDragStart", function (index, columnId) {
      _this.setState({
        isDragging: true
      });

      _this.props.onDragStart(index, columnId);
    });

    HeadDropdownCell_defineProperty(HeadDropdownCell_assertThisInitialized(HeadDropdownCell_assertThisInitialized(_this)), "handleDragEnd", function () {
      _this.setState({
        isDragging: false
      });
    });

    _this.state = {
      open: false
    };
    _this.popoverId = Object(id_["createDOMID"])('popover');
    _this.cellId = Object(id_["createDOMID"])('cellId');
    return _this;
  }

  HeadDropdownCell_createClass(HeadDropdownCell, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.visible && !this.props.visible) {
        this.handleRequestClose({
          reason: 'offScreen'
        });
      }
    }
  }, {
    key: "focus",

    /**
     * Place focus on the toggle.
     */
    value: function focus() {
      this.state.el.focus();
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.isControlled() ? this.props.open : this.state.open;
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

      var _this$props4 = this.props,
          align = _this$props4.align,
          visible = _this$props4.visible,
          canCoverHead = _this$props4.canCoverHead,
          children = _this$props4.children,
          columnId = _this$props4.columnId,
          id = _this$props4.id,
          index = _this$props4.index,
          label = _this$props4.label,
          onDragStart = _this$props4.onDragStart,
          onAutosizeColumn = _this$props4.onAutosizeColumn,
          onRequestResize = _this$props4.onRequestResize,
          resizable = _this$props4.resizable,
          showGuideline = _this$props4.showGuideline,
          style = _this$props4.style,
          truncate = _this$props4.truncate,
          width = _this$props4.width,
          closeReasons = _this$props4.closeReasons,
          retainFocus = _this$props4.retainFocus,
          defaultPlacement = _this$props4.defaultPlacement,
          repositionMode = _this$props4.repositionMode,
          scrollContainer = _this$props4.scrollContainer,
          takeFocus = _this$props4.takeFocus;
      var _this$state = this.state,
          el = _this$state.el,
          clientX = _this$state.clientX;
      var cellId = id || this.cellId;
      return external_react_default.a.createElement(HeadCellStyles_Styled, HeadDropdownCell_extends({
        style: Object(external_lodash_["merge"])(style, {
          width: width
        }),
        "data-test": "head-cell",
        "data-dragging": this.state.isDragging || undefined,
        id: visible ? cellId : undefined,
        tabIndex: visible ? 0 : undefined
      }, Object(themes_["ref"])(this.handleMount), Object(external_lodash_["omit"])(this.props, Object.keys(HeadDropdownCell.propTypes)), {
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        "aria-haspopup": true,
        "aria-owns": this.popoverId,
        "aria-expanded": this.isOpen()
      }), external_react_default.a.createElement(Table_HeadInner, {
        label: label,
        align: align,
        columnId: columnId,
        id: id,
        index: index,
        isMenu: true,
        resizable: visible && resizable,
        onDragStart: onDragStart && this.handleDragStart,
        onDragEnd: onDragStart && this.handleDragEnd,
        onAutosizeColumn: onAutosizeColumn,
        onRequestResize: onRequestResize,
        truncate: truncate,
        width: width
      }), showGuideline !== 'none' && external_react_default.a.createElement(StyledGuideLine, {
        "data-position": showGuideline
      }), external_react_default.a.createElement(Popover_default.a, {
        align: "center",
        open: !!el && this.isOpen(),
        autoCloseWhenOffScreen: Object(external_lodash_["includes"])(closeReasons, 'offScreen'),
        anchor: el,
        appearance: "light",
        canCoverAnchor: canCoverHead,
        retainFocus: retainFocus,
        defaultPlacement: defaultPlacement,
        onRequestClose: this.handleRequestClose,
        repositionMode: repositionMode,
        scrollContainer: scrollContainer,
        id: this.popoverId,
        "aria-labelledby": id || this.cellId,
        takeFocus: takeFocus,
        pointTo: Object(external_lodash_["isFinite"])(clientX) ? {
          x: clientX - (!!el && el.getBoundingClientRect().left)
        } : undefined
      }, Object(external_lodash_["isFunction"])(children) ? function () {
        return (// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          external_react_default.a.createElement("div", {
            onClick: _this2.handleContentClick
          }, children.apply(void 0, arguments))
        );
      } : // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      external_react_default.a.createElement("div", {
        onClick: this.handleContentClick
      }, children)));
    }
  }]);

  return HeadDropdownCell;
}(external_react_["Component"]);

HeadDropdownCell_defineProperty(HeadDropdownCell_HeadDropdownCell, "splunkUiType", 'Table.HeadDropdownCell');

HeadDropdownCell_defineProperty(HeadDropdownCell_HeadDropdownCell, "possibleCloseReasons", ['clickAway', 'contentClick', 'escapeKey', 'offScreen', 'toggleClick']);

HeadDropdownCell_defineProperty(HeadDropdownCell_HeadDropdownCell, "propTypes", {
  /** Align the text in the label. */
  align: external_prop_types_default.a.oneOf(['left', 'center', 'right']),

  /**
   * If there is not enough room to render the `Popover` in a direction, this option
   * enables it to be rendered over the Head.
   */
  canCoverHead: external_prop_types_default.a.bool,

  /** @private. */
  children: external_prop_types_default.a.node.isRequired,

  /**
   * An array of reasons for which this `Popover` should close.
   */
  closeReasons: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(HeadDropdownCell_HeadDropdownCell.possibleCloseReasons)),

  /**
   * An id that will be returned in the draggable, open, close and resize events.
   */
  columnId: external_prop_types_default.a.any,

  /**
   * The default placement of the `Popover`. It might be rendered in a different direction
   * depending upon the space available and the `repositionMode`.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'left', 'right', 'vertical', 'horizontal']),

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * An array of reasons for which to set focus on the toggle. Only subset of `closeReasons`
   * will be honored. When Menu.Items open a Modal or other dialog, it may be necessary to
   * remove the 'contentClick' reason to allow focus to be passed to the dialog.
   */
  focusToggleReasons: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(HeadDropdownCell_HeadDropdownCell.possibleCloseReasons)),
  id: external_prop_types_default.a.string,

  /** @private The index of the cell, skipping the info column. */
  index: external_prop_types_default.a.number,

  /**
   * The label on the heading, which may simply be text or may contain an element with
   * icons or other markup.
   */
  label: external_prop_types_default.a.any,

  /** @private. */
  onAutosizeColumn: external_prop_types_default.a.func,

  /** @private. */
  onDragStart: external_prop_types_default.a.func,

  /**
   * @private. This will be passed through, and will work as expected.
   */
  onKeyDown: external_prop_types_default.a.func,

  /**
   * A callback function invoked with a data object containing the event (if applicable) and
   * a reason for the close request.
   */
  onRequestClose: external_prop_types_default.a.func,

  /** @private. */
  onRequestMoveColumn: external_prop_types_default.a.func,

  /**
   * A callback function invoked with a data object containing the event. (The reason is
   * always toggleClick).
   */
  onRequestOpen: external_prop_types_default.a.func,

  /** @private. */
  // eslint-disable-next-line consistent-return
  onRequestResize: function onRequestResize(props) {
    if (props.onRequestResize && !props.truncate) {
      return new Error('HeadDropdownCell does not support truncate=false with resizable columns.');
    }
  },

  /**
   * If an open prop is provided, this component will behave as a
   * [controlled component](https://reactjs.org/docs/forms.html#controlled-components).
   * This means that the consumer is responsible for handling the open/close state. If no
   * open prop is provided, the component will handle the open/close state internally.
   */
  open: external_prop_types_default.a.bool,

  /**
   * See `repositionMode` on `Popover` for details.
   */
  repositionMode: external_prop_types_default.a.oneOf(['none', 'flip', 'any']),

  /**
   * Allow the user to resize the column when onRequestResize is passed to the `Table`. Set
   * resizable to false to prevent some columns for resizing.
   */
  resizable: external_prop_types_default.a.bool,

  /**
   * Keep focus within the Popover while open. Note, Menu handles it's own focus by default,
   * so this is only necessary when the popover contains other types of content.
   */
  retainFocus: external_prop_types_default.a.bool,

  /**
   * The container with which the popover must scroll to stay aligned with the Head.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /** @private. */
  showGuideline: external_prop_types_default.a.oneOf(['none', 'before', 'after']),

  /** @private. */
  style: external_prop_types_default.a.object,

  /**
   * When true, the Popover will automatically take focus when 'open' changes to true.
   * Disable this for a Popover that has shows on hover, such as a tooltip.
   */
  takeFocus: external_prop_types_default.a.bool,

  /**
   * Truncate the text in the label. `truncate=false` is not compatible with `Table`'s
   * `onRequestResize`.
   */
  truncate: external_prop_types_default.a.bool,

  /**
   * @private
   * Used internally to suppress focus when this `HeadDropdownCell` is superseded by one in an
   * overlaid `HeadTable` for user interactions.
   */
  visible: external_prop_types_default.a.bool,

  /**
   * The width of the column in pixels.
   */
  width: external_prop_types_default.a.number
});

HeadDropdownCell_defineProperty(HeadDropdownCell_HeadDropdownCell, "defaultProps", {
  align: 'left',
  canCoverHead: true,
  closeReasons: HeadDropdownCell_HeadDropdownCell.possibleCloseReasons,
  defaultPlacement: 'below',
  elementRef: function elementRef() {},
  focusToggleReasons: ['contentClick', 'escapeKey', 'toggleClick'],
  onKeyDown: function onKeyDown() {},
  onRequestClose: function onRequestClose() {},
  onRequestOpen: function onRequestOpen() {},
  resizable: true,
  retainFocus: false,
  repositionMode: 'flip',
  scrollContainer: 'window',
  takeFocus: true,
  truncate: true,
  visible: true
});

/* harmony default export */ var Table_HeadDropdownCell = (HeadDropdownCell_HeadDropdownCell);
// CONCATENATED MODULE: ./src/Table/TableStyles.js


var TableStyles_Styled = external_styled_components_default.a.div.withConfig({
  displayName: "TableStyles__Styled",
  componentId: "vrskim-0"
})(["", ";max-width:100%;position:relative;@media print{max-height:none !important;}"], Object(themes_["mixin"])('reset')('block'));
var StyledTableContainer = external_styled_components_default.a.div.withConfig({
  displayName: "TableStyles__StyledTableContainer",
  componentId: "vrskim-1"
})(["overflow:auto;"]);
var StyledTable = external_styled_components_default.a.table.withConfig({
  displayName: "TableStyles__StyledTable",
  componentId: "vrskim-2"
})(["", ";position:relative;border-collapse:collapse;border-spacing:0;min-width:100%;&[data-fixed-column='true']{table-layout:fixed;min-width:0;width:0;}@media print{width:100%;max-width:100%;table-layout:auto;}"], Object(themes_["mixin"])('reset')('table'));
var StyledDockedScrollbar = external_styled_components_default.a.div.withConfig({
  displayName: "TableStyles__StyledDockedScrollbar",
  componentId: "vrskim-3"
})(["position:fixed;bottom:0;overflow:auto;z-index:", ";"], function (props) {
  return Object(themes_["variable"])('zindexFixedNavbar')(props) + 1;
});
var StyledDockedScrollbarContent = external_styled_components_default.a.div.withConfig({
  displayName: "TableStyles__StyledDockedScrollbarContent",
  componentId: "vrskim-4"
})(["height:1px;"]);

// CONCATENATED MODULE: ./src/Table/HeadTableStyles.js



var HeadTableStyles_Styled = external_styled_components_default()(StyledTable).withConfig({
  displayName: "HeadTableStyles__Styled",
  componentId: "jyjv0i-0"
})(["min-width:0;table-layout:fixed;"]);
var StyledDockedContainer = external_styled_components_default.a.div.withConfig({
  displayName: "HeadTableStyles__StyledDockedContainer",
  componentId: "jyjv0i-1"
})(["overflow:hidden;position:fixed;box-shadow:", ";z-index:", ";@media print{display:none;}"], Object(themes_["variable"])('overlayShadow'), Object(themes_["variable"])('zindexFixedNavbar'));
var StyledFixedContainer = external_styled_components_default()(StyledDockedContainer).withConfig({
  displayName: "HeadTableStyles__StyledFixedContainer",
  componentId: "jyjv0i-2"
})(["position:absolute;box-shadow:none;z-index:1;"]);

// CONCATENATED MODULE: ./src/Table/HeadTable.jsx
function HeadTable_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { HeadTable_typeof = function _typeof(obj) { return typeof obj; }; } else { HeadTable_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return HeadTable_typeof(obj); }

function HeadTable_extends() { HeadTable_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return HeadTable_extends.apply(this, arguments); }

function HeadTable_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = HeadTable_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function HeadTable_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function HeadTable_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HeadTable_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function HeadTable_createClass(Constructor, protoProps, staticProps) { if (protoProps) HeadTable_defineProperties(Constructor.prototype, protoProps); if (staticProps) HeadTable_defineProperties(Constructor, staticProps); return Constructor; }

function HeadTable_possibleConstructorReturn(self, call) { if (call && (HeadTable_typeof(call) === "object" || typeof call === "function")) { return call; } return HeadTable_assertThisInitialized(self); }

function HeadTable_getPrototypeOf(o) { HeadTable_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return HeadTable_getPrototypeOf(o); }

function HeadTable_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) HeadTable_setPrototypeOf(subClass, superClass); }

function HeadTable_setPrototypeOf(o, p) { HeadTable_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return HeadTable_setPrototypeOf(o, p); }

function HeadTable_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function HeadTable_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/**
 * @private
 * HeadTable is an internal component that provides a detached table head that can
 * then be positioned in different ways outside of the main table.
 */

var HeadTable_HeadTable =
/*#__PURE__*/
function (_Component) {
  HeadTable_inherits(HeadTable, _Component);

  function HeadTable() {
    var _getPrototypeOf2;

    var _this;

    HeadTable_classCallCheck(this, HeadTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = HeadTable_possibleConstructorReturn(this, (_getPrototypeOf2 = HeadTable_getPrototypeOf(HeadTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    HeadTable_defineProperty(HeadTable_assertThisInitialized(HeadTable_assertThisInitialized(_this)), "handleHeadMount", function (head) {
      _this.head = head;
    });

    return _this;
  }

  HeadTable_createClass(HeadTable, [{
    key: "getHead",
    value: function getHead() {
      return this.head;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          elementRef = _this$props.elementRef,
          tHead = _this$props.tHead,
          hasRowExpansion = _this$props.hasRowExpansion,
          hasRowSelection = _this$props.hasRowSelection,
          hasDragColumn = _this$props.hasDragColumn,
          isFixedColumn = _this$props.isFixedColumn,
          width = _this$props.width,
          tableWidth = _this$props.tableWidth,
          cellWidths = _this$props.cellWidths,
          top = _this$props.top,
          horizontalOffset = _this$props.horizontalOffset,
          headType = _this$props.headType,
          tableStyle = _this$props.tableStyle,
          otherProps = HeadTable_objectWithoutProperties(_this$props, ["elementRef", "tHead", "hasRowExpansion", "hasRowSelection", "hasDragColumn", "isFixedColumn", "width", "tableWidth", "cellWidths", "top", "horizontalOffset", "headType", "tableStyle"]);

      var isDocked = headType === 'docked';
      var StyledContainer = isDocked ? StyledDockedContainer : StyledFixedContainer;
      var indexOffset = 0;

      if (hasRowExpansion) {
        indexOffset += 1;
      }

      if (hasRowSelection) {
        indexOffset += 1;
      }

      if (hasDragColumn) {
        indexOffset += 1;
      } // Set the widths of the head cells if not fixed column


      var cells = isFixedColumn ? external_react_["Children"].toArray(tHead.props.children) // ensure consistent keys
      : external_react_["Children"].toArray(tHead.props.children).filter(external_react_["isValidElement"]).map(function (cell, i) {
        return Object(external_react_["cloneElement"])(cell, {
          style: Object(external_lodash_["extend"])({}, cell.props.style, {
            width: cellWidths[i + indexOffset]
          })
        });
      });
      var clonedTHead = Object(external_react_["cloneElement"])(tHead, {
        ref: this.handleHeadMount,
        'data-test': "".concat(headType, "-head")
      }, cells);
      return external_react_default.a.createElement(StyledContainer, HeadTable_extends({
        style: {
          top: top,
          width: width
        }
      }, Object(themes_["ref"])(elementRef)), external_react_default.a.createElement(HeadTableStyles_Styled, HeadTable_extends({
        "data-test": "".concat(headType, "-head-table"),
        style: Object(external_lodash_["extend"])({}, tableStyle, {
          marginLeft: horizontalOffset,
          width: isFixedColumn ? undefined : tableWidth
        }),
        "data-fixed-column": isFixedColumn ? 'true' : undefined
      }, Object(external_lodash_["omit"])(otherProps, 'dragIndex')), clonedTHead));
    }
  }]);

  return HeadTable;
}(external_react_["Component"]);

HeadTable_defineProperty(HeadTable_HeadTable, "propTypes", {
  dragIndex: external_prop_types_default.a.number,
  elementRef: external_prop_types_default.a.func,
  tHead: external_prop_types_default.a.element.isRequired,
  width: external_prop_types_default.a.number.isRequired,
  tableWidth: external_prop_types_default.a.number.isRequired,
  cellWidths: external_prop_types_default.a.arrayOf(external_prop_types_default.a.number).isRequired,
  top: external_prop_types_default.a.number.isRequired,
  horizontalOffset: external_prop_types_default.a.number,
  headType: external_prop_types_default.a.oneOf(['docked', 'fixed']).isRequired,
  tableStyle: external_prop_types_default.a.object,
  hasRowExpansion: external_prop_types_default.a.bool,
  hasRowSelection: external_prop_types_default.a.bool,
  hasDragColumn: external_prop_types_default.a.bool,
  isFixedColumn: external_prop_types_default.a.bool,
  onRequestToggleAllRows: external_prop_types_default.a.func,
  rowSelection: external_prop_types_default.a.oneOf(['all', 'some', 'none'])
});

HeadTable_defineProperty(HeadTable_HeadTable, "defaultProps", {
  horizontalOffset: 0
});

/* harmony default export */ var Table_HeadTable = (HeadTable_HeadTable);
// CONCATENATED MODULE: ./src/Table/Table.jsx
function Table_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Table_typeof = function _typeof(obj) { return typeof obj; }; } else { Table_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Table_typeof(obj); }

function Table_extends() { Table_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Table_extends.apply(this, arguments); }

function Table_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Table_possibleConstructorReturn(self, call) { if (call && (Table_typeof(call) === "object" || typeof call === "function")) { return call; } return Table_assertThisInitialized(self); }

function Table_getPrototypeOf(o) { Table_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Table_getPrototypeOf(o); }

function Table_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Table_createClass(Constructor, protoProps, staticProps) { if (protoProps) Table_defineProperties(Constructor.prototype, protoProps); if (staticProps) Table_defineProperties(Constructor, staticProps); return Constructor; }

function Table_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Table_setPrototypeOf(subClass, superClass); }

function Table_setPrototypeOf(o, p) { Table_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Table_setPrototypeOf(o, p); }

function Table_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Table_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // Exposed as static members of the Table class






 // Internal Helper Modules




var Table_Table =
/*#__PURE__*/
function (_Component) {
  Table_inherits(Table, _Component);

  Table_createClass(Table, null, [{
    key: "getHeadFocusState",

    /**
     * @private
     * @private
     * Returns an object describing the focus state of the provided `head`.
     * @param head - A reference to a mounted `Head` component.
     * @returns {Object} focusState - An object containing a target (either 'headCell' or
     * 'resizeButton') and an index.
     */
    // eslint-disable-next-line consistent-return
    value: function getHeadFocusState(head) {
      var headCells = head.getEl().children[0].children;
      var activeHeadCellIndex = Object(external_lodash_["indexOf"])(headCells, document.activeElement);

      if (activeHeadCellIndex > -1) {
        return {
          target: 'headCell',
          index: activeHeadCellIndex
        };
      }

      var resizeButtons = head.getEl().querySelectorAll('[data-test=resize]');
      var activeResizeButtonIndex = Object(external_lodash_["indexOf"])(resizeButtons, document.activeElement);

      if (activeResizeButtonIndex > -1) {
        return {
          target: 'resizeButton',
          index: activeResizeButtonIndex
        };
      }
    }
  }, {
    key: "getOffset",
    value: function getOffset(el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    }
    /**
     * @private
     * @private
     * Applies the provided `headFocusState` to the provided `head`.
     * @param head - A reference to a mounted `Head` component.
     * @param {Object} headFocusState
     * @param {String} headFocusState.target - Focus can be applied to a 'headCell' or a
     * 'resizeButton'.
     * @param {Number} headFocusState.index - The index of the element to set focus on.
     */

  }, {
    key: "applyHeadFocusState",
    value: function applyHeadFocusState(head, _ref) {
      var target = _ref.target,
          index = _ref.index;

      if (false) {}

      var targetEl;

      if (target === 'headCell') {
        targetEl = head.getEl().children[0].children[index];
      } else if (target === 'resizeButton') {
        targetEl = head.getEl().querySelectorAll('[data-test=resize]')[index];
      }

      if (false) {}

      if (targetEl) {
        targetEl.focus();
      }
    }
  }]);

  function Table(props) {
    var _this;

    Table_classCallCheck(this, Table);

    _this = Table_possibleConstructorReturn(this, Table_getPrototypeOf(Table).call(this, props));

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "updateDockedHeadState", function () {
      if (_this.isInline()) {
        return;
      }

      var _assertThisInitialize = Table_assertThisInitialized(Table_assertThisInitialized(_this)),
          tableContainer = _assertThisInitialize.tableContainer,
          head = _assertThisInitialize.head,
          table = _assertThisInitialize.table;

      var dockOffset = _this.props.dockOffset;
      var cellWidths = head.getCellWidths();
      var headHeight = head.getClientHeight();
      var tableTopWrtWindow = Table.getOffset(table).top - window.pageYOffset - headHeight + table.offsetHeight;
      var top = Math.min(tableTopWrtWindow, dockOffset);

      _this.setState({
        width: tableContainer.clientWidth,
        tableWidth: table.clientWidth,
        cellWidths: cellWidths,
        top: top
      });
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleContainerScroll", function () {
      var _this$props;

      (_this$props = _this.props).onScroll.apply(_this$props, arguments);

      if (_this.isFixed() || _this.headerIsDocked()) {
        _this.setState({
          horizontalOffset: -_this.tableContainer.scrollLeft
        });
      }

      if (_this.dockedScrollBar && _this.scrollSource !== 'dockedScrollBar') {
        _this.scrollSource = 'container';
        _this.dockedScrollBar.scrollLeft = _this.tableContainer.scrollLeft;
      } else {
        _this.scrollSource = '';
      }
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleDockedScrollBarScroll", function () {
      if (_this.scrollSource !== 'container') {
        _this.scrollSource = 'dockedScrollBar';
        _this.tableContainer.scrollLeft = _this.dockedScrollBar.scrollLeft;
      } else {
        _this.scrollSource = '';
      }
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleDragStart", function (_ref2) {
      var dragIndex = _ref2.dragIndex;

      _this.setState({
        dragIndex: dragIndex
      });

      window.addEventListener('dragenter', _this.handleDragEnter);
      window.addEventListener('dragover', _this.handleDragOver);
      window.addEventListener('drop', _this.handleDrop);
      window.addEventListener('dragend', _this.handleDragEnd);
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleDragOver", function (e) {
      e.preventDefault(); // necessary for the drop event to fire

      e.dataTransfer.dropEffect = 'move';

      _this.updateDragPositon(e.clientX);
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleDragEnter", function (e) {
      e.preventDefault(); // necessary for the drop event to fire

      _this.setState({
        dragPosition: e.clientX
      });
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleDragEnd", function () {
      _this.setState({
        dragPosition: null
      });

      _this.cleanupDrag();
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleDrop", function (e) {
      e.preventDefault(); // necessary to prevent cell from animating to original position;
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleHeadMount", function (comp) {
      _this.head = comp;
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleHeadTableMount", function (headTable) {
      if (headTable) {
        // On mount, focus the applicable docked head cell if a primary head cell was focused.
        if (_this.headFocusState) {
          Table.applyHeadFocusState(headTable.getHead(), _this.headFocusState);
          _this.headFocusState = null;
        }
      } else {
        // On unmount, focus the applicable primary head cell if a docked head cell was focused.
        var focusState = Table.getHeadFocusState(_this.headTable.getHead());

        if (focusState) {
          Table.applyHeadFocusState(_this.head, focusState);
        }
      }

      _this.headTable = headTable;
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleHeadTableElementMount", function (el) {
      _this.headTableEl = el;
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleHeadTableKeyUp", function (e) {
      if (Object(keyboard_["keycode"])(e) !== 'tab') {
        return;
      }

      var scrollAdjust = _this.headTableEl.scrollLeft;

      if (scrollAdjust !== 0) {
        _this.headTableEl.scrollLeft = 0;
        _this.tableContainer.scrollLeft = _this.tableContainer.scrollLeft + scrollAdjust;
      }
    });

    Table_defineProperty(Table_assertThisInitialized(Table_assertThisInitialized(_this)), "handleAutosizeColumn", function (e, _ref3) {
      var index = _ref3.index,
          columnId = _ref3.columnId;
      var offset = _this.props.rowExpansion === 'none' ? 1 : 2;

      var cells = _this.tableContainer.querySelectorAll("thead th:nth-child(".concat(index + offset, "), tbody td:nth-child(").concat(index + offset, ")"));

      var wrapper = document.createElement('div'); // TODO: find a styled-components compliant way to do this

      wrapper.style.float = 'left';
      wrapper.style.position = 'fixed';
      wrapper.style.top = -100;
      wrapper.style.left = 0;
      wrapper.style.maxHeight = '10px';
      wrapper.style.overflow = 'hidden';
      Object(external_lodash_["forEach"])(cells, function (cell) {
        var clone = cell.cloneNode(true);
        clone.style.display = 'block';
        clone.style.width = 'auto';
        wrapper.appendChild(clone);
      });
      document.body.appendChild(wrapper);

      _this.props.onRequestResizeColumn(e, {
        index: index,
        columnId: columnId,
        width: wrapper.clientWidth + 1
      });

      wrapper.parentNode.removeChild(wrapper);
    });

    _this.handleScroll = Object(external_lodash_["throttle"])(_this.updateDockedHeadState, 0);
    _this.handleResize = Object(external_lodash_["throttle"])(_this.updateDockedHeadState, 50);
    _this.updateDragPositon = Object(external_lodash_["throttle"])(_this.updateDragPositon, 100, {
      trailing: false
    });
    _this.componentDidMount = _this.updateDockedHeadState;
    _this.state = {
      dragPosition: null
    };
    return _this;
  }

  Table_createClass(Table, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var head = this.head,
          headTable = this.headTable;

      if (head && headTable) {
        var cellWidths = head.getCellWidths();

        if (!Object(external_lodash_["isEqual"])(this.state.cellWidths, cellWidths)) {
          this.updateDockedHeadState();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleScroll.cancel();
      this.handleResize.cancel();
      this.cleanupDrag();
    }
  }, {
    key: "createHead",
    value: function createHead(base) {
      var _this$props2 = this.props,
          actions = _this$props2.actions,
          actionsColumnWidth = _this$props2.actionsColumnWidth,
          onRequestMoveColumn = _this$props2.onRequestMoveColumn,
          onRequestMoveRow = _this$props2.onRequestMoveRow,
          onRequestResizeColumn = _this$props2.onRequestResizeColumn,
          onRequestToggleAllRows = _this$props2.onRequestToggleAllRows,
          rowExpansion = _this$props2.rowExpansion,
          rowSelection = _this$props2.rowSelection;
      var dragIndex = this.state.dragIndex;
      var headCells = external_react_["Children"].toArray(base.props.children).filter(external_react_["isValidElement"]);
      var validActions = actions.filter(external_react_["isValidElement"]);
      var newHead = Object(external_react_["cloneElement"])(base, {
        actions: validActions,
        actionsColumnWidth: actionsColumnWidth,
        dragIndex: dragIndex,
        dragPosition: this.state.dragPosition,
        hasInfoColumn: rowExpansion !== 'none',
        hasDragColumn: !!onRequestMoveRow,
        onAutosizeColumn: this.handleAutosizeColumn,
        onDragStart: onRequestMoveColumn && this.handleDragStart,
        onRequestMoveColumn: onRequestMoveColumn,
        onRequestResizeColumn: onRequestResizeColumn,
        onRequestToggleAllRows: onRequestToggleAllRows,
        ref: this.handleHeadMount,
        rowSelection: rowSelection
      }, headCells);
      return newHead;
    }
  }, {
    key: "createBody",
    value: function createBody(base) {
      var actions = this.props.actions;
      var validActions = actions.filter(external_react_["isValidElement"]);
      var bodyProps = Object(external_lodash_["pick"])(this.props, 'stripeRows', 'rowExpansion', 'onRequestMoveColumn', 'onRequestMoveRow');

      if (validActions.length > 0) {
        bodyProps.actions = true;
      }

      if (this.isFixed()) {
        bodyProps.scrollContainer = this.tableContainer;
      }

      return Object(external_react_["cloneElement"])(base, bodyProps);
    }
  }, {
    key: "isInline",
    value: function isInline() {
      return this.props.headType === 'inline';
    }
  }, {
    key: "headerIsDocked",
    value: function headerIsDocked() {
      return this.props.headType === 'docked';
    }
  }, {
    key: "isFixed",
    value: function isFixed() {
      return this.props.headType === 'fixed';
    }
  }, {
    key: "showDockedHeader",
    value: function showDockedHeader() {
      if (!this.headerIsDocked() || !this.table || !this.head) {
        return false;
      }

      var dockOffset = this.props.dockOffset;
      var tableTop = Table.getOffset(this.tableContainer).top;
      return window.pageYOffset >= tableTop - dockOffset;
    }
  }, {
    key: "showDockedScrollBar",
    value: function showDockedScrollBar() {
      if (!this.props.dockScrollBar || !this.table) {
        return false;
      }

      var rect = this.tableContainer.getBoundingClientRect();
      var show = rect.bottom > window.innerHeight && rect.top < window.innerHeight;
      return show;
    }
  }, {
    key: "showFixed",
    value: function showFixed() {
      return this.head && this.isFixed();
    }
  }, {
    key: "updateDragPositon",
    value: function updateDragPositon(dragPosition) {
      this.setState({
        dragPosition: dragPosition
      });
    }
  }, {
    key: "cleanupDrag",
    value: function cleanupDrag() {
      window.removeEventListener('dragenter', this.handleDragEnter);
      window.removeEventListener('dragover', this.handleDragOver);
      window.removeEventListener('drop', this.handleDrop);
      window.removeEventListener('dragend', this.handleDragEnd);
      this.updateDragPositon.cancel(); // cancel throttle
    }
  }, {
    key: "renderHeadTable",
    value: function renderHeadTable(tHead, isFixedColumn) {
      var showDockedHeader = this.showDockedHeader();

      if ((this.showFixed() || showDockedHeader) && this.state.cellWidths) {
        if (showDockedHeader) {
          // Save the current head focus state so that it can be applied to the docked version
          // after the `HeadTable` mounts.
          this.headFocusState = Table.getHeadFocusState(this.head);
        }

        return external_react_default.a.createElement(Table_HeadTable, Table_extends({
          headType: this.props.headType,
          tHead: tHead
        }, Object(external_lodash_["omit"])(this.state, 'dragPosition'), {
          tableStyle: this.props.tableStyle,
          isFixedColumn: isFixedColumn,
          "data-padding": this.props.firstLastPadding,
          ref: this.handleHeadTableMount,
          onKeyUp: this.handleHeadTableKeyUp,
          elementRef: this.handleHeadTableElementMount,
          hasDragColumn: !!this.props.onRequestMoveRow,
          hasRowExpansion: this.props.rowExpansion !== 'none',
          hasRowSelection: !!this.props.onRequestToggleAllRows
        }));
      }

      return false;
    }
  }, {
    key: "renderDockedScrollbar",
    value: function renderDockedScrollbar() {
      var _this2 = this;

      if (!this.showDockedScrollBar()) {
        return false;
      }

      var shiftPosition = 0;

      if (this.dockedScrollBar && this.head) {
        var availableSpace = window.innerHeight - this.table.getBoundingClientRect().top - this.head.getEl().offsetHeight;
        shiftPosition = Math.min(availableSpace - this.dockedScrollBar.offsetHeight, 0);
      }

      return external_react_default.a.createElement(StyledDockedScrollbar, Table_extends({
        style: {
          width: this.state.width,
          marginBottom: shiftPosition
        },
        onScroll: this.handleDockedScrollBarScroll,
        "data-test": "docked-scroll-bar"
      }, Object(themes_["ref"])(function (el) {
        _this2.dockedScrollBar = el;
      })), external_react_default.a.createElement(StyledDockedScrollbarContent, {
        style: {
          width: this.state.tableWidth
        },
        "data-test": "docked-scroll-content"
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          children = _this$props3.children,
          elementRef = _this$props3.elementRef,
          innerStyle = _this$props3.innerStyle,
          firstLastPadding = _this$props3.firstLastPadding,
          rowSelection = _this$props3.rowSelection,
          outerStyle = _this$props3.outerStyle,
          onRequestResizeColumn = _this$props3.onRequestResizeColumn,
          onRequestToggleAllRows = _this$props3.onRequestToggleAllRows,
          tableStyle = _this$props3.tableStyle;
      var tHead;
      var tBody;
      var isFixedColumn = !!onRequestResizeColumn;
      external_react_["Children"].forEach(children, function (child) {
        var splunkUiType = child.type.splunkUiType;

        if (splunkUiType === 'Table.Head') {
          tHead = _this3.createHead(child);

          if (!isFixedColumn) {
            // if all the HeadCells are fixed width, then the table is fixed.
            isFixedColumn = !external_react_["Children"].toArray(child.props.children).filter(external_react_["isValidElement"]).some(function (th) {
              return !Object(external_lodash_["has"])(th.props, 'width');
            });
          }
        } else if (splunkUiType === 'Table.Body') {
          tBody = _this3.createBody(child);
        }
      });
      var headTable = this.renderHeadTable(tHead, isFixedColumn); // When a `headTable` is used, suppress focus interactions in the primary `Head`. Focus
      // interactions will be handled by the overlaid `headTable` instead.

      var headCells = external_react_["Children"].map(tHead.props.children, function (cell) {
        return Object(external_react_["cloneElement"])(cell, {
          visible: !headTable
        });
      });
      tHead = Object(external_react_["cloneElement"])(tHead, {}, headCells);
      return external_react_default.a.createElement(TableStyles_Styled, Table_extends({
        "data-test": "table"
      }, Object(themes_["ref"])(elementRef), {
        style: outerStyle,
        "data-test-row-selection": onRequestToggleAllRows ? rowSelection : undefined
      }, Object(external_lodash_["omit"])(this.props, Object.keys(Table.propTypes))), external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: "window",
        onScroll: this.handleScroll
      }), external_react_default.a.createElement(external_react_resize_detector_default.a, {
        handleWidth: true,
        onResize: this.handleResize
      }), headTable, external_react_default.a.createElement(StyledTableContainer, Table_extends({
        onScroll: this.handleContainerScroll
      }, Object(themes_["ref"])(function (el) {
        _this3.tableContainer = el;
      }), {
        style: innerStyle
      }), external_react_default.a.createElement(StyledTable, Table_extends({}, Object(themes_["ref"])(function (el) {
        return _this3.table = el;
      }), {
        "data-test": "main-table",
        style: tableStyle,
        "data-fixed-column": isFixedColumn ? 'true' : undefined,
        "data-padding": firstLastPadding
      }), tHead, tBody)), this.renderDockedScrollbar());
    }
  }]);

  return Table;
}(external_react_["Component"]);

Table_defineProperty(Table_Table, "propTypes", {
  /**
   * Adds table-level actions. Not compatible with `onRequestResize`.
   * @includeTheme scp
   */
  actions: external_prop_types_default.a.arrayOf(external_prop_types_default.a.node),

  /**
   * Specifies the width of the actions column. Adds an empty header for
   * row actions if no table-level actions are present.
   * @includeTheme scp
   */
  actionsColumnWidth: external_prop_types_default.a.number,

  /**
   * `children` should be `Table.Head`, or `Table.Body`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Sets the offset from the top of the window. Only applies when headType
   * is 'docked'
   */
  dockOffset: external_prop_types_default.a.number,

  /**
   * Docks the horizontal scroll bar at the bottom of the window when the bottom of the
   * table is below the viewport.
   */
  dockScrollBar: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Sets the table head type:
   *
   *  * `docked` - The head will dock against the window
   *  * `fixed` - The head will be fixed in the table. The table can scroll
   *          independently from the head.
   *  * `inline` - The head is not fixed, but will scroll with the rest of
   *          the table.
   */
  headType: external_prop_types_default.a.oneOf(['docked', 'fixed', 'inline']),

  /**
   * Style specification for the inner container (which is the scrolling container).
   */
  innerStyle: external_prop_types_default.a.object,

  /**
   * Sets the left padding on the first cell and the right padding on the last cell:
   *
   * * `page` - Typically used when the table is the full width of the page.
   *   The padding is larger.
   * * `panel` - Smaller padding when the table is placed in a Dashboard panel.
   */
  firstLastPadding: external_prop_types_default.a.oneOf(['page', 'panel']),

  /**
   * Callback invoked when a user clicks the row selection toggle in the header.
   */
  onRequestToggleAllRows: external_prop_types_default.a.func,

  /**
   * Callback invoked when a scoll event occurs on the inner (scrolling) container.
   */
  onScroll: external_prop_types_default.a.func,

  /**
   * Style specification for the outer container.
   */
  outerStyle: external_prop_types_default.a.object,

  /**
   * Adds a column to the table with an expansion button for each row that has expansion
   * content. Supported values:
   *
   * * `single` - Only one row can be expanded at a time. If another expansion button is
   * clicked, the currently expanded row will close and the new one will open.
   * * `multi` - Allows mulitple rows to be expanded at the same time.
   * * `none` - No row expansion (default).
   */
  rowExpansion: external_prop_types_default.a.oneOf(['single', 'multi', 'none']),

  /**
   * When an `onRequestToggleAllRows` handler is defined, this prop determines the appearance
   * of the toggle all rows button.
   */
  rowSelection: external_prop_types_default.a.oneOf(['all', 'some', 'none']),

  /**
   * Alternate rows are given a darker background to improve readability.
   * @excludeTheme scp
   */
  stripeRows: external_prop_types_default.a.bool,
  // eslint-disable-line react/no-unused-prop-types

  /** @private */
  // eslint-disable-next-line consistent-return, react/no-unused-prop-types
  style: function style(props) {
    if (Object(external_lodash_["has"])(props, 'style')) {
      return new Error("Table does not support the 'style' prop. Use 'innerStyle', 'outerStyle', or 'tableStyle' instead." // eslint-disable-next-line max-len
      );
    }
  },

  /**
   * The style attribute for the table. This is primarily useful for setting the table-layout
   * property.
   */
  tableStyle: external_prop_types_default.a.object,

  /**
   * An event handler for handle the re order action of Table. The function is passed an
   * options object with `fromIndex` and `toIndex`.
   */
  onRequestMoveColumn: external_prop_types_default.a.func,

  /**
   * An event handler for handle the re-order rows action of Table. The function is passed an
   * options object with `fromIndex` and `toIndex`.
   */
  onRequestMoveRow: external_prop_types_default.a.func,

  /**
   * An event handler for resize of columns. The function is passed an event and an
   * options object with `columnId`, `index`, and `width`.
   */
  onRequestResizeColumn: external_prop_types_default.a.func
});

Table_defineProperty(Table_Table, "defaultProps", {
  actions: [],
  dockOffset: 0,
  headType: 'inline',
  innerStyle: {},
  firstLastPadding: 'page',
  onScroll: function onScroll() {},
  outerStyle: {},
  rowExpansion: 'none',
  rowSelection: 'none'
});

Table_defineProperty(Table_Table, "Head", Table_Head);

Table_defineProperty(Table_Table, "HeadCell", Table_HeadCell);

Table_defineProperty(Table_Table, "HeadDropdownCell", Table_HeadDropdownCell);

Table_defineProperty(Table_Table, "Body", Table_Body);

Table_defineProperty(Table_Table, "Row", Table_Row);

Table_defineProperty(Table_Table, "Cell", Table_Cell);

/* harmony default export */ var src_Table_Table = (Table_Table);

// CONCATENATED MODULE: ./src/Table/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Table_Table; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Head", function() { return Table_Head; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HeadCell", function() { return Table_HeadCell; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "HeadDropdownCell", function() { return Table_HeadDropdownCell; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Body", function() { return Table_Body; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Row", function() { return Table_Row; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Cell", function() { return Table_Cell; });



/***/ })
/******/ ]);