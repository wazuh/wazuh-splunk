"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enterprise = _interopRequireDefault(require("./enterprise"));

var _mixins = require("./mixins");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dragHandleDark = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAW5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4K72CKvQAAADdJREFUOBFj/PDp00cGJCDAx8ePxGUgJM+ErJgc9sAbQI6rh5seRkLxTEh+4KORYhcMtzglxz8AtKEQD3hiWXMAAAAASUVORK5CYII="; // see babel-plugin-base64-png

var dark = {
  backgroundColor: _enterprise.default.gray25,
  backgroundColorHover: _enterprise.default.gray30,
  borderColor: _enterprise.default.gray22,
  borderDarkColor: _enterprise.default.black,
  borderLightColor: _enterprise.default.gray60,
  textColor: _enterprise.default.white,
  textGray: _enterprise.default.gray92,
  textDisabledColor: _enterprise.default.gray45,
  linkColor: _enterprise.default.accentColorL10,
  linkColorHover: _enterprise.default.accentColorL20,
  border: "1px solid ".concat(_enterprise.default.gray22),
  borderDark: "1px solid ".concat(_enterprise.default.black),
  borderLight: "1px solid ".concat(_enterprise.default.gray60),
  focusShadowInset: "inset 0 0 2px 1px ".concat(_enterprise.default.gray25, ", inset 0 0 0 2px ").concat(_enterprise.default.focusColor),
  draggableBackground: "url('data:image/png;base64,".concat(dragHandleDark, "') 0 0 / 8px 8px repeat")
};

var theme = _objectSpread({}, _enterprise.default, dark);

var _default = _objectSpread({}, theme, {
  mixins: _objectSpread({}, theme.mixins, {
    reset: (0, _mixins.createReset)(theme)
  })
});

exports.default = _default;