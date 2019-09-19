"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _setStatic = _interopRequireDefault(require("recompose/setStatic"));

var _setDisplayName = _interopRequireDefault(require("recompose/setDisplayName"));

var _Overlay = require("rsuite-utils/lib/Overlay");

var _shallowEqual = _interopRequireDefault(require("rsuite-utils/lib/utils/shallowEqual"));

var _DropdownToggle = _interopRequireDefault(require("./DropdownToggle"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _DropdownMenuItem = _interopRequireDefault(require("./DropdownMenuItem"));

var _utils = require("../utils");

var _Sidenav = require("../Sidenav/Sidenav");

var _constants = require("../constants");

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Dropdown, _React$Component);

  function Dropdown(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.toggle = function (isOpen) {
      var _this$props = _this.props,
          onOpen = _this$props.onOpen,
          onClose = _this$props.onClose,
          onToggle = _this$props.onToggle;
      var open = _lodash.default.isUndefined(isOpen) ? !_this.getOpen() : isOpen;
      var handleToggle = open ? onOpen : onClose;

      _this.setState({
        open: open
      }, function () {
        handleToggle && handleToggle();
      });

      onToggle && onToggle(open);
    };

    _this.handleClick = function (event) {
      event.preventDefault();

      if (_this.props.disabled) {
        return;
      }

      _this.toggle();
    };

    _this.handleOpenChange = function (event) {
      var eventKey = _this.props.eventKey;

      var onOpenChange = _lodash.default.get(_this.context, 'onOpenChange');

      onOpenChange && onOpenChange(eventKey, event);
    };

    _this.handleToggleChange = function (eventKey, event) {
      var onOpenChange = _lodash.default.get(_this.context, 'onOpenChange');

      onOpenChange && onOpenChange(eventKey, event);
    };

    _this.handleMouseEnter = function () {
      if (!_this.props.disabled) {
        _this.toggle(true);
      }
    };

    _this.handleMouseLeave = function () {
      if (!_this.props.disabled) {
        _this.toggle(false);
      }
    };

    _this.handleSelect = function (eventKey, event) {
      var onSelect = _this.props.onSelect;
      onSelect && onSelect(eventKey, event);

      _this.toggle(false);
    };

    _this.state = {
      title: null,
      open: props.open
    };
    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.getOpen = function getOpen() {
    var open = this.props.open;

    if (_lodash.default.isUndefined(open)) {
      return this.state.open;
    }

    return open;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        title = _this$props2.title,
        children = _this$props2.children,
        className = _this$props2.className,
        menuStyle = _this$props2.menuStyle,
        disabled = _this$props2.disabled,
        renderTitle = _this$props2.renderTitle,
        classPrefix = _this$props2.classPrefix,
        placement = _this$props2.placement,
        activeKey = _this$props2.activeKey,
        tabIndex = _this$props2.tabIndex,
        toggleClassName = _this$props2.toggleClassName,
        trigger = _this$props2.trigger,
        icon = _this$props2.icon,
        onClick = _this$props2.onClick,
        onMouseEnter = _this$props2.onMouseEnter,
        onMouseLeave = _this$props2.onMouseLeave,
        onContextMenu = _this$props2.onContextMenu,
        eventKey = _this$props2.eventKey,
        Component = _this$props2.componentClass,
        toggleComponentClass = _this$props2.toggleComponentClass,
        noCaret = _this$props2.noCaret,
        style = _this$props2.style,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["title", "children", "className", "menuStyle", "disabled", "renderTitle", "classPrefix", "placement", "activeKey", "tabIndex", "toggleClassName", "trigger", "icon", "onClick", "onMouseEnter", "onMouseLeave", "onContextMenu", "eventKey", "componentClass", "toggleComponentClass", "noCaret", "style"]);

    var _ref = this.context || {},
        _ref$openKeys = _ref.openKeys,
        openKeys = _ref$openKeys === void 0 ? [] : _ref$openKeys,
        sidenav = _ref.sidenav,
        expanded = _ref.expanded;

    var menuExpanded = openKeys.some(function (key) {
      return (0, _shallowEqual.default)(key, eventKey);
    });
    var addPrefix = (0, _utils.prefix)(classPrefix);
    var open = this.getOpen();
    var collapsible = sidenav && expanded;
    var unhandled = (0, _utils.getUnhandledProps)(Dropdown, props);
    var toggleProps = (0, _extends2.default)({}, unhandled, {
      onClick: (0, _utils.createChainedFunction)(this.handleOpenChange, onClick),
      onContextMenu: onContextMenu
    });
    var dropdownProps = {
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    };
    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */

    if (!collapsible) {
      if ((0, _utils.isOneOf)('click', trigger)) {
        toggleProps.onClick = (0, _utils.createChainedFunction)(this.handleClick, toggleProps.onClick);
      }

      if ((0, _utils.isOneOf)('contextMenu', trigger)) {
        toggleProps.onContextMenu = (0, _utils.createChainedFunction)(this.handleClick, onContextMenu);
      }

      if ((0, _utils.isOneOf)('hover', trigger)) {
        dropdownProps.onMouseEnter = (0, _utils.createChainedFunction)(this.handleMouseEnter, onMouseEnter);
        dropdownProps.onMouseLeave = (0, _utils.createChainedFunction)(this.handleMouseLeave, onMouseLeave);
      }
    }

    var Toggle = React.createElement(_DropdownToggle.default, (0, _extends2.default)({}, toggleProps, {
      noCaret: noCaret,
      tabIndex: tabIndex,
      className: toggleClassName,
      renderTitle: renderTitle,
      icon: icon,
      componentClass: toggleComponentClass
    }), this.state.title || title);
    var Menu = React.createElement(_DropdownMenu.default, {
      expanded: menuExpanded,
      collapsible: collapsible,
      activeKey: activeKey,
      onSelect: this.handleSelect,
      style: menuStyle,
      onToggle: this.handleToggleChange,
      openKeys: openKeys
    }, children);

    if (open) {
      Menu = React.createElement(_Overlay.RootCloseWrapper, {
        onRootClose: this.toggle
      }, Menu);
    }

    var classes = (0, _classnames.default)(classPrefix, className, (_classNames = {}, _classNames[addPrefix("placement-" + _lodash.default.kebabCase((0, _utils.placementPolyfill)(placement)))] = placement, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('no-caret')] = noCaret, _classNames[addPrefix('open')] = open, _classNames[addPrefix(menuExpanded ? 'expand' : 'collapse')] = sidenav, _classNames));
    return React.createElement(Component, (0, _extends2.default)({}, dropdownProps, {
      style: style,
      className: classes,
      role: "menu"
    }), Menu, Toggle);
  };

  return Dropdown;
}(React.Component);

