import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';

var PlaceholderParagraph =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(PlaceholderParagraph, _React$Component);

  function PlaceholderParagraph() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PlaceholderParagraph.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        className = _this$props.className,
        rows = _this$props.rows,
        rowHeight = _this$props.rowHeight,
        rowMargin = _this$props.rowMargin,
        graph = _this$props.graph,
        active = _this$props.active,
        classPrefix = _this$props.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "rows", "rowHeight", "rowMargin", "graph", "active", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(PlaceholderParagraph, rest);
    var classes = classNames(classPrefix, addPrefix('paragraph'), className, (_classNames = {}, _classNames[addPrefix('active')] = active, _classNames));
    var graphShape = graph === true ? 'square' : graph;
    var rowArr = [];

    for (var i = 0; i < rows; i++) {
      rowArr.push(React.createElement("p", {
        key: i,
        style: {
          width: Math.random() * 75 + 25 + "%",
          height: rowHeight,
          marginTop: i > 0 ? rowMargin : Number(rowMargin) / 2
        }
      }));
    }

    return React.createElement("div", _extends({
      className: classes
    }, unhandled), graphShape && React.createElement("div", {
      className: classNames(addPrefix('paragraph-graph'), (_classNames2 = {}, _classNames2[addPrefix('paragraph-graph-circle')] = graph === 'circle', _classNames2))
    }), React.createElement("div", {
      className: addPrefix('paragraph-rows')
    }, rowArr));
  };

  return PlaceholderParagraph;
}(React.Component);

PlaceholderParagraph.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  rows: PropTypes.number,
  rowHeight: PropTypes.number,
  rowMargin: PropTypes.number,
  graph: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['circle', 'square'])]),
  active: PropTypes.bool
};
PlaceholderParagraph.defaultProps = {
  rows: 2,
  rowHeight: 10,
  rowMargin: 20
};
export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderParagraph);