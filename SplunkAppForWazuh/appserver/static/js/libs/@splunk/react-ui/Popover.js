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
/******/ 	return __webpack_require__(__webpack_require__.s = 112);
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

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(37);

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// EXTERNAL MODULE: external "react-motion"
var external_react_motion_ = __webpack_require__(15);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/ui-utils/focus"
var focus_ = __webpack_require__(23);

// EXTERNAL MODULE: external "@splunk/react-ui/Motion"
var Motion_ = __webpack_require__(27);
var Motion_default = /*#__PURE__*/__webpack_require__.n(Motion_);

// EXTERNAL MODULE: external "@splunk/react-ui/RenderToLayer"
var RenderToLayer_ = __webpack_require__(36);
var RenderToLayer_default = /*#__PURE__*/__webpack_require__.n(RenderToLayer_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Popover/getPlacement.js
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getInitialStyle(_ref) {
  var align = _ref.align,
      anchorPos = _ref.anchorPos,
      outerContainerEl = _ref.outerContainerEl,
      padding = _ref.padding,
      placement = _ref.placement;

  switch (placement) {
    case 'above':
      return {
        top: anchorPos.top - outerContainerEl.offsetHeight,
        left: align === 'edge' ? anchorPos.left - padding : anchorPos.middle - outerContainerEl.offsetWidth / 2
      };

    case 'below':
      return {
        top: anchorPos.bottom,
        left: align === 'edge' ? anchorPos.left - padding : anchorPos.middle - outerContainerEl.offsetWidth / 2
      };

    case 'left':
      return {
        top: align === 'edge' ? anchorPos.top - padding : anchorPos.center - outerContainerEl.offsetHeight / 2,
        left: anchorPos.left - outerContainerEl.offsetWidth
      };

    case 'right':
      return {
        top: align === 'edge' ? anchorPos.top - padding : anchorPos.center - outerContainerEl.offsetHeight / 2,
        left: anchorPos.right
      };

    default:
      if (false) {}

      return {};
  }
}

function getPlacement(args) {
  var align = args.align,
      anchorPos = args.anchorPos,
      scrollContainerPos = args.scrollContainerPos,
      canCoverAnchor = args.canCoverAnchor,
      defaultPlacement = args.defaultPlacement,
      outerContainerEl = args.outerContainerEl,
      padding = args.padding,
      repositionMode = args.repositionMode,
      windowHeight = args.windowHeight,
      windowWidth = args.windowWidth;
  var repositionFlip = repositionMode === 'flip';
  var repositionAny = repositionMode === 'any';
  var canReposition = repositionFlip || repositionAny;
  var placement = args.placement || defaultPlacement; // Translate vertical/horizontal to above/below/left/right

  if (defaultPlacement === 'vertical') {
    placement = anchorPos.top > windowHeight - anchorPos.bottom ? 'above' : 'below';
  } else if (defaultPlacement === 'horizontal') {
    placement = anchorPos.left > windowWidth - anchorPos.right ? 'left' : 'right';
  } // Initialize the result variables. These will be mutated as needed and returned.


  var _getInitialStyle = getInitialStyle({
    align: align,
    anchorPos: anchorPos,
    outerContainerEl: outerContainerEl,
    padding: padding,
    placement: placement
  }),
      top = _getInitialStyle.top,
      left = _getInitialStyle.left;

  var bottom = 'auto';
  var maxWidth = windowWidth;
  var maxHeight = windowHeight; // Boolean convenience variables to simplify positioning logic.

  var canPlaceAbove = anchorPos.top - outerContainerEl.offsetHeight > 0;
  var canPlaceBelow = anchorPos.bottom + outerContainerEl.offsetHeight < windowHeight;
  var canPlaceLeft = anchorPos.left - outerContainerEl.offsetWidth > 0;
  var canPlaceRight = anchorPos.right + outerContainerEl.offsetWidth < windowWidth;
  var offScreenRight = (align === 'edge' ? anchorPos.left + outerContainerEl.offsetWidth - padding : anchorPos.middle + outerContainerEl.offsetWidth / 2) > windowWidth;
  var offScreenLeft = (align === 'edge' ? anchorPos.left - padding : anchorPos.middle - outerContainerEl.offsetWidth / 2) < 0;
  var offScreenTop = (align === 'edge' ? anchorPos.top - padding : anchorPos.top - outerContainerEl.offsetHeight / 2) < 0;
  var offScreenBottom = (align === 'edge' ? anchorPos.top + outerContainerEl.offsetHeight - padding : anchorPos.bottom + outerContainerEl.offsetHeight / 2) > windowHeight; // Handle each of the four placement options individually.

  if (placement === 'above') {
    if (!canPlaceAbove && canReposition) {
      if (canPlaceBelow) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'below'
        }));
      }

      if (repositionAny && canPlaceRight) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'right'
        }));
      }

      if (repositionAny && canPlaceLeft) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'left'
        }));
      }

      if (canCoverAnchor) {
        placement = 'misaligned';
        top = 0;
      }
    }

    if (placement !== 'misaligned') {
      bottom = windowHeight - top - outerContainerEl.offsetHeight;

      if (scrollContainerPos) {
        bottom = Math.min(bottom, windowHeight - scrollContainerPos.top);
      }

      top = 'auto';
    }

    if (offScreenRight) {
      left = Math.max(windowWidth - outerContainerEl.offsetWidth, 0);
    } else if (offScreenLeft) {
      left = 0;
    }

    if (!canCoverAnchor) {
      maxHeight = anchorPos.top;
    }
  }

  if (placement === 'below') {
    if (!canPlaceBelow && canReposition) {
      if (canPlaceAbove) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'above'
        }));
      }

      if (repositionAny && canPlaceRight) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'right'
        }));
      }

      if (repositionAny && canPlaceLeft) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'left'
        }));
      }

      if (canCoverAnchor) {
        placement = 'misaligned';
        top = 0;
      }
    }

    if (scrollContainerPos) {
      top = Math.min(top, scrollContainerPos.bottom);
    }

    if (offScreenRight) {
      left = Math.max(windowWidth - outerContainerEl.offsetWidth, 0);
    } else if (offScreenLeft) {
      left = 0;
    }

    if (!canCoverAnchor) {
      maxHeight = windowHeight - anchorPos.bottom;
    }
  }

  if (placement === 'left') {
    if (!canPlaceLeft && canReposition) {
      if (canPlaceRight) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'right'
        }));
      }

      if (repositionAny && canPlaceBelow) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'below'
        }));
      }

      if (repositionAny && canPlaceAbove) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'above'
        }));
      }

      if (canCoverAnchor) {
        placement = 'misaligned';
        top = 0;
      }
    }

    if (offScreenTop) {
      top = 0;
    } else if (offScreenBottom) {
      top = Math.max(windowHeight - outerContainerEl.offsetHeight, 0);
    }

    if (!canCoverAnchor) {
      maxWidth = anchorPos.left;
    }
  }

  if (placement === 'right') {
    if (!canPlaceRight && canReposition) {
      if (canPlaceLeft) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'left'
        }));
      }

      if (repositionAny && canPlaceBelow) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'below'
        }));
      }

      if (repositionAny && canPlaceAbove) {
        return getPlacement(_objectSpread({}, args, {
          placement: 'above'
        }));
      }

      if (canCoverAnchor) {
        placement = 'misaligned';
        top = 0;
      }
    }

    if (offScreenTop) {
      top = 0;
    } else if (offScreenBottom) {
      top = Math.max(windowHeight - outerContainerEl.offsetHeight, 0);
    }

    if (!canCoverAnchor) {
      maxWidth = windowWidth - anchorPos.left;
    }
  }

  return {
    placement: placement,
    maxHeight: maxHeight,
    maxWidth: maxWidth,
    outerContainerStyle: {
      top: top,
      left: left,
      bottom: bottom
    }
  };
}
// CONCATENATED MODULE: ./src/Popover/PopoverStyles.js



