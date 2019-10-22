define(function (require, exports, module) {

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
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports) {

module.exports = require("tinycolor2");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("@splunk/themes/scp");

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("@splunk/themes/enterpriseDark");

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

module.exports = require("@splunk/themes/enterprise");

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

module.exports = require("@splunk/themes/lite");

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/themes/enterprise"
var enterprise_ = __webpack_require__(84);
var enterprise_default = /*#__PURE__*/__webpack_require__.n(enterprise_);

// EXTERNAL MODULE: external "tinycolor2"
var external_tinycolor2_ = __webpack_require__(12);
var external_tinycolor2_default = /*#__PURE__*/__webpack_require__.n(external_tinycolor2_);

// CONCATENATED MODULE: ./src/themes/base.js

/* harmony default export */ var themes_base = (function (base) {
  return {
    'react-ui': {
      base: base,
      Button: {
        iconPaddingRight: '3px',
        iconOnlyPadding: base.spacingQuarter,
        paddingSmall: base.spacingQuarter,
        paddingLarge: base.fontSize
      },
      ButtonSimple: {
        Primary: {
          shadow: "inset 0 -2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString()),
          selectedShadow: "inset 0 2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString()),
          focusShadow: "inset 0 -2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString(), ", ").concat(base.focusShadow),
          selectedFocusShadow: "inset 0 2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString(), ", ").concat(base.focusShadow),
          color: base.white,
          backgroundColor: base.brandColor,
          hoverBackgroundColor: base.brandColorD20,
          activeBackgroundColor: base.brandColorD30,
          selectedBackgroundColor: base.brandColorD20,
          disabledBackgroundColor: base.brandColorL10,
          disabledTextColor: base.brandColorL30,
          disabledSelectedBackgroundColor: base.brandColorD20,
          disabledSelectedBorderColor: base.borderColor,
          prependBorderLeftColor: base.brandColorD20
        },
        Error: {
          shadow: "inset 0 -2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString()),
          selectedShadow: "inset 0 2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString()),
          focusShadow: "inset 0 -2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString(), ", ").concat(base.focusShadow),
          selectedFocusShadow: "inset 0 2px 0 ".concat(external_tinycolor2_default()('black').setAlpha(0.1).toRgbString(), ", ").concat(base.focusShadow),
          color: base.white,
          backgroundColor: base.errorColor,
          activeBackgroundColor: base.errorColorD30,
          hoverBackgroundColor: base.errorColorD20,
          selectedBackgroundColor: base.errorColorD20,
          disabledBackgroundColor: base.errorColorL10,
          disabledTextColor: base.errorColorL30,
          disabledSelectedBackgroundColor: base.errorColorD20,
          disabledSelectedBorderColor: base.borderColor,
          prependBorderLeftColor: base.errorColorD20
        },
        Default: {
          shadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          hoverShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          activeShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          selectedShadow: 'inset 0 1px 0 rgba(0,0,0,0.1)',
          focusShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusHoverShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusActiveShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusSelectedShadow: "inset 0 1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusAppendShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow, ", inset -1px 0 0 ").concat(base.borderColor),
          focusAppendSelectedShadow: "inset 0 1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow, ", inset -1px 0 0 ").concat(base.borderColor),
          color: base.gray45,
          border: base.border,
          backgroundColor: base.gray98,
          selectedBackgroundColor: base.gray92,
          hoverBackgroundColor: external_tinycolor2_default()(base.gray96).darken(2.5).toHexString(),
          activeBackgroundColor: base.gray92,
          disabledBackgroundColor: base.gray96,
          disabledBorderColor: base.borderLightColor,
          disabledSelectedBackgroundColor: base.gray92,
          disabledSelectedBorderColor: base.borderColor,
          disabledTextColor: base.textDisabledColor,
          activePrependLeftBorderColor: base.borderColor
        },
        Secondary: {
          shadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          hoverShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          activeShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          selectedShadow: 'inset 0 1px 0 rgba(0,0,0,0.1)',
          focusShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusHoverShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusActiveShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusSelectedShadow: "inset 0 1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow),
          focusAppendShadow: "inset 0 -1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow, ", inset -1px 0 0 ").concat(base.borderColor),
          focusAppendSelectedShadow: "inset 0 1px 0 rgba(0,0,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.1), ".concat(base.focusShadow, ", inset -1px 0 0 ").concat(base.borderColor),
          color: base.gray45,
          border: base.border,
          backgroundColor: base.gray98,
          selectedBackgroundColor: base.gray92,
          hoverBackgroundColor: external_tinycolor2_default()(base.gray96).darken(2.5).toHexString(),
          activeBackgroundColor: base.gray92,
          disabledBackgroundColor: base.gray96,
          disabledBorderColor: base.borderLightColor,
          disabledSelectedBackgroundColor: base.gray92,
          disabledSelectedBorderColor: base.borderColor,
          disabledTextColor: base.textDisabledColor,
          activePrependLeftBorderColor: base.borderColor
        },
        Pill: {
          color: base.gray45,
          hoverBackgroundColor: base.backgroundColorHover,
          hoverBorderColor: base.borderColor,
          hoverColor: base.linkColor,
          focusColor: base.linkColor,
          expandedBackgroundColor: base.gray92,
          invalidColor: base.errorColor,
          selectedBorderColor: base.accentColor,
          selectedDisabledBorderColor: base.borderLightColor,
          disabledTextColor: base.textDisabledColor
        }
      },
      Calendar: {
        width: '220px',
        padding: '8px',
        DateTable: {
          tableHeaderColor: base.textGray,
          paddingBottom: '2px',
          fontSize: base.fontSizeSmall
        },
        Day: {
          buttonColor: base.gray45,
          buttonHoverColor: base.linkColor,
          buttonHoverBackgroundColor: base.backgroundColorHover,
          buttonSelectedBorderColor: base.accentColor,
          buttonSelectedBorderHoverColor: base.linkColor,
          buttonSelectedBackgroundColor: 'transparent',
          width: '2em',
          lineHeight: '2em',
          border: '1px solid transparent',
          borderRadius: base.borderRadius,
          focusShadow: base.focusShadow
        },
        MonthHeader: {
          textTransform: 'capitalize'
        }
      },
      Card: {
        backgroundColor: base.backgroundColor,
        clickableSelectedBorderColor: base.focusColor,
        borderColor: base.borderLightColor,
        hoverShadow: base.overlayShadow,
        focusShadow: base.focusShadow,
        Header: {
          subtitleColor: base.textGray,
          padding: base.spacing
        },
        Body: {
          padding: base.spacing,
          firstChildPaddingTop: '0'
        },
        Footer: {
          boxColor: base.textGray,
          padding: base.spacing,
          borderTop: "1px solid ".concat(base.gray92)
        }
      },
      Chip: {
        clickableBackgroundColor: base.gray92,
        clickableColor: base.textGray,
        clickableHoverBackgroundColor: base.gray96,
        clickableDisabledBackgroundColor: 'rgba(0, 0, 0, 0.05)',
        errorColorBackgroundColor: base.errorColorL10,
        labelColor: base.textColor,
        iconColor: base.textColor,
        infoColorBackgroundColor: base.infoColorL10,
        successColorBackgroundColor: base.successColorL10,
        warningColorBackgroundColor: base.warningColorL10
      },
      Clickable: {
        disabledColor: base.textDisabledColor
      },
      Code: {
        commentToken: base.syntaxGray,
        prologToken: base.syntaxGray,
        doctypeToken: base.syntaxGray,
        cdataToken: base.syntaxGray,
        punctuationToken: base.syntaxGray,
        propertyToken: base.syntaxPurple,
        tagToken: base.syntaxPurple,
        booleanToken: base.syntaxPurple,
        numberToken: base.syntaxPurple,
        constantToken: base.syntaxPurple,
        symbolToken: base.syntaxPurple,
        deletedToken: base.syntaxPurple,
        selectorToken: base.syntaxGreen,
        'attr-nameToken': base.syntaxGreen,
        stringToken: base.syntaxGreen,
        charToken: base.syntaxGreen,
        builtinToken: base.syntaxGreen,
        insertedToken: base.syntaxGreen,
        operatorToken: base.syntaxBrown,
        entityToken: base.syntaxBrown,
        urlToken: base.syntaxBrown,
        atruleToken: base.syntaxBlue,
        'attr-valueToken': base.syntaxBlue,
        keywordToken: base.syntaxBlue,
        functionToken: base.syntaxRed,
        regexToken: base.syntaxOrange,
        importantToken: base.syntaxOrange,
        variableToken: base.syntaxOrange
      },
      CollapsiblePanel: {
        minHeight: "calc(".concat(base.lineHeight, " + 12px)"),
        marginTop: '2px',
        iconTransition: 'transform 300ms',
        iconPosition: '12px',
        iconTransfromClose: 'rotate(90deg)',
        titleLineHeight: base.lineHeight,
        titlePadding: "6px calc(".concat(base.spacing, " + ").concat(base.spacingHalf, ")"),
        titleClickableColor: base.textColor,
        titleClickableCollapsedBackgroundColor: base.gray96,
        titleClickableHoverBackgroundColor: base.gray92,
        titleFocusShadow: base.focusShadowInset
      },
      Color: {
        width: '180px',
        clickableInvalidBorderColor: base.errorColor,
        swatchesListMarginRight: '-6px',
        swatchesListMarginBottom: '6px',
        Swatch: {
          marginRight: base.spacingQuarter,
          marginBottom: base.spacingQuarter,
          nullLineColor: '#ed1e24',
          transparentPatternEvenColor: 'transparent',
          transparentPatternOddColor: base.gray80,
          border: base.border,
          focusBorderColor: external_tinycolor2_default()(base.focusColor).setAlpha(0.8).toRgbString(),
          boxShadow: base.focusShadow,
          smallSize: base.inputHeightSmall
        },
        Input: {
          width: '100%'
        }
      },
      Concertina: {
        panelBodyErrorBackgroundColor: base.errorColorL50,
        panelBodyWarningBackgroundColor: base.warningColorL50,
        Heading: {
          clickableColor: base.textColor,
          clickableBackgroundColor: base.gray96,
          clickableHoverBackgroundColor: base.gray92,
          clickableDisabledBackgroundColor: base.gray96
        }
      },
      ControlGroup: {
        boxInvalidColor: base.errorColor,
        helpColor: base.textGray
      },
      Date: {
        width: '105px',
        widthLarge: '130px',
        widthSmall: '80px'
      },
      File: {
        mediumDropTargetBoxBorderColor: base.borderColor,
        mediumDropTargetBoxDisabledColor: base.textGray,
        mediumDropTargetBoxDisabledFileCount0BackgroundColor: base.gray96,
        largeDropTargetBoxDisabledColor: base.textGray,
        linkColor: base.linkColor,
        linkFocusShadow: base.focusShadowInset,
        iconFill: base.gray60,
        padding: base.spacingQuarter,
        borderDragOver: "1px solid ".concat(base.accentColorL10),
        disabledBorder: 'none',
        windowDropBorder: "5px solid ".concat(base.accentColorL10),
        Item: {
          backgroundColor: 'transparent',
          boxBackgroundColor: base.gray92,
          boxColor: base.textGray,
          labelColor: base.textColor,
          labelErrorTextColor: base.errorColor,
          labelDisabledBackgroundColor: base.gray96,
          labelDisabledTextColor: base.textGray,
          removeClickableFocusColor: base.linkColor,
          removeClickableHoverBackgroundColor: base.gray96,
          removeClickableHoverColor: base.linkColor,
          borderRadius: '2px',
          padding: "3px 0 3px ".concat(base.spacingHalf),
          flex: "0 0 ".concat(base.inputHeight),
          removeClickableBorderRadius: '0 2px 2px 0',
          removeClickablePadding: '3px 0',
          removeClickableErrorBorder: "1px solid ".concat(base.errorColor),
          removeClickableFocusShadow: base.focusShadow,
          removeClickableSmallFlexBasis: base.inputHeightSmall
        }
      },
      Heading: {
        sectionColor: base.gray45,
        fontWeight: base.fontWeightSemiBold,
        fontSize: base.fontSize,
        h1FontSize: base.fontSizeXXLarge,
        h2FontSize: base.fontSizeXLarge,
        h3FontSize: base.fontSizeLarge,
        h4FontSize: base.fontSize,
        h5FontSize: '12px'
      },
      Image: {
        boxBackgroundColor: base.gray92,
        boxColor: base.textGray,
        labelColor: base.textColor,
        labelDisabledBackgroundColor: base.gray96,
        removeClickableFocusColor: base.linkColor,
        removeClickableHoverBackgroundColor: base.gray96,
        removeClickableHoverColor: base.linkColor,
        padding: "3px 0 3px ".concat(base.spacingHalf),
        removeClickableColor: 'inherit',
        removeClickableFlex: "0 0 ".concat(base.inputHeight),
        removeClickableFocusShadow: base.focusShadow
      },
      JSONTree: {
        TreeNode: {
          expandLinkClickableColor: base.linkColor,
          propertyColor: base.syntaxRed,
          typeColorString: base.syntaxTeal,
          typeColorNumber: base.syntaxBlue,
          typeColorBoolean: base.syntaxPurple,
          typeColorNull: base.syntaxBrown,
          typeColorObject: base.textColor
        }
      },
      Link: {
        clickableColor: base.linkColor,
        focusShadow: "0 0 1px 2px ".concat(external_tinycolor2_default()(base.focusColor).setAlpha(0.6).toRgbString()),
        disabledColor: base.textDisabledColor,
        focusTextDecoration: 'none',
        externalMargin: '0 0 0 3px'
      },
      Logo: {
        svgTextFill: base.gray20,
        svgInvertedTextFill: base.white
      },
      Markdown: {
        codeBlockBackgroundColor: base.gray96,
        codeInlineBackgroundColor: base.gray92
      },
      Menu: {
        backgroundColor: base.backgroundColor,
        Item: {
          backgroundColorHover: base.backgroundColorHover,
          clickableColor: base.gray45,
          disabledSelectedIconColor: base.gray80,
          focusShadowInset: base.focusShadowInset,
          matchColor: base.accentColor,
          descriptionColor: base.textGray,
          itemSelectedIconColor: base.accentColorL10,
          itemSelectedIconLeft: '8px',
          itemSelectedIconTop: '5px',
          itemIconVertical: 'middle',
          submenuColor: base.textGray,
          padding: "6px ".concat(base.spacingHalf),
          lineHeight: base.lineHeight,
          selectablePaddingLeft: '28px',
          selectablePaddingRight: base.spacingHalf,
          selectablePosition: 'left',
          checkboxPaddingLeft: '32px'
        },
        Heading: {
          padding: "".concat(base.spacingQuarter, " ").concat(base.spacingHalf, " 6px")
        }
      },
      Message: {
        iconColor: base.white,
        iconInfoColor: base.infoColor,
        iconSuccessColor: base.successColor,
        iconWarningColor: base.warningColor,
        iconErrorColor: base.errorColor,
        boxInfoBackgroundColor: base.infoColorL50,
        boxSuccessBackgroundColor: base.successColorL50,
        boxWarningBackgroundColor: base.warningColorL50,
        boxErrorBackgroundColor: base.errorColorL50
      },
      Modal: {
        boxShadow: "0 1px 5px ".concat(base.black),
        transform: 'translateX(-50%)',
        Body: {
          boxBackgroundColor: base.backgroundColor
        },
        Footer: {
          boxBackgroundColor: base.backgroundColor,
          boxBorderTopColor: base.borderColor
        },
        Header: {
          boxBackgroundColor: base.backgroundColor,
          boxBorderBottomColor: base.borderColor,
          boxPadding: '25px 28px',
          closeAndPeekPaddingRight: '94px',
          closeOrPeekPaddingRight: '54px',
          titleFontWeightSemiBold: base.fontWeightSemiBold,
          titleLineHeight: '22px',
          subTitleLineHeight: base.lineHeight
        }
      },
      ModalLayer: {
        backgroundColor: base.gray30
      },
      Monogram: {
        color: base.white,
        clickableFocusHoverBoxShadow: base.focusShadowInset,
        backgroundColors: ['#006d9c', '#ec9960', '#af575a', '#62b3b2', '#4fa484', '#f8be34', '#5a4575', '#708794', '#294e70', '#b6c75a', '#5cc05c', '#007abd', '#dc4e41', '#f1813f', '#f8be34', '#53a051', '#006d9c', '#77d6d8', '#f589ad', '#6a2c5d']
      },
      Multiselect: {
        Normal: {
          boxBackgroundColor: base.white,
          boxDisabledBackgroundColor: base.gray96,
          boxInvalidBorderColor: base.errorColor,
          boxInvalidColor: base.errorColor
        }
      },
      Number: {
        incrementorWidth: '20px',
        mediumWidth: '100px',
        minusButtonBorderRightColor: base.borderColor,
        plusButtonBorderRightColor: base.borderColor
      },
      Paragraph: {
        marginBottom: "calc(".concat(base.lineHeight, " / 2)")
      },
      Popover: {
        align: 'center',
        lightBackgroundColor: base.backgroundColor,
        lightBorder: base.border,
        lightBoxShadow: "0 2px 2px ".concat(external_tinycolor2_default()(base.gray20).setAlpha(0.1).toRgbString()),
        lightColor: base.textColor,
        arrowBorderBottomColor: base.borderColor,
        darkBackgroundColor: base.gray20,
        darkColor: base.white,
        darkArrowBorderBottomColor: base.gray20,
        arrowHeightPixel: 8,
        paddingPixel: 8 // must be same as arrowHeight if arrowHeight is > 0

      },
      Progress: {
        tooltipBackgroundColor: base.accentColorD10
      },
      Resize: {
        resizeColor: base.borderColor
      },
      ResultsMenu: {
        footerColor: base.textGray,
        loadingMessageColor: base.textGray
      },
      SidePanel: {
        panelBackgroundColor: base.backgroundColor
      },
      Slider: {
        sliderBarDisabledBackgroundColor: base.gray92,
        sliderBarLeftSideColor: base.gray45,
        sliderBarRightSideColor: base.gray80,
        sliderBarStepMarksColor: base.gray96,
        sliderThumbBackgroundColor: base.gray45,
        sliderThumbDisabledBackgroundColor: base.gray92,
        labelDisabledColor: base.textDisabledColor
      },
      StepBar: {
        Step: {
          color: base.textDisabledColor,
          grayFill: base.gray80,
          nextStroke: base.gray80,
          prevOrActiveFillColor: base.brandColor
        }
      },
      Switch: {
        wrapperErrorColor: base.errorColor,
        labelPaddingLeft: base.spacingQuarter,
        Checkbox: {
          color: base.gray45,
          focusShadow: base.focusShadow,
          selectedBorderColor: base.gray45,
          disabledBorderColor: base.gray80,
          disabledColor: base.gray80,
          errorColor: base.errorColor,
          errorBorderColor: base.errorColorL30,
          selectedErrorBorderColor: base.errorColor
        },
        Radio: {
          color: base.gray45,
          selectedLeft: '4px',
          selectedTop: '4px',
          focusShadow: base.focusShadow,
          selectedBorderColor: base.gray45,
          disabledBorderColor: base.gray80,
          disabledColor: base.gray80,
          errorColor: base.errorColor,
          errorBorderColor: base.errorColorL30,
          selectedErrorBorderColor: base.errorColor
        },
        Toggle: {
          shadow: 'inset 0 2px 0 rgba(0, 0, 0, 0.1)',
          toggleFocusShadow: "".concat(base.focusShadow, ", inset 0 2px 0 rgba(0, 0, 0, 0.1)"),
          backgroundColor: base.gray98,
          borderColor: base.borderColor,
          indicatorBackgroundColor: base.gray98,
          indicatorBorderColor: base.borderColor,
          indicatorHoverBackgroundColor: base.gray96,
          toggleIndicatorBorderStyle: 'solid',
          selectedBackgroundColor: base.accentColorL10,
          selectedBorderColor: base.accentColorL10,
          disabledBorderColor: base.borderLightColor,
          disabledBackgroundColor: base.gray96,
          disabledIndBorderColor: external_tinycolor2_default()(base.borderLightColor).setAlpha(0.8).toRgbString(),
          selectedDisabledBackgroundColor: base.accentColorL40,
          errorToggleOutlineBorderColor: base.errorColor
        }
      },
      TabBar: {
        Tab: {
          clickableColor: base.textColor,
          focusShadowInset: base.focusShadowInset,
          underlineSelectedBackgroundColor: base.accentColor
        }
      },
      Table: {
        focusShadowInset: base.focusShadowInset,
        Cell: {
          linkColor: base.linkColor,
          clickableBackgroundColor: base.accentColorL50,
          // padding: '6px 11px 6px 12px',
          padding: '6px 12px',
          expandPadding: 0,
          verticalAlign: 'top'
        },
        Head: {
          toggleAllWidth: '42px',
          infoWidth: '32px'
        },
        HeadCell: {
          backgroundColor: base.gray92,
          borderLeftColor: base.backgroundColor,
          draggingBackgroundColor: base.gray80,
          guideLineBackgroundColor: base.linkColor,
          focusShadow: base.focusShadowInset,
          moreInfoHeadCellPadding: '5px 0 0 0'
        },
        HeadInner: {
          hoverColor: base.linkColorHover,
          helperBackgroundColor: base.accentColorL50,
          sortIconColor: base.textGray,
          sortIconPosition: 'absolute',
          sortedIconColor: base.accentColor,
          menuIconColor: base.textGray,
          menuIconPadding: '1px 0 0 4px',
          padding: '6px 12px',
          dragContainerTop: '0px',
          dragContainerLeft: '0px',
          menuIconRight: '0',
          dragContainerPadding: '9px 12px'
        },
        Row: {
          stripeNoneClickableHoverBackgroundColor: base.accentColorL50,
          stripeEvenBackgroundColor: base.gray96,
          expandContainerWidth: '8px'
        },
        RowDragCell: {
          draggablePadding: '9px 0',
          draggingBackgroundColor: base.gray80,
          guideLineBackgroundColor: base.linkColor,
          helperBackgroundColor: base.accentColorL50,
          width: '32px'
        },
        Toggle: {
          inHeadMargin: '-6px 0',
          margin: '-6px 0'
        }
      },
      Text: {
        clearIconRight: '1px',
        clearIconTop: '2px',
        clearIconPadding: '8px',
        inputFocusShadow: base.focusShadow,
        inputColor: base.textColor,
        inputBackgroundColor: base.white,
        inputFocusColor: base.textColor,
        inputErrorBorderColor: base.errorColor,
        inputErrorColor: base.errorColor,
        inputDisabledBackgroundColor: base.gray96,
        inputDisabledBorderColor: base.gray92,
        inputDisabledColor: base.textDisabledColor,
        inputClearOrSearchPaddingRight: '28px',
        placeholderMediumSize: '11px',
        placeholderWithSearchLeft: '11px',
        spacingHalf: base.spacingHalf,
        spacingQuarter: base.spacingQuarter,
        searchIconWrapperColor: base.gray60,
        searchIconWrapperRight: '8px',
        searchIconWrapperTop: '8px',
        clearColor: base.gray60,
        placeholderColor: base.textGray,
        searchIconPosition: 'right'
      },
      Tooltip: {
        linkColor: base.linkColor
      },
      WaitSpinner: {
        circleStroke: base.gray60
      }
    }
  };
});
// CONCATENATED MODULE: ./src/themes/enterprise.js


/* harmony default export */ var enterprise = (themes_base(enterprise_default.a));
// EXTERNAL MODULE: external "lodash/merge"
var merge_ = __webpack_require__(48);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge_);

// EXTERNAL MODULE: external "@splunk/themes/enterpriseDark"
var enterpriseDark_ = __webpack_require__(6);
var enterpriseDark_default = /*#__PURE__*/__webpack_require__.n(enterpriseDark_);

// CONCATENATED MODULE: ./src/themes/enterpriseDark.js




/* harmony default export */ var enterpriseDark = (merge_default()({}, themes_base(enterpriseDark_default.a), {
  'react-ui': {
    ButtonSimple: {
      Default: {
        shadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray30),
        hoverShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray25),
        activeShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray22),
        selectedShadow: "inset 0 1px 0 ".concat(enterpriseDark_default.a.black),
        focusShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray30, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusHoverShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray25, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusActiveShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray22, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusSelectedShadow: "inset 0 1px 0 ".concat(enterpriseDark_default.a.black, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusAppendShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray30, ", ").concat(enterpriseDark_default.a.focusShadow, ", inset -1px 0 0 ").concat(enterpriseDark_default.a.borderColor),
        focusAppendSelectedShadow: "inset 0 1px 0 ".concat(enterpriseDark_default.a.black, ", ").concat(enterpriseDark_default.a.focusShadow, ", inset -1px 0 0 ").concat(enterpriseDark_default.a.borderColor),
        backgroundColor: enterpriseDark_default.a.gray45,
        color: enterpriseDark_default.a.white,
        selectedBackgroundColor: enterpriseDark_default.a.gray22,
        hoverBackgroundColor: enterpriseDark_default.a.gray30,
        selectedBorderColor: enterpriseDark_default.a.gray20,
        activeBorderColor: enterpriseDark_default.a.gray20,
        activeBackgroundColor: enterpriseDark_default.a.gray22,
        disabledBackgroundColor: enterpriseDark_default.a.gray30,
        disabledBorderColor: enterpriseDark_default.a.gray30,
        disabledSelectedBackgroundColor: enterpriseDark_default.a.gray22,
        disabledSelectedBorderColor: enterpriseDark_default.a.gray20
      },
      Secondary: {
        shadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray30),
        hoverShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray25),
        activeShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray22),
        selectedShadow: "inset 0 1px 0 ".concat(enterpriseDark_default.a.black),
        focusShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray30, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusHoverShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray25, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusActiveShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray22, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusSelectedShadow: "inset 0 1px 0 ".concat(enterpriseDark_default.a.black, ", ").concat(enterpriseDark_default.a.focusShadow),
        focusAppendShadow: "inset 0 -1px 0 ".concat(enterpriseDark_default.a.gray30, ", ").concat(enterpriseDark_default.a.focusShadow, ", inset -1px 0 0 ").concat(enterpriseDark_default.a.borderColor),
        focusAppendSelectedShadow: "inset 0 1px 0 ".concat(enterpriseDark_default.a.black, ", ").concat(enterpriseDark_default.a.focusShadow, ", inset -1px 0 0 ").concat(enterpriseDark_default.a.borderColor),
        backgroundColor: enterpriseDark_default.a.gray45,
        color: enterpriseDark_default.a.white,
        selectedBackgroundColor: enterpriseDark_default.a.gray22,
        hoverBackgroundColor: enterpriseDark_default.a.gray30,
        selectedBorderColor: enterpriseDark_default.a.gray20,
        activeBorderColor: enterpriseDark_default.a.gray20,
        activeBackgroundColor: enterpriseDark_default.a.gray22,
        disabledBackgroundColor: enterpriseDark_default.a.gray30,
        disabledBorderColor: enterpriseDark_default.a.gray30,
        disabledSelectedBackgroundColor: enterpriseDark_default.a.gray22,
        disabledSelectedBorderColor: enterpriseDark_default.a.gray20
      },
      Pill: {
        color: enterpriseDark_default.a.white,
        hoverColor: enterpriseDark_default.a.white,
        focusColor: enterpriseDark_default.a.white,
        expandedBackgroundColor: enterpriseDark_default.a.gray22
      }
    },
    Calendar: {
      Day: {
        buttonColor: enterpriseDark_default.a.gray98
      }
    },
    Chip: {
      clickableBackgroundColor: enterpriseDark_default.a.gray45,
      clickableHoverBackgroundColor: enterpriseDark_default.a.gray30,
      clickableDisabledBackgroundColor: 'rgba(0, 0, 0, 0.15)'
    },
    Code: {
      color: enterpriseDark_default.a.gray92,
      commentToken: enterpriseDark_default.a.gray60,
      prologToken: enterpriseDark_default.a.gray60,
      doctypeToken: enterpriseDark_default.a.gray60,
      cdataToken: enterpriseDark_default.a.gray60,
      punctuationToken: enterpriseDark_default.a.gray60,
      propertyToken: enterpriseDark_default.a.syntaxPurpleLight,
      tagToken: enterpriseDark_default.a.syntaxPurpleLight,
      booleanToken: enterpriseDark_default.a.syntaxPurpleLight,
      numberToken: enterpriseDark_default.a.syntaxPurpleLight,
      constantToken: enterpriseDark_default.a.syntaxPurpleLight,
      symbolToken: enterpriseDark_default.a.syntaxPurpleLight,
      deletedToken: enterpriseDark_default.a.syntaxPurpleLight,
      selectorToken: enterpriseDark_default.a.syntaxGreenLight,
      'attr-nameToken': enterpriseDark_default.a.syntaxGreenLight,
      stringToken: enterpriseDark_default.a.syntaxGreenLight,
      charToken: enterpriseDark_default.a.syntaxGreenLight,
      builtinToken: enterpriseDark_default.a.syntaxGreenLight,
      insertedToken: enterpriseDark_default.a.syntaxGreenLight,
      operatorToken: enterpriseDark_default.a.syntaxBrown,
      entityToken: enterpriseDark_default.a.syntaxBrown,
      urlToken: enterpriseDark_default.a.syntaxBrown,
      atruleToken: enterpriseDark_default.a.syntaxBlueLight,
      'attr-valueToken': enterpriseDark_default.a.syntaxBlueLight,
      keywordToken: enterpriseDark_default.a.syntaxBlueLight,
      functionToken: enterpriseDark_default.a.syntaxRedLight,
      regexToken: enterpriseDark_default.a.syntaxOrange,
      importantToken: enterpriseDark_default.a.syntaxOrange,
      variableToken: enterpriseDark_default.a.syntaxOrange
    },
    CollapsiblePanel: {
      titleClickableCollapsedBackgroundColor: enterpriseDark_default.a.gray45,
      titleClickableHoverBackgroundColor: enterpriseDark_default.a.gray30
    },
    Concertina: {
      panelBodyErrorBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.errorColor).setAlpha(0.5).toRgbString(),
      panelBodyWarningBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.warningColor).setAlpha(0.5).toRgbString(),
      Heading: {
        clickableBackgroundColor: enterpriseDark_default.a.gray45,
        clickableHoverBackgroundColor: enterpriseDark_default.a.gray30,
        clickableDisabledBackgroundColor: enterpriseDark_default.a.gray80
      }
    },
    File: {
      mediumDropTargetBoxBorderColor: enterpriseDark_default.a.textGray,
      mediumDropTargetBoxDisabledFileCount0BackgroundColor: enterpriseDark_default.a.gray60,
      iconFill: enterpriseDark_default.a.gray80,
      Item: {
        boxBackgroundColor: enterpriseDark_default.a.gray45,
        removeClickableHoverBackgroundColor: enterpriseDark_default.a.gray30,
        labelDisabledBackgroundColor: enterpriseDark_default.a.gray60
      }
    },
    Heading: {
      sectionColor: enterpriseDark_default.a.gray80
    },
    JSONTree: {
      TreeNode: {
        propertyColor: enterpriseDark_default.a.syntaxRedLight,
        expandLinkClickableColor: enterpriseDark_default.a.accentColorL40,
        typeColorNumber: enterpriseDark_default.a.syntaxBlueLight,
        typeColorBoolean: enterpriseDark_default.a.syntaxPurpleLight
      }
    },
    Logo: {
      svgTextFill: enterpriseDark_default.a.white,
      svgInvertedTextFill: enterpriseDark_default.a.gray20
    },
    Markdown: {
      codeBlockBackgroundColor: enterpriseDark_default.a.gray22,
      codeInlineBackgroundColor: enterpriseDark_default.a.gray22
    },
    Menu: {
      Item: {
        clickableColor: enterpriseDark_default.a.gray96
      }
    },
    Message: {
      boxInfoBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.infoColor).setAlpha(0.5).toRgbString(),
      boxSuccessBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.successColor).setAlpha(0.5).toRgbString(),
      boxWarningBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.warningColor).setAlpha(0.5).toRgbString(),
      boxErrorBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.errorColor).setAlpha(0.5).toRgbString()
    },
    Modal: {
      Footer: {
        boxBorderTopColor: enterpriseDark_default.a.gray20
      },
      Header: {
        boxBorderBottomColor: enterpriseDark_default.a.gray20
      }
    },
    Multiselect: {
      Normal: {
        boxBackgroundColor: enterpriseDark_default.a.gray22,
        boxBorderColor: enterpriseDark_default.a.gray20,
        boxDisabledBackgroundColor: enterpriseDark_default.a.gray22,
        boxDisabledBorderColor: enterpriseDark_default.a.gray30
      }
    },
    Number: {
      incrementorBorderColor: enterpriseDark_default.a.gray20,
      incrementorDisabledBorderColor: enterpriseDark_default.a.gray22
    },
    Popover: {
      lightBorder: enterpriseDark_default.a.borderDark,
      lightBoxShadow: '0 1px 2px #000',
      arrowBorderBottomColor: enterpriseDark_default.a.borderDarkColor,
      darkBackgroundColor: enterpriseDark_default.a.white,
      darkColor: enterpriseDark_default.a.gray20,
      darkArrowBorderBottomColor: enterpriseDark_default.a.white
    },
    Resize: {
      resizeColor: enterpriseDark_default.a.gray92
    },
    Slider: {
      sliderBarStepMarksColor: enterpriseDark_default.a.gray20
    },
    Switch: {
      Checkbox: {
        color: enterpriseDark_default.a.gray80,
        borderColor: enterpriseDark_default.a.gray80,
        selectedBorderColor: enterpriseDark_default.a.gray80,
        disabledBorderColor: enterpriseDark_default.a.gray45,
        disabledColor: enterpriseDark_default.a.gray45,
        errorBorderColor: enterpriseDark_default.a.errorColor
      },
      Radio: {
        color: enterpriseDark_default.a.gray80,
        borderColor: enterpriseDark_default.a.gray80,
        selectedBorderColor: enterpriseDark_default.a.gray80,
        disabledBorderColor: enterpriseDark_default.a.gray45,
        disabledColor: enterpriseDark_default.a.gray45,
        errorBorderColor: enterpriseDark_default.a.errorColor
      },
      Toggle: {
        backgroundColor: enterpriseDark_default.a.gray45,
        indicatorBackgroundColor: enterpriseDark_default.a.gray80,
        indicatorHoverBackgroundColor: external_tinycolor2_default()(enterpriseDark_default.a.gray80).darken(6).toRgbString(),
        disabledBorderColor: enterpriseDark_default.a.borderColor,
        disabledBackgroundColor: enterpriseDark_default.a.gray30,
        disabledIndBackgroundColor: enterpriseDark_default.a.gray45,
        disabledIndBorderColor: enterpriseDark_default.a.gray22,
        selectedDisabledBackgroundColor: enterpriseDark_default.a.accentColorD20
      }
    },
    Table: {
      Cell: {
        clickableBackgroundColor: enterpriseDark_default.a.accentColorD50
      },
      HeadCell: {
        backgroundColor: '#212527',
        draggingBackgroundColor: enterpriseDark_default.a.gray20
      },
      HeadInner: {
        helperBackgroundColor: enterpriseDark_default.a.accentColorD50
      },
      Row: {
        stripeNoneClickableHoverBackgroundColor: enterpriseDark_default.a.accentColorD50,
        stripeEvenBackgroundColor: enterpriseDark_default.a.gray25,
        stripeOddBackgroundColor: enterpriseDark_default.a.gray22
      },
      RowDragCell: {
        draggingBackgroundColor: enterpriseDark_default.a.gray20,
        helperBackgroundColor: enterpriseDark_default.a.accentColorD50
      }
    },
    Text: {
      inputBackgroundColor: enterpriseDark_default.a.gray22,
      inputBorderColor: enterpriseDark_default.a.gray20,
      inputDisabledBackgroundColor: enterpriseDark_default.a.gray22,
      inputDisabledBorderColor: enterpriseDark_default.a.gray30,
      searchIconWrapperColor: enterpriseDark_default.a.white,
      clearColor: enterpriseDark_default.a.white
    },
    WaitSpinner: {
      circleStroke: enterpriseDark_default.a.white
    }
  }
}));
// EXTERNAL MODULE: external "@splunk/themes/lite"
var lite_ = __webpack_require__(85);
var lite_default = /*#__PURE__*/__webpack_require__.n(lite_);

// CONCATENATED MODULE: ./src/themes/lite.js


/* harmony default export */ var lite = (themes_base(lite_default.a));
// EXTERNAL MODULE: external "@splunk/themes/scp"
var scp_ = __webpack_require__(5);
var scp_default = /*#__PURE__*/__webpack_require__.n(scp_);

// CONCATENATED MODULE: ./src/themes/scp.js




var baseTheme = themes_base(scp_default.a);
delete baseTheme['react-ui'].ButtonSimple.Pill;
delete baseTheme['react-ui'].Table.Cell.clickableBackgroundColor;
/* harmony default export */ var scp = (merge_default()({}, baseTheme, {
  'react-ui': {
    Button: {
      disabledIconColor: scp_default.a.textDisabledColor,
      iconColor: scp_default.a.gray68,
      iconOnlyColor: scp_default.a.gray96,
      iconOnlyDisabledColor: scp_default.a.textDisabledColor,
      iconPaddingRight: '8px',
      iconOnlyPadding: '0px',
      paddingSmall: '6px',
      paddingLarge: '16px',
      primaryIconColor: scp_default.a.gray96
    },
    ButtonSimple: {
      Primary: {
        shadow: 'none',
        selectedShadow: 'none',
        focusShadow: 'none',
        selectedFocusShadow: 'none',
        borderRadius: '24px',
        border: "1px solid ".concat(scp_default.a.blue1),
        hoverBorder: "1px solid ".concat(scp_default.a.blue2),
        activeBorder: "1px solid ".concat(scp_default.a.blue3),
        focusBorder: "1px solid ".concat(scp_default.a.blue2),
        disabledBorder: "1px solid ".concat(scp_default.a.gray35),
        disabledSelectedBorder: "1px solid ".concat(scp_default.a.gray29),
        color: scp_default.a.gray96,
        backgroundColor: scp_default.a.blue1,
        activeBackgroundColor: scp_default.a.blue3,
        focusBackgroundColor: scp_default.a.blue2,
        hoverBackgroundColor: scp_default.a.blue2,
        selectedBackgroundColor: scp_default.a.blue2,
        disabledBackgroundColor: scp_default.a.gray35,
        disabledSelectedBackgroundColor: scp_default.a.gray29,
        disabledTextColor: scp_default.a.gray68,
        prependBorderLeftColor: scp_default.a.blue2
      },
      Error: {
        shadow: 'none',
        selectedShadow: 'none',
        focusShadow: 'none',
        selectedFocusShadow: 'none',
        disabledTextColor: scp_default.a.gray68,
        focusBackgroundColor: external_tinycolor2_default()(scp_default.a.errorColor).setAlpha(0.7).toRgbString()
      },
      Default: {
        shadow: 'none',
        hoverShadow: 'none',
        activeShadow: 'none',
        selectedShadow: 'none',
        focusShadow: 'none',
        focusHoverShadow: 'none',
        focusActiveShadow: 'none',
        focusSelectedShadow: 'none',
        focusAppendShadow: 'none',
        focusAppendSelectedShadow: 'none',
        color: scp_default.a.gray96,
        border: scp_default.a.borderLight,
        borderRadius: '24px',
        backgroundColor: scp_default.a.transparent,
        activeBackgroundColor: scp_default.a.gray29,
        focusBackgroundColor: scp_default.a.gray35,
        hoverBackgroundColor: scp_default.a.gray35,
        selectedBackgroundColor: scp_default.a.gray29,
        disabledBackgroundColor: scp_default.a.transparent,
        disabledBorderColor: scp_default.a.borderColor,
        disabledSelectedBackgroundColor: scp_default.a.gray20,
        disabledTextColor: scp_default.a.textDisabledColor,
        activePrependLeftBorderColor: scp_default.a.borderLightColor
      },
      Secondary: {
        shadow: 'none',
        hoverShadow: 'none',
        activeShadow: 'none',
        selectedShadow: 'none',
        focusShadow: 'none',
        focusHoverShadow: 'none',
        focusActiveShadow: 'none',
        focusSelectedShadow: 'none',
        focusAppendShadow: 'none',
        focusAppendSelectedShadow: 'none',
        color: scp_default.a.gray96,
        border: "1px solid ".concat(scp_default.a.transparent),
        borderRadius: '24px',
        backgroundColor: scp_default.a.transparent,
        activeBackgroundColor: scp_default.a.gray17,
        focusBackgroundColor: scp_default.a.gray35,
        hoverBackgroundColor: scp_default.a.gray35,
        selectedBackgroundColor: scp_default.a.gray29,
        disabledBackgroundColor: scp_default.a.transparent,
        disabledBorderColor: scp_default.a.transparent,
        disabledTextColor: scp_default.a.textDisabledColor,
        disabledSelectedBackgroundColor: scp_default.a.gray20,
        activePrependLeftBorderColor: scp_default.a.transparent,
        disabledSelectedBorderColor: scp_default.a.transparent,
        selectedPrependLeftBorderColor: scp_default.a.transparent
      },
      Toggle: {
        border: scp_default.a.border,
        color: scp_default.a.gray96,
        activeBorderColor: scp_default.a.gray35,
        activeBackgroundColor: scp_default.a.gray20,
        focusBackgroundColor: scp_default.a.gray35,
        hoverBackgroundColor: scp_default.a.gray35,
        selectedBackgroundColor: scp_default.a.gray35,
        disabledBorderColor: scp_default.a.borderColor,
        disabledTextColor: scp_default.a.textDisabledColor,
        disabledSelectedBackgroundColor: scp_default.a.gray17
      },
      Flat: {
        border: "1px solid ".concat(scp_default.a.transparent),
        color: scp_default.a.gray96,
        backgroundColor: scp_default.a.gray29,
        activeBackgroundColor: scp_default.a.gray29,
        focusBackgroundColor: scp_default.a.gray35,
        hoverBackgroundColor: scp_default.a.gray35,
        selectedBackgroundColor: scp_default.a.gray35,
        disabledBackgroundColor: scp_default.a.gray20,
        disabledTextColor: scp_default.a.textDisabledColor,
        disabledSelectedBackgroundColor: scp_default.a.gray17
      }
    },
    Calendar: {
      width: '332px',
      padding: '16px',
      DateTable: {
        paddingBottom: '6px',
        fontSize: '14px'
      },
      Day: {
        buttonColor: scp_default.a.gray96,
        buttonHoverColor: scp_default.a.gray96,
        buttonHoverBackgroundColor: scp_default.a.gray35,
        buttonFocusBackgroundColor: scp_default.a.gray35,
        buttonSelectedBorderColor: 'none',
        buttonSelectedColor: scp_default.a.gray11,
        buttonSelectedBackgroundColor: scp_default.a.gray96,
        buttonSelectedFontWeight: scp_default.a.fontWeightBold,
        width: '36px',
        lineHeight: '36px',
        border: 'none',
        borderRadius: '50%',
        focusShadow: 'none'
      },
      MonthHeader: {
        fontSize: '20px',
        fontWeight: scp_default.a.fontWeightBold,
        textTransform: 'uppercase',
        wordSpacing: '32px',
        textColor: scp_default.a.gray96,
        shortForm: true
      }
    },
    Card: {
      backgroundColor: scp_default.a.gray17,
      clickableSelectedBorderColor: scp_default.a.transparent,
      borderColor: scp_default.a.transparent,
      borderRadius: scp_default.a.borderRadius,
      hoverShadow: 'none',
      focusShadow: 'none',
      hoverBackgroundColor: scp_default.a.gray29,
      focusBackgroundColor: scp_default.a.gray29,
      selectedBackgroundColor: scp_default.a.gray29,
      Header: {
        padding: '12px 8px 12px 16px'
      },
      Body: {
        padding: '16px',
        firstChildPaddingTop: '16px'
      },
      Footer: {
        padding: '8px 16px 16px',
        borderTop: 'none'
      }
    },
    Chip: {
      clickableColor: scp_default.a.gray96,
      clickableBackgroundColor: scp_default.a.gray29,
      clickableHoverBackgroundColor: scp_default.a.gray35,
      clickableDisabledBackgroundColor: scp_default.a.gray20,
      labelColor: scp_default.a.gray96,
      iconColor: scp_default.a.gray96,
      errorColorBackgroundColor: scp_default.a.errorColor
    },
    Code: {
      commentToken: scp_default.a.gray52,
      prologToken: scp_default.a.gray52,
      doctypeToken: scp_default.a.gray52,
      cdataToken: scp_default.a.gray52,
      punctuationToken: scp_default.a.gray52,
      propertyToken: scp_default.a.syntaxPurpleLight,
      tagToken: scp_default.a.syntaxPurpleLight,
      booleanToken: scp_default.a.syntaxPurpleLight,
      numberToken: scp_default.a.syntaxPurpleLight,
      constantToken: scp_default.a.syntaxPurpleLight,
      symbolToken: scp_default.a.syntaxPurpleLight,
      deletedToken: scp_default.a.syntaxPurpleLight,
      selectorToken: scp_default.a.syntaxGreenLight,
      'attr-nameToken': scp_default.a.syntaxGreenLight,
      stringToken: scp_default.a.syntaxGreenLight,
      charToken: scp_default.a.syntaxGreenLight,
      builtinToken: scp_default.a.syntaxGreenLight,
      insertedToken: scp_default.a.syntaxGreenLight,
      operatorToken: scp_default.a.syntaxBrown,
      entityToken: scp_default.a.syntaxBrown,
      urlToken: scp_default.a.syntaxBrown,
      atruleToken: scp_default.a.syntaxBlueLight,
      'attr-valueToken': scp_default.a.syntaxBlueLight,
      keywordToken: scp_default.a.syntaxBlueLight,
      functionToken: scp_default.a.syntaxRedLight,
      regexToken: scp_default.a.syntaxOrange,
      importantToken: scp_default.a.syntaxOrange,
      variableToken: scp_default.a.syntaxOrange
    },
    CollapsiblePanel: {
      minHeight: '40px',
      backgroundColor: scp_default.a.gray17,
      marginTop: '1px',
      iconTransition: 'transform 200ms',
      iconPosition: 'calc(100% - 24px);',
      iconTransfromOpen: 'rotate(90deg)',
      iconTransfromClose: 'translateY(-2px) rotate(-90deg)',
      iconTransfromOrigin: 'center',
      paddingBottom: '2px',
      titleLineHeight: '24px',
      titlePadding: "8px 16px",
      titleBackgroundColor: scp_default.a.backgroundColor,
      titleClickableCollapsedBackgroundColor: scp_default.a.backgroundColor,
      titleClickableHoverBackgroundColor: scp_default.a.backgroundColor,
      titleClickableColor: scp_default.a.white,
      titleClickableCollapsedColor: scp_default.a.textGray,
      titleBorder: '1px solid transparent',
      titleFocusBorder: "1px solid ".concat(scp_default.a.gray68),
      titleShadow: '0px -1px 0px rgba(255, 255, 255, 0.1), 0px 1px 0px rgba(255, 255, 255, 0.1)',
      titleFocusShadow: 'none',
      descriptionPosition: 'relative',
      descriptionPositionRight: '20px'
    },
    Color: {
      inputTopLayout: true,
      width: '214px',
      display: 'flex',
      flexDirection: 'column-reverse',
      borderRadius: '4px',
      swatchesListMarginRight: '-8px',
      swatchesListMarginBottom: '-8px',
      Swatch: {
        marginRight: '8px',
        marginBottom: '8px',
        borderRadius: '2px',
        border: "1px solid ".concat(scp_default.a.gray35),
        transparentPatternEvenColor: scp_default.a.transparent,
        transparentPatternOddColor: 'rgba(0, 0, 0, 0.2)',
        transparentBackgroundColor: scp_default.a.white,
        textBoxSwatch: true,
        focusBorderColor: scp_default.a.gray35,
        smallSize: '22px'
      },
      Input: {
        width: 'calc(100% - 2px)',
        marginBottom: '8px',
        position: 'relative'
      }
    },
    Date: {
      position: 'relative',
      letterSpacing: '2px',
      spacedFormat: true,
      width: '145px',
      widthLarge: '155px',
      widthSmall: '125px',
      shouldRenderIcon: true
    },
    File: {
      cloudIcon: true,
      mediumDropTargetBoxBorderColor: scp_default.a.gray52,
      mediumDropTargetBoxDisabledFileCount0BackgroundColor: scp_default.a.transparent,
      borderDragOver: "1px dashed ".concat(scp_default.a.gray52),
      iconFill: scp_default.a.white,
      iconErrorFill: scp_default.a.errorColor,
      iconDisabledFill: scp_default.a.gray52,
      padding: '8px',
      backgroundColorDragOver: scp_default.a.gray35,
      errorTextColor: scp_default.a.errorColor,
      disabledBorder: "1px solid ".concat(scp_default.a.gray35),
      linkErrorColor: scp_default.a.errorColor,
      linkFocusShadow: 'none',
      windowDropBorder: "5px solid ".concat(scp_default.a.blue2),
      Item: {
        itemRemoveable: true,
        boxColor: scp_default.a.white,
        labelColor: scp_default.a.white,
        boxBackgroundColor: scp_default.a.gray29,
        labelDisabledBackgroundColor: scp_default.a.gray29,
        labelDisabledTextColor: scp_default.a.textDisabledColor,
        borderRadius: scp_default.a.borderRadius,
        fontSize: '12px',
        padding: "4px 0 3px 8px",
        cursor: 'pointer',
        flex: 'none',
        labelHoverBackgroundColor: scp_default.a.gray35,
        labelErrorBackgroundColor: 'rgba(254, 58, 58, 0.1)',
        labelErrorHoverBackgroundColor: 'rgba(254, 58, 58, 0.2)',
        removeClickableBackgroundColor: scp_default.a.gray35,
        removeClickableBorderRadius: '50%',
        removeClickableErrorBorder: 'none',
        removeClickableErrorBackgroundColor: external_tinycolor2_default()(scp_default.a.errorColor).setAlpha(0.7).toRgbString(),
        removeClickableErrorHoverBackgroundColor: scp_default.a.errorColor,
        removeClickableErrorFocusBackgroundColor: scp_default.a.errorColor,
        removeClickableFocusShadow: 'none',
        removeClickableFocusBackgroundColor: scp_default.a.gray52,
        removeClickableFocusColor: scp_default.a.white,
        removeClickableHoverBackgroundColor: scp_default.a.gray52,
        removeClickableHoverColor: scp_default.a.white,
        removeClickableSmallFlexBasis: 'auto',
        removeClickableSmallTop: '6px'
      }
    },
    Heading: {
      fontSize: scp_default.a.fontSize,
      fontWeight: scp_default.a.fontWeightBold,
      h1FontSize: '36px',
      h2FontSize: '24px',
      h3FontSize: '20px',
      h4FontSize: '16px',
      h5FontSize: '13px',
      h1LineHeight: '48px',
      h2LineHeight: '24px',
      h3LineHeight: '24px',
      h4LineHeight: '24px',
      h5LineHeight: '16px',
      headingColor: scp_default.a.gray96,
      sectionColor: scp_default.a.gray68
    },
    Image: {
      cloudIcon: true,
      overflow: 'hidden',
      borderRadius: scp_default.a.borderRadius,
      boxBackgroundColor: scp_default.a.gray29,
      boxBackgroundHoverColor: scp_default.a.gray35,
      cursor: 'pointer',
      labelColor: scp_default.a.white,
      padding: '8px 10px',
      fontSize: '12px',
      lineHeight: '16px',
      removeClickableColor: scp_default.a.white,
      removeClickableFlex: 'none',
      removeClickableBorderRadius: '50%',
      removeClickableBackgroundColor: scp_default.a.gray52,
      removeClickableHoverBackgroundColor: scp_default.a.gray68,
      removeClickableHoverLabelBackgroundColor: scp_default.a.gray68,
      removeClickableHoverColor: scp_default.a.white,
      removeClickableFocusColor: scp_default.a.white,
      removeClickableFocusShadow: 'none',
      removeClickableFocusBackgroundColor: scp_default.a.gray68
    },
    JSONTree: {
      TreeNode: {
        propertyColor: scp_default.a.syntaxRedLight,
        expandLinkClickableColor: scp_default.a.accentColorL40,
        typeColorNumber: scp_default.a.syntaxBlueLight,
        typeColorBoolean: scp_default.a.syntaxPurpleLight
      }
    },
    Link: {
      focusShadow: 'none',
      disabledColor: scp_default.a.textDisabledColor,
      focusTextDecoration: 'underline',
      focusActiveTextDecoration: 'none',
      externalMargin: '0 0 0 4px'
    },
    Logo: {
      svgTextFill: scp_default.a.white,
      svgInvertedTextFill: scp_default.a.gray20
    },
    Markdown: {
      codeBlockBackgroundColor: scp_default.a.gray29,
      codeInlineBackgroundColor: scp_default.a.gray29
    },
    Menu: {
      backgroundColor: scp_default.a.gray29,
      Divider: {
        borderColor: scp_default.a.gray35
      },
      Item: {
        clickableColor: scp_default.a.gray96,
        matchColorBackground: scp_default.a.gray96,
        matchColor: scp_default.a.gray11,
        descriptionLineHeight: '16px',
        descriptionColor: scp_default.a.gray68,
        backgroundColorHover: scp_default.a.gray35,
        backgroundColorFocus: scp_default.a.gray35,
        backgroundColorActive: scp_default.a.gray35,
        focusShadowInset: "inset 0 0 0 0 ".concat(scp_default.a.transparent),
        itemIconMarginRight: '16px',
        itemIconVertical: 'initial',
        itemSelectedIconColor: scp_default.a.gray96,
        itemSelectedIconLeft: 'initial',
        itemSelectedIconTop: '11px',
        itemSelectedIconRight: '16px',
        disabledSelectedIconColor: scp_default.a.gray52,
        lineHeight: '24px',
        spacingHalf: '16px',
        padding: '12px 16px',
        selectablePaddingLeft: '16px',
        selectablePaddingRight: '44px',
        selectablePosition: 'right',
        checkboxPaddingLeft: '56px'
      },
      Heading: {
        padding: '13px 16px 10px 16px'
      }
    },
    Message: {
      boxInfoBackgroundColor: external_tinycolor2_default()(scp_default.a.infoColor).setAlpha(0.5).toRgbString(),
      boxSuccessBackgroundColor: external_tinycolor2_default()(scp_default.a.successColor).setAlpha(0.5).toRgbString(),
      boxWarningBackgroundColor: external_tinycolor2_default()(scp_default.a.warningColor).setAlpha(0.5).toRgbString(),
      boxErrorBackgroundColor: external_tinycolor2_default()(scp_default.a.errorColor).setAlpha(0.5).toRgbString()
    },
    Modal: {
      boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.5)",
      verticalAlign: 'center',
      transform: 'translate(-50%, -50%)',
      Body: {
        boxBackgroundColor: scp_default.a.gray20
      },
      Footer: {
        boxBackgroundColor: scp_default.a.gray20,
        boxBorderTopColor: scp_default.a.gray29
      },
      Header: {
        boxBackgroundColor: scp_default.a.gray20,
        boxBorderBottomColor: scp_default.a.gray29,
        titleColor: scp_default.a.gray96,
        boxPadding: '24px',
        closeAndPeekPaddingRight: '88px',
        closeOrPeekPaddingRight: '52px',
        titleFontWeightSemiBold: '500',
        titleLineHeight: '24px',
        subTitleLineHeight: '24px',
        iconBackgroundColor: scp_default.a.gray29
      }
    },
    ModalLayer: {
      backgroundColor: scp_default.a.backgroundColor
    },
    Multiselect: {
      Normal: {
        boxBackgroundColor: scp_default.a.gray17,
        boxBorderColor: scp_default.a.gray29,
        boxDisabledBackgroundColor: scp_default.a.gray29,
        boxDisabledBorderColor: scp_default.a.gray23
      }
    },
    Number: {
      controlsBorder: '1px solid transparent',
      incrementorBackgroundColor: scp_default.a.gray20,
      incrementorBorderColor: scp_default.a.transparent,
      incrementorColor: scp_default.a.gray68,
      incrementorDisabledBorderColor: scp_default.a.transparent,
      incrementorDisabledColor: scp_default.a.gray35,
      incrementorHoverColor: scp_default.a.gray96,
      incrementorWidth: '22px',
      mediumWidth: '116px',
      minusButtonBorderRightColor: scp_default.a.transparent,
      plusButtonBorderRightColor: scp_default.a.transparent
    },
    Paragraph: {
      marginBottom: '14px'
    },
    Popover: {
      align: 'edge',
      lightBorder: scp_default.a.transparent,
      lightBoxShadow: "0px 4px 8px 0px rgba(0,0,0,0.5)",
      lightBackgroundColor: scp_default.a.gray17,
      lightColor: scp_default.a.gray96,
      darkBackgroundColor: scp_default.a.gray96,
      darkColor: scp_default.a.gray17,
      darkBorderRadius: scp_default.a.borderRadius,
      arrowHeightPixel: 0,
      paddingPixel: 8 // must be same as arrowHeight if arrowHeight is > 0

    },
    Resize: {
      resizeColor: scp_default.a.gray96
    },
    Slider: {
      sliderBarStepMarksColor: scp_default.a.gray20,
      sliderBarDisabledBackgroundColor: scp_default.a.gray23,
      sliderBarLeftSideColor: scp_default.a.gray35,
      sliderBarRightSideColor: scp_default.a.gray68,
      sliderThumbBackgroundColor: scp_default.a.gray35,
      sliderThumbDisabledBackgroundColor: scp_default.a.gray23
    },
    StepBar: {
      Step: {
        currentStepColor: scp_default.a.gray96,
        currentStepFontWeight: scp_default.a.fontWeightSemiBold,
        grayFill: scp_default.a.gray68,
        nextStroke: scp_default.a.gray68,
        prevOrActiveFillColor: scp_default.a.blue2
      }
    },
    Switch: {
      labelPaddingLeft: '12px',
      labelLineHeight: '24px',
      Checkbox: {
        color: scp_default.a.white,
        borderColor: scp_default.a.gray52,
        top: '3px',
        margin: '3px',
        focusShadow: 'none',
        hasBackground: true,
        selectedBorderColor: scp_default.a.blue2,
        selectedBackgroundColor: scp_default.a.blue2,
        disabledBorderColor: scp_default.a.gray52,
        disabledColor: scp_default.a.textDisabledColor,
        errorBorderColor: scp_default.a.errorColor,
        someSize: '6px',
        someMargin: '0px'
      },
      Radio: {
        color: scp_default.a.white,
        borderColor: scp_default.a.gray52,
        margin: '3px',
        focusShadow: 'none',
        hasBackground: true,
        selectedBorderColor: scp_default.a.white,
        disabledColor: scp_default.a.gray35,
        disabledBorderColor: scp_default.a.gray35,
        errorBorderColor: scp_default.a.errorColor
      },
      Toggle: {
        top: '3px',
        width: '30px',
        toggleShadow: 'none',
        toggleIndicatorShadowOn: '0px 3px 8px rgba(0, 0, 0, 0.25)',
        toggleIndicatorShadowOff: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        toggleFocusShadow: 'none',
        toggleFocusBorderColor: scp_default.a.transparent,
        indicatorSize: '14px',
        indicatorMargin: '2px',
        toggleIndicatorBorderStyle: 'none',
        backgroundColor: scp_default.a.gray35,
        borderColor: scp_default.a.transparent,
        selectedBorderColor: scp_default.a.transparent,
        indicatorBackgroundColor: scp_default.a.white,
        outlineMargin: '-6px',
        outlineBorderRadius: '15px',
        outlineHoverBackgroundColor: 'rgba(255, 255, 255, 0.15)',
        outlineFocusBackgroundColor: 'rgba(255, 255, 255, 0.15)',
        disabledBorderColor: scp_default.a.gray20,
        disabledBackgroundColor: scp_default.a.gray20,
        disabledIndBackgroundColor: scp_default.a.gray35,
        disabledIndBorderColor: scp_default.a.transparent,
        selectedBackgroundColor: scp_default.a.blue2,
        selectedDisabledBackgroundColor: scp_default.a.gray29,
        selectedDisabledIndBackgroundColor: scp_default.a.gray52,
        errorToggleOutlineBorderColor: scp_default.a.transparent,
        errorToggleBackgroundColor: scp_default.a.errorColor
      }
    },
    TabBar: {
      Tab: {
        afterColor: 'transparent',
        afterContent: 'attr(title)',
        afterDisplay: 'block',
        afterFontWeight: 'bold',
        afterHeight: '0px',
        afterOverflow: 'hidden',
        afterVisibility: 'hidden',
        clickableColor: scp_default.a.gray68,
        hoverColor: scp_default.a.gray96,
        focusColor: scp_default.a.gray96,
        focusShadowInset: "inset 0 0 0 0 ".concat(scp_default.a.transparent),
        selectedColor: scp_default.a.gray96,
        selectedFontWeight: 'bold',
        underlineSelectedBackgroundColor: scp_default.a.borderLightColor
      }
    },
    Table: {
      focusShadowInset: 'none',
      Cell: {
        clickableHoverBackgroundColor: scp_default.a.backgroundColorHover,
        clickableExpandIconColor: scp_default.a.white,
        expandContainerHoverBackgroundColor: scp_default.a.backgroundColorHover,
        padding: '12px 8px 11px 8px',
        firstChildColor: scp_default.a.gray96,
        rowActionsPadding: '6px 8px 5px 0',
        expandPadding: '6px 2px 0 0',
        linkColor: scp_default.a.gray68,
        linkFocusColor: scp_default.a.white,
        fontSize: scp_default.a.fontSize,
        lineHeight: '24px',
        verticalAlign: 'middle',
        disabledTextColor: scp_default.a.textDisabledColor
      },
      Head: {
        toggleAllWidth: '36px',
        infoWidth: '36px'
      },
      HeadCell: {
        backgroundColor: scp_default.a.backgroundColor,
        draggingBackgroundColor: scp_default.a.gray04,
        focusShadow: 'none',
        borderLeftColor: scp_default.a.transparent,
        moreInfoHeadCellPadding: '7px 9px 8px 6px',
        focusBackgroundColor: scp_default.a.gray35,
        toggleAllFocusBorderColor: scp_default.a.gray96
      },
      HeadInner: {
        sortIconColor: scp_default.a.gray96,
        sortIconPosition: 'relative',
        sortedIconColor: scp_default.a.gray96,
        menuIconColor: scp_default.a.gray96,
        menuIconPadding: '0 0 0 4px',
        helperBackgroundColor: scp_default.a.accentColorD50,
        hoverColor: scp_default.a.gray96,
        borderRadius: scp_default.a.borderRadius,
        padding: '8px 0',
        toggleAllPadding: '6px 0',
        toggleAllFocusBorderColor: scp_default.a.gray96,
        labelPadding: '4px 8px',
        menuIconRight: '16px',
        color: scp_default.a.gray96,
        fontSize: scp_default.a.fontSizeSmall,
        lineHeight: '16px',
        dragContainerTop: '8px',
        dragContainerLeft: '10px',
        dragContainerPadding: '5px 16px 5px 8px',
        focusBackgroundColor: scp_default.a.gray35
      },
      Row: {
        backgroundColor: scp_default.a.backgroundColor,
        stripeHoverBackgroundColor: scp_default.a.backgroundColorHover,
        hoverColor: scp_default.a.gray96,
        stripeNoneClickableHoverBackgroundColor: scp_default.a.backgroundColorHover,
        stripeEvenBackgroundColor: scp_default.a.backgroundColor,
        clickableHoverColor: scp_default.a.gray96,
        borderBottom: "1px solid ".concat(scp_default.a.gray29),
        toggleAllFocusBorderColor: scp_default.a.gray96,
        toggleFocusBackgroundColor: scp_default.a.gray35,
        toggleFocusBorderColor: scp_default.a.transparent,
        expandContainerWidth: '36px',
        borderRadius: '18px',
        padding: '4px 0 8px',
        selectedTextColor: scp_default.a.gray96,
        disabledBackgroundColor: scp_default.a.gray17,
        linkHoverColor: scp_default.a.gray96,
        linkFocusBackgroundColor: scp_default.a.backgroundColorHover,
        linkActiveBackgroundColor: scp_default.a.gray17
      },
      RowDragCell: {
        draggablePadding: '17px 0 16px 0',
        draggingBackgroundColor: scp_default.a.gray04,
        helperBackgroundColor: scp_default.a.accentColorD50,
        width: '36px',
        toggleAllFocusBorderColor: scp_default.a.gray96
      },
      Toggle: {
        inHeadMargin: '-10px 0',
        margin: '-6px 0',
        position: 'relative',
        top: '-3px'
      }
    },
    Text: {
      clearIconRight: '8px',
      clearIconTop: '6px',
      clearIconPadding: '6px',
      inputBackgroundColor: scp_default.a.gray17,
      inputColor: scp_default.a.gray96,
      inputDisabledColor: scp_default.a.textDisabledColor,
      inputErrorBorderColor: scp_default.a.errorColor,
      inputFocusBorderColor: scp_default.a.gray52,
      inputFocusColor: scp_default.a.gray96,
      inputFocusShadow: 'none',
      inputDisabledBackgroundColor: scp_default.a.gray17,
      inputDisabledBorderColor: scp_default.a.gray17,
      inputErrorColor: scp_default.a.gray96,
      inputClearOrSearchPaddingRight: '40px',
      placeholderMediumSize: '16px',
      placeholderWithSearchLeft: '40px',
      spacingHalf: '16px',
      spacingQuarter: '7px',
      searchIconWrapperColor: scp_default.a.gray68,
      clearColor: scp_default.a.gray68,
      disabledSearchIconColor: scp_default.a.textDisabledColor,
      searchIconWrapperRight: '12px',
      searchIconWrapperTop: '10px',
      searchIconPosition: 'left',
      searchIconPaddingLeft: '40px'
    },
    WaitSpinner: {
      circleStroke: scp_default.a.white
    }
  }
}));
// CONCATENATED MODULE: ./src/themes/themes.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/**
 * @file
 * A collection of theme data sets and helpers for this library. Example usage:
 *
 * ```js
 * import { themes as reactUIThemes } from '@splunk/react-ui/themes';
 * ```
 */

