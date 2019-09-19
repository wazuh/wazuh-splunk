import * as React from 'react';
import IntlContext from './IntlContext';

var FormattedMessage = function FormattedMessage(_ref) {
  var id = _ref.id,
      componentClass = _ref.componentClass;
  var Component = componentClass || 'span';
  return React.createElement(Component, null, React.createElement(IntlContext.Consumer, null, function (context) {
    if (context && typeof id === 'string' && typeof context[id] !== 'undefined') {
      return context[id];
    }

    return id;
  }));
};

export default FormattedMessage;