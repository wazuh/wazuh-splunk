import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { defaultProps, prefix } from '../utils';
import classNames from 'classnames';

var Badge =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Badge, _React$Component);

  function Badge() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Badge.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        contentText = _this$props.content,
        maxCount = _this$props.maxCount,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "children", "content", "maxCount"]);

    var addPrefix = prefix(classPrefix);
    var dot = contentText === undefined || contentText === null;
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('independent')] = !children, _classNames[addPrefix('wrapper')] = children, _classNames[addPrefix('dot')] = dot, _classNames));
    var content = // $FlowFixMe I'm sure contenxtText is number type and maxCount is number type.
    typeof contentText === 'number' && contentText > maxCount ? maxCount + "+" : contentText;

    if (!children) {
      return React.createElement("div", _extends({}, rest, {
        className: classes
      }), content);
    }

    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), children, React.createElement("div", {
      className: addPrefix('content')
    }, content));
  };

  return Badge;
}(React.Component);

Badge.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.node,
  maxCount: PropTypes.number
};
Badge.defaultProps = {
  maxCount: 99
};
export default defaultProps({
  classPrefix: 'badge'
})(Badge);