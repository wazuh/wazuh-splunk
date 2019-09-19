import _ from 'lodash';
import classNames from 'classnames';
var getGlobal = new Function('return this;');
var globals = getGlobal();
export var globalKey = 'rs-';
export var getClassNamePrefix = function getClassNamePrefix() {
  if (globals && typeof globals.__RSUITE_CLASSNAME_PREFIX__ !== 'undefined') {
    return globals.__RSUITE_CLASSNAME_PREFIX__;
  }

  return globalKey;
};
export var defaultClassPrefix = function defaultClassPrefix(name) {
  return "" + getClassNamePrefix() + name;
};
export function prefix(pre, className) {
  if (!pre || !className) {
    return '';
  }

  if (_.isArray(className)) {
    return classNames(className.filter(function (name) {
      return !!name;
    }).map(function (name) {
      return pre + "-" + name;
    }));
  }

  return pre + "-" + className;
}
export default _.curry(prefix);