import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import Icon from '../Icon';
import Alert from './Alert';
import { STATUS_ICON_NAMES } from '../constants';
var alert = new Alert();

function appendIcon(type, content) {
  return React.createElement("div", null, React.createElement(Icon, {
    icon: STATUS_ICON_NAMES[type]
  }), content);
}

var closeActions = {
  close: function close(key) {
    alert.close(key);
  },
  closeAll: function closeAll() {
    alert.closeAll();
  }
};

function proxy(type) {
  return function (content, duration, onClose) {
    alert.open(type, appendIcon(type, content), duration, onClose);
    return closeActions;
  };
}

export default _extends({
  info: proxy('info'),
  success: proxy('success'),
  warning: proxy('warning'),
  error: proxy('error'),
  config: function config(nextProps) {
    alert.setProps(nextProps);
  }
}, closeActions);