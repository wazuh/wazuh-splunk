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
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
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

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "commonmark-react-renderer"
var external_commonmark_react_renderer_ = __webpack_require__(61);
var external_commonmark_react_renderer_default = /*#__PURE__*/__webpack_require__.n(external_commonmark_react_renderer_);

// EXTERNAL MODULE: external "commonmark"
var external_commonmark_ = __webpack_require__(62);
var external_commonmark_default = /*#__PURE__*/__webpack_require__.n(external_commonmark_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// EXTERNAL MODULE: external "@splunk/react-ui/Code"
var Code_ = __webpack_require__(63);
var Code_default = /*#__PURE__*/__webpack_require__.n(Code_);

// EXTERNAL MODULE: external "@splunk/react-ui/Heading"
var Heading_ = __webpack_require__(43);
var Heading_default = /*#__PURE__*/__webpack_require__.n(Heading_);

// EXTERNAL MODULE: external "@splunk/react-ui/Link"
var Link_ = __webpack_require__(29);
var Link_default = /*#__PURE__*/__webpack_require__.n(Link_);

// EXTERNAL MODULE: external "@splunk/react-ui/List"
var List_ = __webpack_require__(50);
var List_default = /*#__PURE__*/__webpack_require__.n(List_);

// EXTERNAL MODULE: external "@splunk/react-ui/Paragraph"
var Paragraph_ = __webpack_require__(64);
var Paragraph_default = /*#__PURE__*/__webpack_require__.n(Paragraph_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// CONCATENATED MODULE: ./src/Markdown/MarkdownStyles.js


var StyledCodeBlock = external_styled_components_default.a.div.withConfig({
  displayName: "MarkdownStyles__StyledCodeBlock",
  componentId: "las0o4-0"
})(["background-color:", ";padding:", ";margin:", " 0;"], Object(themes_["variable"])('Markdown', 'codeBlockBackgroundColor'), Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('spacingHalf'));
var StyledCodeInline = external_styled_components_default.a.code.withConfig({
  displayName: "MarkdownStyles__StyledCodeInline",
  componentId: "las0o4-1"
})(["", ";background-color:", ";font-family:", ";"], Object(themes_["mixin"])('reset')('inline'), Object(themes_["variable"])('Markdown', 'codeInlineBackgroundColor'), Object(themes_["variable"])('monoFontFamily'));

// CONCATENATED MODULE: ./src/Markdown/Markdown.jsx
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }












var parser = new external_commonmark_default.a.Parser();
var propTypes = {
  /** A custom blockquote renderer. The function is passed an object containing `children`. */
  blockquoteRenderer: external_prop_types_default.a.func,

  /**
   * A custom code literal renderer. The function is passed an object containing `literal`
   * and `inline`.
   */
  codeRenderer: external_prop_types_default.a.func,

  /**
   * A custom code block renderer. The function is passed an object containing `language` and
   * `literal`.
   */
  codeBlockRenderer: external_prop_types_default.a.func,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /**
   * A custom heading renderer. The function is passed an object containing `level` (from 1 to
   * 6) and `children`.
   */
  headingRenderer: external_prop_types_default.a.func,

  /**
   * A custom image renderer. The function is passed an object containing `src`, `title`,
   * and `alt`.
   */
  imageRenderer: external_prop_types_default.a.func,

  /**
   * A custom link renderer. This is useful for single-page apps that need to handle links
   * internally. The function is passed an object containing `href`, `title`, and `children`.
   */
  linkRenderer: external_prop_types_default.a.func,

  /**
   * A custom list renderer. The function is passed an object containing `start`,
   * `type` ('bullet' or 'ordered') and `tight`.
   */
  listRenderer: external_prop_types_default.a.func,

  /** A custom list item renderer. The function is passed an object containing `children`. */
  itemRenderer: external_prop_types_default.a.func,

  /**
   * A custom paragraph renderer. The function is passed an object containing `children`.
   */
  paragraphRenderer: external_prop_types_default.a.func,

  /** The content to be parsed and rendered. */
  text: external_prop_types_default.a.string.isRequired
};
/**
 * The Markdown component renders the given markdown text as a React component.
 * The composing prefers @splunk/react-ui components over plain html components, for example
 * links will be rendered as the `@splunk/react-ui/Link` component instead of plain `<a>` tag.
 */

function Markdown(props) {
  var text = props.text,
      blockquoteRenderer = props.blockquoteRenderer,
      codeRenderer = props.codeRenderer,
      codeBlockRenderer = props.codeBlockRenderer,
      headingRenderer = props.headingRenderer,
      imageRenderer = props.imageRenderer,
      linkRenderer = props.linkRenderer,
      listRenderer = props.listRenderer,
      itemRenderer = props.itemRenderer,
      paragraphRenderer = props.paragraphRenderer,
      otherProps = _objectWithoutProperties(props, ["text", "blockquoteRenderer", "codeRenderer", "codeBlockRenderer", "headingRenderer", "imageRenderer", "linkRenderer", "listRenderer", "itemRenderer", "paragraphRenderer"]); // keep this option object inside the constructor, otherwise the renderers
  // below will confuse the doc-gen

  /* eslint-disable react/prop-types */


  var rendererOptions = {
    renderers: {
      CodeBlock: codeBlockRenderer || function (_ref) {
        var literal = _ref.literal,
            language = _ref.language;
        return external_react_default.a.createElement(StyledCodeBlock, null, external_react_default.a.createElement(Code_default.a, {
          language: language,
          value: literal
        }));
      },
      Code: codeRenderer || function (_ref2) {
        var literal = _ref2.literal;
        return external_react_default.a.createElement(StyledCodeInline, null, literal);
      },
      Heading: headingRenderer || function (_ref3) {
        var level = _ref3.level,
            children = _ref3.children;
        return external_react_default.a.createElement(Heading_default.a, {
          level: Math.min(level, 4)
        }, children);
      },
      Link: linkRenderer || function (_ref4) {
        var href = _ref4.href,
            title = _ref4.title,
            children = _ref4.children;
        return external_react_default.a.createElement(Link_default.a, {
          to: href,
          title: title
        }, children);
      },
      List: listRenderer || function (_ref5) {
        var children = _ref5.children,
            type = _ref5.type;
        return external_react_default.a.createElement(List_default.a, {
          type: type === 'bullet' ? 'disc' : 'decimal'
        }, children);
      },
      Item: itemRenderer || function (_ref6) {
        var children = _ref6.children;
        return external_react_default.a.createElement(List_default.a.Item, null, children);
      },
      Paragraph: paragraphRenderer || function (_ref7) {
        var children = _ref7.children;
        return external_react_default.a.createElement(Paragraph_default.a, null, children);
      }
    },
    escapeHtml: true
  };
  /* eslint-enable react/prop-types */

  if (blockquoteRenderer) {
    rendererOptions.renderers.Blockquote = blockquoteRenderer;
  }

  if (imageRenderer) {
    rendererOptions.renderers.Image = imageRenderer;
  }

  var renderer = new external_commonmark_react_renderer_default.a(_objectSpread({}, rendererOptions));
  var ast = parser.parse(text);
  var elements = renderer.render(ast);
  return external_react_default.a.createElement(Box_default.a, _extends({
    "data-test": "markdown"
  }, otherProps), elements);
}
Markdown.propTypes = propTypes;
// CONCATENATED MODULE: ./src/Markdown/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return Markdown; });


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Link");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Heading");

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/List");

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

module.exports = require("commonmark-react-renderer");

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

module.exports = require("commonmark");

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Code");

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Paragraph");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });