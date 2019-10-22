"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _mixins = require("./mixins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dragHandleDark = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAW5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4K72CKvQAAADdJREFUOBFj/PDp00cGJCDAx8ePxGUgJM+ErJgc9sAbQI6rh5seRkLxTEh+4KORYhcMtzglxz8AtKEQD3hiWXMAAAAASUVORK5CYII="; // see babel-plugin-base64-png

/**
 * # Grayscale Colors
 *
 * @colorSet
 */
var grays = {
  white: '#ffffff',
  gray96: '#f5f5f5',
  // white 2
  gray68: '#acacad',
  // gray 1
  gray52: '#818285',
  // gray 2
  gray35: '#505158',
  // gray 3
  gray29: '#43454b',
  // gray 4
  gray23: '#33343b',
  // gray 5
  gray20: '#2b2c33',
  // black 1
  gray17: '#23242b',
  // black 2
  gray11: '#15161b',
  // black 3
  gray04: '#08080a',
  // black 4
  black: '#000000'
};
/**
 * # Colors
 *
 * @colorSet verbose alphabetical
 */

var colors = {
  blue1: '#0070f3',
  blue2: '#0084ff',
  blue3: '#4ba8ff',
  green1: '#08e045',
  red1: '#fe3a3a',
  orange1: '#ff761d',
  yellow1: '#ffc500',
  transparent: 'transparent'
};
/**
 * # Accent Colors
 *
 * @colorSet
 */

var accentColors = {
  accentColorL50: '#ecf8ff',
  accentColorL40: '#bfe9ff',
  accentColorL30: '#7ed2ff',
  accentColorL20: '#3ebcff',
  accentColorL10: '#00a4fd',
  accentColor: '#007abd',
  accentColorD10: '#006eaa',
  accentColorD20: '#006297',
  accentColorD30: '#005684',
  accentColorD40: '#004a71',
  accentColorD50: '#003d5e'
};
/**
 * # Error Colors
 *
 * @colorSet
 */

var errorColors = {
  errorColorL50: '#ffecec',
  errorColorL40: '#ffc8c8',
  errorColorL30: '#ffa5a5',
  errorColorL20: '#fe8181',
  errorColorL10: '#fe5d5d',
  errorColor: colors.red1,
  errorColorD10: '#fe1616',
  errorColorD20: '#ef0101',
  errorColorD30: '#cc0101',
  errorColorD40: '#a80101',
  errorColorD50: '#850101'
};
/**
 * # Alert Colors
 *
 * @colorSet
 * */

var alertColors = {
  alertColorL50: '#ffe2cf',
  alertColorL40: '#ffcdac',
  alertColorL30: '#ffb788',
  alertColorL20: '#ffa164',
  alertColorL10: '#ff8c41',
  alertColor: colors.orange1,
  alertColorD10: '#f86200',
  alertColorD20: '#d55400',
  alertColorD30: '#b14600',
  alertColorD40: '#8d3800',
  alertColorD50: '#692a00'
};
/**
 * # Warning Colors
 *
 *  @colorSet
 */

var warningColors = {
  warningColorL50: '#ffeeb3',
  warningColorL40: '#ffe58f',
  warningColorL30: '#ffdd6b',
  warningColorL20: '#ffd547',
  warningColorL10: '#ffcd24',
  warningColor: colors.yellow1,
  warningColorD10: '#dba900',
  warningColorD20: '#b88e00',
  warningColorD30: '#947200',
  warningColorD40: '#705700',
  warningColorD50: '#4d3b00'
};
/**
 * # Success Colors
 *
 * @colorSet
 */

var successColors = {
  successColorL50: '#eef6ee',
  successColorL40: '#ddecdd',
  successColorL30: '#bbd9ba',
  successColorL20: '#98c697',
  successColorL10: '#76b374',
  successColor: '#53a051',
  successColorD10: '#479144',
  successColorD20: '#40813d',
  successColorD30: '#387135',
  successColorD40: '#2f612e',
  successColorD50: '#275126'
};
/**
 * # Info Colors
 *
 *  @colorSet
 */

var infoColors = {
  infoColorL50: '#e5f0f5',
  infoColorL40: '#cce2eb',
  infoColorL30: '#99c5d7',
  infoColorL20: '#66a7c4',
  infoColorL10: '#338ab0',
  infoColor: '#006d9c',
  infoColorD10: '#00577c',
  infoColorD20: '#004c6c',
  infoColorD30: '#00415d',
  infoColorD40: '#00364d',
  infoColorD50: '#002b3e'
};
/**
 * # Usage-based Colors
 *
 * @colorSet verbose
 */

