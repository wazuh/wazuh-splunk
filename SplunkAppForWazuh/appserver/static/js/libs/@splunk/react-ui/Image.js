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
/******/ 	return __webpack_require__(__webpack_require__.s = 137);
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

/***/ 137:
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

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-icons/Remove"
var Remove_ = __webpack_require__(32);
var Remove_default = /*#__PURE__*/__webpack_require__.n(Remove_);

// EXTERNAL MODULE: external "@splunk/react-ui/Message"
var Message_ = __webpack_require__(59);
var Message_default = /*#__PURE__*/__webpack_require__.n(Message_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@splunk/react-ui/Clickable"
var Clickable_ = __webpack_require__(11);
var Clickable_default = /*#__PURE__*/__webpack_require__.n(Clickable_);

// EXTERNAL MODULE: external "@splunk/react-ui/File"
var File_ = __webpack_require__(60);
var File_default = /*#__PURE__*/__webpack_require__.n(File_);

// CONCATENATED MODULE: ./src/Image/ImageStyles.js




var StyledFile = external_styled_components_default()(File_default.a).withConfig({
  displayName: "ImageStyles__StyledFile",
  componentId: "sc-1uju7or-0"
})(["margin-bottom:", ";"], Object(themes_["variable"])('spacingQuarter'));
var StyledImagePreview = external_styled_components_default.a.div.withConfig({
  displayName: "ImageStyles__StyledImagePreview",
  componentId: "sc-1uju7or-1"
})(["border:", ";position:relative;min-height:30px;border-radius:", ";overflow:", ";"], Object(themes_["variable"])('border'), Object(themes_["variable"])('Image', 'borderRadius'), Object(themes_["variable"])('Image', 'overflow'));
var StyledLabelContainer = external_styled_components_default.a.div.withConfig({
  displayName: "ImageStyles__StyledLabelContainer",
  componentId: "sc-1uju7or-2"
})(["", ";display:flex;flex-direction:row;justify-content:space-between;background-color:", ";color:", ";opacity:0.9;position:absolute;width:100%;cursor:", ";"], Object(themes_["mixin"])('reset')('block'), Object(themes_["variable"])('Image', 'boxBackgroundColor'), Object(themes_["variable"])('Image', 'boxColor'), Object(themes_["variable"])('Image', 'cursor'));
var scpRemoveClickableStyle = Object(external_styled_components_["css"])(["width:16px;height:16px;display:flex;align-items:center;justify-content:center;position:absolute;top:8px;right:8px;background-color:", ";border-radius:", ";"], Object(themes_["variable"])('Image', 'removeClickableBackgroundColor'), Object(themes_["variable"])('Image', 'removeClickableBorderRadius'));
var StyledRemoveClickable = external_styled_components_default()(Clickable_default.a).withConfig({
  displayName: "ImageStyles__StyledRemoveClickable",
  componentId: "sc-1uju7or-3"
})(["cursor:pointer;color:", ";flex:", ";padding:3px 0;text-align:center;height:inherit;", " &:focus{box-shadow:", ";color:", ";background-color:", ";}&:hover{background-color:", ";color:", ";}"], Object(themes_["variable"])('Image', 'removeClickableColor'), Object(themes_["variable"])('Image', 'removeClickableFlex'), function (_ref) {
  var itemRemoveable = _ref.itemRemoveable;
  return itemRemoveable && scpRemoveClickableStyle;
}, Object(themes_["variable"])('Image', 'removeClickableFocusShadow'), Object(themes_["variable"])('Image', 'removeClickableFocusColor'), Object(themes_["variable"])('Image', 'removeClickableFocusBackgroundColor'), Object(themes_["variable"])('Image', 'removeClickableHoverBackgroundColor'), Object(themes_["variable"])('Image', 'removeClickableHoverColor'));
var StyledLabel = external_styled_components_default.a.div.withConfig({
  displayName: "ImageStyles__StyledLabel",
  componentId: "sc-1uju7or-4"
})(["color:", ";overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 0 0px;padding:", ";font-size:", ";line-height:", ";[data-disabled] > &{background-color:", ";color:", ";cursor:not-allowed;}&:hover{background-color:", ";& + ", "{background-color:", ";}}"], Object(themes_["variable"])('Image', 'labelColor'), Object(themes_["variable"])('Image', 'padding'), Object(themes_["variable"])('Image', 'fontSize'), Object(themes_["variable"])('Image', 'lineHeight'), Object(themes_["variable"])('Image', 'labelDisabledBackgroundColor'), Object(themes_["variable"])('textGray'), Object(themes_["variable"])('Image', 'boxBackgroundHoverColor'),
/* sc-sel */
StyledRemoveClickable, Object(themes_["variable"])('Image', 'removeClickableHoverLabelBackgroundColor'));
var StyledImageThumbnail = external_styled_components_default.a.img.withConfig({
  displayName: "ImageStyles__StyledImageThumbnail",
  componentId: "sc-1uju7or-5"
})(["", ";margin:0 auto;max-height:", "px;max-width:100%;"], Object(themes_["mixin"])('reset')('block'), function (props) {
  return props.maxHeight;
});

// CONCATENATED MODULE: ./src/Image/Image.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










/**
 * Image provides the ability to accept image files and present a preview of the image.
 */

var Image_Image =
/*#__PURE__*/
function (_Component) {
  _inherits(Image, _Component);

  _createClass(Image, null, [{
    key: "isAllowedFilename",
    value: function isAllowedFilename(filename, allowExtensions) {
      return filename && allowExtensions.some(function (extension) {
        return Object(external_lodash_["endsWith"])(Object(external_lodash_["toLower"])(filename), ".".concat(Object(external_lodash_["toLower"])(extension)));
      });
    }
  }]);

  function Image(props) {
    var _this;

    _classCallCheck(this, Image);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddFiles", function (files) {
      var file = files[0];

      if (_this.fileReader.readyState === 1) {
        _this.fileReader.abort();
      }

      _this.fileReader.onload = function onLoad() {
        var event = {
          filename: file.name,
          imageDataURI: this.fileReader.result
        };
        this.setState(event);

        if (Image.isAllowedFilename(file.name, this.props.allowExtensions)) {
          this.props.onImageChange(event);
        }
      }.bind(_assertThisInitialized(_assertThisInitialized(_this)));

      _this.fileReader.readAsDataURL(file);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRemoveFile", function () {
      if (_this.fileReader.readyState === 1) {
        _this.fileReader.abort();
      }

      var event = {
        filename: null,
        imageDataURI: null
      };

      _this.setState(event);

      _this.props.onImageChange(event);
    });

    _this.state = {
      filename: props.defaultFilename,
      imageDataURI: props.defaultImageDataURI
    };
    _this.fileReader = new FileReader();
    return _this;
  }

  _createClass(Image, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (false) {}
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          allowExtensions = _this$props.allowExtensions,
          maxHeight = _this$props.maxHeight,
          theme = _this$props.theme;
      var _this$state = this.state,
          filename = _this$state.filename,
          imageDataURI = _this$state.imageDataURI;
      var accept = allowExtensions.map(function (extension) {
        return ".".concat(extension);
      }).join(', ');
      var error = filename && !Image.isAllowedFilename(filename, allowExtensions);

      var errorText = Object(i18n_["_"])('This file extension is unsupported.');

      var removeLabel = Object(i18n_["_"])('Remove "%1"').replace('%1', filename);

      var cloudIcon = Object(themes_["variable"])('Image', 'cloudIcon')({
        theme: theme
      });
      return external_react_default.a.createElement("div", {
        "data-test": "image"
      }, external_react_default.a.createElement(StyledFile, _extends({}, Object(external_lodash_["omit"])(this.props, ['allowExtensions', 'defaultFilename', 'defaultImageDataURI', 'maxHeight', 'onImageChange']), {
        accept: accept,
        allowMultiple: false,
        error: error,
        size: "medium",
        onRequestAdd: this.handleAddFiles,
        "data-test": "file"
      }), filename && !error && external_react_default.a.createElement(StyledImagePreview, null, external_react_default.a.createElement(StyledLabelContainer, {
        onClick: cloudIcon ? this.handleRemoveFile : null
      }, external_react_default.a.createElement(StyledLabel, {
        "data-test": "label"
      }, filename), external_react_default.a.createElement(StyledRemoveClickable, {
        onClick: this.handleRemoveFile,
        "data-test": "remove",
        "aria-label": removeLabel,
        itemRemoveable: cloudIcon
      }, external_react_default.a.createElement(Remove_default.a, {
        screenReaderText: null,
        style: cloudIcon ? {
          width: 6,
          height: 6
        } : null
      }))), external_react_default.a.createElement(StyledImageThumbnail, {
        "data-test": "preview",
        alt: filename,
        src: imageDataURI,
        maxHeight: maxHeight
      }))), error && external_react_default.a.createElement(Message_default.a, {
        fill: true,
        type: "error"
      }, errorText));
    }
  }]);

  return Image;
}(external_react_["Component"]);

