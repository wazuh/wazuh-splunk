import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import compose from 'recompose/compose';
import { withStyleProps, defaultProps, prefix, createContext } from '../utils';
export var FormGroupContext = createContext(null);

var FormGroup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FormGroup, _React$Component);

  function FormGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormGroup.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        controlId = _this$props.controlId,
        validationState = _this$props.validationState,
        className = _this$props.className,
        isValid = _this$props.isValid,
        classPrefix = _this$props.classPrefix,
        rest = _objectWithoutPropertiesLoose(_this$props, ["controlId", "validationState", "className", "isValid", "classPrefix"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[addPrefix('has-success')] = !validationState && isValid, _classNames[addPrefix('has-error')] = !validationState && isValid === false, _classNames[addPrefix("has-" + (validationState || ''))] = !_.isUndefined(validationState), _classNames));
    return React.createElement(FormGroupContext.Provider, {
      value: controlId
    }, React.createElement("div", _extends({}, rest, {
      className: classes,
      role: "group"
    })));
  };

  return FormGroup;
}(React.Component);

FormGroup.propTypes = {
  controlId: PropTypes.string,
  isValid: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  validationState: PropTypes.oneOf(['success', 'warning', 'error'])
};
export default compose(withStyleProps({
  hasSize: true
}), defaultProps({
  classPrefix: 'form-group'
}))(FormGroup);