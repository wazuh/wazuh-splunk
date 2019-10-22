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
/******/ 	return __webpack_require__(__webpack_require__.s = 135);
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

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 135:
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

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/Resize/ResizeStyles.js


var edgeWidth = '9px';
var edgeLength = '14px';
var edgePadding = '3px';
var cornerSize = '11px';
var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "ResizeStyles__Styled",
  componentId: "ei3ij8-0"
})(["", ";position:relative;overflow-x:hidden;overflow-y:hidden;&[data-border-n] > div{border-top-width:", ";}&[data-border-e] > div{border-right-width:", ";}&[data-border-s] > div{border-bottom-width:", ";}&[data-border-w] > div{border-left-width:", ";}& > div{", ";border:0 solid ", ";height:100%;width:100%;}"], Object(themes_["mixin"])('reset')('block'), edgeWidth, edgeWidth, edgeWidth, edgeWidth, Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('white'));
var resize = Object(external_styled_components_["css"])(["", ";color:", ";&:hover,&:focus{color:", ";}&[data-hover]{opacity:0;transition:opacity 200ms;", ":hover > div > &,&:focus{opacity:1;}}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Resize', 'resizeColor'), Object(themes_["variable"])('linkColor'),
/* sc-sel */
Styled);
var StyledSvg = external_styled_components_default.a.svg.withConfig({
  displayName: "ResizeStyles__StyledSvg",
  componentId: "ei3ij8-1"
})(["display:block;width:", ";height:", ";"], cornerSize, cornerSize);
var StyledPath = external_styled_components_default.a.path.withConfig({
  displayName: "ResizeStyles__StyledPath",
  componentId: "ei3ij8-2"
})(["stroke-width:1.1px;stroke:currentColor;"]);
var resizeCorner = Object(external_styled_components_["css"])(["", ";width:", ";height:", ";position:absolute;background-clip:content-box;z-index:2;"], resize, cornerSize, cornerSize);
var StyledResizeNW = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeNW",
  componentId: "ei3ij8-3"
})(["", ";top:0;left:0;cursor:nwse-resize;> ", "{transform:rotate(180deg);}"], resizeCorner,
/* sc-sel */
StyledSvg);
var StyledResizeNE = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeNE",
  componentId: "ei3ij8-4"
})(["", ";right:0;top:0;cursor:nesw-resize;> ", "{transform:rotate(-90deg);}"], resizeCorner,
/* sc-sel */
StyledSvg);
var StyledResizeSE = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeSE",
  componentId: "ei3ij8-5"
})(["", ";right:0;bottom:0;cursor:nwse-resize;"], resizeCorner);
var StyledResizeSW = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeSW",
  componentId: "ei3ij8-6"
})(["", ";left:0;bottom:0;cursor:nesw-resize;> ", "{transform:rotate(90deg);}"], resizeCorner,
/* sc-sel */
StyledSvg);
var resizeEdge = Object(external_styled_components_["css"])(["", ";padding:", ";position:absolute;z-index:1;&::after{content:'';position:absolute;height:calc(", " - ", " * 2);width:calc(", " - ", " * 2);box-sizing:border-box;border:0 solid currentColor;}"], resize, edgePadding, edgeWidth, edgePadding, edgeWidth, edgePadding);
var resizeVert = Object(external_styled_components_["css"])(["", ";width:", ";height:", ";left:calc(50% - ", " / 2);cursor:ns-resize;&::after{width:", ";border-width:1px 0;top:", ";left:calc(50% - ", " / 2);}"], resizeEdge, edgeLength, edgeWidth, edgeLength, edgeLength, edgePadding, edgeLength);
var StyledResizeN = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeN",
  componentId: "ei3ij8-7"
})(["", ";top:0;"], resizeVert);
var StyledResizeS = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeS",
  componentId: "ei3ij8-8"
})(["", ";bottom:0;"], resizeVert);
var resizeHorz = Object(external_styled_components_["css"])(["", ";height:", ";width:", ";top:calc(50% - ", " / 2);cursor:ew-resize;&::after{height:", ";border-width:0 1px;left:", ";top:calc(50% - ", " / 2);}"], resizeEdge, edgeLength, edgeWidth, edgeLength, edgeLength, edgePadding, edgeLength);
var StyledResizeE = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeE",
  componentId: "ei3ij8-9"
})(["", ";right:0;"], resizeHorz);
var StyledResizeW = external_styled_components_default.a.button.withConfig({
  displayName: "ResizeStyles__StyledResizeW",
  componentId: "ei3ij8-10"
})(["", ";left:0;"], resizeHorz);

