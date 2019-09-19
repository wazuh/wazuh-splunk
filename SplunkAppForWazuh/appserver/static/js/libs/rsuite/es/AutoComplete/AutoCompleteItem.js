import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getUnhandledProps, defaultProps, prefix } from '../utils';

var AutoCompleteItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AutoCompleteItem, _React$Component);

  function AutoCompleteItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          itemData = _this$props.itemData,
          onSelect = _this$props.onSelect;
      onSelect && onSelect(itemData, event);
    };

    return _this;
  }

  var _proto = AutoCompleteItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        onKeyDown = _this$props2.onKeyDown,
        focus = _this$props2.focus,
        children = _this$props2.children,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        renderItem = _this$props2.renderItem,
        itemData = _this$props2.itemData,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["onKeyDown", "focus", "children", "className", "classPrefix", "renderItem", "itemData"]);

    var addPrefix = prefix(classPrefix);
    var classes = classNames(classPrefix, (_classNames = {}, _classNames[addPrefix('focus')] = focus, _classNames));
    var unhandled = getUnhandledProps(AutoCompleteItem, rest);
    return React.createElement("li", _extends({}, unhandled, {
      className: className,
      role: "menuitem"
    }), React.createElement("a", {
      className: classes,
      tabIndex: -1,
      role: "button",
      onKeyDown: onKeyDown,
      onClick: this.handleClick
    }, renderItem ? renderItem(itemData) : children));
  };

  return AutoCompleteItem;
}(React.Component);

AutoCompleteItem.propTypes = {
  classPrefix: PropTypes.string,
  itemData: PropTypes.object,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  focus: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  renderItem: PropTypes.func
};
export default defaultProps({
  classPrefix: 'auto-complete-item'
})(AutoCompleteItem);