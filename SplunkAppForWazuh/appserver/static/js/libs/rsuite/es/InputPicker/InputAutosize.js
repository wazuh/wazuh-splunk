import _extends from "@babel/runtime/helpers/esm/extends";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { partitionHTMLProps, isIE } from '../utils';
var sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};

var copyStyles = function copyStyles(styles, node) {
  node.style.fontSize = styles.fontSize;
  node.style.fontFamily = styles.fontFamily;
  node.style.fontWeight = styles.fontWeight;
  node.style.fontStyle = styles.fontStyle;
  node.style.letterSpacing = styles.letterSpacing;
  node.style.textTransform = styles.textTransform;
};

var InputAutosize =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InputAutosize, _React$Component);

  function InputAutosize(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.inputRef = void 0;
    _this.sizerRef = void 0;
    _this.placeHolderSizerRef = void 0;
    _this.state = {
      inputWidth: props.minWidth
    };
    _this.inputRef = React.createRef();
    _this.sizerRef = React.createRef();
    _this.placeHolderSizerRef = React.createRef();
    return _this;
  }

  var _proto = InputAutosize.prototype;

  _proto.getInputInstance = function getInputInstance() {
    return this.inputRef.current;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.copyInputStyles();
    this.updateInputWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    var inputWidth = this.state.inputWidth;
    var onAutosize = this.props.onAutosize;

    if (prevState.inputWidth !== inputWidth) {
      onAutosize && onAutosize(inputWidth);
    }

    this.updateInputWidth();
  };

  _proto.copyInputStyles = function copyInputStyles() {
    if (!this.inputRef.current || !window.getComputedStyle) {
      return;
    }

    var inputStyles = this.inputRef.current && window.getComputedStyle(this.inputRef.current);

    if (!inputStyles) {
      return;
    }

    if (this.sizerRef.current) {
      copyStyles(inputStyles, this.sizerRef.current);
    }

    if (this.placeHolderSizerRef.current) {
      copyStyles(inputStyles, this.placeHolderSizerRef.current);
    }
  };

  _proto.updateInputWidth = function updateInputWidth() {
    if (!this.sizerRef.current || typeof this.sizerRef.current.scrollWidth === 'undefined') {
      return;
    }

    var _this$props = this.props,
        minWidth = _this$props.minWidth,
        placeholder = _this$props.placeholder,
        value = _this$props.value;
    var newInputWidth;

    if (placeholder && !value && this.placeHolderSizerRef.current) {
      newInputWidth = Math.max(this.sizerRef.current.scrollWidth, this.placeHolderSizerRef.current.scrollWidth) + 2;
    } else {
      newInputWidth = this.sizerRef.current.scrollWidth + 2;
    }

    if (newInputWidth < minWidth) {
      newInputWidth = minWidth;
    }

    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth
      });
    }
  };

  _proto.renderStyles = function renderStyles() {
    var inputId = this.props.inputId;
    return isIE() ? React.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: "input#" + inputId + "::-ms-clear {display: none;}"
      }
    }) : null;
  };

  _proto.render = function render() {
    var inputWidth = this.state.inputWidth;
    var _this$props2 = this.props,
        defaultValue = _this$props2.defaultValue,
        value = _this$props2.value,
        style = _this$props2.style,
        className = _this$props2.className,
        placeholder = _this$props2.placeholder,
        inputClassName = _this$props2.inputClassName,
        inputStyle = _this$props2.inputStyle,
        inputId = _this$props2.inputId;
    var sizerValue = [defaultValue, value, ''].reduce(function (previousValue, currentValue) {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue;
      }

      return currentValue;
    });

    var wrapperStyle = _extends({}, style);

    if (!wrapperStyle.display) {
      wrapperStyle.display = 'inline-block';
    }

    var nextInputStyle = _extends({
      boxSizing: 'content-box',
      width: inputWidth + "px"
    }, inputStyle);

    var _partitionHTMLProps = partitionHTMLProps(this.props),
        htmlInputProps = _partitionHTMLProps[0];

    htmlInputProps.className = inputClassName;
    htmlInputProps.id = inputId;
    htmlInputProps.style = nextInputStyle;
    return React.createElement("div", {
      className: className,
      style: wrapperStyle
    }, this.renderStyles(), React.createElement("input", _extends({}, htmlInputProps, {
      ref: this.inputRef,
      type: "text"
    })), React.createElement("div", {
      ref: this.sizerRef,
      style: sizerStyle
    }, sizerValue), placeholder ? React.createElement("div", {
      ref: this.placeHolderSizerRef,
      style: sizerStyle
    }, placeholder) : null);
  };

  return InputAutosize;
}(React.Component);

InputAutosize.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  inputId: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStyle: PropTypes.object,
  minWidth: PropTypes.number,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  onAutosize: PropTypes.func
};
InputAutosize.defaultProps = {
  minWidth: 1,
  inputId: '_' + Math.random().toString(36).substr(2, 12)
};
export default InputAutosize;