import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { addDays, isSameDay, isBefore, isAfter, getDate, format } from 'date-fns';
import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import { TYPE } from '../utils';
import IntlContext from '../../IntlProvider/IntlContext';

var TableRow =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TableRow, _React$Component);

  function TableRow() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
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

      var thisDate = addDays(weekendDate, i);
      var selectValue = [selectedStartDate, selectedEndDate];
      var disabled = disabledDate && disabledDate(thisDate, selectValue, TYPE.CALENDAR);
      var isToday = isSameDay(thisDate, new Date());
      var inRange = false;
      var unSameMonth = !(inSameMonth && inSameMonth(thisDate));
      var isStartSelected = !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
      var isEndSelected = !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);
      var isSelected = isStartSelected || isEndSelected; // for Selected

      if (selectedStartDate && selectedEndDate) {
        if (isBefore(thisDate, selectedEndDate) && isAfter(thisDate, selectedStartDate)) {
          inRange = true;
        }

        if (isBefore(thisDate, selectedStartDate) && isAfter(thisDate, selectedEndDate)) {
          inRange = true;
        }
      } // for Hovering


      if (!isSelected && hoverEndDate && hoverStartDate) {
        if (!isAfter(thisDate, hoverEndDate) && !isBefore(thisDate, hoverStartDate)) {
          inRange = true;
        }

        if (!isAfter(thisDate, hoverStartDate) && !isBefore(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }

      var classes = classNames(_this2.addPrefix('cell'), (_classNames = {}, _classNames[_this2.addPrefix('cell-un-same-month')] = unSameMonth, _classNames[_this2.addPrefix('cell-is-today')] = isToday, _classNames[_this2.addPrefix('cell-selected-start')] = isStartSelected, _classNames[_this2.addPrefix('cell-selected-end')] = isEndSelected, _classNames[_this2.addPrefix('cell-selected')] = isSelected, _classNames[_this2.addPrefix('cell-in-range')] = !unSameMonth && inRange, _classNames[_this2.addPrefix('cell-disabled')] = disabled, _classNames));
      var title = format(thisDate, 'YYYY-MM-DD');
      days.push(React.createElement(IntlContext.Consumer, {
        key: title
      }, function (context) {
        return React.createElement("div", {
          className: classes,
          role: "menu",
          tabIndex: -1,
          title: isToday ? title + " (" + _.get(context, 'today') + ")" : title,
          onMouseEnter: !disabled && onMouseMove ? onMouseMove.bind(null, thisDate) : undefined,
          onClick: !disabled && onSelect ? _.debounce(onSelect.bind(null, thisDate), 100) : undefined
        }, React.createElement("span", {
          className: _this2.addPrefix('cell-content')
        }, getDate(thisDate)));
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
}(React.Component);

TableRow.propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func,
  onMouseMove: PropTypes.func
};
TableRow.defaultProps = {
  selected: [],
  hoverValue: []
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(TableRow);