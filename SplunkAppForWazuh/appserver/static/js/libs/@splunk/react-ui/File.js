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
/******/ 	return __webpack_require__(__webpack_require__.s = 94);
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

/***/ 11:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Clickable");

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

/***/ 32:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Remove");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Progress");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-event-listener"
var external_react_event_listener_ = __webpack_require__(14);
var external_react_event_listener_default = /*#__PURE__*/__webpack_require__.n(external_react_event_listener_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/ui-utils/id"
var id_ = __webpack_require__(10);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/react-icons/Remove"
var Remove_ = __webpack_require__(32);
var Remove_default = /*#__PURE__*/__webpack_require__.n(Remove_);

// EXTERNAL MODULE: external "@splunk/react-ui/Progress"
var Progress_ = __webpack_require__(57);
var Progress_default = /*#__PURE__*/__webpack_require__.n(Progress_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// CONCATENATED MODULE: ./src/File/ItemStyles.js




var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "ItemStyles__StyledBox",
  componentId: "sc-1b84262-0"
})(["position:relative;width:100%;max-width:400px;margin:", " auto 0;background-color:", ";line-height:24px;border-radius:", ";min-height:32px;color:", ";&[data-size='small']{min-height:24px;line-height:", ";font-size:", ";}&[data-error]{background-color:", ";box-shadow:inset 0 0 0 1px ", ";}"], Object(themes_["variable"])('spacingQuarter'), Object(themes_["variable"])('File', 'Item', 'boxBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'borderRadius'), Object(themes_["variable"])('File', 'Item', 'boxColor'), Object(themes_["variable"])('lineHeight'), Object(themes_["variable"])('fontSizeSmall'), Object(themes_["variable"])('File', 'Item', 'labelErrorBackgroundColor'), Object(themes_["variable"])('errorColor'));
var scpRemoveClickableStyle = Object(external_styled_components_["css"])(["color:", ";width:16px;height:16px;display:flex;align-items:center;justify-content:center;position:absolute;top:8px;right:8px;background-color:", ";"], Object(themes_["variable"])('white'), Object(themes_["variable"])('File', 'Item', 'removeClickableBackgroundColor'));
var StyledRemoveClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "ItemStyles__StyledRemoveClickable",
  componentId: "sc-1b84262-1"
})(["color:inherit;flex:", ";border-radius:", ";padding:", ";text-align:center;height:inherit;", " [data-size='small'] > &{padding:3px 0;flex-basis:", ";", "}[data-error] > &{border:", ";border-left:none;background-color:", ";}&:focus{box-shadow:", ";background-color:", ";color:", ";&[data-error]{background-color:", ";}}&:hover{background-color:", ";color:", ";&[data-error]{background-color:", ";}}"], Object(themes_["variable"])('File', 'Item', 'flex'), Object(themes_["variable"])('File', 'Item', 'removeClickableBorderRadius'), Object(themes_["variable"])('File', 'Item', 'removeClickablePadding'), function (_ref) {
  var itemRemoveable = _ref.itemRemoveable;
  return itemRemoveable && scpRemoveClickableStyle;
}, Object(themes_["variable"])('File', 'Item', 'removeClickableSmallFlexBasis'), function (_ref2) {
  var itemRemoveable = _ref2.itemRemoveable;
  return itemRemoveable && Object(external_styled_components_["css"])(["top:", ";"], Object(themes_["variable"])('File', 'Item', 'removeClickableSmallTop'));
}, Object(themes_["variable"])('File', 'Item', 'removeClickableErrorBorder'), Object(themes_["variable"])('File', 'Item', 'removeClickableErrorBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'removeClickableFocusShadow'), Object(themes_["variable"])('File', 'Item', 'removeClickableFocusBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'removeClickableFocusColor'), Object(themes_["variable"])('File', 'Item', 'removeClickableErrorFocusBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'removeClickableHoverBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'removeClickableHoverColor'), Object(themes_["variable"])('File', 'Item', 'removeClickableErrorHoverBackgroundColor'));
var StyledLabel = external_styled_components_default.a.div.withConfig({
  displayName: "ItemStyles__StyledLabel",
  componentId: "sc-1b84262-2"
})(["color:", ";font-size:", ";overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 0 0px;padding:", ";cursor:", ";border-radius:", ";[data-disabled] > &{background-color:", ";color:", ";cursor:not-allowed;}&:hover:not([data-disabled]){background-color:", ";& + ", "{background-color:", ";}&[data-error]{background-color:", ";& + ", "{background-color:", ";}}}"], Object(themes_["variable"])('File', 'Item', 'labelColor'), Object(themes_["variable"])('File', 'Item', 'fontSize'), Object(themes_["variable"])('File', 'Item', 'padding'), Object(themes_["variable"])('File', 'Item', 'cursor'), Object(themes_["variable"])('File', 'Item', 'borderRadius'), Object(themes_["variable"])('File', 'Item', 'labelDisabledBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'labelDisabledTextColor'), Object(themes_["variable"])('File', 'Item', 'labelHoverBackgroundColor'),
/* sc-sel */
StyledRemoveClickable, Object(themes_["variable"])('File', 'Item', 'removeClickableHoverBackgroundColor'), Object(themes_["variable"])('File', 'Item', 'labelErrorHoverBackgroundColor'),
/* sc-sel */
StyledRemoveClickable, Object(themes_["variable"])('File', 'Item', 'removeClickableErrorHoverBackgroundColor'));

// CONCATENATED MODULE: ./src/File/Item.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }










var propTypes = {
  /** @private */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Show the Item in an error state. */
  error: external_prop_types_default.a.bool,

  /** A unique for this file. */
  itemId: external_prop_types_default.a.any,

  /** The name is displayed on the item. */
  name: external_prop_types_default.a.string.isRequired,

  /** @private */
  onClick: external_prop_types_default.a.func,

  /** @private */
  size: external_prop_types_default.a.oneOf(['small', 'medium']),

  /** @private */
  theme: external_prop_types_default.a.object,

  /** If the uploadPercentage is 0, the item is assumed to be queued. If the upload is complete or
   * not applicable, uploadPercentage must be undefined. */
  uploadPercentage: external_prop_types_default.a.number
};
var defaultProps = {
  disabled: false,
  error: false,
  theme: null
};

function Item(props) {
  var disabled = props.disabled,
      error = props.error,
      itemId = props.itemId,
      name = props.name,
      onClick = props.onClick,
      size = props.size,
      theme = props.theme,
      uploadPercentage = props.uploadPercentage,
      otherProps = _objectWithoutProperties(props, ["disabled", "error", "itemId", "name", "onClick", "size", "theme", "uploadPercentage"]);

  function handleRequestRemove(e) {
    e.preventDefault();
    onClick({
      itemId: itemId,
      name: name
    });
  }

  var removeLabel = Object(i18n_["_"])('Remove "%1"').replace('%1', name);

  var uploadLabel = Object(i18n_["_"])('Uploading "%1"').replace('%1', name);

  var itemRemoveable = Object(themes_["variable"])('File', 'Item', 'itemRemoveable')({
    theme: theme
  });
  return external_react_default.a.createElement(StyledBox, _extends({
    "data-test": "item"
  }, otherProps, {
    flex: true,
    "data-error": error || null,
    "data-size": size,
    "data-disabled": disabled || null
  }), external_react_default.a.createElement(StyledLabel, {
    "data-test": "label",
    "data-error": error || null,
    "data-disabled": disabled || null,
    onClick: itemRemoveable ? handleRequestRemove : null
  }, name), !disabled && external_react_default.a.createElement(StyledRemoveClickable, {
    "data-test": "remove",
    "data-error": error || null,
    onClick: handleRequestRemove,
    "aria-label": removeLabel,
    itemRemoveable: itemRemoveable
  }, external_react_default.a.createElement(Remove_default.a, {
    screenReaderText: null,
    style: itemRemoveable ? {
      width: 6,
      height: 6
    } : null
  })), !Object(external_lodash_["isUndefined"])(uploadPercentage) && uploadPercentage > 0 && external_react_default.a.createElement(Progress_default.a, {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      zIndex: 1
    },
    percentage: uploadPercentage,
    "aria-label": uploadLabel
  }));
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;
/* harmony default export */ var File_Item = (Object(external_styled_components_["withTheme"])(Item));
// CONCATENATED MODULE: ./src/File/Icon.jsx
function Icon_extends() { Icon_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Icon_extends.apply(this, arguments); }


function FileIcon(props) {
  return external_react_default.a.createElement("svg", Icon_extends({
    viewBox: "0 0 72 88",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), external_react_default.a.createElement("path", {
    d: "M50,27 L68.0005854,27 C70.2022516,27 72,28.7919267 72,31.0023804 L72,83.9976196 C72,86.2074215 70.2094011,88 68.0005854,88 L3.99941455,88 C1.79774843,88 0,86.2080733 0,83.9976196 L0,31.0023804 C0,28.7925785 1.79059889,27 3.99941455,27 L21,27 L21,32 L5.99898406,32 C5.4472604,32 5,32.4408979 5,32.9958767 L5,82.0041233 C5,82.5541308 5.44605521,83 5.99898406,83 L66.0010159,83 C66.5527396,83 67,82.5591021 67,82.0041233 L67,32.9958767 C67,32.4458692 66.5539448,32 66.0010159,32 L50,32 L50,27 Z"
  }), external_react_default.a.createElement("path", {
    d: "M41.9634682,10 L41.9634682,28 L46.9634682,28 L46.9634682,5 L44.4634682,5 L23.9634682,5 L23.9634682,10 L41.9634682,10 Z",
    transform: "translate(35.463468, 16.500000) rotate(-45.000000) translate(-35.463468, -16.500000) "
  }), external_react_default.a.createElement("rect", {
    x: "33",
    y: "3",
    width: "5",
    height: "51"
  }));
}
// CONCATENATED MODULE: ./src/File/IconCloud.jsx
function IconCloud_extends() { IconCloud_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return IconCloud_extends.apply(this, arguments); }


function FileIconCloud(props) {
  return external_react_default.a.createElement("svg", IconCloud_extends({
    width: "32",
    height: "33",
    viewBox: "0 0 32 33",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), external_react_default.a.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.9934 7.54932C12.7409 7.54932 9.87218 9.67919 8.9312 12.7926L8.80364 13.2146C8.6851 13.6068 8.34137 13.8879 7.93429 13.927C4.75954 14.232 2.32568 16.9255 2.32568 20.1227C2.32568 23.5843 5.13282 26.4101 8.584 26.4101H24.1421C27.1902 26.4101 29.6611 23.9391 29.6611 20.8911C29.6611 18.6105 28.0236 16.6592 25.7776 16.2634L25.6055 16.2331C25.1569 16.154 24.8169 15.7844 24.7754 15.3308C24.3721 10.9231 20.6755 7.54932 16.2493 7.54932H15.9934ZM7.075 12.0281C8.32766 8.17206 11.9243 5.54932 15.9934 5.54932H16.2493C21.461 5.54932 25.8526 9.34093 26.6742 14.4143C29.5902 15.1831 31.6611 17.8289 31.6611 20.8911C31.6611 25.0437 28.2948 28.4101 24.1421 28.4101H8.584C4.01787 28.4101 0.325684 24.6785 0.325684 20.1227C0.325684 16.1292 3.19978 12.7244 7.075 12.0281Z"
  }), external_react_default.a.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.042 13.7891C15.4897 13.7891 15.042 14.2368 15.042 14.7891V21.8674C15.042 22.4196 15.4897 22.8674 16.042 22.8674C16.5943 22.8674 17.042 22.4196 17.042 21.8674V14.7891C17.042 14.2368 16.5943 13.7891 16.042 13.7891Z"
  }), external_react_default.a.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.3326 17.4136C11.6793 17.8436 12.3088 17.9111 12.7388 17.5645L16.0456 14.8984L19.3961 17.5681C19.828 17.9122 20.4572 17.8411 20.8014 17.4092C21.1455 16.9772 21.0744 16.3481 20.6425 16.0039L16.0383 12.3352L11.4835 16.0075C11.0535 16.3541 10.986 16.9837 11.3326 17.4136Z"
  }));
}
// CONCATENATED MODULE: ./src/File/FileStyles.js





