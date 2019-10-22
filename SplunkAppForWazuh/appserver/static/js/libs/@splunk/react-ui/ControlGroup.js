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
/******/ 	return __webpack_require__(__webpack_require__.s = 144);
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

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 144:
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

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/Tooltip"
var Tooltip_ = __webpack_require__(26);
var Tooltip_default = /*#__PURE__*/__webpack_require__.n(Tooltip_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/ControlGroup/ControlGroupStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "ControlGroupStyles__StyledBox",
  componentId: "sc-1tbnh4w-0"
})(["", ";", ";display:block;max-width:600px;margin-bottom:calc(", " * 0.75);&[aria-invalid]{color:", ";}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["mixin"])('clearfix'), Object(themes_["variable"])('spacing'), Object(themes_["variable"])('ControlGroup', 'boxInvalidColor'));
var StyledControlsStackBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "ControlGroupStyles__StyledControlsStackBox",
  componentId: "sc-1tbnh4w-1"
})(["flex-direction:column;"]);
var StyledLabel = external_styled_components_default.a.div.withConfig({
  displayName: "ControlGroupStyles__StyledLabel",
  componentId: "sc-1tbnh4w-2"
})(["", ";padding:6px 0;word-wrap:break-word;color:inherit;flex:0 0 auto;&[data-size='small']{font-size:", ";padding:4px 0;}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('fontSizeSmall'));
var StyledLabelLeft = external_styled_components_default()(StyledLabel).withConfig({
  displayName: "ControlGroupStyles__StyledLabelLeft",
  componentId: "sc-1tbnh4w-3"
})(["float:left;text-align:right;"]);
var StyledHelp = external_styled_components_default.a.div.withConfig({
  displayName: "ControlGroupStyles__StyledHelp",
  componentId: "sc-1tbnh4w-4"
})(["font-size:", ";color:", ";margin-top:2px;[aria-invalid] > &{color:inherit;}"], Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('ControlGroup', 'helpColor'));

// CONCATENATED MODULE: ./src/ControlGroup/ControlGroup.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */








/**
 * `ControlGroup` places a label and optional help text around one or more controls. The `ControlGroup`
 * will automatically add aria attributes to associate the controls with the labels and help text to
 * address accessibility requirements.
 *
 * `ControlGroup` provides layouts to assist in aligning and laying out controls, but the defaults are
 * not helpful in all cases, nor will the layout options address all cases. Consider setting
 * `controlsLayout` to none and manually positioning the controls as required.
 *
 * Clicking a label focuses/toggles certain controls following these rules:
 * 1. If there's exactly one child it is focused/toggled.
 * 2. If there are multiple children:
 *     1. If one or more children are `Text` components, the first one is focused.
 *     2. If there aren't any `Text` components, the first component with a `selected` prop set to `true` is focused.
 *     3. If there's no selected component the first child is focused.
 *
 * Only React class components with a `focus` method are focusable.
 */

var ControlGroup_ControlGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(ControlGroup, _Component);

  _createClass(ControlGroup, null, [{
    key: "isClassComponent",
    value: function isClassComponent(component) {
      // wrapped in a hoc, for example withTheme
      if (component.render) {
        return typeof component.render === 'function';
      } // regular components


      if (component.prototype) {
        return typeof component.prototype.render === 'function';
      }

      return false;
    }
  }]);

  function ControlGroup(props) {
    var _this;

    _classCallCheck(this, ControlGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ControlGroup).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleLabelClick", function () {
      if (_this.components.length === 0) {
        return;
      }

      var _this$components = _slicedToArray(_this.components, 1),
          firstChild = _this$components[0];

      var firstText = _this.components.find(function (comp) {
        return comp.type === 'Text';
      });

      var firstSelected = _this.components.find(function (comp) {
        return comp.component.props && comp.component.props.selected;
      }); // see class doc block for details


      if (_this.components.length === 1) {
        if (firstChild.component.focus) {
          firstChild.component.focus();
        } // support Switch component


        if (firstChild.component.handleContainerClick) {
          firstChild.component.handleContainerClick();
        }
      } else if (firstText && firstText.component.focus) {
        firstText.component.focus();
      } else if (firstSelected && firstSelected.component.focus) {
        firstSelected.component.focus();
      } else if (firstChild.component.focus) {
        firstChild.component.focus();
      }
    });

    _this.labelId = Object(id_["createDOMID"])('label');
    _this.helpId = Object(id_["createDOMID"])('help');
    return _this;
  }

  _createClass(ControlGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          controlsLayout = _this$props.controlsLayout,
          error = _this$props.error,
          help = _this$props.help,
          hideLabel = _this$props.hideLabel,
          label = _this$props.label,
          labelPosition = _this$props.labelPosition,
          labelWidth = _this$props.labelWidth,
          size = _this$props.size,
          tooltip = _this$props.tooltip,
          otherProps = _objectWithoutProperties(_this$props, ["children", "controlsLayout", "error", "help", "hideLabel", "label", "labelPosition", "labelWidth", "size", "tooltip"]); // save the nested components in order to apply focus when click the label


      this.components = [];
      var validChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]);
      var count = validChildren.length; // Clean the Children

      var cloneWithProps = function cloneWithProps(item, i) {
        var cloneProps = {
          key: item.key || i
        };

        var shouldApplyProp = function shouldApplyProp(propName) {
          // Must support prop
          if (!item.type || !item.type.propTypes || !item.type.propTypes[propName]) {
            return false;
          } //  Must not have been change from the default.


          if (!item.type.defaultProps || !item.props || Object(external_lodash_["isUndefined"])(item.props[propName])) {
            return true;
          }

          return item.props[propName] === item.type.defaultProps[propName];
        };

        if (controlsLayout === 'fillJoin') {
          if (shouldApplyProp('prepend') && i > 0) {
            cloneProps.prepend = true;
          }

          if (shouldApplyProp('append') && i < count - 1) {
            cloneProps.append = true;
          }

          if (cloneProps.prepend || cloneProps.append) {
            cloneProps.inline = false;
          }
        }

        if (controlsLayout === 'fill' && shouldApplyProp('inline') && count > 1) {
          cloneProps.inline = true;
        }

        if (controlsLayout === 'stack' && shouldApplyProp('inline')) {
          cloneProps.inline = false;
        }

        if (shouldApplyProp('labelledBy')) {
          cloneProps.labelledBy = _this2.labelId;
        }

        if (shouldApplyProp('describedBy') && _this2.props.help) {
          cloneProps.describedBy = _this2.helpId;
        } // (SUI-1365) Give the label's text to select elements


        if (shouldApplyProp('labelText')) {
          cloneProps.labelText = label;
        }

        if (count === 1 && (controlsLayout === 'fillJoin' || controlsLayout === 'fill')) {
          cloneProps.style = item.props.style ? Object(external_lodash_["clone"])(item.props.style) : {};
          cloneProps.style.flexGrow = 1; // some controls like Select do not grow by default
        } // Stateless function components cannot be given refs


        if (item && item.type && ControlGroup.isClassComponent(item.type)) {
          cloneProps.ref = function (component) {
            if (component) {
              _this2.components.push({
                type: item.type.componentType,
                component: component
              });
            } // make sure existing refs are called / set


            var ref = item.ref;

            if (typeof ref === 'function') {
              ref(component);
            } else if (ref !== null) {
              ref.current = component;
            }
          };
        }

        return Object(external_react_["cloneElement"])(item, cloneProps);
      };

      var childrenFormatted = validChildren.map(cloneWithProps);

      if (error) {
        otherProps['aria-invalid'] = true;
      }

      var labelWidthStyle = labelPosition === 'left' ? {
        width: labelWidth
      } : null;
      var labelWidthString = Object(external_lodash_["isFinite"])(labelWidth) ? "".concat(labelWidth, "px") : labelWidth;
      var contentMarginStyle = labelPosition === 'left' ? {
        marginLeft: "calc(".concat(labelWidthString, " + 20px)")
      } : null;
      var StyledControlsComponent = controlsLayout === 'stack' ? StyledControlsStackBox : Box_default.a;
      var StyledLabelComponent = labelPosition === 'left' ? StyledLabelLeft : StyledLabel;
      var styledLabel = external_react_default.a.createElement(StyledLabelComponent, {
        "data-size": size,
        "data-test": "label",
        id: this.labelId,
        style: labelWidthStyle,
        onClick: this.handleLabelClick
      }, label, !hideLabel && tooltip && ' ', !hideLabel && tooltip && external_react_default.a.createElement(Tooltip_default.a, {
        content: tooltip
      }));
      return external_react_default.a.createElement(StyledBox, _extends({
        "data-test": "control-group"
      }, otherProps), hideLabel ? external_react_default.a.createElement(ScreenReaderContent_default.a, null, styledLabel) : styledLabel, external_react_default.a.createElement(StyledControlsComponent, {
        "data-test": "controls",
        flex: controlsLayout !== 'none',
        style: contentMarginStyle
      }, childrenFormatted), help && external_react_default.a.createElement(StyledHelp, {
        "data-test": "help",
        id: this.helpId,
        style: contentMarginStyle
      }, help));
    }
  }]);

  return ControlGroup;
}(external_react_["Component"]);

