import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withStyleProps, defaultProps, prefix } from '../utils';

var Loader =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Loader, _React$Component);

  function Loader() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Loader.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        classPrefix = _this$props.classPrefix,
        className = _this$props.className,
        inverse = _this$props.inverse,
        backdrop = _this$props.backdrop,
        speed = _this$props.speed,
        center = _this$props.center,
        vertical = _this$props.vertical,
        content = _this$props.content,
        props = _objectWithoutPropertiesLoose(_this$props, ["classPrefix", "className", "inverse", "backdrop", "speed", "center", "vertical", "content"]);

    var hasContent = !!content;
    var addPrefix = prefix(classPrefix);
    var classes = classNames(addPrefix('wrapper'), addPrefix("speed-" + speed), className, (_classNames = {}, _classNames[addPrefix('backdrop-wrapper')] = backdrop, _classNames[addPrefix('vertical')] = vertical, _classNames[addPrefix('inverse')] = inverse, _classNames[addPrefix('center')] = center, _classNames[addPrefix('has-content')] = hasContent, _classNames));
    return React.createElement("div", _extends({}, props, {
      className: classes
    }), backdrop && React.createElement("div", {
      className: addPrefix('backdrop')
    }), React.createElement("div", {
      className: classPrefix
    }, React.createElement("span", {
      className: addPrefix('spin')
    }), hasContent && React.createElement("span", {
      className: addPrefix('content')
    }, content)));
  };

  return Loader;
}(React.Component);

Loader.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  center: PropTypes.bool,
  backdrop: PropTypes.bool,
  inverse: PropTypes.bool,
  vertical: PropTypes.bool,
  content: PropTypes.node,
  speed: PropTypes.oneOf(['normal', 'fast', 'slow'])
};
Loader.defaultProps = {
  speed: 'normal'
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'loader'
}))(Loader);