import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

var TagGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TagGroup, _React$Component);

  function TagGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TagGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix", "children"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, rest, {
      className: classes
    }), children);
  };

  return TagGroup;
}(React.Component);

TagGroup.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node
};
export default defaultProps({
  classPrefix: 'tag-group'
})(TagGroup);