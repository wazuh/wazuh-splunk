import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';

var ProgressLine =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ProgressLine, _React$Component);

  function ProgressLine() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProgressLine.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        percent = _this$props.percent,
        strokeColor = _this$props.strokeColor,
        strokeWidth = _this$props.strokeWidth,
        trailColor = _this$props.trailColor,
        trailWidth = _this$props.trailWidth,
        status = _this$props.status,
        showInfo = _this$props.showInfo,
        classPrefix = _this$props.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props, ["className", "percent", "strokeColor", "strokeWidth", "trailColor", "trailWidth", "status", "showInfo", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(ProgressLine, rest);
    var lineInnerStyle = {
      backgroundColor: trailColor,
      height: trailWidth || strokeWidth
    };
    var percentStyle = {
      width: percent + "%",
      backgroundColor: strokeColor,
      height: strokeWidth
    };
    var classes = classNames(classPrefix, addPrefix('line'), className, (_classNames = {}, _classNames[addPrefix("line-" + (status || ''))] = !!status, _classNames));
    var showIcon = status && status !== 'active';
    var info = showIcon ? React.createElement("span", {
      className: addPrefix("icon-" + (status || ''))
    }) : React.createElement("span", {
      className: addPrefix('info-status')
    }, percent, "%");
    return React.createElement("div", _extends({
      className: classes
    }, unhandled), React.createElement("div", {
      className: addPrefix('line-outer')
    }, React.createElement("div", {
      className: addPrefix('line-inner'),
      style: lineInnerStyle
    }, React.createElement("div", {
      className: addPrefix('line-bg'),
      style: percentStyle
    }))), showInfo ? React.createElement("div", {
      className: addPrefix('info')
    }, info) : null);
  };

  return ProgressLine;
}(React.Component);

ProgressLine.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  percent: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  trailWidth: PropTypes.number,
  showInfo: PropTypes.bool,
  status: PropTypes.oneOf(['success', 'fail', 'active'])
};
ProgressLine.defaultProps = {
  showInfo: true,
  percent: 0
};
export default defaultProps({
  classPrefix: 'progress'
})(ProgressLine);