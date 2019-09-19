import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps, prefix, placementPolyfill } from '../utils';
import { PLACEMENT_8 } from '../constants';

var ErrorMessage =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ErrorMessage, _React$Component);

  function ErrorMessage() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ErrorMessage.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        show = _this$props.show,
        classPrefix = _this$props.classPrefix,
        children = _this$props.children,
        placement = _this$props.placement,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "show", "classPrefix", "children", "placement"]);

    if (!show) {
      return null;
    }

    var addPrefix = prefix(classPrefix);
    var wrapClasses = classNames(addPrefix('wrapper'), className, (_classNames = {}, _classNames[addPrefix("placement-" + _.kebabCase(placementPolyfill(placement)))] = placement, _classNames));
    var classes = classNames(classPrefix, addPrefix('show'));
    return React.createElement("div", _extends({}, props, {
      className: wrapClasses
    }), React.createElement("span", {
      className: classes
    }, React.createElement("span", {
      className: addPrefix('arrow')
    }), React.createElement("span", {
      className: addPrefix('inner')
    }, children)));
  };

  return ErrorMessage;
}(React.Component);

ErrorMessage.propTypes = {
  show: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  placement: PropTypes.oneOf(PLACEMENT_8)
};
export default defaultProps({
  classPrefix: 'error-message'
})(ErrorMessage);