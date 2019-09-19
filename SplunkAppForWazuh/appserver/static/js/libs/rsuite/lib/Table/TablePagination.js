"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _Pagination = _interopRequireDefault(require("../Pagination"));

var _SelectPicker = _interopRequireDefault(require("../SelectPicker"));

var _Divider = _interopRequireDefault(require("../Divider"));

var _utils = require("../utils");

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var TablePagination =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TablePagination, _React$Component);

  function TablePagination() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleChangeLength = function (eventKey) {
      var onChangeLength = _this.props.onChangeLength;
      onChangeLength && onChangeLength(eventKey);
    };

    _this.handleChangePage = function (eventKey) {
      var onChangePage = _this.props.onChangePage;
      onChangePage && onChangePage(eventKey);
    };

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = TablePagination.prototype;

  _proto.renderLengthMenu = function renderLengthMenu() {
    var _this$props = this.props,
        _this$props$lengthMen = _this$props.lengthMenu,
        lengthMenu = _this$props$lengthMen === void 0 ? [] : _this$props$lengthMen,
        renderLengthMenu = _this$props.renderLengthMenu,
        showLengthMenu = _this$props.showLengthMenu,
        locale = _this$props.locale,
        displayLength = _this$props.displayLength,
        disabled = _this$props.disabled;

    if (!showLengthMenu) {
      return null;
    }

    var disabledPicker = typeof disabled === 'function' ? disabled('picker') : disabled;
    var picker = React.createElement(_SelectPicker.default, {
      appearance: "subtle",
      cleanable: false,
      searchable: false,
      placement: "topStart",
      data: lengthMenu,
      value: displayLength,
      onChange: this.handleChangeLength,
      menuStyle: {
        minWidth: 'auto'
      },
      disabled: disabledPicker
    });
    return React.createElement("div", {
      className: this.addPrefix('length-menu')
    }, renderLengthMenu ? renderLengthMenu(picker) : (0, _utils.tplTransform)(locale.lengthMenuInfo, picker));
  };

  _proto.renderInfo = function renderInfo() {
    var _this$props2 = this.props,
        renderTotal = _this$props2.renderTotal,
        total = _this$props2.total,
        showInfo = _this$props2.showInfo,
        locale = _this$props2.locale,
        activePage = _this$props2.activePage;

    if (!showInfo) {
      return null;
    }

    return React.createElement("div", {
      className: this.addPrefix('page-info')
    }, renderTotal ? renderTotal(total, activePage) : (0, _utils.tplTransform)(locale.totalInfo, total));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        total = _this$props3.total,
        prev = _this$props3.prev,
        next = _this$props3.next,
        first = _this$props3.first,
        last = _this$props3.last,
        maxButtons = _this$props3.maxButtons,
        className = _this$props3.className,
        displayLength = _this$props3.displayLength,
        activePage = _this$props3.activePage,
        disabled = _this$props3.disabled,
        style = _this$props3.style,
        reverse = _this$props3.reverse,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["total", "prev", "next", "first", "last", "maxButtons", "className", "displayLength", "activePage", "disabled", "style", "reverse"]);
    var pages = Math.floor(total / displayLength) + (total % displayLength ? 1 : 0);
    var classes = (0, _classnames.default)(this.addPrefix('toolbar'), className);
    var unhandled = (0, _utils.getUnhandledProps)(TablePagination, rest);
    var pagers = [React.createElement("div", {
      className: (0, _classnames.default)(this.addPrefix('start')),
      key: 1
    }, this.renderLengthMenu(), React.createElement(_Divider.default, {
      vertical: true
    }), this.renderInfo()), React.createElement("div", {
      className: (0, _classnames.default)(this.addPrefix('end')),
      key: 2
    }, React.createElement(_Pagination.default, (0, _extends2.default)({
      size: "xs",
      prev: prev,
      next: next,
      first: first,
      last: last,
      maxButtons: maxButtons,
      pages: pages,
      disabled: disabled,
      onSelect: this.handleChangePage,
      activePage: activePage
    }, unhandled)))];
    return React.createElement("div", {
      className: classes,
      style: style
    }, reverse ? pagers.reverse() : pagers);
  };

  return TablePagination;
}(React.Component);

TablePagination.propTypes = {
  lengthMenu: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.number,
    label: _propTypes.default.node
  })),
  showLengthMenu: _propTypes.default.bool,
  showInfo: _propTypes.default.bool,
  total: _propTypes.default.number,
  displayLength: _propTypes.default.number,
  prev: _propTypes.default.bool,
  next: _propTypes.default.bool,
  first: _propTypes.default.bool,
  last: _propTypes.default.bool,
  maxButtons: _propTypes.default.number,
  activePage: _propTypes.default.number,
  className: _propTypes.default.string,
  locale: _propTypes.default.object,
  classPrefix: _propTypes.default.string,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  style: _propTypes.default.object,
  // reverse start and end position
  reverse: _propTypes.default.bool,
  renderLengthMenu: _propTypes.default.func,
  renderTotal: _propTypes.default.func,
  onChangePage: _propTypes.default.func,
  onChangeLength: _propTypes.default.func
};
TablePagination.defaultProps = {
  showLengthMenu: true,
  showInfo: true,
  lengthMenu: [{
    value: 30,
    label: 30
  }, {
    value: 50,
    label: 50
  }, {
    value: 100,
    label: 100
  }],
  displayLength: 30,
  prev: true,
  next: true,
  first: true,
  last: true,
  activePage: 1,
  maxButtons: 5,
  locale: {
    lengthMenuInfo: 'Show {0} data',
    totalInfo: 'Total: {0}'
  }
};

var _default = (0, _compose.default)((0, _withLocale.default)(['TablePagination']), (0, _utils.defaultProps)({
  classPrefix: 'table-pagination'
}))(TablePagination);

exports.default = _default;
module.exports = exports.default;