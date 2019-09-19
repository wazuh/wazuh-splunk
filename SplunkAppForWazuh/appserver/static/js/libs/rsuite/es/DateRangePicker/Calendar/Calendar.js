import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addMonths, isAfter } from 'date-fns';
import { getUnhandledProps, prefix, defaultProps } from '../../utils';
import MonthDropdown from '../../Calendar/MonthDropdown';
import Header from '../../Calendar/Header';
import View from './View';

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Calendar, _React$Component);

  function Calendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleMoveForword = function () {
      var onMoveForword = _this.props.onMoveForword;
      onMoveForword && onMoveForword(addMonths(_this.getPageDate(), 1));
    };

    _this.handleMoveBackward = function () {
      var onMoveBackward = _this.props.onMoveBackward;
      onMoveBackward && onMoveBackward(addMonths(_this.getPageDate(), -1));
    };

    _this.disabledBackward = function () {
      var _this$props = _this.props,
          calendarDate = _this$props.calendarDate,
          index = _this$props.index;
      var after = isAfter(calendarDate[1], addMonths(calendarDate[0], 1));

      if (index === 0) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    _this.disabledForword = function () {
      var _this$props2 = _this.props,
          calendarDate = _this$props2.calendarDate,
          index = _this$props2.index;
      var after = isAfter(calendarDate[1], addMonths(calendarDate[0], 1));

      if (index === 1) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    _this.disabledMonth = function (date) {
      var _this$props3 = _this.props,
          calendarDate = _this$props3.calendarDate,
          value = _this$props3.value,
          index = _this$props3.index,
          disabledDate = _this$props3.disabledDate;
      var after = true;

      if (disabledDate && disabledDate(date, value, 'MONTH')) {
        return true;
      }

      if (index === 1) {
        after = isAfter(date, calendarDate[0]);
        return !after;
      }

      after = isAfter(calendarDate[1], date);
      return !after;
    };

    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.getPageDate = function getPageDate() {
    var _this$props4 = this.props,
        calendarDate = _this$props4.calendarDate,
        index = _this$props4.index;
    return calendarDate[index];
  };

  _proto.shouldMountDate = function shouldMountDate(props) {
    var _ref = props || this.props,
        format = _ref.format;

    return /Y/.test(format) && /M/.test(format) && /D/.test(format);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props5 = this.props,
        calendarState = _this$props5.calendarState,
        onSelect = _this$props5.onSelect,
        onMouseMove = _this$props5.onMouseMove,
        onToggleMonthDropdown = _this$props5.onToggleMonthDropdown,
        onChangePageDate = _this$props5.onChangePageDate,
        disabledDate = _this$props5.disabledDate,
        className = _this$props5.className,
        value = _this$props5.value,
        hoverValue = _this$props5.hoverValue,
        isoWeek = _this$props5.isoWeek,
        limitEndYear = _this$props5.limitEndYear,
        classPrefix = _this$props5.classPrefix,
        showWeekNumbers = _this$props5.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props5, ["calendarState", "onSelect", "onMouseMove", "onToggleMonthDropdown", "onChangePageDate", "disabledDate", "className", "value", "hoverValue", "isoWeek", "limitEndYear", "classPrefix", "showWeekNumbers"]);

    var pageDate = this.getPageDate();
    var dropMonth = calendarState === 'DROP_MONTH';
    var addPrefix = prefix(classPrefix);
    var calendarClasses = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('show-month-dropdown')] = dropMonth, _classNames));
    var unhandled = getUnhandledProps(Calendar, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: calendarClasses
    }), React.createElement(Header, {
      showMonth: true,
      date: pageDate,
      disabledBackward: this.disabledBackward(),
      disabledForword: this.disabledForword(),
      onMoveForword: this.handleMoveForword,
      onMoveBackward: this.handleMoveBackward,
      onToggleMonthDropdown: onToggleMonthDropdown
    }), React.createElement(View, {
      activeDate: pageDate,
      value: value,
      hoverValue: hoverValue,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      disabledDate: disabledDate,
      isoWeek: isoWeek,
      showWeekNumbers: showWeekNumbers
    }), React.createElement(MonthDropdown, {
      date: pageDate,
      show: dropMonth,
      disabledMonth: this.disabledMonth,
      onSelect: onChangePageDate,
      limitEndYear: limitEndYear
    }));
  };

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  calendarState: PropTypes.oneOf(['DROP_MONTH', 'DROP_TIME']),
  index: PropTypes.number,
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  limitEndYear: PropTypes.number,
  disabledDate: PropTypes.func,
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func
};
Calendar.defaultProps = {
  calendarDate: [new Date(), addMonths(new Date(), 1)],
  index: 0
};
var enhance = defaultProps({
  classPrefix: 'calendar'
});
export default enhance(Calendar);