_defineProperty(ControlGroup_ControlGroup, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * A layout defines how controls are aligned and displayed.
   * @themeNotes The 'fillJoin' layout is not supported by the `scp` theme.
   */
  controlsLayout: external_prop_types_default.a.oneOf(['fill', 'fillJoin', 'none', 'stack']),

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Highlight the control group as having an error. The label and help text will turn red,
   * but the children are not affected.
   */
  error: external_prop_types_default.a.bool,

  /* The help text or content displayed below the control. */
  help: external_prop_types_default.a.node,

  /**
   * Hide the `label` visually but still render it for screen readers.
   * Only enable this prop if the purpose of the control is clear enough from the context.
   * Enabling this prop will hide `tooltip`.
   */
  hideLabel: external_prop_types_default.a.bool,
  label: external_prop_types_default.a.string.isRequired,
  labelPosition: external_prop_types_default.a.oneOf(['left', 'top']),

  /**
   * When labelPosition is left, the width of the label in pixels or a value with a unit.
   */
  labelWidth: external_prop_types_default.a.oneOfType([external_prop_types_default.a.number, external_prop_types_default.a.string]),

  /** The size of the text label. */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),
  tooltip: external_prop_types_default.a.node
});

_defineProperty(ControlGroup_ControlGroup, "defaultProps", {
  controlsLayout: 'fill',
  error: false,
  hideLabel: false,
  labelPosition: 'left',
  labelWidth: 120,
  size: 'medium'
});

/* harmony default export */ var src_ControlGroup_ControlGroup = (ControlGroup_ControlGroup);
// CONCATENATED MODULE: ./src/ControlGroup/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_ControlGroup_ControlGroup; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Tooltip");

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