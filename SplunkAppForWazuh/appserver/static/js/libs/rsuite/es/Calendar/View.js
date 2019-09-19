import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isSameMonth, setDate } from 'date-fns';
import { defaultProps, getMonthView } from '../utils';
import Table from './Table';
import composeFunctions from '../utils/composeFunctions';

var View =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(View, _React$PureComponent);

  function View() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.inSameThisMonthDate = function (date) {
      return composeFunctions(function (d) {
        return setDate(d, 1);
      }, function (d) {
        return isSameMonth(d, date);
      })(_this.props.activeDate);
    };

    return _this;
  }

  var _proto = View.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        activeDate = _this$props.activeDate,
        onSelect = _this$props.onSelect,
        disabledDate = _this$props.disabledDate,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        renderCell = _this$props.renderCell,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props, ["activeDate", "onSelect", "disabledDate", "className", "classPrefix", "isoWeek", "renderCell", "showWeekNumbers"]);

    var thisMonthDate = setDate(activeDate, 1);
    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), React.createElement(Table, {
      rows: getMonthView(thisMonthDate, isoWeek),
      isoWeek: isoWeek,
      selected: activeDate,
      onSelect: onSelect,
      inSameMonth: this.inSameThisMonthDate,
      disabledDate: disabledDate,
      renderCell: renderCell,
      showWeekNumbers: showWeekNumbers
    }));
  };

  return View;
}(React.PureComponent);

View.propTypes = {
  activeDate: PropTypes.instanceOf(Date),
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  renderCell: PropTypes.func
};
View.defaultProps = {
  activeDate: new Date()
};
var enhance = defaultProps({
  classPrefix: 'calendar-view'
});
export default enhance(View);