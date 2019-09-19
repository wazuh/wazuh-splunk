import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import { format, getMinutes, getHours, isSameDay, getSeconds, setHours, setMinutes, setSeconds } from 'date-fns';
import IntlProvider from '../IntlProvider';
import Calendar from '../Calendar/Calendar';
import Toolbar from './Toolbar';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import { shouldOnlyTime } from '../utils/formatUtils';
import composeFunctions from '../utils/composeFunctions';
import { defaultProps, getUnhandledProps, prefix, createChainedFunction, withPickerMethods } from '../utils';
import { PickerToggle, MenuWrapper, PickerToggleTrigger, getToggleWrapperClassName } from '../Picker';
import { PLACEMENT } from '../constants';

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DatePicker, _React$Component);

  function DatePicker(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.triggerRef = void 0;

    _this.onMoveForword = function (nextPageDate) {
      var _this$props = _this.props,
          onNextMonth = _this$props.onNextMonth,
          onChangeCalendarDate = _this$props.onChangeCalendarDate;

      _this.setState({
        pageDate: nextPageDate
      });

      onNextMonth && onNextMonth(nextPageDate);
      onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
    };

    _this.onMoveBackward = function (nextPageDate) {
      var _this$props2 = _this.props,
          onPrevMonth = _this$props2.onPrevMonth,
          onChangeCalendarDate = _this$props2.onChangeCalendarDate;

      _this.setState({
        pageDate: nextPageDate
      });

      onPrevMonth && onPrevMonth(nextPageDate);
      onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
    };

    _this.getValue = function () {
      return _this.props.value || _this.state.value;
    };

    _this.calendar = null;

    _this.handleChangePageDate = function (nextPageDate) {
      _this.setState({
        pageDate: nextPageDate,
        calendarState: undefined
      });

      _this.handleAllSelect(nextPageDate);
    };

    _this.handleChangePageTime = function (nextPageTime) {
      _this.setState({
        pageDate: nextPageTime
      });

      _this.handleAllSelect(nextPageTime);
    };

    _this.handleShortcutPageDate = function (value, closeOverlay, event) {
      _this.updateValue(event, value, closeOverlay);

      _this.handleAllSelect(value, event);
    };

    _this.handleOK = function (event) {
      var onOk = _this.props.onOk;

      _this.updateValue(event);

      onOk && onOk(_this.state.pageDate, event);
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

    _this.toggleMonthDropdown = function () {
      var calendarState = _this.state.calendarState;
      var onToggleMonthDropdown = _this.props.onToggleMonthDropdown;
      var toggle;

      if (calendarState === 'DROP_MONTH') {
        _this.hideDropdown();

        toggle = false;
      } else {
        _this.showMonthDropdown();

        toggle = true;
      }

      onToggleMonthDropdown && onToggleMonthDropdown(toggle);
    };

    _this.toggleTimeDropdown = function () {
      var calendarState = _this.state.calendarState;
      var onToggleTimeDropdown = _this.props.onToggleTimeDropdown;
      var toggle;

      if (calendarState === 'DROP_TIME') {
        _this.hideDropdown();

        toggle = false;
      } else {
        _this.showTimeDropdown();

        toggle = true;
      }

      onToggleTimeDropdown && onToggleTimeDropdown(toggle);
    };

    _this.handleClean = function (event) {
      _this.setState({
        pageDate: new Date()
      });

      _this.updateValue(event, null);
    };

    _this.handleAllSelect = function (nextValue, event) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          onChangeCalendarDate = _this$props3.onChangeCalendarDate;
      onSelect && onSelect(nextValue, event);
      onChangeCalendarDate && onChangeCalendarDate(nextValue, event);
    };

    _this.handleSelect = function (nextValue, event) {
      var oneTap = _this.props.oneTap;
      var pageDate = _this.state.pageDate;

      _this.setState({
        pageDate: composeFunctions(function (d) {
          return setHours(d, getHours(pageDate));
        }, function (d) {
          return setMinutes(d, getMinutes(pageDate));
        }, function (d) {
          return setSeconds(d, getSeconds(pageDate));
        })(nextValue)
      });

      _this.handleAllSelect(nextValue);

      if (oneTap) {
        _this.updateValue(event, nextValue);
      }
    };

    _this.handleEntered = function () {
      var onOpen = _this.props.onOpen;
      onOpen && onOpen();

      _this.setState({
        active: true
      });
    };

    _this.handleExit = function () {
      var onClose = _this.props.onClose;
      onClose && onClose();

      _this.setState({
        calendarState: undefined,
        active: false
      });
    };

    _this.disabledToolbarHandle = function (date) {
      var disabledDate = _this.props.disabledDate;
      var allowDate = disabledDate ? disabledDate(date) : false;
      var allowTime = disabledTime(_this.props, date);
      return allowDate || allowTime;
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    var defaultValue = props.defaultValue,
        _value = props.value,
        calendarDefaultDate = props.calendarDefaultDate;
    var activeValue = _value || defaultValue;
    _this.state = {
      value: activeValue,
      pageDate: activeValue || calendarDefaultDate || new Date() // display calendar date

    };
    _this.triggerRef = React.createRef(); // for test

    _this.menuContainerRef = React.createRef();
    return _this;
  }

  DatePicker.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (typeof nextProps.value !== 'undefined') {
      var value = nextProps.value;

      if (value && !isSameDay(value, prevState.value)) {
        return {
          value: value,
          pageDate: value
        };
      }

      return {
        value: value
      };
    }

    return null;
  };

  var _proto = DatePicker.prototype;

  _proto.getDateString = function getDateString() {
    var _this$props4 = this.props,
        placeholder = _this$props4.placeholder,
        formatType = _this$props4.format,
        renderValue = _this$props4.renderValue;
    var value = this.getValue();

    if (value) {
      return renderValue ? renderValue(value, formatType) : format(value, formatType);
    }

    return placeholder || formatType;
  };

  _proto.updateValue = function updateValue(event, nextPageDate, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }

    var pageDate = this.state.pageDate;
    var onChange = this.props.onChange;
    var value = this.getValue();
    var nextValue = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;
    this.setState({
      pageDate: nextValue || new Date(),
      value: nextValue
    });

    if (nextValue !== value || !isSameDay(nextValue, value)) {
      onChange && onChange(nextValue, event);
    } // `closeOverlay` default value is `true`


    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  };

  _proto.resetPageDate = function resetPageDate() {
    var calendarDefaultDate = this.props.calendarDefaultDate;
    var value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || new Date()
    });
  };

  _proto.showMonthDropdown = function showMonthDropdown() {
    this.setState({
      calendarState: 'DROP_MONTH'
    });
  };

  _proto.hideDropdown = function hideDropdown() {
    this.setState({
      calendarState: undefined
    });
  };

  _proto.showTimeDropdown = function showTimeDropdown() {
    this.setState({
      calendarState: 'DROP_TIME'
    });
  };

  _proto.renderCalendar = function renderCalendar() {
    var _this$props5 = this.props,
        format = _this$props5.format,
        isoWeek = _this$props5.isoWeek,
        limitEndYear = _this$props5.limitEndYear,
        disabledDate = _this$props5.disabledDate,
        showWeekNumbers = _this$props5.showWeekNumbers;
    var _this$state = this.state,
        calendarState = _this$state.calendarState,
        pageDate = _this$state.pageDate;

    var calendarProps = _.pick(this.props, calendarOnlyProps);

    return React.createElement(Calendar, _extends({}, calendarProps, {
      showWeekNumbers: showWeekNumbers,
      disabledDate: disabledDate,
      limitEndYear: limitEndYear,
      format: format,
      isoWeek: isoWeek,
      calendarState: calendarState,
      pageDate: pageDate,
      onMoveForword: this.onMoveForword,
      onMoveBackward: this.onMoveBackward,
      onSelect: this.handleSelect,
      onToggleMonthDropdown: this.toggleMonthDropdown,
      onToggleTimeDropdown: this.toggleTimeDropdown,
      onChangePageDate: this.handleChangePageDate,
      onChangePageTime: this.handleChangePageTime
    }));
  };

  _proto.renderDropdownMenu = function renderDropdownMenu(calendar) {
    var _this$props6 = this.props,
        ranges = _this$props6.ranges,
        menuClassName = _this$props6.menuClassName,
        oneTap = _this$props6.oneTap;
    var pageDate = this.state.pageDate;
    var classes = classNames(this.addPrefix('date-menu'), menuClassName);
    return React.createElement(MenuWrapper, {
      className: classes
    }, React.createElement("div", {
      ref: this.menuContainerRef
    }, calendar, React.createElement(Toolbar, {
      ranges: ranges,
      pageDate: pageDate,
      disabledHandle: this.disabledToolbarHandle,
      onShortcut: this.handleShortcutPageDate,
      onOk: this.handleOK,
      hideOkButton: oneTap
    })));
  };

  _proto.render = function render() {
    var _getToggleWrapperClas;

    var _this$props7 = this.props,
        inline = _this$props7.inline,
        className = _this$props7.className,
        disabled = _this$props7.disabled,
        cleanable = _this$props7.cleanable,
        classPrefix = _this$props7.classPrefix,
        format = _this$props7.format,
        locale = _this$props7.locale,
        toggleComponentClass = _this$props7.toggleComponentClass,
        style = _this$props7.style,
        onEntered = _this$props7.onEntered,
        onExited = _this$props7.onExited,
        onClean = _this$props7.onClean,
        rest = _objectWithoutPropertiesLoose(_this$props7, ["inline", "className", "disabled", "cleanable", "classPrefix", "format", "locale", "toggleComponentClass", "style", "onEntered", "onExited", "onClean"]);

    var value = this.getValue();
    var unhandled = getUnhandledProps(DatePicker, rest);
    var hasValue = !!value;
    var calendar = this.renderCalendar();

    if (inline) {
      return React.createElement(IntlProvider, {
        locale: locale
      }, React.createElement("div", {
        className: classNames(classPrefix, this.addPrefix('date-inline'), className)
      }, calendar));
    }

    var classes = getToggleWrapperClassName('date', this.addPrefix, this.props, hasValue, (_getToggleWrapperClas = {}, _getToggleWrapperClas[this.addPrefix('date-only-time')] = shouldOnlyTime(format), _getToggleWrapperClas));
    return React.createElement(IntlProvider, {
      locale: locale
    }, React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      onEntered: createChainedFunction(this.handleEntered, onEntered),
      onExit: createChainedFunction(this.handleExit, onExited),
      speaker: this.renderDropdownMenu(calendar)
    }, React.createElement(PickerToggle, _extends({}, unhandled, {
      componentClass: toggleComponentClass,
      onClean: createChainedFunction(this.handleClean, onClean),
      cleanable: cleanable && !disabled,
      hasValue: hasValue,
      active: this.state.active
    }), this.getDateString()))));
  };

  return DatePicker;
}(React.Component);

DatePicker.propTypes = {
  appearance: PropTypes.oneOf(['default', 'subtle']),
  ranges: PropTypes.array,
  defaultValue: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  calendarDefaultDate: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.object,
  inline: PropTypes.bool,
  cleanable: PropTypes.bool,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  classPrefix: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  containerPadding: PropTypes.number,
  block: PropTypes.bool,
  toggleComponentClass: PropTypes.elementType,
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  placement: PropTypes.oneOf(PLACEMENT),
  style: PropTypes.object,
  oneTap: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  onChange: PropTypes.func,
  onChangeCalendarDate: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onSelect: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onNextMonth: PropTypes.func,
  onOk: PropTypes.func,
  onClean: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  renderValue: PropTypes.func
};
DatePicker.defaultProps = {
  appearance: 'default',
  placement: 'bottomStart',
  limitEndYear: 1000,
  format: 'YYYY-MM-DD',
  placeholder: '',
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
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  },
  cleanable: true
};
polyfill(DatePicker);
var enhance = compose(defaultProps({
  classPrefix: 'picker'
}), withPickerMethods());
export default enhance(DatePicker);