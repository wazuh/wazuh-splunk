import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix } from '../utils';

var FlexboxGridItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FlexboxGridItem, _React$Component);

  function FlexboxGridItem() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FlexboxGridItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        colspan = _this$props.colspan,
        order = _this$props.order,
        Component = _this$props.componentClass,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "colspan", "order", "componentClass"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(className, classPrefix, (_classNames = {}, _classNames[addPrefix("" + colspan)] = colspan >= 0, _classNames[addPrefix("order-" + order)] = order, _classNames));
    return React.createElement(Component, _extends({}, props, {
      className: classes
    }));
  };

  return FlexboxGridItem;
}(React.Component);

FlexboxGridItem.propTypes = {
  className: PropTypes.string,
  colspan: PropTypes.number,
  order: PropTypes.number,
  classPrefix: PropTypes.string,
  componentClass: PropTypes.elementType
};
FlexboxGridItem.defaultProps = {
  componentClass: 'div',
  colspan: 0,
  order: 0
};
export default defaultProps({
  classPrefix: 'flex-box-grid-item'
})(FlexboxGridItem);