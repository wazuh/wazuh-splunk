import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import Input from '../Input';
import AutoCompleteItem from './AutoCompleteItem';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { PickerToggleTrigger, onMenuKeyDown, MenuWrapper } from '../Picker';
import { PLACEMENT } from '../constants';

var AutoComplete =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AutoComplete, _React$Component);

  function AutoComplete(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.menuContainerRef = void 0;
    _this.triggerRef = void 0;

    _this.getFocusableMenuItems = function () {
      var data = _this.getData();

      if (!data) {
        return [];
      }

      return data.filter(_this.shouldDisplay);
    };

    _this.shouldDisplay = function (item) {
      var value = _this.getValue();

      if (!_.trim(value)) {
        return false;
      }

      var keyword = (value || '').toLocaleLowerCase();
      return item.label.toLocaleLowerCase().indexOf(keyword) >= 0;
    };

    _this.handleChange = function (value, event) {
      var nextState = {
        focus: true,
        focusItemValue: '',
        value: value
      };

      _this.setState(nextState);

      _this.handleChangeValue(value, event);
    };

    _this.handleInputFocus = function (event) {
      var onFocus = _this.props.onFocus;

      _this.open();

      onFocus && onFocus(event);
    };

    _this.handleInputBlur = function (event) {
      var onBlur = _this.props.onBlur;
      setTimeout(_this.close, 300);
      onBlur && onBlur(event);
    };

    _this.focusNextMenuItem = function (event) {
      var onMenuFocus = _this.props.onMenuFocus;

      _this.findNode(function (items, index) {
        var item = items[index + 1];

        if (!_.isUndefined(item)) {
          var focusItemValue = item.value;

          _this.setState({
            focusItemValue: focusItemValue
          });

          onMenuFocus && onMenuFocus(focusItemValue, event);
        }
      });
    };

    _this.focusPrevMenuItem = function (event) {
      var onMenuFocus = _this.props.onMenuFocus;

      _this.findNode(function (items, index) {
        var item = items[index - 1];

        if (!_.isUndefined(item)) {
          var focusItemValue = item.value;

          _this.setState({
            focusItemValue: focusItemValue
          });

          onMenuFocus && onMenuFocus(focusItemValue, event);
        }
      });
    };

    _this.selectFocusMenuItem = function (event) {
      var _this$state = _this.state,
          focusItemValue = _this$state.focusItemValue,
          prevValue = _this$state.value;

      if (!focusItemValue) {
        return;
      }

      var nextState = {
        value: focusItemValue,
        focusItemValue: focusItemValue
      };

      var data = _this.getData();

      var focusItem = data.find(function (item) {
        return _.get(item, 'value') === focusItemValue;
      });

      _this.setState(nextState);

      _this.handleSelect(focusItem, event);

      if (prevValue !== focusItemValue) {
        _this.handleChangeValue(focusItemValue, event);
      }

      _this.close();
    };

    _this.close = function () {
      _this.setState({
        focus: false
      }, _this.props.onClose);
    };

    _this.open = function () {
      _this.setState({
        focus: true
      }, _this.props.onOpen);
    };

    _this.handleKeyDown = function (event) {
      if (!_this.menuContainerRef.current) {
        return;
      }

      var _this$props = _this.props,
          onKeyDown = _this$props.onKeyDown,
          selectOnEnter = _this$props.selectOnEnter;
      onMenuKeyDown(event, {
        down: _this.focusNextMenuItem,
        up: _this.focusPrevMenuItem,
        enter: selectOnEnter ? _this.selectFocusMenuItem : undefined,
        esc: _this.close
      });
      onKeyDown && onKeyDown(event);
    };

    _this.handleChangeValue = function (value, event) {
      var onChange = _this.props.onChange;
      onChange && onChange(value, event);
    };

    _this.handleSelect = function (item, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(item, event);
    };

    _this.handleItemSelect = function (item, event) {
      var value = item.value;
      var prevValue = _this.state.value;
      var nextState = {
        value: value,
        focusItemValue: value
      };

      _this.setState(nextState);

      _this.handleSelect(item, event);

      if (prevValue !== value) {
        _this.handleChangeValue(value, event);
      }

      _this.close();
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    var defaultValue = props.defaultValue;
    _this.state = {
      value: defaultValue || '',
      focus: false,
      focusItemValue: defaultValue
    };
    _this.menuContainerRef = React.createRef();
    _this.triggerRef = React.createRef();
    return _this;
  }

  var _proto = AutoComplete.prototype;

  _proto.getValue = function getValue() {
    var value = this.props.value;
    return _.isUndefined(value) ? this.state.value : value;
  };

  _proto.getData = function getData(props) {
    var _ref = props || this.props,
        data = _ref.data;

    if (!data) {
      return [];
    }

    return data.map(function (item) {
      if (typeof item === 'string') {
        return {
          value: item,
          label: item
        };
      }

      if (typeof item === 'object') {
        return item;
      }
    });
  };

  _proto.findNode = function findNode(focus) {
    var items = this.getFocusableMenuItems();
    var focusItemValue = this.state.focusItemValue;

    for (var i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i].value)) {
        focus(items, i);
        return;
      }
    }

    focus(items, -1);
  };

  _proto.renderDropdownMenu = function renderDropdownMenu() {
    var _this2 = this;

    var _this$props2 = this.props,
        renderItem = _this$props2.renderItem,
        menuClassName = _this$props2.menuClassName;
    var data = this.getData();
    var focusItemValue = this.state.focusItemValue;
    var classes = classNames(this.addPrefix('menu'), menuClassName);
    var items = data.filter(this.shouldDisplay);
    return React.createElement(MenuWrapper, {
      className: classes,
      onKeyDown: this.handleKeyDown,
      ref: this.menuContainerRef
    }, React.createElement("ul", {
      role: "menu"
    }, items.map(function (item) {
      return React.createElement(AutoCompleteItem, {
        key: item.value,
        focus: focusItemValue === item.value,
        itemData: item,
        onSelect: _this2.handleItemSelect,
        renderItem: renderItem
      }, item.label);
    })));
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        disabled = _this$props3.disabled,
        className = _this$props3.className,
        classPrefix = _this$props3.classPrefix,
        open = _this$props3.open,
        style = _this$props3.style,
        rest = _objectWithoutPropertiesLoose(_this$props3, ["disabled", "className", "classPrefix", "open", "style"]);

    var data = this.getData();
    var value = this.getValue();
    var unhandled = getUnhandledProps(AutoComplete, rest);
    var classes = classNames(classPrefix, className, (_classNames = {}, _classNames[this.addPrefix('disabled')] = disabled, _classNames));
    var hasItems = data.filter(this.shouldDisplay).length > 0;
    return React.createElement("div", {
      className: classes,
      style: style
    }, React.createElement(PickerToggleTrigger, {
      pickerProps: this.props,
      ref: this.triggerRef,
      trigger: ['click', 'focus'],
      open: open || this.state.focus && hasItems,
      speaker: this.renderDropdownMenu()
    }, React.createElement(Input, _extends({}, unhandled, {
      disabled: disabled,
      value: value,
      onBlur: this.handleInputBlur,
      onFocus: this.handleInputFocus,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown
    }))));
  };

  return AutoComplete;
}(React.Component);

AutoComplete.propTypes = {
  data: PropTypes.array,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  placement: PropTypes.oneOf(PLACEMENT),
  onFocus: PropTypes.func,
  onMenuFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  renderItem: PropTypes.func,
  style: PropTypes.object,
  open: PropTypes.bool,
  selectOnEnter: PropTypes.bool
};
AutoComplete.defaultProps = {
  data: [],
  placement: 'bottomStart',
  selectOnEnter: true
};
var EnhancedAutoComplete = defaultProps({
  classPrefix: 'auto-complete'
})(AutoComplete);
setStatic('Item', AutoCompleteItem)(AutoComplete);
export default EnhancedAutoComplete;