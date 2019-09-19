import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import classNames from 'classnames';
import Calendar from './Calendar';
import Button from '../Button';
import IntlProvider from '../IntlProvider';
import { defaultProps, prefix } from '../utils';

var CalendarPanel =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(CalendarPanel, _React$PureComponent);

  function CalendarPanel(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _this.handleToggleMonthDropdown = function () {
      _this.setState({
        showMonth: !_this.state.showMonth
      });
    };

    _this.handleChangePageDate = function (nextValue) {
      var onChange = _this.props.onChange;

      _this.setState({
        value: nextValue,
        showMonth: false
      });

      onChange && onChange(nextValue);
    };

    _this.handleClickToday = function () {
      var onChange = _this.props.onChange;
      var nextValue = new Date();

      _this.setState({
        showMonth: false,
        value: nextValue
      });

      onChange && onChange(nextValue);
    };

    _this.handleNextMonth = function (nextValue) {
      var onChange = _this.props.onChange;

      _this.setState({
        value: nextValue
      });

      onChange && onChange(nextValue);
    };

    _this.handlePrevMonth = function (nextValue) {
      var onChange = _this.props.onChange;

      _this.setState({
        value: nextValue
      });

      onChange && onChange(nextValue);
    };

    _this.handleSelect = function (nextValue) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          onChange = _this$props.onChange;

      _this.setState({
        value: nextValue
      });

      onSelect && onSelect(nextValue);
      onChange && onChange(nextValue);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.renderToolbar = function () {
      var locale = _this.props.locale;
      return React.createElement(Button, {
        className: _this.addPrefix('btn-today'),
        onClick: _this.handleClickToday
      }, locale.today || 'Today');
    };

    _this.state = {
      value: props.defaultValue,
      showMonth: false
    };
    return _this;
  }

  var _proto = CalendarPanel.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;

    if (typeof value === 'undefined') {
      return this.state.value;
    }

    return value;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        locale = _this$props2.locale,
        renderCell = _this$props2.renderCell,
        compact = _this$props2.compact,
        className = _this$props2.className,
        isoWeek = _this$props2.isoWeek,
        bordered = _this$props2.bordered,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["locale", "renderCell", "compact", "className", "isoWeek", "bordered"]);

    var showMonth = this.state.showMonth;
    var value = this.getValue();
    var classes = classNames(this.addPrefix('panel'), className, (_classNames = {}, _classNames[this.addPrefix('bordered')] = bordered, _classNames[this.addPrefix('compact')] = compact, _classNames));
    return React.createElement(IntlProvider, {
      locale: locale
    }, React.createElement(Calendar, _extends({
      className: classes,
      isoWeek: isoWeek,
      onSelect: this.handleSelect,
      format: "YYYY-MM-DD",
      calendarState: showMonth ? 'DROP_MONTH' : null,
      pageDate: value,
      renderTitle: function renderTitle(date) {
        return format(date, locale.titleFormat || 'MMMM  YYYY');
      },
      renderToolbar: this.renderToolbar,
      renderCell: renderCell,
      onMoveForword: this.handleNextMonth,
      onMoveBackward: this.handlePrevMonth,
      onToggleMonthDropdown: this.handleToggleMonthDropdown,
      onChangePageDate: this.handleChangePageDate,
      limitEndYear: 1000
    }, rest)));
  };

  return CalendarPanel;
}(React.PureComponent);

CalendarPanel.propTypes = {
  value: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  isoWeek: PropTypes.bool,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  renderCell: PropTypes.func
};
CalendarPanel.defaultProps = {
  defaultValue: new Date(),
  locale: {}
};
export default defaultProps({
  classPrefix: 'calendar'
})(CalendarPanel);