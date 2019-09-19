import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { addDays, subDays } from 'date-fns';
import FormattedMessage from '../IntlProvider/FormattedMessage';
import { getUnhandledProps, prefix, defaultProps } from '../utils';
import { setTimingMargin } from './utils';
var defaultRanges = [{
  label: 'today',
  value: [setTimingMargin(new Date()), setTimingMargin(new Date(), 'right')]
}, {
  label: 'yesterday',
  value: [setTimingMargin(addDays(new Date(), -1)), setTimingMargin(addDays(new Date(), -1), 'right')]
}, {
  label: 'last7Days',
  value: [setTimingMargin(subDays(new Date(), 6)), setTimingMargin(new Date(), 'right')]
}];

function hasLocaleKey(key) {
  return defaultRanges.some(function (item) {
    return item.label === key;
  });
}

var Toolbar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Toolbar, _React$PureComponent);

  function Toolbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    return _this;
  }

  var _proto = Toolbar.prototype;

  _proto.renderOkButton = function renderOkButton() {
    var _classNames;

    var _this$props = this.props,
        disabledOkButton = _this$props.disabledOkButton,
        pageDate = _this$props.pageDate,
        onOk = _this$props.onOk,
        hideOkButton = _this$props.hideOkButton;

    if (hideOkButton) {
      return null;
    }

    var disabled = disabledOkButton && disabledOkButton(pageDate);
    var classes = classNames(this.addPrefix('right-btn-ok'), (_classNames = {}, _classNames[this.addPrefix('btn-disabled')] = disabled, _classNames));
    return React.createElement("div", {
      className: this.addPrefix('right')
    }, React.createElement("button", {
      className: classes,
      onClick: disabled ? undefined : onOk
    }, React.createElement(FormattedMessage, {
      id: "ok"
    })));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        ranges = _this$props2.ranges,
        onShortcut = _this$props2.onShortcut,
        disabledShortcutButton = _this$props2.disabledShortcutButton,
        className = _this$props2.className,
        pageDate = _this$props2.pageDate,
        classPrefix = _this$props2.classPrefix,
        hideOkButton = _this$props2.hideOkButton,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["ranges", "onShortcut", "disabledShortcutButton", "className", "pageDate", "classPrefix", "hideOkButton"]);

    if (hideOkButton && ranges.length === 0) {
      return null;
    }

    var classes = classNames(classPrefix, className);
    var unhandled = getUnhandledProps(Toolbar, rest);
    return React.createElement("div", _extends({}, unhandled, {
      className: classes
    }), React.createElement("div", {
      className: this.addPrefix('ranges')
    }, ranges.map(function (item, index) {
      var _classNames2;

      var value = typeof item.value === 'function' ? item.value(pageDate) : item.value;
      var disabled = disabledShortcutButton && disabledShortcutButton(value);
      var itemClassName = classNames(_this2.addPrefix('option'), (_classNames2 = {}, _classNames2[_this2.addPrefix('option-disabled')] = disabled, _classNames2));
      return React.createElement("a", {
        /* eslint-disable */
        key: index,
        role: "button",
        tabIndex: -1,
        className: itemClassName,
        onClick: function onClick(event) {
          !disabled && onShortcut(value, item.closeOverlay, event);
        }
      }, hasLocaleKey(item.label) ? React.createElement(FormattedMessage, {
        id: item.label
      }) : item.label);
    })), this.renderOkButton());
  };

  return Toolbar;
}(React.PureComponent);

Toolbar.propTypes = {
  ranges: PropTypes.array,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  pageDate: PropTypes.array,
  onShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledOkButton: PropTypes.func,
  disabledShortcutButton: PropTypes.func,
  selectValue: PropTypes.array,
  hideOkButton: PropTypes.bool
};
Toolbar.defaultProps = {
  ranges: defaultRanges
};
var enhance = defaultProps({
  classPrefix: 'picker-toolbar'
});
export default enhance(Toolbar);