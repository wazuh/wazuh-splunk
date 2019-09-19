import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { isSameDay, addDays, getDate, format } from 'date-fns';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import IntlContext from '../IntlProvider/IntlContext';

var TableRow =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(TableRow, _React$PureComponent);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.handleSelect = function (date, disabled, event) {
      var onSelect = _this.props.onSelect;

      if (disabled) {
        return;
      }

      onSelect && onSelect(date, event);
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
        renderCell = _this$props.renderCell;
    var days = [];

    var _loop = function _loop(i) {
      var _classNames;

      var thisDate = addDays(weekendDate, i);
      var disabled = disabledDate && disabledDate(thisDate);
      var isToday = isSameDay(thisDate, new Date());
      var classes = classNames(_this2.addPrefix('cell'), (_classNames = {}, _classNames[_this2.addPrefix('cell-un-same-month')] = !(inSameMonth && inSameMonth(thisDate)), _classNames[_this2.addPrefix('cell-is-today')] = isToday, _classNames[_this2.addPrefix('cell-selected')] = isSameDay(thisDate, selected), _classNames[_this2.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = format(thisDate, 'YYYY-MM-DD');
      days.push(React.createElement(IntlContext.Consumer, {
        key: title
      }, function (context) {
        return React.createElement("div", {
          className: classes,
          role: "menu",
          tabIndex: -1,
          title: isToday ? title + " (" + _.get(context, 'today') + ")" : title,
          onClick: _this2.handleSelect.bind(_this2, thisDate, disabled)
        }, React.createElement("div", {
          className: _this2.addPrefix('cell-content')
        }, React.createElement("span", {
          className: _this2.addPrefix('cell-day')
        }, getDate(thisDate)), renderCell && renderCell(thisDate)));
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
    }, format(this.props.weekendDate, 'W'));
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        showWeekNumbers = _this$props2.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["className", "showWeekNumbers"]);

    var classes = classNames(this.addPrefix('row'), className);
    var unhandled = getUnhandledProps(TableRow, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), showWeekNumbers && this.renderWeekNumber(), this.renderDays());
  };

  return TableRow;
}(React.PureComponent);

TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func,
  renderCell: PropTypes.func
};
TableRow.defaultProps = {
  selected: new Date(),
  weekendDate: new Date()
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(TableRow);