Dropdown.contextType = _Sidenav.SidenavContext;
Dropdown.propTypes = {
  activeKey: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  trigger: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.oneOf(['click', 'hover', 'contextMenu'])]),
  placement: _propTypes.default.oneOf(_constants.PLACEMENT_8),
  title: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  menuStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  toggleClassName: _propTypes.default.string,
  children: _propTypes.default.node,
  tabIndex: _propTypes.default.number,
  open: _propTypes.default.bool,
  eventKey: _propTypes.default.any,
  componentClass: _propTypes.default.elementType,
  toggleComponentClass: _propTypes.default.elementType,
  noCaret: _propTypes.default.bool,
  style: _propTypes.default.object,
  onClose: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClick: _propTypes.default.func,
  renderTitle: _propTypes.default.func
};
Dropdown.defaultProps = {
  placement: 'bottomStart',
  trigger: 'click',
  tabIndex: 0
};
var EnhancedDropdown = (0, _utils.defaultProps)({
  componentClass: 'div',
  classPrefix: 'dropdown'
})(Dropdown);
(0, _setStatic.default)('Item', _DropdownMenuItem.default)(EnhancedDropdown);
(0, _setStatic.default)('Menu', _DropdownMenu.default)(EnhancedDropdown);

var _default = (0, _setDisplayName.default)('Dropdown')(EnhancedDropdown);

exports.default = _default;
module.exports = exports.default;