// CONCATENATED MODULE: ./src/Resize/Resize.jsx
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










var StyledResizes = {
  nw: StyledResizeNW,
  n: StyledResizeN,
  ne: StyledResizeNE,
  w: StyledResizeW,
  e: StyledResizeE,
  sw: StyledResizeSW,
  s: StyledResizeS,
  se: StyledResizeSE
};
/**
 * Resize is a utility container with drag handles for resizing.
 */

var Resize_Resize =
/*#__PURE__*/
function (_Component) {
  _inherits(Resize, _Component);

  function Resize(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Resize);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Resize)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.setState({
        el: el
      });

      _this.props.elementRef(el);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragStart", function (e, dragDirection) {
      if (e.button > 0) {
        return;
      }

      e.preventDefault();
      e.persist();

      _this.setState(function (state) {
        return {
          dragDirection: dragDirection,
          startWidth: state.el.offsetWidth,
          startHeight: state.el.offsetHeight,
          startX: e.clientX,
          startY: e.clientY
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragEnd", function () {
      _this.setState({
        dragDirection: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDrag", function (e) {
      var _this$state = _this.state,
          dragDirection = _this$state.dragDirection,
          startWidth = _this$state.startWidth,
          startHeight = _this$state.startHeight,
          startX = _this$state.startX,
          startY = _this$state.startY;
      var changeX = dragDirection.match(/(w|e)$/) ? e.clientX - startX : 0;
      var changeY = dragDirection.match(/^(s|n)/) ? e.clientY - startY : 0;
      var data = {
        width: dragDirection.match(/w$/) ? startWidth - changeX : startWidth + changeX,
        height: dragDirection.match(/^n/) ? startHeight - changeY : startHeight + changeY
      };

      _this.props.onRequestResize(e, data);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function (e, dir) {
      var keyIncrement = _this.props.keyIncrement;
      var key = Object(keyboard_["keycode"])(e);
      var lastDir = dir.match(/.$/)[0]; // the last letter

      var widthMap = {
        e: {
          right: 1,
          left: -1
        },
        w: {
          right: -1,
          left: 1
        }
      };
      var widthAdjust = (widthMap[lastDir] || {})[key] || 0;
      var firstDir = dir.charAt(0);
      var heightMap = {
        n: {
          down: -1,
          up: 1
        },
        s: {
          down: 1,
          up: -1
        }
      };
      var heightAdjust = (heightMap[firstDir] || {})[key] || 0;

      if (widthAdjust || heightAdjust) {
        e.preventDefault();
        var data = {
          width: _this.state.el.offsetWidth + widthAdjust * keyIncrement,
          height: _this.state.el.offsetHeight + heightAdjust * keyIncrement
        };

        _this.props.onRequestResize(e, data);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderHandle", function (dir) {
      var showHandles = _this.props.showHandles;
      var StyledResize = StyledResizes[dir];
      return external_react_default.a.createElement(StyledResize, {
        key: dir,
        "data-test": "resize-handle-".concat(dir),
        onMouseDown: _this["handleDragStart".concat(dir)],
        onKeyDown: _this["handleKeyDown".concat(dir)],
        "data-hover": showHandles === 'on-hover' ? true : undefined
      }, dir.length > 1 && external_react_default.a.createElement(StyledSvg, {
        viewBox: "0 0 11 11"
      }, external_react_default.a.createElement(StyledPath, {
        d: "M0 8 L 8 0 M4 8 L 8 4"
      })), external_react_default.a.createElement(ScreenReaderContent_default.a, null, Resize.handleLabels[dir]));
    });

    _this.state = {}; // Generate handlers for each direction.

    Resize.handleOrder.forEach(function (dir) {
      _this["handleDragStart".concat(dir)] = function (e) {
        _this.handleDragStart(e, dir);
      };

      _this["handleKeyDown".concat(dir)] = function (e) {
        _this.handleKeyDown(e, dir);
      };
    });
    return _this;
  }

  _createClass(Resize, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          resizeHandles = _this$props.resizeHandles;
      var _this$state2 = this.state,
          dragDirection = _this$state2.dragDirection,
          el = _this$state2.el; // Handles are inserted before and after children to optimize tab order

      var beforeHandles = Resize.handleOrder.slice(0, 4).filter(function (dir) {
        return resizeHandles.indexOf(dir) > -1;
      }).map(this.renderHandle);
      var afterHandles = Resize.handleOrder.slice(4).filter(function (dir) {
        return resizeHandles.indexOf(dir) > -1;
      }).map(this.renderHandle);
      /* When appearance is border, determine which sides need margin.
       * Converts ['se', 'n'] to { e: true, s: true, n: true}
       */

      var borderSides = {};

      if (appearance === 'border') {
        resizeHandles.join('').split('').filter(function (val, index, array) {
          return array.indexOf(val) === index;
        }).forEach(function (dir) {
          return borderSides[dir] = true;
        });
      }

      return external_react_default.a.createElement(Styled, _extends({
        "data-test": "resize"
      }, Object(themes_["ref"])(this.handleMount), Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Resize.propTypes)), {
        "data-border-n": borderSides.n,
        "data-border-e": borderSides.e,
        "data-border-s": borderSides.s,
        "data-border-w": borderSides.w
      }), external_react_default.a.createElement("div", null, el && beforeHandles, children, el && afterHandles, dragDirection && external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: "window",
        onMouseMove: this.handleDrag,
        onMouseUp: this.handleDragEnd
      })));
    }
  }]);

  return Resize;
}(external_react_["Component"]);

