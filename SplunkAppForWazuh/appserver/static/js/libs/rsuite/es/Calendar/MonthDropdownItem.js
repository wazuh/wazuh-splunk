import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import { setYear } from 'date-fns';
import { setMonth } from 'date-fns';
import composeFunctions from '../utils/composeFunctions';

var MonthDropdownItem =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(MonthDropdownItem, _React$PureComponent);

  function MonthDropdownItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          month = _this$props.month,
          year = _this$props.year,
          date = _this$props.date,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (year && month && date) {
        var nextMonth = composeFunctions(function (d) {
          return setYear(d, year);
        }, function (d) {
          return setMonth(d, month - 1);
        })(date);
        onSelect && onSelect(nextMonth, event);
      }
    };

    return _this;
  }

  var _proto = MonthDropdownItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        month = _this$props2.month,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["className", "classPrefix", "month", "active", "disabled"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(MonthDropdownItem, rest);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames.disabled = disabled, _classNames));
    return React.createElement("div", _extends({}, unhandled, {
      className: classes,
      onClick: this.handleClick,
      key: month,
      role: "button",
      tabIndex: "-1"
    }), React.createElement("span", {
      className: addPrefix('content')
    }, month));
  };

  return MonthDropdownItem;
}(React.PureComponent);

MonthDropdownItem.propTypes = {
  date: PropTypes.instanceOf(Date),
  month: PropTypes.number,
  year: PropTypes.number,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool
};
MonthDropdownItem.defaultProps = {
  month: 0
};
var enhance = defaultProps({
  classPrefix: 'calendar-month-dropdown-cell'
});
export default enhance(MonthDropdownItem);