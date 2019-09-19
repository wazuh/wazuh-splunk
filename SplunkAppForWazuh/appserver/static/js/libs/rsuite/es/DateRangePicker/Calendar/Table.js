import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../../utils';
import TableRow from './TableRow';
import TableHeaderRow from '../../Calendar/TableHeaderRow';

var Table =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Table, _React$Component);

  function Table() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rows = _this$props.rows,
        selected = _this$props.selected,
        hoverValue = _this$props.hoverValue,
        onSelect = _this$props.onSelect,
        onMouseMove = _this$props.onMouseMove,
        disabledDate = _this$props.disabledDate,
        inSameMonth = _this$props.inSameMonth,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props, ["rows", "selected", "hoverValue", "onSelect", "onMouseMove", "disabledDate", "inSameMonth", "className", "classPrefix", "isoWeek", "showWeekNumbers"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), React.createElement(TableHeaderRow, {
      isoWeek: isoWeek,
      showWeekNumbers: showWeekNumbers
    }), rows.map(function (week, index) {
      return React.createElement(TableRow
      /* eslint-disable */
      , {
        key: index,
        weekendDate: week,
        selected: selected,
        hoverValue: hoverValue,
        onSelect: onSelect,
        onMouseMove: onMouseMove,
        inSameMonth: inSameMonth,
        disabledDate: disabledDate,
        showWeekNumbers: showWeekNumbers
      });
    }));
  };

  return Table;
}(React.Component);

Table.propTypes = {
  rows: PropTypes.array,
  isoWeek: PropTypes.bool,
  selected: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func
};
Table.defaultProps = {
  rows: []
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(Table);