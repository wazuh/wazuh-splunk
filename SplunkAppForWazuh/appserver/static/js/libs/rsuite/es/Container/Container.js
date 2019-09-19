import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps, prefix } from '../utils';

var Container =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Container, _React$Component);

  function Container() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Container.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        _this$props$children = _this$props.children,
        children = _this$props$children === void 0 ? [] : _this$props$children,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "children", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var hasSidebar = false;
    React.Children.forEach(children, function (item) {
      if (_.get(item, 'type.displayName') === 'Sidebar') {
        hasSidebar = true;
      }
    });
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('has-sidebar')] = hasSidebar, _classNames));
    return React.createElement("div", _extends({}, props, {
      className: classes
    }), children);
  };

  return Container;
}(React.Component);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};
export default defaultProps({
  classPrefix: 'container'
})(Container);