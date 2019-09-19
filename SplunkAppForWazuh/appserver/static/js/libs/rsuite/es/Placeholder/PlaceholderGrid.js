import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, getUnhandledProps, prefix } from '../utils';

var PlaceholderGrid =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PlaceholderGrid, _React$Component);

  function PlaceholderGrid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlaceholderGrid.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rows = _this$props.rows,
        columns = _this$props.columns,
        rowHeight = _this$props.rowHeight,
        rowMargin = _this$props.rowMargin,
        active = _this$props.active,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "rows", "columns", "rowHeight", "rowMargin", "active"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(PlaceholderGrid, rest);
    var classes = classNames(classPrefix, addPrefix('grid'), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    var colItems = [];
    var firstRowItemWidth = Math.random() * 30 + 30;
    var itemWidth = firstRowItemWidth / 2;

    for (var i = 0; i < columns; i++) {
      var rowItems = [];

      for (var j = 0; j < rows; j++) {
        var widthPercent = Math.random() * 50 + 10; // when first column

        if (i > 0) {
          // when other columns
          widthPercent = j > 0 ? itemWidth : firstRowItemWidth;
        }

        rowItems.push(React.createElement("p", {
          key: j,
          style: {
            width: widthPercent + "%",
            height: rowHeight,
            marginTop: j > 0 ? rowMargin : null
          }
        }));
      }

      colItems.push(React.createElement("div", {
        key: i,
        className: classNames(addPrefix('grid-col'))
      }, rowItems));
    }

    return React.createElement("div", _extends({
      className: classes
    }, unhandled), colItems);
  };

  return PlaceholderGrid;
}(React.Component);

PlaceholderGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  rows: PropTypes.number,
  columns: PropTypes.number,
  rowHeight: PropTypes.number,
  rowMargin: PropTypes.number,
  active: PropTypes.bool
};
PlaceholderGrid.defaultProps = {
  rows: 5,
  columns: 5,
  rowHeight: 10,
  rowMargin: 20
};
export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderGrid);