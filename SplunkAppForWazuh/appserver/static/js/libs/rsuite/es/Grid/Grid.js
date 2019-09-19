import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';

var Grid =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Grid, _React$Component);

  function Grid() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Grid.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        fluid = _this$props.fluid,
        Component = _this$props.componentClass,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["fluid", "componentClass", "className", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(fluid ? addPrefix('fluid') : classPrefix, className);
    return React.createElement(Component, _extends({}, props, {
      className: classes
    }));
  };

  return Grid;
}(React.Component);

Grid.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  classPrefix: PropTypes.string,
  componentClass: PropTypes.elementType
};
export default defaultProps({
  componentClass: 'div',
  classPrefix: 'grid-container'
})(Grid);