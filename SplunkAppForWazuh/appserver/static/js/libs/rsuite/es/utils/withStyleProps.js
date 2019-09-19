import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setPropTypes, wrapDisplayName } from 'recompose';
import prefix from './prefix';
import { SIZE, STATUS, COLOR } from '../constants';

function withStyleProps(options) {
  if (options === void 0) {
    options = {};
  }

  return function (Component) {
    var _options = options,
        hasSize = _options.hasSize,
        hasStatus = _options.hasStatus,
        hasColor = _options.hasColor,
        defaultColor = _options.defaultColor;
    var WithStyleComponent = React.forwardRef(function (props, ref) {
      var _classNames;

      var classPrefix = props.classPrefix,
          size = props.size,
          color = props.color,
          status = props.status,
          className = props.className,
          rest = _objectWithoutPropertiesLoose(props, ["classPrefix", "size", "color", "status", "className"]);

      var addPrefix = prefix(classPrefix);
      var classes = classNames(className, (_classNames = {}, _classNames[addPrefix(size)] = hasSize && size, _classNames[addPrefix(color)] = hasColor && color, _classNames[addPrefix(defaultColor)] = !color, _classNames[addPrefix(status)] = hasStatus && status, _classNames));
      return React.createElement(Component, _extends({}, rest, {
        classPrefix: classPrefix,
        className: classes,
        ref: ref
      }));
    });
    var propTypes = {
      innerRef: PropTypes.func
    };

    if (hasSize) {
      propTypes.size = PropTypes.oneOf(SIZE);
    }

    if (hasColor) {
      propTypes.color = PropTypes.oneOf(COLOR);
    }

    if (hasStatus) {
      propTypes.status = PropTypes.oneOf(STATUS);
    }

    WithStyleComponent.displayName = wrapDisplayName(Component, 'withStyleProps');
    WithStyleComponent.defaultProps = Component.defaultProps;
    setPropTypes(propTypes)(WithStyleComponent);
    return WithStyleComponent;
  };
}

export default withStyleProps;