var StyledInput = external_styled_components_default.a.input.withConfig({
  displayName: "FileStyles__StyledInput",
  componentId: "sc-12ol6su-0"
})(["&[type='file']{width:0.1px;height:0.1px;opacity:0;overflow:hidden;position:absolute;z-index:-1;}"]);
var StyledMediumDropTargetBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "FileStyles__StyledMediumDropTargetBox",
  componentId: "sc-12ol6su-1"
})(["", ";flex-direction:column;justify-content:center;text-align:center;border-radius:", ";padding:", ";min-height:73px;line-height:calc(", " - 2px);border:1px dashed ", ";&[data-drag-over]{border:", ";background-color:", ";}&[data-error]:not([data-drag-over]){border:1px solid ", ";color:", ";", "{color:", ";}}&[data-disabled]{border:", ";color:", ";cursor:not-allowed;&[data-file-count='0']{background:", ";}}"], Object(themes_["mixin"])('reset')('flex'), Object(themes_["variable"])('borderRadius'), Object(themes_["variable"])('File', 'padding'), Object(themes_["variable"])('inputHeight'), Object(themes_["variable"])('File', 'mediumDropTargetBoxBorderColor'), Object(themes_["variable"])('File', 'borderDragOver'), Object(themes_["variable"])('File', 'backgroundColorDragOver'), Object(themes_["variable"])('errorColor'), Object(themes_["variable"])('File', 'errorTextColor'),
/* sc-sel */
StyledInput, Object(themes_["variable"])('File', 'errorTextColor'), Object(themes_["variable"])('File', 'disabledBorder'), Object(themes_["variable"])('File', 'mediumDropTargetBoxDisabledColor'), Object(themes_["variable"])('File', 'mediumDropTargetBoxDisabledFileCount0BackgroundColor'));
var StyledSmallDropTargetBox = external_styled_components_default()(StyledMediumDropTargetBox).withConfig({
  displayName: "FileStyles__StyledSmallDropTargetBox",
  componentId: "sc-12ol6su-2"
})(["padding:3px;min-height:63px;"]);
var StyledLargeDropTargetBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "FileStyles__StyledLargeDropTargetBox",
  componentId: "sc-12ol6su-3"
})(["position:relative;text-align:center;min-height:250px;padding:", ";&[data-disabled='true']{color:", ";}"], Object(themes_["variable"])('spacing'), Object(themes_["variable"])('File', 'largeDropTargetBoxDisabledColor'));
var icon = Object(external_styled_components_["css"])(["fill:", ";&[data-error]:not([data-drag-over]){fill:", ";}"], Object(themes_["variable"])('File', 'iconFill'), Object(themes_["variable"])('File', 'iconErrorFill'));
var StyledMediumIcon = external_styled_components_default()(FileIcon).withConfig({
  displayName: "FileStyles__StyledMediumIcon",
  componentId: "sc-12ol6su-4"
})(["", ";height:1.4em;width:1.4em;display:inline-block;vertical-align:middle;padding-bottom:3px;"], icon);
var StyledLargeIcon = external_styled_components_default()(FileIcon).withConfig({
  displayName: "FileStyles__StyledLargeIcon",
  componentId: "sc-12ol6su-5"
})(["", ";height:48px;width:48px;position:absolute;top:30px;left:50%;transform:translateX(-50%);"], icon);
var StyledMediumIconCloud = external_styled_components_default()(FileIconCloud).withConfig({
  displayName: "FileStyles__StyledMediumIconCloud",
  componentId: "sc-12ol6su-6"
})(["", ";margin:0 auto;", ""], icon, function (_ref) {
  var disabled = _ref.disabled;
  return disabled && Object(external_styled_components_["css"])(["fill:", ";"], Object(themes_["variable"])('File', 'iconDisabledFill'));
});
var cloudIconContainer = Object(external_styled_components_["css"])(["display:flex;font-size:12px;line-height:16px;flex-direction:column;padding:8px 0 5px;&:not([data-error]){color:", ";}&[disabled]{color:", ";}"], Object(themes_["variable"])('white'), Object(themes_["variable"])('textDisabledColor'));
var StyledSmallText = external_styled_components_default.a.div.withConfig({
  displayName: "FileStyles__StyledSmallText",
  componentId: "sc-12ol6su-7"
})(["display:block;", " font-size:", ";"], function (_ref2) {
  var cloudIcon = _ref2.cloudIcon;
  return cloudIcon && cloudIconContainer;
}, Object(themes_["variable"])('fontSizeSmall'));
var StyledMediumText = external_styled_components_default.a.div.withConfig({
  displayName: "FileStyles__StyledMediumText",
  componentId: "sc-12ol6su-8"
})(["display:inline-block;", ""], function (_ref3) {
  var cloudIcon = _ref3.cloudIcon;
  return cloudIcon && cloudIconContainer;
});
var StyledLargeText = external_styled_components_default.a.div.withConfig({
  displayName: "FileStyles__StyledLargeText",
  componentId: "sc-12ol6su-9"
})(["margin-top:calc(", " * 4);margin-bottom:", ";", " font-size:", ";"], Object(themes_["variable"])('spacing'), Object(themes_["variable"])('spacingHalf'), function (_ref4) {
  var cloudIcon = _ref4.cloudIcon;
  return cloudIcon && cloudIconContainer;
}, Object(themes_["variable"])('fontSizeXLarge'));
var StyledLink = external_styled_components_default.a.label.withConfig({
  displayName: "FileStyles__StyledLink",
  componentId: "sc-12ol6su-10"
})(["", ";color:", ";cursor:pointer;font-size:inherit;font-weight:inherit;&:hover,&[data-focused]{text-decoration:underline;}&[data-focused]{box-shadow:", ";}&[data-error]:not([data-drag-over]){color:", ";}"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('File', 'linkColor'), Object(themes_["variable"])('File', 'linkFocusShadow'), Object(themes_["variable"])('File', 'linkErrorColor'));
var StyledHelp = external_styled_components_default.a.div.withConfig({
  displayName: "FileStyles__StyledHelp",
  componentId: "sc-12ol6su-11"
})(["margin-bottom:calc(", " * 1.5);"], Object(themes_["variable"])('spacing'));
var StyledWindowDrop = external_styled_components_default.a.div.withConfig({
  displayName: "FileStyles__StyledWindowDrop",
  componentId: "sc-12ol6su-12"
})(["position:fixed;top:0;left:0;right:0;bottom:0;border:", ";z-index:", " + 10;"], Object(themes_["variable"])('File', 'windowDropBorder'), Object(themes_["variable"])('zindexModal'));

// CONCATENATED MODULE: ./src/File/File.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function File_extends() { File_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return File_extends.apply(this, arguments); }

function File_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = File_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function File_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var targets = {
  small: StyledSmallDropTargetBox,
  medium: StyledMediumDropTargetBox,
  large: StyledLargeDropTargetBox
};
var texts = {
  small: StyledSmallText,
  medium: StyledMediumText,
  large: StyledLargeText
};
var icons = {
  medium: StyledMediumIcon,
  large: StyledLargeIcon
};
var cloudIcons = {
  medium: StyledMediumIconCloud,
  large: StyledMediumIconCloud // currently not available

};
/**
 * File provides the ability to accept files and present uploaded files. It does not provide
 * file readers, only a reference to the file. This can be used to post binary content, or
 * upload using an array buffer.
 */

var File_File =
/*#__PURE__*/
function (_Component) {
  _inherits(File, _Component);

  function File(props) {
    var _this;

    _classCallCheck(this, File);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(File).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (e) {
      _this.addFiles(e.currentTarget.files);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputFocus", function () {
      _this.setState({
        focusedInput: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputBlur", function () {
      _this.setState({
        focusedInput: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragOver", function (e) {
      if (!_this.setState.dragOver) {
        _this.setState({
          dragOver: true
        });
      }

      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDragLeave", function () {
      _this.setState({
        dragOver: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDrop", function (e) {
      e.preventDefault();

      _this.handleDragLeave();

      _this.addFiles(e.dataTransfer.files);
    });

    _this.state = {
      dragOver: false,
      focusedInput: false
    };
    _this.inputId = Object(id_["createDOMID"])();
    /* Each time a file is uploaded this is incremented and used to generate the
     * file input's key. In this way we get a new input without a value. */

    _this.inputCount = 0;
    _this.handleDragLeave = Object(external_lodash_["debounce"])(_this.handleDragLeave, 300);
    return _this;
  }

  _createClass(File, [{
    key: "addFiles",
    value: function addFiles(files) {
      var array = Array.prototype.slice.call(files, 0);
      var name = this.props.name;
      this.props.onRequestAdd(this.props.allowMultiple ? array : [array[0]], {
        name: name
      });
      this.inputCount += 1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          accept = _this$props.accept,
          allowMultiple = _this$props.allowMultiple,
          children = _this$props.children,
          dropAnywhere = _this$props.dropAnywhere,
          disabled = _this$props.disabled,
          error = _this$props.error,
          help = _this$props.help,
          name = _this$props.name,
          onRequestRemove = _this$props.onRequestRemove,
          size = _this$props.size,
          theme = _this$props.theme,
          otherProps = File_objectWithoutProperties(_this$props, ["accept", "allowMultiple", "children", "dropAnywhere", "disabled", "error", "help", "name", "onRequestRemove", "size", "theme"]);

      var fileCount = 0;
      var childrenCloned = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (item, index) {
        var handleRemove = function handleRemove(event) {
          onRequestRemove({
            event: event,
            index: index,
            itemId: item.props.itemId,
            name: name,
            filename: item.props.name
          });
        };

        fileCount += 1;
        return Object(external_react_["cloneElement"])(item, {
          disabled: disabled,
          onClick: handleRemove,
          key: item.key || item.props.itemId || "item-".concat(index),
          size: size === 'small' ? 'small' : null
        });
      });
      var isSmall = size === 'small';
      var isLarge = size === 'large';
      var dragOverWindow = isLarge || dropAnywhere;
      var dragOverOrDisabled = dragOverWindow || disabled;
      var dragOverNotDisabled = dragOverWindow && !disabled;
      var StyledDropTargetBox = targets[size];
      var StyledText = texts[size];
      var StyledIcon = icons[size];
      var StyledIconCloud = cloudIcons[size];
      var cloudIcon = Object(themes_["variable"])('File', 'cloudIcon')({
        theme: theme
      });
      return external_react_default.a.createElement(StyledDropTargetBox, File_extends({
        onDragOver: dragOverOrDisabled ? null : this.handleDragOver,
        onDragLeave: dragOverOrDisabled ? null : this.handleDragLeave,
        onDrop: dragOverOrDisabled ? null : this.handleDrop,
        "data-disabled": disabled || null,
        "data-drag-over": dragOverOrDisabled ? null : this.state.dragOver || null,
        "data-error": error || null,
        "data-file-count": fileCount,
        "data-test": "file"
      }, Object(external_lodash_["omit"])(otherProps, 'onRequestAdd', 'onRequestRemove')), external_react_default.a.createElement(StyledText, {
        cloudIcon: cloudIcon,
        "data-error": error || null,
        disabled: disabled
      }, !cloudIcon && !isSmall && !disabled && external_react_default.a.createElement(StyledIcon, {
        "data-error": error || null
      }), cloudIcon && !isSmall && external_react_default.a.createElement(StyledIconCloud, {
        "data-error": error || null,
        disabled: disabled
      }), ' ', external_react_default.a.createElement("span", null, !dragOverWindow && !disabled && Object(i18n_["_"])('Drop your file here or'), dragOverNotDisabled && Object(i18n_["_"])('Drop your file anywhere or'), ' ', fileCount === 0 && disabled && Object(i18n_["_"])('No Files Selected'), external_react_default.a.createElement(StyledLink, {
        htmlFor: this.inputId,
        "data-focused": this.state.focusedInput || null,
        "data-error": error || null
      }, external_react_default.a.createElement(StyledInput, {
        "data-test": "file-input",
        disabled: disabled,
        onChange: this.handleInputChange,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur,
        id: this.inputId,
        key: "file-input-".concat(this.inputCount),
        type: "file",
        multiple: allowMultiple || null,
        accept: accept
      }), !disabled && Object(i18n_["_"])('browse...')), ' ')), isLarge && !disabled && external_react_default.a.createElement(StyledHelp, null, help), dragOverNotDisabled && this.state.dragOver && external_react_default.a.createElement(StyledWindowDrop, {
        "data-test": "file-window-drop",
        onDragLeave: this.handleDragLeave
      }), dragOverNotDisabled && external_react_default.a.createElement(external_react_event_listener_default.a, {
        target: window,
        onDragOver: this.handleDragOver,
        onDrop: this.handleDrop
      }), childrenCloned);
    }
  }]);

  return File;
}(external_react_["Component"]);

_defineProperty(File_File, "propTypes", {
  /** The accept attribute for the file browser. This does not filter dropped items,
   * which must be filtered manually. */
  accept: external_prop_types_default.a.string,

  /** Allow the user to upload multiple files. */
  allowMultiple: external_prop_types_default.a.bool,

  /** @private */
  children: external_prop_types_default.a.node,

  /** When size is medium or small, file can be dropped anywhere on the page */
  dropAnywhere: external_prop_types_default.a.bool,

  /** Prevents user from dropping files */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Show the component in an error state. This has no affect on the large size.
   * Note, File.Item has a separate error property. */
  error: external_prop_types_default.a.bool,

  /** When size is large, help text can be shown. */
  help: external_prop_types_default.a.node,

  /** The name is returned with onRequestAdd and onRequestRemove events,
   * which can be used to identify the
   * control when multiple controls share an onChange callback. */
  name: external_prop_types_default.a.string,

  /** A callback for when the user selects one or more files. The function is
   * passed a file reference, which can then be used to read the file. This may
   * be used to enforce file constraints or upload the file. */
  onRequestAdd: external_prop_types_default.a.func,

  /** A callback for when the user requests to remove a file. The function is passed
   * the event and an object with the Item's index and name: `(event, {index, name})`. */
  onRequestRemove: external_prop_types_default.a.func,

  /** `medium` appears much like a native file input. `small` is for use on highly complex
   * pages, where data density is an issue. When `large` is used, there can only
   * be one File component on the page as it will take all files dropped on the page. */
  size: external_prop_types_default.a.oneOf(['small', 'medium', 'large']),

  /** @private */
  theme: external_prop_types_default.a.object
});

_defineProperty(File_File, "defaultProps", {
  allowMultiple: false,
  dropAnywhere: false,
  disabled: false,
  error: false,
  onRequestRemove: function onRequestRemove() {},
  size: 'medium',
  theme: null
});

_defineProperty(File_File, "Item", File_Item);

var filewithTheme = Object(external_styled_components_["withTheme"])(File_File);
filewithTheme.propTypes = File_File.propTypes;
filewithTheme.defaultProps = File_File.defaultProps;
/* harmony default export */ var src_File_File = (Object(external_styled_components_["withTheme"])(filewithTheme));

// CONCATENATED MODULE: ./src/File/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_File_File; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Item", function() { return File_Item; });



/***/ })

/******/ });