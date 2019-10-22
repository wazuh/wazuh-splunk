"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReset = createReset;
exports.clearfix = clearfix;
exports.ellipsis = ellipsis;
exports.printWidth100Percent = printWidth100Percent;
exports.printHide = printHide;
exports.printNoBackground = printNoBackground;
exports.printWrapAll = printWrapAll;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file
 * A collection of style-related helper functions. All of them return a single object containing
 * DOM CSS properties, for example: `{ display: …, fontFamily: … }`.
 *
 * `@splunk/css-loader` automatically makes these mixins available for use but converts their name
 * to kebab-case (to achive backwards compatability). For example: `printHide` can be used as `print-hide`.
 */
// Markdown examples in this file have to prepend a zero width joiner character before each @
// to prevent jsdoc from interpreting something like @mixin as a tag, see:
// https://github.com/jsdoc3/jsdoc/issues/821
function createReset(variables) {
  var fullReset = {
    animation: 'none 0s ease 0s 1 normal none running',
    backfaceVisibility: 'visible',
    background: 'transparent none repeat 0 0 / auto auto padding-box border-box scroll',
    border: 'medium none currentColor',
    borderCollapse: 'separate',
    borderImage: 'none',
    borderRadius: 0,
    borderSpacing: 0,
    bottom: 'auto',
    boxShadow: 'none',
    captionSide: 'top',
    clear: 'none',
    clip: 'auto',
    columns: 'auto',
    columnCount: 'auto',
    columnFill: 'balance',
    columnGap: 'normal',
    columnRule: 'medium none currentColor',
    columnSpan: 1,
    columnWidth: 'auto',
    content: 'normal',
    counterIncrement: 'none',
    counterReset: 'none',
    cursor: 'auto',
    emptyCells: 'show',
    float: 'none',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    fontStretch: 'normal',
    height: 'auto',
    hyphens: 'none',
    left: 'auto',
    letterSpacing: 'normal',
    listStyle: 'disc outside none',
    margin: 0,
    maxHeight: 'none',
    maxWidth: 'none',
    minHeight: 0,
    minWidth: 0,
    opacity: 1,
    orphans: 2,
    overflow: 'visible',
    overflowX: 'visible',
    overflowY: 'visible',
    padding: 0,
    pageBreakAfter: 'auto',
    pageBreakBefore: 'auto',
    pageBreakInside: 'auto',
    perspective: 'none',
    perspectiveOrigin: '50% 50%',
    pointerEvents: 'auto',
    position: 'static',
    right: 'auto',
    tabSize: 8,
    tableLayout: 'auto',
    textAlign: 'left',
    textAlignLast: 'auto',
    textDecoration: 'none',
    textIndent: 0,
    textShadow: 'none',
    textTransform: 'none',
    top: 'auto',
    transform: 'none',
    transformOrigin: '50% 50% 0',
    transformStyle: 'flat',
    transition: 'none 0s ease 0s',
    userSelect: 'auto',
    verticalAlign: 'baseline',
    whiteSpace: 'normal',
    widows: 2,
    width: 'auto',
    wordSpacing: 'normal',
    zIndex: 'auto'
  };
  /**
   * The `reset` mixin resets all css properties to their browser defaults, plus many to
   * theme-specific values. This ensures an element is not inheriting any inappropriate styles.
   *
   *  ##### Example (@splunk/css-loader)
   *  ```css
   *  .myButton {
   *      ‍@mixin reset inline-block;
   *  }
   *  ```
   *
   *  ##### Example (styled-components)
   *  ```css
   *  .myButton {
   *      ‍${props => props.theme.mixins.reset('inline-block')};
   *  }
   *  ```
   * @name reset
   * @kind function
   * @param {string} [display=inline] Set the `display` property (block, inline-block, …)
   * @param {bool} [full=true] Reset all properies (for browsers that don't support `all`)
   * @param {string} [all=false] Reset all properies if specified (by setting `all` to the given value, e.g. `initial`)
   * @public
   */

  return function () {
    var display = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'inline';
    var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return _objectSpread({}, full ? fullReset : {}, all ? {
      all: all
    } : {}, {
      fontFamily: variables.fontFamily,
      fontSize: variables.fontSize,
      lineHeight: variables.lineHeight,
      color: variables.textColor,
      boxSizing: 'border-box',
      display: display,
      borderWidth: '1px',
      visibility: 'inherit',
      outline: "medium none ".concat(variables.focusColor)
    });
  };
}
/**
 * `clearfix` is used on a container to ensure it's height is at least as tall as any floating
 * children.
 *
 *  ##### Example (@splunk/css-loader)
 *  ``` css
 *  .container {
 *      ‍@mixin clearfix;
 *  }
 *  ```
 *
 *  ##### Example (styled-components)
 *  ``` css
 *  .myButton {
 *      ‍${props => props.theme.mixins.clearfix()};
 *   }
 *  ```
 * @public
 */


