import * as React from 'react';
import IntlContext from './IntlContext';

var IntlProvider = function IntlProvider(_ref) {
  var locale = _ref.locale,
      children = _ref.children;
  return React.createElement(IntlContext.Provider, {
    value: locale
  }, children);
};

export default IntlProvider;