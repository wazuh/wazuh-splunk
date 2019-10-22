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
/******/ 	return __webpack_require__(__webpack_require__.s = 107);
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

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(2);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-sortable-hoc"
var external_react_sortable_hoc_ = __webpack_require__(46);

// EXTERNAL MODULE: external "@splunk/ui-utils/i18n"
var i18n_ = __webpack_require__(7);

// EXTERNAL MODULE: external "@splunk/react-ui/Button"
var Button_ = __webpack_require__(16);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@splunk/react-icons/Plus"
var Plus_ = __webpack_require__(58);
var Plus_default = /*#__PURE__*/__webpack_require__.n(Plus_);

// EXTERNAL MODULE: external "@splunk/ui-utils/keyboard"
var keyboard_ = __webpack_require__(8);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@splunk/react-ui/CloseButton"
var CloseButton_ = __webpack_require__(42);
var CloseButton_default = /*#__PURE__*/__webpack_require__.n(CloseButton_);

// EXTERNAL MODULE: external "@splunk/react-ui/ScreenReaderContent"
var ScreenReaderContent_ = __webpack_require__(13);
var ScreenReaderContent_default = /*#__PURE__*/__webpack_require__.n(ScreenReaderContent_);

// EXTERNAL MODULE: external "@splunk/react-ui/themes"
var themes_ = __webpack_require__(1);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(3);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// EXTERNAL MODULE: external "@splunk/react-ui/Box"
var Box_ = __webpack_require__(9);
var Box_default = /*#__PURE__*/__webpack_require__.n(Box_);

// CONCATENATED MODULE: ./src/FormRows/FormRowsStyles.js



var StyledBox = external_styled_components_default()(Box_default.a).withConfig({
  displayName: "FormRowsStyles__StyledBox",
  componentId: "sc-1ovjocz-0"
})(["", ";"], Object(themes_["mixin"])('reset')('block'));
var StyledHeader = external_styled_components_default.a.div.withConfig({
  displayName: "FormRowsStyles__StyledHeader",
  componentId: "sc-1ovjocz-1"
})(["padding-left:", ";"], Object(themes_["variable"])('spacingHalf'));
var StyledRows = external_styled_components_default.a.div.withConfig({
  displayName: "FormRowsStyles__StyledRows",
  componentId: "sc-1ovjocz-2"
})(["position:relative;"]);
var Styled = external_styled_components_default.a.div.withConfig({
  displayName: "FormRowsStyles__Styled",
  componentId: "sc-1ovjocz-3"
})(["padding:3px calc(", " + 3px) 3px 0;position:relative;&.sorting{z-index:", ";}&[data-sortable='true']{padding-left:", ";}&:focus{outline:0;box-shadow:", ";}"], Object(themes_["variable"])('inputHeight'), function (props) {
  return Object(themes_["variable"])('zindexPopover')(props) + 1;
}, Object(themes_["variable"])('spacingHalf'), Object(themes_["variable"])('focusShadow'));
var StyledButton = external_styled_components_default.a.div.withConfig({
  displayName: "FormRowsStyles__StyledButton",
  componentId: "sc-1ovjocz-4"
})(["position:absolute;right:0;top:3px;float:right;"]);
var StyledDrag = external_styled_components_default.a.div.withConfig({
  displayName: "FormRowsStyles__StyledDrag",
  componentId: "sc-1ovjocz-5"
})(["position:absolute;left:0;right:0;top:4px;bottom:3px;content:'';cursor:move;width:7px;background:", ";opacity:0.5;"], Object(themes_["variable"])('draggableBackground'));

