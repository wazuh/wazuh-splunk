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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
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

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/focus");

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/ChevronRight");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Switch");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Scroll");

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Heading");

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Check");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/ui-utils/focus"
var focus_ = __webpack_require__(23);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/Menu/DividerStyles.js


var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "DividerStyles__Styled",
  componentId: "sc-17rmrwe-0"
})(["border-top:", ";border-color:", ";"], Object(themes_["variable"])('border'), Object(themes_["variable"])('Menu', 'Divider', 'borderColor'));

// CONCATENATED MODULE: ./src/Menu/Divider.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var propTypes = {};
/**
 * A non-interactive menu item used to visually separate groups of items in the menu.
 */

function Divider(props) {
  var otherProps = _extends({}, props);

  return external_react_default.a.createElement(Styled, _extends({
    "data-test": "divider"
  }, otherProps));
}

/* harmony default export */ var Menu_Divider = (Divider);
/* Remove the item if it is the first item after filtering */

Divider.filterFirst = true;
/* Remove consecutive items with filterConsecutive = true (Dividers and Headings) */

Divider.filterConsecutive = true;
/* Remove the item if it is the last item after filtering. */

Divider.filterLast = true;
Divider.propTypes = propTypes;
// EXTERNAL MODULE: external "@splunk/react-ui/Heading"
var Heading_ = __webpack_require__(43);
var Heading_default = /*#__PURE__*/__webpack_require__.n(Heading_);

// CONCATENATED MODULE: ./src/Menu/HeadingStyles.js