/**
 * Theme data for Splunk Enterprise.
 * ```js
 * {
 *   'react-ui': {
 *     Calendar: {
 *       Day: {
 *         buttonColor: '#5c6773',
 *       },
 *     },
 *     [...]
 *   },
 * ```
 * @public
 */

var themes_enterprise = enterprise;
/**
 * Theme data for Splunk Enterprise Dark. See above for an example.
 * @public
 */

var themes_enterpriseDark = enterpriseDark;
/**
 * Theme data for Splunk Lite. See above for an example.
 * @public
 */

var themes_lite = lite;
/**
 * Theme data for SCP. See above for an example.
 * @public
 */

var themes_scp = scp;
/**
 * An object containing all available theme data sets with theme names as keys.
 * ```js
 * {
 *   enterprise: {Enterprise theme},
 *   enterpriseDark: {Enterprise Dark theme},
 *   lite: {Lite theme},
 *   scp: {SCP theme},
 * }
 * ```
 * @public
 */

var themes = {
  enterprise: themes_enterprise,
  enterpriseDark: themes_enterpriseDark,
  lite: themes_lite,
  scp: themes_scp
};

var getTheme = function getTheme(props) {
  return props.theme && props.theme['react-ui'] ? props.theme['react-ui'] : themes_enterprise['react-ui'];
};

