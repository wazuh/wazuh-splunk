import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { format, addDays, isBefore, isAfter, isSameDay, isSameMonth, addMonths, startOfISOWeek, endOfISOWeek, startOfWeek, endOfWeek, startOfMonth, endOfMonth, compareAsc } from 'date-fns';
import IntlProvider from '../IntlProvider';
import Toolbar from './Toolbar';
import DatePicker from './DatePicker';
import { setTimingMargin, getCalendarDate, TYPE } from './utils';
import { defaultProps, getUnhandledProps, prefix, createChainedFunction, withPickerMethods } from '../utils';
import { PickerToggle, MenuWrapper, PickerToggleTrigger, getToggleWrapperClassName } from '../Picker';
import { PLACEMENT } from '../constants';

var DateRangePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateRangePicker, _React$Component);

  DateRangePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value;

    if (typeof value === 'undefined') {
      return null;
    }

    if (value[0] && !isSameDay(value[0], prevState.value[0]) || value[1] && !isSameDay(value[1], prevState.value[1])) {
      return {
        value: value,
        selectValue: value,
        calendarDate: getCalendarDate(value)
      };
    }

    return null;
  };

  function DateRangePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.triggerRef = void 0;

    _this.getValue = function () {
      var value = _this.props.value;

      if (typeof value !== 'undefined') {
        return value;
      }

      return _this.state.value || [];
    };

    _this.getWeekHoverRange = function (date) {
      var isoWeek = _this.props.isoWeek;

      if (isoWeek) {
        // set to the first day of this week according to ISO 8601, 12:00 am
        return [startOfISOWeek(date), endOfISOWeek(date)];
      }

      return [startOfWeek(date), endOfWeek(date)];
    };

    _this.getMonthHoverRange = function (date) {
      return [startOfMonth(date), endOfMonth(date)];
    };

    _this.handleChangeCalendarDate = function (index, date) {
      var calendarDate = _this.state.calendarDate;
      calendarDate[index] = date;

      _this.setState({
        calendarDate: calendarDate
      });
    };

    _this.handleCloseDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.hide();
      }
    };

    _this.handleOpenDropdown = function () {
      if (_this.triggerRef.current) {
        _this.triggerRef.current.show();
      }
    };

    _this.handleShortcutPageDate = function (value, closeOverlay, event) {
      _this.updateValue(event, value, closeOverlay);
    };

    _this.handleOK = function (event) {
      var onOk = _this.props.onOk;

      _this.updateValue(event);

      onOk && onOk(_this.state.selectValue, event);
    };

    _this.handleChangeSelectValue = function (date, event) {
      var _this$state = _this.state,
          selectValue = _this$state.selectValue,
          doneSelected = _this$state.doneSelected;
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          oneTap = _this$props.oneTap;
      var nextValue = [];

      var nextHoverValue = _this.getHoverRange(date);

      if (doneSelected) {
        if (nextHoverValue.length) {
          nextValue = [nextHoverValue[0], nextHoverValue[1], date];
          nextHoverValue = [nextHoverValue[0], nextHoverValue[1], date];
        } else {
          nextValue = [date, undefined, date];
        }
      } else {
        if (nextHoverValue.length) {
          nextValue = [selectValue[0], selectValue[1]];
        } else {
          nextValue = [selectValue[0], date];
        }

        if (isAfter(nextValue[0], nextValue[1])) {
          nextValue.reverse();
        }

        nextValue[0] = setTimingMargin(nextValue[0]);
        nextValue[1] = setTimingMargin(nextValue[1]);

        _this.setState({
          calendarDate: getCalendarDate(nextValue)
        });
      }

      var nextState = {
        doneSelected: !doneSelected,
        selectValue: nextValue,
        hoverValue: nextHoverValue
      };

      _this.setState(nextState, function () {
        // 如果是单击模式，并且是第一次点选，再触发一次点击
        if (oneTap && !_this.state.doneSelected) {
          _this.handleChangeSelectValue(date, event);
        } // 如果是单击模式，并且是第二次点选，更新值，并关闭面板


        if (oneTap && _this.state.doneSelected) {
          _this.updateValue(event);
        }

        onSelect && onSelect(date);
      });
    };

    _this.handleMouseMoveSelectValue = function (date) {
      var _this$state2 = _this.state,
          doneSelected = _this$state2.doneSelected,
          selectValue = _this$state2.selectValue,
          hoverValue = _this$state2.hoverValue,
          currentHoverDate = _this$state2.currentHoverDate;
      var hoverRange = _this.props.hoverRange;

      if (currentHoverDate && isSameDay(date, currentHoverDate)) {
        return;
      }

      var nextHoverValue = _this.getHoverRange(date);

      if (doneSelected && !_.isUndefined(hoverRange)) {
        _this.setState({
          currentHoverDate: date,
          hoverValue: nextHoverValue
        });

        return;
      } else if (doneSelected) {
        return;
      }

      var nextValue = selectValue;

      if (!nextHoverValue.length) {
        nextValue[1] = date;
      } else if (hoverValue) {
        nextValue = [isBefore(nextHoverValue[0], hoverValue[0]) ? nextHoverValue[0] : hoverValue[0], isAfter(nextHoverValue[1], hoverValue[1]) ? nextHoverValue[1] : hoverValue[1], nextValue[2]];
      } // If `nextValue[0]` is greater than `nextValue[1]` then reverse order


      if (isAfter(nextValue[0], nextValue[1])) {
        nextValue.reverse();
      }

      _this.setState({
        currentHoverDate: date,
        selectValue: nextValue
      });
    };

    _this.handleClean = function (event) {
      _this.setState({
        calendarDate: [new Date(), addMonths(new Date(), 1)]
      });

      _this.updateValue(event, []);
    };

    _this.handleEnter = function () {
      var value = _this.getValue();

      var calendarDate;

      if (value && value.length) {
        var startDate = value[0],
            endData = value[1];
        calendarDate = [startDate, isSameMonth(startDate, endData) ? addMonths(endData, 1) : endData];
      } else {
        calendarDate = [new Date(), addMonths(new Date(), 1)];
      }

      _this.setState({
        selectValue: value,
        calendarDate: calendarDate,
        active: true
      });
    };

    _this.handleEntered = function () {
      var onOpen = _this.props.onOpen;
      onOpen && onOpen();
    };

    _this.handleExit = function () {
      var onClose = _this.props.onClose;

      _this.setState({
        active: false,
        doneSelected: true
      });

      onClose && onClose();
    };

    _this.disabledOkButton = function () {
      var _this$state3 = _this.state,
          selectValue = _this$state3.selectValue,
          doneSelected = _this$state3.doneSelected;

      if (!selectValue[0] || !selectValue[1] || !doneSelected) {
        return true;
      }

      return _this.disabledByBetween(selectValue[0], selectValue[1], TYPE.TOOLBAR_BUTTON_OK);
    };

    _this.disabledShortcutButton = function (value) {
      if (value === void 0) {
        value = [];
      }

      if (!value[0] || !value[1]) {
        return true;
      }

      return _this.disabledByBetween(value[0], value[1], TYPE.TOOLBAR_SHORTCUT);
    };

    _this.handleDisabledDate = function (date, values, type) {
      var disabledDate = _this.props.disabledDate;
      var doneSelected = _this.state.doneSelected;

      if (disabledDate) {
        return disabledDate(date, values, doneSelected, type);
      }

      return false;
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    var defaultValue = props.defaultValue,
        _value = props.value;
    var activeValue = _value || defaultValue || [];

    var _calendarDate = getCalendarDate(activeValue);

    _this.state = {
      value: activeValue,
      selectValue: activeValue,
      doneSelected: true,
      calendarDate: _calendarDate,
      hoverValue: [],
      currentHoverDate: null
    }; // for test

    _this.menuContainerRef = React.createRef();
    _this.triggerRef = React.createRef();
    return _this;
  }

  var _proto = DateRangePicker.prototype;

  _proto.getDateString = function getDateString(value) {
    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        formatType = _this$props2.format,
        renderValue = _this$props2.renderValue;
    var nextValue = value || this.getValue();

    var startDate = _.get(nextValue, '0');

    var endDate = _.get(nextValue, '1');

    if (startDate && endDate) {
      var displayValue = [startDate, endDate].sort(compareAsc);
      return renderValue ? renderValue(displayValue, formatType) : format(displayValue[0], formatType) + " ~ " + format(displayValue[1], formatType);
    }

    return placeholder || formatType + " ~ " + formatType;
  } // hover range presets
  ;

  _proto.getHoverRange = function getHoverRange(date) {
    var hoverRange = this.props.hoverRange;

    if (!hoverRange) {
      return [];
    }

    var hoverRangeFunc = hoverRange;

    if (hoverRange === 'week') {
      hoverRangeFunc = this.getWeekHoverRange;
    }

    if (hoverRangeFunc === 'month') {
      hoverRangeFunc = this.getMonthHoverRange;
    }

    if (typeof hoverRangeFunc !== 'function') {
      return [];
    }

    var hoverValues = hoverRangeFunc(date);
    var isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;

    if (!isHoverRangeValid) {
      return [];
    }

    if (isAfter(hoverValues[0], hoverValues[1])) {
      hoverValues.reverse();
    }

    return hoverValues;
  };

  _proto.resetPageDate = function resetPageDate() {
    var selectValue = this.getValue();
    var calendarDate = getCalendarDate(selectValue);
    this.setState({
      selectValue: selectValue,
      calendarDate: calendarDate
    });
  }
  /**
   * Toolbar operation callback function
   */
  ;

  _proto.updateValue = function updateValue(event, nextSelectValue, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }

    var _this$state4 = this.state,
        value = _this$state4.value,
        selectValue = _this$state4.selectValue;
    var onChange = this.props.onChange;
    var nextValue = !_.isUndefined(nextSelectValue) ? nextSelectValue : selectValue;
    this.setState({
      selectValue: nextValue || [],
      value: nextValue
    });

    if (onChange && (!isSameDay(nextValue[0], value[0]) || !isSameDay(nextValue[1], value[1]))) {
      onChange(nextValue, event);
    } // `closeOverlay` default value is `true`


    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  };

  _proto.disabledByBetween = function disabledByBetween(start, end, type) {
    var disabledDate = this.props.disabledDate;
    var _this$state5 = this.state,
        selectValue = _this$state5.selectValue,
        doneSelected = _this$state5.doneSelected;
    var selectStartDate = selectValue[0];
    var selectEndDate = selectValue[1];
    var nextSelectValue = [selectStartDate, selectEndDate]; // If the date is between the start and the end
    // the button is disabled

    while (isBefore(start, end) || isSameDay(start, end)) {
      if (disabledDate && disabledDate(start, nextSelectValue, doneSelected, type)) {
        return true;
      }

      start = addDays(start, 1);
    }

    return false;
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this$props3 = this.props,
        menuClassName = _this$props3.menuClassName,
        ranges = _this$props3.ranges,
        isoWeek = _this$props3.isoWeek,
        limitEndYear = _this$props3.limitEndYear,
        oneTap = _this$props3.oneTap,
        showWeekNumbers = _this$props3.showWeekNumbers;
    var _this$state6 = this.state,
        calendarDate = _this$state6.calendarDate,
        selectValue = _this$state6.selectValue,
        hoverValue = _this$state6.hoverValue,
        doneSelected = _this$state6.doneSelected;
    var classes = classNames(this.addPrefix('daterange-menu'), menuClassName);
    var pickerProps = {
      isoWeek: isoWeek,
      doneSelected: doneSelected,
      hoverValue: hoverValue,
      calendarDate: calendarDate,
      limitEndYear: limitEndYear,
      showWeekNumbers: showWeekNumbers,
      value: selectValue,
      disabledDate: this.handleDisabledDate,
      onSelect: this.handleChangeSelectValue,
      onMouseMove: this.handleMouseMoveSelectValue,
      onChangeCalendarDate: this.handleChangeCalendarDate
    };
    return React.createElement(MenuWrapper, {
      className: classes,
      ref: this.menuContainerRef
    }, React.createElement("div", {
      className: this.addPrefix('daterange-panel')
    }, React.createElement("div", {
      className: this.addPrefix('daterange-content')
    }, React.createElement("div", {
      className: this.addPrefix('daterange-header')
    }, this.getDateString(selectValue)), React.createElement("div", {
      className: this.addPrefix('daterange-calendar-group')
    }, React.createElement(DatePicker, _extends({
      index: 0
    }, pickerProps)), React.createElement(DatePicker, _extends({
      index: 1
    }, pickerProps)))), React.createElement(Toolbar, {
      ranges: ranges,
      selectValue: selectValue,
      disabledOkButton: this.disabledOkButton,
      disabledShortcutButton: this.disabledShortcutButton,
      onShortcut: this.handleShortcutPageDate,
      onOk: this.handleOK,
      hideOkButton: oneTap
    })));
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        disabled = _this$props4.disabled,
        cleanable = _this$props4.cleanable,
        locale = _this$props4.locale,
        toggleComponentClass = _this$props4.toggleComponentClass,
        style = _this$props4.style,
        onEntered = _this$props4.onEntered,
        onEnter = _this$props4.onEnter,
        onExited = _this$props4.onExited,
        onClean = _this$props4.onClean,
        rest = _objectWithoutPropertiesLoose(_this$props4, ["disabled", "cleanable", "locale", "toggleComponentClass", "style", "onEntered", "onEnter", "onExited", "onClean"]);

    var value = this.getValue();
    var unhandled = getUnhandledProps(DateRangePicker, rest);
    var hasValue = value && value.length > 1;
    var classes = getToggleWrapperClassName('daterange', this.addPrefix, this.props, hasValue);
    return React.createElement(IntlProvider, {
      locale: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      onEnter: createChainedFunction(this.handleEnter, onEnter),
      onEntered: createChainedFunction(this.handleEntered, onEntered),
      onExit: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu()
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), this.getDateString()))));
  };

  return DateRangePicker;
}(React.Component);

DateRangePicker.propTypes = {
  appearance: PropTypes.oneOf(['default', 'subtle']),
  ranges: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  placeholder: PropTypes.node,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.object,
  hoverRange: PropTypes.oneOfType([PropTypes.oneOf(['week', 'month']), PropTypes.func]),
  cleanable: PropTypes.bool,
  isoWeek: PropTypes.bool,
  oneTap: PropTypes.bool,
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  classPrefix: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  containerPadding: PropTypes.number,
  block: PropTypes.bool,
  toggleComponentClass: PropTypes.elementType,
  style: PropTypes.object,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  placement: PropTypes.oneOf(PLACEMENT),
  preventOverflow: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  onClean: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  renderValue: PropTypes.func
};
DateRangePicker.defaultProps = {
  appearance: 'default',
  placement: 'bottomStart',
  limitEndYear: 1000,
  format: 'YYYY-MM-DD',
  placeholder: '',
  cleanable: true,
  locale: {
    sunday: 'Su',
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    ok: 'OK',
    today: 'Today',
    yesterday: 'Yesterday',
    last7Days: 'Last 7 Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  }
};
var enhance = compose(defaultProps({
  classPrefix: 'picker'
}), withPickerMethods());
export default enhance(DateRangePicker);