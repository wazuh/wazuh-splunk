import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import { defaultProps, prefix } from '../utils';
import FlexboxGridItem from './FlexboxGridItem';

var FlexboxGrid =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FlexboxGrid, _React$Component);

  function FlexboxGrid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FlexboxGrid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        align = _this$props.align,
        justify = _this$props.justify,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "align", "justify"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, addPrefix(align), addPrefix(justify));
    return React.createElement("div", _extends({}, props, {
      className: classes
    }));
  };

  return FlexboxGrid;
}(React.Component);

FlexboxGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
};
FlexboxGrid.defaultProps = {
  align: 'top',
  justify: 'start'
};
var EnhancedFlexboxGrid = defaultProps({
  classPrefix: 'flex-box-grid'
})(FlexboxGrid);
setStatic('Item', FlexboxGridItem)(EnhancedFlexboxGrid);
export default EnhancedFlexboxGrid;