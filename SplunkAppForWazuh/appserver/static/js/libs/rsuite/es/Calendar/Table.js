import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableRow from './TableRow';
import TableHeaderRow from './TableHeaderRow';
import { defaultProps } from '../utils';

var Table =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Table, _React$PureComponent);

  function Table() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rows = _this$props.rows,
        selected = _this$props.selected,
        onSelect = _this$props.onSelect,
        disabledDate = _this$props.disabledDate,
        inSameMonth = _this$props.inSameMonth,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        renderCell = _this$props.renderCell,
        showWeekNumbers = _this$props.showWeekNumbers,
        rest = _objectWithoutPropertiesLoose(_this$props, ["rows", "selected", "onSelect", "disabledDate", "inSameMonth", "className", "classPrefix", "isoWeek", "renderCell", "showWeekNumbers"]);

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
        onSelect: onSelect,
        inSameMonth: inSameMonth,
        disabledDate: disabledDate,
        renderCell: renderCell,
        showWeekNumbers: showWeekNumbers
      });
    }));
  };

  return Table;
}(React.PureComponent);

Table.propTypes = {
  rows: PropTypes.array,
  isoWeek: PropTypes.bool,
  selected: PropTypes.instanceOf(Date),
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  renderCell: PropTypes.func
};
Table.defaultProps = {
  rows: []
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(Table);