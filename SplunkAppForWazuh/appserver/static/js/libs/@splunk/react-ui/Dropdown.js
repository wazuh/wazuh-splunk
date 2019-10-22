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
/******/ 	return __webpack_require__(__webpack_require__.s = 145);
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

/***/ 10:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/id");

/***/ }),

/***/ 145:
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

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/Popover"
var Popover_ = __webpack_require__(19);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Dropdown/DropdownStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "DropdownStyles__StyledBox",
  componentId: "sc-1o1y1zt-0"
})(["position:relative;flex-shrink:1;[data-inline] + &[data-inline]{margin-left:", ";}"], Object(themes_["variable"])('spacingHalf'));

// CONCATENATED MODULE: ./src/Dropdown/Dropdown.jsx
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








var Dropdown_Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  /**
   * Enumeration of the possible reasons for closing the Select.
   * 'clickAway', 'escapeKey', and 'offScreen' are inherited from Popover, but repeated here for
   * docs extraction.
   */
  function Dropdown(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Dropdown)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleContainerMount", function (el) {
      _this.setState({
        anchor: el
      });

      _this.props.elementRef(el);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleToggleClick", function (event) {
      if (_this.props.toggle.props.onClick) {
        _this.props.toggle.props.onClick(event);
      }

      if (_this.isOpen()) {
        _this.handleRequestClose({
          reason: 'toggleClick',
          event: event
        });
      } else {
        _this.props.onRequestOpen(event, {
          reason: 'toggleClick'
        });

        if (!_this.isControlled()) {
          _this.setState({
            open: true
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestClose", function (info) {
      var reason = info.reason,
          event = info.event;
      var _this$props = _this.props,
          closeReasons = _this$props.closeReasons,
          focusToggleReasons = _this$props.focusToggleReasons,
          onRequestClose = _this$props.onRequestClose;

      if (reason === 'clickAway') {
        var el = event.target;
        var toggleId = _this.props.toggle.props.id || _this.toggleId;

        while (el) {
          // Ignore clicks on toggle.
          if (el.id === toggleId) {
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

        onRequestClose(info);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleContentClick", function (event) {
      _this.handleRequestClose({
        reason: 'contentClick',
        event: event
      });
    });

    _this.state = {
      open: false,
      anchor: null
    };
    _this.controlledExternally = Object(external_lodash_["has"])(props, 'open');
    _this.popoverId = Object(id_["createDOMID"])('popover');
    _this.toggleId = Object(id_["createDOMID"])('toggle');
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (false) {}
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.isControlled() ? this.props.open : this.state.open;
    }
    /**
     * Place focus on the toggle.
     */

  }, {
    key: "focus",
    value: function focus() {
      if (this.toggle && this.toggle.focus) {
        this.toggle.focus();
      }
    }
  }, {
    key: "isControlled",
    value: function isControlled() {
      return this.controlledExternally;
    }
  }, {
    key: "renderToggle",
    value: function renderToggle() {
      var _this2 = this;

      return Object(external_react_["cloneElement"])(this.props.toggle, {
        onClick: this.handleToggleClick,
        style: Object(external_lodash_["extend"])({
          minWidth: '100%'
        }, this.props.toggle.props.style),
        ref: function ref(c) {
          return _this2.toggle = c;
        },
        'aria-haspopup': true,
        'aria-owns': this.isOpen() ? this.popoverId : null,
        'aria-expanded': this.isOpen(),
        'data-test': this.props.toggle.props['data-test'] || 'toggle',
        id: this.props.toggle.props.id || this.toggleId
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          canCoverAnchor = _this$props2.canCoverAnchor,
          children = _this$props2.children,
          closeReasons = _this$props2.closeReasons,
          defaultPlacement = _this$props2.defaultPlacement,
          inline = _this$props2.inline,
          repositionMode = _this$props2.repositionMode,
          retainFocus = _this$props2.retainFocus,
          scrollContainer = _this$props2.scrollContainer,
          takeFocus = _this$props2.takeFocus;
      var anchor = this.state.anchor;
      var handleRequestClose = this.handleRequestClose,
          handleContentClick = this.handleContentClick;
      return external_react_default.a.createElement(StyledBox, _extends({
        elementRef: this.handleContainerMount,
        "data-test": "dropdown",
        "data-test-popover-id": this.popoverId,
        inline: inline
      }, Object(external_lodash_["omit"])(this.props, Object(external_lodash_["keys"])(Dropdown.propTypes))), this.renderToggle(), external_react_default.a.createElement(Popover_default.a, {
        open: !!anchor && this.isOpen(),
        autoCloseWhenOffScreen: Object(external_lodash_["includes"])(closeReasons, 'offScreen'),
        anchor: anchor,
        appearance: "light",
        canCoverAnchor: canCoverAnchor,
        retainFocus: retainFocus,
        defaultPlacement: defaultPlacement,
        onRequestClose: handleRequestClose,
        repositionMode: repositionMode,
        scrollContainer: scrollContainer,
        id: this.popoverId,
        "aria-labelledby": this.props.toggle.props.id || this.toggleId,
        takeFocus: takeFocus
      }, Object(external_lodash_["isFunction"])(children) ? // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      function () {
        return external_react_default.a.createElement("div", {
          onClick: handleContentClick
        }, children.apply(void 0, arguments));
      } : // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      external_react_default.a.createElement("div", {
        onClick: handleContentClick
      }, children)));
    }
  }]);

  return Dropdown;
}(external_react_["Component"]);