_defineProperty(Image_Image, "propTypes", {
  /** Specify the allowed image extensions. Should be an array
   * of image extensions, e.g., ['gif', 'jpg', 'png'].
   */
  allowExtensions: external_prop_types_default.a.arrayOf(external_prop_types_default.a.string),

  /** The default filename of the selected image. In order to render selected image preview,
   * need to set valid defaultFilename (end with allowed image extensions, e.g., 'default.png')
   * and defaultImageDataURI at the same time. */
  defaultFilename: external_prop_types_default.a.string,

  /** The default selected image data (as data URI). Need to set with defaultFilename at the same time. */
  defaultImageDataURI: external_prop_types_default.a.string,

  /** Prevents user from selecting or dropping images. */
  disabled: external_prop_types_default.a.bool,

  /** Image can be dropped anywhere on the page. */
  dropAnywhere: external_prop_types_default.a.bool,

  /** Invoked with the DOM element when the component mounts and
   * null when it unmounts. */
  elementRef: external_prop_types_default.a.func,

  /** The max-height of the preview in pixels. */
  maxHeight: external_prop_types_default.a.number,

  /** A callback for when the image changes. The function is passed an
   * object containing two keys: `filename` and `imageDataURI`. Both are
   * `null` if the image was removed. */
  onImageChange: external_prop_types_default.a.func,

  /** @private */
  theme: external_prop_types_default.a.object
});

_defineProperty(Image_Image, "defaultProps", {
  allowExtensions: ['gif', 'jpeg', 'jpg', 'png'],
  defaultFilename: null,
  defaultImageDataURI: null,
  disabled: false,
  dropAnywhere: false,
  maxHeight: 180,
  onImageChange: function onImageChange() {},
  theme: null
});

var ImagewithTheme = Object(external_styled_components_["withTheme"])(Image_Image);
ImagewithTheme.propTypes = Image_Image.propTypes;
ImagewithTheme.defaultProps = Image_Image.defaultProps;
/* harmony default export */ var src_Image_Image = (ImagewithTheme);
// CONCATENATED MODULE: ./src/Image/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_Image_Image; });


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

/***/ 59:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Message");

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/File");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ })

/******/ });