var PopoverStyles_arrowHeight = function arrowHeight(props) {
  return "".concat(Object(themes_["variable"])('Popover', 'arrowHeightPixel')(props), "px");
};

var PopoverStyles_padding = function padding(props) {
  return "".concat(Object(themes_["variable"])('Popover', 'paddingPixel')(props), "px");
};

var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "PopoverStyles__Styled",
  componentId: "amqfe1-0"
})(["position:fixed;z-index:", ";left:-300%;top:-300%;"], Object(themes_["variable"])('zindexPopover'));
var StyledBoxWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "PopoverStyles__StyledBoxWrapper",
  componentId: "amqfe1-1"
})(["", ";padding:", ";"], Object(themes_["mixin"])('reset')('block'), PopoverStyles_padding);
var StyledBox = external_styled_components_default.a.div.withConfig({
  displayName: "PopoverStyles__StyledBox",
  componentId: "amqfe1-2"
})(["", ";background-color:transparent;"], Object(themes_["mixin"])('reset')('block'));
var StyledLight = external_styled_components_default()(StyledBox).withConfig({
  displayName: "PopoverStyles__StyledLight",
  componentId: "amqfe1-3"
})(["background-color:", ";color:", ";border:", ";box-shadow:", ";border-radius:", ";"], Object(themes_["variable"])('Popover', 'lightBackgroundColor'), Object(themes_["variable"])('Popover', 'lightColor'), Object(themes_["variable"])('Popover', 'lightBorder'), Object(themes_["variable"])('Popover', 'lightBoxShadow'), Object(themes_["variable"])('borderRadius'));
var StyledDark = external_styled_components_default()(StyledBox).withConfig({
  displayName: "PopoverStyles__StyledDark",
  componentId: "amqfe1-4"
})(["background-color:", ";color:", ";border-radius:", ";"], Object(themes_["variable"])('Popover', 'darkBackgroundColor'), Object(themes_["variable"])('Popover', 'darkColor'), Object(themes_["variable"])('Popover', 'darkBorderRadius'));
var arrow = Object(external_styled_components_["css"])(["width:0;height:0;border-left:", " solid transparent;border-right:", " solid transparent;position:absolute;border-bottom:", " solid ", ";@media all and (-ms-high-contrast:none){opacity:inherit;}"], PopoverStyles_arrowHeight, PopoverStyles_arrowHeight, PopoverStyles_arrowHeight, Object(themes_["variable"])('Popover', 'arrowBorderBottomColor'));
var StyledLightArrow = external_styled_components_default.a.div.withConfig({
  displayName: "PopoverStyles__StyledLightArrow",
  componentId: "amqfe1-5"
})(["", ";&::before{content:'';display:block;width:0;height:0;border-left:", " solid transparent;border-right:", " solid transparent;border-bottom:", " solid ", ";position:absolute;top:1px;left:0;margin-left:-", ";}"], arrow, PopoverStyles_arrowHeight, PopoverStyles_arrowHeight, PopoverStyles_arrowHeight, Object(themes_["variable"])('backgroundColor'), PopoverStyles_arrowHeight);
var StyledDarkArrow = external_styled_components_default.a.div.withConfig({
  displayName: "PopoverStyles__StyledDarkArrow",
  componentId: "amqfe1-6"
})(["", ";border-bottom-color:", ";"], arrow, Object(themes_["variable"])('Popover', 'darkArrowBorderBottomColor'));
var StyledLowerRightCorner = external_styled_components_default.a.div.withConfig({
  displayName: "PopoverStyles__StyledLowerRightCorner",
  componentId: "amqfe1-7"
})(["position:fixed;right:0;bottom:0;"]);

