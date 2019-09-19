import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withStyleProps, defaultProps, prefix } from '../utils';

var ButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ButtonGroup, _React$Component);

  function ButtonGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        vertical = _this$props.vertical,
        children = _this$props.children,
        block = _this$props.block,
        justified = _this$props.justified,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "vertical", "children", "block", "justified", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('block')] = block, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('justified')] = justified, _classNames));
    /**
     * After you set up justified, you use the table layout.
     * display:table-cell not working on button element.
     * So change 'a'
     */

    var items = children;

    if (justified) {
      items = React.Children.map(children, function (child) {
        return React.cloneElement(child, {
          componentClass: 'a',
          role: 'button'
        });
      });
    }

    return React.createElement("div", _extends({
      role: "group"
    }, props, {
      className: classes
    }), items);
  };

  return ButtonGroup;
}(React.Component);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  block: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'btn-group'
}))(ButtonGroup);