var HeadingStyles_Styled = external_styled_components_default.a.div.withConfig({
  displayName: "HeadingStyles__Styled",
  componentId: "sc-12zin6v-0"
})(["", ";padding:", ";border-top:1px solid transparent;&:not(:first-child){border-top:", ";}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Menu', 'Heading', 'padding'), Object(themes_["variable"])('border'));

// CONCATENATED MODULE: ./src/Menu/Heading.jsx
function Heading_extends() { Heading_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Heading_extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var Heading_propTypes = {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * Render this heading as menu title. It's recommended to only enable this
   * for the first heading in a menu.
   */
  title: external_prop_types_default.a.bool
};
/**
 * A non-interactive menu item used to separate and label groups of menu items.
 */

function Heading(props) {
  var children = props.children,
      title = props.title,
      otherProps = _objectWithoutProperties(props, ["children", "title"]);

  return external_react_default.a.createElement(HeadingStyles_Styled, null, external_react_default.a.createElement(Heading_default.a, Heading_extends({
    style: {
      margin: 0
    },
    level: title ? 4 : 'ss',
    "data-test": "heading"
  }, otherProps), children));
}

Heading.propTypes = Heading_propTypes;
/* Remove consecutive items with filterConsecutive = true (Dividers and Headings) */

Heading.filterConsecutive = true;
/* Remove the item if it is the last item after filtering. */

Heading.filterLast = true;
/* harmony default export */ var Menu_Heading = (Heading);
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@splunk/react-icons/Check"
var Check_ = __webpack_require__(44);
var Check_default = /*#__PURE__*/__webpack_require__.n(Check_);

// EXTERNAL MODULE: external "@splunk/react-icons/ChevronRight"
var ChevronRight_ = __webpack_require__(24);
var ChevronRight_default = /*#__PURE__*/__webpack_require__.n(ChevronRight_);

// EXTERNAL MODULE: external "@splunk/react-ui/Switch"
var Switch_ = __webpack_require__(33);
var Switch_default = /*#__PURE__*/__webpack_require__.n(Switch_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/Menu/ItemStyles.js



var StyledClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "ItemStyles__StyledClickable",
  componentId: "sc-1091j7y-0"
})(["", ";padding:", ";position:relative;cursor:pointer;font-weight:normal;line-height:", ";color:", ";text-decoration:none;word-wrap:break-word;max-width:100%;width:100%;flex:1 0 0px;&[data-selectable='true']{padding-left:", ";padding-right:", ";}&[data-selectable-appearance='checkbox']{padding-left:", ";}&[data-truncation='false']{white-space:normal;}&[data-truncation='true']{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}&:not([disabled]){&:hover{background:", ";}&:focus{outline:0;box-shadow:", ";background:", ";}}&[data-active]{box-shadow:", ";background:", ";}[disabled]{color:", ";cursor:not-allowed;}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Menu', 'Item', 'padding'), Object(themes_["variable"])('Menu', 'Item', 'lineHeight'), Object(themes_["variable"])('Menu', 'Item', 'clickableColor'), Object(themes_["variable"])('Menu', 'Item', 'selectablePaddingLeft'), Object(themes_["variable"])('Menu', 'Item', 'selectablePaddingRight'), Object(themes_["variable"])('Menu', 'Item', 'checkboxPaddingLeft'), Object(themes_["variable"])('Menu', 'Item', 'backgroundColorHover'), Object(themes_["variable"])('Menu', 'Item', 'focusShadowInset'), Object(themes_["variable"])('Menu', 'Item', 'backgroundColorFocus'), Object(themes_["variable"])('Menu', 'Item', 'focusShadowInset'), Object(themes_["variable"])('Menu', 'Item', 'backgroundColorActive'), Object(themes_["variable"])('textDisabledColor'));
var StyledLabel = external_styled_components_default.a.span.withConfig({
  displayName: "ItemStyles__StyledLabel",
  componentId: "sc-1091j7y-1"
})(["overflow:inherit;white-space:inherit;text-overflow:inherit;max-width:100%;[data-truncation='true'] > &{display:block;clear:both;}"]);
var StyledMatch = external_styled_components_default.a.span.withConfig({
  displayName: "ItemStyles__StyledMatch",
  componentId: "sc-1091j7y-2"
})(["color:", ";background:", ";"], Object(themes_["variable"])('Menu', 'Item', 'matchColor'), Object(themes_["variable"])('Menu', 'Item', 'matchColorBackground'));
var itemDescription = Object(external_styled_components_["css"])(["color:", ";font-size:", ";line-height:", ";overflow:inherit;white-space:inherit;text-overflow:inherit;[disabled] > &{color:inherit;}"], Object(themes_["variable"])('Menu', 'Item', 'descriptionColor'), Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('Menu', 'Item', 'descriptionLineHeight'));
var StyledItemDescriptionBottom = external_styled_components_default.a.span.withConfig({
  displayName: "ItemStyles__StyledItemDescriptionBottom",
  componentId: "sc-1091j7y-3"
})(["", ";display:block;"], itemDescription);
var StyledItemDescriptionRight = external_styled_components_default.a.span.withConfig({
  displayName: "ItemStyles__StyledItemDescriptionRight",
  componentId: "sc-1091j7y-4"
})(["", ";float:right;padding-left:", ";max-width:50%;text-align:right;box-sizing:border-box;"], itemDescription, Object(themes_["variable"])('spacing'));
var StyledItemSelectedIcon = external_styled_components_default.a.div.withConfig({
  displayName: "ItemStyles__StyledItemSelectedIcon",
  componentId: "sc-1091j7y-5"
})(["position:absolute;left:", ";top:", ";right:", ";color:", ";", ";"], Object(themes_["variable"])('Menu', 'Item', 'itemSelectedIconLeft'), Object(themes_["variable"])('Menu', 'Item', 'itemSelectedIconTop'), Object(themes_["variable"])('Menu', 'Item', 'itemSelectedIconRight'), Object(themes_["variable"])('Menu', 'Item', 'itemSelectedIconColor'), function (_ref) {
  var iconDisabled = _ref.iconDisabled;
  return iconDisabled && Object(external_styled_components_["css"])(["cursor:not-allowed;color:", ";"], Object(themes_["variable"])('Menu', 'Item', 'disabledSelectedIconColor'));
});
var StyledItemIcon = external_styled_components_default.a.span.withConfig({
  displayName: "ItemStyles__StyledItemIcon",
  componentId: "sc-1091j7y-6"
})(["padding-right:3px;margin-right:", ";min-width:10px;display:inline-block;text-align:center;vertical-align:", ";transform:translateY(-1px);"], Object(themes_["variable"])('Menu', 'Item', 'itemIconMarginRight'), Object(themes_["variable"])('Menu', 'Item', 'itemIconVertical'));
var StyledSubmenu = external_styled_components_default.a.span.withConfig({
  displayName: "ItemStyles__StyledSubmenu",
  componentId: "sc-1091j7y-7"
})(["float:right;padding-left:", ";color:", ";"], Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('Menu', 'Item', 'submenuColor'));

// CONCATENATED MODULE: ./src/Menu/Item.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Item_extends() { Item_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Item_extends.apply(this, arguments); }

function Item_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Item_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Item_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












var Item_Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  _createClass(Item, null, [{
    key: "validateProps",
    value: function validateProps(props) {
      if (false) {}
    }
  }]);

  function Item(props) {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Item)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMount", function (el) {
      _this.el = el;

      _this.props.elementRef(el);
    });

    Item.validateProps(props);
    return _this;
  }

  _createClass(Item, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      Item.validateProps(this.props);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.el.focus();
    }
  }, {
    key: "scrollIntoViewIfNeeded",
    value: function scrollIntoViewIfNeeded() {
      var el = this.el;
      var parentEl = el.offsetParent;

      if (!parentEl) {
        return;
      } // Below the bottom of the container.


      if (parentEl.scrollTop + parentEl.clientHeight < el.offsetTop + el.clientHeight) {
        parentEl.scrollTop = el.offsetTop + el.clientHeight - parentEl.clientHeight; // Above the top of the container.
      } else if (parentEl.scrollTop > el.offsetTop) {
        parentEl.scrollTop = el.offsetTop;
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props = this.props,
          children = _this$props.children,
          matchRanges = _this$props.matchRanges;

      if (!matchRanges || !Object(external_lodash_["isString"])(children)) {
        return children;
      }

      var segments = []; // before first match. May be empty string.

      segments.push(children.substring(0, matchRanges[0].start));
      matchRanges.forEach(function (match, index) {
        segments.push( // eslint-disable-next-line react/no-array-index-key
        external_react_default.a.createElement(StyledMatch, {
          key: index,
          "data-test": "match"
        }, children.substring(match.start, match.end)));

        if (index < matchRanges.length - 1) {
          segments.push(children.substring(match.end, matchRanges[index + 1].start));
        } else {
          segments.push(children.substring(match.end, children.length));
        }
      });
      return segments;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          active = _this$props2.active,
          children = _this$props2.children,
          hasSubmenu = _this$props2.hasSubmenu,
          selectable = _this$props2.selectable,
          selectableAppearance = _this$props2.selectableAppearance,
          selected = _this$props2.selected,
          icon = _this$props2.icon,
          description = _this$props2.description,
          disabled = _this$props2.disabled,
          matchRanges = _this$props2.matchRanges,
          onClick = _this$props2.onClick,
          role = _this$props2.role,
          theme = _this$props2.theme,
          to = _this$props2.to,
          truncate = _this$props2.truncate,
          descriptionPosition = _this$props2.descriptionPosition,
          openInNewContext = _this$props2.openInNewContext,
          otherProps = Item_objectWithoutProperties(_this$props2, ["active", "children", "hasSubmenu", "selectable", "selectableAppearance", "selected", "icon", "description", "disabled", "matchRanges", "onClick", "role", "theme", "to", "truncate", "descriptionPosition", "openInNewContext"]);

      var isSelectable = selectable || selected;
      var defaultRole = {
        nonselectable: 'menuitem',
        checkmark: 'menuitemradio',
        checkbox: 'menuitemcheckbox'
      }[isSelectable ? selectableAppearance : 'nonselectable'];
      var ariaProps = {};

      if (hasSubmenu) {
        ariaProps['aria-haspopup'] = true;
      }

      var selectablePosition = Object(themes_["variable"])('Menu', 'Item', 'selectablePosition')({
        theme: theme
      });
      var descriptionRight = description && descriptionPosition === 'right' && selectablePosition !== 'right';
      var descriptionBottom = description && !descriptionRight;
      var selectableCheckmark = selected && selectableAppearance === 'checkmark' && external_react_default.a.createElement(StyledItemSelectedIcon, {
        iconDisabled: disabled
      }, external_react_default.a.createElement(Check_default.a, {
        screenReaderText: Object(i18n_["_"])('Selected'),
        size: 0.85
      }));
      return external_react_default.a.createElement(StyledClickable, Item_extends({
        "data-selectable": isSelectable,
        "data-selectable-appearance": selectableAppearance,
        "data-test": "item",
        "data-has-icon": !!icon,
        "data-truncation": truncate,
        "data-active": active ? true : null,
        disabled: disabled,
        onClick: onClick,
        role: role || defaultRole,
        to: to,
        title: truncate && Object(external_lodash_["isString"])(children) ? children : null,
        openInNewContext: openInNewContext
      }, ariaProps, otherProps, {
        elementRef: this.handleMount
      }), selectablePosition === 'left' && selectableCheckmark, selectable && selectableAppearance === 'checkbox' && external_react_default.a.createElement(Switch_default.a, {
        style: {
          position: 'absolute',
          left: 8,
          top: 2
        },
        interactive: false,
        selected: selected,
        selectedLabel: "Selected",
        unselectedLabel: "",
        value: "menu-item"
      }), hasSubmenu && external_react_default.a.createElement(StyledSubmenu, null, external_react_default.a.createElement(ChevronRight_default.a, null)), descriptionRight && external_react_default.a.createElement(StyledItemDescriptionRight, {
        "data-test": "description"
      }, description), external_react_default.a.createElement(StyledLabel, {
        "data-test": "label"
      }, icon && external_react_default.a.createElement(StyledItemIcon, null, icon), this.renderLabel()), selectablePosition === 'right' && selectableCheckmark, descriptionBottom && external_react_default.a.createElement(StyledItemDescriptionBottom, {
        icon: !!icon,
        "data-test": "description"
      }, description));
    }
  }]);

  return Item;
}(external_react_["Component"]);

