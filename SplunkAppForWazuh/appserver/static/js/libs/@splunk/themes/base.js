"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dragHandle = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVR4AWMAgioUjAoIyg9xAxBgFIymg1EAAD/iHoHfZJ8OAAAAAElFTkSuQmCC"; // see babel-plugin-base64-png

/**
 * # Grayscale Colors
 *
 * @colorSet
 */

var grays = {
  white: '#ffffff',
  gray98: '#f7f8fa',
  gray96: '#f2f4f5',
  gray92: '#e1e6eb',
  gray80: '#c3cbd4',
  gray60: '#818d99',
  gray45: '#5c6773',
  gray30: '#3c444d',
  gray25: '#31373e',
  gray22: '#2b3033',
  gray20: '#171d21',
  black: '#000000'
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
  errorColorL50: '#fcedec',
  errorColorL40: '#f8dcd9',
  errorColorL30: '#f1b9b3',
  errorColorL20: '#ea958d',
  errorColorL10: '#e37267',
  errorColor: '#dc4e41',
  errorColorD10: '#c84535',
  errorColorD20: '#b23d30',
  errorColorD30: '#9c3529',
  errorColorD40: '#852d24',
  errorColorD50: '#6f261d'
};
/**
 * # Alert Colors
 *
 * @colorSet
 * */

var alertColors = {
  alertColorL50: '#fef3ec',
  alertColorL40: '#fde6d9',
  alertColorL30: '#facdb3',
  alertColorL20: '#f7b48c',
  alertColorL10: '#f49b66',
  alertColor: '#f1813f',
  alertColorD10: '#da742e',
  alertColorD20: '#c2672a',
  alertColorD30: '#aa5a25',
  alertColorD40: '#914d1f',
  alertColorD50: '#79401a'
};
/**
 * # Warning Colors
 *
 *  @colorSet
 */

var warningColors = {
  warningColorL50: '#fff9eb',
  warningColorL40: '#fef2d7',
  warningColorL30: '#fde5ae',
  warningColorL20: '#fbd886',
  warningColorL10: '#facb5d',
  warningColor: '#f8be34',
  warningColorD10: '#e0ac16',
  warningColorD20: '#c79915',
  warningColorD30: '#ae8613',
  warningColorD40: '#957312',
  warningColorD50: '#7d600f'
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
 * # Diverging Colors
 *
 * @colorSet alphabetical
 */

var divergingColors = {
  diverging1ColorA: '#006d9c',
  diverging1ColorB: '#ec9960',
  diverging2ColorA: '#af575a',
  diverging2ColorB: '#62b3b2',
  diverging3ColorA: '#4fa484',
  diverging3ColorB: '#f8be34',
  diverging4ColorA: '#5a4575',
  diverging4ColorB: '#708794',
  diverging5ColorA: '#294e70',
  diverging5ColorB: '#b6c75a'
};
/**
 * # Categorical Colors
 *
 * @colorSet alphabetical
 */

var categoricalColors = {
  cat1Color: '#297ba5',
  cat1ColorL: '#78b9d6',
  cat2Color: '#4fa484',
  cat2ColorL: '#74d5c2',
  cat3Color: '#b6c75a',
  cat3ColorL: '#dce6a5',
  cat4Color: '#3c6188',
  cat4ColorL: '#a0b2ca',
  cat5Color: '#ec9960',
  cat5ColorL: '#fac9a7',
  cat6Color: '#a65c7d',
  cat6ColorL: '#d3a7ba',
  cat7Color: '#708794',
  cat7ColorL: '#b2c0c8',
  cat8Color: '#38b8bf',
  cat8ColorL: '#92dde2',
  cat9Color: '#ffde63',
  cat9ColorL: '#ffeeae',
  cat10Color: '#c19975',
  cat10ColorL: '#d7bfab',
  cat11Color: '#5a4575',
  cat11ColorL: '#b7acca',
  cat12Color: '#7ea77b',
  cat12ColorL: '#b2cab0',
  cat13Color: '#576d83',
  cat13ColorL: '#a5b2bf',
  cat14Color: '#d7c6b7',
  cat14ColorL: '#e9ddd4',
  cat15Color: '#339bb2',
  cat15ColorL: '#66c3d0',
  cat16Color: '#236d9b',
  cat16ColorL: '#66a7c2',
  cat17Color: '#e5dc80',
  cat17ColorL: '#f1eab7',
  cat18Color: '#96907f',
  cat18ColorL: '#c1bcb3',
  cat19Color: '#87bc65',
  cat19ColorL: '#b6d7a3',
  cat20Color: '#cf7e60',
  cat20ColorL: '#e1b2a1',
  cat21Color: '#7b5547',
  cat21ColorL: '#dec4ba',
  cat22Color: '#77d6d8',
  cat22ColorL: '#abe6e8',
  cat23Color: '#4a7f2c',
  cat23ColorL: '#91b282',
  cat24Color: '#f589ad',
  cat24ColorL: '#f8b7ce',
  cat25Color: '#6a2c5d',
  cat25ColorL: '#cba3c2',
  cat26Color: '#aaabae',
  cat26ColorL: '#cccdce',
  cat27Color: '#9a7438',
  cat27ColorL: '#c3ab89',
  cat28Color: '#a4d563',
  cat28ColorL: '#c7e6a3',
  cat29Color: '#7672a4',
  cat29ColorL: '#ada9c8',
  cat30Color: '#184b81',
  cat30ColorL: '#a4bbe0'
};
/**
 * # Usage-based Colors
 *
 * @colorSet verbose
 */

var usageColors = {
  textColor: grays.gray30,
  textGray: '#6b7785',
  textDisabledColor: grays.gray80,
  linkColor: accentColors.accentColorD10,
  linkColorHover: accentColors.accentColor,
  borderLightColor: grays.gray92,
  borderColor: grays.gray80,
  focusColor: accentColors.accentColorL10,
  backgroundColorHover: grays.gray96,
  backgroundColor: grays.white
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
  focusShadowInset: "inset 0 0 2px 1px ".concat(grays.white, ", inset 0 0 0 2px ").concat(usageColors.focusColor),
  overlayShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};
/**
 * # Backgrounds
 *
 * @colorSet verbose
 */

var backgrounds = {
  draggableBackground: "url('data:image/png;base64,".concat(dragHandle, "') 0 0 / 8px 8px repeat")
};
/**
 * # Border
 *
 * @valueSet
 */

var borders = {
  borderRadius: '3px',
  border: "1px solid ".concat(usageColors.borderColor)
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
  inputHeight: '32px',
  inputHeightSmall: '28px',
  inputHeightLarge: '38px',
  toastContainerWidth: '500px'
};
var sansFontFamily = "'Splunk Platform Sans', 'Proxima Nova', Roboto, Droid, 'Helvetica Neue', Helvetica, Arial, sans-serif";
/**
 * # Fonts
 *
 * @valueSet
 */

var fonts = {
  sansFontFamily: sansFontFamily,
  serifFontFamily: "Georgia, 'Times New Roman', Times, serif",
  monoFontFamily: "'Splunk Platform Mono', Inconsolata, Consolas, 'Droid Sans Mono', Monaco, 'Courier New', Courier, monospace",
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

var _default = _objectSpread({}, grays, accentColors, errorColors, alertColors, warningColors, successColors, infoColors, categoricalColors, divergingColors, syntaxColors, measures, fonts, usageColors, backgrounds, shadows, borders, zindexes);

exports.default = _default;