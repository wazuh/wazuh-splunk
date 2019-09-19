import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';

var ProgressCircle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ProgressCircle, _React$Component);

  function ProgressCircle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProgressCircle.prototype;

  _proto.getPathStyles = function getPathStyles() {
    var _this$props = this.props,
        percent = _this$props.percent,
        strokeWidth = _this$props.strokeWidth,
        gapDegree = _this$props.gapDegree,
        gapPosition = _this$props.gapPosition,
        trailColor = _this$props.trailColor,
        strokeColor = _this$props.strokeColor;
    var radius = 50 - strokeWidth / 2;
    var beginPositionX = 0;
    var beginPositionY = -radius;
    var endPositionX = 0;
    var endPositionY = -2 * radius;

    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;

      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;

      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;

      default:
    }

    var pathString = "M 50,50 m " + beginPositionX + "," + beginPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + endPositionX + "," + -endPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + -endPositionX + "," + endPositionY;
    var len = Math.PI * 2 * radius;
    var trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: len - gapDegree + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px"
    };
    var strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: percent / 100 * (len - gapDegree) + "px " + len + "px",
      strokeDashoffset: "-" + gapDegree / 2 + "px"
    };
    return {
      pathString: pathString,
      trailPathStyle: trailPathStyle,
      strokePathStyle: strokePathStyle
    };
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        strokeWidth = _this$props2.strokeWidth,
        trailWidth = _this$props2.trailWidth,
        percent = _this$props2.percent,
        strokeLinecap = _this$props2.strokeLinecap,
        className = _this$props2.className,
        showInfo = _this$props2.showInfo,
        status = _this$props2.status,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["strokeWidth", "trailWidth", "percent", "strokeLinecap", "className", "showInfo", "status", "classPrefix", "style"]);

    var _this$getPathStyles = this.getPathStyles(),
        pathString = _this$getPathStyles.pathString,
        trailPathStyle = _this$getPathStyles.trailPathStyle,
        strokePathStyle = _this$getPathStyles.strokePathStyle;

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(ProgressCircle, rest);
    var classes = classNames(classPrefix, addPrefix('circle'), className, (_classNames = {}, _classNames[addPrefix("circle-" + (status || ''))] = !!status, _classNames));
    var showIcon = status && status !== 'active';
    var info = showIcon ? React.createElement("span", {
      className: addPrefix("icon-" + (status || ''))
    }) : React.createElement("span", {
      key: 1
    }, percent, "%");
    return React.createElement("div", {
      className: classes,
      style: style
    }, showInfo ? React.createElement("span", {
      className: addPrefix('circle-info')
    }, info) : null, React.createElement("svg", _extends({
      className: addPrefix('svg'),
      viewBox: "0 0 100 100"
    }, unhandled), React.createElement("path", {
      className: addPrefix('trail'),
      d: pathString,
      strokeWidth: trailWidth || strokeWidth,
      fillOpacity: "0",
      style: trailPathStyle
    }), React.createElement("path", {
      d: pathString,
      strokeLinecap: strokeLinecap,
      className: addPrefix('stroke'),
      strokeWidth: this.props.percent === 0 ? 0 : strokeWidth,
      fillOpacity: "0",
      style: strokePathStyle
    })));
  };

  return ProgressCircle;
}(React.Component);

ProgressCircle.propTypes = {
  className: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
  trailColor: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailWidth: PropTypes.number,
  gapDegree: PropTypes.number,
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  showInfo: PropTypes.bool,
  status: PropTypes.oneOf(['success', 'fail', 'active']),
  classPrefix: PropTypes.string
};
ProgressCircle.defaultProps = {
  percent: 0,
  strokeWidth: 6,
  trailWidth: 6,
  gapDegree: 0,
  showInfo: true,
  strokeLinecap: 'round',
  gapPosition: 'top'
};
export default defaultProps({
  classPrefix: 'progress'
})(ProgressCircle);