_defineProperty(Item_Item, "propTypes", {
  /**
   * Active shows a temporary selected state similar to focus. This is used when filtering the
   * menu items in Multiselect, Select and ComboBox and navigating with arrows.
   */
  active: external_prop_types_default.a.bool,

  /** `children` become the label. Must be a string if using matchRanges. */
  children: function children(props) {
    if (props.matchRanges && !Object(external_lodash_["isString"])(props.children)) {
      return new Error('The matchRanges prop can only be used when chilren is a string.');
    }

    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    return external_prop_types_default.a.any.apply(external_prop_types_default.a, [props].concat(rest));
  },

  /**
   * Additional information to explain the option, such as "Recommended".
   */
  description: external_prop_types_default.a.string,

  /**
   * The description text may appear to the right of the label or under the label.
   * @themeNotes Themes that don't support 'right' fall back to 'bottom'.
   */
  descriptionPosition: external_prop_types_default.a.oneOf(['right', 'bottom']),

  /**
   * If disabled=true, the item is grayed out and cannot be clicked.
   */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * And icon to the right to show there is a submenu.
   */
  hasSubmenu: external_prop_types_default.a.bool,

  /**
   * An icon to insert before the children.
   */
  icon: external_prop_types_default.a.node,

  /**
   * Sections of the label string to highlight as a match.
   */
  matchRanges: external_prop_types_default.a.arrayOf(external_prop_types_default.a.shape({
    start: external_prop_types_default.a.number.isRequired,
    end: external_prop_types_default.a.number.isRequired
  })),

  /**
   * Callback for click events.
   */
  onClick: external_prop_types_default.a.func,

  /**
   * To open the link in a new window, set openInNewContext to true. An icon will be added
   * indicating the the behavior.
   */
  openInNewContext: external_prop_types_default.a.bool,

  /**
   * The default role is inferred from the other props. `selectable` with a
   * `selectableAppearance` of checkmark will default to `menuitemradio`, `selectable` with a
   * `selectableAppearance` of checkbox will default to `menuitemcheckbox`. Otherwise defaults
   * to `menuitem`.
   */
  role: external_prop_types_default.a.oneOf(['menuitem', 'menuitemradio', 'menuitemcheckbox', 'listboxitem', 'option']),

  /**
   * If selectable is true, whitespace will be left where the checkmark can be shown.
   */
  selectable: external_prop_types_default.a.bool,

  /**
   * If selectable is true, whitespace will be left where the checkmark can be shown.
   */
  selectableAppearance: external_prop_types_default.a.oneOf(['checkmark', 'checkbox']),

  /**
   * If selected is true, a checkmark will show the item is selected.
   */
  selected: external_prop_types_default.a.bool,

  /** @private */
  theme: external_prop_types_default.a.object,

  /* A url or path to link to.  */
  to: external_prop_types_default.a.string,

  /**
   * When `true`, wrapping is disabled and any additional text is ellipsised.
   */
  truncate: external_prop_types_default.a.bool
});

