import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import StepItem from './StepItem';
import { prefix, defaultProps, ReactChildren, isIE10 } from '../utils';

var Steps =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Steps, _React$Component);

  function Steps() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Steps.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        children = _this$props.children,
        vertical = _this$props.vertical,
        small = _this$props.small,
        current = _this$props.current,
        currentStatus = _this$props.currentStatus,
        rest = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "className", "children", "vertical", "small", "current", "currentStatus"]);

    var addPrefix = prefix(classPrefix);
    var horizontal = !vertical;
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('small')] = small, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('horizontal')] = horizontal, _classNames));

    var count = _.get(children, 'length');

    var items = ReactChildren.mapCloneElement(children, function (item, index) {
      var _itemStyles;

      var itemStyles = (_itemStyles = {}, _itemStyles[isIE10() ? 'msFlexPreferredSize' : 'flexBasis'] = index < count - 1 ? 100 / (count - 1) + "%" : undefined, _itemStyles.maxWidth = index === count - 1 ? 100 / count + "%" : undefined, _itemStyles);

      var itemProps = _extends({
        stepNumber: index + 1,
        status: 'wait',
        style: horizontal ? itemStyles : undefined
      }, item.props); // fix tail color


      if (currentStatus === 'error' && index === current - 1) {
        itemProps.className = addPrefix('next-error');
      }

      if (!item.props.status) {
        if (index === current) {
          itemProps.status = currentStatus;
        } else if (index < current) {
          itemProps.status = 'finish';
        }
      }

      return itemProps;
    });
    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), items);
  };

  return Steps;
}(React.Component);

Steps.propTypes = {
  classPrefix: PropTypes.string,
  vertical: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  current: PropTypes.number,
  currentStatus: PropTypes.oneOf(['finish', 'wait', 'process', 'error'])
};
Steps.defaultProps = {
  currentStatus: 'process',
  current: 0
};
var EnhancedSteps = defaultProps({
  classPrefix: 'steps'
})(Steps);
setStatic('Item', StepItem)(EnhancedSteps);
export default EnhancedSteps;