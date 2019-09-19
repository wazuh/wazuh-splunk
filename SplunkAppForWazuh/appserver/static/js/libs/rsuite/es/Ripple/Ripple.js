import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'rsuite-utils/lib/Animation/Transition';
import { getOffset, on } from 'dom-lib';
import { defaultProps, getUnhandledProps, prefix } from '../utils';

var Ripple =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Ripple, _React$Component);

  function Ripple(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.triggerRef = void 0;
    _this.mousedownListener = null;

    _this.getPosition = function (event) {
      var offset = getOffset(_this.triggerRef.current);
      var offsetX = (event.pageX || 0) - offset.left;
      var offsetY = (event.pageY || 0) - offset.top;
      var radiusX = Math.max(offset.width - offsetX, offsetX);
      var radiusY = Math.max(offset.height - offsetY, offsetY);
      var radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
      return {
        width: radius * 2,
        height: radius * 2,
        left: offsetX - radius,
        top: offsetY - radius
      };
    };

    _this.handleMouseDown = function (event) {
      var position = _this.getPosition(event);

      var onMouseDown = _this.props.onMouseDown;

      _this.setState({
        rippling: true,
        position: position
      });

      onMouseDown && onMouseDown(position, event);
    };

    _this.handleRippled = function () {
      _this.setState({
        rippling: false
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.state = {
      rippling: false,
      position: {}
    };
    _this.triggerRef = React.createRef();
    return _this;
  }

  var _proto = Ripple.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.triggerRef.current) {
      this.mousedownListener = on(this.triggerRef.current.parentNode, 'mousedown', this.handleMouseDown);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.mousedownListener) {
      this.mousedownListener.off();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix"]);

    var classes = classNames(this.addPrefix('pond'), className);
    var _this$state = this.state,
        position = _this$state.position,
        rippling = _this$state.rippling;
    var unhandled = getUnhandledProps(Ripple, rest);
    return React.createElement("span", _extends({}, unhandled, {
      className: classes,
      ref: this.triggerRef
    }), React.createElement(Transition, {
      in: rippling,
      enteringClassName: this.addPrefix('rippling'),
      onEntered: this.handleRippled
    }, React.createElement("span", {
      className: classPrefix,
      style: position
    })));
  };

  return Ripple;
}(React.Component);

Ripple.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  onMouseDown: PropTypes.func
};
export default defaultProps({
  classPrefix: 'ripple'
})(Ripple);