_defineProperty(Item_Item, "defaultProps", {
  active: false,
  descriptionPosition: 'bottom',
  disabled: false,
  elementRef: function elementRef() {},
  hasSubmenu: false,
  openInNewContext: false,
  selectable: false,
  selectableAppearance: 'checkmark',
  selected: false,
  theme: null,
  truncate: false
});

/* harmony default export */ var Menu_Item = (Object(external_styled_components_["withTheme"])(Item_Item));
// EXTERNAL MODULE: external "@splunk/react-ui/Scroll"
var Scroll_ = __webpack_require__(41);
var Scroll_default = /*#__PURE__*/__webpack_require__.n(Scroll_);

// CONCATENATED MODULE: ./src/Menu/MenuStyles.js



var MenuStyles_Styled = external_styled_components_default.a.div.withConfig({
  displayName: "MenuStyles__Styled",
  componentId: "wj5wam-0"
})(["", ";position:relative;list-style:none;margin:0;padding:0;background-color:", ";min-width:60px;border-radius:", ";overflow:auto;& + &{border-top:1px solid #999;}"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Menu', 'backgroundColor'), Object(themes_["variable"])('borderRadius'));
var StyledScroll = MenuStyles_Styled.withComponent(Scroll_default.a);

// CONCATENATED MODULE: ./src/Menu/Menu.jsx
function Menu_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Menu_typeof = function _typeof(obj) { return typeof obj; }; } else { Menu_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Menu_typeof(obj); }

function Menu_extends() { Menu_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Menu_extends.apply(this, arguments); }

function Menu_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = Menu_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function Menu_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Menu_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Menu_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Menu_createClass(Constructor, protoProps, staticProps) { if (protoProps) Menu_defineProperties(Constructor.prototype, protoProps); if (staticProps) Menu_defineProperties(Constructor, staticProps); return Constructor; }

function Menu_possibleConstructorReturn(self, call) { if (call && (Menu_typeof(call) === "object" || typeof call === "function")) { return call; } return Menu_assertThisInitialized(self); }

function Menu_getPrototypeOf(o) { Menu_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Menu_getPrototypeOf(o); }

function Menu_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Menu_setPrototypeOf(subClass, superClass); }