function clearfix() {
  return {
    '&::after': {
      display: 'table',
      content: '""',
      clear: 'both'
    }
  };
}
/**
 * Use `ellipsis` for overflowing text. Requires `display` to be set to `inline-block` or `block`.
 *
 *  ##### Example (@splunk/css-loader)
 *  ``` css
 *  .myButton {
 *      ‍@mixin ellipsis;
 *      display: inline-block;
 *  }
 *  ```
 *
 *  ##### Example (styled-components)
 *  ``` css
 *  .myButton {
 *      ‍${props => props.theme.mixins.ellipsis()};
 *      display: inline-block;
 *   }
 *  ```
 * @public
 */


function ellipsis() {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
}
/**
 * Force an element to be exactly 100% wide so that it doesn't overflow the page.
 *
 *  ##### Example (@splunk/css-loader)
 *  ```css
 *  ‍@media print {
 *      .container {
 *          ‍@mixin print-width-100-percent;
 *      }
 *  }
 *  ```
 *
 *  ##### Example (styled-components)
 *  ```css
 *  ‍@media print {
 *      ‍${props => props.theme.mixins.printWidth100Percent()};
 *  }
 *  ```
 *  @public
 */


function printWidth100Percent() {
  return {
    maxWidth: '100% !important',
    width: '100% !important',
    overflow: 'hidden !important'
  };
}
/**
 * Hide an element (such as a button).
 *
 *  ##### Example (@splunk/css-loader)
 *  ```css
 *  ‍@media print {
 *      .interactiveElement {
 *          ‍@mixin print-hide;
 *      }
 *  }
 *  ```
 *
 *  ##### Example (styled-components)
 *  ```css
 *  ‍@media print {
 *      ‍${props => props.theme.mixins.printHide()};
 *  }
 *  ```
 * @public
 */


function printHide() {
  return {
    display: 'none !important'
  };
}
/**
 * Remove background gradients and images.
 *
 *  ##### Example (@splunk/css-loader)
 *  ```css
 *  ‍@media print {
 *      .interactiveElement {
 *          ‍@mixin print-no-background;
 *      }
 *  }
 *  ```
 *
 *  ##### Example (styled-components)
 *  ```css
 *  ‍@media print {
 *      ‍${props => props.theme.mixins.printNoBackground()};
 *  }
 *  ```
 * @public
 */


function printNoBackground() {
  return {
    background: 'none !important'
  };
}
/**
 * Ensure that all text wraps so that it doesn't overflow the page.
 *
 *  ##### Example (@splunk/css-loader)
 *  ```css
 *  ‍@media print {
 *      .interactiveElement {
 *          ‍@mixin print-wrap-all;
 *      }
 *  }
 *  ```
 *
 *  ##### Example (styled-components)
 *  ```css
 *  ‍@media print {
 *      ‍${props => props.theme.mixins.printWrapAll()};
 *  }
 *  ```
 * @public
 */


function printWrapAll() {
  return {
    wordBreak: 'break-all !important',
    wordWrap: 'break-word !important',
    overflowWrap: 'break-word !important',
    whiteSpace: 'normal !important'
  };
}