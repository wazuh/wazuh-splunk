import _extends from "@babel/runtime/helpers/esm/extends";
import classNames from 'classnames';
import _ from 'lodash';
import { findNodeOfTree } from 'rsuite-utils/lib/utils';
import placementPolyfill from '../utils/placementPolyfill';
export function createConcatChildrenFunction(node, nodeValue) {
  return function (data, children) {
    if (nodeValue) {
      node = findNodeOfTree(data, function (item) {
        return nodeValue === item.value;
      });
    }

    node.children = children;
    return data.concat([]);
  };
}
export function getToggleWrapperClassName(name, prefix, props, hasValue, classes) {
  var _extends2;

  var className = props.className,
      placement = props.placement,
      appearance = props.appearance,
      cleanable = props.cleanable,
      block = props.block,
      disabled = props.disabled,
      countable = props.countable;
  return classNames(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), _extends((_extends2 = {}, _extends2[prefix("placement-" + _.kebabCase(placementPolyfill(placement)))] = placement, _extends2[prefix('block')] = block, _extends2[prefix('has-value')] = hasValue, _extends2[prefix('disabled')] = disabled, _extends2[prefix('cleanable')] = hasValue && cleanable, _extends2[prefix('countable')] = countable, _extends2), classes));
}
export function onMenuKeyDown(event, events) {
  var down = events.down,
      up = events.up,
      enter = events.enter,
      del = events.del,
      esc = events.esc;

  switch (event.keyCode) {
    // down
    case 40:
      down && down(event);
      event.preventDefault();
      break;
    // up

    case 38:
      up && up(event);
      event.preventDefault();
      break;
    // enter

    case 13:
      enter && enter(event);
      event.preventDefault();
      break;
    // delete

    case 8:
      del && del(event);
      break;
    // esc | tab

    case 27:
    case 9:
      esc && esc(event);
      event.preventDefault();
      break;

    default:
  }
}