function Menu_setPrototypeOf(o, p) { Menu_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Menu_setPrototypeOf(o, p); }

function Menu_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Menu_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Menu_Menu =
/*#__PURE__*/
function (_Component) {
  Menu_inherits(Menu, _Component);

  function Menu(props) {
    var _getPrototypeOf2;

    var _this;

    Menu_classCallCheck(this, Menu);

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    _this = Menu_possibleConstructorReturn(this, (_getPrototypeOf2 = Menu_getPrototypeOf(Menu)).call.apply(_getPrototypeOf2, [this, props].concat(rest)));
    _this.state = {};
    _this.handleMount = _this.handleMount.bind(Menu_assertThisInitialized(Menu_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(Menu_assertThisInitialized(Menu_assertThisInitialized(_this)));
    return _this;
  }

  Menu_createClass(Menu, [{
    key: "handleMount",
    value: function handleMount(containerEl) {
      this.setState({
        containerEl: containerEl
      });
      this.props.elementRef(containerEl);
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (Object(keyboard_["keycode"])(e) === 'tab' && this.props.retainFocus) {
        Object(focus_["handleTab"])(this.state.containerEl, e);
        return;
      }

      if (Object(keyboard_["keycode"])(e) !== 'down' && Object(keyboard_["keycode"])(e) !== 'up') {
        return;
      }

      var tabbableElements = Object(focus_["getSortedTabbableElements"])(this.state.containerEl);
      var currentIndex = tabbableElements.indexOf(e.target);

      if (currentIndex === -1) {
        return;
      }

      if (Object(keyboard_["keycode"])(e) === 'up' && currentIndex > 0) {
        tabbableElements[currentIndex - 1].focus();
      } else if (Object(keyboard_["keycode"])(e) === 'down' && currentIndex < tabbableElements.length - 1) {
        tabbableElements[currentIndex + 1].focus();
      }

      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          elementRef = _this$props.elementRef,
          retainFocus = _this$props.retainFocus,
          stopScrollPropagation = _this$props.stopScrollPropagation,
          otherProps = Menu_objectWithoutProperties(_this$props, ["children", "elementRef", "retainFocus", "stopScrollPropagation"]);

      var StyledComponentType = stopScrollPropagation ? StyledScroll : MenuStyles_Styled;
      var componentProps = stopScrollPropagation ? {
        stopScrollPropagation: true,
        elementRef: this.handleMount
      } : Object(themes_["ref"])(this.handleMount);
      var childrenCleaned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).reduce(function (acc, item, index, original) {
        /* Filter out initial Dividers
         * Requires reduce() over filter() because a Heading may have been
         * before the Divider.
         */
        if (item.type.filterFirst && acc.length === 0) {
          return acc;
        } // Filter out consecutive Dividers and Headings


        if (item.type.filterConsecutive && original.length > index + 1 && original[index + 1].type.filterConsecutive) {
          return acc;
        } // Filter out last Dividers and Headings


        if (item.type.filterLast && index === original.length - 1) {
          return acc;
        }

        acc.push(item);
        return acc;
      }, []);
      return external_react_default.a.createElement(StyledComponentType, Menu_extends({
        "data-test": "menu",
        onKeyDown: this.handleKeyDown,
        role: "menu"
      }, componentProps, otherProps), childrenCleaned);
    }
  }]);

  return Menu;
}(external_react_["Component"]);

Menu_defineProperty(Menu_Menu, "propTypes", {
  /**
   * `children` should be `Menu.Item`, `Menu.Heading`, or `Menu.Divider`.
   */
  children: external_prop_types_default.a.node,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * Keep focus within the menu while navigating by keyboard. Tabbing from the last item
   * returns user to the first item.
   */
  retainFocus: external_prop_types_default.a.bool,

  /**
   * Prevents scrolling from propogating to the parent container(s) when the top or bottom of
   * the `Menu` is reached.
   */
  stopScrollPropagation: external_prop_types_default.a.bool
});

Menu_defineProperty(Menu_Menu, "defaultProps", {
  elementRef: function elementRef() {},
  retainFocus: true,
  stopScrollPropagation: false
});

Menu_defineProperty(Menu_Menu, "Item", Menu_Item);

Menu_defineProperty(Menu_Menu, "Divider", Menu_Divider);

Menu_defineProperty(Menu_Menu, "Heading", Menu_Heading);

/* harmony default export */ var src_Menu_Menu = (Menu_Menu);

// CONCATENATED MODULE: ./src/Menu/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Menu_Menu; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Item", function() { return Menu_Item; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Heading", function() { return Menu_Heading; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Divider", function() { return Menu_Divider; });



/***/ })

/******/ });