_defineProperty(Resize_Resize, "propTypes", {
  /** The appearance of the resize handles. */
  appearance: external_prop_types_default.a.oneOf(['border', 'overlay']),

  /** The appearance of the resize handles. */
  showHandles: external_prop_types_default.a.oneOf(['always', 'on-hover']),

  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** When focused on a resize handle, the arrow keys will adjust the height or width by
   * this amount with each press. */
  keyIncrement: external_prop_types_default.a.number,

  /** A callback which is passed the event and an object with the requested height and width. */
  onRequestResize: external_prop_types_default.a.func.isRequired,

  /** An array of resize handles placements. */
  resizeHandles: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'])).isRequired
});

_defineProperty(Resize_Resize, "defaultProps", {
  appearance: 'overlay',
  elementRef: function elementRef() {},
  showHandles: 'always',
  keyIncrement: 10
});

_defineProperty(Resize_Resize, "handleOrder", ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']);

_defineProperty(Resize_Resize, "handleLabels", {
  nw: Object(i18n_["_"])('Resize northwest'),
  n: Object(i18n_["_"])('Resize north'),
  ne: Object(i18n_["_"])('Resize northeast'),
  w: Object(i18n_["_"])('Resize west'),
  e: Object(i18n_["_"])('Resize east'),
  sw: Object(i18n_["_"])('Resize southwest'),
  s: Object(i18n_["_"])('Resize south'),
  se: Object(i18n_["_"])('Resize southeast')
});

/* harmony default export */ var src_Resize_Resize = (Resize_Resize);
// CONCATENATED MODULE: ./src/Resize/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Resize_Resize; });


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

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

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ })

/******/ });