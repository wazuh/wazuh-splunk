import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import _ from 'lodash';
import { setDisplayName, wrapDisplayName } from 'recompose';
import enGB from './locales/en_GB';
import IntlContext from './IntlContext';

var mergeObject = function mergeObject(list) {
  return list.reduce(function (a, b) {
    a = _extends({}, a, {}, b);
    return a;
  }, {});
};

function withLocale(combineKeys) {
  if (combineKeys === void 0) {
    combineKeys = [];
  }

  return function (BaseComponent) {
    var factory = React.createFactory(BaseComponent);
    var WithLocale = React.forwardRef(function (props, ref) {
      return React.createElement(IntlContext.Consumer, null, function (messages) {
        var locales = combineKeys.map(function (key) {
          return _.get(messages || enGB, "" + key);
        });
        return factory(_extends({
          ref: ref,
          locale: mergeObject(locales)
        }, props));
      });
    });
    WithLocale.displayName = BaseComponent.displayName;

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'withLocale'))(WithLocale);
    }

    return WithLocale;
  };
}

export default withLocale;