// CONCATENATED MODULE: ./src/Popover/Popover.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Popover_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { Popover_defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Popover_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















function everyApproxEqual(a, b) {
  var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return !!a && !!b && Object(external_lodash_["every"])(a, function (val, key) {
    if (Object(external_lodash_["isFinite"])(val)) {
      return Math.abs(b[key] - val) <= threshold;
    }

    return b[key] === val;
  });
}
/**
 * Popover is used to create layovers such as dropdowns, contextual menus or tooltips. Only use
 * this when the other components do not provide sufficient functionality or control. A controlled
 * Dropdown will cover use cases where one would consider using Popover directly.
 */


var Popover_Popover =
/*#__PURE__*/
function (_Component) {
  _inherits(Popover, _Component);

  _createClass(Popover, null, [{
    key: "getArrowStyle",
    value: function getArrowStyle(_ref) {
      var anchorPos = _ref.anchorPos,
          arrowHeight = _ref.arrowHeight,
          placement = _ref.placement,
          outerContainerStyle = _ref.outerContainerStyle,
          outerContainerEl = _ref.outerContainerEl;

      if (placement === 'misaligned') {
        return {
          display: 'none'
        };
      }

      var style = {
        top: null,
        right: null,
        bottom: null,
        left: null,
        display: 'block'
      };
      var maxVertDiff = outerContainerEl.offsetHeight / 2 - 22;
      var minVertDiff = -(outerContainerEl.offsetHeight / 2 - 15);
      var initVertDiff = anchorPos.center - (outerContainerStyle.top + outerContainerEl.offsetHeight / 2) - arrowHeight / 2;
      var vertDiff = Object(external_lodash_["clamp"])(initVertDiff, minVertDiff, maxVertDiff);
      var horizontalDiff = anchorPos.middle - (outerContainerStyle.left + outerContainerEl.offsetWidth / 2) - arrowHeight;
      var transform = {
        left: "translate(".concat(arrowHeight / 2, "px, ").concat(vertDiff, "px) rotate(90deg)"),
        right: "translate(-".concat(arrowHeight / 2, "px, ").concat(vertDiff, "px) rotate(-90deg)"),
        above: "translateX(".concat(horizontalDiff, "px) rotate(180deg)"),
        below: "translateX(".concat(horizontalDiff, "px) rotate(0)")
      };
      style.transform = transform[placement]; // set new positions

      var origin1 = {
        left: 'right',
        right: 'left',
        above: 'bottom',
        below: 'top'
      };
      style[origin1[placement]] = '1px';
      var origin2 = {
        left: 'top',
        right: 'top',
        above: 'left',
        below: 'left'
      };
      style[origin2[placement]] = '50%';
      return style;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.open !== state.prevOpen) {
        return {
          animating: props.animation,
          prevOpen: props.open
        };
      }

      return null;
    }
  }]);

  function Popover(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Popover);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Popover)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElPosition", function (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      var a = {
        top: rect.top,
        left: rect.left,
        width: anchorEl.offsetWidth,
        height: anchorEl.offsetHeight
      };
      var pointTo = _this.props.pointTo;
      a.right = rect.right || a.left + a.width;
      a.bottom = rect.bottom || a.top + a.height;
      a.middle = pointTo && Object(external_lodash_["has"])(pointTo, 'x') ? a.left + pointTo.x : a.left + (a.right - a.left) / 2;
      a.center = pointTo && Object(external_lodash_["has"])(pointTo, 'y') ? a.top + pointTo.y : a.top + (a.bottom - a.top) / 2;
      return a;
    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPlacement", function (scrolling) {
      _this.setState(function (state) {
        var _this$props = _this.props,
            align = _this$props.align,
            anchor = _this$props.anchor,
            autoCloseWhenOffScreen = _this$props.autoCloseWhenOffScreen,
            canCoverAnchor = _this$props.canCoverAnchor,
            defaultPlacement = _this$props.defaultPlacement,
            open = _this$props.open,
            repositionMode = _this$props.repositionMode,
            scrollContainer = _this$props.scrollContainer,
            theme = _this$props.theme; // If these conditions are not met, we cannot set the popover.

        if (!open || !_this.outerContainer || !anchor) {
          return null;
        } // eslint-disable-next-line react/no-find-dom-node


        var outerContainerEl = Object(external_react_dom_["findDOMNode"])(_this.outerContainer);

        var anchorPos = _this.getElPosition(state.anchorEl);

        var scrollContainerPos = scrollContainer !== 'window' && _this.getElPosition(scrollContainer);

        if (scrolling && autoCloseWhenOffScreen) {
          if (_this.autoCloseWhenOffScreen(anchorPos, scrollContainerPos)) {
            return null;
          }
        }

        var arrowHeight = Object(themes_["variable"])('Popover', 'arrowHeightPixel')({
          theme: theme
        });
        var padding = Object(themes_["variable"])('Popover', 'paddingPixel')({
          theme: theme
        });

        var _getPlacement = getPlacement({
          align: align === 'theme' ? Object(themes_["variable"])('Popover', 'align')({
            theme: theme
          }) || 'center' : align,
          anchorPos: anchorPos,
          scrollContainerPos: scrollContainerPos,
          canCoverAnchor: canCoverAnchor,
          defaultPlacement: defaultPlacement,
          repositionMode: repositionMode,
          outerContainerEl: outerContainerEl,
          padding: padding,
          windowWidth: _this.windowSizeMeasurementEl.offsetLeft,
          windowHeight: _this.windowSizeMeasurementEl.offsetTop
        }),
            placement = _getPlacement.placement,
            outerContainerStyle = _getPlacement.outerContainerStyle,
            maxHeight = _getPlacement.maxHeight,
            maxWidth = _getPlacement.maxWidth;

        var arrowStyle = _this.arrow && Popover.getArrowStyle({
          anchorPos: anchorPos,
          arrowHeight: arrowHeight,
          outerContainerStyle: outerContainerStyle,
          placement: placement,
          outerContainerEl: outerContainerEl
        }); // If none of the position data has changed, do not set state.

        if (everyApproxEqual(anchorPos, state.anchorPos) && everyApproxEqual(outerContainerStyle, state.outerContainerStyle) && everyApproxEqual(arrowStyle, state.arrowStyle) && placement === state.placement && maxHeight === state.maxHeight && maxWidth === state.maxWidth) {
          return null;
        }

        return {
          anchorPos: anchorPos,
          arrowStyle: arrowStyle,
          outerContainerStyle: outerContainerStyle,
          placement: placement,
          maxHeight: maxHeight,
          maxWidth: maxWidth
        };
      });
    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNewAnchor", function (anchor) {
      // eslint-disable-next-line react/no-find-dom-node
      var anchorEl = anchor ? Object(external_react_dom_["findDOMNode"])(anchor) : null;
      var anchorPos = anchorEl ? _this.getElPosition(anchorEl) : null;

      _this.setState({
        anchorEl: anchorEl,
        anchorPos: anchorPos
      }); // eslint-disable-line react/no-unused-state

    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInnerContainerMount", function (element) {
      _this.innerContainerEl = element;

      if (element && _this.props.takeFocus) {
        Object(external_lodash_["defer"])(focus_["takeFocus"], element);
      }
    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTab", function (e) {
      Object(focus_["handleTab"])(_this.innerContainerEl, e);
    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestClose", function (data) {
      if (_this.props.open) {
        _this.requestClose(data);
      }
    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAnimationEnd", function () {
      _this.setState({
        animating: false
      });
    });

    Popover_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderLayer", function () {
      var _this$props2 = _this.props,
          animation = _this$props2.animation,
          appearance = _this$props2.appearance,
          children = _this$props2.children,
          id = _this$props2.id,
          open = _this$props2.open;
      var _this$state = _this.state,
          anchorPos = _this$state.anchorPos,
          arrowStyle = _this$state.arrowStyle,
          outerContainerStyle = _this$state.outerContainerStyle,
          placement = _this$state.placement;
      var _this$state2 = _this.state,
          maxHeight = _this$state2.maxHeight,
          maxWidth = _this$state2.maxWidth; // Accomodate the arrow in the maxHeight and maxWidth.

      if (appearance !== 'none') {
        if (Object(external_lodash_["isFinite"])(maxHeight)) {
          maxHeight -= 20;
        }

        if (Object(external_lodash_["isFinite"])(maxWidth)) {
          maxWidth -= 20;
        }
      }

      var childData = {
        anchorHeight: anchorPos ? anchorPos.height : null,
        anchorWidth: anchorPos ? anchorPos.width : null,
        placement: placement,
        maxHeight: maxHeight,
        maxWidth: maxWidth
      };
      var motionStyle = animation ? {
        opacity: Object(external_react_motion_["spring"])(open ? 1 : 0, {
          stiffness: 300,
          damping: 40,
          precision: 1
        })
      } : {
        opacity: 1
      };
      var StyledBoxComponent = appearance === 'none' ? StyledBox : StyledBoxWrapper;
      var StyledArrow = appearance === 'light' ? StyledLightArrow : StyledDarkArrow;
      var StyledAppearance = appearance === 'light' ? StyledLight : StyledDark;
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return external_react_default.a.createElement(Motion_default.a, {
        defaultStyle: {
          opacity: animation ? 0 : 1
        },
        style: motionStyle,
        onRest: _this.handleAnimationEnd
      }, function (_ref2) {
        var opacity = _ref2.opacity;
        return external_react_default.a.createElement(Styled, _extends({
          style: Popover_objectSpread({}, outerContainerStyle, {
            opacity: opacity
          })
        }, Object(themes_["ref"])(function (c) {
          return _this.outerContainer = c;
        })), (open || _this.state.animating) && external_react_default.a.createElement(StyledBoxComponent, _extends({
          "data-test": "popover"
        }, Object(themes_["ref"])(_this.handleInnerContainerMount), {
          tabIndex: -1,
          id: id,
          onKeyDown: _this.props.retainFocus ? _this.handleTab : null
        }, Object(external_lodash_["omit"])(_this.props, Object(external_lodash_["keys"])(Popover.propTypes))), appearance === 'none' && children, appearance !== 'none' && external_react_default.a.createElement(StyledArrow, _extends({}, Object(themes_["ref"])(function (arrow) {
          return _this.arrow = arrow;
        }), {
          style: arrowStyle
        })), appearance !== 'none' && external_react_default.a.createElement(StyledAppearance, null, Object(external_lodash_["isFunction"])(children) ? children(childData) : children)), external_react_default.a.createElement(StyledLowerRightCorner, Object(themes_["ref"])(function (el) {
          return _this.windowSizeMeasurementEl = el;
        })));
      });
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    });

    _this.handleScroll = Object(external_lodash_["throttle"])(_this.setPlacement.bind(_assertThisInitialized(_assertThisInitialized(_this)), true), 0);
    _this.setPlacement = Object(external_lodash_["throttle"])(_this.setPlacement, 0, {
      leading: false
    });
    _this.state = {
      anchorEl: null,
      // eslint-disable-line react/no-unused-state
      animating: false,
      prevOpen: props.open
    };
    return _this;
  }

  _createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleNewAnchor(this.props.anchor);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.anchor !== this.props.anchor) {
        this.handleNewAnchor(this.props.anchor);
      }

      if (!this.innerContainerEl) {
        return;
      }

      if (this.props.open || this.state.animating) {
        this.setPlacement();

        if (!prevProps.open && this.props.takeFocus) {
          Object(focus_["takeFocus"])(this.innerContainerEl);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setPlacement.cancel();
      this.handleScroll.cancel();
    }
  }, {
    key: "autoCloseWhenOffScreen",
    value: function autoCloseWhenOffScreen(anchorPosition, scrollContainerPosition) {
      if (anchorPosition.top < 0 || anchorPosition.top > window.innerHeight || anchorPosition.left < 0 || anchorPosition.left > window.innerWidth) {
        this.requestClose({
          reason: 'offScreen'
        });
        return true;
      }

      if (scrollContainerPosition) {
        if (anchorPosition.height + anchorPosition.top < scrollContainerPosition.top || anchorPosition.top > scrollContainerPosition.bottom || anchorPosition.width + anchorPosition.left < scrollContainerPosition.left || anchorPosition.left > scrollContainerPosition.right) {
          this.requestClose({
            reason: 'offScreen'
          });
          return true;
        }
      }

      return false;
    }
  }, {
    key: "requestClose",
    value: function requestClose(data) {
      if (Object(external_lodash_["includes"])(this.props.closeReasons, data.reason)) {
        this.props.onRequestClose(data);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return [external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: this.props.scrollContainer || 'window',
        onScroll: this.handleScroll,
        onResize: this.setPlacement,
        key: "eventListener"
      }), external_react_default.a.createElement(RenderToLayer_default.a, {
        closeReasons: Object(external_lodash_["intersection"])(this.props.closeReasons, RenderToLayer_default.a.possibleCloseReasons),
        ref: function ref(c) {
          return _this2.layer = c;
        },
        open: this.props.open || this.state.animating,
        onRequestClose: this.handleRequestClose,
        render: this.renderLayer,
        key: "renderToLayer"
      })];
    }
  }]);

  return Popover;
}(external_react_["Component"]);

