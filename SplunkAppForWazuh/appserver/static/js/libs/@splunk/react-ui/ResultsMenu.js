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
/******/ 	return __webpack_require__(__webpack_require__.s = 119);
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

/***/ 119:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/userAgent"
var userAgent_ = __webpack_require__(72);

// EXTERNAL MODULE: external "@splunk/react-ui/Menu"
var Menu_ = __webpack_require__(17);
var Menu_default = /*#__PURE__*/__webpack_require__.n(Menu_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/WaitSpinner"
var WaitSpinner_ = __webpack_require__(73);
var WaitSpinner_default = /*#__PURE__*/__webpack_require__.n(WaitSpinner_);

// CONCATENATED MODULE: ./src/ResultsMenu/ResultsMenuStyles.js



var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "ResultsMenuStyles__Styled",
  componentId: "sc-1rzt9g8-0"
})(["", ";flex-direction:column;max-height:calc(100vh - 20px);"], Object(themes_["mixin"])('reset')('flex'));
var StyledFooter = external_styled_components_default.a.div.withConfig({
  displayName: "ResultsMenuStyles__StyledFooter",
  componentId: "sc-1rzt9g8-1"
})(["padding:6px ", ";color:", ";&:not([data-placement='above']){border-top:", ";}&[data-placement='above']{border-bottom:", ";}"], Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('ResultsMenu', 'footerColor'), Object(themes_["variable"])('border'), Object(themes_["variable"])('border'));
var StyledLoading = external_styled_components_default.a.li.withConfig({
  displayName: "ResultsMenuStyles__StyledLoading",
  componentId: "sc-1rzt9g8-2"
})(["", ";padding:6px ", ";"], Object(themes_["mixin"])('reset')('flex'), Object(themes_["variable"])('spacingHalf'));
var StyledWait = external_styled_components_default()(WaitSpinner_default.a).withConfig({
  displayName: "ResultsMenuStyles__StyledWait",
  componentId: "sc-1rzt9g8-3"
})(["margin-right:", ";flex:0 0 auto;"], Object(themes_["variable"])('spacingQuarter'));
var StyledLoadingMessage = external_styled_components_default.a.div.withConfig({
  displayName: "ResultsMenuStyles__StyledLoadingMessage",
  componentId: "sc-1rzt9g8-4"
})(["color:", ";flex:1 0 0px;"], Object(themes_["variable"])('ResultsMenu', 'loadingMessageColor'));

// CONCATENATED MODULE: ./src/ResultsMenu/ResultsMenu.jsx
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










