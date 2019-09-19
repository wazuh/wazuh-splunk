import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import { shouldTime, shouldDate, shouldMonth } from '../utils/formatUtils';
import { addMonths } from 'date-fns';
import { tuple } from '../@types/utils';
var CalendarState = tuple('DROP_TIME', 'DROP_MONTH');

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

    _this.disabledDate = function (date) {
      var disabledDate = _this.props.disabledDate;

      if (disabledDate && disabledDate(date)) {
        return true;
      }

      return false;
    };

    _this.disabledTime = function (date) {
      return disabledTime(_this.props, date);
    };

    _this.handleMoveForword = function () {
      var _this$props = _this.props,
          onMoveForword = _this$props.onMoveForword,
          pageDate = _this$props.pageDate;
      onMoveForword && onMoveForword(addMonths(pageDate, 1));
    };

    _this.handleMoveBackward = function () {
      var _this$props2 = _this.props,
          onMoveBackward = _this$props2.onMoveBackward,
          pageDate = _this$props2.pageDate;
      onMoveBackward && onMoveBackward(addMonths(pageDate, -1));
    };

    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        calendarState = _this$props3.calendarState,
        pageDate = _this$props3.pageDate,
        onSelect = _this$props3.onSelect,
        onToggleMonthDropdown = _this$props3.onToggleMonthDropdown,
        onToggleTimeDropdown = _this$props3.onToggleTimeDropdown,
        onChangePageDate = _this$props3.onChangePageDate,
        onChangePageTime = _this$props3.onChangePageTime,
        format = _this$props3.format,
        calendarRef = _this$props3.calendarRef,
        className = _this$props3.className,
        isoWeek = _this$props3.isoWeek,
        limitEndYear = _this$props3.limitEndYear,
        classPrefix = _this$props3.classPrefix,
        renderTitle = _this$props3.renderTitle,
        renderToolbar = _this$props3.renderToolbar,
        renderCell = _this$props3.renderCell,
        showWeekNumbers = _this$props3.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props3, ["calendarState", "pageDate", "onSelect", "onToggleMonthDropdown", "onToggleTimeDropdown", "onChangePageDate", "onChangePageTime", "format", "calendarRef", "className", "isoWeek", "limitEndYear", "classPrefix", "renderTitle", "renderToolbar", "renderCell", "showWeekNumbers"]);

    var showDate = shouldDate(format);
    var showTime = shouldTime(format);
    var showMonth = shouldMonth(format);
    var onlyShowTime = showTime && !showDate && !showMonth;
    var onlyShowMonth = showMonth && !showDate && !showTime;
    var dropTime = calendarState === 'DROP_TIME' || onlyShowTime;
    var dropMonth = calendarState === 'DROP_MONTH' || onlyShowMonth;
    var addPrefix = prefix(classPrefix);
    var calendarClasses = classNames(className, classPrefix, (_classNames = {}, _classNames[addPrefix('show-time-dropdown')] = dropTime, _classNames[addPrefix('show-month-dropdown')] = dropMonth, _classNames));
    var unhandled = getUnhandledProps(Calendar, rest);

    var timeDropdownProps = _.pick(rest, calendarOnlyProps);

    return React.createElement("div", _extends({}, unhandled, {
      className: calendarClasses,
      ref: calendarRef
    }), React.createElement(Header, {
      date: pageDate,
      format: format,
      showMonth: showMonth,
      showDate: showDate,
      showTime: showTime,
      disabledDate: this.disabledDate,
      disabledTime: this.disabledTime,
      onMoveForword: this.handleMoveForword,
      onMoveBackward: this.handleMoveBackward,
      onToggleMonthDropdown: onToggleMonthDropdown,
      onToggleTimeDropdown: onToggleTimeDropdown,
      renderTitle: renderTitle,
      renderToolbar: renderToolbar
    }), showDate && React.createElement(View, {
      key: "MonthView",
      activeDate: pageDate,
      onSelect: onSelect,
      isoWeek: isoWeek,
      disabledDate: this.disabledDate,
      renderCell: renderCell,
      showWeekNumbers: showWeekNumbers
    }), showMonth && React.createElement(MonthDropdown, {
      date: pageDate,
      onSelect: onChangePageDate,
      show: dropMonth,
      limitEndYear: limitEndYear,
      disabledMonth: this.disabledDate
    }), showTime && React.createElement(TimeDropdown, _extends({}, timeDropdownProps, {
      date: pageDate,
      format: format,
      show: dropTime,
      onSelect: onChangePageTime
    })));
  };

  return Calendar;
}(React.Component);

Calendar.propTypes = {
  pageDate: PropTypes.instanceOf(Date),
  calendarState: PropTypes.oneOf(CalendarState),
  calendarRef: PropTypes.func,
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  //disabledHours: PropTypes.func,
  //disabledMinutes: PropTypes.func,
  //disabledSeconds: PropTypes.func,
  //hideHours: PropTypes.func,
  //hideMinutes: PropTypes.func,
  //hideSeconds: PropTypes.func,
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func,
  onChangePageTime: PropTypes.func,
  renderTitle: PropTypes.func,
  renderToolbar: PropTypes.func,
  renderCell: PropTypes.func
};
export default defaultProps({
  classPrefix: 'calendar'
})(Calendar);