var variable = function variable() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (props) {
    return args.length === 1 ? getTheme(props).base[args[0]] : args.reduce(function (acc, val) {
      return acc && acc[val] ? acc[val] : null;
    }, getTheme(props));
  };
};
var mixin = function mixin(name) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return function (props) {
      var _getTheme$base$mixins;

      return (_getTheme$base$mixins = getTheme(props).base.mixins)[name].apply(_getTheme$base$mixins, args);
    };
  };
};
var isStyledComponents3 = Object.prototype.hasOwnProperty.call(external_styled_components_default.a.a.withConfig({
  displayName: "themes__isStyledComponents3",
  componentId: "kb0ftx-0"
})(''), 'extend');
/**
 * Creates props to enable use of a React `ref` with styled-components v3 or newer.
 *
 * @param {Object|function} receiver - The React ref or callback.
 * @returns {Object} An object containing one key: `innerRef` if styled-components v3
 * is detected, `ref` otherwise.
 * @public
 */

var ref = function ref(receiver) {
  return _defineProperty({}, isStyledComponents3 ? 'innerRef' : 'ref', receiver);
};


// CONCATENATED MODULE: ./src/themes/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "variable", function() { return variable; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "mixin", function() { return mixin; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "enterprise", function() { return themes_enterprise; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "enterpriseDark", function() { return themes_enterpriseDark; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "lite", function() { return themes_lite; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "scp", function() { return themes_scp; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "themes", function() { return themes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ref", function() { return ref; });


/***/ })

/******/ });

});