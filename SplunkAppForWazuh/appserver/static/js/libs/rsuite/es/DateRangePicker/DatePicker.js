import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { addMonths } from 'date-fns';
import Calendar from './Calendar';

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.onMoveForword = function (nextPageDate) {
      var _this$props = _this.props,
          onChangeCalendarDate = _this$props.onChangeCalendarDate,
          index = _this$props.index;
      onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
    };

    _this.onMoveBackward = function (nextPageDate) {
      var _this$props2 = _this.props,
          onChangeCalendarDate = _this$props2.onChangeCalendarDate,
          index = _this$props2.index;
      onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);
    };

    _this.handleChangePageDate = function (nextPageDate) {
      var _this$props3 = _this.props,
          onChangeCalendarDate = _this$props3.onChangeCalendarDate,
          index = _this$props3.index;
      onChangeCalendarDate && onChangeCalendarDate(index, nextPageDate);

      _this.setState({
        calendarState: undefined
      });
    };

    _this.toggleMonthDropdown = function () {
      var calendarState = _this.state.calendarState;

      if (calendarState === 'DROP_MONTH') {
        _this.setState({
          calendarState: undefined
        });
      } else {
        _this.setState({
          calendarState: 'DROP_MONTH'
        });
      }
    };

    _this.state = {
      calendarState: undefined
    };
    return _this;
  }

  var _proto = DatePicker.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        format = _this$props4.format,
        value = _this$props4.value,
        hoverValue = _this$props4.hoverValue,
        index = _this$props4.index,
        calendarDate = _this$props4.calendarDate,
        onSelect = _this$props4.onSelect,
        onMouseMove = _this$props4.onMouseMove,
        disabledDate = _this$props4.disabledDate,
        isoWeek = _this$props4.isoWeek,
        limitEndYear = _this$props4.limitEndYear,
        classPrefix = _this$props4.classPrefix,
        showWeekNumbers = _this$props4.showWeekNumbers;
    var calendarState = this.state.calendarState;
    return React.createElement(Calendar, {
      classPrefix: classPrefix,
      disabledDate: disabledDate,
      format: format,
      value: value,
      isoWeek: isoWeek,
      hoverValue: hoverValue,
      calendarState: calendarState,
      calendarDate: calendarDate,
      index: index,
      onMoveForword: this.onMoveForword,
      onMoveBackward: this.onMoveBackward,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      onToggleMonthDropdown: this.toggleMonthDropdown,
      onChangePageDate: this.handleChangePageDate,
      limitEndYear: limitEndYear,
      showWeekNumbers: showWeekNumbers
    });
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  index: PropTypes.number,
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onChangeCalendarDate: PropTypes.func
};
DatePicker.defaultProps = {
  value: [],
  calendarDate: [new Date(), addMonths(new Date(), 1)],
  format: 'YYYY-MM-DD',
  index: 0
};
export default DatePicker;