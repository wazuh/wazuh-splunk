import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import { defaultProps } from '../utils';

var Content =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Content, _React$Component);

  function Content() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Content.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "classPrefix"]);

    var classes = classNames(classPrefix, className);
    return React.createElement("div", _extends({}, props, {
      className: classes
    }));
  };

  return Content;
}(React.Component);

Content.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string
};
var EnhancedContent = defaultProps({
  classPrefix: 'content'
})(Content);
export default setDisplayName('Content')(EnhancedContent);