Popover_defineProperty(Popover_Popover, "possibleCloseReasons", ['clickAway', 'escapeKey', 'offScreen']);

Popover_defineProperty(Popover_Popover, "propTypes", {
  /**
   * The Popover can align itself to the center of the anchor or to its edges.
   * @private
   */
  align: external_prop_types_default.a.oneOf(['center', 'edge', 'theme']),

  /**
   * This is the element or component that will be used to set the position of the popover. It
   * is required when the Popover is open and must be mounted.
   */
  // eslint-disable-next-line consistent-return
  anchor: function anchor(props) {
    if (props.open) {
      var _PropTypes$object;

      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      return (_PropTypes$object = external_prop_types_default.a.object).isRequired.apply(_PropTypes$object, [props].concat(rest));
    }
  },

  /**
   * This prop allows the popover to point to and align with a different part of the anchor.
   * The x and y values are relative to the upper left corner of the anchor. It will always
   * point to the edge of the anchor. When positioned above or below, only the x value is
   * used. When positioned left or right, only the y value is used.
   */
  pointTo: external_prop_types_default.a.shape({
    x: external_prop_types_default.a.number,
    y: external_prop_types_default.a.number
  }),

  /**
   * If true, the popover will apply transitions when
   * it is added to the DOM.
   */
  animation: external_prop_types_default.a.bool,

  /**
   * The light appearance is used for menus, while the dark appearance is for tooltips.
   * None is a transparent box.
   */
  appearance: external_prop_types_default.a.oneOf(['light', 'dark', 'none']),

  /**
   * If true, the popover will hide when the anchor is scrolled off the screen.
   */
  autoCloseWhenOffScreen: external_prop_types_default.a.bool,

  /**
   * If there is not enough room to render the `Popover` in a direction, this option enables
   * it to be rendered over the anchor.
   */
  canCoverAnchor: external_prop_types_default.a.bool,

  /**
   * The content of the `Popover`. If a function is provided, it will be invoked with an
   * object containing `anchorHeight`, `anchorWidth`, `maxHeight`, `maxWidth`, and
   * `placement`.
   */
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.node, external_prop_types_default.a.func]),

  /**
   * An array of reasons for which this Popover should close.
   */
  closeReasons: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(Popover_Popover.possibleCloseReasons)),

  /**
   * The default placement of the `Popover`. It might be rendered in a different direction
   * depending upon the space available and the `repositionMode`.
   */
  defaultPlacement: external_prop_types_default.a.oneOf(['above', 'below', 'left', 'right', 'vertical', 'horizontal']),

  /**
   * @private.
   */
  id: external_prop_types_default.a.string,

  /**
   * Callback function fired when the popover is requested to be closed.
   *
   * @param {object} data
   * @param {string} data.reason The reason for the close request.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * If true, the popover is visible.
   */
  open: external_prop_types_default.a.bool,

  /**
   * If the `Popover` does not fit in the `defaultPlacement`, `repositionMode` determines if
   * and how the `Popover` will reposition itself to fit on the page.
   *     * `none` - Do not reposition the `Popover`. It will always render in the
   * `defaultPlacement` direction.
   *     * `flip` - Allows the `Popover` to reposition to the opposite of the
   *                `defaultPlacement`
   * if it can fit there (and not in the `defaultPlacement`).
   *     * `any` - Allows the `Popover` to reposition in any direction if it can fit on the
   *               page.
   */
  repositionMode: external_prop_types_default.a.oneOf(['none', 'flip', 'any']),

  /**
   * Keep focus within the Popover while open.
   */
  retainFocus: external_prop_types_default.a.bool,

  /**
   * The container with which the popover must scroll to stay aligned with the anchor.
   */
  scrollContainer: external_prop_types_default.a.oneOfType([external_prop_types_default.a.object, external_prop_types_default.a.string]),

  /**
   * When true, the Popover will automatically take focus when 'open' changes to true.
   * Disable this for a Popover that has shows on hover, such as a tooltip.
   */
  takeFocus: external_prop_types_default.a.bool,

  /** @private */
  theme: external_prop_types_default.a.object
});

Popover_defineProperty(Popover_Popover, "defaultProps", {
  align: 'theme',
  animation: true,
  appearance: 'light',
  autoCloseWhenOffScreen: true,
  canCoverAnchor: false,
  closeReasons: Popover_Popover.possibleCloseReasons,
  defaultPlacement: 'below',
  onRequestClose: function onRequestClose() {},
  open: false,
  repositionMode: 'flip',
  retainFocus: true,
  scrollContainer: 'window',
  takeFocus: false,
  theme: null
});

/* harmony default export */ var src_Popover_Popover = (Object(external_styled_components_["withTheme"])(Popover_Popover));
// CONCATENATED MODULE: ./src/Popover/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Popover_Popover; });


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("react-event-listener");

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/focus");

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Motion");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 36:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/RenderToLayer");

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ })

/******/ });