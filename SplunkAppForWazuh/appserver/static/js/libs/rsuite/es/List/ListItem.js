import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { setDisplayName } from 'recompose';
import classNames from 'classnames';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { ListContext } from './List';

var ListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ListItem, _React$Component);

  function ListItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.managerRef = void 0;
    _this.listItemRef = React.createRef();

    _this.register = function () {
      var _this$props = _this.props,
          collection = _this$props.collection,
          disabled = _this$props.disabled,
          index = _this$props.index,
          manager = _this$props.manager;

      if (manager) {
        _this.managerRef = {
          node: _this.listItemRef.current,
          edgeOffset: null,
          info: {
            collection: collection,
            disabled: disabled,
            index: index,
            manager: manager
          }
        };
        manager.add(collection, _this.managerRef);
      }
    };

    _this.unregister = function (collection) {
      if (collection === void 0) {
        collection = _this.props.collection;
      }

      var manager = _this.props.manager;

      if (manager) {
        manager.remove(collection, _this.managerRef);
      }
    };

    return _this;
  }

  var _proto = ListItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.register();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    this.managerRef.info.index = this.props.index;
    this.managerRef.info.disabled = this.props.disabled;

    if (prevProps.collection !== this.props.collection) {
      this.unregister(prevProps.collection);
      this.register();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unregister();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        classPrefix = _this$props2.classPrefix,
        bordered = _this$props2.bordered,
        disabled = _this$props2.disabled,
        children = _this$props2.children,
        size = _this$props2.size,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["className", "classPrefix", "bordered", "disabled", "children", "size"]);

    var addPrefix = prefix(classPrefix);
    var unhandled = getUnhandledProps(ListItem, rest);
    var classes = classNames(classPrefix, className, addPrefix(size), (_classNames = {}, _classNames[addPrefix('disabled')] = disabled, _classNames[addPrefix('bordered')] = bordered, _classNames));
    var itemContent = React.createElement("div", {
      className: addPrefix('content')
    }, children);
    return React.createElement("div", _extends({
      ref: this.listItemRef,
      className: classes
    }, unhandled), itemContent);
  };

  return ListItem;
}(React.Component);

ListItem.defaultProps = {
  collection: 0
};
ListItem.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  index: PropTypes.number,
  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool
};
var EnhancedListItem = defaultProps({
  classPrefix: 'list-item'
})(ListItem);
var Component = setDisplayName('ListItem')(EnhancedListItem);

var WithContextListItem = function WithContextListItem(props) {
  return React.createElement(ListContext.Consumer, null, function (context) {
    return React.createElement(Component, _extends({}, props, context));
  });
};

export default WithContextListItem;