_defineProperty(Dropdown_Dropdown, "possibleCloseReasons", ['clickAway', 'contentClick', 'escapeKey', 'offScreen', 'toggleClick']);

_defineProperty(Dropdown_Dropdown, "propTypes", {
  /**
   * If there is not enough room to render the `Dropdown` in a direction, this option
   * enables it to be rendered over the toggle.
   */
  canCoverAnchor: external_prop_types_default.a.bool,

  /**
   * The content of the `Dropdown`. If a function is provided, it will be invoked with an
   * object containing `anchorHeight`, `anchorWidth`, `maxHeight`, `maxWidth`, and
   * `placement`.
   */
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.node, external_prop_types_default.a.func]),

  /**
   * An array of reasons for which this `Dropdown` should close.
   */
  closeReasons: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(Dropdown_Dropdown.possibleCloseReasons)),

  /**
   * The default placement of the `Dropdown`. It might be rendered in a different direction
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
  focusToggleReasons: external_prop_types_default.a.arrayOf(external_prop_types_default.a.oneOf(Dropdown_Dropdown.possibleCloseReasons)),

  /**
   * Inline or block element.
   * Setting inline to false will remove the dropdown fills the width of it's container.
   */
  inline: external_prop_types_default.a.bool,

  /**
   * A callback function invoked with a data object containing the event (if applicable) and
   * a reason for the close request.
   */
  onRequestClose: external_prop_types_default.a.func,

  /**
   * A callback function invoked with a data object containing the event. (The reason is
   * always toggleClick).
   */
  onRequestOpen: external_prop_types_default.a.func,

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
   * Keep focus within the Popover while open. Note, Menu handles it's own focus by default,
   * so this is only necessary when the popover contains other types of content.
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

  /**
   * A toggle, such as a button, must be a passed. `aria-haspopup`, `aria-expanded`, and
   * `aria-owns` attributes will be applied to the toggle to support accessibility.
   * Recommendation: The element should have a `focus` method to support keyboard navigation
   * and accessibility.
   */
  toggle: external_prop_types_default.a.element.isRequired
});

_defineProperty(Dropdown_Dropdown, "defaultProps", {
  canCoverAnchor: true,
  closeReasons: Dropdown_Dropdown.possibleCloseReasons,
  defaultPlacement: 'below',
  elementRef: function elementRef() {},
  focusToggleReasons: ['contentClick', 'escapeKey', 'toggleClick'],
  inline: true,
  onRequestClose: function onRequestClose() {},
  onRequestOpen: function onRequestOpen() {},
  retainFocus: false,
  repositionMode: 'flip',
  scrollContainer: 'window',
  takeFocus: true
});

/* harmony default export */ var src_Dropdown_Dropdown = (Dropdown_Dropdown);
// CONCATENATED MODULE: ./src/Dropdown/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Dropdown_Dropdown; });


/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Popover");

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

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });