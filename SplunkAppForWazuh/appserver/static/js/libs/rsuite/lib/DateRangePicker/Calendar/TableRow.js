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

var _lodash = _interopRequireDefault(require("lodash"));

var _dateFns = require("date-fns");

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _IntlContext = _interopRequireDefault(require("../../IntlProvider/IntlContext"));

var TableRow =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TableRow, _React$Component);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = TableRow.prototype;

  _proto.renderDays = function renderDays() {
    var _this2 = this;

    var _this$props = this.props,
        weekendDate = _this$props.weekendDate,
        disabledDate = _this$props.disabledDate,
        inSameMonth = _this$props.inSameMonth,
        selected = _this$props.selected,
        hoverValue = _this$props.hoverValue,
        onSelect = _this$props.onSelect,
        onMouseMove = _this$props.onMouseMove;
    var days = [];
    var selectedStartDate = selected[0];
    var selectedEndDate = selected[1];
    var hoverStartDate = hoverValue[0] || null;
    var hoverEndDate = hoverValue[1] || null;

    var _loop = function _loop(i) {
      var _classNames;

      var thisDate = (0, _dateFns.addDays)(weekendDate, i);
      var selectValue = [selectedStartDate, selectedEndDate];
      var disabled = disabledDate && disabledDate(thisDate, selectValue, _utils2.TYPE.CALENDAR);
      var isToday = (0, _dateFns.isSameDay)(thisDate, new Date());
      var inRange = false;
      var unSameMonth = !(inSameMonth && inSameMonth(thisDate));
      var isStartSelected = !unSameMonth && selectedStartDate && (0, _dateFns.isSameDay)(thisDate, selectedStartDate);
      var isEndSelected = !unSameMonth && selectedEndDate && (0, _dateFns.isSameDay)(thisDate, selectedEndDate);
      var isSelected = isStartSelected || isEndSelected; // for Selected

      if (selectedStartDate && selectedEndDate) {
        if ((0, _dateFns.isBefore)(thisDate, selectedEndDate) && (0, _dateFns.isAfter)(thisDate, selectedStartDate)) {
          inRange = true;
        }

        if ((0, _dateFns.isBefore)(thisDate, selectedStartDate) && (0, _dateFns.isAfter)(thisDate, selectedEndDate)) {
          inRange = true;
        }
      } // for Hovering


      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!(0, _dateFns.isAfter)(thisDate, hoverEndDate) && !(0, _dateFns.isBefore)(thisDate, hoverStartDate)) {
          inRange = true;
        }

        if (!(0, _dateFns.isAfter)(thisDate, hoverStartDate) && !(0, _dateFns.isBefore)(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }

      var classes = (0, _classnames.default)(_this2.addPrefix('cell'), (_classNames = {}, _classNames[_this2.addPrefix('cell-un-same-month')] = unSameMonth, _classNames[_this2.addPrefix('cell-is-today')] = isToday, _classNames[_this2.addPrefix('cell-selected-start')] = isStartSelected, _classNames[_this2.addPrefix('cell-selected-end')] = isEndSelected, _classNames[_this2.addPrefix('cell-selected')] = isSelected, _classNames[_this2.addPrefix('cell-in-range')] = !unSameMonth && inRange, _classNames[_this2.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = (0, _dateFns.format)(thisDate, 'YYYY-MM-DD');
      days.push(React.createElement(_IntlContext.default.Consumer, {
        key: title
      }, function (context) {
        return React.createElement("div", {
          className: classes,
          role: "menu",
          tabIndex: -1,
          title: isToday ? title + " (" + _lodash.default.get(context, 'today') + ")" : title,
          onMouseEnter: !disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined,
          onClick: !disabled && onSelect ? _lodash.default.debounce(onSelect.bind(null, thisDate), 100) : undefined
        }, React.createElement("span", {
          className: _this2.addPrefix('cell-content')
        }, (0, _dateFns.getDate)(thisDate)));
      }));
    };

    for (var i = 0; i < 7; i += 1) {
      _loop(i);
    }

    return days;
  };

  _proto.renderWeekNumber = function renderWeekNumber() {
    return React.createElement("div", {
      className: this.addPrefix('cell-week-number')
    }, (0, _dateFns.format)(this.props.weekendDate, 'W'));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        showWeekNumbers = _this$props2.showWeekNumbers,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["className", "showWeekNumbers"]);
    var classes = (0, _classnames.default)(this.addPrefix('row'), className);
    var unhandled = (0, _utils.getUnhandledProps)(TableRow, rest);
    return React.createElement("div", (0, _extends2.default)({}, unhandled, {
      className: classes
    }), showWeekNumbers && this.renderWeekNumber(), this.renderDays());
  };

  return TableRow;
}(React.Component);

TableRow.propTypes = {
  weekendDate: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  hoverValue: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  disabledDate: _propTypes.default.func,
  inSameMonth: _propTypes.default.func,
  onMouseMove: _propTypes.default.func
};
TableRow.defaultProps = {
  selected: [],
  hoverValue: []
};
var enhance = (0, _utils.defaultProps)({
  classPrefix: 'calendar-table'
});

var _default = enhance(TableRow);

exports.default = _default;
module.exports = exports.default;