var usageColors = {
  textColor: grays.gray68,
  textGray: grays.gray52,
  textDisabledColor: grays.gray52,
  linkColor: colors.blue3,
  linkColorHover: colors.blue3,
  borderLightColor: grays.gray68,
  borderColor: grays.gray29,
  borderDarkColor: grays.black,
  focusColor: colors.blue3,
  backgroundColorHover: grays.gray20,
  backgroundColor: grays.gray11
};
/**
 * # Syntax Colors
 * The following colors should only be used for syntax coloring of code.
 *
 * @colorSet verbose alphabetical
 */

var syntaxColors = {
  syntaxBlue: '#2662fc',
  syntaxBlueLight: '#006d9c',
  syntaxBrown: '#a67f59',
  syntaxGray: '#8293a7',
  syntaxGreen: '#5ca300',
  syntaxGreenLight: '#5ba383',
  syntaxOrange: '#f58220',
  syntaxPink: '#cf00cf',
  syntaxPurple: '#7738ff',
  syntaxPurpleLight: '#b19cd9',
  syntaxRed: '#d90700',
  syntaxRedLight: '#af575a',
  syntaxTeal: '#00a8ab'
};
/**
 * # Shadows
 *
 * @shadowSet
 */

var shadows = {
  focusShadow: "0 0 1px 2px ".concat((0, _tinycolor.default)(usageColors.focusColor).setAlpha(0.6).toRgbString()),
  focusShadowInset: "inset 0 0 2px 1px ".concat(grays.gray29, ", inset 0 0 0 2px ").concat(usageColors.focusColor),
  overlayShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};
/**
 * # Backgrounds
 *
 * @colorSet verbose
 */

var backgrounds = {
  draggableBackground: "url('data:image/png;base64,".concat(dragHandleDark, "') 0 0 / 8px 8px repeat")
};
/**
 * # Border
 *
 * @valueSet
 */

var borders = {
  borderRadius: '4px',
  borderLight: "1px solid ".concat(grays.gray68),
  border: "1px solid ".concat(usageColors.borderColor),
  borderDark: "1px solid ".concat(grays.black)
};
/**
 * # Measures
 * Spacing is used for margin on any element or padding on containers, but could be used for other
 * properties that position elements.
 * * Larger containers, such as `Card` or `Modal` use `spacing`.
 * * `spacingHalf` and `spacingQuarter` are primarily for horizontal spacing between smaller elements.
 * * Just because a desired value equals 20, 10 or 5 pixels, does not mean it's appropriate to
 * use spacing variables.
 *
 * @valueSet
 */

var measures = {
  spacing: '20px',
  spacingHalf: '10px',
  spacingQuarter: '5px',
  fontSize: '14px',
  fontSizeXSmall: '11px',
  fontSizeSmall: '12px',
  fontSizeLarge: '16px',
  fontSizeXLarge: '18px',
  fontSizeXXLarge: '24px',
  lineHeight: '20px',
  inputHeight: '36px',
  inputHeightSmall: '28px',
  inputHeightLarge: '38px',
  toastContainerWidth: '500px'
};
var sansFontFamily = "'Splunk Platform Sans', 'Splunk Data Sans', Roboto, Droid, 'Helvetica Neue', Helvetica, Arial, sans-serif";
/**
 * # Fonts
 *
 * @valueSet
 */

var fonts = {
  sansFontFamily: sansFontFamily,
  serifFontFamily: "Georgia, 'Times New Roman', Times, serif",
  monoFontFamily: "'Splunk Platform Mono', 'Roboto Mono', Consolas, 'Droid Sans Mono', Monaco, 'Courier New', Courier, monospace",
  fontFamily: sansFontFamily,
  fontWeightBold: '700',
  fontWeightSemiBold: '500'
};
/**
 * # Layers
 * If a variable does not suit your purpose, set a value relatively such as, zindexModal +1
 *
 * @valueSet
 */

var zindexes = {
  zindexFixedNavbar: 1030,
  zindexModalBackdrop: 1040,
  zindexModal: 1050,
  zindexPopover: 1060,
  zindexToastMessages: 2000
};

var theme = _objectSpread({}, grays, colors, accentColors, errorColors, alertColors, warningColors, successColors, infoColors, syntaxColors, measures, fonts, usageColors, backgrounds, shadows, borders, zindexes);

var _default = _objectSpread({}, theme, {
  mixins: {
    reset: (0, _mixins.createReset)(theme),
    clearfix: _mixins.clearfix,
    ellipsis: _mixins.ellipsis,
    printWidth100Percent: _mixins.printWidth100Percent,
    printHide: _mixins.printHide,
    printNoBackground: _mixins.printNoBackground,
    printWrapAll: _mixins.printWrapAll
  }
});

exports.default = _default;