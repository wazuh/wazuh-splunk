import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { prefix, defaultProps } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
var Sizes = ['xs', 'sm', 'md', 'lg'];
var omitKeys = [];

var getValue = _.curry(function (obj, key) {
  omitKeys.push(key);
  return obj[key];
});

var Col =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Col, _React$Component);

  function Col() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Col.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        Component = _this$props.componentClass,
        classPrefix = _this$props.classPrefix,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "componentClass", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = {};
    var getPropValue = getValue(this.props);
    Sizes.forEach(function (size) {
      var col = getPropValue(size);
      var hidden = getPropValue(size + "Hidden");
      var offset = getPropValue(size + "Offset");
      var push = getPropValue(size + "Push");
      var pull = getPropValue(size + "Pull");
      classes[defaultClassPrefix("hidden-" + size)] = hidden;
      classes[addPrefix(size + "-" + col)] = col >= 0;
      classes[addPrefix(size + "-offset-" + offset)] = offset >= 0;
      classes[addPrefix(size + "-push-" + push)] = push >= 0;
      classes[addPrefix(size + "-pull-" + pull)] = pull >= 0;
    });

    var elementProps = _.omit(props, omitKeys);

    return React.createElement(Component, _extends({}, elementProps, {
      className: classNames(className, classPrefix, classes)
    }));
  };

  return Col;
}(React.Component);

Col.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xsOffset: PropTypes.number,
  smOffset: PropTypes.number,
  mdOffset: PropTypes.number,
  lgOffset: PropTypes.number,
  xsPush: PropTypes.number,
  smPush: PropTypes.number,
  mdPush: PropTypes.number,
  lgPush: PropTypes.number,
  xsPull: PropTypes.number,
  smPull: PropTypes.number,
  mdPull: PropTypes.number,
  lgPull: PropTypes.number,
  xsHidden: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  componentClass: PropTypes.elementType
};
export default defaultProps({
  classPrefix: 'col',
  componentClass: 'div'
})(Col);