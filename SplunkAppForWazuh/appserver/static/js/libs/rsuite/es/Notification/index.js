import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import _ from 'lodash';
import Notification from './Notification';
import Icon from '../Icon';
import { STATUS_ICON_NAMES } from '../constants';
import { getClassNamePrefix } from '../utils/prefix';
var classPrefix = getClassNamePrefix() + "notification";
var notification = new Notification();

function appendIcon(type, content) {
  if (!STATUS_ICON_NAMES[type]) {
    return content;
  }

  return React.createElement("div", {
    className: classPrefix + "-title-with-icon"
  }, React.createElement(Icon, {
    icon: STATUS_ICON_NAMES[type]
  }), content);
}

var closeActions = {
  close: function close(key) {
    notification.close(key);
  },
  closeAll: function closeAll() {
    notification.closeAll();
  }
};

function proxy(type, config) {
  notification.open(_extends({}, config, {
    type: type,
    title: appendIcon(type, config.title)
  }));
  return closeActions;
}

var sendMessage = _.curry(proxy);

export default _extends({
  open: sendMessage('open'),
  info: sendMessage('info'),
  success: sendMessage('success'),
  warning: sendMessage('warning'),
  error: sendMessage('error')
}, closeActions);