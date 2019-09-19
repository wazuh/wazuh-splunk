import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setDate, isSameMonth } from 'date-fns';
import Table from './Table';
import { defaultProps, getMonthView } from '../../utils';

var View =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(View, _React$Component);

  function View() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.inSameThisMonthDate = function (date) {
      var thisMonthDate = setDate(_this.props.activeDate, 1);
      return isSameMonth(date, thisMonthDate);
    };

    return _this;
  }

  var _proto = View.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        activeDate = _this$props.activeDate,
        value = _this$props.value,
        hoverValue = _this$props.hoverValue,
        onSelect = _this$props.onSelect,
        onMouseMove = _this$props.onMouseMove,
        disabledDate = _this$props.disabledDate,
        className = _this$props.className,
        isoWeek = _this$props.isoWeek,
        classPrefix = _this$props.classPrefix,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props, ["activeDate", "value", "hoverValue", "onSelect", "onMouseMove", "disabledDate", "className", "isoWeek", "classPrefix", "showWeekNumbers"]);

    var thisMonthDate = setDate(activeDate, 1);
    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), React.createElement(Table, {
      rows: getMonthView(thisMonthDate, isoWeek),
      isoWeek: isoWeek,
      selected: value,
      onSelect: onSelect,
      onMouseMove: onMouseMove,
      inSameMonth: this.inSameThisMonthDate,
      disabledDate: disabledDate,
      hoverValue: hoverValue,
      showWeekNumbers: showWeekNumbers
    }));
  };

  return View;
}(React.Component);

View.propTypes = {
  activeDate: PropTypes.instanceOf(Date),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  disabledDate: PropTypes.func,
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
View.defaultProps = {
  activeDate: new Date()
};
var enhance = defaultProps({
  classPrefix: 'calendar-view'
});
export default enhance(View);