// CONCATENATED MODULE: ./src/FormRows/Row.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var Row_Row =
/*#__PURE__*/
function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Row)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyDown", function (e) {
      _this.props.onKeyDown(e, {
        index: _this.props.rowIndex
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRequestRemove", function (e) {
      _this.props.onRequestRemove(e, {
        index: _this.props.rowIndex
      });
    });

    return _this;
  }

  _createClass(Row, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          disabledDeleteButton = _this$props.disabledDeleteButton,
          sortable = _this$props.sortable,
          elementRef = _this$props.elementRef,
          otherProps = _objectWithoutProperties(_this$props, ["children", "disabledDeleteButton", "sortable", "elementRef"]);

      var DragHandle = Object(external_react_sortable_hoc_["SortableHandle"])(function () {
        return external_react_default.a.createElement(StyledDrag, {
          "data-test": "drag-handle"
        }, external_react_default.a.createElement(ScreenReaderContent_default.a, null, "Press arrow up or arrow down to re-order items"));
      });
      return external_react_default.a.createElement(Styled // eslint-disable-line jsx-a11y/no-static-element-interactions
      , _extends({
        "data-sortable": sortable,
        "data-test": "row"
      }, Object(themes_["ref"])(elementRef), {
        onKeyDown: this.handleKeyDown // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        ,
        tabIndex: sortable ? 0 : undefined
      }, Object(external_lodash_["omit"])(otherProps, ['onKeyDown', 'onRequestRemove', 'rowIndex'])), sortable && external_react_default.a.createElement(DragHandle, null), children, external_react_default.a.createElement(StyledButton, null, external_react_default.a.createElement(CloseButton_default.a, {
        disabled: disabledDeleteButton,
        "data-test": "remove",
        onClick: this.handleRequestRemove,
        screenReaderText: Object(i18n_["_"])('Remove Row')
      })));
    }
  }]);

  return Row;
}(external_react_["Component"]);

_defineProperty(Row_Row, "propTypes", {
  /** @private */
  children: external_prop_types_default.a.node,

  /**
   * @private
   * Not called `disabled` because react-sortable-hoc uses the name internally.
   */
  disabledDeleteButton: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Index of the row */
  index: external_prop_types_default.a.number,

  /** @private */
  onKeyDown: external_prop_types_default.a.func,

  /** Callback when remove button is clicked. */
  onRequestRemove: external_prop_types_default.a.func,

  /**
   * @private
   * Sortable HOC consumes and removes `index`, so we have `rowIndex` to keep
   * track of it internally.
   */
  rowIndex: external_prop_types_default.a.number,

  /** @private */
  sortable: external_prop_types_default.a.bool,

  /** The contents of Row */
  value: external_prop_types_default.a.node
});

_defineProperty(Row_Row, "defaultProps", {
  disabledDeleteButton: false,
  sortable: true
});

/* harmony default export */ var FormRows_Row = (Row_Row);
// CONCATENATED MODULE: ./src/FormRows/FormRows.jsx
function FormRows_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { FormRows_typeof = function _typeof(obj) { return typeof obj; }; } else { FormRows_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return FormRows_typeof(obj); }

function FormRows_extends() { FormRows_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return FormRows_extends.apply(this, arguments); }

function FormRows_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = FormRows_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function FormRows_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function FormRows_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FormRows_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FormRows_createClass(Constructor, protoProps, staticProps) { if (protoProps) FormRows_defineProperties(Constructor.prototype, protoProps); if (staticProps) FormRows_defineProperties(Constructor, staticProps); return Constructor; }

function FormRows_possibleConstructorReturn(self, call) { if (call && (FormRows_typeof(call) === "object" || typeof call === "function")) { return call; } return FormRows_assertThisInitialized(self); }

function FormRows_getPrototypeOf(o) { FormRows_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return FormRows_getPrototypeOf(o); }

function FormRows_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) FormRows_setPrototypeOf(subClass, superClass); }

function FormRows_setPrototypeOf(o, p) { FormRows_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return FormRows_setPrototypeOf(o, p); }

function FormRows_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function FormRows_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var SortableList = Object(external_react_sortable_hoc_["SortableContainer"])(function (_ref) {
  var children = _ref.children;
  return external_react_default.a.createElement(StyledRows, null, children);
});
var FormRows_FormRows_Row = Object(external_react_sortable_hoc_["SortableElement"])(FormRows_Row);

var FormRows_FormRows =
/*#__PURE__*/
function (_Component) {
  FormRows_inherits(FormRows, _Component);

  function FormRows() {
    var _getPrototypeOf2;

    var _this;

    FormRows_classCallCheck(this, FormRows);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = FormRows_possibleConstructorReturn(this, (_getPrototypeOf2 = FormRows_getPrototypeOf(FormRows)).call.apply(_getPrototypeOf2, [this].concat(args)));

    FormRows_defineProperty(FormRows_assertThisInitialized(FormRows_assertThisInitialized(_this)), "handleKeyDown", function (e, _ref2) {
      var index = _ref2.index;

      if (e.currentTarget !== e.target) {
        return;
      }

      if (Object(keyboard_["keycode"])(e) === 'up') {
        e.preventDefault();

        if (index > 0) {
          _this.props.onRequestMove({
            fromIndex: index,
            toIndex: index - 1
          });
        }
      } else if (Object(keyboard_["keycode"])(e) === 'down') {
        e.preventDefault();

        if (index < _this.props.children.length - 1) {
          _this.props.onRequestMove({
            fromIndex: index,
            toIndex: index + 1
          });
        }
      }
    });

    FormRows_defineProperty(FormRows_assertThisInitialized(FormRows_assertThisInitialized(_this)), "handleSortEnd", function (_ref3) {
      var oldIndex = _ref3.oldIndex,
          newIndex = _ref3.newIndex;

      _this.props.onRequestMove({
        fromIndex: oldIndex,
        toIndex: newIndex
      });
    });

    return _this;
  }

  FormRows_createClass(FormRows, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          addLabel = _this$props.addLabel,
          children = _this$props.children,
          disabled = _this$props.disabled,
          header = _this$props.header,
          menu = _this$props.menu,
          onRequestAdd = _this$props.onRequestAdd,
          onRequestMove = _this$props.onRequestMove,
          onRequestRemove = _this$props.onRequestRemove,
          otherProps = FormRows_objectWithoutProperties(_this$props, ["addLabel", "children", "disabled", "header", "menu", "onRequestAdd", "onRequestMove", "onRequestRemove"]);

      var sortable = onRequestMove !== FormRows.defaultProps.onRequestMove && !disabled;
      var StyledHeaderComp = sortable ? StyledHeader : 'div';
      var clonedChildren = external_react_["Children"].toArray(children).filter(external_react_["isValidElement"]).map(function (item) {
        return Object(external_react_["cloneElement"])(item, {
          onKeyDown: _this2.handleKeyDown,
          rowIndex: item.props.index,
          disabledDeleteButton: disabled,
          sortable: sortable
        });
      });
      return external_react_default.a.createElement(StyledBox, FormRows_extends({
        "data-test": "form-rows"
      }, otherProps), header && external_react_default.a.createElement(StyledHeaderComp, null, header), external_react_default.a.createElement(SortableList, {
        helperClass: "sorting",
        onSortEnd: this.handleSortEnd,
        onRequestRemove: onRequestRemove,
        sortable: sortable,
        useDragHandle: true
      }, clonedChildren), menu || external_react_default.a.createElement(Button_default.a, {
        disabled: disabled,
        appearance: "pill",
        "data-test": "add-row",
        icon: external_react_default.a.createElement(Plus_default.a, null),
        label: addLabel,
        onClick: onRequestAdd
      }));
    }
  }], [{
    key: "addRow",

    /**
     * Static function for adding a row.
     *
     * Example Use:
     *
     *      onRequestAdd() => {
     *          this.setState(state => ({
     *              items: FormRows.addRow(
     *                  <FormRows.Row
     *                      index={state.items.length}
     *                      key={createDOMID()}
     *                      onRequestRemove={this.handleRequestRemove}
     *                  >
     *                      <Text />
     *                  </FormRows.Row>,
     *                  state.items
     *              ),
     *          }));
     *      };
     *
     * @param element Row element to add.
     * @param items Array of current FormRows to add to.
     * @return New array of FormRows with new Row added.
     */
    value: function addRow(element, items) {
      return items.concat(element);
    }
    /**
     * Static function for moving a row.
     *
     * Example Use:
     *
     *      onRequestMove({ fromIndex, toIndex }) => {
     *          this.setState(state => ({
     *              items: FormRows.moveRow(fromIndex, toIndex, state.items),
     *          }));
     *      };
     *
     * @param fromIndex Current index of row to move.
     * @param toIndex New index to move row to.
     * @param items Array of current FormRows.
     * @return New array of FormRows arranged in new order.
     */

  }, {
    key: "moveRow",
    value: function moveRow(fromIndex, toIndex, items) {
      var tempArray = items.filter(function (val, idx) {
        return idx !== fromIndex;
      });
      tempArray.splice(toIndex, 0, items[fromIndex]);
      return tempArray.map(function (item, index) {
        return Object(external_react_["cloneElement"])(item, {
          index: index
        });
      });
    }
    /**
     * Static function for removing a row.
     *
     * Example Use:
     *
     *      onRequestRemove(e, { index }) => {
     *          this.setState(state => ({
     *              items: FormRows.removeRow(index, state.items),
     *          }));
     *      };
     *
     * @param index Index of Row to delete.
     * @param items Array of current FormRows.
     * @return New array of FormRows with Row of given index deleted.
     */

  }, {
    key: "removeRow",
    value: function removeRow(index, items) {
      return items.filter(function (val, idx) {
        return idx !== index;
      }).map(function (item, idx) {
        return Object(external_react_["cloneElement"])(item, {
          index: idx
        });
      });
    }
  }]);

  return FormRows;
}(external_react_["Component"]);