var ResultsMenu_ResultsMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(ResultsMenu, _Component);

  function ResultsMenu(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResultsMenu);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResultsMenu)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMenuMount", function (menuEl) {
      _this.setState({
        menuEl: menuEl
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (containerEl) {
      _this.setState({
        containerEl: containerEl
      });

      _this.props.elementRef(containerEl);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseEnter", function () {
      _this.setState({
        windowTop: document.documentElement.scrollTop
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMouseLeave", function () {
      _this.setState({
        windowTop: document.documentElement.scrollTop
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScroll", function (e) {
      if (e.target && _this.state.menuEl) {
        var bottomScrollMenu = _this.state.menuEl.scrollHeight - _this.state.menuEl.offsetHeight - _this.scrollBottomOffset; // Adding 1 due to border of menu item.

        if (_this.state.menuEl.scrollTop + 1 >= bottomScrollMenu) {
          _this.handleScrollBottom(e);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWheelMenu", function (e) {
      // Safety net to ensure window doesn't scroll if menu is scrolled pass the numberOfItemsLoaded at high velocity.
      e.stopPropagation();
      document.documentElement.scrollTop = _this.state.windowTop;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScrollBottomOnFullMenu", function () {
      var currentChildrenCount = external_react_["Children"].count(_this.props.children);
      var _this$state = _this.state,
          childrenCount = _this$state.childrenCount,
          menuEl = _this$state.menuEl,
          menuMaxHeight = _this$state.menuMaxHeight; // If menu is full length, load more items.

      if (menuEl.scrollHeight === menuEl.offsetHeight) {
        _this.handleScrollBottom();
      }

      if (menuMaxHeight && currentChildrenCount !== childrenCount) {
        // Update state if children count differs.
        _this.setState({
          numberOfItemsLoaded: currentChildrenCount - childrenCount,
          childrenCount: currentChildrenCount,
          scrollBottomTriggered: false
        });
      }
    });

    _this.state = {
      containerEl: null,
      menuMaxHeight: null,
      windowTop: 0,
      numberOfItemsLoaded: 0
    }; // The remaining amount of pixels when scrolled from bottom of menu to trigger onScrollBottom().

    _this.scrollBottomOffset = 400;
    _this.itemMinHeight = 28;
    return _this;
  }

  _createClass(ResultsMenu, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$state2 = this.state,
          containerEl = _this$state2.containerEl,
          menuEl = _this$state2.menuEl;

      if (!userAgent_["isIE11"] || !containerEl) {
        return;
      }

      if (this.props.maxHeight) {
        var otherElementsHeight = containerEl.scrollHeight - menuEl.clientHeight;
        var menuMaxHeight = this.props.maxHeight - otherElementsHeight;

        if (Math.abs(this.state.menuMaxHeight - menuMaxHeight) > 1) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            menuMaxHeight: menuMaxHeight
          });
        }
      } // If onScrollBottom is defined, determine if it should be triggered.


      if (this.props && this.props.onScrollBottom && this.props.children) {
        this.handleScrollBottomOnFullMenu();
      }
    }
  }, {
    key: "handleScrollBottom",
    value: function handleScrollBottom(e) {
      // Prevent multiple calls to onScrollBottom.
      if (!this.state.scrollBottomTriggered) {
        this.setState({
          scrollBottomTriggered: true
        });
        this.props.onScrollBottom(e);
      }
    }
  }, {
    key: "renderFooterMessage",
    value: function renderFooterMessage() {
      return this.props.footerMessage && !!this.props.children.length && external_react_default.a.createElement(StyledFooter, {
        key: "footer",
        "data-placement": this.props.placement
      }, this.props.footerMessage);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animateLoading = _this$props.animateLoading,
          children = _this$props.children,
          childrenStart = _this$props.childrenStart,
          isLoading = _this$props.isLoading,
          loadingMessage = _this$props.loadingMessage,
          noOptionsMessage = _this$props.noOptionsMessage,
          onScrollBottom = _this$props.onScrollBottom,
          placement = _this$props.placement,
          style = _this$props.style;
      var otherProps = Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(ResultsMenu.propTypes)); // Assumption: that you cannot be filtered if you are a result

      var hasResults = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).some(function (_ref) {
        var type = _ref.type;
        return !(type.filterFirst || type.filterLast || type.filterConsecutive);
      });
      /* eslint-disable jsx-a11y/aria-role */

      return external_react_default.a.createElement(Styled, _extends({
        "data-placement": placement,
        key: "wrapper",
        style: style
      }, Object(themes_["ref"])(this.handleMount), {
        onWheel: onScrollBottom ? this.handleWheelMenu : undefined,
        onMouseEnter: onScrollBottom ? this.handleMouseEnter : undefined,
        onMouseLeave: onScrollBottom ? this.handleMouseLeave : undefined
      }, otherProps), placement !== 'above' && childrenStart, placement === 'above' && this.renderFooterMessage(), external_react_default.a.createElement(Menu_default.a, {
        key: "menu",
        style: {
          overflow: 'auto',
          maxHeight: this.state.menuMaxHeight || 'calc(100vh - 20px)',
          flexDirection: 'column'
        },
        elementRef: this.handleMenuMount,
        onScroll: onScrollBottom ? this.handleScroll : undefined,
        stopScrollPropagation: true,
        role: "listbox"
      }, !hasResults && noOptionsMessage && !isLoading && external_react_default.a.createElement(Menu_default.a.Item, {
        "data-test": "no-results-message",
        disabled: true
      }, noOptionsMessage), children, onScrollBottom && // Bottom spacer fills in the space of new items being loaded by using the minimum possible height x menuItems.
      external_react_default.a.createElement("div", {
        style: {
          height: this.state.scrollBottomTriggered ? this.state.numberOfItemsLoaded * this.itemMinHeight || 0 : 0
        }
      }), isLoading && external_react_default.a.createElement(StyledLoading, null, animateLoading && external_react_default.a.createElement(StyledWait, null), external_react_default.a.createElement(StyledLoadingMessage, null, loadingMessage))), placement !== 'above' && this.renderFooterMessage(), placement === 'above' && childrenStart);
    }
  }]);

  return ResultsMenu;
}(external_react_["Component"]);

_defineProperty(ResultsMenu_ResultsMenu, "propTypes", {
  /*
   * Whether or not to show the wait spinner when loading. It's recommended to set this to
   * `true` when loading may take more than one second.
   */
  animateLoading: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.node,

  /*
   * `childrenStart` are nearest the toggle, so they are not necessarily on top.
   * This is extendable to add `childrenTop`, `childrenEnd`, and `childrenBottom` in the
   * future.
   */
  childrenStart: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /*
   * Whether or not to show the loading message and/or wait spinner. It's not recommended to
   * pass old children when loading new children. The loading animation will show below any
   * children, so therefore it may be necessary to scroll to see the animation.
   */
  isLoading: external_prop_types_default.a.bool,
  loadingMessage: external_prop_types_default.a.node,
  maxHeight: external_prop_types_default.a.number,
  noOptionsMessage: external_prop_types_default.a.node,

  /**
   * A callback function when the list is scrolled to the bottom. Set to null when all items are loaded.
   */
  onScrollBottom: external_prop_types_default.a.func,
  placement: external_prop_types_default.a.string,
  style: external_prop_types_default.a.object,
  footerMessage: external_prop_types_default.a.node
});

_defineProperty(ResultsMenu_ResultsMenu, "defaultProps", {
  animateLoading: false,
  elementRef: function elementRef() {},
  isLoading: false,
  loadingMessage: Object(i18n_["_"])('Loading...'),
  noOptionsMessage: Object(i18n_["_"])('No matches')
});

_defineProperty(ResultsMenu_ResultsMenu, "Item", Menu_["Item"]);

_defineProperty(ResultsMenu_ResultsMenu, "Divider", Menu_["Divider"]);

_defineProperty(ResultsMenu_ResultsMenu, "Heading", Menu_["Heading"]);

/* harmony default export */ var src_ResultsMenu_ResultsMenu = (ResultsMenu_ResultsMenu);

// CONCATENATED MODULE: ./src/ResultsMenu/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_ResultsMenu_ResultsMenu; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Item", function() { return Menu_["Item"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Divider", function() { return Menu_["Divider"]; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Heading", function() { return Menu_["Heading"]; });



/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Menu");

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

/***/ 72:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/userAgent");

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/WaitSpinner");

/***/ })

/******/ });