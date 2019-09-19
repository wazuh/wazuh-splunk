import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toggleClass } from 'dom-lib';
import { prefix, getUnhandledProps } from '../utils';

var DropdownMenuGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenuGroup, _React$Component);

  function DropdownMenuGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.groupRef = void 0;

    _this.handleClickGroup = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          classPrefix = _this$props.classPrefix;
      toggleClass(_this.groupRef.current, classPrefix + "-closed");
      onClick && onClick(event);
    };

    _this.groupRef = React.createRef();
    return _this;
  }

  var _proto = DropdownMenuGroup.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        title = _this$props2.title,
        children = _this$props2.children,
        classPrefix = _this$props2.classPrefix,
        className = _this$props2.className,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["title", "children", "classPrefix", "className"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className);
    var unhandled = getUnhandledProps(DropdownMenuGroup, rest);
    return React.createElement("li", _extends({}, unhandled, {
      className: classes,
      ref: this.groupRef
    }), React.createElement("div", {
      className: addPrefix('title'),
      role: "menuitem",
      tabIndex: -1,
      onClick: this.handleClickGroup
    }, React.createElement("span", null, title), React.createElement("span", {
      className: addPrefix('caret')
    })), React.createElement("ul", {
      className: addPrefix('children')
    }, children));
  };

  return DropdownMenuGroup;
}(React.Component);

DropdownMenuGroup.propTypes = {
  title: PropTypes.node,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};
DropdownMenuGroup.defaultProps = {
  classPrefix: 'dropdown-menu-group'
};
export default DropdownMenuGroup;