FormRows_defineProperty(FormRows_FormRows, "propTypes", {
  /** Label on the Add Row Button. Ignored when menu prop is defined. */
  addLabel: external_prop_types_default.a.string,

  /** @private */
  children: external_prop_types_default.a.node,

  /** Disable the add button, the remove button and the sort/drag action. */
  disabled: external_prop_types_default.a.bool,

  /**
   * Invoked with the DOM element when the component mounts and null when it unmounts.
   */
  elementRef: external_prop_types_default.a.func,

  /** Header for the rows. */
  header: external_prop_types_default.a.node,

  /** Replaces Add Row Button with custom content or controls. */
  menu: external_prop_types_default.a.node,

  /** Callback when add button is clicked. */
  onRequestAdd: external_prop_types_default.a.func,

  /** Callback when sort action completes. Omit this to make rows unsortable. */
  onRequestMove: external_prop_types_default.a.func,

  /** Callback when remove button is clicked. */
  onRequestRemove: external_prop_types_default.a.func
});

FormRows_defineProperty(FormRows_FormRows, "defaultProps", {
  addLabel: Object(i18n_["_"])('Add Row'),
  disabled: false,
  header: null,
  onRequestAdd: function onRequestAdd() {},
  onRequestMove: function onRequestMove() {},
  onRequestRemove: function onRequestRemove() {}
});

FormRows_FormRows.Row = FormRows_FormRows_Row;
/* harmony default export */ var src_FormRows_FormRows = (FormRows_FormRows);

// CONCATENATED MODULE: ./src/FormRows/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "default", function() { return src_FormRows_FormRows; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Row", function() { return FormRows_FormRows_Row; });



/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/ScreenReaderContent");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Button");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/CloseButton");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("react-sortable-hoc");

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-icons/Plus");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/i18n");

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = require("@splunk/ui-utils/keyboard");

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = require("@splunk/react-ui/Box");

/***/ })

/******/ });