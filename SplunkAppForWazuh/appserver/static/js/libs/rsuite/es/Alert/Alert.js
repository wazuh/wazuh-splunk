import _extends from "@babel/runtime/helpers/esm/extends";
import { prefix } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import NoticeManager from '../Notification/NoticeManager';

var Alert =
/*#__PURE__*/
function () {
  function Alert() {
    var _this = this;

    this.props = {
      duration: 2000,
      top: 5,
      classPrefix: defaultClassPrefix('alert'),
      getContainer: null
    };
    this._instance = null;

    this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };
  }

  var _proto = Alert.prototype;

  _proto.setProps = function setProps(nextProps) {
    this.props = _extends({}, this.props, {}, nextProps);

    if (nextProps.top !== undefined) {
      this._instance = null;
    }
  };

  _proto.getInstance = function getInstance(callback) {
    var _this$props = this.props,
        getContainer = _this$props.getContainer,
        top = _this$props.top,
        duration = _this$props.duration,
        classPrefix = _this$props.classPrefix;
    var props = {
      style: {
        top: top
      },
      duration: duration,
      classPrefix: classPrefix,
      getContainer: getContainer,
      className: this.addPrefix('container')
    };
    NoticeManager.getInstance(props, callback);
  };

  _proto.open = function open(type, content, duration, onClose) {
    var _this2 = this;

    if (typeof content === 'function') {
      content = content();
    }

    var nextProps = {
      content: content,
      duration: typeof duration !== 'undefined' ? duration : this.props.duration,
      onClose: onClose,
      type: type,
      closable: true
    };

    if (!this._instance) {
      this.getInstance(function (nextInstance) {
        _this2._instance = nextInstance;

        _this2._instance.push(nextProps);
      });
    } else {
      this._instance.push(nextProps);
    }
  };

  _proto.close = function close(key) {
    if (this._instance) {
      this._instance.remove(key);
    }
  };

  _proto.closeAll = function closeAll() {
    if (this._instance) {
      this._instance.removeAll();
    }
  };

  return Alert;
}();

export default Alert;