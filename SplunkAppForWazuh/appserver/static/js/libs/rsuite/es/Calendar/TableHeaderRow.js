import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps } from '../utils';
import FormattedMessage from '../IntlProvider/FormattedMessage';
var weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

var TableHeaderRow =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(TableHeaderRow, _React$PureComponent);

  function TableHeaderRow() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = TableHeaderRow.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        isoWeek = _this$props.isoWeek,
        showWeekNumbers = _this$props.showWeekNumbers,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "isoWeek", "showWeekNumbers"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(addPrefix('row'), addPrefix('header-row'), className);
    var items = weekKeys;

    if (isoWeek) {
      items = weekKeys.filter(function (v) {
        return v !== 'sunday';
      });
      items.push('sunday');
    }

    return React.createElement("div", _extends({}, props, {
      className: classes
    }), showWeekNumbers && React.createElement("div", {
      className: addPrefix('cell')
    }), items.map(function (key) {
      return React.createElement("div", {
        key: key,
        className: addPrefix('cell')
      }, React.createElement("span", {
        className: addPrefix('cell-content')
      }, React.createElement(FormattedMessage, {
        id: key
      })));
    }));
  };

  return TableHeaderRow;
}(React.PureComponent);

TableHeaderRow.propTypes = {
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
var enhance = defaultProps({
  classPrefix: 'calendar-table'
});
export default enhance(TableHeaderRow);