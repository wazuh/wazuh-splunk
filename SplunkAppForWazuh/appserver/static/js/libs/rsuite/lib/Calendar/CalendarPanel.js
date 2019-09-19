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

var _dateFns = require("date-fns");

var _classnames = _interopRequireDefault(require("classnames"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _Button = _interopRequireDefault(require("../Button"));

var _IntlProvider = _interopRequireDefault(require("../IntlProvider"));

var _utils = require("../utils");

var CalendarPanel =
/*#__PURE__*/
function (_React$PureComponent) {
  (0, _inheritsLoose2.default)(CalendarPanel, _React$PureComponent);

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
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    };

    _this.renderToolbar = function () {
      var locale = _this.props.locale;
      return React.createElement(_Button.default, {
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
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["locale", "renderCell", "compact", "className", "isoWeek", "bordered"]);
    var showMonth = this.state.showMonth;
    var value = this.getValue();
    var classes = (0, _classnames.default)(this.addPrefix('panel'), className, (_classNames = {}, _classNames[this.addPrefix('bordered')] = bordered, _classNames[this.addPrefix('compact')] = compact, _classNames));
    return React.createElement(_IntlProvider.default, {
      locale: locale
    }, React.createElement(_Calendar.default, (0, _extends2.default)({
      className: classes,
      isoWeek: isoWeek,
      onSelect: this.handleSelect,
      format: "YYYY-MM-DD",
      calendarState: showMonth ? 'DROP_MONTH' : null,
      pageDate: value,
      renderTitle: function renderTitle(date) {
        return (0, _dateFns.format)(date, locale.titleFormat || 'MMMM  YYYY');
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
  value: _propTypes.default.instanceOf(Date),
  defaultValue: _propTypes.default.instanceOf(Date),
  isoWeek: _propTypes.default.bool,
  compact: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  locale: _propTypes.default.object,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  renderCell: _propTypes.default.func
};
CalendarPanel.defaultProps = {
  defaultValue: new Date(),
  locale: {}
};

var _default = (0, _utils.defaultProps)({
  classPrefix: 'calendar'
})(CalendarPanel);

exports.default = _default;
module.exports = exports.default;