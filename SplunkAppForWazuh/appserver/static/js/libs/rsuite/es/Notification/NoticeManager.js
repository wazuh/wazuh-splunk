import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Transition } from 'rsuite-utils/lib/Animation';
import { prefix, createChainedFunction } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import Message from './Message';
var id = 0;

var getUid = function getUid() {
  id += 1;
  return defaultClassPrefix("notification-" + Date.now() + "-" + id);
};

var NoticeManager =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(NoticeManager, _React$Component);

  NoticeManager.getInstance = function getInstance(props, callback) {
    var getContainer = props.getContainer,
        rest = _objectWithoutPropertiesLoose(props, ["getContainer"]);

    var mountElement = document.createElement('div');
    var container = typeof getContainer === 'function' ? getContainer() : document.body;
    container.appendChild(mountElement);
    var called = false;

    function ref(ref) {
      if (called) {
        return;
      }

      var instance = {
        push: function push(item) {
          ref.add(item);
        },
        remove: function remove(key) {
          ref.actualRemove(key);
        },
        removeAll: function removeAll() {
          ref.removeAll();
        },
        component: ref,
        destroy: function destroy() {
          ReactDOM.unmountComponentAtNode(mountElement);
          document.removeChild(mountElement);
        }
      };
      called = true;
      callback(instance);
    }

    ReactDOM.render(React.createElement(NoticeManager, _extends({}, rest, {
      ref: ref
    })), mountElement);
  };

  function NoticeManager(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.add = function (item) {
      var notices = _this.state.notices;
      item.key = typeof item.key === 'undefined' ? getUid() : item.key;
      item.show = true;

      if (!notices.find(function (n) {
        return n.key === item.key;
      })) {
        _this.setState({
          notices: [].concat(notices, [item])
        });
      }
    };

    _this.removeAll = function () {
      var notices = _this.state.notices;

      _this.setState({
        notices: notices.map(function (n) {
          return _extends({}, n, {
            show: false
          });
        })
      }, function () {
        setTimeout(function () {
          _this.setState({
            notices: []
          });
        }, 1000);
      });
    };

    _this.remove = function (key) {
      var notices = _this.state.notices;
      key = _this.getKey(key);
      var nextNotices = notices.map(function (n) {
        if (n.key === key) {
          n.show = false;
        }

        return n;
      });

      var callback = function callback() {
        setTimeout(function () {
          _this.actualRemove(key);
        }, 1000);
      };

      _this.setState({
        notices: nextNotices
      }, callback);
    };

    _this.actualRemove = function (key) {
      key = _this.getKey(key);

      _this.setState(function (prevState) {
        return {
          notices: prevState.notices.filter(function (notice) {
            return notice.key !== key;
          })
        };
      });
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.state = {
      show: false,
      notices: []
    };
    return _this;
  }

  var _proto = NoticeManager.prototype;

  _proto.getKey = function getKey(key) {
    var notices = this.state.notices;

    if (typeof key === 'undefined' && notices.length) {
      key = notices[notices.length - 1].key;
    }

    return key;
  };

  _proto.render = function render() {
    var _this2 = this;

    var notices = this.state.notices;
    var _this$props = this.props,
        className = _this$props.className,
        style = _this$props.style,
        classPrefix = _this$props.classPrefix;
    var elements = notices.map(function (item) {
      var key = item.key,
          show = item.show,
          onClose = item.onClose,
          rest = _objectWithoutPropertiesLoose(item, ["key", "show", "onClose"]);

      return React.createElement(Transition, {
        key: key,
        in: show,
        exitedClassName: _this2.addPrefix('fade-exited'),
        exitingClassName: _this2.addPrefix('fade-leave-active'),
        enteringClassName: _this2.addPrefix('fade-entering'),
        enteredClassName: _this2.addPrefix('fade-entered'),
        timeout: 300
      }, React.createElement(Message, _extends({}, rest, {
        classPrefix: classPrefix,
        onClose: createChainedFunction(function () {
          return _this2.remove(key);
        }, onClose)
      })));
    });
    var classes = classNames(classPrefix, className);
    return React.createElement("div", {
      className: classes,
      style: style
    }, elements);
  };

  return NoticeManager;
}(React.Component);

NoticeManager.defaultProps = {
  style: {
    top: 5
  }
};
export default NoticeManager;